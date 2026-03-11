# message_template_quality_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/message_template_quality_update

---

# message_template_quality_update webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account `message_template_quality_update` webhook.

The **message_template_quality_update** webhook notifies you of changes to a template’s [quality score](/documentation/business-messaging/whatsapp/templates/template-quality).

## Triggers

  * A template’s quality score changes.

## Syntax
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "value": {  
                "previous_quality_score": "",  
                "new_quality_score": "",  
                "message_template_id": ,  
                "message_template_name": "",  
                "message_template_language": ""  
              },  
              "field": "message_template_status_update"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  New template [quality score](/documentation/business-messaging/whatsapp/templates/template-quality).Values can be:`GREEN` — Indicates high quality.`RED` — Indicates low quality.`YELLOW` — Indicates medium quality.`UNKNOWN` — Indicates quality pending.| `GREEN`  
``_String_|  Previous template [quality score](/documentation/business-messaging/whatsapp/templates/template-quality).Values can be:`GREEN` — Indicates high quality.`RED` — Indicates low quality.`YELLOW` — Indicates medium quality.`UNKNOWN` — Indicates quality pending.| `YELLOW`  
``_Integer_|  Template ID.| `806312974732579`  
``_String_|  Template name.| `welcome_template`  
``_String_|  Template [language and locale](/documentation/business-messaging/whatsapp/templates/supported-languages) code.| `en-US`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Example
    
    
    {  
      "entry": [  
        {  
          "id": "102290129340398",  
          "time": 1674864290,  
          "changes": [  
            {  
              "value": {  
                "previous_quality_score": "GREEN",  
                "new_quality_score": "YELLOW",  
                "message_template_id": 806312974732579,  
                "message_template_name": "welcome_template",  
                "message_template_language": "en-US"  
              },  
              "field": "message_template_status_update"  
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