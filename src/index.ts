
import 'reflect-metadata';
import { getYogaInstance } from './server';
import { table } from './schema';
import { createServer } from 'http';

async function bootstrap() {
    console.log('--- Starting Project Management System ---');

    // Check and DynamoDB Table Create
    try {
        const isTableActive = await table.exists();
        if (!isTableActive) {
            console.log(`[DB] Creating DynamoDB Table: ${table.name}`);
            await table.createTable();
            console.log('[DB] Table created successfully!');
        } else {
            console.log(`[DB] DynamoDB Table exists: ${table.name}`);
        }
    } catch (error) {
        console.error('[DB] Error setting up DynamoDB:', error);
        process.exit(1);
    }

    // GraphQL Server Start
    const yoga = await getYogaInstance();
    const port = 4000;

    const server = createServer(yoga);

    server.listen(port, () => {
        console.log(` Server is running on http://localhost:${port}/graphql`);
    });
}

bootstrap().catch(console.error);