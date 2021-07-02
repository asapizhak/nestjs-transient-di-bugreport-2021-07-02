import { OnModuleInit } from "@nestjs/common";
export declare class DeepTransient {
    field: string;
    constructor();
    method(): string;
}
export declare class NestedTransient {
    private readonly deepTransient;
    constructor(deepTransient: DeepTransient);
    checkField(): string;
}
export declare class MyService implements OnModuleInit {
    private readonly service;
    constructor(service: NestedTransient);
    someWork(): void;
    onModuleInit(): void;
}
export declare class TransientTestModule {
}
