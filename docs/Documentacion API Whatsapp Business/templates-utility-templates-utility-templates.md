# Utility templates

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/utility-templates/utility-templates

---

# Utility templates

Updated: Nov 14, 2025

This document describes how to create and send utility templates.

Utility templates are typically sent in response to a user action or request, such as an order confirmation or update.

Utility templates have strict content requirements, particularly around marketing material. If you attempt to create or update a utility template with marketing material, the template will automatically be re-categorized as a marketing template.

See our [template categorization](/documentation/business-messaging/whatsapp/templates/template-categorization#utility-template-guidelines) documentation for content guidelines.

## Supported components

Utility templates support the following components:

  * 1 header (optional; all types supported)
  * 1 body
  * 1 footer (optional)
  * Up to 10 buttons (optional). Supported types: 
    * Call request
    * Copy code
    * Phone number
    * Quick-reply
    * URL

## Create a utility template

### Request syntax

Use the `POST//message_templates` endpoint to create a utility template.
    
    
    curl 'https://graph.facebook.com///message_templates' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "name": "",  
      "language": "",  
      "category": "utility",  
      "parameter_format": "",  
      "components": [  
      
          
        {  
          "type": "header",  
          "format": "",  
          "example": {  
            "header_handle": [  
              ""  
            ]  
          }  
        },  
      
          
        {  
          "type": "body",  
          "text": "",  
      
           contains one or more parameters -->  
          "example": {  
            "body_text_named_params": [  
              {  
                "param_name": "",  
                "example": ""  
              },  
      
                
            ]  
          }  
        },  
      
          
        {  
          "type": "footer",  
          "text": ""  
        },  
      
          
        {  
          "type": "buttons",  
          "buttons": [  
            {  
              "type": "url",  
              "text": "",  
              "url": ""  
            },  
            {  
              "type": "phone_number",  
              "text": "",  
              "phone_number": ""  
            },  
            {  
              "type": "quick_reply",  
              "text": ""  
            }  
          ]  
        }  
      ]  
    }'  
      
    

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.**  
Template body text. Variables are supported.  
Maximum 1024 characters.| `You're all set! Your reservation for {{number_of_guests}} at Lucky Shrub Eatery on {{day}}, {{date}}, at {{time}}, is confirmed. See you then!`  
``_String_| **Optional.** Template footer text. Variables are supportedMaximum 60 characters.| `Lucky Shrub Eatery: The Luckiest Eatery in Town!`  
``_String_| **Required if using a header with a media asset.** Asset handle of example media asset uploaded on your WhatsApp Business Account.Maximum 60 characters.| `4::aW1hZ2UvcG5n:ARYpf5zqqUjggwGfsZOJ2_o26Zs8ntcO2mss2vKpFb8P_IvskL043YXKpehYTD7IxqEB4t-uZcIzOTxOFRavEcN_tZLhk1WXFb3IOr4S8UKJcQ:e:1759093121:634974688087057:100089620928913:ARYyOAh63uQLhDpqOdk\n4::aW1hZ2UvcG5n:ARZW8t9-cBNjpdmxV5Z9wcRAMhfmw4ATpJcJiHT0nY62hXq4ppOeBaTWaGI0IwX-twF2IkeKo-_MyW2pEDuBAE5vyw2oHTNgPZQkntclrgWMGg:e:1759093121:634974688087057:100089620928913:ARZE4NC5MrxnZUe5GRw`  
``_String_| **Required if using a header.** Header format. Values can be:

  * documentation
  * image
  * location
  * text
  * video

| `image`  
``_String_| **Required if using a body component string that includes one or more parameters.** Example parameter value. You must supply an example for each parameter defined in your body component string.| `Saturday`  
``_String_| **Required if using named parameters.** Must be a unique string, composed of lowercase characters and underscores, wrapped in double curly brackets.| `{{day}}`  
``_String_| **Required if using a phone number button.** Button label text.Maximum 25 characters. Alphanumeric characters only.| `Change reservation`  
``_String_| **Required if using a phone number button component.** Business phone number to be called in the WhatsApp user’s default phone app when tapped by the user.Note that some countries have special phone numbers that have leading zeros after the country calling code (e.g., +55-0-955-585-95436). If you assign one of these numbers to the button, the leading zero will be stripped from the number. If your number will not work without the leading zero, assign an alternate number to the button, or add the number as messageMaximum 20 characters. Alphanumeric characters only.| `15550051310`  
``| **Required if using a quick-reply button.** Button label text.Maximum 25 characters. Alphanumeric characters only.| `Cancel reservation`  
``_String_| **Required.**[Template language code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en_US`  
``_String_| **Required.** Template name. Must be unique, unless existing templates with the same name have a different template language.Maximum 512 characters. Lowercase, alphanumeric characters and underscores only.| `reservation_confirmation`  
``_String_| **Required if including a URL button.** URL to be loaded in WhatsApp user’s default web browser when tapped.| `https://www.luckyshrubeater.com/reservations`  
``_String_| **Required if using a URL button.** Button label text.Maximum 25 characters. Alphanumeric characters only.| `Change reservation`  
``| **Required.** WhatsApp Business Account ID.| `546151681022936`  
  
### Response syntax

Upon success:
    
    
    {  
      "id": "",  
      "status": "",  
      "category": ""  
    }  
      
    

### Response parameters

Placeholder |  Description |  Example value   
---|---|---  
``| [Template category](/documentation/business-messaging/whatsapp/templates/template-categorization).| `UTILITY`  
``| Template ID.| `546151681022936`  
``| [Template status](/documentation/business-messaging/whatsapp/templates/overview#template-status).| `PENDING`  
  
### Example request

This example request creates a utility template with:

  * an image header component
  * a body component with a string that has 4 named parameters
  * a footer component
  * a URL button component
  * a phone number button component
  * a quick-reply button component

    
    
    curl 'https://graph.facebook.com/v23.0/102290129340398/message_templates' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "name": "reservation_confirmation",  
      "language": "en_US",  
      "category": "utility",  
      "parameter_format": "named",  
      "components": [  
        {  
          "type": "header",  
          "format": "image",  
          "example": {  
            "header_handle": [  
              "4::aW..."  
            ]  
          }  
        },  
        {  
          "type": "body",  
          "text": "*You're all set!*\n\nYour reservation for {{number_of_guests}} at Lucky Shrub Eatery on {{day}}, {{date}}, at {{time}}, is confirmed. See you then!",  
          "example": {  
            "body_text_named_params": [  
              {  
                "param_name": "number_of_guests",  
                "example": "4"  
              },  
              {  
                "param_name": "day",  
                "example": "Saturday"  
              },  
              {  
                "param_name": "date",  
                "example": "August 30th, 2025"  
              },  
              {  
                "param_name": "time",  
                "example": "7:30 pm"  
              }  
            ]  
          }  
        },  
        {  
          "type": "footer",  
          "text": "Lucky Shrub Eatery: The Luckiest Eatery in Town!"  
        },  
        {  
          "type": "buttons",  
          "buttons": [  
            {  
              "type": "url",  
              "text": "Change reservation",  
              "url": "https://www.luckyshrubeater.com/reservations"  
            },  
            {  
              "type": "phone_number",  
              "text": "Call us",  
              "phone_number": "+15550051310"  
            },  
            {  
              "type": "quick_reply",  
              "text": "Cancel reservation"  
            }  
          ]  
        }  
      ]  
    }'  
      
    

### Example response
    
    
    {  
      "id": "546151681022936",  
      "status": "PENDING",  
      "category": "UTILITY"  
    }  
      
    

## Send a utility template

### Request syntax

Use the [`POST//message`](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send an approved utility template in template message.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "template",  
      "template": {  
        "name": "",  
        "language": {  
          "code": ""  
        },  
        "components": [  
      
            
          {  
            "type": "header",  
            "parameters": [  
              {  
                "type": "",  
                "": {  
                  "id": ""  
                }  
              }  
            ]  
          },  
      
            
          {  
            "type": "body",  
            "parameters": [  
              {  
                "type": "",  
                "parameter_name": "",  
                "text": ""  
              },  
      
                
      
            ]  
          }  
        ]  
      }  
    }'  
      
    

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional** API version. If omitted, defaults to the newest API version available to your app.| v25.0  
``_String_| **Required if template uses a media header component.**| `2871834006348767`  
``_String_| **Required if template uses a media header component.** Media header type. Values can be:

  * document
  * image
  * video

Note that this placeholder appears twice in the request syntax above.| `image`  
``| **Required if template uses body component parameters.** Name of parameter as defined in the template body component text string.| `number_of_guests`  
``| **Required if template uses body component parameters.** Parameter type. Set to text.| `text`  
``| **Required if template uses body component parameters.** Parameter value.| `4`  
``_String_| **Required.**[Template language code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en_US`  
``_String_| **Required.** Template name. Must be unique, unless existing templates with the same name have a different template language.Maximum 512 characters. Lowercase, alphanumeric characters and underscores only.| `reservation_confirmation`  
``| **Required.** WhatsApp Business Account ID.| `546151681022936`  
``| **Required.** WhatsApp user phone number.| `16505551234`  
  
### Response syntax

Upon success:
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "",  
          "wa_id": ""  
        }  
      ],  
      "messages": [  
        {  
          "id": "",  
          "message_status": ""  
        }  
      ]  
    }  
      
    

### Response parameters

Placeholder |  Description |  Example Value   
---|---|---  
``| [Template pacing](/documentation/business-messaging/whatsapp/templates/template-pacing) status.| `accepted`  
``| WhatsApp Message ID.This ID is included in status [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks for delivery status purposes.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBJBRkJENzExMTRFRjk2NTI1OTEA`  
``| WhatsApp user’s WhatsApp ID. May not match input value.| `16505551234`  
``| WhatsApp user’s WhatsApp phone number. May not match wa_id value.| `16505551234`  
  
### Example request

This is an example request that sends the template created in the example template creation request above.
    
    
    curl 'https://graph.facebook.com/v23.0/106540352242922/messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "16505551234",  
      "type": "template",  
      "template": {  
        "name": "reservation_confirmation",  
        "language": {  
          "code": "en_US"  
        },  
        "components": [  
          {  
            "type": "header",  
            "parameters": [  
              {  
                "type": "image",  
                "image": {  
                  "id": "2871834006348767"  
                }  
              }  
            ]  
          },  
          {  
            "type": "body",  
            "parameters": [  
              {  
                "type": "text",  
                "parameter_name": "number_of_guests",  
                "text": "4"  
              },  
              {  
                "type": "text",  
                "parameter_name": "day",  
                "text": "Saturday"  
              },  
              {  
                "type": "text",  
                "parameter_name": "date",  
                "text": "August 30th, 2025"  
              },  
              {  
                "type": "text",  
                "parameter_name": "time",  
                "text": "7:30 pm"  
              }  
            ]  
          }  
        ]  
      }  
    }'  
      
    

### Example response
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "16505551234",  
          "wa_id": "16505551234"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBJBRkJENzExMTRFRjk2NTI1OTEA",  
          "message_status": "accepted"  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Supported components

Create a utility template

Request syntax

Request parameters

Response syntax

Response parameters

Example request

Example response

Send a utility template

Request syntax

Request parameters

Response syntax

Response parameters

Example request

Example response

* * *