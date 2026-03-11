# template_category_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/template_category_update

---

# template_category_update webhook reference

Updated: Nov 11, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **template_category_update** webhook.

The **template_category_update** webhook notifies you of changes to template’s [category](/documentation/business-messaging/whatsapp/templates/template-categorization).

## Triggers

  * The existing category of a WhatsApp template is going to be changed by an [automated process](/documentation/business-messaging/whatsapp/templates/template-categorization#how-we-update-a-template-s-category-after-initial-approval).
  * The existing category of a WhatsApp template is changed manually or by an [automated process](/documentation/business-messaging/whatsapp/templates/template-categorization#how-we-update-a-template-s-category-after-initial-approval).

## Syntax
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "field": "template_category_update",  
              "value": {  
                "message_template_id": ,  
                "message_template_name": "",  
                "message_template_language": "",  
      
                  
                "correct_category": "",  
                "new_category": "",  
                "category_update_timestamp":   
      
                  
                "previous_category": "",  
                "new_category": ""  
      
              }  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  The category that the template will be [recategorized](/documentation/business-messaging/whatsapp/templates/template-categorization#how-we-update-a-template-s-category-after-initial-approval) as in 24 hours.| `MARKETING`  
``_String_|  The template’s current [category](/documentation/business-messaging/whatsapp/templates/overview#template-categories).| `MARKETING`  
``_String_|  The template’s new [category](/documentation/business-messaging/whatsapp/templates/overview#template-categories).| `MARKETING`  
``_Integer_|  The Unix timestamp (in seconds) indicating when the template’s category will be updated to the `` specified in the webhook. This value represents the moment the update is scheduled to occur.| `1760711433`  
``_String_|  The template’s previous [category](/documentation/business-messaging/whatsapp/templates/overview#template-categories).| `UTILITY`  
``_Integer_|  Template ID.| `278077987957091`  
``_String_|  Template [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en-US`  
``_String_|  Template name.| `welcome_template`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Examples

This example webhook describes a template that will be recategorized as `MARKETING` in 24 hours. Note that `new_category` indicates its _current_ category:
    
    
    {  
     "entry": [  
       {  
         "id": "102290129340398",  
         "time": 1746082800,  
         "changes": [  
           {  
             "field": "template_category_update",  
             "value": {  
               "message_template_id": 278077987957091,  
               "message_template_name": "welcome_template",  
               "message_template_language": "en-US",  
               "new_category": "UTILITY",  
               "correct_category": "MARKETING",  
               "category_update_timestamp": 1746169200  
             }  
           }  
         ]  
       }  
     ],  
     "object": "whatsapp_business_account"  
    }  
      
    

This example webhook describes a template that has been recategorized as `MARKETING`:
    
    
    {  
     "entry": [  
       {  
         "id": "102290129340398",  
         "time": 1746169200,  
         "changes": [  
           {  
             "field": "template_category_update",  
             "value": {  
               "message_template_id": 278077987957091,  
               "message_template_name": "welcome_template",  
               "message_template_language": "en-US",  
               "previous_category": "UTILITY",  
               "new_category": "MARKETING"  
             }  
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

Examples

* * *