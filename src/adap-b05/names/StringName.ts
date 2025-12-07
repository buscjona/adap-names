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
        // precondition
        if (typeof delimiter !== "string") {
            throw new IllegalArgumentException("TypeError: delimiter must be a string");
        }
        // precondition
        if (delimiter.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
        this.name = source;
        this.noComponents = this.name.split(this.delimiter).length;
        // class invariant
        this.assertClassInvariant();
    }

    // @methodtype command-method
    public clone(): Name {
        // class invariant is all three pre and postcondition
        this.assertClassInvariant();
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
        // class invariant
        this.assertClassInvariant();
        return result;
    }

    // @methodtype set-method
    public setComponent(i: number, c: string) {
        // Precondition
        this.assertIndexIsValidAsPrecondition(i);
        // Also can be used as a precondition check
        this.assertReturnIsValidStringAsPostcondition(c);
        const old = this.clone();
        let temp: string[] = this.name.split(this.delimiter);
        temp[i] = c;
        this.name = temp.join(this.delimiter);
        // postcondition
        try {
            this.assertSetSuccessfullAsPostCondition(i, c);
            // class invariant
            this.assertClassInvariant();
        } catch (e) {
            this.restoreFrom(old);
            // class invariant()
            this.assertClassInvariant();
            throw e;
        }
    }

    // @methodtype command-method
    public insert(i: number, c: string) {
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
        const old = this.clone();
        let temp: string[] = this.name.split(this.delimiter);
        temp.splice(i, 0, c);
        this.name = temp.join(this.delimiter);
        // We added an element so noComponents goes up by one
        this.noComponents += 1;
        try {
            this.assertInsertSuccessfullAsPostCondition(i, c, old)
            // class invariant
            this.assertClassInvariant();
        } catch (e) {
            this.restoreFrom(old);
            // class invariant
            this.assertClassInvariant();
            throw e;
        }
    }

    // @methodtype command-method
    public append(c: string) {
        // Also can be used as a precondition check
        this.assertReturnIsValidStringAsPostcondition(c);
        const old = this.clone();
        const i = this.noComponents;
        let temp: string[] = this.name.split(this.delimiter);
        temp.push(c);
        this.name = temp.join(this.delimiter);
        this.noComponents += 1;
        // postcondition
        try {
            this.assertAppendSuccessfullAsPostCondition(i ,c , old)
            // class invariant
            this.assertClassInvariant();
        } catch (e) {
            this.restoreFrom(old);
            // class invariant
            this.assertClassInvariant();
            throw e;
        }
    }

    // @methodtype command-method
    public remove(i: number) {
        // Precondition
        this.assertIndexIsValidAsPrecondition(i);
        const old = this.clone();
        let temp: string[] = this.name.split(this.delimiter);
        temp.splice(i, 1);
        this.name = temp.join(this.delimiter);
        this.noComponents -= 1;
        // postcondition
        try {
            this.assertRemoveSuccessfullAsPostCondition(old)
            // class invariant
            this.assertClassInvariant();
        } catch (e) {
            this.restoreFrom(old);
            // class invariant
            this.assertClassInvariant();
            throw e;
        }
    }

    public assertSetSuccessfullAsPostCondition(i: number, c: string): void {
        if (this.getComponent(i) !== c) {
            throw new MethodFailedException("set component failed");
        }
    }

    public assertInsertSuccessfullAsPostCondition(i: number, c: string, old: Name): void {
        if (this.getNoComponents() !== old.getNoComponents() + 1) {
            throw new MethodFailedException("insert failed")
        }
        if (this.getComponent(i) !== c) {
            throw new MethodFailedException("insert failed")
        }
    }

    public assertAppendSuccessfullAsPostCondition(i: number, c: string, old: Name): void {
        if (this.getNoComponents() !== old.getNoComponents() + 1) {
            throw new MethodFailedException("append failed")
        }
        if (this.getComponent(i) !== c) {
            throw new MethodFailedException("append failed")
        }
    }

    public assertRemoveSuccessfullAsPostCondition(old: Name): void {
        if (this.getNoComponents() !== old.getNoComponents() - 1) {
            throw new MethodFailedException("remove failed")
        }
    }
}