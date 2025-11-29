import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
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
    }

    public hasChildNode(cn: Node): boolean {
        // precondition
        if (!cn) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (!(cn instanceof Node)) {
            throw new IllegalArgumentException("TypeError: target must be instance of Node");
        }
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        // precondition
        if (!cn) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (!(cn instanceof Node)) {
            throw new IllegalArgumentException("TypeError: target must be instance of Node");
        }
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        // precondition
        if (!cn) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (!(cn instanceof Node)) {
            throw new IllegalArgumentException("TypeError: target must be instance of Node");
        }
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

}