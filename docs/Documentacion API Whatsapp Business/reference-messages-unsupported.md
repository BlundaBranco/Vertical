# Unsupported messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/unsupported

---

# Unsupported messages webhook reference

Updated: Feb 19, 2026

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for unsupported messages.

## Triggers

  * A WhatsApp user sends a message type not supported by Cloud API.
  * You use the API to send a message to a number already in use with the API. In this case, the webhook is sent to the owner of the recipient number.

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
                    "from": "",  
                    "id": "",  
                    "timestamp": "",  
                    "errors": [  
                      {  
                        "code": 131051,  
                        "title": "Message type unknown",  
                        "message": "Message type unknown",  
                        "error_data": {  
                          "details": "Message type is currently not supported."  
                        }  
                      }  
                    ],  
                    "type": "unsupported",  
                    "unsupported": {  
                    "type":   
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
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``| Contains the type of message that is unsupported.Values can be:`errors``gif``group_invite``hsm``image``interactive``keep_in_chat``link_preview``list``location``media_placeholder``order``pin``poll_creation``poll_update``product``reaction`| `poll_update`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `+16505551234`  
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
                    "timestamp": "1750090702",  
                    "errors": [  
                      {  
                        "code": 131051,  
                        "title": "Message type unknown",  
                        "message": "Message type unknown",  
                        "error_data": {  
                          "details": "Message type is currently not supported."  
                        }  
                      }  
                    ],  
                    "type": "unsupported",  
                    "unsupported": {  
                     "type": "edit"  
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