# Bypassing the phone number addition screen

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/bypass-phone-addition

---

# Bypassing the phone number addition screen

Updated: Nov 14, 2025

This document describes how to customize Embedded Signup to bypass the [phone number addition screen](/documentation/business-messaging/whatsapp/embedded-signup/default-flow#phone-number-addition-screen) (shown below) and [phone number verification screen](/documentation/business-messaging/whatsapp/embedded-signup/default-flow#phone-number-verification-screen).

If you don’t want your business customers to have to enter or choose a business phone number in the phone number addition screen, you can customize Embedded Signup to skip the screen entirely. However, after a customer successfully completes the customized flow, you must [programmatically create and register their business phone number](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers), or build a UI in your app that allows them to do this.

## Enabling the feature

To enable this feature, set `featureType` to `only_waba_sharing` in the [launch method and callback registration](/documentation/business-messaging/whatsapp/embedded-signup/implementation#launch-method-and-callback-registration) portion of the Embedded Signup code:
    
    
    // Launch method and callback registration
    const launchWhatsAppSignup = () => {
      FB.login(fbLoginCallback, {
        config_id: '', // your configuration ID goes here
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: 'only_waba_sharing', // set to only_waba_sharing
          sessionInfoVersion: '3',
        }
      });
    }

When a business customer successfully completes the flow, the [session logging message event](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener) will have `event` set to `FINISH_ONLY_WABA`:
    
    
    {  
      data: {  
        phone_number_id: "",  
        waba_id: ""  
      },  
      type: "WA_EMBEDDED_SIGNUP",  
      event: "FINISH_ONLY_WABA",  
      version: 3  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Enabling the feature

* * *