import * as vscode from 'vscode';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';

export interface AIResponse {
    message: string;
    description?: string;
}

export class AIProvider {
    private openai: OpenAI | null = null;
    private anthropic: Anthropic | null = null;

    async generateCommitMessage(
        diff: string,
        files: string[],
        recentCommits: string[]
    ): Promise<AIResponse> {
        const config = vscode.workspace.getConfiguration('gitCommitAI');
        const provider = config.get<string>('provider') || 'openai';
        const apiKey = config.get<string>('apiKey');
        const model = config.get<string>('model') || 'gpt-4-turbo-preview';
        const commitStyle = config.get<string>('commitStyle') || 'conventional';
        const includeDescription = config.get<boolean>('includeDescription') || false;

        if (!apiKey && provider !== 'ollama') {
            throw new Error('API key not configured. Run "⚙️ Configure Git Commit AI" command.');
        }

        const prompt = this.buildPrompt(diff, files, recentCommits, commitStyle, includeDescription);

        switch (provider) {
            case 'openai':
                return await this.generateWithOpenAI(apiKey!, model, prompt);
            case 'anthropic':
                return await this.generateWithAnthropic(apiKey!, model, prompt);
            case 'ollama':
                return await this.generateWithOllama(model, prompt);
            default:
                throw new Error(`Unsupported AI provider: ${provider}`);
        }
    }

    private buildPrompt(
        diff: string,
        files: string[],
        recentCommits: string[],
        style: string,
        includeDescription: boolean
    ): string {
        let styleGuide = '';
        
        switch (style) {
            case 'conventional':
                styleGuide = `Use Conventional Commits format: <type>(<scope>): <description>
Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build
Example: "feat(auth): add OAuth2 login flow"`;
                break;
            case 'simple':
                styleGuide = 'Keep it simple and clear, no special format required. Just describe what changed.';
                break;
            case 'detailed':
                styleGuide = 'Provide a detailed commit message with full context about the changes.';
                break;
        }

        const recentContext = recentCommits.length > 0 
            ? `\nRecent commit messages for context:\n${recentCommits.slice(0, 5).join('\n')}\n`
            : '';

        return `You are a Git commit message generator. Analyze the following git diff and generate a ${style} commit message.

${styleGuide}

Files changed: ${files.join(', ')}
${recentContext}
Git diff:
\`\`\`
${diff.substring(0, 4000)}
\`\`\`

${includeDescription ? 'Provide both a commit title (50 chars max) and a detailed description separated by a blank line.' : 'Provide only the commit title (50 chars max).'}

IMPORTANT: Generate ONLY the commit message, no explanations, quotes, or additional text.`;
    }

    private async generateWithOpenAI(
        apiKey: string,
        model: string,
        prompt: string
    ): Promise<AIResponse> {
        if (!this.openai) {
            this.openai = new OpenAI({ apiKey });
        }

        const config = vscode.workspace.getConfiguration('gitCommitAI');
        const maxTokens = config.get<number>('maxTokens') || 150;

        const response = await this.openai.chat.completions.create({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that generates concise, meaningful git commit messages. You always respond with ONLY the commit message, nothing else.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: maxTokens,
            temperature: 0.7
        });

        const fullMessage = response.choices[0].message.content?.trim() || '';
        const lines = fullMessage.split('\n\n');
        
        return {
            message: lines[0],
            description: lines.length > 1 ? lines.slice(1).join('\n\n') : undefined
        };
    }

    private async generateWithAnthropic(
        apiKey: string,
        model: string,
        prompt: string
    ): Promise<AIResponse> {
        const anthropic = new Anthropic({ apiKey });

        const config = vscode.workspace.getConfiguration('gitCommitAI');
        const maxTokens = config.get<number>('maxTokens') || 150;

        const message = await anthropic.messages.create({
            model: model || 'claude-3-sonnet-20240229',
            max_tokens: maxTokens,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        const fullMessage = message.content[0].type === 'text' 
            ? message.content[0].text.trim() 
            : '';
        
        const lines = fullMessage.split('\n\n');
        
        return {
            message: lines[0],
            description: lines.length > 1 ? lines.slice(1).join('\n\n') : undefined
        };
    }

    private async generateWithOllama(
        model: string,
        prompt: string
    ): Promise<AIResponse> {
        const config = vscode.workspace.getConfiguration('gitCommitAI');
        const ollamaUrl = config.get<string>('ollamaUrl') || 'http://localhost:11434';

        try {
            const response = await axios.post(`${ollamaUrl}/api/generate`, {
                model: model || 'llama2',
                prompt: prompt,
                stream: false
            });

            const fullMessage = response.data.response.trim();
            const lines = fullMessage.split('\n\n');
            
            return {
                message: lines[0],
                description: lines.length > 1 ? lines.slice(1).join('\n\n') : undefined
            };
        } catch (error) {
            throw new Error('Could not connect to Ollama. Make sure Ollama is running locally.');
        }
    }
}
