import "../../extensions/string-extension.ts";

export interface BlockIdProps {
  filename: string;
  blknum: number;
}

export class BlockId<T extends BlockIdProps> {
  filename: T["filename"];
  blknum: T["blknum"];

  constructor(filename: T["filename"], blknum: T["blknum"]) {
    this.filename = filename;
    this.blknum = blknum;
  }

  fileName(): string {
    return this.filename;
  }

  number(): number {
    return this.blknum;
  }

  equals(obj: unknown): boolean {
    const blk = obj as BlockIdProps;
    return this.filename === blk.filename && this.blknum === blk.blknum;
  }

  toString(): string {
    return `[file ${this.filename}, block ${this.blknum}]`;
  }

  hashCode(): number {
    return this.toString().hashCode();
  }
}
