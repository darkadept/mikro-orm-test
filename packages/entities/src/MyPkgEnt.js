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
exports.MyPkgEnt = void 0;
const uuid_1 = require("uuid");
const core_1 = require("@mikro-orm/core");
let MyPkgEnt = class MyPkgEnt {
    constructor() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    core_1.PrimaryKey({ type: 'uuid' }),
    __metadata("design:type", Object)
], MyPkgEnt.prototype, "id", void 0);
__decorate([
    core_1.Property({ type: 'string' }),
    __metadata("design:type", String)
], MyPkgEnt.prototype, "name", void 0);
MyPkgEnt = __decorate([
    core_1.Entity()
], MyPkgEnt);
exports.MyPkgEnt = MyPkgEnt;
