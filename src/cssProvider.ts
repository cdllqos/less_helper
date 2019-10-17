import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  ProviderResult,
  CompletionItem,
  CompletionList
} from "vscode";
import { Storage } from "./storage";

class CssProvider implements CompletionItemProvider {
  provideCompletionItems(
    textDoc: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList> {
    const items: CompletionItem[] = [];
    Storage.storages.forEach(storages => {
      items.push(...storages);
    });
    return items;
  }
}

export { CssProvider };
