import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const YES_OR_NO_PROMPT: vscode.MessageItem[] = [
  {
    title: 'Yes',
    isCloseAffordance: false
  },
  {
    title: 'No',
    isCloseAffordance: true
  }
];

const ANGULAR_FILE_TYPES = {
  'papa.ts': genPapaFile
};

export async function configure(): Promise<void> {
  let folder: vscode.WorkspaceFolder;
  if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length === 1) {
    folder = vscode.workspace.workspaceFolders[0];
  } else {
    folder = await (<any>vscode).window.showWorkspaceFolderPick();
  }

  if (!folder) {
    if (!vscode.workspace.workspaceFolders) {
      vscode.window.showErrorMessage(
        'Angular files can only be generated if VS Code is opened on a folder.'
      );
    } else {
      vscode.window.showErrorMessage(
        'Angular files can only be generated if a workspace folder is picked in VS Code.'
      );
    }
    return;
  }

  // const platformType = await quickPickPlatform();
  // if (!platformType) return;

  // const port = await promptForPort();
  // if (!port) return;

  // const serviceName = path.basename(folder.uri.fsPath).toLowerCase();
  // const pkg = await readPackageJson(folder);

  vscode.window.showInformationMessage('Hello World!');

  await Promise.all(
    Object.keys(ANGULAR_FILE_TYPES).map(fileName => {
      return createWorkspaceFileIfNotExists(fileName, ANGULAR_FILE_TYPES[fileName]);
    })
  );

  async function createWorkspaceFileIfNotExists(fileName, writerFunction) {
    const workspacePath = path.join(folder.uri.fsPath, fileName);
    if (fs.existsSync(workspacePath)) {
      const item: vscode.MessageItem = await vscode.window.showErrorMessage(
        `A ${fileName} already exists. Would you like to override it?`,
        ...YES_OR_NO_PROMPT
      );
      if (item.title.toLowerCase() === 'yes') {
        // fs.writeFileSync(workspacePath, writerFunction(serviceName, platformType, port, pkg), {
        fs.writeFileSync(workspacePath, writerFunction(), {
          encoding: 'utf8'
        });
      }
    } else {
      fs.writeFileSync(workspacePath, writerFunction(), {
        encoding: 'utf8'
      });
    }
  }
}

// function genPapaFile(serviceName: string, platform: string, port: string): string {
function genPapaFile(): string {
  return `import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() { }
}
`;
}
