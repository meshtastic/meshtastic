---
id: serve-docs-locally
title: Setting up Local Documentation
sidebar_label: Serve Docs Locally
---

:::note
Some things won't display properly like logos or protobufs, this is not cause for concern.
:::

## Prerequisites

In order to set up your local environment, you will need to install:

- [Node & Node package manager (NPM)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Yarn package manager](https://yarnpkg.com/getting-started/install)

## Getting Started

### Fork the Meshtastic Repository

Log into Github and create a fork of the [meshtastic/Meshtastic](https://github.com/meshtastic/Meshtastic) repository.

### Clone your Meshtastic Repository fork

:::note
Replace `username` with your Github username.
:::

```bash title="Clone username/Meshtastic Repo"
git clone https://github.com/username/Meshtastic.git
```

### Change directory to Local copy

```bash title="Change Directory"
cd ~/Meshtastic
```

### Install Dependencies

```bash title="Install dependencies using Yarn"
yarn install
```

### Run Development Server

```bash title="Run node.js server"
yarn start
```

:::tip
Before submitting a pull request, it's helpful to run the following command to ensure there are no broken links or errors:

```bash title="Build Project"
yarn build
```

:::
