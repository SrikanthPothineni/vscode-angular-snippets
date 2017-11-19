import * as vscode from 'vscode';

import { configure } from './writer';

export async function activate(ctx: vscode.ExtensionContext): Promise<void> {
  ctx.subscriptions.push(
    vscode.commands.registerCommand('vscode-angular-snippets.sayHello', configure)
    // vscode.commands.registerCommand('vscode-angular-snippets.sayHello', () => {
    //     vscode.window.showInformationMessage('Hello World!');
    // })
  );
}

