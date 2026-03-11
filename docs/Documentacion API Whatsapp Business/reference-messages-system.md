# System messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/system

---

# System messages webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for system messages.

Note that unlike other incoming messages webhooks, system **messages** webhooks don’t include a `contacts` array.

## Triggers

  * A WhatsApp user changes their WhatsApp phone number.

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
                "messages": [  
                  {  
                    "from": "",  
                    "id": "",  
                    "timestamp": "",  
                    "type": "system",  
                    "system": {  
                      "body": "User  changed from  to ",  
                      "wa_id": "",  
                      "type": "user_changed_number"  
                    }  
                  }  
                ]  
              },  
              "field": "messages"  
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
``_String_|  New WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `12195555358`  
``_String_|  New WhatsApp user phone number. Note that a WhatsApp user’s phone number and ID may not always match.| `12195555358`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
`` _String_|  WhatsApp user phone number. Note that a WhatsApp user’s phone number and ID may not always match.| `16505551234`  
`` _String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
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
                "messages": [  
                  {  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTk4MzU1NTE5NzQVAgASGAoxMTgyMDg2MjY3AA==",  
                    "timestamp": "1750269342",  
                    "system": {  
                      "body": "User Sheena Nelson changed from 16505551234 to 12195555358",  
                      "wa_id": "12195555358",  
                      "type": "user_changed_number"  
                    },  
                    "type": "system"  
                  }  
                ]  
              },  
              "field": "messages"  
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