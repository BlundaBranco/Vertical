# Sticker messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/sticker-messages

---

# Sticker messages

Updated: Nov 3, 2025

Sticker messages display animated or static sticker images in a WhatsApp message.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a sticker message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "sticker",  
      "sticker": {  
        "id": "",   
        "link": "",   
      }  
    }'  
      
    

### Post Body Parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required if using uploaded media, otherwise omit.** ID of the [uploaded media asset](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media).| `1013859600285441`  
``_String_| **Required if using hosted media, otherwise omit.** URL of the media asset hosted on your public server. For better performance, we recommend using `id` and an [uploaded media asset ID](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) instead.| `https://www.luckyshrub.com/assets/animated-smiling-plant.webp`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Supported Sticker Formats

Sticker Type |  Extension |  MIME Type |  Max Size   
---|---|---|---  
Animated sticker| .webp| image/webp| 500 KB  
Static sticker| .webp| image/webp| 100 KB  
  
## Example Request

Example request to send an animated sticker image to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "sticker",
      "sticker": {
        "id" : "798882015472548"
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

Post Body Parameters

Supported Sticker Formats

Example Request

Example Response

* * *