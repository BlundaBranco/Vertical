# Versions

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/versions

---

# Versions

Updated: Dec 11, 2025

The latest Embedded Signup Version is: `v4`

This guide provides an overview on versioning in Embedded Signup. The versioning cadence will align with Graph API. The versions are not exclusive, partners can gradually roll out a new version of ES to reduce risk. The Embedded Signup version is determined inside of the **extras object** of the implementation code.

**Note: The refreshed UI, currently available in the public preview, will be rolled out to all versions of Embedded Signup in early September.**

## Available ES Versions

Version |  Date Introduced |  Available Until   
---|---|---  
[v4](/documentation/business-messaging/whatsapp/embedded-signup/version-4)| October 8th, 2025| TBD  
[v3-public-preview](/documentation/business-messaging/whatsapp/embedded-signup/version-3-public-preview)| August 14, 2025| October, 2026  
[v2-public-preview](/documentation/business-messaging/whatsapp/embedded-signup/version-2-public-preview)| August 14, 2025| October, 2026  
[v3](/documentation/business-messaging/whatsapp/embedded-signup/version-3)| May 29, 2025| October, 2026  
v2| January 2023| October, 2026  
  
## Overview of feature availability

Version |  Feature types |  Features |  Completion State |  Prefilled Info | [Session Info Logging](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener)|  Products (via login config)   
---|---|---|---|---|---|---  
`v4`| `whatsapp_business_app_onboarding`| `app_only_install`| Users can finish with a verified, unverified or no phone number| Can fill business information, no screens will be skipped.| Sent back for all flows| Marketing Messages API for WhatsApp(MM API for WhatsApp)Click to WhatsApp Ads (CTWA)Conversions API (WhatsApp)  
`v3-public-preview`| `whatsapp_business_app_onboarding`| `app_only_install``marketing_messages_lite`| Users can finish with a verified, unverified or no phone number| Can fill business information, no screens will be skipped.| Sent back for all flows| Not supported  
`v2-public-preview`| `only_waba_sharing``whatsapp_business_app_onboarding``marketing_messages_lite`| `app_only_install``marketing_messages_lite`| Users will finish with a verified phone number| Can fill business information, no screens will be skipped.| Sent back for all flows| Not supported  
`v3`| `whatsapp_business_app_onboarding`| `app_only_install``marketing_messages_lite`| Users can finish with a verified, unverified or no phone number| Can fill business information, no screens will be skipped.| Sent back for all flows| Not supported  
`v2`| `only_waba_sharing``whatsapp_business_app_onboarding``marketing_messages_lite`| `marketing_messages_lite`| Users will finish with a verified phone number| Can fill business information and skip screens| Partners are required to add a `sessionInfoVersion` to receive the callback| Not supported  
  
## Version 4

**Released:** October 8, 2025 | [Detailed changes](/documentation/business-messaging/whatsapp/embedded-signup/version-4)

**Login Configuration**

**Extras Configuration**
    
    
     extras: {} // The extras object is purposely empty for v4.

To use v4: You need to create a new [Facebook Login for Business Configuration](/documentation/business-messaging/whatsapp/embedded-signup/implementation/#step-2-create-a-facebook-login-for-business-configuration), and select your desired products. Selecting the products will automatically set you to v4.

## Version 3 Public Preview

**Released:** August 14, 2025 | **Available until:** October, 2026 | [Detailed changes](/documentation/business-messaging/whatsapp/embedded-signup/version-3-public-preview)

**Extras Configuration**
    
    
     extras: {
        setup: "",
        features: [
          {
            name: ""
          }
        ],
        featureType: "",
        version: ""
    }

Placeholder |  Description |  Example Value   
---|---|---  
``| Prefilled business data to inject data into Embedded Signup.| 
    
    
    {
      "business": {
      "name": "Jaspers Market"
       }
    }  
  
``| Indicates a flow or feature to enable.| **Possible Values:**`app_only_install` — Allows partners to access WABAs via API using a granular token (BISU), without creating a (SUAT)`marketing_messages_lite` — Enables the [Marketing Messages API for WhatsApp onboarding](/documentation/business-messaging/whatsapp/marketing-messages/overview) flow.  
``| Indicates a flow or feature to enable.| **Possible Values:**`whatsapp_business_app_onboarding` — Enables the [Whatsapp Business App phone number onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) custom flow.Leave **blank** to enable the default onboarding flow.  
``| Indicates Embedded Signup version flow.| **Possible Values:**`v3-public-preview`, `v2-public-preview`, `v3`, `v2`  
  
## Version 2 Public Preview

**Released:** August 14, 2025 | **Available until:** October, 2026 | [Detailed changes](/documentation/business-messaging/whatsapp/embedded-signup/version-2-public-preview)

**Extras Configuration**
    
    
     extras: {
        setup: "",
        features: [
          {
            name: ""
          }
        ],
        featureType: "",
        sessionInfoVersion: ""
        version: ""
    }

Placeholder |  Description |  Example Value   
---|---|---  
``| Prefilled business data to inject data into Embedded Signup.| 
    
    
    {
      "business": {
      "name": "Jaspers Market"
       }
    }  
  
``| Indicates a flow or feature to enable.| **Possible Values:**`app_only_install` — Allows partners to access WABAs via API using a granular token (BISU), without creating a (SUAT)`marketing_messages_lite` — Enables the [MM API for WhatsApp onboarding](/documentation/business-messaging/whatsapp/marketing-messages/overview) flow.  
``| Indicates a flow or feature to enable.| **Possible Values:**`whatsapp_business_app_onboarding` — Enables the [Whatsapp Business App phone number onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) custom flow.`only_waba_sharing` \- Enables the [Whatsapp Business App phone number onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) custom flow. Will **NOT** show the new consolidated UI.`marketing_messages_lite` \- Enables the [MM API for WhatsApp onboarding](/documentation/business-messaging/whatsapp/marketing-messages/overview) custom flow. Will **NOT** show the new consolidated UI.Leave **blank** to enable the default onboarding flow.  
``| Indicates the returned session payload.| **Possible Values:**`3`  
``| Indicates Embedded Signup version flow.| **Possible Values:**`v3-public-preview`, `v2-public-preview`, `v3`, `v2`  
  
## Version 3

**Released:** May 29, 2025| **Available until:** October, 2026| [Blog post](/blog/post/2025/05/29/introducing-graph-api-v23-and-marketing-api-v23/)| [Detailed changes](/documentation/business-messaging/whatsapp/embedded-signup/version-3)  
---|---|---|---  
  
**Extras Configuration**
    
    
     extras: {
        setup: "",
        features: [
          {
            name: ""
          }
        ],
        featureType: "",
        version: "v3"
    }

Placeholder |  Description |  Example Value   
---|---|---  
``| Prefilled business data to inject data into Embedded Signup.| 
    
    
    {
      "business": {
      "name": "Jaspers Market"
       }
    }  
  
``| Indicates a flow or feature to enable.| **Possible Values:**`app_only_install` — Allows partners to access WABAs via API using a granular token (BISU), without creating a (SUAT)`marketing_messages_lite` — Enables the [MM API for WhatsApp onboarding](/documentation/business-messaging/whatsapp/marketing-messages/overview) flow.  
``| Indicates a flow or feature to enable.| **Possible Values:**`whatsapp_business_app_onboarding` — Enables the [Whatsapp Business App phone number onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) custom flow.Leave **blank** to enable the default onboarding flow.  
``| Indicates Embedded Signup version flow.| **Possible Values:**`v3-public-preview`, `v2-public-preview`, `v3`, `v2`  
  
## Version 2

**Released:** January 2023| **Available until:** October, 2026  
---|---  
  
**Extras Configuration**
    
    
     extras: {
        setup: "",
        features: [
          {
            name: ""
          }
        ],
        featureType: "",
        sessionInfoVersion: "",
    }

Head to the [pre-fill screens page](/documentation/business-messaging/whatsapp/embedded-signup/pre-filled-data#injecting-data) to see how to inject customer business data into Embedded Signup.

Placeholder |  Description |  Example Value   
---|---|---  
``| Prefilled business data to inject data into Embedded Signup.| 
    
    
    {
      "business": {
      "name": "Jaspers Market"
       }
    }  
  
``| Indicates a flow or feature to enable.| **Possible Values:**`app_only_install` — Allows partners to access WABAs via API using a granular token (BISU), without creating a (SUAT)`marketing_messages_lite` — Enables the [MM API for WhatsApp onboarding](/documentation/business-messaging/whatsapp/marketing-messages/overview) flow.  
``| Indicates a flow or feature to enable.| **Possible Values:**`whatsapp_business_app_onboarding` — Enables the [Whatsapp Business App phone number onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) custom flow.`only_waba_sharing` \- Enables the [Whatsapp Business App phone number onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) custom flow.`marketing_messages_lite` \- Enables the [MM API for WhatsApp onboarding](/documentation/business-messaging/whatsapp/marketing-messages/overview) custom flow.Leave **blank** to enable the default onboarding flow.  
``| Indicates the returned session payload.| **Possible Values:**`3`  
``| Indicates Embedded Signup version flow.| **Possible Values:**`v3-public-preview`, `v2-public-preview`, `v3`, `v2`  
  
Did you find this page helpful?

ON THIS PAGE

Available ES Versions

Overview of feature availability

Version 4

Version 3 Public Preview

Version 2 Public Preview

Version 3

Version 2

* * *