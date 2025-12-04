import { Table, Entity } from 'dynamodb-onetable';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import * as dotenv from 'dotenv';
dotenv.config();

// --- Configuration Logic: Local vs. Cloud ---
let clientConfig: DynamoDB.DocumentClient.DocumentClientOptions & DynamoDB.ClientConfiguration = {
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
} else {
    console.log('[DB] Using AWS Cloud DynamoDB (Credentials from environment/role)');
}

const client = new DynamoDB.DocumentClient(clientConfig);

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

const table = new Table({
    client: client,
    name: process.env.DYNAMODB_TABLE || 'ProjectManagementTable',
    schema: MySchema,
    partial: false,
});

export { table, MySchema };
export type OrganizationType = Entity<typeof MySchema.models.Organization>;
export type TeamType = Entity<typeof MySchema.models.Team>;
export type ProjectType = Entity<typeof MySchema.models.Project>;
export type TaskType = Entity<typeof MySchema.models.Task>;