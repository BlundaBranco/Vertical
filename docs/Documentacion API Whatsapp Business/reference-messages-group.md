# Group messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/group

---

# Group messages webhook reference

Updated: Nov 10, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for messages that are sent to a group, or received from a group.

## Triggers

  * A WhatsApp user or a business sends a message to a group.
  * A WhatsApp user or a business receives a message within a group.

## Syntax
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "",
          "changes": [
            {
              "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                  "display_phone_number": "",
                  "phone_number_id": ""
                },
                "contacts": [
                  {
                    "profile": {
                      "name": ""
                    },
                    "wa_id": "",
                    "identity_key_hash": "" 
                  }
                ],
                "messages": [
                  {
                    "from": "",
                    "group_id": "",
                    "id": "",
                    "timestamp": "",
                    "text": {
                      "body": ""
                    },
                    "type": ""
                  }
                ],
              },
              "field": "messages"
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
``_String_|  The string identifier of a group made using the Groups API.This field shows when messages are sent, received, or read from a group.[Learn more about the Groups API](/documentation/business-messaging/whatsapp/groups)| `"Y2FwaV9ncm91cDoxNzA1NTU1MDEzOToxMjAzNjM0MDQ2OTQyMzM4MjAZD"`  
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_String_|  Text body of the message.| `What do you all think about this?`  
``_String_|  The type of message being sent. Will change depending on the message sent to the group.Currently, the Groups API supports:

  * Text
  * Media
  * Text-based templates
  * Media-based templates

| `text`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `+16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
  
## Example
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "102290129340398",
          "changes": [
            {
              "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                  "display_phone_number": "15550783881",
                  "phone_number_id": "106540352242922"
                },
                "contacts": [
                  {
                    "profile": {
                      "name": "Tiago Mingo"
                    },
                    "wa_id": "16505551234"
                  }
                ],
                "messages": [
                  {
                    "from": "16505551234",
                    "group_id": "HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTRBNjU5OUFFRTAzODEwMTQ0RgA",
                    "id": "wamid.HASDI128HJOPUERIH82ahdasd09ASDHi5>",
                    "timestamp": "1744344496",
                    "text": {
                      "body": "What does everyone think about this?"
                    },
                    "type": "text"
                  }
                ]
              },
              "field": "messages"
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