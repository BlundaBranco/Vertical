# Version 3

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/version-3

---

# Version 3

Updated: Dec 11, 2025

We are introducing versioning cadence to Embedded Signup that will align with Graph API. v3 will be released on May 29th for all partners to adopt, which will include the following changes.

## Business customers can now complete the flow without a phone number

Previously in v2, you would always be required to register a verified phone number (unless partners enabled the bypass phone numbers flow) to complete the flow. You can now complete the flow with statuses like verified, unverified, or no phone number at all. You can either go through Embedded Signup again, go on WhatsApp manager, or the partner can utilize [API calls to verify the number](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers).

To determine the status of the phone number, visit the documentation on session info logging.

## Session Info Logging is automatically enabled

All partners who are on v3 will have session info logging enabled automatically. Partners will still have to add an event listener on the same window of Embedded Signup to process the incoming information.

## Adding the `features` property in the configuration

You can now utilize the features property to enable a range of features in Embedded Signup. The property allows you to add multiple features instead of just one in the featureType property from v2.

### v3 request syntax
    
    
    // Launch method and callback registration  
    const launchWhatsAppSignup = () => {  
      FB.login(fbLoginCallback, {  
        config_id: '', // your configuration ID goes here  
        response_type: 'code',  
        override_default_response_type: true,  
        extras: {  
      version: 'v3'  
      setup: {},  
      features: [],  
          featureType: ''  
        }  
    }  
      
    

Placeholder |  Description |  Example   
---|---|---  
``| Name of feature to enable in ES configuration.Note: You can leave the value blank to follow the default flow.Values can be:

  * `app_only_install` — Allows partners to only access WABAs via API using a [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).
  * `marketing_messages_lite` — Enables the MM API for WhatsApp onboarding flow.

| 
    
    
    {  
      features: [  
        {  
          name: 'marketing_messages_lite'  
        }  
      ]  
    }  
      
      
  
``| Name of feature types to enable in ES configuration.Value can only be `whatsapp_business_app_onboarding`, which enables the Whatsapp Business App phone number onboarding custom flow.| `whatsapp_business_app_onboarding`  
  
## Removal of multiple `featuretype` options in the ES Configuration

In [v2](/documentation/business-messaging/whatsapp/embedded-signup/versions#version-2), business customers enabling a custom flow would be required to complete the embedded sign up multiple times depending on the number of featureTypes added to the configuration.

### Removing `only_waba_sharing`

The [bypass phone number screen flow](/documentation/business-messaging/whatsapp/embedded-signup/bypass-phone-addition) allows for a streamlined onboarding process where the WABA is shared without the need to go through the phone number setup steps. This flow will no longer be supported in v3. If you want to use the flow, use v2.

### Removing `marketing_messages_lite`

Marketing Messages API for WhatsApp will still be supported through the features argument. If you would still like to use the flow, update your configuration to the following.

### Removing `coexistence`

To launch the WhatsApp Business App Onboarding flow, partners will have to use `whatsapp_business_app_onboarding` instead of `coexistence`.

## Embedded Signup Pre-Filled will no longer skip screens.

Partners will still be able to pre-fill business information in Embedded Signup, but the business customer will not have the option to bypass any screens in the flow. For partners who would still like to use the flow, you should stick to using v2.

## Measurement Partners must remain on v2

Please note that Measurement product onboarding will only be supported on v2 for the time being. Continuing to support Measurement partners is important and will be supported in a future version.

Did you find this page helpful?

ON THIS PAGE

Business customers can now complete the flow without a phone number

Session Info Logging is automatically enabled

Adding the features property in the configuration

v3 request syntax

Removal of multiple featuretype options in the ES Configuration

Removing only_waba_sharing

Removing marketing_messages_lite

Removing coexistence

Embedded Signup Pre-Filled will no longer skip screens.

Measurement Partners must remain on v2

* * *