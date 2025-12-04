"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("./server");
const schema_1 = require("./schema");
const http_1 = require("http");
async function bootstrap() {
    console.log('--- Starting Project Management System ---');
    // Check and DynamoDB Table Create
    try {
        const isTableActive = await schema_1.table.exists();
        if (!isTableActive) {
            console.log(`[DB] Creating DynamoDB Table: ${schema_1.table.name}`);
            await schema_1.table.createTable();
            console.log('[DB] Table created successfully!');
        }
        else {
            console.log(`[DB] DynamoDB Table exists: ${schema_1.table.name}`);
        }
    }
    catch (error) {
        console.error('[DB] Error setting up DynamoDB:', error);
        process.exit(1);
    }
    // GraphQL Server Start
    const yoga = await (0, server_1.getYogaInstance)();
    const port = 4000;
    const server = (0, http_1.createServer)(yoga);
    server.listen(port, () => {
        console.log(`\n🎉 Server is running on http://localhost:${port}/graphql`);
    });
}
bootstrap().catch(console.error);
//# sourceMappingURL=index.js.map