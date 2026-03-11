# partner_solutions webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/partner_solutions

---

# partner_solutions webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **partner_solutions** webhook.

The **partner_solutions webhook** describes changes to the status of a [Multi-Partner Solution](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions).

## Triggers

  * A multi-partner solution is saved as a draft.
  * A multi-partner solution request is sent to a partner.
  * A multi-partner solution partner accepts a solution request.
  * A multi-partner solution partner rejects a solution request.
  * A multi-partner solution partner requests deactivation of a solution.
  * A multi-partner solution is deactivated.

## Syntax
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "partner_solutions",  
              "value": {  
                "event": "",  
                "solution_id": "",  
                "solution_status": ""  
              }  
            }  
          ],  
          "id": "",  
          "time":   
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Business portfolio ID.| `506914307656634`  
``_String_|  Change event. Values can be:`SOLUTION_CREATED` \- Indicates a new solution was saved as a draft or sent as a request to a partner.`SOLUTION_UPDATED` \- Indicates an existing solution has been updated.| `SOLUTION_CREATED`  
``_String_|  Solution ID.| `774485461512159`  
``_String_|  Solution status. Values can be:`ACTIVE` \- The solution partner accepted the solution request and the solution can now be used.`DEACTIVATED` \- The solution has been deactivated.`DRAFT` \- The solution has been drafted but an invitation request has not been sent to a partner.`INITIATED` \- The solution has been created and the invitation request sent, but it has not been accepted or rejected yet.`PENDING_DEACTIVATION` \- The solution owner requested deactivation of the solution but the solution partner has yet to accept or decline the deactivation request.`REJECTED` \- The solution partner has rejected the solution request.| `INITIATED`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
  
## Example
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "partner_solutions",  
              "value": {  
                "event": "SOLUTION_CREATED",  
                "solution_id": "774485461512159",  
                "solution_status": "INITIATED"  
              }  
            }  
          ],  
          "id": "506914307656634",  
          "time": 1739321024  
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