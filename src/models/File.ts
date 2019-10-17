import { ReadStream } from "fs";

class File {
  public filename: string;
  public readStream: ReadStream;
  constructor({ ...file }: File) {
    this.filename = file.filename;
    this.readStream = file.readStream;
  }
}
export { File };
