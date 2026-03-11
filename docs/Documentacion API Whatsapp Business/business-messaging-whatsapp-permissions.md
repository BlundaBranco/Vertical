# Permissions

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/permissions

---

# Permissions

Updated: Nov 5, 2025

Platform endpoints are gated by permissions. References for each endpoint indicated which permissions it requires, but in general, you will need the following:

  * [whatsapp_business_management](/docs/permissions#whatsapp_business_management) — needed to access metadata on your WhatsApp Business Account, template management, getting business phone numbers associated with your WABA, all analytics, and to receive webhooks notifying you of changes to your Whatsapp Business Account
  * [whatsapp_business_messaging](/docs/permissions#whatsapp_business_messaging) — needed to send any type of message to a WhatsApp users, and to receive incoming message and message status webhooks

Depending on your business needs, you may also need these permission:

  * [business_management](/docs/permissions#business_management) — only needed if you need to programmatically access your business portfolio (this is rarely needed, since you can access your portfolio using [Meta Business Suite⁠](https://business.facebook.com/).
  * [whatsapp_business_manage_events](/docs/permissions#whatsapp_business_manage_events) — only needed if you are sending marketing templates with [Marketing Message Lite API](/docs/whatsapp/marketing-messages-lite-api), in conjunction with the [Conversions API](/docs/marketing-api/conversions-api), for event tracking.
  * [ads_read](/docs/permissions#ads_read) — only needed if you are using [Marketing Message Lite API](/docs/whatsapp/marketing-messages-lite-api) in conjunction with the [Insights API](/docs/marketing-api/insights) to get conversion metrics

## App Review

If you are a [solution provider](/documentation/business-messaging/whatsapp/solution-providers/overview) and other businesses will be using your app to access their data, your app must undergo [App Review](/documentation/business-messaging/whatsapp/solution-providers/app-review), and you must be approved for **advanced access** for any permissions your app needs. If you aren’t approved for advanced access for a given permission, your app users will be unable to grant your app that permission.

If you are a direct developer and will only be accessing your own business data, you do not need to under App Review and do not need advanced access for any permissions.

## How to get permissions

App users must grant your app individual permissions. If you are a direct developer and are using a system token, when you create a [system token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens), you must create a system user and use it to grant your app individual permissions as part of the system token creation process:

If you are a [solution provider](/documentation/business-messaging/whatsapp/solution-providers/overview) using [business tokens](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens), the Embedded Signup [authorization screen](/documentation/business-messaging/whatsapp/embedded-signup/default-flow#authorization-screen) allows the user to grant your app permissions for which you have advanced access approval:

## Checking for granted permissions

Use the **debug_token** endpoint to see which permissions the token granter has granted to your app. Alternatively, you can use the [access token debugger](/tools/debug/accesstoken/) tool, which returns the same information.

### Request syntax
    
    
    curl 'https://graph.facebook.com//debug_token?input_token=' \  
    -H 'Authorization: Bearer '  
      
    

### Response syntax

Granted permissions are assigned to the `scopes` property.
    
    
    {  
        "data": {  
            "app_id": "634974688087057",  
            "type": "SYSTEM_USER",  
            "application": "Lucky Shrub",  
            "data_access_expires_at": 0,  
            "expires_at": 0,  
            "is_valid": true,  
            "issued_at": 1712099387,  
            "scopes": [  
                "whatsapp_business_management",  
                "whatsapp_business_messaging"  
            ],  
            "granular_scopes": [  
                {  
                    "scope": "whatsapp_business_management"  
                },  
                {  
                    "scope": "whatsapp_business_messaging"  
                }  
            ],  
            "user_id": "104169029247128"  
        }  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

App Review

How to get permissions

Checking for granted permissions

Request syntax

Response syntax

* * *