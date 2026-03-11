# Document messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/document-messages

---

# Document messages

Updated: Nov 3, 2025

Document messages are messages that display a document icon, linked to a document, that a WhatsApp user can tap to download.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a document message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "document",  
      "document": {  
        "id": "",   
        "link": "",   
        "caption": "",  
        "filename": "",  
        "caption": ""  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Optional.** Media asset caption text.Maximum 1024 characters.| `Lucky Shrub Invoice`  
``_String_| **Optional.** Document filename, with extension. The WhatsApp client will use an appropriate file type icon based on the extension.| `lucky-shrub-invoice.pdf`  
``_String_| **Required if using uploaded media, otherwise omit.** ID of the [uploaded media asset](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media).| `1013859600285441`  
``_String_| **Required if using hosted media, otherwise omit.** URL of the media asset hosted on your public server. For better performance, we recommend using `id` and an [uploaded media asset ID](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) instead.| `https://www.luckyshrub.com/invoices/FmOzfD9cKf/lucky-shrub-invoice.pdf`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Supported document types

Document Type |  Extension |  MIME Type |  Max Size   
---|---|---|---  
Text| .txt| text/plain| 100 MB  
Microsoft Excel| .xls| application/vnd.ms-excel| 100 MB  
Microsoft Excel| .xlsx| application/vnd.openxmlformats-officedocument.spreadsheetml.sheet| 100 MB  
Microsoft Word| .doc| application/msword| 100 MB  
Microsoft Word| .docx| application/vnd.openxmlformats-officedocument.wordprocessingml.document| 100 MB  
Microsoft PowerPoint| .ppt| application/vnd.ms-powerpoint| 100 MB  
Microsoft PowerPoint| .pptx| application/vnd.openxmlformats-officedocument.presentationml.presentation| 100 MB  
PDF| .pdf| application/pdf| 100 MB  
  
Only the above listed document types are officially supported and guaranteed to display correctly in the WhatsApp client. Other file types may be sent via the API, but they are not supported and may not be handled as expected.

## Example request

Example request to send a PDF in a document message with a caption to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "document",
      "document": {
        "id": "1376223850470843",
        "filename": "order_abc123.pdf",
        "caption": "Your order confirmation (PDF)"
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

Supported document types

Example request

Example response

* * *