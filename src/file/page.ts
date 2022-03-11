import { Buffer } from "https://deno.land/std@0.128.0/node/buffer.ts";

export interface PageProps {
  blocksize: number;
}

export class Page<T extends PageProps> {
  bb: Buffer;

  constructor(blocksize: T["blocksize"]) {
    this.bb = Buffer.alloc(blocksize);
  }

  getInt(offset: number): number {
    return this.bb.readInt32BE(offset);
  }

  setInt(offset: number, n: number): void {
    this.bb.writeInt32BE(n, offset);
  }

  getBytes(_offset: number): Buffer {
    return this.bb;
  }

  setBytes(offset: number, b: number): void {
    this.bb.writeInt32BE(b, offset);
  }

  getString(offset: number): string {
    const sBuf = this.bb.slice(offset);
    let end = 0;
    for (const b of sBuf.entries()) {
      if (b[1] == 0) {
        end = b[0];
        break;
      }
    }

    return this.bb.toString(undefined, offset, end + offset);
  }

  setString(offset: number, s: string): void {
    this.bb.write(s, offset);
  }

  contents(): Buffer {
    return this.bb;
  }
}

export const maxLength = (strlen: number): number => {
  // TODO
  return 100 + strlen;
};
