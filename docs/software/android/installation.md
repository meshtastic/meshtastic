---
id: android-installation
title: Android application installation
sidebar_label: Installation
---
~~Our Android application is available to download on Google Play.~~ Our Google Play listing has been removed by google due to a recent policy change by them with respect to the background location access (which our app needs). We've started the '[appeal](/docs/software/android/location-access)' process, but for now you'll need to get the app from other places.

The app is also available on the Amazon [Appstore](https://www.amazon.com/Geeksville-Industries-Meshtastic/dp/B08CY9394Q). You will need to install the Amazon Appstore onto your phone in order to install the Meshtastic application.

<p align="center"><a href="https://play.google.com/store/apps/details?id=com.geeksville.mesh&referrer=utm_source%3Dgithub-homepage"><img alt="Download at https://play.google.com/store/apps/details?id=com.geeksville.mesh" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style={{zoom:'35%'}} /></a>      <a href="https://www.amazon.com/Geeksville-Industries-Meshtastic/dp/B08CY9394Q"><img alt="Download at https://www.amazon.com/Geeksville-Industries-Meshtastic/dp/B08CY9394Q" src="/img/amazon-fire-button.png" style={{zoom:'20%',padding:'3.5em'}} /></a></p>

The application may not be found if your phone/Android version are too old. The minimum Android version is 5.0 (Lollipop 2014, first BLE support). However, Android 6, Marshmallow 2015, is recommended as the Bluetooth is more stable.

The app can also be sideloaded by downloading the .apk from the <a href="https://github.com/meshtastic/Meshtastic-Android/releases/latest">GitHub releases</a> page. If you do sideload, you may have to give your browser permissions to run a package installer. If you wish to view the code or contribute to development of the app, please visit the app's <a href="https://github.com/meshtastic/Meshtastic-Android">GitHub page</a>.
:::note
Be aware that you may have to open the drop down menu for "Compare" to see the latest alpha/beta builds. Generally the versions will follow the device versions.
:::

After installing the Meshtastic app, open it and navigate to the settings page. The app will ask you to give it permissions to access your location. This is needed for any app to use Bluetooth, as the app is then able to scan the local area for Bluetooth devices. If you give location permissions "only while using the app", the app will only be able to use Bluetooth while it is open and visible to the user. This means if the screen is locked, or you are using another app, Meshtastic will not be able to use Bluetooth, and will not be able to receive any messages from the node.

[![Messages page](/img/android/android-messages-sm.png)](/img/android/android-messages-sm.png) [![Nodes page](/img/android/android-nodes-sm.png)](/img/android/android-nodes.png) [![Channel page](/img/android/android-channel-sm.png)](/img/android/android-channel.png) [![Settings page](/img/android/android-settings-sm.png)](/img/android/android-settings.png) [![Debug page](/img/android/android-debug-sm.png)](/img/android/android-debug.png)

:::note
Be aware that every OS has a different way of handling permissions. In order to prevent the user from accidentally allowing background location services, the dialog box may not give you the option.

Click on the image to see a quick video of where I found it on my phone.

[![Background Permissions Video](/img/android/android-bg-location-permissions.png)](https://youtu.be/YAFLxoeVIHg)
:::

There is a [beta program](https://play.google.com/apps/testing/com.geeksville.mesh) for the app, which will let you test the cutting edge changes, though this may come with extra bugs. You can join this via Google Play. It is recommended that you follow the [Meshtastic Discourse Alpha Testers](https://meshtastic.discourse.group/c/development/alpha-testers) channel if you decide to join this.

The app uses anonymous usage statistics and crash reports to allow us to catch problems with Meshtastic and fix them. Analytics are also required to be able to use the "free" plan of our map provider [Mapbox](https://docs.mapbox.com/help/how-mapbox-works/). You can disable this by unticking the checkbox on the settings page.

[![Settings page with statistics consent box highlighted](/img/android/android-stats-consent-sm.png)](/img/android/android-stats-consent.png)

Google Play and the Google Play logo are trademarks of Google LLC.
