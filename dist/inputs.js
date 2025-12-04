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
exports.UpdateTaskInput = exports.TaskInput = exports.UpdateProjectInput = exports.ProjectInput = exports.UpdateTeamInput = exports.TeamInput = exports.UpdateOrganizationInput = exports.OrganizationInput = void 0;
const type_graphql_1 = require("type-graphql");
// Organization Inputs
let OrganizationInput = class OrganizationInput {
};
exports.OrganizationInput = OrganizationInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], OrganizationInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], OrganizationInput.prototype, "ownerId", void 0);
exports.OrganizationInput = OrganizationInput = __decorate([
    (0, type_graphql_1.InputType)()
], OrganizationInput);
let UpdateOrganizationInput = class UpdateOrganizationInput {
};
exports.UpdateOrganizationInput = UpdateOrganizationInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateOrganizationInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateOrganizationInput.prototype, "ownerId", void 0);
exports.UpdateOrganizationInput = UpdateOrganizationInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateOrganizationInput);
// Team Inputs
let TeamInput = class TeamInput {
};
exports.TeamInput = TeamInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TeamInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], TeamInput.prototype, "organizationId", void 0);
exports.TeamInput = TeamInput = __decorate([
    (0, type_graphql_1.InputType)()
], TeamInput);
let UpdateTeamInput = class UpdateTeamInput {
};
exports.UpdateTeamInput = UpdateTeamInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTeamInput.prototype, "name", void 0);
exports.UpdateTeamInput = UpdateTeamInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateTeamInput);
// Project Inputs
let ProjectInput = class ProjectInput {
};
exports.ProjectInput = ProjectInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProjectInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], ProjectInput.prototype, "teamId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], ProjectInput.prototype, "ownerId", void 0);
exports.ProjectInput = ProjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProjectInput);
let UpdateProjectInput = class UpdateProjectInput {
};
exports.UpdateProjectInput = UpdateProjectInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "ownerId", void 0);
exports.UpdateProjectInput = UpdateProjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateProjectInput);
// Task Inputs
let TaskInput = class TaskInput {
};
exports.TaskInput = TaskInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TaskInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], TaskInput.prototype, "projectId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], TaskInput.prototype, "assignedToId", void 0);
exports.TaskInput = TaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], TaskInput);
let UpdateTaskInput = class UpdateTaskInput {
};
exports.UpdateTaskInput = UpdateTaskInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "assignedToId", void 0);
exports.UpdateTaskInput = UpdateTaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateTaskInput);
//# sourceMappingURL=inputs.js.map