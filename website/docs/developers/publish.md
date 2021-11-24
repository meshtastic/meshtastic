---
id: publish
title: Publishing Meshtastic
sidebar_label: Publishing Meshtastic
---

This document is a WIP.

If you’d like to do ‘real’ releases with your changes, the procedure is:

## Device

* edit version.properties and check it into the root project
* run bin/promote-release.sh - this should cause github to start a release build (see the CI actions)
* edit the draft release text and click publish

## Android

TBD

## iOS

TBD

## Python

if any dev wants to take this on, send me a note and I’ll bless you with pypi

* bump the version in setup.py
* run bin/upload-release.sh

:::note
You need permissions in the github project to make a build:::