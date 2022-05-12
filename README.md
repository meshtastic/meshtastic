# Meshtastic

<!--Project specific badges here-->
[![CI](https://img.shields.io/github/workflow/status/meshtastic/meshtastic/CI?label=actions&logo=github&color=yellow)](https://github.com/meshtastic/meshtastic/actions/workflows/ci.yml)
[![CLA assistant](https://cla-assistant.io/readme/badge/meshtastic/meshtastic)](https://cla-assistant.io/meshtastic/repo)
[![Fiscal Contributors](https://opencollective.com/meshtastic/tiers/badge.svg?label=Fiscal%20Contributors&color=deeppink)](https://opencollective.com/meshtastic/)
[![Vercel](https://img.shields.io/static/v1?label=Powered%20by&message=Vercel&style=flat&logo=vercel&color=000000)](https://vercel.com?utm_source=meshtastic&utm_campaign=oss)

## Overview

Meshtastic® is a project that lets you use inexpensive LoRa radios as a long range off-grid communicator for areas without reliable cellular service. These radios are great for hiking, skiing, paragliding - essentially any hobby where you don't have reliable internet access. Each member of the mesh can send and view text messages and enable optional GPS based location features.

The radios automatically create a mesh to forward packets as needed, so everyone in the group can receive messages from even the furthest member. The radios will optionally work with your phone, but no phone is required.

**This repository contains the source for our website and documentation**

## Stats

![Alt](https://repobeats.axiom.co/api/embed/e6da6ff0a9523a4eee6931d675dfeefdb7ca8692.svg "Repobeats analytics image")

## Development & Building

nodejs is required in your dev. environment. The method for installing nodejs depends on your operating system. This software is built using [Docusaurus](https://docusaurus.io).

Go to the root directory of your repository and install dependencies:

```shell
pnpm install
```

Build the project with the following command

```shell
pnpm build
```

Start a local dev. instance with the following command

```shell
pnpm start
```
