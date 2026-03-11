# Status messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/status

---

# Status messages webhook reference

Updated: Nov 20, 2025

This reference describes trigger events and payload contents for WhatsApp Business Account status **messages** webhook.

## Triggers

  * Your message is sent to a WhatsApp user.
  * Your message is delivered to a WhatsApp user’s device.
  * Your message is displayed (i.e. “read”) in the WhatsApp client on a WhatsApp user’s device.
  * Your message is unable to be sent to a WhatsApp user.
  * Your message is unable to be delivered to a WhatsApp user’s device.
  * Your message is sent to a WhatsApp user in a group chat.
  * Your voice message is played by the WhatsApp user’s device.

Note that the triggers above also apply to a WhatsApp user who is part of a group chat.

A status is considered read only if it has been delivered. In some cases, like when a user receives a message while in the chat screen, the message is both delivered and read at the same time. In these cases, the “delivered” webhook is not sent because it’s implied that the message was delivered since it was read. This behavior is due to internal optimization.

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
                "statuses": [  
                  {  
                    "id": "",  
                    "status": "",  
                    "timestamp": "",  
                    "recipient_id": "",  
                    "recipient_type": "group",   
                    "recipient_participant_id": "",   
                    "recipient_identity_key_hash": "",   
                    "biz_opaque_callback_data": "",   
      
                      
                    "conversation": {  
                      "id": "",  
                      "expiration_timestamp": "",  
                      "origin": {  
                        "type": ""  
                      }  
                    },  
      
                      
                    "pricing": {  
                      "billable": ,  
                      "pricing_model": "",  
                      "type": "",  
                      "category": ""  
                    },  
      
                      
                    "errors": [  
                      {  
                        "code": ,  
                        "title": "",  
                        "message": "",  
                        "error_data": {  
                          "details": ""  
                        },  
                        "href": ""  
                      }  
                    ]  
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
``_String_|  String assigned by the business to the `biz_opaque_callback_data` property in the send message request.Only included if the business set a `biz_opaque_callback_data` value when [sending](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#messages) the message.| `1744434060`  
``_String_|  Business phone number ID.| `106540352242922`  
``_String_| [Conversation category](/documentation/business-messaging/whatsapp/pricing#conversation-categories). Values can be:`authentication` — Indicates an authentication conversation.`authentication_international` — Indicates an [authentication-international](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) conversation.`marketing` — Indicates a marketing conversation.`marketing_lite` — Indicates a [Marketing Messages API for WhatsApp](/documentation/business-messaging/whatsapp/marketing-messages/overview) conversation.`referral_conversion` — Indicates a free entry point conversation.`service` — Indicates a service conversation.`utility` — Indicates a utility conversation.| `service`  
``_String_|  Unix timestamp indicating when the conversation will expire.The expiration_timestamp property is only included for `sent` status.| `1744434060`  
``_String_|  Version 24.0 and higher:The `conversation` object will be omitted entirely, unless the webhook is for a message sent within an open free entry point window, in which case the value will be unique per window.Version 23.0 and lower:Value will now be set to a unique ID per-message, unless the webhook is for a message sent with an open free entry point window, in which case the value will be unique per window.| `8f842dbba350821654c9dfed31f5635c`  
``_Integer_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes).| `131050`  
``_String_|  Link to [error code documentation](/documentation/business-messaging/whatsapp/support/error-codes).| `/docs/whatsapp/cloud-api/support/error-codes/`  
``_String_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes) details.| `In order to maintain a healthy ecosystem engagement, the message failed to be delivered.`  
``_String_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes) message. This value is the same as the `title` property value.| `This message was not delivered to maintain healthy ecosystem engagement.`  
``_String_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes) title. This value is the same as the `message` property value.| `This message was not delivered to maintain healthy ecosystem engagement.`  
``_String_|  WhatsApp user phone number. Property only included if message was sent to a [group](/documentation/business-messaging/whatsapp/groups).| `16505551234`  
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_Boolean_|  Indicates if the message is billable (`true`) or not (`false`).Note that the `billable` property will be deprecated in a future versioned release, so we recommend that you start using `pricing.type` and `pricing.category` together to determine if a message is billable, and if so, its billing rate.| `true`  
``_String_|  Pricing category ([rate](/documentation/business-messaging/whatsapp/pricing#rates)) applied if billable. Values can be:`authentication` — Indicates authentication rate applied.`authentication-international` — Indicates authentication-international rate applied.`marketing` — Indicates marketing rate applied.`marketing_lite` — Indicates a [Marketing Messages Lite API](/docs/whatsapp/marketing-messages-lite-api) pricing applied.`referral_conversion` — Indicates a [free entry point conversation](/documentation/business-messaging/whatsapp/pricing#free-entry-point-conversations).`service` – Indicates service rate applied.`utility` — Indicates utility rate applied.| `service`  
``_String_|  Pricing model. Values can be:`CBP` — Indicates conversation-based pricing applies. Will only be set to this value if the webhook was sent before July 1, 2025.`PMP` — Indicates [per-message pricing](/documentation/business-messaging/whatsapp/pricing) applies.| `PMP`  
``_String_|  Pricing type.`regular` — Indicates the message is billable.`free_customer_service` — Indicates the message is free because it was either a utility template message or non-template message sent within a customer service window.`free_entry_point` — Indicates the message is free because it was sent within an open free entry point window.| `regular`  
``_String_|  Message status. Values can be:`delivered` — Indicates message was successfully delivered to the WhatsApp user’s device.

  * WhatsApp UI equivalent: Two checkmarks.

`failed` — Indicates failure to send or deliver the message to the WhatsApp user’s device.

  * WhatsApp UI equivalent: Red error triangle.

`played` — Indicates the first time a voice message is played by the WhatsApp user’s device.

  * WhatsApp UI equivalent: Blue microphone.

`read` — Indicates the message was displayed in an open chat thread in the WhatsApp user’s device.

  * WhatsApp UI equivalent: Two blue checkmarks.

`sent` — Indicates the message was successfully sent from our servers.

  * WhatsApp UI equivalent: One checkmark.

| `read`  
``_String_|  WhatsApp user phone number or group ID.Value set to the WhatsApp user’s phone number if the message was sent to their phone number, or set to a [group ID](/documentation/business-messaging/whatsapp/groups) if sent to a group ID. If sent to a group ID, the WhatsApp user’s phone number is instead assigned to the `recipient_participant_id` property.| `16505551234`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
  
## Examples

This example webhook describes a marketing message that has been successfully sent from our servers.
    
    
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
                "statuses": [  
                  {  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                    "status": "sent",  
                    "timestamp": "1750030073",  
                    "recipient_id": "16505551234",  
                    "conversation": {  
                      "id": "72b14d6bd5407799e66f64d1b338e567",  
                      "expiration_timestamp": "1750116480",  
                      "origin": {  
                        "type": "marketing"  
                      }  
                    },  
                    "pricing": {  
                      "billable": true,  
                      "pricing_model": "PMP",  
                      "type": "regular",  
                      "category": "marketing"  
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
      
    

This example v24.0 webhook describes a marketing message that has been displayed in the WhatsApp client (i.e. “read”). Notice that in this case, the `conversation` object is omitted because it’s a v24.0 webhook, and the `pricing` object is omitted because it happened to be displayed in an associated delivered status messages webhook (the object can only appear in one or the other).
    
    
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
                "statuses": [  
                  {  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                    "status": "sent",  
                    "timestamp": "1750030073",  
                    "recipient_id": "16505551234"  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

This example describes a message that failed to be sent.
    
    
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
                "statuses": [  
                  {  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBI0QUQ2MjA4NEYyRkExNjMyREUA",  
                    "status": "failed",  
                    "timestamp": "1751142888",  
                    "recipient_id": "16505551234",  
                    "errors": [  
                      {  
                        "code": 131049,  
                        "title": "This message was not delivered to maintain healthy ecosystem engagement.",  
                        "message": "This message was not delivered to maintain healthy ecosystem engagement.",  
                        "error_data": {  
                          "details": "In order to maintain a healthy ecosystem engagement, the message failed to be delivered."  
                        },  
                        "href": "/documentation/business-messaging/whatsapp/support/error-codes"  
                      }  
                    ]  
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