# 🚀 Git Commit AI - Setup Guide

## ✅ Installation Complete!

Your VS Code extension has been successfully created. Here's how to use it:

---

## 📦 Next Steps

### 1. **Test the Extension**

Press **F5** in VS Code to launch a new Extension Development Host window with your extension loaded.

### 2. **Configure AI Provider**

In the new window:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: `Configure Git Commit AI`
3. Select your AI provider (OpenAI, Anthropic, or Ollama)
4. Enter your API key

### 3. **Try It Out!**

1. Open any Git repository
2. Make some changes
3. Stage them (`git add .`)
4. Click the **✨ sparkle icon** in the Source Control panel
5. Watch the magic happen! 🎉

---

## 🔑 Getting API Keys

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. **Cost:** ~$0.01-$0.05 per 100 commits

### Anthropic (Claude)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Get your API key
4. **Cost:** Similar to OpenAI

### Ollama (Free & Local!)
1. Install [Ollama](https://ollama.ai)
2. Run: `ollama pull llama2`
3. No API key needed!
4. **Cost:** FREE (runs on your machine)

---

## 📝 Usage Examples

### Conventional Commits (Default)
```
feat(auth): implement OAuth2 login flow
fix(api): handle null response in user endpoint
docs(readme): update installation instructions
```

### Simple Style
```
Add OAuth2 login functionality
Fix null pointer in user API
Update README with new install steps
```

---

## 🎨 Customization

Edit settings in VS Code (`Ctrl+,` or `Cmd+,`):

```json
{
  "gitCommitAI.provider": "openai",
  "gitCommitAI.model": "gpt-4-turbo-preview",
  "gitCommitAI.commitStyle": "conventional",
  "gitCommitAI.includeDescription": false,
  "gitCommitAI.maxTokens": 150
}
```

---

## 📦 Package for Distribution

When ready to share:

```bash
# Install vsce
npm install -g @vscode/vsce

# Package the extension
npm run package

# This creates: git-commit-ai-0.1.0.vsix
```

### Install the .vsix file:
```bash
code --install-extension git-commit-ai-0.1.0.vsix
```

---

## 🚀 Publish to Marketplace

1. Create a publisher account at [marketplace.visualstudio.com](https://marketplace.visualstudio.com/manage)
2. Get a Personal Access Token from Azure DevOps
3. Login: `vsce login <publisher-name>`
4. Publish: `npm run publish`

---

## 🐛 Troubleshooting

### "No staged changes found"
- Run `git add .` to stage your changes first

### "API key not configured"
- Run `Configure Git Commit AI` command

### "Could not connect to Ollama"
- Make sure Ollama is running: `ollama serve`

---

## 🌟 Make It Viral

### 1. **Post on Social Media**
- Twitter: "Just built a VS Code extension that uses AI to write perfect commit messages! 🚀"
- LinkedIn: Share with #VSCode #OpenSource #AI hashtags
- Reddit: Post on r/vscode, r/programming

### 2. **Create a Demo Video**
- Record a quick screencast showing it in action
- Post on YouTube, Twitter, LinkedIn

### 3. **Submit to Communities**
- Product Hunt
- Hacker News
- Dev.to article
- awesome-vscode lists

### 4. **Add to Your Resume**
- "Created open-source VS Code extension with 5K+ installs"
- "Built AI-powered developer tool using GPT-4 API"

---

## 📈 Growth Strategy

**Week 1:**
- Publish to VS Code Marketplace
- Post on Twitter/LinkedIn
- Share in Discord/Slack communities

**Week 2:**
- Write a dev.to article
- Submit to Product Hunt
- Create tutorial video

**Week 3:**
- Add to awesome lists
- Engage with users
- Fix bugs and add features

**Goal:** 1K installs in first month! 🎯

---

## 🤝 Contributing

Want to add features? Check `CONTRIBUTING.md`

**Ideas for v0.2.0:**
- [ ] Multi-language support
- [ ] Custom prompt templates
- [ ] Commit history learning
- [ ] Team shared presets
- [ ] GitHub Copilot integration

---

## 📚 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Marketplace Management](https://marketplace.visualstudio.com/manage)

---

<div align="center">

### 🎉 Congratulations!

You've built a production-ready VS Code extension!

**Now go make it viral! 🚀**

</div>
