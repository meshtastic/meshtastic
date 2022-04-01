<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<div align="center">
  <img src="https://raw.githubusercontent.com/meshtastic/meshtastic-design/4463325bedef20be5655c91c80d1cd32a625f3ff/logo/svg/Mesh_Logo_Dynamic.svg" width="256">
  <h1>Meshtastic</h1>
<span>
  <a href="https://www.meshtastic.org" target="_blank">
    <img src="static/img/readme/globe.svg" width="16" />
    Website
  </a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://meshtastic.discourse.group" target="_blank">
    <img src="static/img/readme/comment-alt.svg" width="16" />
    Forum
  </a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.gg/UQJ5QuM7vq" target="_blank">
    <img src="static/img/readme/discord.svg" width="16" />
    Discord
  </a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://play.google.com/store/apps/details?id=com.geeksville.mesh" target="_blank">
    <img src="static/img/readme/google-play.svg" width="16" />
    App
  </a>
  </span>
  <br />
  <hr />
</div>

## What is Meshtastic?

Meshtastic® is a project that lets you use inexpensive LoRa radios as a long range off-grid communicator for areas without reliable cellular service. These radios are great for hiking, skiing, paragliding - essentially any hobby where you don't have reliable internet access. Each member of the mesh can send and view text messages and enable optional GPS based location features.

The radios automatically create a mesh to forward packets as needed, so everyone in the group can receive messages from even the furthest member. The radios will optionally work with your phone, but no phone is required.

Meshtastic uses LoRa for the long range communications and depending on settings used, the maximum theoretical group size ranges from 30-200 device nodes. Currently each device can only support a connection from a single user at a time.

Please see our [website](https://meshtastic.org) for more information about Meshtastic.

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=meshtastic&utm_campaign=oss)

## Installation

nodejs is required in your dev. environment. The method for installing nodejs depends on your operating system. This software is built using [Docusaurus](https://docusaurus.io).

Fork then clone the repository:

```shell
git clone https://github.com/meshtastic/meshtastic
```

Go to the root directory of your repository and install dependencies:

```shell
yarn install
```

Build the project with the following command

```shell
yarn build
```

Start a local dev. instance with the following command

```shell
yarn start
```
