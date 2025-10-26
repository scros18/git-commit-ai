import * as vscode from 'vscode';
import { GitHandler } from './gitHandler';
import { AIProvider } from './aiProvider';
import { CommitMessageGenerator } from './commitMessageGenerator';

export function activate(context: vscode.ExtensionContext) {
    console.log('✨ Git Commit AI is now active!');

    const gitHandler = new GitHandler();
    const aiProvider = new AIProvider();
    const commitGenerator = new CommitMessageGenerator(gitHandler, aiProvider);

    // Command: Generate Commit Message
    const generateCommitCommand = vscode.commands.registerCommand(
        'git-commit-ai.generateCommit',
        async () => {
            try {
                await vscode.window.withProgress(
                    {
                        location: vscode.ProgressLocation.Notification,
                        title: '✨ Generating commit message with AI...',
                        cancellable: false
                    },
                    async () => {
                        await commitGenerator.generateAndSetCommitMessage();
                    }
                );
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                vscode.window.showErrorMessage(`❌ ${errorMessage}`);
            }
        }
    );

    // Command: Configure API Key
    const configureCommand = vscode.commands.registerCommand(
        'git-commit-ai.configure',
        async () => {
            const config = vscode.workspace.getConfiguration('gitCommitAI');
            
            // Ask for provider first
            const provider = await vscode.window.showQuickPick(
                [
                    { label: '🤖 OpenAI', value: 'openai' },
                    { label: '🧠 Anthropic (Claude)', value: 'anthropic' },
                    { label: '🏠 Ollama (Local)', value: 'ollama' }
                ],
                {
                    placeHolder: 'Select AI provider',
                    title: 'Git Commit AI Configuration'
                }
            );

            if (!provider) {
                return;
            }

            await config.update('provider', provider.value, vscode.ConfigurationTarget.Global);

            if (provider.value !== 'ollama') {
                const apiKey = await vscode.window.showInputBox({
                    prompt: `Enter your ${provider.label} API key`,
                    password: true,
                    placeHolder: 'sk-...',
                    ignoreFocusOut: true
                });

                if (apiKey) {
                    await config.update('apiKey', apiKey, vscode.ConfigurationTarget.Global);
                    vscode.window.showInformationMessage(`✅ ${provider.label} API key saved!`);
                }
            } else {
                vscode.window.showInformationMessage('✅ Ollama selected! Make sure Ollama is running locally.');
            }
        }
    );

    context.subscriptions.push(generateCommitCommand, configureCommand);
}

export function deactivate() {}
