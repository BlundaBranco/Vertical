# smb_app_state_sync webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/smb_app_state_sync

---

# smb_app_state_sync webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **smb_app_state_sync** webhook.

The **smb_app_state_sync** webhook is used for synchronizing contacts of [WhatsApp Business app users who have been onboarded](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) via a solution provider.

## Triggers

  * A solution provider [synchronizes the WhatsApp Business app contacts](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users#step-1--initiate-contacts-synchronization) of a business customer with a WhatsApp Business app phone number who the provider has [onboarded](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users).
  * A business customer with a WhatsApp Business app phone number who has been [onboarded](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) by a solution provider adds a contact to their WhatsApp Business app [contacts⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F1270784217226727%2F&h=AT4Q4MFcSw5U9zynTulrsAk4_3JQafBv76a3ba66bEDWZfuqqgGQYlCkGBj0svhDgthzTK3oiFmAOib4Z-MxSIaieOQLwomir7o7a3YiqaCknXZy1VZIEivuLHEB7NVKNGtUb_opae-bl7X2gRPpxg).
  * A business customer with a WhatsApp Business app phone number who has been [onboarded](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) by a solution provider removes a contact from their WhatsApp Business app [contacts⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F1270784217226727%2F&h=AT4Q4MFcSw5U9zynTulrsAk4_3JQafBv76a3ba66bEDWZfuqqgGQYlCkGBj0svhDgthzTK3oiFmAOib4Z-MxSIaieOQLwomir7o7a3YiqaCknXZy1VZIEivuLHEB7NVKNGtUb_opae-bl7X2gRPpxg).
  * A business customer with a WhatsApp Business app phone number who has been [onboarded](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) by a solution provider edits a contact in their WhatsApp Business app [contacts⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F1270784217226727%2F&h=AT4Q4MFcSw5U9zynTulrsAk4_3JQafBv76a3ba66bEDWZfuqqgGQYlCkGBj0svhDgthzTK3oiFmAOib4Z-MxSIaieOQLwomir7o7a3YiqaCknXZy1VZIEivuLHEB7NVKNGtUb_opae-bl7X2gRPpxg).

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
                "state_sync": [  
                  {  
                    "type": "contact",  
                    "contact": {  
                      "full_name": "",  
                      "first_name": "",  
                      "phone_number": ""  
                    },  
                    "action": "",  
                    "metadata": {  
                      "timestamp": ""  
                    }  
                  },  
                    
                ]  
              },  
              "field": "smb_app_state_sync"  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Indicates if the business customer added, edited, or deleted a contact from their WhatsApp Business app phone address book.Values can be:`add` — Indicates the WhatsApp Business app user added or edited a contact.`remove` — Indicates the WhatsApp Business app user removed a contact.| `add`  
``_String_|  Business display phone number.| `15550783881`  
``_String_|  Business phone number ID.| `106540352242922`  
``_String_|  The contact’s first name, as it appears in the business customer’s WhatsApp Business app phone address book.Not included when the business customer removes a contact from their WhatsApp Business app phone address book.| `Pablo`  
``_String_|  The contact’s full name, as it appears in the business customer’s WhatsApp Business app phone address book.Not included when the business customer removes a contact from their WhatsApp Business app phone address book.| `Pablo Morales`  
``_String_|  The contact’s WhatsApp phone number.| `16505551234`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
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
                "state_sync": [  
                  {  
                    "type": "contact",  
                    "contact": {  
                      "full_name": "Pablo Morales",  
                      "first_name": "Pablo",  
                      "phone_number": "16505551234"  
                    },  
                    "action": "add",  
                    "metadata": {  
                      "timestamp": "1739321024"  
                    }  
                  }  
                ]  
              },  
              "field": "smb_app_state_sync"  
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