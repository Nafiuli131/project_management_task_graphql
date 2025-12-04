"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = exports.ProjectResolver = exports.TeamResolver = exports.OrganizationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const entities_1 = require("./entities");
const schema_1 = require("./schema");
const inputs_1 = require("./inputs");
const uuid_1 = require("uuid");
const Org = schema_1.table.getModel('Organization');
const TeamM = schema_1.table.getModel('Team');
const ProjectM = schema_1.table.getModel('Project');
const TaskM = schema_1.table.getModel('Task');
// ==================================================================
// Organization
// ==================================================================
let OrganizationResolver = class OrganizationResolver {
    async organizations() {
        return await Org.scan({});
    }
    async organization(id) {
        const org = await Org.get({ id });
        return org ?? null;
    }
    async createOrganization(data) {
        return await Org.create({ id: (0, uuid_1.v4)(), ...data });
    }
    async updateOrganization(id, data) {
        try {
            const updated = await Org.update({ id, ...data }, { return: 'get' });
            return updated ?? null;
        }
        catch (e) {
            if (e.name === 'NotFoundError')
                return null;
            throw e;
        }
    }
    async deleteOrganization(id) {
        try {
            await Org.remove({ id });
            return true;
        }
        catch {
            return false;
        }
    }
    async teams(org) {
        const result = await TeamM.find({
            pk: `ORG#${org.id}`,
            sk: { begins_with: 'TEAM#' }
        });
        return result ?? [];
    }
};
exports.OrganizationResolver = OrganizationResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.Organization]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "organizations", null);
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.Organization, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "organization", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Organization),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.OrganizationInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "createOrganization", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Organization, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inputs_1.UpdateOrganizationInput]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "updateOrganization", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "deleteOrganization", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [entities_1.Team]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "teams", null);
exports.OrganizationResolver = OrganizationResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => entities_1.Organization)
], OrganizationResolver);
// ==================================================================
// Team
// ==================================================================
let TeamResolver = class TeamResolver {
    // Single Team by ID
    async team(id) {
        const [item] = await TeamM.find({ gsi1pk: `TEAM#${id}` }, { index: 'gsi1' });
        return item ?? null;
    }
    async teams() {
        return await TeamM.scan({});
    }
    async createTeam(data) {
        return await TeamM.create({ id: (0, uuid_1.v4)(), ...data });
    }
    async updateTeam(id, data) {
        const team = await this.team(id);
        if (!team)
            return null;
        const updated = await TeamM.update({ pk: team.pk, sk: team.sk, ...data }, { return: 'get' });
        return updated ?? null;
    }
    async deleteTeam(id) {
        const team = await this.team(id);
        if (!team)
            return false;
        await TeamM.remove({ pk: team.pk, sk: team.sk });
        return true;
    }
    async projects(team) {
        const result = await ProjectM.find({
            pk: `TEAM#${team.id}`,
            sk: { begins_with: 'PROJ#' }
        });
        return result ?? [];
    }
    async organization(team) {
        if (!team.organizationId)
            return null;
        const org = await Org.get({ id: team.organizationId });
        return org ?? null;
    }
};
exports.TeamResolver = TeamResolver;
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.Team, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "team", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.Team]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "teams", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Team),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.TeamInput]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "createTeam", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Team, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inputs_1.UpdateTeamInput]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "updateTeam", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "deleteTeam", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [entities_1.Project]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => entities_1.Organization, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "organization", null);
exports.TeamResolver = TeamResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => entities_1.Team)
], TeamResolver);
// ==================================================================
// Project
// ==================================================================
let ProjectResolver = class ProjectResolver {
    async project(id) {
        const [item] = await ProjectM.find({ gsi1pk: `PROJ#${id}` }, { index: 'gsi1' });
        return item ?? null;
    }
    async projects() {
        return await ProjectM.scan({});
    }
    async createProject(data) {
        return await ProjectM.create({ id: (0, uuid_1.v4)(), ...data });
    }
    async updateProject(id, data) {
        const proj = await this.project(id);
        if (!proj)
            return null;
        const updated = await ProjectM.update({ pk: proj.pk, sk: proj.sk, ...data }, { return: 'get' });
        return updated ?? null;
    }
    async deleteProject(id) {
        const proj = await this.project(id);
        if (!proj)
            return false;
        await ProjectM.remove({ pk: proj.pk, sk: proj.sk });
        return true;
    }
    async tasks(proj) {
        const result = await TaskM.find({
            pk: `PROJ#${proj.id}`,
            sk: { begins_with: 'TASK#' }
        });
        return result ?? [];
    }
    async team(proj) {
        if (!proj.teamId)
            return null;
        const [team] = await TeamM.find({ gsi1pk: `TEAM#${proj.teamId}` }, { index: 'gsi1' });
        return team ?? null;
    }
};
exports.ProjectResolver = ProjectResolver;
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.Project, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Project),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Project, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inputs_1.UpdateProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [entities_1.Task]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => entities_1.Team, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "team", null);
exports.ProjectResolver = ProjectResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => entities_1.Project)
], ProjectResolver);
// ==================================================================
// Task
// ==================================================================
let TaskResolver = class TaskResolver {
    async task(id) {
        const [item] = await TaskM.find({ gsi1pk: `TASK#${id}` }, { index: 'gsi1' });
        return item ?? null;
    }
    // All Tasks (ID ছাড়াই দেখা যাবে)
    async tasks() {
        return await TaskM.scan({});
    }
    async createTask(data) {
        return await TaskM.create({ id: (0, uuid_1.v4)(), ...data });
    }
    async updateTask(id, data) {
        const task = await this.task(id);
        if (!task)
            return null;
        const updated = await TaskM.update({ pk: task.pk, sk: task.sk, ...data }, { return: 'get' });
        return updated ?? null;
    }
    async deleteTask(id) {
        const task = await this.task(id);
        if (!task)
            return false;
        await TaskM.remove({ pk: task.pk, sk: task.sk });
        return true;
    }
    async project(task) {
        if (!task.projectId)
            return null;
        const proj = await ProjectM.get({ id: task.projectId });
        return proj ?? null;
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, type_graphql_1.Query)(() => entities_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "task", null);
__decorate([
    (0, type_graphql_1.Query)(() => [entities_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Task),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.TaskInput]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => entities_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inputs_1.UpdateTaskInput]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => entities_1.Project, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "project", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => entities_1.Task)
], TaskResolver);
//# sourceMappingURL=resolvers.js.map