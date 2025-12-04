// src/server.ts

import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { OrganizationResolver, TeamResolver, ProjectResolver, TaskResolver } from './resolvers';
import * as dotenv from 'dotenv';

dotenv.config();

// --- 1. GraphQL Schema Creation ---
export async function createGraphQLSchema() {
    const schema = await buildSchema({
        resolvers: [OrganizationResolver, TeamResolver, ProjectResolver, TaskResolver],
        validate: false,
    });
    return schema;
}

// --- 2. Yoga Server Initialization ---
let yogaInstance: ReturnType<typeof createYoga> | null = null;

export async function getYogaInstance() {
    if (yogaInstance === null) {
        const schema = await createGraphQLSchema();

        yogaInstance = createYoga({
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

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const yoga = await getYogaInstance();

    // Convert AWS Lambda event to standard Fetch API Request object
    const request = new Request(event.path, {
        method: event.httpMethod,
        headers: event.headers as HeadersInit,
        body: event.body ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8') : undefined,
    });

    // Handle the request using the Yoga instance
    const response = await yoga.handleRequest(
        request,
        // Pass Lambda context/event data for potential use in resolvers
        { lambdaContext: context, lambdaEvent: event }
    );

    // Convert Yoga Response back to API Gateway format
    const responseBody = await response.text();

    return {
        statusCode: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseBody,
        isBase64Encoded: false,
    };
};