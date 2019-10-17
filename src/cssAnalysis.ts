import { workspace, CompletionItem, CompletionItemKind, Uri } from "vscode";
import { UriFileReader } from "./uriFilesReader";
import * as ReadLine from "readline";
import { Storage } from "./storage";

const getVariableIndex = (text: string): number => {
  return text.indexOf("@");
};

const getSemicolonIndex = (text: string): number => {
  return text.indexOf(";");
};

const getColonIndex = (text: string): number => {
  return text.indexOf(":");
};

const storageCompletionItem = (uri: Uri) => {
  const file = UriFileReader(uri, "utf8");
  const readline = ReadLine.createInterface(file.readStream);
  var completionItems: CompletionItem[] = [];
  readline.on("line", input => {
    const completionItem = getCompletionItem(input);
    if (completionItem) {
      completionItems.push(completionItem);
    }
  });
  readline.on("close", () => {
    Storage.addOrUpdate(file.filename, completionItems);
  });
};

const getCompletionItem = (text: string) => {
  const variableIndex = getVariableIndex(text);
  const colonIndex = getColonIndex(text);
  const semicolonIndex = getSemicolonIndex(text);

  if (variableIndex < 0 || semicolonIndex < 0 || colonIndex < 0) {
    return;
  }

  const variableLabel = text.substring(variableIndex, colonIndex).trim();
  const value = text.substring(colonIndex + 1, semicolonIndex).trim();

  const completionItem = new CompletionItem(value, CompletionItemKind.Snippet);
  completionItem.filterText = `@${value}`;
  completionItem.insertText = variableLabel;
  completionItem.documentation = `${value} ${variableLabel}`;
  return completionItem;
};

const readCssFiles = () => {
  const fileWatcher = workspace.createFileSystemWatcher("**/*$.less");
  fileWatcher.onDidCreate(e => {
    storageCompletionItem(e);
  });
  fileWatcher.onDidChange(e => {
    storageCompletionItem(e);
  });
  fileWatcher.onDidDelete(e => {
    Storage.delete(e.fsPath);
  });
  workspace.findFiles("**/*$.less").then(uris => {
    uris.map(uri => {
      storageCompletionItem(uri);
    });
  });
};

export { readCssFiles };
