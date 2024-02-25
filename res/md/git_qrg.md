# This is a quick reference guide for frequently used Git commands.

## Help
- ### To access help on terminal
    ```bash
    git <command> -h
    ```
- ### To access detailed help
    ```bash
    git help <command>
    ```

## Configure
- ### To config global/local/system variables
    ```bash
    git config --global user.name "User Name"
    git config --global user.email user@email.com
    git config --global init.defaultbranch main
    git config --global core.editor "code --wait"
    git config --global core.ignorecase true
    git config --global core.autocrlf true  # on Windows
    git config --global core.autocrlf input # on Linux/Mac
    ```
- ### To view the config file
    ```bash
    git config --global -e
    ```

## Initialize
- ### To initialize a Git repository
    ```bash
    git init
    ```

## Status
- ### To check status of working directory
    ```bash
    git status      # detailed status
    git status -s   # short status
    ```

## Stage
- ### To stage file and modifications
    ```bash
    git add .                    # full directory
    git add <file1> <filen2>     # specific files
    git add *.cpp *.py           # wildcard
    ```
- ### To remove from staging area
    ```bash
    git rm --cached <file>      # index not tracking <file> 
    git restore --staged <file> # index contains copy of <file> same as HEAD based on availability
    git reset <file>            # same as git restore --staged <filename>
    ```

## Commit
- ### To commit from staging area
    ```bash
    git commit -m "Commit message"
    git commit  # add multiline comment from code editor
    ```
- ### To commit from working directory without staging
    ```bash
    git commit -a -m "Commit message"
    git commit -am "Commit message"     # same effect
    ```

## Log
- ### To check commit log
    ```bash
    git log
    ```

## Move/Rename
- ### To move or rename file and add to staging area
    ```bash
    git mv ./path1/oldfilename ./path2/newfilename
    ```

## Branch
- ### To see the current branch and all the available branches
    ```bash
    git branch
    ```
- ### To create a branch
    ```bash
    git branch <new-branch-name>
    ```
- ### To change branch
    ```bash
    git switch <desired-branch-name>
    ```
- ### To create a new branch and switch to it
    ```bash
    git switch -c <new-branch-name>
    ```
- ### To merge back into main (or any other branch)
    ```bash
    git merge -m "Commit message" <branch-to-be-merged> # executed from main preferably
    ```
- ### To delete a branch which has not been modified or has been merged 
    ```bash
    git branch -d <branch-name>
    ```
- ### To delete a branch which has been modified but not merged
    ```bash
    git branch -D <branch-name>
    ```

## Push
- ### To push local repository to Github
    ```bash
    git remote add origin <github-repo-url>
    git branch -M main
    git push -u origin main
    ```
- ### To push all the branches
    ```bash
    git push -all
    ```

## Pull
- ### To sync a repository
    ```bash
    git fetch
    git merge
    ```
    or in a single step
    ```bash
    git pull
    ```