import PushNotification from "react-native-push-notification";
import logo from "../assets/logo.png";

const CHANNEL_ID = "cycle-tracker-notifications";

export function configureNotifications() {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish();
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // permissions: { // iOS only
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },
    popInitialNotification: true,
    requestPermissions: false,
  });

  PushNotification.createChannel({
    channelId: CHANNEL_ID,
    channelName: "Cycle Tracker Notifications",
  });
}

/*
  Schedules a recurring notification to appear once a day at specified time,
  starting on given day. Provides actions "Yes" and "No".
  @params
  - title (string)
  - message (string)
  - date (Date)
  - includeActions (boolean)
*/
export function createRecurringNotification(
  title,
  message,
  date,
  includeActions
) {
  PushNotification.localNotificationSchedule({
    channelId: CHANNEL_ID,
    title: title,
    message: message,
    date: date,
    smallIcon: logo,
    largeIcon: logo,
    repeatType: "day",
    repeatTime: 1,
    actions: includeActions ? ["Yes", "No"] : null,
    invokeApp: includeActions ? false : true,
  });
}

export function cancelNotifications() {
  PushNotification.cancelAllLocalNotifications();
}
