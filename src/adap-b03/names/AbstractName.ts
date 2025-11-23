import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        let s = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            s += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                s += delimiter;
            }
        }
        return s;
    }

    // @methodtype conversion-method
    public toString(): string {
        return this.asDataString();
    }

    // @methodtype conversion-method
    public asDataString(): string {
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
        return result;
    }

    // @methodtype boolean-query-method
    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    // @methodtype get-method
    public getHashCode(): number {
        let hash = 0;
        const s = this.asDataString();
        for (let ch of s) {
            hash += ch.charCodeAt(0);
        }
        return hash;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // Minimal inheritance interface start
    // @methodtype get-method
    abstract getNoComponents(): number;
    // @methodtype get-method
    abstract getComponent(i: number): string;
    // @methodtype set-method
    abstract setComponent(i: number, c: string): void;
    // @methodtype command-method
    abstract insert(i: number, c: string): void;
    // @methodtype command-method
    abstract append(c: string): void;
    // @methodtype command-method
    abstract remove(i: number): void;
    // Minimal inheritance interface end

    // @methodtype command-method
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    // @methodtype assertion-method
    public assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`IndexError: Index Out of Range`);
        }
    }

}
