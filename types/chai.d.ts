/// <reference types="chai" />
/// <reference types="chai-things" />
/// <reference types="chai-as-promised" />

declare namespace Chai {
  interface PromisedAssertion extends Chai.Assertion {}
  interface PromisedInclude extends Chai.ArrayInclude {}
  interface ArrayAssertion extends Chai.Assertion {}
}
