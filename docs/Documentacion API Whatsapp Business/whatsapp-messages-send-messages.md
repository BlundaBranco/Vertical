# Sending messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages

---

# Sending messages

Updated: Nov 4, 2025

This document describes how to use the API to send messages to WhatsApp users.

## Message types

You can use the API to send the following types of messages.

[Address messages](/documentation/business-messaging/whatsapp/messages/address-messages) allow you to easily request a delivery address from WhatsApp users.

  

[Audio messages](/documentation/business-messaging/whatsapp/messages/audio-messages) display an audio icon and a link to an audio file. When the WhatsApp user taps the icon, the WhatsApp client loads and plays the audio file.

  

[Contacts messages](/documentation/business-messaging/whatsapp/messages/contacts-messages) allow you to send rich contact information directly to WhatsApp users, such as names, phone numbers, physical addresses, and email addresses.

  

[Document messages](/documentation/business-messaging/whatsapp/messages/document-messages) display a document icon, linked to a document that a WhatsApp user can tap to download.

  

[Image messages](/documentation/business-messaging/whatsapp/messages/image-messages) display a single image and an optional caption.

  

[Interactive CTA URL button messages](/documentation/business-messaging/whatsapp/messages/interactive-cta-url-messages) allow you to map any URL to a button, so you don’t have to include lengthy or obscure raw URLs in the message body.

  

[Interactive voice call messages](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links/#send-interactive-message-with-a-whatsapp-call-button) allow you to trigger WhatsApp call from users.

  

[Interactive Flow messages](/docs/whatsapp/cloud-api/messages/interactive-flow-messages) allow you to send structured messages that are more natural or comfortable for your customers. For example, you can use WhatsApp Flows to book appointments, browse products, collect customer feedback, get new sales leads, or anything else.

Interactive Flow messages are documented in our [WhatsApp Flows](/docs/whatsapp/flows) documentation set.

  

[Interactive list messages](/documentation/business-messaging/whatsapp/messages/interactive-list-messages) allow you to present WhatsApp users with a list of options to choose from.

  

[Interactive location request messages](/documentation/business-messaging/whatsapp/messages/location-request-messages) display body text and a send location button. When a WhatsApp user taps the button, a location sharing screen appears which the user can use to share their location.

  

[Interactive reply buttons](/documentation/business-messaging/whatsapp/messages/interactive-reply-buttons-messages) messages allow you to send up to three predefined replies for users to choose from.

  

[Location messages](/documentation/business-messaging/whatsapp/messages/location-messages) allow you to send a location’s latitude and longitude coordinates to a WhatsApp user.

  

[Sticker messages](/documentation/business-messaging/whatsapp/messages/sticker-messages) display animated or static sticker images in a WhatsApp message.

  

[Text messages](/documentation/business-messaging/whatsapp/messages/text-messages) are messages containing only a text body and an optional link preview.

  

[Template messages](/documentation/business-messaging/whatsapp/messages/template-messages) allow you to send marketing, utility, and authentication templates to WhatsApp users. Unlike all other message types, template messages do not require a 24-hour customer service window to be open between you and the message recipient before the message can be sent.

  

[Video messages](/documentation/business-messaging/whatsapp/messages/video-messages) display a thumbnail preview of a video image with an optional caption. When the WhatsApp user taps the preview, it loads the video and displays it to the user.

  

[Reaction messages](/documentation/business-messaging/whatsapp/messages/reaction-messages) are emoji-reactions that you can apply to a previous WhatsApp user message that you have received.

## Message quality

Your message quality is based on how messages have been received by WhatsApp users over the past seven days and is weighted by recency. It is determined by a combination of user feedback signals like blocks, reports, mutes, archives, and reasons users provide when they block you.

Guidelines for sending high-quality messages:

  * Make sure your messages follow the [WhatsApp Business Messaging Policy⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fbusiness.whatsapp.com%2Fpolicy&h=AT5xlxmpNpYaPKQIVLQDH9MBWxjbEsiYVlbP3yYBCnXogjQ-WT_mbKSlk7U-v_lUnbPEt5f6m39fSJPi2_guMNsgBs5Tg1B3gKhUlbWyNmgWxh_MAWjCKm5ckHRt7HZEchv6A2F8tjzkyXXAXOebJQ).
  * Only send messages to WhatsApp users who have opted into receiving messages from your business.
  * Make the messages highly personalized and useful to users.
  * Avoid sending open-ended welcome or introductory messages.
  * Avoid sending customers too many messages a day.
  * Optimize your messages for content and length.

Your business phone number’s status, [quality rating⁠](https://www.facebook.com/business/help/896873687365001), and [messaging limits](/documentation/business-messaging/whatsapp/messaging-limits) are displayed in the [WhatsApp Manager⁠](https://business.facebook.com/wa/manage/home/) > **Account tools** > **Phone numbers** panel.

Note that it is normal for numbers with high traffic to experience quality changes within short intervals (even within minutes).

## Customer service windows

Whenever a WhatsApp user messages you or [calls you](/documentation/business-messaging/whatsapp/calling/pricing#how-calling-changes-the-24-hour-customer-service-window), a 24-hour timer called a customer service window starts (or refreshes if one has already been started).

When a customer service window is open between you and a user, you can send **any type of message** to the user. If a window is not open between you and the user, you can only send template messages to the user, as template messages are the only type that can be sent outside of a customer service window.

As a reminder, you can only send messages to users who have [opted-in](/documentation/business-messaging/whatsapp/getting-opt-in) to receiving messages from you.

**Known issue:** In rare cases, you may receive a message from a user but be unable to respond within the customer service window. We apologize for the inconvenience.

## Requests

All send message requests use the [**POST / /messages

The post body varies depending on the type of message you want to send, but the payload uses the following common syntax:
    
    
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "",  
      "to": "",  
      "type": "",  
      "": {}  
    }  
      
    

The `type` property value in the post body payload indicates the type of message to send, and a property matching that type must be included that describes the message’s contents.

The `recipient_type` property can be either `indivudal` for 1:1 messaging, or `group` for group messages.

[Learn more about the Groups API](/documentation/business-messaging/whatsapp/groups)

For example, this is a request to send a [text message](/documentation/business-messaging/whatsapp/messages/text-messages) to a WhatsApp user. Note that `type` is set to `text`, and a `text` object follows, which describes the message’s contents:
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "text",
      "text": {
        "preview_url": true,
        "body": "As requested, here'\''s the link to our latest product: https://www.meta.com/quest/quest-3/"
      }
    }'

Here’s what the message would look like in the WhatsApp client if the text message was successfully delivered to the WhatsApp user:

## Responses

The API will return the following JSON response if it successfully accepts your send message request without encountering any errors in the request itself. Note that this response only indicates that the API successfully **accepted your request** , it does not indicate successful delivery of your message. Message delivery status is communicated via **messages** webhooks instead.

### Response syntax
    
    
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
          "group_id": "",   
          "message_status": ""   
        }  
      ]  
    }  
      
    

### Response contents

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_|  The string identifier of a group made using the Groups API.This field shows when messages are sent, received, or read from a group.[Learn more about the Groups API](/documentation/business-messaging/whatsapp/groups)| `Y2FwaV9ncm91cDoxNzA1NTU1MDEzOToxMjAzNjM0MDQ2OTQyMzM4MjAZD`  
``_String_|  Indicates [template pacing](/documentation/business-messaging/whatsapp/templates/template-pacing) status. The `message_status` property is only included in responses when sending a [template message](/documentation/business-messaging/whatsapp/messages/template-messages) that uses a template that is being paced.| `wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI4MjZGRDA0OUE2OTQ3RkEyMzcA`  
``_String_|  WhatsApp user’s WhatsApp phone number. May not match `wa_id` value.| `+16505551234`  
``_String_|  WhatsApp user’s WhatsApp ID. May not match `input` value.| `16505551234`  
``_String_|  WhatsApp Message ID. This ID appears in associated **messages** webhooks, such as sent, read, and delivered webhooks.| `wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI4MjZGRDA0OUE2OTQ3RkEyMzcA`  
  
## Commerce messages

Commerce messages are interactive messages used in conjunction with a product catalog. See [Share Products With Customers](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services/share-products) to see how to use these types of messages.

## Read receipts

You can let a WhatsApp user know you have read their message by [marking it as read](/documentation/business-messaging/whatsapp/messages/mark-message-as-read), which causes two blue check marks (called “read receipts”) to appear below the user’s message:

## Typing indicators

If it may take you a few seconds or more to respond to a WhatsApp user, you can let them know that you are preparing a response by [display a typing indicator](/documentation/business-messaging/whatsapp/typing-indicators) and read receipts in the WhatsApp client:

## Contextual replies

You can send a message to a WhatsApp user as a [contextual reply](/documentation/business-messaging/whatsapp/messages/contextual-replies), which quotes a previous message in a contextual bubble:

This makes it easier for the user to know which specific message you are replying to.

## Webhooks

Messages sent to WhatsApp users trigger **messages** webhooks, so be sure to subscribe to this topic to receive message status notifications.

## WhatsApp user phone number formats

Plus signs (`+`), hyphens (`-`), parenthesis (`(`,`)`), and spaces are supported in send message requests.

We highly recommend that you include both the plus sign and country calling code when sending a message to a customer. If the plus sign is omitted, your business phone number’s country calling code is prepended to the customer’s phone number. This can result in undelivered or misdelivered messages.

For example, if your business is in India (country calling code `91`) and you send a message to the following customer phone number in various formats:

Number In Send Message Request |  Number Message Delivered To |  Outcome   
---|---|---  
`+16315551234`| `+16315551234`| Correct number  
`+1 (631) 555-1234`| `+16315551234`| Correct number  
`(631) 555-1234`| `+916315551234`| Potentially wrong number  
`1 (631) 555-1234`| `+9116315551234`| Potentially wrong number  
  
Note: For Brazil and Mexico, the extra added prefix of the phone number may be modified by the Cloud API. This is a standard behavior of the system and is not considered a bug.

## Media caching

If you are using a link (`link`) to a media asset on your server (as opposed to the ID (`id`) of an asset you have uploaded to our servers), WhatsApp Cloud API internally caches the asset for a static time period of 10 minutes. We will use the cached asset in subsequent send message requests if the link in subsequent message send payloads is the same as the link in the initial message send payload.

If you don’t want us to reuse the cached asset in a subsequent message within the 10 minute time period, append a random query string to the asset link in the new send message request payload. We will treat this as a new asset, fetch it from your server, and cache it for 10 minutes.

For example:

  * Asset link in 1st send message request: `https://link.to.media/sample.jpg` — asset fetched, cached for 10 minutes
  * Asset link in 2d send message request: `https://link.to.media/sample.jpg` \- use cached asset
  * Asset link in 3rd send message request: `https://link.to.media/sample.jpg?abc123` \- asset fetched, cached for 10 minutes

## Delivery sequence of multiple messages

When sending a series of messages, the order in which messages are delivered is not guaranteed to match the order of your API requests. If you need to ensure the sequence of message delivery, confirm receipt of a `delivered` status in a [status messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhook before sending the next message in your message sequence.

## Message Time-To-Live (TTL)

If we are unable to deliver a message to a WhatsApp user, we will retry the delivery for a period of time known as a time-to-live, TTL, or the message validity period.

### Default TTL

  * All messages except authentication templates: **30 days**.
  * Authentication templates: **10 minutes**

### Customizing TTL for templates

You can customize the default TTL for authentication and utility templates, and for marketing templates sent using the MM Lite API. See our [Time-to-live](/documentation/business-messaging/whatsapp/templates/time-to-live) document to learn how.

### When TTL is Exceeded: Dropped messages

Messages that are unable to be delivered within the default or customized TTL are dropped.

If you do not receive a status messages webhook with `status` set to `delivered` before the TTL is exceeded, assume the message was dropped.

If you send a message that fails (`status` set to `failed`), there could be a minor delay before you receive the webhook, so you may wish to build in a small buffer before assuming the message was dropped.

## Troubleshooting

If you are experiencing problems with message delivery, see [Message Not Delivered](/documentation/business-messaging/whatsapp/support#message-not-delivered).

Did you find this page helpful?

ON THIS PAGE

Message types

Message quality

Customer service windows

Requests

Responses

Response syntax

Response contents

Commerce messages

Read receipts

Typing indicators

Contextual replies

Webhooks

WhatsApp user phone number formats

Media caching

Delivery sequence of multiple messages

Message Time-To-Live (TTL)

Default TTL

Customizing TTL for templates

When TTL is Exceeded: Dropped messages

Troubleshooting

* * *