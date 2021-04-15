---
id: web-development-software
title: Information for developers of Meshtastic-web
sidebar_label: Development
---


## Considerations

We have a total of 458752 bytes (448KB) available on the SPIFFS (Serial Peripheral Interface Flash File System) -- the on board storage of the ESP32. Of that space, let's not use more than half of that (224KB) in order to leave space for other uses.

Right now, the Meshtastic Device Preferences as well as SSL keys use that space. We can imagine other future uses as well such as logging chat messages and possibly saving received signal strength with GPS coordinates to create coverage heat maps.

## Static Files

Static files can be placed in the /data folder. All files should be compressed in the .gz format with a .gz extension regardless of the file type.

As an example, this would mean we will have files such as:

* style.css.gz
* meshtastic.js.gz
* meshtasticlogo.png.gz

Unless otherwise stated, files in the `/data` folder of the source code will be stored in `/static` on the device.

## Application Interface

We make extensive use of [Meshtastic.js](https://github.com/meshtastic/meshtastic.js). 

## Embedded Server

### Root

When requesting to the root of the web server, the either /static/index.html or /static/index.html.gz will be fetched from the file system and served to the client. We require that the file is in the gzip format. Serving an uncompressed file is not supported. If both index.html and index.html.gz are on the filesystem, index.html will be served and index.html.gz will be ignored.

### /static

All files stored in /data/static in the Meshtastic source code will be available in /static on the Meshtastic device.

If a file is uploaded in a .gz format, the .gz extension will be stripped prior to being served to the client. Keep your filenames as short as possible. Short filenames work better than long file names.

An experimental file system browser with upload and delete capability is available by going to either:

* http://meshtastic.local/static
* https://meshtastic.local/static

There are known issues with uploading files with large file sizes.

The current preferred method to upload data is through PlatformIO and the file system browser is provided without guarantees.

### /restart

A post to this location will cause the device to restart.

### /favicon.ico

The Meshtastic logo in .ico format.

### /hotspot-detect.html

Used by the Apple Captive Portal Assistant.

### /upload

End point to upload files. Used by the file manager.

### /json/report

Return a report of airtime statistics and current status.

Formula to calculate when the current time period will roll over:

`data.airtime.seconds_per_period - (data.airtime.seconds_since_boot % data.airtime.seconds_per_period)`

### /json/scanNetworks

Returns a json data structure of WiFi networks in the area. It's recommended to call this at least 2 or 3 times and combine the results.

We purposely exclude open (insecure) networks from the list.

### /json/spiffs/browse/static

Returns a json data structure with the contents of /static.

If a filename includes a '.gz' extension, will also return a modified version of the filename with the extension stripped. This is to support the functionality in /static (see above).

### /json/spiffs/delete/static

Delete file specified by the parameter "delete". Use the method "DELETE".

eg: /json/spiffs/delete/static?delete=static/something.txt

### Performance

As a general guide, the ESP32 will return HTTP requests significantly faster than HTTPS requests. For responses of 1kb or less, expect the following for real world performance:

HTTP - 3.0 requests / sec
HTTPS - 0.4 requests / sec

The bottleneck of HTTPS is with the SSL handshake. We will get better performance serving one large file rather than multiple small files.
