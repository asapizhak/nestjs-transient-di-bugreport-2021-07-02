import { Injectable, Module, OnModuleInit, Scope } from "@nestjs/common";



let deepCtorCalled = false;
let veryDeepCtorCalled = false;

@Injectable({ scope: Scope.TRANSIENT })
export class VeryDeepTransient {

  constructor() {
    console.log('VeryDeepTransient constructor, I WANT TO BE CALLED TOO!');
    veryDeepCtorCalled = true;
  }
}


@Injectable({ scope: Scope.TRANSIENT })
export class DeepTransient {

  field = 'Alive via init!';

  constructor(
    private readonly veryDeepTransient: VeryDeepTransient
  ) {
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
    console.log(`NestedTransient constructor start`);
    console.log(`\nDeepTransient created?: ${!!deepTransient}. Is it right instance? ${
      deepTransient instanceof DeepTransient
    }`);

    console.log(`\n>>> Was VeryDeepTransient constructor called? >> ${veryDeepCtorCalled} <<<`);
    console.log(`>>> Was DeepTransient constructor called? >> ${deepCtorCalled} <<<\n`);

    console.log('What about properties?');
    console.log(`${this.deepTransient.method()}`);
    console.log(`NestedTransient constructor end`);
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
    console.log(`MyService ${deepCtorCalled &&  veryDeepCtorCalled ? 'is happy!' : 'cries :\'('}`);
  }

  onModuleInit() {
    this.someWork();
  }
}


@Module({
  providers: [
    MyService,
    NestedTransient,
    DeepTransient,
    VeryDeepTransient
  ]
})
export class TransientTestModule{}