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
* edit version.properties to set release version
* commit and push (or merge) to root of repo - this should cause GitHub to start a release build (see the CI actions)
* edit the draft release text and click publish

### Update Protobufs


## Android

### Pre-requisites

* Add repository secrets
* * KEYSTORE_FILENAME
* * * name of the .jks
* * KEYSTORE
* * * we will convert the .jks to base64
* * * openssl base64 < filename.jks | tr -d '\n' | tee filename.txt
* * KEYSTORE_PROPERTIES
* * * storePassword=nononononono
keyPassword=nononononono
keyAlias=upload
storeFile=nononononono.jks


### Instructions - Automated

* Update protobufs
* Go to Actions / Make Release / Run Workflow
* Pick the Releases branch
* Enter the version found in app/gradle.build
* 
## iOS

TBD

## Python

### Pre-requisites

* Python Packages
* * pip3 install pdoc3
* * pip3 install pygatt
* * pip3 install pandoc
* * pip install twine
* * pip3 install -r requirements.txt
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
You need permissions in the GitHub project to make a build
:::