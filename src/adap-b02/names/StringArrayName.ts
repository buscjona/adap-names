import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    // @methodtype constructor-method
    constructor(source: string[], delimiter?: string) {
        this.components = [...source];
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        } else {
            this.delimiter = DEFAULT_DELIMITER;
        }
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        let s: string = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            let comp = this.getComponent(i);
            let temp = "";
            for (let char of comp) {
                // escape char has to be escaped as well, i.e. \b would result in linebreak
                if (char === DEFAULT_DELIMITER || char === ESCAPE_CHARACTER) {
                    temp += ESCAPE_CHARACTER;
                }
                temp += char;
            }
            s += temp;
            // No delimiter after last comp
            if (i < this.getNoComponents() - 1) {
                s += DEFAULT_DELIMITER;
            }
        }
        return s;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        this.assertIndexInRange(i);
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        this.assertIndexInRange(i);
        this.components[i] = c;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        // insert allows i === length
        if (i < 0 || i > this.getNoComponents()) {
            throw new Error(`IndexError: Index Out of Range`);
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        this.assertIndexInRange(i);
        this.components.splice(i, 1);
    }

    // @methodtype command-method
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

    // @methodtype assertion-method
    private assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`IndexError: Index Out of Range`);
        }
    }
}