import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { AbstractName } from "../../../src/adap-b04/names/AbstractName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { StringName } from "../../../src/adap-b04/names/StringName";


describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const m: string = "null or undefined";

    IllegalArgumentException.assert("hurray!" != null);
    expect(() => IllegalArgumentException.assert(false, m)).toThrow(new IllegalArgumentException(m));

    MethodFailedException.assert("hurray!" != null);
    expect(() => MethodFailedException.assert(false, m)).toThrow(new MethodFailedException(m));

    InvalidStateException.assert("hurray!" != null);
    expect(() => InvalidStateException.assert(false, m)).toThrow(new InvalidStateException(m));
  });

});

describe("StringArrayName Tests", () => {
  it("test if constructor is safe", () => {
    expect(() => new StringArrayName(null as any)).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName("not an array" as any)).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName([1 as any])).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName(["Hallo", "Welt"], "abc")).toThrow(IllegalArgumentException);
  });
  it("test if index is safe", () => {
    const n = new StringArrayName(["Hallo", "Welt"]);
    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(2)).toThrow(IllegalArgumentException);
  });
  it("test if set, insert or append is safe", () => {
    const n = new StringArrayName(["Hallo", "Welt"]);
    expect(() => n.setComponent(0, null as any)).toThrow(MethodFailedException);
    expect(() => n.insert(1, null as any)).toThrow(MethodFailedException);
    expect(() => n.append(null as any)).toThrow(MethodFailedException);
  });
  it("test if mutate post condition triggers", () => {
    const n = new StringArrayName(["Hallo", "Welt"]);
    const old = n.clone();
    n.setComponent(0, "Abend");
    expect(() => n.assertMethodDidNotMutateAsPostcondition(old)).toThrow(MethodFailedException);
  });
}); 

describe("StringName Tests", () => {
  it("test if constructor is safe", () => {
    expect(() => new StringName(null as any)).toThrow(IllegalArgumentException);
    expect(() => new StringName("abc", "too long" as any)).toThrow(IllegalArgumentException);
    expect(() => new StringName("abc", "" as any)).toThrow(IllegalArgumentException);
  });

  it("test if index is safe", () => {
    const n = new StringName("Hallo.Welt");
    expect(() => n.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => n.getComponent(2)).toThrow(IllegalArgumentException);
  });

  it("test if set, insert or append is safe", () => {
    const n = new StringName("Hallo.Welt");
    expect(() => n.setComponent(0, null as any)).toThrow(MethodFailedException);
    expect(() => n.insert(1, null as any)).toThrow(MethodFailedException);
    expect(() => n.append(null as any)).toThrow(MethodFailedException);
  });

  it("test if mutate post condition triggers", () => {
    const n = new StringName("Hallo.Welt");
    const old = n.clone();
    n.setComponent(0, "Abend");
    expect(() => n.assertMethodDidNotMutateAsPostcondition(old)).toThrow(MethodFailedException);
  });
});
