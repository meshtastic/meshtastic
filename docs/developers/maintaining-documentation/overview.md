---
id: overview
title: Maintaining Documentation
sidebar_label: Maintaining Documentation
---

Meshtastic documentation is an important ingredient to the overall project. We want users to hit the ground running with the information they need right at their finger tips. This section will discuss the documentation software stack, file organization, and style guides.

## Software Stack

All of our documentation resides on GitHub. Instructions for setting up your GitHub account are located [here](github).

Our documentation is powered by [Docusaurus](https://docusaurus.io) — a documentation platform built on React that utilizes markdown files. Because markdown files are easy to edit, most content changes should be fairly simple. Instructions for setting up your instance of Docusaurus are located [here](docusaurus).

Another component that we use is [Vercel](https://vercel.com) — a platform for frontend frameworks and static sites. Instructions for setting up your instance of Vercel are located [here](vercel).

## Documentation Organization

|         Section          |            File Path             |                                                                                                          Description                                                                                                          |
| :----------------------: | :------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     About Meshtastic     |           `docs/about`           |                                                                                           High level explanation of of Meshtastic.                                                                                            |
|   Meshtastic Software    |         `docs/software`          |                                                                            Current bulk of documentation running through each Meshtastic project.                                                                             |
|     Getting Started      |      `docs/getting-started`      |                                                                            Instructions on how to get the Meshtastic firmware onto a users device.                                                                            |
|     Device Settings      |     `docs/software/settings`     |                          Details each user setting and provides explanations for what the setting does and how to configure the device using the various clients available (Android, CLI, iOS, Web)                           |
|     Hardware Details     |         `docs/hardware`          |                  Any hardware related content. Any time a user is attaching a peripheral accessory to their device. That includes 3d printed cases, antennas, buttons, chimes, rotary encoders, and screens.                  |
|    Radio Mesh Details    |           `docs/mesh`            |         This section discusses everything relating to the Meshtastic mesh. Mesh health metrics will be discussed here as well as topics such as signal strength, range and anyting else pertaining to "over the air".         |
| Contribute to Meshtastic |        `docs/developers`         |                                                 Details each of the projects and how they work together to give a developer an idea of how the Meshtastic ecosystem operates.                                                 |
| About the Documentation  | `docs/maintaining-documentation` |              This section explains how our documentation is organized, how to make edits to the documentation, view a local copy of your fork of the project. Style guides and tips will also be included here.               |
|          Legal           |           `docs/legal`           | Any legal information. Most changes here will be handled by developers actually working on the projects that require any legal disclosures. Examples include: the Meshtastic trademark, terms of service, and privacy policy. |

## Quick Start

Assuming you have the [prerequisites installed](serve-docs-locally#prerequisites), running a local instance of Docusaurus takes three steps:

1. Fork/Clone the [meshtastic/Meshtastic](https://github.com/meshtastic/Meshtastic) repository and navigate to the root directory of the project.

```bash title="Clone the project"
git clone https://github.com/meshtastic/Meshtastic.git
```

```bash title="Clone fork of the project"
git clone https://github.com/[username]/Meshtastic.git
```

```bash title="Change Directory"
cd ~/Meshtastic
```

2. Install Dependencies

```bash title="Install dependencies using Yarn"
yarn install
```

3. Run Docusaurus

```bash title="Run node.js server"
yarn start
```

:::tip
Before submitting a pull request, it's helpful to run the following command to ensure there are no broken links or errors:

```bash title="Build Project"
yarn build
```

:::
