import { Injectable, Module, OnModuleInit, Scope } from "@nestjs/common";



let deepCtorCalled = false;


@Injectable({ scope: Scope.TRANSIENT })
export class DeepTransient {

  field = 'Alive via init!';

  constructor() {
    console.log('DeepTransient constructor, I WANT TO BE CALLED!');
    this.field = 'Alive via constructor';
    deepCtorCalled = true;
  }

  method() {
    return `DeepTransient method says hello!\n
    \n>>> DeepTransient field, are you alive? >> ${this.field} <<<\n`;
  }
}

/*
 * Change to Scope.DEFAULT to see everything works
*/
@Injectable({ scope: Scope.TRANSIENT })
export class NestedTransient {

  constructor(
    private readonly deepTransient: DeepTransient
  ) {
    console.log(`NestedTransient constructor`);
    console.log(`Dependency created?: ${!!deepTransient}. Is it right instance? ${
      deepTransient instanceof DeepTransient
    }`);

    console.log(`\n>>> Was dependency constructor called? >> ${deepCtorCalled} <<<\n`);

    console.log('What about properties?');
    console.log(`${this.deepTransient.method()}`);
  }

  checkField() {
    return this.deepTransient.method();
  }
}


@Injectable({})
export class MyService implements OnModuleInit {

  constructor(
    private readonly service: NestedTransient
  ) {
    console.log('MyService constructor');
  }

  someWork() {
    console.log(`MyService ${deepCtorCalled ? 'is happy!' : 'cries :\'('}`);
  }

  onModuleInit() {
    this.someWork();
  }
}


@Module({
  providers: [
    MyService,
    NestedTransient,
    DeepTransient
  ]
})
export class TransientTestModule{}