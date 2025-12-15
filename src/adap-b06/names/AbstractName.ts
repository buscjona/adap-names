import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Exception } from "../common/Exception";


export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // precondition
        if (typeof delimiter !== "string") {
            throw new IllegalArgumentException("TypeError: delimiter must be a string");
        }
        // precondition
        if (delimiter.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
        this.delimiter = delimiter;
    }

    // @methodtype command-method
    public abstract clone(): Name;

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        // precondtion 
        if (typeof delimiter !== "string") {
            throw new IllegalArgumentException("TypeError: delimiter must be a string");
        }
        const old = this.clone();
        // precondition
        if (delimiter.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
        let s = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            s += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                s += delimiter;
            }
        }

        // postcondition
        this.assertReturnIsValidStringAsPostcondition(s);
        // postcondition
        this.assertMethodDidNotMutateAsPostcondition(old);
        // class invariant checks no longer necessary, since no mutation
        return s;
    }

    // @methodtype conversion-method
    public toString(): string {
        return this.asDataString();
    }

    // @methodtype conversion-method
    public asDataString(): string {
        // no precondition necessary
        const old = this.clone();
        let result = "";
        const delim = this.delimiter;
        for (let i = 0; i < this.getNoComponents(); i++) {
            const component = this.getComponent(i);
            for (let ch of component) {
                if (ch === delim || ch === ESCAPE_CHARACTER) {
                    result += ESCAPE_CHARACTER;
                }
                result += ch;
            }
            if (i < this.getNoComponents() - 1) {
                result += delim;
            }
        }
        // postcondition
        this.assertReturnIsValidStringAsPostcondition(result);
        // postcondition
        this.assertMethodDidNotMutateAsPostcondition(old);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    // @methodtype boolean-query-method
    public isEqual(other: Name): boolean {
        // precondition
        if (!other) {
            throw new IllegalArgumentException("Argument must not be null")
        }
        let result = true;
        if (this.getNoComponents() !== other.getNoComponents()) {
            result = false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                result = false;
                break;
            }
        }
        // postcondition
        this.assertIsBooleanAsPostCondition(result);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    // @methodtype get-method
    public getHashCode(): number {
        // no precondition necessary
        let hash = 0;
        const s = this.asDataString();
        for (let ch of s) {
            hash += ch.charCodeAt(0);
        }
        // postcondition
        this.assertHashIsANumberAsPostCondition(hash);
        // class invariant checks no longer necessary, since no mutation
        return hash;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        const result = (this.getNoComponents() === 0);
        // postcondition
        this.assertIsBooleanAsPostCondition(result);
        // class invariant checks no longer necessary, since no mutation
        return result;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        //
        return this.delimiter;
    }

    // Minimal inheritance interface start
    // @methodtype get-method
    abstract getNoComponents(): number;
    // @methodtype get-method
    abstract getComponent(i: number): string;
    // @methodtype set-method
    abstract setComponent(i: number, c: string): Name;
    // @methodtype command-method
    abstract insert(i: number, c: string): Name;
    // @methodtype command-method
    abstract append(c: string): Name;
    // @methodtype command-method
    abstract remove(i: number): Name;
    // Minimal inheritance interface end

    // @methodtype command-method
    // no longer mutates the object
    public concat(other: Name): Name {
        // precondition
        if (!other) {
            throw new IllegalArgumentException("Argument must not be null")
        }
        const oldLength = this.getNoComponents();
        const otherLength = other.getNoComponents();
        let result: Name = this;
        for (let i = 0; i < other.getNoComponents(); i++) {
            result.append(other.getComponent(i));
        }
        // postcondition
        try {
            this.assertResultIsCorrectLengthAsPostCondition(oldLength, otherLength, result);
             // class invariant checks no longer necessary, since no mutation
            return result;
        } catch (e) {
            // class invariant checks no longer necessary, since no mutation
            // no restore to old necessary, since no mutation
            throw e;
        }
    }

    // precondition
    // @methodtype assertion-method
    public assertIndexIsValidAsPrecondition(i: number): void {
        if (typeof i !== "number") {
            throw new IllegalArgumentException("TypeError: Index must be a number")
        }
        this.assertIndexInRange(i);
    }

    // postcondition
    public assertReturnIsValidStringAsPostcondition(s: string): void {
        if (typeof s !== "string") {
            throw new MethodFailedException("TypeError: Result is not a string")
        }
    }

    // postcondition
    public assertMethodDidNotMutateAsPostcondition(old: Name): void {
        if (!this.isEqual(old)) {
            throw new MethodFailedException("The method should not mutate the object")
        }
    }

    // postcondition
    public assertIsBooleanAsPostCondition(result: boolean): void {
        if (typeof result != "boolean") {
            throw new MethodFailedException("TypeError: Must be a boolean")
        }
    }


    // postcondition
    public assertHashIsANumberAsPostCondition(hash: number): void {
        if (typeof hash !== "number") {
            throw new MethodFailedException("TypeError: Hash must be a number")
        }
    }

    // postcondition
    // updated to use result
    public assertResultIsCorrectLengthAsPostCondition(oldLength: number, otherLength: number, result: Name) {
        if (result.getNoComponents() !== oldLength + otherLength) {
            throw new MethodFailedException("New length not correct")
        }
    }

    // precondition
    // @methodtype assertion-method
    public assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("IndexError: Index Out of Range");
        }
    }

    // TODO entfernen nach StringName und StringArrayName Update
    // @methodtype command-method
    public restoreFrom(old: Name): void {
        while (this.getNoComponents() > 0) {
            this.remove(this.getNoComponents() - 1);
        }
        for (let i = 0; i < old.getNoComponents(); i++) {
            this.append(old.getComponent(i));
        }
    }
}
