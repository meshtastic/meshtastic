# Location access and meshtastic

Google Play has some newish requirements for access to background location.  This doc is a collection of work items needed to meet those requirements.

The app is currently removed from the Play Store ([broken store link](https://play.google.com/store/apps/details?id=com.geeksville.mesh)), and some kind Googlers inside of Google are helping with this problem.  **Hopefully** it will be
relisted soon (while we address these newish requirements), but we've got to do a bit of code to add a new dialog (and make a video for Google).  It will take about a week to make these changes (including testing time with the [alpha-tester group](https://meshtastic.discourse.group/c/development/alpha-testers/) on the forum).

Until relisted in the Play Store (hopefully they can relist while we make these fixes), you'll need to install [raw APKs from GitHub](https://github.com/meshtastic/Meshtastic-Android/releases).  Which is not ideal, but works.

Sorry ya'll.  

(The remainder of this public document is mostly for Googlers)

## Why this app needs "foreground location access"

We need foreground location access for two reasons:

* (Primarily) [This app](https://github.com/meshtastic/Meshtastic-Android) is a navigation app that uses long range LoRa mesh radios for communication in the back country.  These radios can run for weeks on a charge and talk to the user's phone over USB or Bluetooth to provide the UX.  We need foreground location so we can show the user's current position on the same map that is showing positions of the other users.
* (Secondarily) Using the old Bluetooth BLE API (which we need to use to support older devices), scanning for Bluetooth low energy devices requires this permission (because 'beacons' etc... could leak location info to the app).  Without this permission (on older phones) the BLE discovery results are always empty.

If it is helpful, [here](https://meshtastic.org/docs/software/android/android-usage) is a slightly stale set of screenshots/instructions showing how the user uses our application.

## Why this app needs "background location access"

When the user has the LoRa device in their pocket occasionally (every 15 minutes ish), the android sister app background service will acquire the GPS position and provide it to the LoRa [firmware](https://github.com/meshtastic/Meshtastic-device).  Without background location access this core (the primary feature) of our app would not work (because you wouldn't be able to see the last known position of the hikers/skiers/users in your group).

This location is shared only over an [encrypted](https://meshtastic.org/docs/developers/device/encryption) link and each group of users has their own AES256 key for their 'channel'.  Our privacy policy is [here](https://meshtastic.org/docs/legal/privacy).

(This description has been simplified a bit: This project works with a [variety](https://meshtastic.org/docs/hardware) of LoRa devices, some of which have their own built-in GPS. For the devices that have a GPS built-in, we do not use android to get the user's location)

## Fixes needed for these new Play Store background position requirements

Since we need background location access for the app to work, we need to do three new things.

per https://support.google.com/googleplay/android-developer/answer/9799150

### TODO: Update Play Store listing

The existing text explains what the app does, but it needs to be even more explicit:

Requirements from Google site:
If you plan to use location in the background in your app, you should communicate this to users in the Google Play Store Listing via your app description, screenshots and (if applicable) title or icon. 

Here are some suggestions on how to highlight use of location in the background to users:

Provide a short description to signal 'location' (for example, 'find anywhere' or 'always know where').
Include an in-app screenshot that shows a map/user location or geotagged images. 
If applicable, your app title or icon may also signal the location feature of your app.

## TODO: In app dialog

We currently explain why we need location access on the settings page and in the help.  But we need a new dialog at launch, which needs to be **super** explicit:

Requirements from Google site:
Must be within the app itself, not only in the app description or on a website;
Must be displayed in the normal usage of the app and not require the user to navigate into a menu or settings;
Must describe the data being accessed or collected;
Must explain how the data will be used and/or shared;
Cannot only be placed in a privacy policy or Terms of Service; and
Cannot be included with other disclosures unrelated to personal or sensitive data collection.
Does not need explicit consent such as an 'accept' or 'I understand' granted by the user as this is done in the runtime prompt that immediately follows; enabling the user to close or swipe away are acceptable ways to migrate out of the disclosure.
The language in the disclosure MUST include the following elements:

The term 'location'
Indication that the nature of usage is in the background by using one of the following phrases 'background'/'when the app is closed'/'always in use'/'when the app is not in use'
A list of all the features that use location in the background
If you extend permitted usage to ads, you must include the following: 'used to provide ads/support advertising/support ads'. (Choose the most accurate phrasing).
Example disclosure statements
Below are two example statements that can be used in your disclosure; the latter includes the use of location for ads for which you can choose the most relevant phrasing):

'[This app] collects location data to enable "feature", "feature" and "feature" even when the app is closed or not in use'. 
'[This app] collects location data to enable "feature", "feature" and "feature" even when the app is closed or not in use and it is also used to support advertising'.
The prominent disclosure may include other information to ensure compliance to policy requirements and clarity for users but must at least include the above, where relevant.

Note: If the feature does not have a user-facing interface when location in the background is active, please surface the prominent disclosure notification when the app is opened for the first time instead.

## TODO: Video demonstration

I'm awful at making videos, so I'll ask someone from the [forum](https://meshtastic.discourse.group/) to help with this!

Requirements from Google site:
As part of the permissions declaration, you must provide a link to a short video that demonstrates the location-based feature in your app that requires access to location in the background (while the app is not in use). 

You can see an example of what this video demonstration should look like below.

See an example video demonstration
As part of the permissions declaration, you must provide a link to a short video that demonstrates the location-based feature in your app that requires access to location in the background (while the app is not in use). The video should demonstrate the background location feature and the required steps to encounter and enable this feature in-app. The video should show: 1. Runtime prompt, 2. the prominent in-app disclosure dialog displayed to users (described below), and the feature being activated from the background. 3. The recommended duration is 30 seconds or less. A YouTube link is the preferred video format, but Google Drive storage links to an mp4 or other common video file formats are also supported. Note: If the feature does not have a user-facing interface when location in the background is active, please note this in your declaration and demonstrate the feature or its impacts as much as possible in the video. Ensure your video is made using an Android device. 

Video requirements
The video should demonstrate the background location feature and the required steps to encounter and enable this feature in-app. The video should show:

Runtime prompt,
the prominent in-app disclosure dialogue displayed to users (described below)
and the feature being activated from the background.
The recommended duration is 30 seconds or less. A YouTube link is the preferred video format, but Google Drive storage links to an mp4 or other common video file formats are also supported.

Note:

If the feature does not have a user-facing interface when location in the background is active, please note this in your declaration and demonstrate the feature or its impacts as much as possible in the video.
Ensure that your video is made using an Android device.
