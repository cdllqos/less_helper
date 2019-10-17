import { CompletionItem } from "vscode";

class Storage {
  public static storages: Map<string, CompletionItem[]> = new Map<
    string,
    CompletionItem[]
  >();
  static addOrUpdate(pathName: string, completionItems: CompletionItem[]) {
    this.storages.set(pathName, completionItems);
  }

  static delete(pathName: string) {
    this.storages.delete(pathName);
  }

  static clear() {
    this.storages.clear();
  }
}
export { Storage };
