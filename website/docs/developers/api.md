---
id: api_developers
title: APIs
sidebar_label: APIs
---

## General

:::note

Currently there are three methods of interfacing wiht devices: `HTTP`, `BLE`, and `Serial`.

Whilst each method has it's own ways sending and receiving data, the underlying protobuf transport medium remains the same.
:::

## HTTP

### Endpoints

#### `PUT` /api/v1/toradio

#### `GET` /api/v1/fromradio&all=`boolean`

## BLE

:::important
UUID for the service: `6ba1b218-15a8-461f-9fa8-5dcae273eafd`
:::

## Serial

:::important

You can communicate with devices with a baud rate of `921600`bps

:::
