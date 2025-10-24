import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test basic asString", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test basic asString with empty comp", () => {
    let n: Name = new Name(["oss", "", "fau", "de"]);
    expect(n.asString()).toBe("oss..fau.de");
  });
  it("test basic asDataString without delimiter in string or escape char", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asDataString()).toBe("oss.cs.fau.de");
  });
  it("test asDataString with empty comp", () => {
    let n: Name = new Name(["oss", "", "fau", "de"]);
  expect(n.asDataString()).toBe("oss..fau.de"); 
  });
  it("test getComponent", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(0)).toBe("oss");
  });
  it("test set component", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.setComponent(1, "cs");
    expect(n.asString()).toBe("oss.cs.de");
  });
  it("test append component", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.append("gov");
    expect(n.asString()).toBe("oss.cs.fau.de.gov");
  });
  it("test remove component", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.remove(1);
    expect(n.asString()).toBe("oss.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
  it("test basic asString with custom deliminiter", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString("_")).toBe("oss_cs_fau_de");
  });
  it("test asString with delimiter in component", () => {
    let n: Name = new Name(["oss.cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test asString with delimiter at the end of component", () => {
    let n: Name = new Name(["oss.", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss..cs.fau.de");
  });
  it("test asDataString with delimiter in string", () => {
    let n: Name = new Name(["oss.cs", "fau", "de"]);
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
  });
  it("test asDataString with delimiter at the start and end", () => {
    let n: Name = new Name([".oss", "cs", "fau", "de."]);
    expect(n.asDataString()).toBe("\\.oss.cs.fau.de\\.");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
  it("test asString with escape character in component", () => {
    let n: Name = new Name(["os\\s", "cs", "fau", "de"]);
    expect(n.asString()).toBe("os\\s.cs.fau.de");
  });
  it("test asDataString with escape char in string", () => {
    let n: Name = new Name(["oss", "cs", "fa\\u", "de"]);
    expect(n.asDataString()).toBe("oss.cs.fa\\\\u.de");
  });
  it("test asDataString with escape char in string and delimiter", () => {
    let n: Name = new Name(["oss.cs", "fa\\u", "de"]);
    expect(n.asDataString()).toBe("oss\\.cs.fa\\\\u.de");
  });
  it("test asDataString with multiple escape chars", () => {
    let n: Name = new Name(["fa\\\\u", "te\\st", "de"]);
  expect(n.asDataString()).toBe("fa\\\\\\\\u.te\\\\st.de");
  });
});


describe("Error checks", () => {
  it("test insert index error", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    expect(() => n.insert(-1, "cs")).toThrowError("IndexError: Index Out of Range");
    expect(() => n.insert(4, "cs")).toThrowError("IndexError: Index Out of Range");
    expect(() => n.insert(3, "cs")).not.toThrowError("IndexError: Index Out of Range");
  });
  it("test index error for other functions (get, set, remove)", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(() => n.getComponent(-1)).toThrowError("IndexError: Index Out of Range");
    expect(() => n.getComponent(4)).toThrowError("IndexError: Index Out of Range");
    expect(() => n.setComponent(-1, "Hallo Welt")).toThrowError("IndexError: Index Out of Range");
    expect(() => n.setComponent(4, "Hallo Welt")).toThrowError("IndexError: Index Out of Range");
    expect(() => n.remove(-1)).toThrowError("IndexError: Index Out of Range");
    expect(() => n.remove(4)).toThrowError("IndexError: Index Out of Range");
  });
});
