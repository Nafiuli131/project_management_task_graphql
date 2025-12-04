
import { Field, ObjectType, ID } from 'type-graphql';
import { TeamType, ProjectType, TaskType } from './schema'; // DynamoDB Types

@ObjectType()
export class Organization {
    @Field(() => ID)
    id!: string;
    @Field()
    name!: string;
    @Field(() => ID)
    ownerId!: string;
    @Field(() => [Team]) // Field Resolver use kora hobe
    teams?: TeamType[];
}

@ObjectType()
export class Team {
    @Field(() => ID)
    id!: string;
    @Field()
    name!: string;
    @Field(() => ID)
    organizationId!: string;
    @Field(() => [Project]) // Field Resolver use kora hobe
    projects?: ProjectType[];
}

@ObjectType()
export class Project {
    @Field(() => ID)
    id!: string;
    @Field()
    name!: string;
    @Field(() => ID)
    teamId!: string;
    @Field(() => ID)
    ownerId!: string;
    @Field(() => [Task]) // Field Resolver use kora hobe
    tasks?: TaskType[];
}

@ObjectType()
export class Task {
    @Field(() => ID)
    id!: string;
    @Field()
    title!: string;
    @Field(() => ID)
    projectId!: string;
    @Field(() => ID, { nullable: true })
    assignedToId?: string;
}