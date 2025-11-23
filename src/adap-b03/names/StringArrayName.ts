import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    // @methodtype constructor-method
    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    // @methodtype command-method
    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        this.assertIndexInRange(i)
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string) {
        this.assertIndexInRange(i);
        this.components[i] = c;
    }

    // @methodtype command-method
    public insert(i: number, c: string) {
        // insert allows i === length
        if (i < 0 || i > this.getNoComponents()) {
            throw new Error(`IndexError: Index Out of Range`);
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string) {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number) {
        this.assertIndexInRange(i);
        this.components.splice(i, 1);
    }
}