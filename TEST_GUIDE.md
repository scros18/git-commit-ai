# 🧪 Quick Test Guide - Git Commit AI

## ✅ Setup Complete!

You're all set with **FREE local AI** (no API key needed)!

---

## 🚀 How to Test Right Now

### Step 1: Launch the Extension

1. **Press `F5`** in VS Code
2. A new window will open (Extension Development Host)

### Step 2: Open a Git Repository

In the new window:
1. Press `Ctrl+K` then `Ctrl+O` to open a folder
2. Choose **ANY** folder with a Git repository
3. Or create a new test repo:

```bash
# In the new VS Code window terminal:
mkdir test-repo
cd test-repo
git init
```

### Step 3: Make Some Changes

Create a test file:

```bash
# Create a new file
echo "function hello() { console.log('Hello World'); }" > test.js

# Or edit any existing file in the repo
```

### Step 4: Stage Your Changes

```bash
git add .
```

Or use the VS Code UI:
- Go to Source Control panel (Ctrl+Shift+G)
- Click the **+** button next to your changes

### Step 5: Generate Commit Message! 🎉

Click the **✨ sparkle icon** at the top of the Source Control panel

**OR**

1. Press `Ctrl+Shift+P`
2. Type: `Generate Commit Message`
3. Press Enter

### Step 6: Watch the Magic! ✨

The AI will:
1. Analyze your changes
2. Generate a commit message
3. Fill it in the commit box

Review it and click **Commit**!

---

## 🎯 What You're Using

- **AI Provider:** Ollama (FREE, runs locally)
- **Model:** llama3.2 (fast and lightweight)
- **No API key needed!** 🎉
- **No internet required!** (after initial download)

---

## 💡 Try Different Scenarios

### Test 1: Add a new feature
```bash
# Create a new file
echo "function login(user, pass) { return true; }" > auth.js
git add auth.js
# Click ✨ sparkle icon
# Expected: "feat: add authentication login function"
```

### Test 2: Fix a bug
```bash
# Edit existing file with a bug fix
echo "function divide(a, b) { if (b === 0) throw new Error('Div by zero'); return a / b; }" > calc.js
git add calc.js
# Click ✨ sparkle icon
# Expected: "fix: add zero division error handling"
```

### Test 3: Update documentation
```bash
# Edit README
echo "# My Project\n\nThis is an awesome project!" > README.md
git add README.md
# Click ✨ sparkle icon
# Expected: "docs: add project description to readme"
```

---

## ⚙️ Configure Settings (Optional)

Press `Ctrl+,` to open settings, then search for "Git Commit AI"

Try different styles:
- **Conventional** (default): `feat(auth): add login`
- **Simple**: `Add login functionality`
- **Detailed**: Longer, more descriptive messages

---

## 🐛 Troubleshooting

### "No staged changes found"
- Make sure you ran `git add .` or staged files in VS Code

### "Could not connect to Ollama"
- Run this in terminal: `ollama serve`
- It should start the Ollama service

### Extension not showing up
- Make sure you pressed **F5** (not just opening VS Code)
- Look for "Extension Development Host" in the window title

### Slow generation
- Ollama runs on your CPU, so it may take 10-20 seconds
- First run is always slower
- Consider upgrading to OpenAI ($) for faster results later

---

## 🎊 Success Checklist

- [ ] Pressed F5 and new window opened
- [ ] Opened a Git repository
- [ ] Made changes to a file
- [ ] Staged the changes (`git add .`)
- [ ] Clicked the ✨ sparkle icon
- [ ] Got an AI-generated commit message!
- [ ] Reviewed and committed

---

## 🚀 Next Steps After Testing

### Want to use it for real?

**Option 1: Keep using Ollama (FREE)**
- Already set up!
- Just press F5 whenever you want to use it

**Option 2: Upgrade to OpenAI (Faster, $)**
1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Run command: `Configure Git Commit AI`
3. Select OpenAI
4. Enter your API key
5. Cost: ~$0.01 per commit

**Option 3: Package as Real Extension**
```bash
npm run package
code --install-extension git-commit-ai-0.1.0.vsix
```

Now you can use it in any VS Code window!

---

## 📹 Demo Video Script

If you want to record a demo:

1. **Open VS Code** (0:00)
2. **Show some code changes** (0:05)
3. **Stage the changes** (0:10)
4. **Click sparkle icon** (0:15)
5. **Show generated message** (0:20)
6. **Commit** (0:25)
7. **Show git log** (0:30)

Total: 30 seconds of pure magic! ✨

---

## 🎯 Ready to Test?

### Just press **F5** now and follow the steps above!

**Need help?** The extension will show error messages if something goes wrong.

---

<div align="center">

### 🎉 Have Fun Testing!

**Remember:** This is YOUR extension. Make it awesome! 🚀

</div>
