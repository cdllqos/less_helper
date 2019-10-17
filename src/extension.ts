import { languages, ExtensionContext } from "vscode";
import { readCssFiles } from "./cssAnalysis";
import { Storage } from "./storage";
import { CssProvider } from "./cssProvider";
export function activate(context: ExtensionContext) {
  let cssProvider = new CssProvider();
  readCssFiles();
  context.subscriptions.push(
    languages.registerCompletionItemProvider("less", cssProvider)
  );
}
export function deactivate() {
  Storage.clear();
}
