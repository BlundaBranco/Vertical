# Text messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/text-messages

---

# Text messages

Updated: Nov 3, 2025

Text messages are messages containing only a text body and an optional link preview.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a text message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "text",  
      "text": {  
        "preview_url": ,  
        "body": ""  
      }  
    }'  
      
    

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** Body text. URLs are automatically hyperlinked.Maximum 4096 characters.| `As requested, here's the link to our latest product: https://www.meta.com/quest/quest-3/`  
``_Boolean_| **Optional.** Set to `true` to have the WhatsApp client attempt to render a link preview of any URL in the body text string.See Link Preview below.| `true`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Link preview

You can have the WhatsApp client attempt to render a preview of the first URL in the body text string, if it contains one. URLs must begin with `http://` or `https://`. If multiple URLs are in the body text string, only the first URL will be rendered.

If omitted, or if unable to retrieve a link preview, a clickable link will be rendered instead.

## Example request

Example request to send a text message with link previews enabled and a body text string that contains a link.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "text",
      "text": {
        "preview_url": true,
        "body": "As requested, here'\''s the link to our latest product: https://www.meta.com/quest/quest-3/"
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

Link preview

Example request

Example response

* * *