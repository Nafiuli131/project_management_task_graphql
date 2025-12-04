export declare class OrganizationInput {
    name: string;
    ownerId: string;
}
export declare class UpdateOrganizationInput {
    name?: string;
    ownerId?: string;
}
export declare class TeamInput {
    name: string;
    organizationId: string;
}
export declare class UpdateTeamInput {
    name?: string;
}
export declare class ProjectInput {
    name: string;
    teamId: string;
    ownerId: string;
}
export declare class UpdateProjectInput {
    name?: string;
    ownerId?: string;
}
export declare class TaskInput {
    title: string;
    projectId: string;
    assignedToId?: string;
}
export declare class UpdateTaskInput {
    title?: string;
    assignedToId?: string;
}
//# sourceMappingURL=inputs.d.ts.map