import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype constructor-method
    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
         this.assertIndexInRange(i);
        return this.name.split(this.delimiter)[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string) {
        this.assertIndexInRange(i);
        let temp: string[] = this.name.split(this.delimiter);
        temp[i] = c;
        this.name = temp.join(this.delimiter);
    }

    // @methodtype command-method
    public insert(i: number, c: string) {
        // insert allows i === length
        if (i < 0 || i > this.noComponents) {
            throw new Error(`IndexError: Index Out of Range`);
        }
        let temp: string[] = this.name.split(this.delimiter);
        temp.splice(i, 0, c);
        this.name = temp.join(this.delimiter);
        // We added an element so noComponents goes up by one
        this.noComponents += 1;
    }

    // @methodtype command-method
    public append(c: string) {
        let temp: string[] = this.name.split(this.delimiter);
        temp.push(c);
        this.name = temp.join(this.delimiter);
        this.noComponents += 1;
    }

    // @methodtype command-method
    public remove(i: number) {
        this.assertIndexInRange(i);
        let temp: string[] = this.name.split(this.delimiter);
        temp.splice(i, 1);
        this.name = temp.join(this.delimiter);
        this.noComponents -= 1; 
    }
}