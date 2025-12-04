import 'reflect-metadata';
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
export declare function createGraphQLSchema(): Promise<import("graphql").GraphQLSchema>;
export declare function getYogaInstance(): Promise<import("graphql-yoga").YogaServerInstance<Record<string, any>, Record<string, any>>>;
export declare const handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>;
//# sourceMappingURL=server.d.ts.map