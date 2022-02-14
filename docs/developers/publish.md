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

## iOS

TBD

## Meshtastic-flasher

A `meshtastic-flasher` release consists of publishing the release to PyPi https://pypi.org/project/meshtastic-flasher/ as well as producing single-executable files that are downloadable from Github https://github.com/meshtastic/Meshtastic-gui-installer/releases.

### Instructions - mostly automated

* Update https://github.com/meshtastic/Meshtastic-gui-installer/blob/master/meshtastic_flasher/version.py
* Go to Actions / Make Release / Run Workflow https://github.com/meshtastic/Meshtastic-gui-installer/actions/workflows/release.yml
* Draft & Publish release https://github.com/meshtastic/Meshtastic-gui-installer/releases

## Python

A python release consists of publishing the release to PyPi https://pypi.org/project/meshtastic/ as well as producing single-executable files that are downloadable from Github https://github.com/meshtastic/Meshtastic-python/releases.

### Pre-requisites

No pre-requisites are needed locally to make a release. All builds are done via Github Actions currently.

To test/validate, you will need to run:

```
pip3 install -r requirements.txt
pip install .
```


### Instructions

* Update protobufs by running the "Update protobufs" workflow in Actions: https://github.com/meshtastic/Meshtastic-python/actions/workflows/update_protobufs.yml

* run the "smoke1" test (optional):

connect one device to the serial port and run:

```
pytest -m smoke1
```

* run unit tests: `pytest` (optional)

* run bin/test-release.sh (optional)

* bump the version in setup.py

* Run the "Make Release" workflow in Actions: https://github.com/meshtastic/Meshtastic-python/actions/workflows/release.yml

* After the "Make Release" is done, go into Releases: https://github.com/meshtastic/Meshtastic-python/releases There should be a draft. Add the title, update the "What's Changed" (Tip: Click on the "Auto-generate release notes" button.). Uncheck the "This is a pre-release" (if applicable).

:::note
You need permissions in the GitHub project to make a build
:::
