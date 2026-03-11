# Copy code authentication templates

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/copy-code-button-authentication-templates

---

# Copy code authentication templates

Updated: Nov 4, 2025

Copy code authentication templates allow you to send a one-time password or code along with a copy code button to your users. When a WhatsApp user taps the copy code button, the WhatsApp client copies the password or code to the device’s clipboard. The user can then switch to your app and paste the password or code into your app.

Note: The “I didn’t request a code” button is currently in beta and is being rolled out incrementally to business customers.

Copy code button authentication templates consist of:

  * Preset text: _ is your verification code._
  * An optional security disclaimer: _For your security, do not share this code._
  * An optional expiration warning (optional): _This code expires in  minutes._
  * A copy code button.

## Limitations

URLs, media, and emojis are not supported.

## Creating authentication templates

Use the [WhatsApp Business Account > Message Templates](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/template-api) endpoint to create authentication templates.

### Request Syntax
    
    
    curl 'https://graph.facebook.com///message_templates' \  
      -H 'Content-Type: application/json' \  
      -H 'Authorization: Bearer EAAJB...' \  
      -d '  
    {  
        "name": "",  
        "language": "",  
        "category": "authentication",  
        "message_send_ttl_seconds": ,  // Optional  
        "components": [  
          {  
            "type": "body",  
            "add_security_recommendation":   // Optional  
          },  
          {  
            "type": "footer",  
            "code_expiration_minutes":   // Optional  
          },  
          {  
            "type": "buttons",  
            "buttons": [  
              {  
                "type": "otp",  
                "otp_type": "copy_code",  
                "text": ""  // Optional  
              }  
            ]  
          }  
        ]  
      }'  
      
    

Note that in your template creation request the button `type` is designated as `OTP`, but upon creation the button `type` will be set to `URL`. You can confirm this by performing a GET request on a newly created authentication template and analyzing its components.

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_Integer_| **Optional.**  
Indicates the number of minutes the password or code is valid.  
If included, the code expiration warning and this value will be displayed in the delivered message.  
If omitted, the code expiration warning will not be displayed in the delivered message.  
Minimum 1, maximum 90.| `5`  
``_String_| **Optional.**  
Copy code button label text.  
If omitted, the text will default to a pre-set value localized to the template’s language. For example, `Copy Code` for English (US).  
Maximum 25 characters.| `Copy Code`  
``_Boolean_| **Optional.**  
Set to `true` if you want the template to include the string, _For your security, do not share this code._ Set to `false` to exclude the string.| `true`  
``_String_| **Required.**  
Template [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en_US`  
``_String_| **Required.**  
Template name.  
Maximum 512 characters.| `verification_code`  
``_Integer_| **Optional.**  
Authentication message time-to-live value, in seconds. See [Time-To-Live](/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates#time-to-live) below.| `60`  
  
### Example request
    
    
    curl 'https://graph.facebook.com/v25.0/102290129340398/message_templates' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "name": "authentication_code_copy_code_button",
      "language": "en_US",
      "category": "authentication",
      "message_send_ttl_seconds": 60,
      "components": [
        {
          "type": "body",
          "add_security_recommendation": true
        },
        {
          "type": "footer",
          "code_expiration_minutes": 5
        },
        {
          "type": "buttons",
          "buttons": [
            {
              "type": "otp",
              "otp_type": "copy_code",
              "text": "Copy Code"
            }
          ]
        }
      ]
    }'

### Example response
    
    
    {  
      "id": "594425479261596",  
      "status": "PENDING",  
      "category": "AUTHENTICATION"  
    }  
      
    

## Webhooks

The [button messages webhook](/documentation/business-messaging/whatsapp/webhooks/reference/messages/button) is triggered whenever a user taps the “I didn’t request a code” button within the message.

### Example webhook
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "320580347795883",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "12345678",  
                  "phone_number_id": "1234567890"  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": "John"  
                    },  
                    "wa_id": "12345678"  
                  }  
                ],  
                "messages": [  
                  {  
                    "context": {  
                      "from": "12345678",  
                      "id": "wamid.HBgLMTIxMTU1NTE0NTYVAgARGBJDMDEyMTFDNTE5NkFCOUU3QTEA"  
                    },  
                    "from": "12345678",  
                    "id": "wamid.HBgLMTIxMTU1NTE0NTYVAgASGCBBQ0I3MjdCNUUzMTE0QjhFQkM4RkQ4MEU3QkE0MUNEMgA=",  
                    "timestamp": "1753919111",  
                    "from_logical_id": "131063108133020",  
                    "type": "button",  
                    "button": {  
                      "payload": "DID_NOT_REQUEST_CODE",  
                      "text": "I didn't request a code"  
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
      
    

## Sample app

See our [WhatsApp One-Time Password (OTP) Sample App⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FWhatsApp%2FWhatsApp-OTP-Sample-App&h=AT62tnA1l5dUIczW_zWwBZHKRGD8cHau8lAgQjCuF872QCodzET-fvICZ0ybFES3nGJbfQipRLsq149m_HzLa8xVGvnLnMPYzkNNtnK5baTxzeqzfcT9af3kVIfzp-GQVeI_XbKNcGSuiymc6TV-NQ) for Android on Github. The sample app demonstrates how to send and receive OTP passwords and codes via the API, how to integrate the one-tap autofill and copy code buttons, how to create a template, and how to spin up a sample server.

## Sending authentication templates

This document explains how to send approved [authentication templates with one-time password buttons](/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates).

Note that **you must first initiate a handshake** between your app and the WhatsApp client. See Handshake above.

### Request syntax
    
    
    curl -X POST "https://graph.facebook.com///messages" \  
      -H "Authorization: Bearer " \  
      -H "Content-Type: application/json" \  
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
              "type": "body",  
              "parameters": [  
                {  
                  "type": "text",  
                  "text": ""  
                }  
              ]  
            },  
            {  
              "type": "button",  
              "sub_type": "url",  
              "index": "0",  
              "parameters": [  
                {  
                  "type": "text",  
                  "text": ""  
                }  
              ]  
            }  
          ]  
        }  
    }'  
      
    

### Request parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``| The customer’s WhatsApp phone number.| `12015553931`  
``| The one-time password or verification code to be delivered to the customer.  
Note that this value must appear twice in the payload.  
Maximum 15 characters.| `J$FpnYnP`  
``| The template’s [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en_US`  
``| The template’s name.| `verification_code`  
  
### Response

Upon success, the API will respond with:
    
    
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
          "id": ""  
        }  
      ]  
    }  
      
    

### Response parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_|  The customer phone number that the message was sent to. This may not match `wa_id`.| `+16315551234`  
``_String_|  WhatsApp ID of the customer who the message was sent to. This may not match `input`.| `+16315551234`  
``_String_|  WhatsApp message ID. You can use the ID listed after “wamid.” to track your message status.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBI3N0EyQUJDMjFEQzZCQUMzODMA`  
  
### Example request
    
    
    curl -L 'https://graph.facebook.com/v25.0/105954558954427/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '{
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": "12015553931",
          "type": "template",
          "template": {
            "name": "verification_code",
            "language": {
              "code": "en_US"
          },
          "components": [
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": "J$FpnYnP"
                }
              ]
            },
            {
              "type": "button",
              "sub_type": "url",
              "index": "0",
              "parameters": [
                {
                  "type": "text",
                  "text": "J$FpnYnP"
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
          "input": "12015553931",  
          "wa_id": "12015553931"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGBI4Qzc5QkNGNTc5NTMyMDU5QzEA"  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Limitations

Creating authentication templates

Request Syntax

Request parameters

Example request

Example response

Webhooks

Example webhook

Sample app

Sending authentication templates

Request syntax

Request parameters

Response

Response parameters

Example request

Example response

* * *