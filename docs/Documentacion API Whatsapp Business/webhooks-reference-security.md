# security webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/security

---

# security webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **security** webhook.

The **security** webhook notifies you of changes to a business phone number’s security settings.

## Triggers

  * A Meta Business Suite user clicks the **Turn off two-step verification** button in [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/).
  * A Meta Business Suite user completes the instructions in the **WhatsApp Two-Step Verification Reset** email to turn off two-step verification.
  * A Meta Business Suite user changes or enables the business phone number PIN using [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/).

## Syntax
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "value": {  
                "display_phone_number": "",  
                "event": "",  
                "requester": ""  
              },  
              "field": "security"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Business display phone number.| `15550783881`  
``String| The security event that triggered the webhook.Values can be:`PIN_CHANGED` — indicates a Meta Business Suite user changed or enabled the business phone number’s PIN using [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/).`PIN_RESET_REQUEST` — Indicates a Meta Business Suite user clicked the Turn off two-step verification button in [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/).`PIN_REQUEST_SUCCESS` — a Meta Business Suite user completed the instructions in the WhatsApp Two-Step Verification Reset email to turn off two-step verification.| `PIN_RESET_REQUEST`  
``String| The Meta Business Suite user ID of the user who requested to turn off two-step verification using [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/).This parameter is only included for PIN reset requests.| `61555822107539`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Example
    
    
    {  
      "entry": [  
        {  
          "id": "102290129340398",  
          "time": 1748811473,  
          "changes": [  
            {  
              "value": {  
                "display_phone_number": "15550783881",  
                "event": "PIN_RESET_REQUEST",  
                "requester": "61555822107539"  
              },  
              "field": "security"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Example

* * *