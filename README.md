# project_management_task_graphql

A company needs a system where organizations can manage teams, projects, and tasks. The system must handle complex nested relationships efficiently and be deployed as a scalable serverless application.

Requirements
1. Data Models (4 core entities)

Organization: Has multiple teams and an owner
Team: Belongs to an organization, has multiple members and projects
Project: Belongs to a team, has an owner and multiple tasks
Task: Belongs to a project, can be assigned to a user

2. Technical Requirements

Use TypeGraphQL decorators (@ObjectType, @Field, @Query, @Mutation, @FieldResolver)
Implement field resolvers for all relationships (don't load related data in parent resolvers)
Use DynamoDB single-table design with composite keys



Tech stack: Typescript, GraphQL Yoga Server, TypeGraphQL, DynamoDB One Table
https://the-guild.dev/graphql/yoga-server
https://www.npmjs.com/package/dynamodb-onetable

FYI: USE AI, no worries; however, must have the ability to explain code in depth


Deployment: AWS Lambda, API gateway using AWS CDKssss



My current directories:::
project-management-system/
├── .env                       # Local Environment Variables (DB Endpoint, Table Name)
├── package.json               # Project Dependencies and Scripts (start:local, build, deploy:cdk)
├── tsconfig.json              # TypeScript Compiler Settings (emitDecoratorMetadata: true)
|
├── src/                       # Source Code (Core GraphQL/DB Logic)
│   ├── entities.ts            # TypeGraphQL: @ObjectType definitions (Organization, Team, Project, Task)
│   ├── inputs.ts              # TypeGraphQL: @InputType definitions (For Create/Update Mutations)
│   ├── schema.ts              # DynamoDB One Table Schema: Defines PK/SK and handles Local/Cloud DB connection switch.
│   ├── resolvers.ts           # TypeGraphQL: Core CRUD Logic (@Query, @Mutation) and Field Resolvers.
│   ├── server.ts              # GraphQL Yoga Server Setup: Builds schema and exports the 'handler' for AWS Lambda.
│   └── index.ts               # Local Run Entry Point: Starts server on port 4000 and ensures DB Table creation.
|
└── cdk/                       # AWS CDK Deployment Code
    ├── lib/
    │   └── project-management-system-stack.ts # AWS CDK Stack: Defines DynamoDB Table, Lambda function, IAM Role, and API Gateway.
    └── bin/
        └── cdk.ts             # CDK entry point.
        
        
build project ::: npm run build
local run:::npm run start:local
deploy to cloud:::
# code compile first
npm run build

# CDK environment prepare 
cdk bootstrap

# Deploy korun
npm run deploy:cdk

aws configure:::
aws configure

