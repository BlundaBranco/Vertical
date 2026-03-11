# Typing indicators

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/typing-indicators

---

# Typing indicators

Updated: Oct 21, 2025

When you get a **messages** webhook indicating a [received message](/documentation/business-messaging/whatsapp/webhooks/reference/messages), you can use the `message.id` value to mark the message as read and display a typing indicator so the WhatsApp user knows you are preparing a response. This is good practice if it will take you a few seconds to respond.

The typing indicator will be dismissed once you respond, or after 25 seconds, whichever comes first. To prevent a poor user experience, only display a typing indicator if you are going to respond.

## Request syntax
    
    
    curl -X POST \  
    'https://graph.facebook.com///messages'  
    -H 'Authorization: Bearer ' \  
    -H 'Content-Type: application/json' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "status": "read",  
      "message_id": "",  
      "typing_indicator": {  
        "type": "text"  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp message ID. This ID is assigned to the `messages.id` property in **received message**  [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages) webhooks.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBJDQjZCMzlEQUE4OTJBMTE4RTUA`  
  
## Response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

## Example request
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "status": "read",
      "message_id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBJDQjZCMzlEQUE4OTJBMTE4RTUA",
      "typing_indicator": {
        "type": "text"
      }
    }'

## Response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Request syntax

Request parameters

Response

Example request

Response

* * *