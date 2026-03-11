# Interactive messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/interactive

---

# Interactive messages webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for replies to interactive messages.

## Triggers

  * A WhatsApp user taps a row in an [interactive list message](/documentation/business-messaging/whatsapp/messages/interactive-list-messages).
  * A WhatsApp user taps a button in an [interactive reply button message](/documentation/business-messaging/whatsapp/messages/interactive-reply-buttons-messages).

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
                    "wa_id": "",  
                    "identity_key_hash": ""   
                  }  
                ],  
                "messages": [  
                  {  
                    "context": {  
                      "from": "",  
                      "id": ""  
                    },  
                    "from": "",  
                    "id": "",  
                    "timestamp": "",  
                    "type": "interactive",  
      
                      
                    "interactive": {  
                      "type": "list_reply",  
                      "list_reply": {  
                        "id": "",  
                        "title": "",  
                        "description": ""  
                      }  
                    },  
      
                      
                    "interactive": {  
                      "type": "button_reply",  
                      "button_reply": {  
                        "id": "",  
                        "title": ""  
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
``_String_|  Business display phone number.| `15550783881`  
``_String_|  Business phone number ID.| `106540352242922`  
``_String_|  Button ID.| `cancel-button`  
``_String_|  Button label text.| `Cancel`  
``_String_|  WhatsApp message ID of the message containing the button the WhatsApp user tapped.| `wamid.HBgLMTQxMjU1NTA4MjkVAgASGBQzQUNCNjk5RDUwNUZGMUZEM0VBRAA=`  
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_String_|  Row description.| `Next Day to 2 Days`  
``_String_|  Row ID.| `priority_express`  
``_String_|  Row title.| `Priority Mail Express`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
## Examples

This example webhook describes a selection made by a user in a list of rows in an interactive list message.
    
    
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
                    "context": {  
                      "from": "15550783881",  
                      "id": "wamid.HBgLMTQxMjU1NTA4MjkVAgASGBQzQUNCNjk5RDUwNUZGMUZEM0VBRAA="  
                    },  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                    "timestamp": "1749854575",  
                    "type": "interactive",  
                    "interactive": {  
                      "type": "list_reply",  
                      "list_reply": {  
                        "id": "priority_express",  
                        "title": "Priority Mail Express",  
                        "description": "Next Day to 2 Days"  
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
      
    

This example webhook describes a button tapped by a WhatsApp user in an interactive reply button message.
    
    
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
                    "context": {  
                      "from": "15550783881",  
                      "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBI3MEM2RUJFNkI0RENGQTVDRjUA"  
                    },  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTZBQzg0MzQ4QjRCM0NGNkVGOAA=",  
                    "timestamp": "1750025136",  
                    "type": "interactive",  
                    "interactive": {  
                      "type": "button_reply",  
                      "button_reply": {  
                        "id": "cancel-button",  
                        "title": "Cancel"  
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

Examples

* * *