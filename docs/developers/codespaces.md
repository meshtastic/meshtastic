---
id: codespaces
title: Creating a build/development environment online with Codespaces
sidebar_label: Building with Codespaces
---

GitHub Codespaces is a new feature to make is really easy for anyone to build device code (or other projects like out backend server) from scratch. This builds on our existing continuous integration test builds and uses either a bare browser or (optionally) Visual Studio Code. It is a great way for anyone who has problems installing and building locally to get a guaranteed good build environment in the cloud that works and feels just like you are developing on your local machine.

GitHub Codespaces is still in active beta and you need to [sign up](https://github.com/features/codespaces) to a waiting list to get access to it.

![Request access to Codespaces](/img/codespaces/codespaces-request-sm.png)

GitHub will then ask you about what languages you code in and what editors you use.

![Codespaces language and editor survey](/img/codespaces/codespaces-languages-sm.png)

After that you will be added to the waiting list and will be contacted when you can start using it.

![On the Codespaces waiting list](/img/codespaces/codespaces-waitinglist-sm.png)

Once you have been granted access, go to the project you wish to develop (for example the [Meshtastic device code](https://github.com/meshtastic/Meshtastic-device) or the [backend server code](https://github.com/meshtastic/meshtastic-backend)) and click the button in the upper right that says "Fork". It will ask you to confirm, then GitHub will generate your "fork" of the master code.
<!--add images for this section once I have access to Codespaces-->
Browse to your fork of the code and in the upper right of the window click on the "Code" drop-down button, then click "Open with Codespaces".

Github will then create a new virtual machine for you. This will take a few minutes the first time it is created as it installs Platformio and other dependencies.

You can now edit code and click to build and run just like you are on your own machine.
<!--add examples of usage-->
