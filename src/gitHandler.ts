import * as vscode from 'vscode';
import simpleGit, { SimpleGit } from 'simple-git';

export interface GitDiff {
    files: string[];
    additions: number;
    deletions: number;
    diff: string;
}

export class GitHandler {
    private git: SimpleGit | null = null;

    private async getGit(): Promise<SimpleGit> {
        if (this.git) {
            return this.git;
        }

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder found');
        }

        this.git = simpleGit(workspaceFolder.uri.fsPath);
        return this.git;
    }

    async getStagedDiff(): Promise<GitDiff> {
        const git = await this.getGit();

        // Check if there are staged changes
        const status = await git.status();
        
        if (status.staged.length === 0) {
            throw new Error('No staged changes found. Please stage your changes first (git add).');
        }

        // Get diff of staged changes
        const diff = await git.diff(['--cached']);
        
        if (!diff) {
            throw new Error('Could not retrieve diff for staged changes');
        }

        // Get stats
        const diffSummary = await git.diffSummary(['--cached']);

        return {
            files: status.staged,
            additions: diffSummary.insertions,
            deletions: diffSummary.deletions,
            diff: diff
        };
    }

    async setCommitMessage(message: string): Promise<void> {
        // Use VS Code's built-in Git extension API
        const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
        const api = gitExtension?.getAPI(1);

        if (!api) {
            throw new Error('Git extension not found. Please ensure Git is installed and enabled.');
        }

        const repo = api.repositories[0];
        if (!repo) {
            throw new Error('No Git repository found in workspace');
        }

        // Set the commit message in the input box
        repo.inputBox.value = message;
        
        vscode.window.showInformationMessage('✅ Commit message generated! Review and commit when ready.');
    }

    async getRecentCommits(count: number = 10): Promise<string[]> {
        try {
            const git = await this.getGit();
            const log = await git.log({ maxCount: count });
            return log.all.map(commit => commit.message);
        } catch (error) {
            // Return empty array if no commits yet (new repo)
            return [];
        }
    }
}
