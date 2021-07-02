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
exports.TransientTestModule = exports.MyService = exports.NestedTransient = exports.DeepTransient = void 0;
const common_1 = require("@nestjs/common");
let deepCtorCalled = false;
let DeepTransient = class DeepTransient {
    constructor() {
        this.field = 'Alive via init!';
        console.log('DeepTransient constructor, I WANT TO BE CALLED!');
        this.field = 'Alive via constructor';
        deepCtorCalled = true;
    }
    method() {
        return `DeepTransient method says hello!\n
    \n>>> DeepTransient field, are you alive? >> ${this.field} <<<\n`;
    }
};
DeepTransient = __decorate([
    common_1.Injectable({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], DeepTransient);
exports.DeepTransient = DeepTransient;
let NestedTransient = class NestedTransient {
    constructor(deepTransient) {
        this.deepTransient = deepTransient;
        console.log(`NestedTransient constructor`);
        console.log(`Dependency created?: ${!!deepTransient}. Is it right instance? ${deepTransient instanceof DeepTransient}`);
        console.log(`\n>>> Was dependency constructor called? >> ${deepCtorCalled} <<<\n`);
        console.log('What about properties?');
        console.log(`${this.deepTransient.method()}`);
    }
    checkField() {
        return this.deepTransient.method();
    }
};
NestedTransient = __decorate([
    common_1.Injectable({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [DeepTransient])
], NestedTransient);
exports.NestedTransient = NestedTransient;
let MyService = class MyService {
    constructor(service) {
        this.service = service;
        console.log('MyService constructor');
    }
    someWork() {
        console.log(`MyService ${deepCtorCalled ? 'is happy!' : 'cries :\'('}`);
    }
    onModuleInit() {
        this.someWork();
    }
};
MyService = __decorate([
    common_1.Injectable({}),
    __metadata("design:paramtypes", [NestedTransient])
], MyService);
exports.MyService = MyService;
let TransientTestModule = class TransientTestModule {
};
TransientTestModule = __decorate([
    common_1.Module({
        providers: [
            MyService,
            NestedTransient,
            DeepTransient
        ]
    })
], TransientTestModule);
exports.TransientTestModule = TransientTestModule;
//# sourceMappingURL=TransientTestModule.js.map