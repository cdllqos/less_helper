import { Uri } from "vscode";
import { createReadStream } from "fs";
import { File } from "./models/File";

const UriFileReader = (uri: Uri, encoding: string): File => {
  const rs = createReadStream(uri.fsPath, { encoding });
  const file = new File({ filename: uri.path, readStream: rs });
  return file;
};

export { UriFileReader };
