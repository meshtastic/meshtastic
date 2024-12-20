---
title: "Meshtastic Site Planner, an Open Source Tool to Optimize Your Mesh Deployments"
description: "Learn to use the new Meshtastic Site Planner, a free and open-source utility that lets you run advanced physics models to quickly plan the best placements for your Meshtastic nodes."
slug: meshtastic-site-planner-introduction
authors: Dr. Matthew Patrick (Starwatcher)
tags: ["meshtastic", "site planner", "deployments"]
date: 2024-12-19T12:00
hide_table_of_contents: false
image: "/img/blog/meshplanner-demo.png"
---

A well-placed Meshtastic device can have incredible range, but planning the best deployment often requires software which is proprietary, expensive, and difficult to use. The Meshtastic Site Planner is a new, open-source tool that allows you to quickly run accurate predictions of your range in different locations. This tool builds on sophisticated and proven radio propagation models and creates a modern, intuitive application that everyone can freely use.

## Predicting Range ⛰️📡

### Terrain and Why It Matters

Terrain is the number one limitation for Meshtastic signals. Whether you're trying to chat with friends, plan radio deployments for disaster recovery, or even break records set from the edge of space ([range tests](https://meshtastic.org/docs/overview/range-tests/)), the terrain ultimately limits your range. The best way to increase it is to move your antenna higher, which can mean using the local terrain or placing nodes on towers. Some of the most impressive mesh networks use both approaches to transmit over long distances, but predicting the expected coverage can still be challenging. 

The key is having software that knows the elevation of the terrain around your location and can also simulate effects like signal attenuation through air and scattering by obstacles. Before now, these calculations relied on software that was either expensive and proprietary or difficult to use. The terrain datasets were also massive (terabytes of images) and not simple to interpret.

The Meshtastic Site Planner solves these problems by building on SPLAT!, a program written by amateur radio operator John Magliacane (KD2BD). Terrain data is automatically streamed as needed, so you don't need to find and store datasets on your computer. The models, optional settings, and data processing are handled behind a modern web UI that produces beautiful simulation maps anyone can use.

### Radio Waves and Obstacles

Besides terrain, obstructions like buildings, trees, and even weather can block or weaken radio signals. These obstacles scatter and absorb energy, reducing the strength of the signal before it reaches your receiver. How can you ensure your signal gets through without needing detailed maps of every obstacle? 

Fortunately, the Site Planner solves this by allowing you to input the average height of obstructions (called "clutter"). These models use decades of research to forecast how far reliable signals can travel based on environmental conditions. By selecting a reliability threshold (e.g., 90 percent), you can ensure your node has a high likelihood of covering the predicted range.

This approach is widely used in professional radio planning for cell towers, broadcast systems, and microwave internet links. The Meshtastic Site Planner brings this capability to your mesh network. Simply enter the average height of obstacles in your area—such as 10 meters for an urban environment—and the software handles the rest.

By accounting for obstacles, the Site Planner creates realistic coverage maps, helping you optimize placement and ensure consistent connectivity in challenging environments.

### Antennas and Sensitivity

Terrain and obstacles aren't the only factors that limit range—signal strength also fades with distance. Once it becomes too faint, the receiver can't decode it. The Meshtastic Site Planner accounts for these limits, allowing you to create maps tailored to your hardware and channel.

- **Receiver Sensitivity**: Simulate based on your radio’s threshold for decoding weak signals.
- **Antenna Gain**: Adjust for different antenna types to see how they affect coverage and range.
- **Cable Loss**: Account for real-world inefficiencies like signal loss in cables and connectors.

By customizing these parameters, the Site Planner produces accurate, realistic predictions for your specific setup, whether it's a handheld node or a high-power base station.

## Using the Link Planner

The Meshtastic Site Planner is designed for simplicity, making it accessible even if you're not a radio engineer or amateur radio operator. The default settings were carefully chosen to provide accurate predictions for your Meshtastic network right out of the box.

### Getting Started

Using the Meshtastic Site Planner is as easy as:
1. **Clicking on the Map**: Choose the location of your transmitter by simply clicking on the map.
2. **Setting Key Parameters**: Enter your antenna height, select the appropriate frequency for your region (see the list here: [Meshtastic Radio Settings](https://meshtastic.org/docs/overview/radio-settings/)), and adjust any other settings if needed.
3. **Running the Simulation**: Hit "Run Simulation," and within seconds, you'll see a color-coded map showing the predicted signal strength over distance.

### Visualizing Coverage

The output map uses colors to indicate signal strength, helping you quickly identify areas with strong or weak coverage. You can fine-tune the simulation by adjusting parameters like transmitter power, antenna gain, and clutter height to reflect your actual deployment conditions.

### Simulating Multiple Radios

One of the powerful new features of the Site Planner is the ability to add multiple radios to your simulation. This allows you to model overlapping coverage areas for larger networks. For example, you can simulate how two Meshtastic radios placed strategically in Calgary, Alberta, Canada, can cover the northern half of the city. By combining their coverage areas, you can ensure seamless connectivity for your mesh network.

![Two node mesh covering Calgary, Alberta]("/img/blog/siteplanner_two_sites.png")


### Tailored to Your Needs

Whether you're planning a small, localized deployment or a larger network spanning multiple locations, the Meshtastic Link Planner adapts to your requirements. Adjust settings, test configurations, and visualize the results—all with a few clicks.

With the Site Planner, optimizing your mesh network has never been easier.
