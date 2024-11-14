---
title: "Choosing The Right Device Role"
authors: [thebentern]
tags: [meshtastic, devices, roles, guide]
slug: choosing-the-right-device-role
date: 2024-11-10T12:00
hide_table_of_contents: false
image: "/design/web/social-preview-1200x630.png"
---

When setting up your Meshtastic network, configuring the correct Role for each device can be crucial for optimizing performance and ensuring reliable communication. Conversely, the pitfalls of choosing the incorrect Role can lead to congestion and poor performance on your mesh. In this post, we'll explore why you might choose certain device roles and avoid others.

## What is a device Role?

A device role in Meshtastic defines the primary function of a device within the network. Each role is tailored to specific usage and helps in managing the network and the behavior of the device more efficiently. Here are some of the common device roles to consider:

### Client

The defacto role for devices is the `CLIENT` role. This is a flexible, general purpose role for devices which should serve the overwhelming majority of use cases. When in doubt about what role you should go with, simply sticking with Client is a safe bet.

Despite the apparent baggage of the term *Client* in some technological contexts, Clients in Meshtastic do actually repeat / route messages. Unfortunately in the past this has caused some confusion, landing some individuals to incorrectly choose the `ROUTER` role.

### Client Mute

The `CLIENT_MUTE` role is similar to the `CLIENT` role but with one key difference: it does not repeat or route messages. This role is ideal for devices that are intended to be used in areas with high network traffic where additional message routing could cause congestion. By using the `CLIENT_MUTE` role, you can ensure that the device will only send and receive its own messages without contributing to network traffic. 

This role is also highly recommended if you are a mesh enthusiast with multiple devices. Select one of your devices to be a `CLIENT` and set the rest to `CLIENT_MUTE` to keep your airtime usage more responsible.


### Router and Repeater

The `ROUTER` role is designed for devices which are intended to primarily route messages to other devices on the mesh. This role is ONLY suitable for stationary devices placed in extremely strategic locations to act as unofficial hubs for routing packets on the mesh. Routers focus on relaying messages from other devices by _cutting in line_ before other nodes have a chance to rebroadcast a message, making them key for extending the range and reliability of your mesh. Additionally Routers *always* rebroadcast, whereas most other roles potentially choose to forego rebroadcasting if they hear a neighbor rebroadcasting first.

Another default behavior of Routers is that the device tries to save as much power as possible by attemtping to sleep as well as send telemetry packets less frequently than other devices on the mesh. This is because they are chiefly tasked with routing others' traffic rather than originating their own messages.

The `REPEATER` role behaves very similar to `ROUTER` in terms of becoming a preferred device for routing packets, however it goes a step further by completely turning off any broadcasted traffic such as telemetry. It only responds to other nodes packets instead of originating messages. 

#### What is a strategic location anyway?

When evaluating strategic locations for these two roles, consider a tower on mountain peak rather than a tall building. By electing a device to become a Router or Repeater, you are making an implicit choice for the entire mesh to prefer that node for rebroadcasts for any direct neighbors. This strategic placement becomes crucial for ensuring that packets can be delivered to the widest possible audience. Using line of sight viewshed survey tools to determine the optimal location is recommended, but selection can best be determined by collecting some real world data on the mesh first.

![Router](/img/blog/router_not_router.png)

#### Why improperly applying Router and Repeater roles is harmful

If a poor location is chosen for Routers and Repeaters, it can cause a number of issues:

1) Increased rate of packet collisions
    
Because Routers and Repeaters always rebroadcast, when too many devices are applied with these roles and the devices are direct neighbors, packets will potentially be rebroadcasted at the same time, creating higher noise levels and packet error rates. This frequently culminates in sporadic delivery failures.  

2) Decreased overall range

An improperly located router will potentially prematurely *hop gobble* any packets routing through it. This has the effect of consuming a hop in the routing of a packet before it would be able to reach more strategicly located nodes. This can greatly limit range for instance, in the case of many Routers being deployed in a valley consuming all of the available hops before a packet is able to reach its destination through a more stratically node placed on a peak above the valley. 

3) Asymetrical links

Similarly to the issue of decreased range, the same scenario can also result in asymetrical communication, wherein a subset of the mesh can send messages to a different group, but that group is unable to reach back with responses through the improperly placed Routers' premature consumption of hops before the message is able to deliver. This phenomena can also lead to a reaction of users increasing the hop limit to compensate for the problem, which unfortunately further increases congestion by utilizing more air time.


### Sensor

The `SENSOR` role is intended for devices which primarily gather and transmit sensor data. These devices still participate in routing messages for other devices, but they prioritize sending their own telemetry data to the network, even in the face of high channel utilization. This role is ideal for environmental monitoring, weather stations, or any application where the device's main function is to collect and report telemetry.

By using the `SENSOR` role in combination with `power.is_power_saving`, the device will attempt to sleep between intervals of sending environmental telemetry, significantly extending runtimes for devices utilizing this combination of settings.

### Tracker

The `TRACKER` role is designed for devices that are primarily used for tracking the location of assets, vehicles, or individuals. Devices in this role periodically send their GPS coordinates to the network via Position packets with a higher priority, allowing for more robust location tracking. Trackers still participate in routing messages, but their main goal is to provide timely location data, even in the face of high channel utilization.

By using the `TRACKER` role in combination with `power.is_power_saving`, the device will attempt to sleep between intervals of sending position data, significantly extending runtimes for devices utilizing this combination of settings.

### Conclusion

Choosing the right device role is crucial for the performance and reliability of your Meshtastic network. By understanding the differences between the common roles, you can optimize your network setup to meet your specific needs and ensure efficient communication across all devices. For more technical information about each role, visit the [device configuration](/docs/configuration/radio/device/#roles) docs.
