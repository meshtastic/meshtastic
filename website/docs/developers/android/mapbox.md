---
id: mapbox
title: Setting up Mapbox with Meshtastic
sidebar_label: Mapbox Setup
---

If you build Meshtastic as per the standard instructions then you may notice that the maps are not shown. This is because there is an extra step to setting up MapBox (an external service) with Meshtastic.

## Getting MapBox to work with your local copy of Meshtastic

In order to compile a new version of Meshtastic that can use MapBox you will need to provide a token associated with your MapBox user account.

This is fairly simple to do.

* Create an account at MapBox
* Copy the public token associated with that account to the clipboard
* Paste that into the file "…/src/main/res/values/mapbox-token.xml"

## Examples of what can be achieved with MapBox

MapBox is an external service with many features that can be included in the Meshtastic app.

The following link shows many of the available features:
https://docs.mapbox.com/mapbox-gl-js/examples/

## Basics of using MapBox with Android Apps

MapBox provide a simple example of how to display a basic map in an Android App:
https://docs.mapbox.com/android/maps/overview/#add-a-map
