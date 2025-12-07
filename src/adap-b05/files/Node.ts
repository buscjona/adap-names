import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;
    // As this is optional, it will only be initialised by a directory node
    protected childNodes?: Set<Node>;
    protected isRootNode: boolean = false;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
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
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.assertIsValidBaseName(bn);
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    // We can't use a getter in directory.ts since the cyclical import leads to 
    // compiling errors, hence the optional attribute and getter here
    public getChildNodes(): Set<Node> {
        return this.childNodes ?? new Set<Node>();
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        // preconidtion
        this.assertIsValidBaseName(bn);
        const matches = new Set<Node>();
        const baseName = this.getBaseName();
        // class invariant
        this.assertClassInvariant();

        if (baseName === bn) {
            matches.add(this)
        }

        // dfs recursively in all child nodes
        for (const child of this.getChildNodes()) {
            const subChilds = child.findNodes(bn);
            for (const subMatch of subChilds) {
                matches.add(subMatch);
            }
        }
        return matches;
    }

    // precondition
    protected assertIsValidBaseName(bn: string) {
        if (bn === "") {
            throw new IllegalArgumentException("base name can't be empty");
        }
        if (typeof bn !== "string") {
            throw new IllegalArgumentException("TypeError: base name has to be of type string")
        }
    }

    // class invariant 
    protected assertClassInvariant(): void {
        try {
            if (typeof this.baseName !== "string") {
                throw new InvalidStateException("TypeError: base name has to be of type string")
            }
            if (!this.isRootNode) {
                if (this.baseName === "") {
                    throw new InvalidStateException("Base name can't be empty");
                }
                if (!this.parentNode) {
                    throw new InvalidStateException("Every Node needs a parent node");
                }
            }
        } catch (e) {
            throw new ServiceFailureException("Node class invariant failed", e as Exception);
        }
    }
}