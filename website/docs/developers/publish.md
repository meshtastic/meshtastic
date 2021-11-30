---
id: publish
title: Publishing Meshtastic
sidebar_label: Publishing Meshtastic
---

This document is a WIP.

If you’d like to do ‘real’ releases with your changes, the procedure is:

## Device

* Update protobufs
* * cd proto
* * git checkout master && git pull
* * cd ..
* * git add proto
* * git commit -m "updating proto submodule to latest"
* run bin/regen-protos.sh
* edit version.properties and check it into the root project
* run bin/promote-release.sh - this should cause github to start a release build (see the CI actions)
* edit the draft release text and click publish

### Update Protobufs


## Android

TBD

## iOS

TBD

## Python

### Pre-requistes

* Python Packages
* * pip3 install pdoc3
* * pip3 install pygatt
* * pip3 install pandoc
* * pip install twine
* https://pandoc.org/installing.html
* nanopb 0.4.4 installed

### Instructions

* Update protobufs
* * cd proto
* * git checkout master && git pull
* * cd ..
* * git add proto
* * git commit -m "updating proto submodule to latest"
* run bin/regen-protos.sh
* bump the version in setup.py
* run bin/test-release.sh
* * Ensure no errors.
* run bin/upload-release.sh

 I usually just edit setup.py to bump the version number, then run "bin/upload-release.sh" (though you should use bin/test-release.sh for the first time - which is just a dry deploy to the pypi test server).  This script does the build (including new docs - which will end up in the git checkin) and upload to pypi.  Then I do a git commit/push and tag wit the version number.

:::note
You need permissions in the github project to make a build
:::