# Location request messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/location-request-messages

---

# Location request messages

Updated: Nov 3, 2025

Location request messages display **body text** and a **send location button**. When a WhatsApp user taps the button, a location sharing screen appears which the user can then use to share their location.

  
Once the user shares their location, a **messages** webhook is triggered, containing the user’s location details.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a location request message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "type": "interactive",  
      "to": "",  
      "interactive": {  
        "type": "location_request_message",  
        "body": {  
          "text": ""  
        },  
        "action": {  
          "name": "send_location"  
        }  
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** Message body text. Supports URLs.Maximum 1024 characters.| `Let's start with your pickup. You can either manually *enter an address* or *share your current location*.`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Webhook syntax

When a WhatsApp user shares their location in response to your message, a **messages** webhook is triggered containing the user’s location details.
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "",  
                  "phone_number_id": ""  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": ""  
                    },  
                    "wa_id": ""  
                  }  
                ],  
                "messages": [  
                  {  
                    "context": {  
                      "from": "",  
                      "id": ""  
                    },  
                    "from": "",  
                    "id": "",  
                    "timestamp": "",  
                    "location": {  
                      "address": "",  
                      "latitude": ,  
                      "longitude": ,  
                      "name": ""  
                    },  
                    "type": "location"  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Webhook parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_|  Location address.This parameter will only appear if the WhatsApp user chooses to share it.| `1071 5th Ave, New York, NY 10128`  
``_Number_|  Location latitude in decimal degrees.| `40.782910059774`  
``_Number_|  Location longitude in decimal degrees.| `-73.959075808525`  
``_String_|  Location name.This parameter will only appear if the WhatsApp user chooses to share it.| `Solomon R. Guggenheim Museum`  
``_String_|  UNIX timestamp indicating when our servers processed the WhatsApp user’s message.| `1702920965`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp business phone number’s display number.| `15550783881`  
``_String_|  WhatsApp business phone number.| `15550783881`  
``_String_|  WhatsApp business phone number ID.| `106540352242922`  
``_String_|  WhatsApp message ID of message that the user is responding to.| `wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1QjJGRjI1RDY0RkE4Nzg4QzcA`  
``_String_|  WhatsApp message ID of the user’s message.| `wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQTRCRDcwNzgzMTRDNTAwRTgwRQA=`  
``_String_|  WhatsApp user’s WhatsApp ID.| `16505551234`  
``_String_|  WhatsApp user’s name.| `Pablo Morales`  
  
## Example request
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "type": "interactive",
      "to": "+16505551234",
      "interactive": {
        "type": "location_request_message",
        "body": {
          "text": "Let'\''s start with your pickup. You can either manually *enter an address* or *share your current location*."
        },
        "action": {
          "name": "send_location"
        }
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
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBJCNUQ5RUNBNTk3OEQ2M0ZEQzgA"  
        }  
      ]  
    }  
      
    

## Example webhook
    
    
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
                      "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1QjJGRjI1RDY0RkE4Nzg4QzcA"  
                    },  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgASGBQzQTRCRDcwNzgzMTRDNTAwRTgwRQA=",  
                    "timestamp": "1702920965",  
                    "location": {  
                      "address": "1071 5th Ave, New York, NY 10128",  
                      "latitude": 40.782910059774,  
                      "longitude": -73.959075808525,  
                      "name": "Solomon R. Guggenheim Museum"  
                    },  
                    "type": "location"  
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

Webhook syntax

Webhook parameters

Example request

Example response

Example webhook

* * *