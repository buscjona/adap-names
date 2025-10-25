export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    // @methodtype constructor-method
    constructor(other: string[], delimiter?: string) {
        // not optional -> no check required; string immutable -> shallow copy
        this.components = [...other];
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        } else {
            this.delimiter = DEFAULT_DELIMITER;
        }
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
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
            if (i < this.getNoComponents() -1) {
                s += DEFAULT_DELIMITER;
            }
        }
        return s;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        this.assertIndexInRange(i);
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        this.assertIndexInRange(i);
        this.components[i] = c;
    }

     /** Returns number of components in Name instance */
     // @methodtype get-method
     public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype command-method
    public insert(i: number, c: string): void {
        // insert allows i === length
        if (i < 0 || i > this.getNoComponents()) {
            throw new Error(`IndexError: Index Out of Range`);
        }
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        this.assertIndexInRange(i);
        this.components.splice(i, 1);
    }

    // @methodtype assertion-method
    private assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`IndexError: Index Out of Range`);
        }
    }
}
