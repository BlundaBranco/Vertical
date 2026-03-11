# Contextual replies

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/contextual-replies

---

# Contextual replies

Updated: Oct 21, 2025

Contextual replies are a special way of responding to a WhatsApp user message. Sending a message as a contextual reply makes it clearer to the user which message you are replying to by quoting the previous message in a contextual bubble:

## Limitations

  * You cannot send a [reaction message](/documentation/business-messaging/whatsapp/messages/reaction-messages) as a contextual reply.

The contextual bubble will not appear at the top of the delivered message if:

  * The previous message has been deleted or moved to long term storage (messages are typically moved to long term storage after 30 days, unless you have enabled [local storage](/documentation/business-messaging/whatsapp/local-storage)).
  * You reply with an [audio](/documentation/business-messaging/whatsapp/messages/audio-messages), [image](/documentation/business-messaging/whatsapp/messages/image-messages), or [video message](/documentation/business-messaging/whatsapp/messages/video-messages) and the WhatsApp user is running KaiOS.
  * You use the WhatsApp client to reply with a [push-to-talk⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F657157755756612%2F%3Fcms_platform%3Dweb&h=AT7gCijTHFaKh7yXI4O0bYcx3I1F2SHCcK51TGa7gH_FLjHR7SzH-bBANdYa6Oej0Lf4H9zepKKLHJpESbUpeL2yLkSe1hVe8k077hSnZvGpV-E27l3wKYnOMQbSFcaivrcEOvx3c8QCtb-9rGxUpg) message and the WhatsApp user is running KaiOS.
  * You reply with a [template message](/documentation/business-messaging/whatsapp/messages/template-messages).

## Request Syntax
    
    
    POST //messages

### Post Body
    
    
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "context": {  
        "message_id": "WAMID_TO_REPLY_TO"  
      },  
      
      /* Message type and type contents goes here */  
      
    }  
      
    

### Post Body Parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.** WhatsApp message ID (wamid) of the previous message you want to reply to.| `wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQTdCNTg5RjY1MEMyRjlGMjRGNgA=`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Example Request

Example of a text message sent as a reply to a previous message.
    
    
    curl 'https://graph.facebook.com/v19.0/106540352242922/messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "+16505551234",  
      "context": {  
        "message_id": "wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQTdCNTg5RjY1MEMyRjlGMjRGNgA="  
      },  
      "type": "text",  
      "text": {  
        "body": "You'\''re welcome, Pablo!"  
      }  
    }'  
      
    

Did you find this page helpful?

ON THIS PAGE

Limitations

Request Syntax

Post Body

Post Body Parameters

Example Request

* * *