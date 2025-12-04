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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.Project = exports.Team = exports.Organization = void 0;
const type_graphql_1 = require("type-graphql");
let Organization = class Organization {
};
exports.Organization = Organization;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Organization.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Team]) // Field Resolver use kora hobe
    ,
    __metadata("design:type", Array)
], Organization.prototype, "teams", void 0);
exports.Organization = Organization = __decorate([
    (0, type_graphql_1.ObjectType)()
], Organization);
let Team = class Team {
};
exports.Team = Team;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Team.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Team.prototype, "organizationId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Project]) // Field Resolver use kora hobe
    ,
    __metadata("design:type", Array)
], Team.prototype, "projects", void 0);
exports.Team = Team = __decorate([
    (0, type_graphql_1.ObjectType)()
], Team);
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "teamId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Task]) // Field Resolver use kora hobe
    ,
    __metadata("design:type", Array)
], Project.prototype, "tasks", void 0);
exports.Project = Project = __decorate([
    (0, type_graphql_1.ObjectType)()
], Project);
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Task.prototype, "projectId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "assignedToId", void 0);
exports.Task = Task = __decorate([
    (0, type_graphql_1.ObjectType)()
], Task);
//# sourceMappingURL=entities.js.map