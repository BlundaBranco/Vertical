# Revoke messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/revoke

---

# Revoke messages webhook reference

Updated: Dec 3, 2025

The revoke webhook is only available to WhatsApp Business app users (aka “Coexistence”)

This reference describes revoke events and payload contents for the WhatsApp Business Account messages webhook for replies to messages.

## Triggers

  * A WhatsApp user revokes (deletes) a previously sent message.
  * A WhatsApp user revokes a previous sent message within two days after being sent.

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
               "messages": [  
                 {  
                   "from": "",  
                   "id": "",  
                   "timestamp": "",  
                   "type": "revoke",  
                   "revoke": {  
                     "original_message_id": ""  
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
``| Business display phone number.| 15550783881  
``| Business phone number ID.| 106540352242922  
``| WhatsApp user’s profile name.| Sheena Nelson  
``| WhatsApp user ID.| 16505551234  
``| WhatsApp user phone number.| 16505551234  
``| WhatsApp message ID for the revoke event.| wamid.HBgLMTY1MDM4Nzk0MzkV...  
``| Unix timestamp when the webhook was triggered.| 1739321024  
``| ID of the original message being revoked (deleted).| wamid.HBgLMTQxMjU1NTA4MjkV...  
  
## Example

This example webhook describes a delete made by a user in a message.
    
    
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
                   "profile": {  
                     "name": "Sheena Nelson"  
                   },  
                   "wa_id": "16505551234"  
                 }  
               ],  
               "messages": [  
                 {  
                   "from": "16505551234",  
                   "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                   "timestamp": "1749854575",  
                   "type": "revoke",  
                   "revoke": {  
                     "original_message_id": "wamid.HBgLMTQxMjU1NTA4MjkVAgASGBQzQUNCNjk5RDUwNUZGMUZEM0VBRAA="  
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
      
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Example

* * *