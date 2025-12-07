import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    // @methodtype constructor-method
    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        if (!Array.isArray(source)) {
            throw new IllegalArgumentException("TypeError: argument must be an array")
        }
        for (let component of source) {
            if (typeof component !== "string") {
                throw new IllegalArgumentException("TypeError: components must be a string")
            }
        }
        this.components = [...source];
        // class invariant
        this.assertClassInvariant();
    }

    // @methodtype command-method
    public clone(): Name {
        // class invariant is all three pre and postcondition
        this.assertClassInvariant();
        return new StringArrayName([...this.components], this.delimiter);
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        // Precondition
        this.assertIndexIsValidAsPrecondition(i);
        const result = this.components[i];
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
        this.components[i] = c;
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
        if (i < 0 || i > this.getNoComponents()) {
            throw new Error("IndexError: Index Out of Range");
        }
        // Also can be used as a precondition check
        this.assertReturnIsValidStringAsPostcondition(c);
        const old = this.clone();
        this.components.splice(i, 0, c);
        // postcondition
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
        const i = this.getNoComponents();
        this.components.push(c);
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
        this.components.splice(i, 1);
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
        if (this.components[i] !== c) {
            throw new MethodFailedException("set component failed")
        }
    }

    public assertInsertSuccessfullAsPostCondition(i: number, c: string, old: Name): void {
        if (this.getNoComponents() !== old.getNoComponents() + 1) {
            throw new MethodFailedException("insert failed")
        }
        if (this.components[i] !== c) {
            throw new MethodFailedException("insert failed")
        }
    }

    public assertAppendSuccessfullAsPostCondition(i: number, c: string, old: Name): void {
        if (this.getNoComponents() !== old.getNoComponents() + 1) {
            throw new MethodFailedException("append failed")
        }
        if (this.components[i] !== c) {
            throw new MethodFailedException("append failed")
        }
    }

    public assertRemoveSuccessfullAsPostCondition(old: Name): void {
        if (this.getNoComponents() !== old.getNoComponents() - 1) {
            throw new MethodFailedException("remove failed")
        }
    }
}