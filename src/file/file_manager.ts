import fs from "https://deno.land/std@0.128.0/node/fs.ts";
import type { BlockId, BlockIdProps } from "./block_id.ts";
import { Page, PageProps } from "./page.ts";

export class FileMgr {
  dbDirectory: string;
  blocksize: number;

  constructor(dbDirectory: string, blocsize: number) {
    this.dbDirectory = dbDirectory;
    this.blocksize = blocsize;

    const isExist = fs.existsSync(this.dbDirectory);

    if (!isExist) {
      fs.mkdir(this.dbDirectory);
    }
  }

  read(blk: BlockId<BlockIdProps>, p: Page<PageProps>) {
    const data = fs.readFileSync(`${this.dbDirectory}/${blk.fileName()}`);
    p.bb = data;
  }

  write(blk: BlockId<BlockIdProps>, p: Page<PageProps>) {
    fs.writeFileSync(`${this.dbDirectory}/${blk.fileName()}`, p.contents());
  }
}
