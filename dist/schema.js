"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySchema = exports.table = void 0;
const dynamodb_onetable_1 = require("dynamodb-onetable");
const dynamodb_1 = __importDefault(require("aws-sdk/clients/dynamodb"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// --- Configuration Logic: Local vs. Cloud ---
let clientConfig = {
    region: process.env.AWS_REGION || 'ap-southeast-1',
};
if (process.env.DYNAMODB_ENDPOINT) {
    clientConfig = {
        ...clientConfig,
        endpoint: process.env.DYNAMODB_ENDPOINT,
        sslEnabled: false,
        credentials: { accessKeyId: 'dummy', secretAccessKey: 'dummy' }
    };
    console.log(`[DB] Using Local DynamoDB Endpoint: ${process.env.DYNAMODB_ENDPOINT}`);
}
else {
    console.log('[DB] Using AWS Cloud DynamoDB (Credentials from environment/role)');
}
const client = new dynamodb_1.default.DocumentClient(clientConfig);
// --- One Table Schema Definition ---
const MySchema = {
    format: 'onetable:1.0.0',
    version: '0.0.1',
    indexes: {
        primary: { hash: 'pk', sort: 'sk' },
        gsi1: { hash: 'gsi1pk', sort: 'gsi1sk', project: 'all' }, // For quick ID lookup
    },
    models: {
        Organization: {
            pk: { type: String, value: 'ORG#${id}' },
            sk: { type: String, value: 'ORG#${id}' },
            id: { type: String, required: true },
            ownerId: { type: String, required: true },
            name: { type: String },
        },
        Team: {
            pk: { type: String, value: 'ORG#${organizationId}' }, // Parent PK
            sk: { type: String, value: 'TEAM#${id}' },
            id: { type: String, required: true },
            organizationId: { type: String, required: true },
            name: { type: String },
            gsi1pk: { type: String, value: 'TEAM#${id}' },
            gsi1sk: { type: String, value: 'TEAM#${id}' },
        },
        Project: {
            pk: { type: String, value: 'TEAM#${teamId}' }, // Parent PK
            sk: { type: String, value: 'PROJ#${id}' },
            id: { type: String, required: true },
            teamId: { type: String, required: true },
            ownerId: { type: String, required: true },
            name: { type: String },
            gsi1pk: { type: String, value: 'PROJ#${id}' },
            gsi1sk: { type: String, value: 'PROJ#${id}' },
        },
        Task: {
            pk: { type: String, value: 'PROJ#${projectId}' },
            sk: { type: String, value: 'TASK#${id}' },
            id: { type: String, required: true },
            projectId: { type: String, required: true },
            assignedToId: { type: String },
            title: { type: String },
            gsi1pk: { type: String, value: 'TASK#${id}' },
            gsi1sk: { type: String, value: 'TASK' },
        },
    },
};
exports.MySchema = MySchema;
const table = new dynamodb_onetable_1.Table({
    client: client,
    name: process.env.DYNAMODB_TABLE || 'ProjectManagementTable',
    schema: MySchema,
    partial: false,
});
exports.table = table;
//# sourceMappingURL=schema.js.map