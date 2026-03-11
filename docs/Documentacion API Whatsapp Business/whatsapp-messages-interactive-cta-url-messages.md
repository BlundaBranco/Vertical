# Interactive Call-to-Action URL Button Messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-cta-url-messages

---

# Interactive Call-to-Action URL Button Messages

Updated: Nov 3, 2025

WhatsApp users may be hesitant to tap raw URLs containing lengthy or obscure strings in text messages. In these situations, you may wish to send an interactive call-to-action (CTA) URL button message instead. CTA URL button messages allow you to map any URL to a button so you don’t have to include the raw URL in the message body.

## Request syntax

Endpoint: [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "interactive",  
      "interactive": {  
        "type": "cta_url",  
      
          
        "header": {  
          "type": "document",  
          "document": {  
            "link": ""  
          }  
        },  
      
          
        "header": {  
          "type": "image",  
          "image": {  
            "link": ""  
          }  
        },  
      
          
        "header": {  
          "type": "text",  
          "text": ""  
          }  
        },  
      
          
        "header": {  
          "type": "video",  
          "video": {  
            "link": ""  
          }  
        },  
      
        "body": {  
          "text": ""  
        },  
        "action": {  
          "name": "cta_url",  
          "parameters": {  
            "display_text": "",  
            "url": ""  
          }  
        },  
      
          
        "footer": {  
          "text": ""  
        }  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required if using a header with a media asset.** Asset URL on a public server.| `https://www.luckyshrub.com/assets/lucky-shrub-banner-logo-v1.png`  
``_String_| **Required.** Body text. URLs are automatically hyperlinked.Maximum 1024 characters.| `Tap the button below to see available dates.`  
``_String_| **Required.** Button label text. Must be unique if using multiple buttons.Maximum 20 characters.| `See Dates`  
``| **Required.** URL to load in the device’s default web browser when tapped by the WhatsApp user.| `https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4`  
``_String_| **Required if using a footer.** Footer text. URLs are automatically hyperlinked.Maximum 60 characters.| `Dates subject to change.`  
``_String_| **Required if using a text header.** Header text.Maximum 60 characters.| `New workshop dates announced!`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Example request
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "interactive",
      "interactive": {
        "type": "cta_url",
        "header": {
          "type": "image",
          "image": {
            "link": "https://www.luckyshrub.com/assets/lucky-shrub-banner-logo-v1.png"
          }
        },
        "body": {
          "text": "Tap the button below to see available dates."
        },
        "action": {
          "name": "cta_url",
          "parameters": {
            "display_text": "See Dates",
            "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
          }
        },
        "footer": {
          "text": "Dates subject to change."
        }
      }
    }'

## Example Response
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "+16505551234",  
          "wa_id": "16505551234"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA"  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Request syntax

Request parameters

Example request

Example Response

* * *