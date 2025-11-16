import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype constructor-method
    constructor(source: string, delimiter?: string) {
        // source not optional -> no check required
        this.name = source;
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        } else {
            this.delimiter = DEFAULT_DELIMITER;
        }
        this.noComponents = this.name.split(this.delimiter).length;
    }

    /**
    Can be supplied with a choosen delimiter, if it isn't provided the default delimiter is used.
    Combines the components of this.name using the choosen/default delimiter.
    **/
    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        let result: string = "";
        for (let i = 0; i < this.noComponents; i++) {
            let comp = this.getComponent(i);
            result += comp;
            // No delimiter after last comp
            if (i < this.noComponents -1) {
                result += delimiter;
            }
        }
        return result;
    }

    // @methodtype conversion-method
    public asDataString(): string {
        let result: string = "";
        for (let char of this.name) {
            if (char === this.delimiter || char === ESCAPE_CHARACTER) {
                    result += ESCAPE_CHARACTER;
            }
            result += char;
        }
        return result;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        this.assertIndexInRange(x);
        return this.name.split(this.delimiter)[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): void {
        this.assertIndexInRange(n);
        let temp: string[] = this.name.split(this.delimiter);
        temp[n] = c;
        this.name = temp.join(this.delimiter);
    }

    // @methodtype command-method
    public insert(n: number, c: string): void {
        // insert allows i === length
        if (n < 0 || n > this.noComponents) {
            throw new Error(`IndexError: Index Out of Range`);
        }
        let temp: string[] = this.name.split(this.delimiter);
        temp.splice(n, 0, c);
        this.name = temp.join(this.delimiter);
        // We added an element so noComponents goes up by one
        this.noComponents += 1;
    }

    // @methodtype command-method
    public append(c: string): void {
        let temp: string[] = this.name.split(this.delimiter);
        temp.push(c);
        this.name = temp.join(this.delimiter);
        this.noComponents += 1;
    }

    // @methodtype command-method
    public remove(n: number): void {
        this.assertIndexInRange(n);
        let temp: string[] = this.name.split(this.delimiter);
        temp.splice(n, 1);
        this.name = temp.join(this.delimiter);
        this.noComponents -= 1; 
    }

    // @methodtype command-method
    public concat(other: Name): void {
        let temp: string[] = this.name.split(this.delimiter);
        for (let i = 0; i < other.getNoComponents(); i++) {
            temp.push(other.getComponent(i));
        }
        this.name = temp.join(this.delimiter);
        // we need temp.lenth, since we donÄt know beforehand how many components the other Name object had
        this.noComponents = temp.length;
    }

    // @methodtype assertion-method
    private assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.noComponents) {
            throw new Error(`IndexError: Index Out of Range`);
        }
    }

}