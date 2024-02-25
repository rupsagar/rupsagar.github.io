# This file is a quick reference guide for the most frequently used Git commands.

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
    git merge -m "Commit message" <branch-to-be-merged> (executed in main) 
    ```
- ### To delete a branch which has been merged
    ```bash
    git branch -d <branch-name>
    ```
- ### To delete a branch which has not been merged
    ```bash
    git branch -D <branch-name>
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