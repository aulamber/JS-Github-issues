# GitHub Issue Submitter

## Repo

https://github.com/aulamber/JS-Github-issues.

## Demo

https://ambler-aulamber.herokuapp.com

## Goal

Build a multi-step form to submit fully qualified issues to GitHub.

## Features

The Single Page App consist of 4 steps :

- General informations

User must enter a repository name with `owner/repository` format.

User must enter a GitHub personal API token for authentication.

- Issue type

Issue can be a `Bug` or a `Feature Request`

- Details

User must enter a `title`

For a `Feature Request` a text area must be filled by the user to explain what he wants.

For a `Bug` a text area must be filled by the user to explain how to reproduce the bug. He must fill another field to indicate which version he uses.

- Overview

A last step show all these informations.

A submit button permit to create the GitHub issue. User is redirected to this issue on success.

## Constraints

The website must be a responsive Single Page App.

At least React must be used. You can use any library/framework on top of it.

Data must be persistent even after a page reload.

User can navigate back to edit.

## Bonuses

When user type the title, similar issues are searched and suggested in realtime to prevent duplicate issues.

Replace the personal API token by a real GitHub OAuth application (web application flow).

Step transitions are animated
