"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const YES_OR_NO_PROMPT = [
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
function configure() {
    return __awaiter(this, void 0, void 0, function* () {
        let folder;
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length === 1) {
            folder = vscode.workspace.workspaceFolders[0];
        }
        else {
            folder = yield vscode.window.showWorkspaceFolderPick();
        }
        if (!folder) {
            if (!vscode.workspace.workspaceFolders) {
                vscode.window.showErrorMessage('Angular files can only be generated if VS Code is opened on a folder.');
            }
            else {
                vscode.window.showErrorMessage('Angular files can only be generated if a workspace folder is picked in VS Code.');
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
        yield Promise.all(Object.keys(ANGULAR_FILE_TYPES).map(fileName => {
            return createWorkspaceFileIfNotExists(fileName, ANGULAR_FILE_TYPES[fileName]);
        }));
        function createWorkspaceFileIfNotExists(fileName, writerFunction) {
            return __awaiter(this, void 0, void 0, function* () {
                const workspacePath = path.join(folder.uri.fsPath, fileName);
                if (fs.existsSync(workspacePath)) {
                    const item = yield vscode.window.showErrorMessage(`A ${fileName} already exists. Would you like to override it?`, ...YES_OR_NO_PROMPT);
                    if (item.title.toLowerCase() === 'yes') {
                        // fs.writeFileSync(workspacePath, writerFunction(serviceName, platformType, port, pkg), {
                        fs.writeFileSync(workspacePath, writerFunction(), {
                            encoding: 'utf8'
                        });
                    }
                }
                else {
                    fs.writeFileSync(workspacePath, writerFunction(), {
                        encoding: 'utf8'
                    });
                }
            });
        }
    });
}
exports.configure = configure;
// function genPapaFile(serviceName: string, platform: string, port: string): string {
function genPapaFile() {
    return `import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() { }
}
`;
}
//# sourceMappingURL=writer.js.map