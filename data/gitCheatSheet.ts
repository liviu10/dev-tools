export interface GitCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Setup & Config' | 'Starting a Project' | 'Making Changes' | 'Branching & Merging' | 'Remote Repositories' | 'History & Undoing Changes' | 'Tagging' | 'Advanced Git';
}

export const gitData: GitCheatSheetItem[] = [
  // Setup & Config
  { name: 'git config --global user.name "[name]"', description: 'Sets the name you want attached to your commit transactions.', example: 'git config --global user.name "John Doe"', category: 'Setup & Config' },
  { name: 'git config --global user.email "[email]"', description: 'Sets the email you want attached to your commit transactions.', example: 'git config --global user.email "john.doe@example.com"', category: 'Setup & Config' },
  { name: 'git config --global init.defaultBranch main', description: 'Sets the default branch name to "main" for new repositories.', example: 'git config --global init.defaultBranch main', category: 'Setup & Config' },
  { name: 'git config --list', description: 'Lists all local and global configuration settings.', example: 'git config --list', category: 'Setup & Config' },

  // Starting a Project
  { name: 'git init', description: 'Initializes a new Git repository in the current directory.', example: 'git init', category: 'Starting a Project' },
  { name: 'git clone [url]', description: 'Downloads a project and its entire version history from a remote repository.', example: 'git clone https://github.com/user/repo.git', category: 'Starting a Project' },

  // Making Changes
  { name: 'git status', description: 'Shows the status of changes as untracked, modified, or staged.', example: 'git status', category: 'Making Changes' },
  { name: 'git add [file]', description: 'Adds a file to the staging area. Use `.` to add all new and modified files.', example: 'git add index.html\ngit add .', category: 'Making Changes' },
  { name: 'git commit -m "[message]"', description: 'Records the staged snapshot in the project history with a descriptive message.', example: 'git commit -m "Add initial homepage"', category: 'Making Changes' },
  { name: 'git commit -am "[message]"', description: 'A shortcut to stage all modified (but not new) files and commit them in one step.', example: 'git commit -am "Update navigation links"', category: 'Making Changes' },
  { name: 'git diff', description: 'Shows file differences that are not yet staged.', example: 'git diff', category: 'Making Changes' },
  { name: 'git diff --staged', description: 'Shows file differences between the staging area and the last commit.', example: 'git diff --staged', category: 'Making Changes' },
  { name: 'git rm [file]', description: 'Removes the file from your working directory and stages the deletion.', example: 'git rm old-file.txt', category: 'Making Changes' },
  { name: 'git mv [old-name] [new-name]', description: 'Renames a file and stages the rename.', example: 'git mv old.txt new.txt', category: 'Making Changes' },

  // Branching & Merging
  { name: 'git branch', description: 'Lists all local branches in the current repository. The active branch is marked with an asterisk.', example: 'git branch', category: 'Branching & Merging' },
  { name: 'git branch [branch-name]', description: 'Creates a new branch.', example: 'git branch new-feature', category: 'Branching & Merging' },
  { name: 'git checkout [branch-name]', description: 'Switches to the specified branch and updates the working directory.', example: 'git checkout new-feature', category: 'Branching & Merging' },
  { name: 'git checkout -b [branch-name]', description: 'A shortcut to create a new branch and switch to it immediately.', example: 'git checkout -b another-feature', category: 'Branching & Merging' },
  { name: 'git merge [branch-name]', description: 'Combines the specified branch’s history into the current branch.', example: '# Switch to main branch first\ngit checkout main\ngit merge new-feature', category: 'Branching & Merging' },
  { name: 'git rebase [branch-name]', description: 'Re-applies commits from the current branch onto the tip of another branch. It creates a cleaner, linear history compared to merging.', example: '# On feature branch\ngit rebase main', category: 'Branching & Merging' },
  { name: 'git branch -d [branch-name]', description: 'Deletes the specified branch. It prevents deletion if the branch has unmerged changes.', example: 'git branch -d feature-branch', category: 'Branching & Merging' },

  // Remote Repositories
  { name: 'git remote -v', description: 'Lists all the remote repositories configured for your project.', example: 'git remote -v', category: 'Remote Repositories' },
  { name: 'git remote add [name] [url]', description: 'Adds a new remote repository with a specified shortname.', example: 'git remote add origin https://github.com/user/repo.git', category: 'Remote Repositories' },
  { name: 'git fetch [remote]', description: 'Downloads history from the remote repository but does not integrate it into your local branch.', example: 'git fetch origin', category: 'Remote Repositories' },
  { name: 'git pull [remote] [branch]', description: 'Fetches and merges the remote branch into your current local branch. It is a shortcut for `git fetch` followed by `git merge`.', example: 'git pull origin main', category: 'Remote Repositories' },
  { name: 'git push [remote] [branch]', description: 'Uploads your local branch commits to the remote repository.', example: 'git push origin main', category: 'Remote Repositories' },
  { name: 'git push [remote] --delete [branch]', description: 'Deletes a branch on the remote repository.', example: 'git push origin --delete old-feature-branch', category: 'Remote Repositories' },

  // History & Undoing Changes
  { name: 'git log', description: 'Shows the commit history for the current branch.', example: 'git log', category: 'History & Undoing Changes' },
  { name: 'git log --oneline --graph', description: 'A more concise view of the commit history, showing the commit graph.', example: 'git log --oneline --graph --all', category: 'History & Undoing Changes' },
  { name: 'git reset [commit]', description: 'Unstages the file, but it preserves the file’s contents. Use `--hard` to discard all changes since the commit.', example: 'git reset HEAD~1 # Unstage last commit\ngit reset --hard [commit-hash] # WARNING: Discards all changes', category: 'History & Undoing Changes' },
  { name: 'git checkout -- [file]', description: 'Discards changes in the working directory for a specific file, reverting it to the last committed version.', example: 'git checkout -- index.html', category: 'History & Undoing Changes' },
  { name: 'git revert [commit]', description: 'Creates a new commit that undoes the changes of a previous commit. This is a safe way to undo changes in a shared history.', example: 'git revert [commit-hash-to-undo]', category: 'History & Undoing Changes' },
  { name: 'git commit --amend', description: 'Combines staged changes with the previous commit instead of creating a new one. Also used to edit the last commit message.', example: 'git commit --amend -m "A better commit message"', category: 'History & Undoing Changes' },

  // Tagging
  { name: 'git tag', description: 'Lists all tags in the repository.', example: 'git tag', category: 'Tagging' },
  { name: 'git tag -a [tag-name] -m "[message]"', description: 'Creates a new annotated tag. Annotated tags are stored as full objects in the Git database.', example: 'git tag -a v1.0 -m "Release version 1.0"', category: 'Tagging' },
  { name: 'git push --tags', description: 'Pushes all local tags to the remote repository.', example: 'git push origin --tags', category: 'Tagging' },

  // Advanced Git
  { name: 'git stash', description: 'Temporarily stores modified, tracked files in order to switch branches and work on something else.', example: 'git stash', category: 'Advanced Git' },
  { name: 'git stash pop', description: 'Applies the most recently stashed changes and removes them from the stash list.', example: 'git stash pop', category: 'Advanced Git' },
  { name: 'git stash list', description: 'Lists all stashed changesets.', example: 'git stash list', category: 'Advanced Git' },
  { name: 'git cherry-pick [commit]', description: 'Applies the changes from a specific commit from another branch to the current branch.', example: 'git cherry-pick [commit-hash]', category: 'Advanced Git' },
  { name: 'git reflog', description: 'Shows a log of where your HEAD and branch references have been for the last few months. It\'s useful for recovering lost commits.', example: 'git reflog', category: 'Advanced Git' },
];