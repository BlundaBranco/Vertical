# Edit messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/edit

---

# Edit messages webhook reference

Updated: Dec 3, 2025

The edit webhook is only available to WhatsApp Business app users (aka “Coexistence”)

This reference describes edit events and payload contents for the WhatsApp Business Account **messages** webhook for replies to messages.

## Triggers

  * A WhatsApp user edits a previously sent message (text, media with caption).
  * A WhatsApp user edits a previous sent message within 15 minutes after being sent.

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
                   "type": "edit",  
                   "edit": {  
                     "original_message_id": "",  
                     "message": {  
                       "context": {  
                         "id": ""  
                       },  
                       "type": "image",  
                       "image": {  
                         "caption": "",  
                         "mime_type": "",  
                         "sha256": "",  
                         "id": "",  
                         "url": ""  
                       }  
                     }  
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
``| WhatsApp message ID for the edit event.| wamid.HBgLMTY1MDM4Nzk0MzkV...  
``| Unix timestamp when the webhook was triggered.| 1739321024  
``| ID of the original message being edited.| wamid.HBgLMTQxMjU1NTA4MjkV...  
``| Contextual message ID (if applicable).| M0  
``| Caption for the media asset.| Updated image caption  
``| MIME type of the media asset.| image/jpeg  
``| SHA256 hash of the media asset.| a1b2c3d4e5f6...  
``| Media asset ID.| 1234567890  
``| URL to the media asset.| https://media.example.com/...  
  
## Example

This example webhook describes an edit made by a user in a message.
    
    
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
                   "type": "edit",  
                   "edit": {  
                     "original_message_id": "wamid.HBgLMTQxMjU1NTA4MjkVAgASGBQzQUNCNjk5RDUwNUZGMUZEM0VBRAA=",  
                     "message": {  
                       "context": {  
                         "id": "M0"  
                       },  
                       "type": "image",  
                       "image": {  
                         "caption": "Updated image caption",  
                         "mime_type": "image/jpeg",  
                         "sha256": "a1b2c3d4e5f6...",  
                         "id": "1234567890",  
                         "url": "https://media.example.com/updated-image.jpg"  
                       }  
                     }  
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