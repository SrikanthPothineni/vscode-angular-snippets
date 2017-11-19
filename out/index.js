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
const writer_1 = require("./writer");
function activate(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.subscriptions.push(vscode.commands.registerCommand('vscode-angular-snippets.sayHello', writer_1.configure)
        // vscode.commands.registerCommand('vscode-angular-snippets.sayHello', () => {
        //     vscode.window.showInformationMessage('Hello World!');
        // })
        );
    });
}
exports.activate = activate;
//# sourceMappingURL=index.js.map