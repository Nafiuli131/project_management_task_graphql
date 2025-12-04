import { Resolver, Query, Mutation, Arg, ID, FieldResolver, Root } from 'type-graphql';
import { Organization, Team, Project, Task } from './entities';
import { table, OrganizationType, TeamType, ProjectType, TaskType } from './schema';
import {
    OrganizationInput, UpdateOrganizationInput,
    TeamInput, UpdateTeamInput,
    ProjectInput, UpdateProjectInput,
    TaskInput, UpdateTaskInput
} from './inputs';
import { v4 as uuidv4 } from 'uuid';

const Org = table.getModel<OrganizationType>('Organization');
const TeamM = table.getModel<TeamType>('Team');
const ProjectM = table.getModel<ProjectType>('Project');
const TaskM = table.getModel<TaskType>('Task');

// ==================================================================
// Organization
// ==================================================================
@Resolver(() => Organization)
export class OrganizationResolver {
    @Query(() => [Organization])
    async organizations(): Promise<OrganizationType[]> {
        return await Org.scan({});
    }

    @Query(() => Organization, { nullable: true })
    async organization(@Arg('id', () => ID) id: string): Promise<OrganizationType | null> {
        const org = await Org.get({ id });
        return org ?? null;
    }

    @Mutation(() => Organization)
    async createOrganization(@Arg('data') data: OrganizationInput): Promise<OrganizationType> {
        return await Org.create({ id: uuidv4(), ...data });
    }

    @Mutation(() => Organization, { nullable: true })
    async updateOrganization(
        @Arg('id', () => ID) id: string,
        @Arg('data') data: UpdateOrganizationInput
    ): Promise<OrganizationType | null> {
        try {
            const updated = await Org.update({ id, ...data }, { return: 'get' });
            return updated ?? null;
        } catch (e: any) {
            if (e.name === 'NotFoundError') return null;
            throw e;
        }
    }

    @Mutation(() => Boolean)
    async deleteOrganization(@Arg('id', () => ID) id: string): Promise<boolean> {
        try {
            await Org.remove({ id });
            return true;
        } catch {
            return false;
        }
    }

    @FieldResolver(() => [Team])
    async teams(@Root() org: OrganizationType): Promise<TeamType[]> {
        const result = await TeamM.find({
            pk: `ORG#${org.id}`,
            sk: { begins_with: 'TEAM#' }
        });
        return result ?? [];
    }
}

// ==================================================================
// Team
// ==================================================================
@Resolver(() => Team)
export class TeamResolver {
    // Single Team by ID
    @Query(() => Team, { nullable: true })
    async team(@Arg('id', () => ID) id: string): Promise<TeamType | null> {
        const [item] = await TeamM.find({ gsi1pk: `TEAM#${id}` }, { index: 'gsi1' });
        return item ?? null;
    }

    @Query(() => [Team])
    async teams(): Promise<TeamType[]> {
        return await TeamM.scan({});
    }

    @Mutation(() => Team)
    async createTeam(@Arg('data') data: TeamInput): Promise<TeamType> {
        return await TeamM.create({ id: uuidv4(), ...data });
    }

    @Mutation(() => Team, { nullable: true })
    async updateTeam(
        @Arg('id', () => ID) id: string,
        @Arg('data') data: UpdateTeamInput
    ): Promise<TeamType | null> {
        const team = await this.team(id);
        if (!team) return null;
        const updated = await TeamM.update({ pk: team.pk, sk: team.sk, ...data }, { return: 'get' });
        return updated ?? null;
    }

    @Mutation(() => Boolean)
    async deleteTeam(@Arg('id', () => ID) id: string): Promise<boolean> {
        const team = await this.team(id);
        if (!team) return false;
        await TeamM.remove({ pk: team.pk, sk: team.sk });
        return true;
    }

    @FieldResolver(() => [Project])
    async projects(@Root() team: TeamType): Promise<ProjectType[]> {
        const result = await ProjectM.find({
            pk: `TEAM#${team.id}`,
            sk: { begins_with: 'PROJ#' }
        });
        return result ?? [];
    }

    @FieldResolver(() => Organization, { nullable: true })
    async organization(@Root() team: TeamType): Promise<OrganizationType | null> {
        if (!team.organizationId) return null;
        const org = await Org.get({ id: team.organizationId });
        return org ?? null;
    }
}

// ==================================================================
// Project
// ==================================================================
@Resolver(() => Project)
export class ProjectResolver {
    @Query(() => Project, { nullable: true })
    async project(@Arg('id', () => ID) id: string): Promise<ProjectType | null> {
        const [item] = await ProjectM.find({ gsi1pk: `PROJ#${id}` }, { index: 'gsi1' });
        return item ?? null;
    }

    @Query(() => [Project])
    async projects(): Promise<ProjectType[]> {
        return await ProjectM.scan({});
    }

    @Mutation(() => Project)
    async createProject(@Arg('data') data: ProjectInput): Promise<ProjectType> {
        return await ProjectM.create({ id: uuidv4(), ...data });
    }

    @Mutation(() => Project, { nullable: true })
    async updateProject(
        @Arg('id', () => ID) id: string,
        @Arg('data') data: UpdateProjectInput
    ): Promise<ProjectType | null> {
        const proj = await this.project(id);
        if (!proj) return null;
        const updated = await ProjectM.update({ pk: proj.pk, sk: proj.sk, ...data }, { return: 'get' });
        return updated ?? null;
    }

    @Mutation(() => Boolean)
    async deleteProject(@Arg('id', () => ID) id: string): Promise<boolean> {
        const proj = await this.project(id);
        if (!proj) return false;
        await ProjectM.remove({ pk: proj.pk, sk: proj.sk });
        return true;
    }

    @FieldResolver(() => [Task])
    async tasks(@Root() proj: ProjectType): Promise<TaskType[]> {
        const result = await TaskM.find({
            pk: `PROJ#${proj.id}`,
            sk: { begins_with: 'TASK#' }
        });
        return result ?? [];
    }

    @FieldResolver(() => Team, { nullable: true })
    async team(@Root() proj: ProjectType): Promise<TeamType | null> {
        if (!proj.teamId) return null;
        const [team] = await TeamM.find({ gsi1pk: `TEAM#${proj.teamId}` }, { index: 'gsi1' });
        return team ?? null;
    }
}

// ==================================================================
// Task
// ==================================================================
@Resolver(() => Task)
export class TaskResolver {
    @Query(() => Task, { nullable: true })
    async task(@Arg('id', () => ID) id: string): Promise<TaskType | null> {
        const [item] = await TaskM.find({ gsi1pk: `TASK#${id}` }, { index: 'gsi1' });
        return item ?? null;
    }

    // All Tasks (ID ছাড়াই দেখা যাবে)
    @Query(() => [Task])
    async tasks(): Promise<TaskType[]> {
        return await TaskM.scan({});
    }

    @Mutation(() => Task)
    async createTask(@Arg('data') data: TaskInput): Promise<TaskType> {
        return await TaskM.create({ id: uuidv4(), ...data });
    }

    @Mutation(() => Task, { nullable: true })
    async updateTask(
        @Arg('id', () => ID) id: string,
        @Arg('data') data: UpdateTaskInput
    ): Promise<TaskType | null> {
        const task = await this.task(id);
        if (!task) return null;
        const updated = await TaskM.update({ pk: task.pk, sk: task.sk, ...data }, { return: 'get' });
        return updated ?? null;
    }

    @Mutation(() => Boolean)
    async deleteTask(@Arg('id', () => ID) id: string): Promise<boolean> {
        const task = await this.task(id);
        if (!task) return false;
        await TaskM.remove({ pk: task.pk, sk: task.sk });
        return true;
    }

    @FieldResolver(() => Project, { nullable: true })
    async project(@Root() task: TaskType): Promise<ProjectType | null> {
        if (!task.projectId) return null;
        const proj = await ProjectM.get({ id: task.projectId });
        return proj ?? null;
    }
}