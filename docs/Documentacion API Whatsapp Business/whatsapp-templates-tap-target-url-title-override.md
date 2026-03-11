# Tap target title URL override

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/tap-target-url-title-override

---

# Tap target title URL override

Updated: Nov 13, 2025

This document explains how to send approved message templates using the `tap_target_configuration` component within a template message. Tap target override enables image-based, text-based, and header-less message templates to function as interactive Call-to-Action URL buttons. These buttons display a custom title and open the destination linked to the first URL button.

WhatsApp Business Accounts (WABAs) must be fully verified and consistently maintain high-quality standards to ensure compliance and access to this component.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a text message template to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "template",  
      "template": {  
        "name": "",  
        "language": {  
          "code": ""  
        },  
        "components": [  
          {  
            "type": "tap_target_configuration",  
            "parameters": [  
              {  
                "type": "tap_target_configuration",  
                "tap_target_configuration": [  
                  {  
                    "url": "",  
                    "title": ""  
                  }  
                ]  
              }  
            ]  
          },  
                
        ]  
      }  
    }  
      
    

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** Template [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en`  
``_String_| **Required.** Name of template.| `august_promotion`  
``_String_| **Required.** URL Title.| `Offer Details! `  
``_String_| **Required.** URL.| `https://www.luckyshrubs.com`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Example request

Example request to send a template message with the `tap_target_configuration` type.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+1233214532",
      "type": "template",
      "template": {
        "name": "august_promotion",
        "language": {
          "code": "en"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "link": "https://www.luckyshrubs.com"
                }
              }
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": "Hello Andy..."
              }
            ]
          },
          {
            "type": "tap_target_configuration",
            "parameters": [
              {
                "type": "tap_target_configuration",
                "tap_target_configuration": [
                  {
                    "url": "https://www.luckyshrubs.com/",
                    "title": "Offer Details"
                  }
                ]
              }
            ]
          }
        ]
      }
    }'

## Example response
    
    
    {  
       "messaging_product": "whatsapp",  
       "contacts": [  
           {  
               "input": "+1233214532",  
               "wa_id": "1233214532"  
           }  
       ],  
       "messages": [  
           {  
               "id": "wamid.HBgLMTMyMzI4NjU2NzgVAgARGBJBQzRBRDBEMDEwQzVBM0M0QkIA",  
               "message_status": "accepted"  
           }  
       ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Request syntax

Request parameters

Example request

Example response

* * *