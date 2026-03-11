# Group messaging

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/groups-messaging

---

# Group messaging

Updated: Nov 14, 2025

## Overview

This document provides comprehensive information on the APIs and webhooks available for sending and receiving messages within groups. It details support for various message types, including:

  * Text messages
  * Media messages
  * Text-based templates
  * Media-based templates

## Subscribe to groups metadata webhooks

In order to receive webhook notifications for metadata about your groups, please subscribe to the following webhook fields:

  * `group_lifecycle_update`
  * `group_participants_update`
  * `group_settings_update`
  * `group_status_update`

For a full reference of webhooks for the Groups API, please visit our [Webhooks for Groups API reference](/documentation/business-messaging/whatsapp/groups/webhooks).

## Send group message

To send a group message, use the existing send message endpoint:

`POST //messages`

This endpoint has been extended to support group messages in the following way:

  * The `recipient_type` field now supports `group` as well as `individual`.
  * The `to` field now supports the `group ID` that is obtained when using the Groups API.

### Example group message send
    
    
    curl 'https://graph.facebook.com/v25.0/756079150920219/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAAu...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "group",
      "to": "Y2FwaV9ncm91cDoxNzA1NTU1MDEzOToxMjAzNjM0MDQ2OTQyMzM4MjAZD",
      "type": "text",
      "text": {
          "preview_url": true,
          "body": "This is another destination option: https://www.luckytravel.com/DDLmU5F1Pw"
      }
    }'

### Webhooks

#### Group message sent example
    
    
    {
       "object": "whatsapp_business_account",
       "entry": [
         {
           "id": "",
           "changes": [
             {
               "value": {
                   "messaging_product": "whatsapp",
                   "metadata": {
                        "display_phone_number": "",
                        "phone_number_id": ""
                   },
                   "statuses": [
                     {
                       "id": "",
                       "recipient_id": "",
                       "recipient_type": "group",
                       "status": "sent",
                       "timestamp": "",
                     }
                   ]
               },
               "field": "messages"
             }
           ]
         }
       ]
     }
    

#### Group message failed example
    
    
    {
       "object": "whatsapp_business_account",
       "entry": [
         {
           "id": "",
           "changes": [
             {
               "value": {
                   "messaging_product": "whatsapp",
                   "metadata": {
                        "display_phone_number": "",
                        "phone_number_id": ""
                   },
                   "statuses": [
                     {
                       "id": "",
                       "recipient_id": "",
                       "recipient_type": "group",
                       "status": "failed",
                       "timestamp": "",
                       "errors": [
                         {
                           "code": "",
                           "title": "",
                           "message": "",
                           "error_data": {
                             "details": "",
                           },
                           "href": "/documentation/business-messaging/whatsapp/support/error-codes"
                        }
                      ]
                    }
                  ]
               },
               "field": "messages"
             }
           ]
         }
       ]
     }
    

## Receive group messages

You can use the following webhooks to receive statuses on messages received in the group.

The `message` object includes a `group_id` field to indicate this is a group message. The `from` field in the `message` object and the contact object point to the same participant who sends this message.

### Webhooks

#### Receive group message webhook sample
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [{
          "id": "",
          "changes": [{
              "value": {
                  "messaging_product": "whatsapp",
                  "metadata": {
                      "display_phone_number": "",
                      "phone_number_id": ""
                  },
                  "contacts": [{
                      "profile": {
                        "name": ""
                      },
                      "wa_id": ""
                    }],
                  "messages": [{
                      "from": "",
                      "group_id": "",
                      "id": "",
                      "timestamp": "",
                      "text": {
                        "body": ""
                      },
                      "type": "text"
                    }]
              },
              "field": "messages"
            }]
      }]
    }
    

#### Receive unsupported group message webhook sample
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "",
          "changes": [
            {
              "value": {
                  "messaging_product": "whatsapp",
                  "metadata": {
                       "display_phone_number": "",
                       "phone_number_id": "",
                  },
                  "contacts": [
                    {
                      "profile": {
                        "name": ""
                      },
                      "wa_id": ""
                    }
                  ],
                  "messages": [
                    {
                      "from": "",
                      "group_id": "",
                      "id": "",
                      "timestamp": "",
                      "errors": [
                        {
                          "code": 130501,
                          "message": "Message type is not currently supported",
                          "title": "Unsupported message type",
                          "error_data": {
                            "details": ""
                          }
                        }
                      ],
                      "type": "unsupported"
                    }
                  ]
              },
              "field": "messages"
            }
          ]
        }
      ]
    }
    

## Pin and unpin group message

Pinning a message highlights its relevance.

The display order of the pinned messages is based on the chronological order of parent messages, newest first. If three messages are already pinned when a new pin request is made, the oldest pinned message will be automatically unpinned.

### Limits

  1. When calling the API, only one message can be pinned at a time.
  2. Only the group admin can pin or unpin messages.
  3. A maximum of 3 pinned messages can exist at any time.

### Request Syntax

`POST //messages`

**Note: You will receive an error in the sync response if the`recipient_type` and `to` type do not match.**

### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "recipient_type": "group",
      "to": "",
      "type": "pin",
      "pin": {
        "type": "",
        "message_id": "",
        "expiration_days": ""
      }
    }
    

### Body parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required** The group in which you are pinning a message.| `Y2FwaV9ncm91cDoxOTUwNTU1MDA3OToxMjAzNjMzOTQzMjAdOTY0MTUZD`  
``_String_| **Required** The pinning operation you are performing on the group.Can either be `"pin"` or `"unpin"`| `pin`  
``_String_| **Required** A unique identifier for the message you are pinning or unpinning in the group.| `wamid.HBgLM...`  
``_Integer_| **Required when`PIN_OPERATION` is `pin`**  
Pin duration in days. Can be 1 to 30 days.| `4`  
  
### Response body
    
    
        {
          "messaging_product": "whatsapp",
          "contacts": [
            {
              "input": "Y2FwaV9ncm91cDo....",
              "wa_id": "Y2FwaV9ncm91cDo...."
            }
          ],
          "messages": [
            {
              "id": "wamid.HBgLM..."
            }
          ]
    }
    

### Webhooks

Subscribe to the `messages` webhook topic to receive message status notifications. Standard sent and delivered statuses webhooks will be received for the `message_id` in the response.

[Learn more about the messages `status` webhook object here](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status)

## Group message status webhooks

When you send messages to a group, you will receive a webhook when the message is delivered or read.

Instead of sending multiple webhooks for each status update, we will send an aggregated webhook.

This means that if you send a message and are set to receive several `read` or `delivered` statuses, we will send you a single, aggregated webhook that contains multiple `status` objects.

Each webhook you receive is only ever in reference to a single message sent to a single group and a single status type.

[Learn more about the Group Message Status webhook](/documentation/business-messaging/whatsapp/groups/webhooks#group-message-status-webhooks)

Did you find this page helpful?

ON THIS PAGE

Overview

Subscribe to groups metadata webhooks

Send group message

Example group message send

Webhooks

Group message sent example

Group message failed example

Receive group messages

Webhooks

Receive group message webhook sample

Receive unsupported group message webhook sample

Pin and unpin group message

Limits

Request Syntax

Request body

Body parameters

Response body

Webhooks

Group message status webhooks

* * *