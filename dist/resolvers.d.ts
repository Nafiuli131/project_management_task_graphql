import { OrganizationType, TeamType, ProjectType, TaskType } from './schema';
import { OrganizationInput, UpdateOrganizationInput, TeamInput, UpdateTeamInput, ProjectInput, UpdateProjectInput, TaskInput, UpdateTaskInput } from './inputs';
export declare class OrganizationResolver {
    organizations(): Promise<OrganizationType[]>;
    organization(id: string): Promise<OrganizationType | null>;
    createOrganization(data: OrganizationInput): Promise<OrganizationType>;
    updateOrganization(id: string, data: UpdateOrganizationInput): Promise<OrganizationType | null>;
    deleteOrganization(id: string): Promise<boolean>;
    teams(org: OrganizationType): Promise<TeamType[]>;
}
export declare class TeamResolver {
    team(id: string): Promise<TeamType | null>;
    teams(): Promise<TeamType[]>;
    createTeam(data: TeamInput): Promise<TeamType>;
    updateTeam(id: string, data: UpdateTeamInput): Promise<TeamType | null>;
    deleteTeam(id: string): Promise<boolean>;
    projects(team: TeamType): Promise<ProjectType[]>;
    organization(team: TeamType): Promise<OrganizationType | null>;
}
export declare class ProjectResolver {
    project(id: string): Promise<ProjectType | null>;
    projects(): Promise<ProjectType[]>;
    createProject(data: ProjectInput): Promise<ProjectType>;
    updateProject(id: string, data: UpdateProjectInput): Promise<ProjectType | null>;
    deleteProject(id: string): Promise<boolean>;
    tasks(proj: ProjectType): Promise<TaskType[]>;
    team(proj: ProjectType): Promise<TeamType | null>;
}
export declare class TaskResolver {
    task(id: string): Promise<TaskType | null>;
    tasks(): Promise<TaskType[]>;
    createTask(data: TaskInput): Promise<TaskType>;
    updateTask(id: string, data: UpdateTaskInput): Promise<TaskType | null>;
    deleteTask(id: string): Promise<boolean>;
    project(task: TaskType): Promise<ProjectType | null>;
}
//# sourceMappingURL=resolvers.d.ts.map