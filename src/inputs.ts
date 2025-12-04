import { Field, ID, InputType } from 'type-graphql';

// Organization Inputs
@InputType()
export class OrganizationInput {
    @Field()
    name!: string;
    @Field(() => ID)
    ownerId!: string;
}
@InputType()
export class UpdateOrganizationInput {
    @Field({ nullable: true })
    name?: string;
    @Field(() => ID, { nullable: true })
    ownerId?: string;
}

// Team Inputs
@InputType()
export class TeamInput {
    @Field()
    name!: string;
    @Field(() => ID)
    organizationId!: string;
}
@InputType()
export class UpdateTeamInput {
    @Field({ nullable: true })
    name?: string;
}

// Project Inputs
@InputType()
export class ProjectInput {
    @Field()
    name!: string;
    @Field(() => ID)
    teamId!: string;
    @Field(() => ID)
    ownerId!: string;
}
@InputType()
export class UpdateProjectInput {
    @Field({ nullable: true })
    name?: string;
    @Field(() => ID, { nullable: true })
    ownerId?: string;
}

// Task Inputs
@InputType()
export class TaskInput {
    @Field()
    title!: string;
    @Field(() => ID)
    projectId!: string;
    @Field(() => ID, { nullable: true })
    assignedToId?: string;
}
@InputType()
export class UpdateTaskInput {
    @Field({ nullable: true })
    title?: string;
    @Field(() => ID, { nullable: true })
    assignedToId?: string;
}