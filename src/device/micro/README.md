# modRobots micro

## How to use

1. flash using `env:esp32-c3-devkitm-1`
2. make sure device is in download mode: press and hold BOOT button while powering on the device, then release the BOOT button
3. upload file system image via PlatformIO > Project Tasks > Platform > Upload File System Image
4. restart the device

## Connect to Micro

Join network `modRobots micro` with default password `password`. Enter yout WIFI credentials and save.

Once you have micro on network and connected, switch to OTA version `env:esp32-c3-devkitm-1-ota` and update firmware that way. Make sure you enter correct IP address in configuration.
