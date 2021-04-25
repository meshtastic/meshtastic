---
id: android-installation
title: Android application installation
sidebar_label: Installation
---
Our Android application is available to download on Google Play.

[<img alt="Download at https://play.google.com/store/apps/details?id=com.geeksville.mesh" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style={{zoom:'35%'}} />](https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source%3Dgithub-homepage)

The application may not be found if your phone/Android version are too old. The minimum Android version is 5.0 (Lollipop 2014, first BLE support). However Android 6, Marshmallow 2015, is recommended as the Bluetooth is more stable.

On installing the Meshtastic app, load it and navigate to the settings page. The app will ask you to give it permissions to access your location. This is needed for any app to use bluetooth, as the app is then able to scan the local area for bluetooth devices and, in theory, could triangulate your location based the devices it sees. If you give location permissions "only while using the app", the app will only be able to use bluetooth while it is open and visible to the user. This means if the screen is locked, or you are using another app, Meshtastic will not be able to use bluetooth, and will not be able to receive any messages from the node.

[![Messages page](/img/android/android_messages_sm.png)](/img/android/android_messages_sm.png) [![Nodes page](/img/android/android_nodes_sm.png)](/img/android/android_nodes.png) [![Channel page](/img/android/android_channel_sm.png)](/img/android/android_channel.png) [![Settings page](/img/android/android_settings_sm.png)](/img/android/android_settings.png) [![Debug page](/img/android/android_debug_sm.png)](/img/android/android_debug.png)

There is a [beta program](https://play.google.com/apps/testing/com.geeksville.mesh) for the app, which will let you test the cutting edge changes, though this may come with extra bugs. You can join this via Google Play. It is recommended that you follow the [Meshtastic Discourse Alpha Testers](https://meshtastic.discourse.group/c/development/alpha-testers) channel if you decide to join this.

The app uses anonymous usage statistics and crash reports to allow us to catch problems with Meshtastic and fix them. Analytics are also required to be able to use the "free" plan of our map provider [Mapbox](https://docs.mapbox.com/help/how-mapbox-works/). You can disable this by unticking the checkbox on the settings page.

[![Settings page with statistics consent box highlighted](/img/android/android_stats_consent_sm.png)](/img/android/android_stats_consent.png)

Google Play and the Google Play logo are trademarks of Google LLC.
