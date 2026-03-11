# Send WhatsApp Call Button Messages and Deep Links

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links

---

# Send WhatsApp Call Button Messages and Deep Links

Updated: Feb 25, 2026

## Overview

After you adopt Cloud API Calling features, you can raise awareness with your customers in two core ways:

  * Send them a message with a WhatsApp call button
  * Embed a calling deep link into your brand surfaces (website, application, and so on)

## Send interactive message with a WhatsApp call button

Use this endpoint to send a free-form interactive message with a WhatsApp call button during a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) or an [open conversation window](/documentation/business-messaging/whatsapp/pricing#opening-conversations).

When a WhatsApp user clicks the call button, it initiates a WhatsApp call to the business number that sent the message.

A standard [message status webhook](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) will be sent in response to this message send.

#### Request syntax
    
    
    POST /messages

Placeholder |  Description |  Sample Value   
---|---|---  
``_Integer_| **Required**  
The business phone number which you are sending messages from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)| `+12784358810`  
  
#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "14085551234",
      "type": "interactive",
      "interactive" : {
        "type" : "voice_call",
        "body" : {
          "text": "You can call us on WhatsApp now for faster service!"
        },
        "action": {
          "name": "voice_call",
          "parameters": {
            "display_text": "Call on WhatsApp",
            "ttl_minutes": 100,
            "payload": "payload data"
          }
        }
      }
    }

#### Body parameters

[Learn more about sending interactive free form messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)

Parameter |  Description |  Sample Value   
---|---|---  
`to` _Integer_| **Required**  
The phone number of the WhatsApp user you are messaging.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api)| `"17863476655"`  
`type` _String_| **Required**  
The type of interactive message you are sending.In this case, you are sending a `voice_call`.[Learn more about interactive messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)| `"voice_call"`  
`action` _String_| **Required**  
The action of your interactive message.Must be `voice_call`.| `"voice_call"`  
`parameters` _JSON Object_| **Optional**  
Optional parameters for the WhatsApp calling button sent to the user.Contains three values: `display_text`, `ttl_minutes`, and `payload``display_text` — (_String_) **Optional** The display text on the WhatsApp calling button sent to the user.Default is “Call Now”Max length: 20 characters`ttl_minutes` — (_Integer_) **Optional** Time to live for the call-to-action (CTA) button in minutes.Must be between 1 and 43200 (30 days)Default value is 10080 (7 days)`payload` — (_String_) **Optional** An arbitrary string, useful for tracking.Any app subscribed to the `calls` webhook field on the WhatsApp Business Account can get this string, as it is included in the `connect` and `terminate` webhook payloads under the `cta_payload` field.Cloud API does not process this field, it just returns it as part of the webhooks.Maximum 512 characters.Payload is only available to WhatsApp client starting on version 2.25.27.| 
    
    
    "parameters": {
    "display_text": "Call on WhatsApp",
    "ttl_minutes": 100,
    "payload": "payload data"
    }  
  
#### Success response

[Learn more about messaging success responses](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)

#### Error response

Possible errors that can occur:

Sending this message to users on older app versions results in an error webhook with error code `131026`.

[View general Cloud API error codes](/documentation/business-messaging/whatsapp/support/error-codes)

## Create and send WhatsApp call button template message

Use these endpoints to create and send a WhatsApp call button template message.

Once your call button template message is created, you can send a message to a WhatsApp user, inviting them to call your business.

[Learn more about creating and managing message templates](/documentation/business-messaging/whatsapp/templates/overview)

### Create call button message template

Use this endpoint to create a call button message template.

#### Request syntax
    
    
    POST//message_templates

Parameter |  Description |  Sample Value   
---|---|---  
``_String_| **Required**  
Your WhatsApp Business Account ID.[Learn how to find your WABA ID](/documentation/business-messaging/whatsapp/whatsapp-business-accounts)| `"waba-90172398162498126"`  
  
#### Request body
    
    
    {
      "name": "",
      "category": "",
      "language": "",
      "components": [
        {
          "type": "BODY",
          "text": "You can call us on WhatsApp now for faster service!"
        },
        {
          "type": "BUTTONS",
          "buttons": [
            {
              "type": "voice_call",
              "text": "Call Now",
              "ttl_minutes": 1440
            },
            {
              "type": "URL",
              "text": "Contact Support",
              "url": "https://www.luckyshrub.com/support"
            }
          ]
        }
      ]
    }

#### Body parameters

You can create and manage template messages through both Cloud API and the WhatsApp Business Manager interface.

When creating your call button template, ensure you configure `type` as `voice_call`.

[Learn more about creating and managing message templates](/documentation/business-messaging/whatsapp/templates/overview)

Parameter |  Description |  Sample Value   
---|---|---  
`type` _String_| **Required**  
The type of template message you are creating.In this case, you are creating a `voice_call`.| `"voice_call"`  
`text` _String_| **Optional**  
The display text on the WhatsApp calling button sent to the user.Default is “Call Now”Max length: 20 characters| `"Call Now"`  
`ttl_minutes` _Integer_| **Optional**  
Time to live for the CTA button in minutes.Must be between 1440 (1 day) and 43200 (30 days).You can override this value when sending the message.| `1440`  
  
#### Success response
    
    
    {
      "id": "",
      "status": "",
      "category": ""
    }

[_Learn more about messaging success responses_](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)

#### Error response

Possible errors that can occur:

  * Invalid `whatsapp-business-account-id`
  * Permissions/Authorization errors
  * Template structure/component validation alerts

[View general Cloud API error codes](/documentation/business-messaging/whatsapp/support/error-codes)

### Send call button message template

Use this endpoint to **send** a call button message template.

The following is a simplified sample of the send template message request, however you can [learn more about how to send message templates here](/documentation/business-messaging/whatsapp/messages/template-messages).

#### Request syntax
    
    
    POST//messages

Parameter |  Description |  Sample Value   
---|---|---  
``_String_| **Required**  
The business phone number which you are sending a message from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api)| `+18762639988`  
  
#### Request body
    
    
    {
      "to": "14085551234",
      "messaging_product": "whatsapp",
      "type": "template",
      "recipient_type": "individual",
      "template": {
        "name": "wa_voice_call",
        "language": {
          "code": "en"
        },
        "components": [
          {
            "type": "button",
            "sub_type" : "voice_call",
            "parameters": [
              {
                "type": "ttl_minutes",
                "ttl_minutes": 100
              },
              {
                "type": "payload",
                "payload": "payload data"
              }
            ]
          }
        ]
      }
    }

#### Request parameters

Parameter |  Description |  Sample Value   
---|---|---  
`ttl_minutes` _Integer_| **Optional**  
Time to live for the CTA button in minutes.Must be between 1 and 43200 (30 days)Default value is 10080 (7 days)| `10800`  
`payload` _String_| **Optional**  
An arbitrary string, useful for tracking.Any app subscribed to the `calls` webhook field on the WhatsApp Business Account can get this string, as it is included in the `connect` and `terminate` webhook payloads under the `cta_payload` field.Cloud API does not process this field, it just returns it as part of the webhooks.Maximum 512 characters.Payload is only available to WhatsApp client starting on version 2.25.27.| `payload data`  
  
#### Success response

[Learn more about messaging success responses](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)

## Calling deep links

Calling deep links are hyperlinks that route WhatsApp users to call your business.

The process to create a calling deep link is similar to a [chat deep link⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F5913398998672934%2F%3Flocale%3Den_US&h=AT7DdE19aaYlXfT5nJ_A8M4YHohkVffe7xaEazcI551sbcSfqrCFZjf_F8UnTaP8jbmvX6pD1L_qkw5UdGK88WPQoX-jFLrjgdR6rX0wZKgrkf9g2hhtyrXQCQZorWFeNFaSm8lLOxLvaeBFMqXK1A), except the format for the call deep link is `wa.me/call/`

Note that deep links are not supported on WhatsApp desktop clients.

### Embed calling deep links

You can use calling deep links to advertise WhatsApp calling for your business.

Use these links anywhere where calling can be useful, like your website, primary application, or even as a QR code to be shared.

### Send calling deep links

You can also send messages to WhatsApp users with a calling deep link.

Since deep links can be made per business phone number, you can use calling deep links to prompt WhatsApp users to contact a different phone number with voice enabled.

The `wa.me/call/` format is easy to copy, paste, and send, and does not require you to make a template in Business Manager.

### Send payload data in call deep link

You can also send a payload with the deep link. You can use the `biz_payload` query string when sending the call deep link to any user (`wa.me/call/?biz_payload=payload`).

When a user calls using the provided deep link with the `biz_payload` any app subscribed to the `calls` webhook field on the WhatsApp Business Account can get this string, as it is included in the `connect` and `terminate` webhook payloads under the `deeplink_payload` field.

Payload in call deep link is only available to WhatsApp client starting on version 2.25.27.

Did you find this page helpful?

ON THIS PAGE

Overview

Send interactive message with a WhatsApp call button

Request syntax

Request body

Body parameters

Success response

Error response

Create and send WhatsApp call button template message

Create call button message template

Request syntax

Request body

Body parameters

Success response

Error response

Send call button message template

Request syntax

Request body

Request parameters

Success response

Calling deep links

Embed calling deep links

Send calling deep links

Send payload data in call deep link

* * *