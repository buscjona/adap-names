import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype constructor-method
    constructor(source: string, delimiter?: string) {
        super(delimiter);
        // precondition
        if (typeof source !== "string") {
            throw new IllegalArgumentException("TypeError: source must be a string");
        }
        this.name = source;
        this.noComponents = this.name.split(this.delimiter).length;
        // class invariant checks no longer necessary, since no mutation
    }

    // @methodtype command-method
    public clone(): Name {
        // class invariant checks no longer necessary, since no mutation
        return new StringName(this.name, this.delimiter);
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        // Precondition
        this.assertIndexIsValidAsPrecondition(i);
        const result = this.name.split(this.delimiter)[i];
        // postcondition
        this.assertReturnIsValidStringAsPostcondition(result);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): Name {
        // Precondition
        this.assertIndexIsValidAsPrecondition(i);
        // Also can be used as a precondition check
        this.assertReturnIsValidStringAsPostcondition(c);
        const copy = this.name;
        let temp: string[] = copy.split(this.delimiter);
        temp[i] = c;
        const result = new StringName(temp.join(this.delimiter), this.delimiter);
        // postcondition
        this.assertSetSuccessfullAsPostCondition(i, c, result);
        return result;
    }

    // @methodtype command-method
    public insert(i: number, c: string): Name {
        // Precondition
        if (typeof i !== "number") {
            throw new IllegalArgumentException("TypeError: Index must be a number")
        }
        // Precondition
        // insert allows i === length
        if (i < 0 || i > this.noComponents) {
            throw new Error("IndexError: Index Out of Range");
        }
        // Also can be used as a precondition check
        this.assertReturnIsValidStringAsPostcondition(c);
        const copy = this.name;
        let temp: string[] = copy.split(this.delimiter);
        temp.splice(i, 0, c);
        const result = new StringName(temp.join(this.delimiter), this.delimiter);
        // postcondition
        this.assertInsertSuccessfullAsPostCondition(i, c, result);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    // @methodtype command-method
    public append(c: string): Name {
        // Also can be used as a precondition check
        this.assertReturnIsValidStringAsPostcondition(c);
        const copy = this.name;
        const i = this.noComponents;
        let temp: string[] = copy.split(this.delimiter);
        temp.push(c);
        const result = new StringName(temp.join(this.delimiter), this.delimiter);
        // postcondition
        this.assertAppendSuccessfullAsPostCondition(i, c, result);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    // @methodtype command-method
    public remove(i: number): Name {
        // Precondition
        this.assertIndexIsValidAsPrecondition(i);
        const copy = this.name;
        let temp: string[] = copy.split(this.delimiter);
        temp.splice(i, 1);
        const result = new StringName(temp.join(this.delimiter), this.delimiter);
        // postcondition
        this.assertRemoveSuccessfullAsPostCondition(result);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    public assertSetSuccessfullAsPostCondition(i: number, c: string, result: Name): void {
        if (result.getComponent(i) !== c) {
            throw new MethodFailedException("set component failed");
        }
    }

    public assertInsertSuccessfullAsPostCondition(i: number, c: string, result: Name): void {
        if (result.getNoComponents() !== this.getNoComponents() + 1) {
            throw new MethodFailedException("insert failed")
        }
        if (result.getComponent(i) !== c) {
            throw new MethodFailedException("insert failed")
        }
    }

    public assertAppendSuccessfullAsPostCondition(i: number, c: string, result: Name): void {
        if (result.getNoComponents() !== this.getNoComponents() + 1) {
            throw new MethodFailedException("append failed")
        }
        if (result.getComponent(i) !== c) {
            throw new MethodFailedException("append failed")
        }
    }

    public assertRemoveSuccessfullAsPostCondition(result: Name): void {
        if (result.getNoComponents() !== this.getNoComponents() - 1) {
            throw new MethodFailedException("remove failed")
        }
    }
}