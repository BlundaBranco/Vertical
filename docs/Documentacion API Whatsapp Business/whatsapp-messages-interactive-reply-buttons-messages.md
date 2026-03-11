# Interactive reply buttons messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-reply-buttons-messages

---

# Interactive reply buttons messages

Updated: Nov 3, 2025

Interactive reply buttons messages allow you to send up to three predefined replies for users to choose from.

Users can respond to a message by selecting one of the predefined buttons, which triggers a messages webhook describing their selection.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send an interactive reply buttons message to a WhatsApp user.
    
    
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
        "type": "button",  
        "header": {},  
        "body": {  
          "text": ""  
        },  
        "footer": {  
          "text": ""  
        },  
        "action": {  
          "buttons": [  
            {  
              "type": "reply",  
              "reply": {  
                "id": "",  
                "title": ""  
              }  
            }  
              
          ]  
        }  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** Body text. URLs are automatically hyperlinked.Maximum 1024 characters.| `Hi Pablo! Your gardening workshop is scheduled for 9am tomorrow. Use the buttons if you need to reschedule. Thank you!`  
``_String_| **Required.** A unique identifier for each button. Supports up to 3 buttons.Maximum 256 characters.| `change-button`  
``_String_| **Required.** Button label text. Must be unique if using multiple buttons.Maximum 20 characters.| `Change`  
``_String_| **Required if using a footer.** Footer text. URLs are automatically hyperlinked.Maximum 60 characters.| `Lucky Shrub: Your gateway to succulents!™`  
``_JSON Object_| **Optional.** Header content. Supports the following types:

  * `document`
  * `image`
  * `text`
  * `video`

Media assets can be sent using their [uploaded media](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) `id` or URL `link` (not recommended).| Image header example using uploaded media ID (same basic structure for all media types):
    
    
    {
    "type": "image",
    "image": {
    "id": "2762702990552401"
    }

Image header example using hosted media:
    
    
    {
    "type": "image",
    "image": {
    "link": "https://www.luckyshrub.com/media/workshop-banner.png"
    }

Text header example:
    
    
    {
    "type":"text",
    "text": "Workshop Details"
    }  
  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Example Request

Example request to send an interactive reply buttons message with an image header, body text, footer text, and two quick-reply buttons.
    
    
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
        "type": "button",
        "header": {
          "type": "image",
          "image": {
            "id": "2762702990552401"
          }
        },
        "body": {
          "text": "Hi Pablo! Your gardening workshop is scheduled for 9am tomorrow. Use the buttons if you need to reschedule. Thank you!"
        },
        "footer": {
          "text": "Lucky Shrub: Your gateway to succulents!™"
        },
        "action": {
          "buttons": [
            {
              "type": "reply",
              "reply": {
                "id": "change-button",
                "title": "Change"
              }
            },
            {
              "type": "reply",
              "reply": {
                "id": "cancel-button",
                "title": "Cancel"
              }
            }
          ]
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
      
    

## Webhooks

When a WhatsApp user taps on a reply button, a **messages** webhook is triggered that describes their selection in a `button_reply` object:
    
    
    "button_reply": {  
      "id": "",  
      "title": ""  
    }  
      
    

  * `` — The button ID of the button tapped by the user.
  * `` — The button label text of the button tapped by the user.

### Example Webhook
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "102290129340398",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "15550783881",  
                  "phone_number_id": "106540352242922"  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": "Pablo Morales"  
                    },  
                    "wa_id": "16505551234"  
                  }  
                ],  
                "messages": [  
                  {  
                    "context": {  
                      "from": "15550783881",  
                      "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBJBM0Y4RUU0RUNFQkFDMjYzQUMA"  
                    },  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQThBREYwNzc2RDc2QjA1QTIwMgA=",  
                    "timestamp": "1714510003",  
                    "type": "interactive",  
                    "interactive": {  
                      "type": "button_reply",  
                      "button_reply": {  
                        "id": "change-button",  
                        "title": "Change"  
                      }  
                    }  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Request syntax

Request parameters

Example Request

Example Response

Webhooks

Example Webhook

* * *