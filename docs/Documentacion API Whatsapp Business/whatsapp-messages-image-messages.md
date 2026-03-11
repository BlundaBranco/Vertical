# Image messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/image-messages

---

# Image messages

Updated: Nov 3, 2025

Image messages are messages that display a single image and an optional caption.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send an image message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "image",  
      "image": {  
        "id": "",   
        "link": "",   
        "caption": ""  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Optional.** Media asset caption text.Maximum 1024 characters.| `The best succulent ever?`  
``_String_| **Required if using uploaded media, otherwise omit.** ID of the [uploaded media asset](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media).| `1013859600285441`  
``_String_| **Required if using hosted media, otherwise omit.** URL of the media asset hosted on your public server. For better performance, we recommend using `id` and an [uploaded media asset ID](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) instead.| `https://www.luckyshrub.com/assets/succulents/aloe.png`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Supported image formats

Images must be 8-bit, RGB or RGBA.

  
  

Image Type |  Extension |  MIME Type |  Max Size   
---|---|---|---  
JPEG| .jpeg| image/jpeg| 5 MB  
PNG| .png| image/png| 5 MB  
  
## Example request

Example request to send an image message with a caption to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "image",
      "image": {
        "id" : "1479537139650973",
        "caption": "The best succulent ever?"
      }
    }'

## Example response
    
    
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

Supported image formats

Example request

Example response

* * *