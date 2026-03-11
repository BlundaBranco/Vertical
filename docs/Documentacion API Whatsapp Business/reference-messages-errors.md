# Errors messages webhooks reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/errors

---

# Errors messages webhooks reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for errors messages.

## Triggers

  * We are unable to process a request due to a system level problem.
  * We are unable to process a request due to an app or account level problem.

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
``_Integer_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes).| `130429`  
``_String_|  Link to [error code documentation](/documentation/business-messaging/whatsapp/support/error-codes).| `/docs/whatsapp/cloud-api/support/error-codes/`  
``_String_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes) details.| `Message failed to send because there were too many messages sent from this phone number in a short period of time`  
``_String_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes) message. This value is the same as the `title` property value.| `Rate limit hit`  
``_String_| [Error code](/documentation/business-messaging/whatsapp/support/error-codes) title. This value is the same as the `message` property value.| `Rate limit hit`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
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
                "errors": [  
                  {  
                    "code": 130429,  
                    "title": "Rate limit hit",  
                    "message": "Rate limit hit",  
                    "error_data": {  
                      "details": "Message failed to send because there were too many messages sent from this phone number in a short period of time"  
                    },  
                    "href": "/documentation/business-messaging/whatsapp/support/error-codes"  
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