import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        // precondition
        if (!bn || !pn) {
            throw new IllegalArgumentException("Argument must not be null")
        }
        // precondition
        if (typeof bn !== "string") {
            throw new IllegalArgumentException("TypeError: bn must be a string");
        }
        // precondition
        if (!(pn instanceof Directory)) {
            throw new IllegalArgumentException("TypeError: pnmust be instance of directory");
        }
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        // precondition not necessary as this is called by constructor
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        // precondition
        if (!to) {
            throw new IllegalArgumentException("Argument must not be null");
        }
        // precondition
        if (!(to instanceof Directory)) {
            throw new IllegalArgumentException("TypeError: pnmust be instance of directory");
        }
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        // precondition
        if (!bn) {
            throw new IllegalArgumentException("Argument must not be null");
        }
        // precondition
        if (typeof bn !== "string") {
            throw new IllegalArgumentException("TypeError: bn must be a string");
        }
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        // is called by rename so no precon necessary
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

}
