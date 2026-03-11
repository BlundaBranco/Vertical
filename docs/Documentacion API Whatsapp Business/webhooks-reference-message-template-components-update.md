# message_template_components_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/message_template_components_update

---

# message_template_components_update webhook reference

Updated: Nov 14, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account `message_template_components_update` webhook.

The **message_template_components_update** webhook notifies you of changes to a template’s components.

## Triggers

  * A template is edited.

## Syntax
    
    
    {
      "entry": [
        {
          "id": "",
          "time": ,
          "changes": [
            {
              "value": {
                "message_template_id": ,
                "message_template_name": "",
                "message_template_language": "",
                "message_template_element": ",
    
                
                "message_template_title": "",
    
                
                "message_template_footer": "",
    
                
                "message_template_buttons": [
                  {
                    "message_template_button_type": "",
                    "message_template_button_text": "",
    
                    
                    "message_template_button_url": "",
    
                    
                    "message_template_button_phone_number": ""
                  }
                ]
              },
              "field": "message_template_components_update"
            }
          ]
        }
      ],
      "object": "whatsapp_business_account"
    }
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Button label text.| `Email support`  
``_String_|  Button phone number.| `+15550783881`  
``_String_| [Button type](/documentation/business-messaging/whatsapp/templates/components#buttons).Values can include:

  * `CATALOG`
  * `COPY_CODE`
  * `EXTENSION`
  * `FLOW`, `MPM`
  * `ORDER_DETAILS`
  * `OTP`
  * `PHONE_NUMBER`
  * `POSTBACK`
  * `REMINDER`
  * `SEND_LOCATION`
  * `SPM`
  * `QUICK_REPLY`
  * `URL`
  * `VOICE_CALL`

| `URL`  
``_String_|  Button URL.| `https://www.luckyshrub.com/support`  
``_String_|  Template body text.| `Thank you for your order, {{1}}! Your order number is {{2}}. If you have any questions, contact support using the buttons below. Thanks again!`  
``_String_|  Template footer text.| `Lucky Shrub: the Succulent Specialists!`  
``_String_|  Template header text.| `Your order is confirmed!`  
``_Integer_|  Template ID.| `1315502779341834`  
``_String_|  Template [language and locale](/documentation/business-messaging/whatsapp/templates/supported-languages) code.| `en_US`  
``_String_|  Template name.| `order_confirmation`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Example
    
    
    {
      "entry": [
        {
          "id": "102290129340398",
          "time": 1751250234,
          "changes": [
            {
              "value": {
                "message_template_id": 1315502779341834,
                "message_template_name": "order_confirmation",
                "message_template_language": "en_US",
                "message_template_title": "Your order is confirmed!",
                "message_template_element": "Thank you for your order, {{1}}! Your order number is {{2}}. If you have any questions, contact support using the buttons below. Thanks again!",
                "message_template_footer": "Lucky Shrub: the Succulent Specialists!",
                "message_template_buttons": [
                  {
                    "message_template_button_type": "PHONE_NUMBER",
                    "message_template_button_text": "Phone support",
                    "message_template_button_phone_number": "+15550783881"
                  },
                  {
                    "message_template_button_type": "URL",
                    "message_template_button_text": "Email support",
                    "message_template_button_url": "https://www.luckyshrub.com/support"
                  }
                ]
              },
              "field": "message_template_components_update"
            }
          ]
        }
      ],
      "object": "whatsapp_business_account"
    }
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Example

* * *