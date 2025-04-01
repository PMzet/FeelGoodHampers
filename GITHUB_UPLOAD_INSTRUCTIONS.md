# GitHub Upload Instructions

To upload your Bloom & Gift Shop project to GitHub, follow these steps:

## Prerequisites
1. Install Git from [git-scm.com](https://git-scm.com/downloads) if you don't have it installed
2. Create a GitHub account if you don't have one

## Steps to Upload Your Project

### 1. Open Git Bash or Terminal

Navigate to your project folder:
```bash
cd "C:\Users\Dell\Desktop\Flower & Gift Shop"
```

### 2. Initialize a Git Repository
```bash
git init
```

### 3. Add All Files to Git
```bash
git add .
```

### 4. Commit the Files
```bash
git commit -m "Initial commit of Bloom & Gift Shop website"
```

### 5. Connect to Your GitHub Repository
```bash
git remote add origin https://github.com/PMzet/BloomerGifts.git
```

### 6. Push Your Code to GitHub
```bash
git push -u origin main
```

If you encounter an error about the branch name, you might need to use:
```bash
git push -u origin master
```

### 7. Enter Your GitHub Credentials
When prompted, enter your GitHub username and password. If you have two-factor authentication enabled, you'll need to use a personal access token instead of your password.

## Creating a Personal Access Token (if needed)

1. Go to your GitHub account settings
2. Scroll down to "Developer settings"
3. Click on "Personal access tokens"
4. Click "Generate new token"
5. Give your token a name (e.g., "Bloom & Gift Shop Upload")
6. Check the "repo" box to grant access to your repositories
7. Click "Generate token"
8. Copy the token and use it as your password when pushing

## Alternative Method: GitHub Desktop

If you're having trouble with command-line Git, you can use GitHub Desktop instead:

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop and log in to your GitHub account
3. Click "File" > "Add local repository"
4. Select your project folder
5. If prompted to initialize Git, click "Initialize Git"
6. In the repository settings, add the remote URL: https://github.com/PMzet/BloomerGifts.git
7. Commit your changes and push to the remote repository

## Verifying the Upload

After pushing your code, visit https://github.com/PMzet/BloomerGifts to verify that your files have been uploaded.

## Common Issues and Solutions

### Error: Failed to push some refs
This usually means the remote repository already has files that aren't in your local repository. You can fix this by:
```bash
git pull --rebase origin main
git push origin main
```

### Error: Remote contains work that you do not have locally
Try:
```bash
git fetch origin
git merge origin/main
git push origin main
``` 