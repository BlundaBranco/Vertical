# user_preferences webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/user_preferences

---

# user_preferences webhook reference

Updated: Nov 5, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **user_preferences** webhook.

The **user_preferences** webhook notifies you of changes to a WhatsApp user’s [marketing message preferences](/documentation/business-messaging/whatsapp/templates/marketing-templates#user-preferences-for-marketing-messages).

## Triggers

  * A WhatsApp user stops marketing messages.
  * A WhatsApp user resumes marketing messages.

## Syntax
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "",  
                  "phone_number_id": ""  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": ""  
                    },  
                    "wa_id": ""  
                  }  
                ],  
                "user_preferences": [  
                  {  
                    "wa_id": "",  
                    "detail": "",  
                    "category": "marketing_messages",  
                    "value": "",  
                    "timestamp":   
                  }  
                ]  
              },  
              "field": "user_preferences"  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Business display phone number.| `15550783881`  
``_String_|  Business phone number ID.| `106540352242922`  
``_String_| [Marketing message preference](/documentation/business-messaging/whatsapp/templates/marketing-templates#user-preferences-for-marketing-messages).Values can be:`stop` — Indicates the WhatsApp user has opted to stop receiving marketing messages from you.`resume` — Indicates the WhatsApp user has opted to resume receiving marketing messages from you.| `stop`  
``_String_|  Description of [marketing message preference](/documentation/business-messaging/whatsapp/templates/marketing-templates#user-preferences-for-marketing-messages).Values can be:

  * `User requested to stop marketing messages`
  * `User requested to resume marketing messages`

| `User requested to stop marketing messages`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
## Example
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "102290129340398",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "15550783881",  
                  "phone_number_id": "106540352242922"  
                },  
                "contacts": [  
                  {  
                    "wa_id": "16505551234"  
                  }  
                ],  
                "user_preferences": [  
                  {  
                    "wa_id": "16505551234",  
                    "detail": "User requested to resume marketing messages",  
                    "category": "marketing_messages",  
                    "value": "resume",  
                    "timestamp": 1731705721  
                  }  
                ]  
              },  
              "field": "user_preferences"  
            }  
          ]  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Example

* * *