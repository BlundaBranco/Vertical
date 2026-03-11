# Error Signals

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/error-signals

---

# Error Signals

Updated: Feb 6, 2026

**Upcoming deprecation:** Starting **April 15, 2026** , the `PendingIntent`-based handshake method for authentication templates will be deprecated. If you are currently using `PendingIntent` to initiate handshakes or verify app identity, the [OTP Android SDK](/documentation/business-messaging/whatsapp/templates/authentication-templates/zero-tap-authentication-templates#using-the-sdk) is the preferred way to migrate.

The OTP Android SDK is in beta and features a simplified workflow for implementing one-tap and zero-tap authentication templates. You can learn how to use it below.

This document describes Android-only error signals that can help you debug [one-tap autofill authentication templates](/documentation/business-messaging/whatsapp/templates/authentication-templates/autofill-button-authentication-templates) and [zero-tap authentication templates](/documentation/business-messaging/whatsapp/templates/authentication-templates/zero-tap-authentication-templates).

If your message fails the eligibility check, the one-tap autofill button will be replaced with a copy code button. In addition, there may be device or WhatsApp client settings that prevent message notifications. To help with debugging, our apps surface some error information via the `com.whatsapp.OTP_ERROR` intent. In these situations you will receive an error key and message instead of the user’s one-time passwords or verification code.

Note that some of these error signals will only surface if you are running WhatsApp in the Android emulator.

Key |  Description   
---|---  
`ambiguous_delivery_destination` _Emulator only_| **Ambiguous delivery destination** There are multiple active OTP requests for the packages specified by this template, and we could not determine which package to deliver the code to.This can happen when multiple applications specified in the template’s `supported_apps` array have initiated the handshake (sent the `com.whatsapp.otp.OTP_REQUESTED` intent) within the past 10 minutes.  
`incompatible_os_version`| **Incompatible Android version**  
This can happen when you initiate the handshake (send the `com.whatsapp.otp.OTP_REQUESTED` intent) but the device is running a version of Android older than v19.  
`incorrect_signature_hash` _Emulator only_| **Incorrect signature hash**  
This can happen when you initiate the handshake (send the `com.whatsapp.otp.OTP_REQUESTED` intent) and our app receives an authentication template message that uses a one-tap autofill button, but the package name in the message does not produce the message’s signature hash.  
`missing_handshake_or_disorder`| **Missing handshake / Order of operations**  
This can happen when our app receives an authentication template message with a one-tap autofill button but the handshake was not initiated.  
`otp_request_expired`| **OTP request expired**  
This can happen when an authentication template that uses a one-tap autofill button is delivered to the user but more than 10 minutes (or the number of minutes indicated in the template’s `code_expiration_minutes` property, if present) have passed since you initiated the handshake. In this situation, we display the copy code button instead.  
`whatsapp_message_notification_disabled` _Emulator only_| **Message notification disabled in WA settings**  
This can happen when you initiate the handshake (send the `com.whatsapp.otp.OTP_REQUESTED` intent) but the user has disabled notifications in the WhatsApp app or WhatsApp Business app (within our app settings).  
`whatsapp_notification_disabled` _Emulator only_| **WA notification disabled in device level**  
This can happen when you initiate the handshake (send the `com.whatsapp.otp.OTP_REQUESTED` intent) but the user has disabled app notifications for our apps (device level settings).  
  
### Integration

The error signals are delivered via broadcasted intent so you must implement [`BroadcastReceiver`⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Fcontent%2FBroadcastReceiver&h=AT6su974PU7lkr7_VwY67h4nTVZzptPNW88cPAVG8Fgt6y6uMRQlJ8EKQsjiSeoZEaDqlBeWL-SvG6nb9RwNlzkA7OSNStjrEHzNG79gbFwG06bPvLt_16YnBFA5077Nw68256mmQ6ffqy1r0bXI5w) to listen for error signals.

#### In manifest.xml
    
    
      
         
             
         
      
      
    

#### Receiver class - Using the SDK (Preferred)

Implement `onReceive` and use a `WhatsAppOtpIncomingIntentHandler` object to process the debug signals.
    
    
    public class OtpErrorReceiver extends BroadcastReceiver {
    
     @Override
     public void onReceive(Context context, Intent intent) {
         WhatsAppOtpIncomingIntentHandler whatsAppOtpIncomingIntentHandler = new WhatsAppOtpIncomingIntentHandler();
         whatsAppOtpIncomingIntentHandler.processOtpDebugSignals(
                              intent,
                              // your function to handle the signal
                              (debugSignal) -> handleSignal(debugSignal),
                              // your function to handle any error
                              (error, exception) -> handleError(error, exception));
     }
    }

#### Receiver class - Without the SDK
    
    
    public class OtpErrorReceiver extends BroadcastReceiver {
     public static final String OTP_ERROR_KEY = "error";
     public static final String OTP_ERROR_MESSAGE_KEY = "error_message";
    
     @Override
     public void onReceive(Context context, Intent intent) {
       String otpErrorKey = intent.getStringExtra(OTP_ERROR_KEY);
       String otpErrorMessage = intent.getStringExtra(OTP_ERROR_MESSAGE_KEY);
       // Handle errors
     }
    }

Did you find this page helpful?

ON THIS PAGE

Integration

In manifest.xml

Receiver class - Using the SDK (Preferred)

Receiver class - Without the SDK

* * *