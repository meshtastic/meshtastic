---
id: build-app
title: Creating a build/development environment for the Android App
sidebar_label: Building Android App
---

## Build instructions

If you would like to develop this application we'd love your help!  These build instructions are brief and should be improved, please send a PR if you can.

* Use Android Studio 4.1.2 to build/debug (other versions might work but no promises)
* Use "git submodule update --init --recursive" to pull in the various submodules we depend on
* There are a few config files which you'll need to copy from templates included in the project. Run the following commands to do so:

```
        rm ./app/google-services.json
        cp ./app/google-services-example.json ./app/google-services.json
        rm ./app/src/main/res/values/mapbox-token.xml
        cp ./app/special/mapbox-token.xml ./app/src/main/res/values/
        rm ./app/src/main/res/values/curfirmwareversion.xml
        cp ./app/special/curfirmwareversion.xml ./app/src/main/res/values/
```

* (Unfortunately) you need to get a (free) mapbox developer token [here](https://docs.mapbox.com/android/maps/guides/install/) and put that token in your user gradle.properties.
```
~/development/meshtastic/MeshUtil$ cat ~/.gradle/gradle.properties
MAPBOX_DOWNLOADS_TOKEN=sk.yourtokenherexxx
```

* Now you should be able to select "Run / Run" in the IDE and it will happily start running on your phone or the emulator.

:::note
The emulators don't support Bluetooth, so some features can not be used in that environment.
:::

## Analytics setup

* Analytics are included but can be disabled by the user on the settings screen
* On dev devices

```shell
adb shell setprop debug.firebase.analytics.app com.geeksville.mesh
adb shell setprop log.tag.FirebaseCrashlytics DEBUG
```

for verbose logging:
```shell
adb shell setprop log.tag.FA VERBOSE
```

## Publishing to google play

* Only supported if you are a core developer that needs to do releases