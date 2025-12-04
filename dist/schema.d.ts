import { Table, Entity } from 'dynamodb-onetable';
declare const MySchema: {
    format: string;
    version: string;
    indexes: {
        primary: {
            hash: string;
            sort: string;
        };
        gsi1: {
            hash: string;
            sort: string;
            project: string;
        };
    };
    models: {
        Organization: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            ownerId: {
                type: StringConstructor;
                required: boolean;
            };
            name: {
                type: StringConstructor;
            };
        };
        Team: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            organizationId: {
                type: StringConstructor;
                required: boolean;
            };
            name: {
                type: StringConstructor;
            };
            gsi1pk: {
                type: StringConstructor;
                value: string;
            };
            gsi1sk: {
                type: StringConstructor;
                value: string;
            };
        };
        Project: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            teamId: {
                type: StringConstructor;
                required: boolean;
            };
            ownerId: {
                type: StringConstructor;
                required: boolean;
            };
            name: {
                type: StringConstructor;
            };
            gsi1pk: {
                type: StringConstructor;
                value: string;
            };
            gsi1sk: {
                type: StringConstructor;
                value: string;
            };
        };
        Task: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            projectId: {
                type: StringConstructor;
                required: boolean;
            };
            assignedToId: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
            gsi1pk: {
                type: StringConstructor;
                value: string;
            };
            gsi1sk: {
                type: StringConstructor;
                value: string;
            };
        };
    };
};
declare const table: Table<{
    format: string;
    version: string;
    indexes: {
        primary: {
            hash: string;
            sort: string;
        };
        gsi1: {
            hash: string;
            sort: string;
            project: string;
        };
    };
    models: {
        Organization: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            ownerId: {
                type: StringConstructor;
                required: boolean;
            };
            name: {
                type: StringConstructor;
            };
        };
        Team: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            organizationId: {
                type: StringConstructor;
                required: boolean;
            };
            name: {
                type: StringConstructor;
            };
            gsi1pk: {
                type: StringConstructor;
                value: string;
            };
            gsi1sk: {
                type: StringConstructor;
                value: string;
            };
        };
        Project: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            teamId: {
                type: StringConstructor;
                required: boolean;
            };
            ownerId: {
                type: StringConstructor;
                required: boolean;
            };
            name: {
                type: StringConstructor;
            };
            gsi1pk: {
                type: StringConstructor;
                value: string;
            };
            gsi1sk: {
                type: StringConstructor;
                value: string;
            };
        };
        Task: {
            pk: {
                type: StringConstructor;
                value: string;
            };
            sk: {
                type: StringConstructor;
                value: string;
            };
            id: {
                type: StringConstructor;
                required: boolean;
            };
            projectId: {
                type: StringConstructor;
                required: boolean;
            };
            assignedToId: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
            gsi1pk: {
                type: StringConstructor;
                value: string;
            };
            gsi1sk: {
                type: StringConstructor;
                value: string;
            };
        };
    };
}>;
export { table, MySchema };
export type OrganizationType = Entity<typeof MySchema.models.Organization>;
export type TeamType = Entity<typeof MySchema.models.Team>;
export type ProjectType = Entity<typeof MySchema.models.Project>;
export type TaskType = Entity<typeof MySchema.models.Task>;
//# sourceMappingURL=schema.d.ts.map