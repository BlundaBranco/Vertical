# business_capability_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/business_capability_update

---

# business_capability_update webhook reference

Updated: Nov 14, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **business_capability_update** webhook.

The **business_capability_update** webhook notifies you of WhatsApp Business Account or business portfolio capability changes ([messaging limits](/documentation/business-messaging/whatsapp/messaging-limits#increasing-your-limit), [phone number limits](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#registered-number-cap), etc.).

## Triggers

  * A WhatsApp Business Account is created.
  * A WhatsApp Business Account or business portfolio business capability (e.g. [messaging limits](/documentation/business-messaging/whatsapp/messaging-limits#increasing-your-limit), [phone number limits](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#registered-number-limits)) is increased or decreased.

## Syntax
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "value": {  
                "max_daily_conversation_per_phone": ,  
                "max_daily_conversations_per_business": ,  
                "max_phone_numbers_per_business": ,  
                "max_phone_numbers_per_waba":   
              },  
              "field": "business_capability_update"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_Integer_| **This parameter will be removed in February, 2026. Use`max_daily_conversations_per_business` instead.**Business portfolio’s [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits). Values can be:

  * `250`
  * `2000`
  * `10000`
  * `100000`
  * `-1`

A value of `-1` indicates unlimited messaging.| `2000`  
``_Integer_|  Business portfolio’s [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits).Value can be:

  * `TIER_250`
  * `TIER_2K`
  * `TIER_10K`
  * `TIER_100K`
  * `TIER_UNLIMITED`

| `TIER_UNLIMITED`  
``_Integer_|  Maximum number of business phone numbers the business portfolio can have.This property is only included if `max_daily_conversation_per_phone` is set to `250`.| `2`  
``_Integer_|  Maximum number of business phone numbers allowed per WABA.This property is only included if `max_daily_conversation_per_phone` is **not** set to `250`.| `25`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Payload example
    
    
    {  
      "entry": [  
        {  
          "id": "524126980791429",  
          "time": 1739321024,  
          "changes": [  
            {  
              "value": {  
                "max_daily_conversations_per_business": 2000,  
                "max_phone_numbers_per_waba": 25  
              },  
              "field": "business_capability_update"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Payload example

* * *