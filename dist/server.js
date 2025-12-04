"use strict";
// src/server.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.createGraphQLSchema = createGraphQLSchema;
exports.getYogaInstance = getYogaInstance;
require("reflect-metadata");
const graphql_yoga_1 = require("graphql-yoga");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("./resolvers");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// --- 1. GraphQL Schema Creation ---
async function createGraphQLSchema() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [resolvers_1.OrganizationResolver, resolvers_1.TeamResolver, resolvers_1.ProjectResolver, resolvers_1.TaskResolver],
        validate: false,
    });
    return schema;
}
// --- 2. Yoga Server Initialization ---
let yogaInstance = null;
async function getYogaInstance() {
    if (yogaInstance === null) {
        const schema = await createGraphQLSchema();
        yogaInstance = (0, graphql_yoga_1.createYoga)({
            schema,
            graphqlEndpoint: '/graphql',
            logging: true,
            batching: true,
            context: ({ req: _req }) => ({
            // You can pass the AWS Lambda Event/Context here if needed
            }),
        });
    }
    return yogaInstance;
}
// --- 3. AWS Lambda Handler (Entry Point) ---
const handler = async (event, context) => {
    const yoga = await getYogaInstance();
    // Convert AWS Lambda event to standard Fetch API Request object
    const request = new Request(event.path, {
        method: event.httpMethod,
        headers: event.headers,
        body: event.body ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8') : undefined,
    });
    // Handle the request using the Yoga instance
    const response = await yoga.handleRequest(request, 
    // Pass Lambda context/event data for potential use in resolvers
    { lambdaContext: context, lambdaEvent: event });
    // Convert Yoga Response back to API Gateway format
    const responseBody = await response.text();
    return {
        statusCode: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseBody,
        isBase64Encoded: false,
    };
};
exports.handler = handler;
//# sourceMappingURL=server.js.map