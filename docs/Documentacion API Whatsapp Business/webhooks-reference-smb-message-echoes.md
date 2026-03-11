# smb_message_echoes webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/smb_message_echoes

---

# smb_message_echoes webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **smb_message_echoes** webhook.

The **smb_message_echoes** webhook notifies you of messages sent via the WhatsApp Business app or a [companion (“linked”) device](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users#linked-devices) by a business customer who has been [onboarded to Cloud API](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) via a solution provider.

## Triggers

  * A business customer with a WhatsApp Business app phone number, who has been [onboarded by a solution provider](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users), sends a message using the WhatsApp Business app or a [companion device](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users#linked-devices) to a WhatsApp user or another business.

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
                "message_echoes": [  
                  {  
                    "from": "",  
                    "to": "",  
                    "id": "",  
                    "timestamp": "",  
                    "type": "",  
                    "": {  
                        
                    }  
                  }  
                ]  
              },  
              "field": "smb_message_echoes"  
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
``_Object_|  An object describing the message’s contents.This value will vary based on the message `type`, as well as the contents of the message.For example, if a business sends an `image` message without a caption, the object would not include the `caption` property.See [Sending messages](/documentation/business-messaging/whatsapp/messages/send-messages) for examples of payloads for each message type.| `{"body":"Here's the info you requested! https://www.meta.com/quest/quest-3/"}`  
``_String_| [Message type](/documentation/business-messaging/whatsapp/webhooks/reference/messages). Note that this placeholder appears twice in the syntax above, as it serves as a placeholder for the `type` property’s value and its matching property name.| `text`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  The business customer’s WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `+16505551234`  
  
## Example

This example payload describes a text message (`type` is `text`) sent to a WhatsApp user by a business customer using the WhatsApp Business app.
    
    
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
                "message_echoes": [  
                  {  
                    "from": "15550783881",  
                    "to": "16505551234",  
                    "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBIyNDlBOEI5QUQ4NDc0N0FCNjMA",  
                    "timestamp": "1739321024",  
                    "type": "text",  
                    "text": {  
                      "body": "Here's the info you requested! https://www.meta.com/quest/quest-3/"  
                    }  
                  }  
                ]  
              },  
              "field": "smb_message_echoes"  
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