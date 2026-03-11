# phone_number_name_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_name_update

---

# phone_number_name_update webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **phone_number_name_update** webhook.

The **phone_number_name_update** webhook notifies you of business phone number [display name verification](/documentation/business-messaging/whatsapp/display-names#display-name-verificationn) outcomes.

## Triggers

  * A newly created business phone number’s display name is reviewed.
  * A business phone number’s already approved display name is edited and reviewed.

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
                "decision": "",  
                "requested_verified_name": "",  
                "rejection_reason": ""  
              },  
              "field": "phone_number_name_update"  
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
``_String_|  Indicates the outcome of the business phone number [display name verification](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#display-name-verification) process.`APPROVED` — Indicates the display name has been approved and will now appear at the top of the business phone number’s profile in the WhatsApp client.`DEFERRED` — Indicates a decision has been deferred.`PENDING` — Indicates a decision is still pending further review.`REJECTED` — Indicates the display name has been rejected. You can edit the name using [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/overview/). Review our [display name guidelines⁠](https://www.facebook.com/business/help/757569725593362) before editing.| `APPROVED`  
``_String_|  The reason why the business phone number display name was rejected, if it was rejected. Review our display name guidelines for common rejection reasons.Values can be:`NAME_EMPLOYEE_ISSUE` — Rejected because the display name included a person’s name or employee identifier.`NAME_ENDCLIENT_NOTRELATED` — Rejected because the display name included an unrelated business’s name.`NAME_FORMAT_UNACCEPTABLE` — Rejected because the display name used an unacceptable format.`NAME_INDIVIDUAL_ISSUE` — Rejected because the display name included a person’s name or employee identifier. `NAME_NOT_CONSISTENT` — Rejected because the display name was not consistent with the business’s branding.`null` — Indicates name was accepted.`UNKNOWN` — Rejected for an unknown reason. Please contact support.| `APPROVED`  
``_String_|  The business phone number display name collected when the number was created, or name submitted when editing an already approved display name.| `Lucky Shrub`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Example
    
    
    {  
      "entry": [  
        {  
          "id": "102290129340398",  
          "time": 1739321024,  
          "changes": [  
            {  
              "value": {  
                "display_phone_number": "15550783881",  
                "decision": "APPROVED",  
                "requested_verified_name": "Lucky Shrub",  
                "rejection_reason": null  
              },  
              "field": "phone_number_name_update"  
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