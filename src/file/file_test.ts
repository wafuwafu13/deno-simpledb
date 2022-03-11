import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { FileMgr } from "./file_manager.ts";
import { maxLength, Page } from "./page.ts";
import { BlockId } from "./block_id.ts";

Deno.test("file test", () => {
  const path = "./temp/file_test";
  const blockSize = 400;
  const fm = new FileMgr(path, blockSize);
  const blk = new BlockId("testfile", 2);
  const p1 = new Page(fm.blocksize);
  const pos1 = 88;
  p1.setString(pos1, "abcdefghijklm");
  const size = maxLength("abcdefghijklm".length);
  const pos2 = pos1 + size;
  p1.setInt(pos2, 345);
  fm.write(blk, p1);

  const p2 = new Page(fm.blocksize);
  fm.read(blk, p2);

  assertEquals(345, p2.getInt(pos2));
  assertEquals("abcdefghijklm", p2.getString(pos1));
});
