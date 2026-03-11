# Reaction messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/reaction-messages

---

# Reaction messages

Updated: Nov 3, 2025

Reaction messages are emoji-reactions that you can apply to a previous WhatsApp user message that you have received.

## Limitations

When sending a reaction message, only a [sent message webhook](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) (`status` set to `sent`) will be triggered; delivered and read message webhooks will not be triggered.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to apply an emoji reaction on a message you have received from a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "reaction",  
      "reaction": {  
        "message_id": "",  
        "emoji": ""  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** Unicode escape sequence of the emoji, or the emoji itself, to apply to the user message.| Unicode escape sequence example:`\uD83D\uDE00`Emoji example:😀  
``_String_| **Required.** WhatsApp message ID of message you want to apply the emoji to.If the message you are reacting to is more than 30 days old, doesn’t correspond to any message in the chat thread, has been deleted, or is itself a reaction message, the reaction message will not be delivered and you will receive a **messages** webhook with error code `131009`.| `wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQUZCMTY0MDc2MUYwNzBDNTY5MAA=`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Example request

Example request to apply the grinning face emoji (😀) to a previously received user message.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "reaction",
      "reaction": {
        "message_id": "wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQUZCMTY0MDc2MUYwNzBDNTY5MAA=",
        "emoji": "\uD83D\uDE00"
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

Limitations

Request syntax

Request parameters

Example request

Example response

* * *