# cycle-tracker

A React Native app for _very_ basic period tracking.

## New Project Setup Tips / Troubleshooting

- To create a new app, run `npx create-expo-app [folder name]`

- To generate native iOS and Android apps for your project, run `npx expo prebuild`

  - You may need install Java and set the `$JAVA_HOME` environment variable, follow the steps here (but use openjdk-11-jdk): https://kontext.tech/article/621/install-open-jdk-on-wsl

- To view logs (via `console.log()`, `console.warn()`), run `react-native log-android`

## Debugging local Android in Windows

References:

- https://stackoverflow.com/a/67097784
- https://gist.github.com/jjvillavicencio/18feb09f0e93e017a861678bc638dcb0

1. You will need to install the Android command line tools for Linux.

   1. Go to https://developer.android.com/studio/index.html and scroll to the bottom to download the ZIP file for command line tools.
   2. In WSL, create a series of directories called `~/Android/cmdline-tools/tools`. The unzipped contents should go into this `/tools` folder
   3. If the directories were set up correctly, you should be able to go to `~/Android/cmdline-tools/tools/bin/sdkmanager` and run `sdkmanager "platform-tools" "platforms;android-31" "build-tools;31.0.0"` (replace the Android version with the desired version).
      - You may need to `chmod +x sdkmanager` for correct permissions.
   4. Set the `$ANDROID_HOME` environment variable in bash/zsh, and then run `source` to update the terminal.

2. The step above will get the platform-tools for Linux, but you'll also need to download just the platform-tools for Windows: https://dl.google.com/android/repository/platform-tools-latest-windows.zip. Unzip the platform-tools directory into C:\platform-tools.

3. Connect your phone via USB. Look up your phone's IP address in Settings.

4. In a Windows terminal, run `.\adb tcpip 5555` in the platform-tools folder.

5. In a WSL2 terminal, `cd` into the platform-tools folder `~/Android/platform-tools` run `adb connect [phone IP]:5555`.

   - You may need to change the permissions on `adb` to run the executable - assuming you are already in the platform-tools folder, the command is `chmod +x adb`.
   - The first time you connect using your phone's IP address, you will be prompted to confirm the connection. `adb` might say it failed to connect while it was waiting for the confirmation. If so, run `adb kill-server` in the WSL2 terminal and then run `adb connect [phone IP]:5555` again.

6. Check that your device is listed using `.\adb devices` in PowerShell or `adb devices` in WSL2.

7. To install and launch your app on the device, run `npx react-native run-android`

   - If this command cannot find your device/emulator, make sure that it is using the same `adb` version as the one you installed by creating a symlink (you may need to `sudo rm /usr/bin/adb` first):

     ```
     adb kill-server
     sudo cp ~/Android/platform-tools/adb /usr/bin/adb
     sudo chmod +x /usr/bin/adb
     ```

     Then reconnect your device.

8. Run `npx react-native start` to start the development server.
