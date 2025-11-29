import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
        // precondition
        if (!baseName || !parent) {
            throw new IllegalArgumentException("Arguments must not be null")
        }
        // precondition
        if (typeof baseName !== "string") {
            throw new IllegalArgumentException("TypeError: bn must be a string");
        }
        // precondition
        if (!(parent instanceof Directory)) {
            throw new IllegalArgumentException("TypeError: pnmust be instance of Node");
        }
    }

    public open(): void {
        // the homework instruction only talks about implementing preconditions in the files dir!
        // do something
    }

    public read(noBytes: number): Int8Array {
        // the homework instruction only talks about implementing preconditions in the files dir!
        // read something
        return new Int8Array();
    }

    public close(): void {
        // the homework instruction only talks about implementing preconditions in the files dir!
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}