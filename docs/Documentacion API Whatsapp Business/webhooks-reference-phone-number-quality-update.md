# phone_number_quality_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_quality_update

---

# phone_number_quality_update webhook reference

Updated: Nov 14, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **phone_number_quality_update** webhook.

The **phone_number_quality_update** webhook notifies you of changes to a business phone number’s [throughput level](/documentation/business-messaging/whatsapp/throughput).

## Triggers

  * A business phone number’s throughput level changes.

## Syntax
    
    
    {  
        "entry": [  
          {  
            "id": "",  
            "time": ,  
            "changes": [  
              {  
                "value": {  
                  "display_phone_number": "",  
                  "event": "",  
                  "old_limit": "",   
                  "current_limit": "",  
                  "max_daily_conversations_per_business": ""  
                },  
                "field": "phone_number_quality_update"  
              }  
            ]  
          }  
        ],  
        "object": "whatsapp_business_account"  
      }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Business display phone number.| `15550783881`  
``_String_| **This field will be removed in February, 2026. Use`max_daily_conversations_per_business` instead.**Indicates current [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits) or [throughput](/documentation/business-messaging/whatsapp/throughput) level.Values can be:`TIER_50` — Indicates a messaging limit of 50.`TIER_250` — Indicates a messaging limit of 250.`TIER_2K` — Indicates a messaging limit of 2,000.`TIER_10K` — Indicates a messaging limit of 10,000.`TIER_100K` — Indicates a messaging limit of 100,000.`TIER_NOT_SET` — Indicates the business phone number has not been used to send a message yet.`TIER_UNLIMITED` — Indicates the business phone number has higher throughput.| `TIER_UNLIMITED`  
``_String_| [Messaging limit](/documentation/business-messaging/whatsapp/messaging-limits) change or [throughput](/documentation/business-messaging/whatsapp/throughput) change event.Values can be:`ONBOARDING` — Indicates the business phone number is still being registered.`THROUGHPUT_UPGRADE` — Indicates the business phone number’s throughput level has increased to higher throughput.| `THROUGHPUT_UPGRADE`  
``_String_|  Indicates a change to the owning business portfolio’s [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits) or [throughput](/documentation/business-messaging/whatsapp/throughput) change.Values can be:`TIER_50` — Indicates a messaging limit of 50.`TIER_250` — Indicates a messaging limit of 250.`TIER_2K` — Indicates a messaging limit of 2,000.`TIER_10K` — Indicates a messaging limit of 10,000.`TIER_100K` — Indicates a messaging limit of 100,000.`TIER_NOT_SET` — Indicates the business phone number has not been used to send a message yet.`TIER_UNLIMITED` — Indicates the business phone number has higher throughput.| `TIER_2K`  
``_String_| **This parameter will be removed in February, 2026. Use`max_daily_conversations_per_business` instead.**Indicates old [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits).Values can be:`TIER_50` — Indicates a messaging limit of 50.`TIER_250` — Indicates a messaging limit of 250.`TIER_2K` — Indicates a messaging limit of 2,000.`TIER_10K` — Indicates a messaging limit of 10,000.`TIER_100K` — Indicates a messaging limit of 100,000.`TIER_NOT_SET` — Indicates the business phone number has not been used to send a message yet.| `TIER_UNLIMITED`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Example
    
    
    {  
      "entry": [  
        {  
          "id": "102290129340398",  
          "time": 1748454394,  
          "changes": [  
            {  
              "value": {  
                "display_phone_number": "15550783881",  
                "event": "THROUGHPUT_UPGRADE",  
                "current_limit": "TIER_UNLIMITED"  
              },  
              "field": "phone_number_quality_update"  
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

Example

* * *