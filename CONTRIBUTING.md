# Contributing

This repository is the Meshtastic documentation site, published at [meshtastic.org](https://meshtastic.org). It holds the written documentation for the firmware, the clients, and the hardware. The code those pages describe lives in the other repositories under the [Meshtastic organization](https://github.com/meshtastic).

The contributor guide lives on the site itself, starting at [Maintaining documentation](https://meshtastic.org/docs/development/docs/). This file is the short version of it.

## Every change starts with an issue

Every pull request links to an issue, a one-line typo fix included. The issue is where the problem gets agreed on before anyone writes the fix, and it carries the context a diff can't.

1. Search the [open issues](https://github.com/meshtastic/meshtastic/issues) for the problem you found.
2. Open a [documentation change request](https://github.com/meshtastic/meshtastic/issues/new/choose) if no issue covers it. Say what the page claims now and what is wrong with it.
3. Take the issue. Assign it to yourself if the assignee field is available to you, and otherwise comment that you are working on it, since GitHub offers self-assignment only to accounts with write access to the repository.
4. Open a pull request whose description contains `Closes #<ISSUE_NUMBER>`, replacing the placeholder with the issue number.

`Closes` is what links the two on GitHub. It puts the issue in the pull request's sidebar and closes the issue when the pull request merges. Naming the issue in prose looks similar but does neither.

An issue that already has an assignee is being worked on. Ask there before starting a second version of the same change.

## Running the site locally

The site is built with [Docusaurus](https://docusaurus.io) and uses [pnpm](https://pnpm.io). Fork the repository, clone your fork, and replace `<YOUR_GITHUB_USERNAME>` with your own username.

```shell
git clone https://github.com/<YOUR_GITHUB_USERNAME>/meshtastic.git
```

```shell
cd meshtastic
```

Brand assets come from the `meshtastic/design` repository as a submodule, and the build fails without it.

```shell
git submodule update --init --recursive
```

```shell
pnpm install
```

```shell
pnpm start
```

Run the checks before opening a pull request. `build` is the status check branch protection requires, and a link to a page that doesn't exist fails it rather than reaching the site. `lint:mdx` fails on the JSX corruption that breaks an MDX build, and reports missing alt text as a warning.

```shell
pnpm run lint:mdx
```

```shell
pnpm run build
```

[Running the site locally](https://meshtastic.org/docs/development/documentation/local-dev) covers the prerequisites, the rest of the checks, and keeping a fork current.

## What not to edit here

The Android and Apple client pages under `docs/software/android` and `docs/software/apple` are written in the client repositories and synced here. A CI guard rejects pull requests that edit them, and the next sync would revert the change anyway. Open those in [Meshtastic-Android](https://github.com/meshtastic/Meshtastic-Android) or [Meshtastic-Apple](https://github.com/meshtastic/Meshtastic-Apple).

Documentation for released firmware is frozen under `versioned_docs/` and is read-only. Edit the current release under `docs/` instead. [Versioning](https://meshtastic.org/docs/development/documentation/versioning) explains what is frozen and how a snapshot is cut.

## How to write it

Section 11 of the [Meshtastic Client Design Standards](https://github.com/meshtastic/design/tree/master/standards) governs writing across the project, including this site. [Writing style](https://meshtastic.org/docs/development/documentation/style-guides/writing-style) is the working guide here, and the standard decides where the two disagree.

Reviewers check the same few things most often: sentence case headings, alt text on every image, `shell` on command fences, product names cased as the standard lists them, and admonitions kept rare.

## Code of conduct

Taking part in this project means following the [code of conduct](https://meshtastic.org/docs/legal/conduct/).
