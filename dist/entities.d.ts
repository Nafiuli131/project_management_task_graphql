import { TeamType, ProjectType, TaskType } from './schema';
export declare class Organization {
    id: string;
    name: string;
    ownerId: string;
    teams?: TeamType[];
}
export declare class Team {
    id: string;
    name: string;
    organizationId: string;
    projects?: ProjectType[];
}
export declare class Project {
    id: string;
    name: string;
    teamId: string;
    ownerId: string;
    tasks?: TaskType[];
}
export declare class Task {
    id: string;
    title: string;
    projectId: string;
    assignedToId?: string;
}
//# sourceMappingURL=entities.d.ts.map