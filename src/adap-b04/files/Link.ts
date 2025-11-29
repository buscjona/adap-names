import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        // precondition
        if (!bn || !pn) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (typeof bn !== "string") {
            throw new IllegalArgumentException("TypeError: bn must be a string");
        }
        // precondition
        if (!(pn instanceof Directory)) {
            throw new IllegalArgumentException("TypeError: pnmust be instance of Node");
        }
        if(tn != undefined && !(tn instanceof Node)) {
            throw new IllegalArgumentException("TypeEroor: tn must be instance of Node");
        }
        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        // precondition
        if (!target) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (!(target instanceof Node)) {
            throw new IllegalArgumentException("TypeError: target must be instance of Node");
        }
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        // precondition
        if (!bn) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (typeof bn !== "string") {
            throw new IllegalArgumentException("TypeError: bn must be a string");
        }
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        // precondition
        if (!target) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (!(target instanceof Node)) {
            throw new IllegalArgumentException("TypeError: target must be instance of Node");
        }
        const result: Node = this.targetNode as Node;
        return result;
    }
}