import { GitHandler } from './gitHandler';
import { AIProvider } from './aiProvider';

export class CommitMessageGenerator {
    constructor(
        private gitHandler: GitHandler,
        private aiProvider: AIProvider
    ) {}

    async generateAndSetCommitMessage(): Promise<void> {
        // Get staged diff
        const diffData = await this.gitHandler.getStagedDiff();
        
        // Get recent commits for context
        const recentCommits = await this.gitHandler.getRecentCommits(5);
        
        // Generate commit message with AI
        const aiResponse = await this.aiProvider.generateCommitMessage(
            diffData.diff,
            diffData.files,
            recentCommits
        );
        
        // Build final commit message
        let finalMessage = aiResponse.message;
        
        if (aiResponse.description) {
            finalMessage += `\n\n${aiResponse.description}`;
        }
        
        // Set the commit message in Git input box
        await this.gitHandler.setCommitMessage(finalMessage);
    }
}
