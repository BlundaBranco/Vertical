# User-initiated calls

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/user-initiated-calls

---

# User-initiated calls

Updated: Nov 13, 2025

## Overview

The Calling API supports receiving calls made by WhatsApp users to your business.

Your business dictates when calls can be received by [configuring business calling hours and holiday unavailability](/documentation/business-messaging/whatsapp/calling/call-settings#parameter-details).

**Consumer device eligibility**

Currently, the WhatsApp Business Calling API can accept calls from a consumer’s primary and companion iPhone or Android phones.

A **primary device** is the consumer’s main device, typically a mobile phone, which holds the authoritative state for the user’s account. It has full access to messaging history and core functionalities. There is exactly one primary device per user account at any given time.

**Companion devices** are additional devices registered to the user’s account that can operate alongside the primary device. Examples include web clients, desktop apps, tablets, and smart glasses. Companion devices have access to some or all messaging history and core features but are limited compared to the primary device. For Cloud API Calling, **only iPhone and Android phone companion devices are supported for user-initiated calls**.

**Callback permission functionality on companion devices**

For businesses that have the [callback setting](/documentation/business-messaging/whatsapp/calling/call-settings#configure-update-business-phone-number-calling-settings) enabled, this functionality is not supported on companion devices yet.

## Prerequisites

Before you get started with user-initiated calling, ensure that:

  * [Subscribe](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint#configure-webhooks) to the **calls** webhook field
  * [Enable Calling API features on your business phone number](/documentation/business-messaging/whatsapp/calling/call-settings)

### Call sequence diagram

## User-initiated calling flow

### Part 1: A WhatsApp user calls your business from their client app

When a WhatsApp user calls your business, a Call Connect webhook will be triggered with an `SDP Offer`:
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "366634483210360", // WhatsApp Business Account ID associated with the business phone number
          "changes": [
            {
              "value": {
                "messaging_product": "whatsapp",
                "metadata": { // ID and display number for the business phone number placing the call (caller)
                  "phone_number_id": "436666719526789",
                  "display_phone_number": "13175551399",
                },
                "calls": [
                  {
                    "id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh", // The WhatsApp call ID
                    "to": "16315553601", // The WhatsApp user's phone number (callee)
                    "from": "13175551399",
                    "event": "connect",
                    "timestamp": "1671644824",
                    "session": {
                      "sdp_type": "offer",
                      "sdp": ">"
                    }
                  }
                ]
              },
              "field": "calls"
            }
          ]
        }
      ]
    }

### Part 2: Your business pre-accepts the call (recommended)

When you pre-accept an inbound call, you allow the calling media connection to be established before attempting to send call media through the connection.

Pre-accepting calls is recommended because it facilitates faster connection times and avoids [audio clipping issues](/documentation/business-messaging/whatsapp/calling/troubleshooting#audio-clipping-issue-and-solution).

To pre-accept, you call the `POST /calls` endpoint with the `call_id` from the previous webhook, an `action` of `pre-accept`, and an `SDP Answer`:
    
    
    POST /calls
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action": "pre_accept",
      "session": {
         "sdp_type": "answer"
         "sdp": ">"
      }
    }

If there are no errors, you’ll receive a success response:
    
    
    {
      "success" : true
    }

### Part 3: Your business accepts the call after the WebRTC connection is made

Once the WebRTC connection is made on your end, you can accept the call.

Once you accept the call, wait until you receive a `200 OK` back from the endpoint. Media will begin flowing immediately since the connection was established prior to call connect.

You can now call the `POST /calls` endpoint with the following request body to accept the call:
    
    
    POST /calls
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action": "accept",
      "session" : {
          "sdp_type" : "answer",
          "sdp" : ">"
       },
    }

### Part 4: Your business or the WhatsApp user terminates the call

Either the business or the WhatsApp user can terminate the call at any time.

You call the `POST /calls` endpoint with the following request body to terminate the call:
    
    
    POST /calls
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action" : "terminate"
    }

If there are no errors, you’ll receive a success response:
    
    
    {
      "success" : true
    }

When either the business or the WhatsApp user terminates the call, you receive a Call Terminate webhook:
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "366634483210360", // WhatsApp Business Account ID associated with the business phone number
          "changes": [
            {
              "value": {
                "messaging_product": "whatsapp",
                "metadata": { // ID and display number for the business phone number placing the call (caller)
                  "phone_number_id": "436666719526789"
                  "display_phone_number": "13175551399",
    
                },
                "calls": [
                  {
                    "id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
                    "to": "16315553601", // The WhatsApp user's phone number (callee)
                    "from": "13175551399", // The business phone number placing the call (caller)
                    "event": "terminate",
                    "direction": "USER_INITIATED",
                    "timestamp": "1749197480",
                    "status": ["Failed", "Completed"],
                    "start_time": "1671644824", // Call start UNIX timestamp
                    "end_time": "1671644944", // Call end UNIX timestamp
                    "duration": 480 // Call duration in seconds
                  }
                ]
              },
              "field": "calls"
            }
          ]
        }
      ]
    }

## Endpoints for user-initiated calling

### Pre-accept call

When you pre-accept an inbound call, you allow the calling media connection to be established before attempting to send call media through the connection.

When you then call the accept call endpoint, media begins flowing immediately since the connection has already been established.

Pre-accepting calls is recommended because it facilitates faster connection times and avoids [audio clipping issues](/documentation/business-messaging/whatsapp/calling/troubleshooting#audio-clipping-issue-and-solution).

There is about 30 to 60 seconds after the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) is sent for the business to accept the phone call. If the business does not respond, the call is terminated on the WhatsApp user side with a “Not Answered” notification and a [Terminate Webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-terminate-webhook) is delivered back to you.

**Note:** Since the WebRTC connection is established before calling the [Accept Call endpoint](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#accept-call), make sure to flow the call media only after you receive a 200 OK response back.

If call media flows too early, the caller will miss the first few words of the call. If call media flows too late, callers will hear silence.

#### Request syntax
    
    
    POST `_Integer_| **Required**  
The business phone number which you are using Calling API features from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `+12784358810`  
  
#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action": "pre_accept",
      "session" : {
          "sdp_type" : "answer",
          "sdp" : ">"
       }
    }

#### Body parameters

Parameter |  Description |  Sample Value   
---|---|---  
`call_id` _String_| **Required**  
The ID of the phone call.For inbound calls, you receive a call ID from the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) when a WhatsApp user initiates the call.| `“wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh”`  
`action` _String_| **Optional**  
The action being taken on the given call ID.Values can be `connect` | `pre_accept` | `accept` | `reject` | `terminate`| `“pre_accept”`  
`session` _JSON object_| **Optional**  
Contains the session description protocol (SDP) type and description language.Requires two values:`sdp_type` — (_String_) **Required** “offer”, to indicate SDP offer`sdp` — (_String_) **Required** The SDP info of the device on the other end of the call. The SDP must be compliant with [RFC 8866⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc8866&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg).[Learn more about Session Description Protocol (SDP)⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8866.html&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg)[View example SDP structures](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)| 
    
    
    "session" :
    {
    "sdp_type" : "offer",
    "sdp" : ">"
    }  
  
#### Success response
    
    
    {
      "messaging_product": "whatsapp",
      "success" : true
    }

#### Error response

Possible errors that can occur:

  * Invalid `call-id`
  * Invalid `phone-number-id`
  * Error related to your payment method
  * Invalid Connection info, for example, SDP or ICE
  * Accept/Reject an already In Progress/Completed/Failed call
  * Permissions/Authorization errors

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

  

### Accept call

Use this endpoint to connect to a call by providing a call agent’s SDP.

You have about 30 to 60 seconds after the [Call Connect Webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) is sent to accept the phone call. If your business does not respond, the call is terminated on the WhatsApp user side with a “Not Answered” notification and a [Terminate Webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-terminate-webhook) is delivered back to you.

#### Request syntax
    
    
    POST `_Integer_| **Required**  
The business phone number which you are using Calling API features from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `+12784358810`  
  
#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action": "accept",
      "session" : {
          "sdp_type" : "answer",
          "sdp" : ">"
       },
       "biz_opaque_callback_data": "random_string"
    }

#### Body parameters

Parameter |  Description |  Sample Value   
---|---|---  
`call_id` _String_| **Required**  
The ID of the phone call.For inbound calls, you receive a call ID from the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) when a WhatsApp user initiates the call.| `“wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh”`  
`action` _String_| **Optional**  
The action being taken on the given call ID.Values can be `connect` | `pre_accept` | `accept` | `reject` | `terminate`| `“accept”`  
`session` _JSON object_| **Optional**  
Contains the session description protocol (SDP) type and description language.Requires two values:`sdp_type` — (_String_) **Required** “offer”, to indicate SDP offer`sdp` — (_String_) **Required** The SDP info of the device on the other end of the call. The SDP must be compliant with [RFC 8866⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc8866&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg).[Learn more about Session Description Protocol (SDP)⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8866.html&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg)[View example SDP structures](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)| 
    
    
    "session" :
    {
    "sdp_type" : "offer",
    "sdp" : ">"
    }  
  
`biz_opaque_callback_data` _String_| **Optional**  
An arbitrary string you can pass in that is useful for tracking and logging purposes.Any app subscribed to the “calls” webhook field on your WhatsApp Business Account can receive this string, as it is included in the `calls` object within the subsequent [Terminate webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-terminate-webhook) payload.Cloud API does not process this field, it just returns it as part of the [Terminate webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-terminate-webhook).Maximum 512 characters| `“8huas8d80nn”`  
  
#### Success response
    
    
    {
      "messaging_product": "whatsapp",
      "success" : true
    }

#### Error response

Possible errors that can occur:

  * Invalid `call-id`
  * Invalid `phone-number-id`
  * Error related to your payment method
  * Invalid Connection info, for example, SDP or ICE
  * Accept/Reject an already In Progress/Completed/Failed call
  * Permissions/Authorization errors
  * SDP answer provided in accept does not match the SDP answer given in the [Pre-Accept endpoint](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#pre-accept-call) for the same `call-id`

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

  

### Reject call

Use this endpoint to reject a call.

You have about 30 to 60 seconds after the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) is sent to accept the phone call. If the business does not respond, the call is terminated on the WhatsApp user side with a “Not Answered” notification and a [Terminate Webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-terminate-webhook) is delivered back to you.

#### Request syntax
    
    
    POST `_Integer_| **Required**  
The business phone number which you are using Calling API features from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `+12784358810`  
  
#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action": "reject"
    }

#### Body parameters

Parameter |  Description |  Sample Value   
---|---|---  
`call_id` _String_| **Required**  
The ID of the phone call.For inbound calls, you receive a call ID from the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) when a WhatsApp user initiates the call.| `“wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh”`  
`action` _String_| **Optional**  
The action being taken on the given call ID.Values can be `connect` | `pre_accept` | `accept` | `reject` | `terminate`| `“reject”`  
  
#### Success response
    
    
    {
      "messaging_product": "whatsapp",
      "success" : true
    }

#### Error response

Possible errors that can occur:

  * Invalid `call-id`
  * Invalid `phone-number-id`
  * Accept/Reject an already In Progress/Completed/Failed call
  * Permissions/Authorization errors

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

  

### Terminate call

Use this endpoint to terminate an active call.

This must be done even if there is an `RTCP BYE` packet in the media path. Ending the call this way also ensures pricing is more accurate.

When the WhatsApp user terminates the call, you do not have to call this endpoint. Once the call is successfully terminated, a [Call Terminate Webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-terminate-webhook) will be sent to you.

#### Request syntax
    
    
    POST `_Integer_| **Required**  
The business phone number which you are using Calling API features from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `+12784358810`  
  
#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "call_id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
      "action": "terminate"
    }

#### Body parameters

Parameter |  Description |  Sample Value   
---|---|---  
`call_id` _String_| **Required**  
The ID of the phone call.For inbound calls, you receive a call ID from the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#call-connect-webhook) when a WhatsApp user initiates the call.| `“wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh”`  
`action` _String_| **Optional**  
The action being taken on the given call ID.Values can be `connect` | `pre_accept` | `accept` | `reject` | `terminate`| `“terminate”`  
  
#### Success response
    
    
    {
      "messaging_product": "whatsapp",
      "success" : true
    }

#### Error response

Possible errors that can occur:

  * Invalid `call-id`
  * Invalid `phone-number-id`
  * Accept/Reject an already In Progress/Completed/Failed call
  * Reject call is already in progress
  * Permissions/Authorization errors

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

## Webhooks for user-initiated calling

With all Calling API webhooks, there is a `”calls”` object inside the `”value”` object of the webhook response. The `”calls”` object contains metadata about the call that is used to action on each call received by your business.

To receive Calling API webhooks, subscribe to the calls webhook field.

[Learn more about Cloud API webhooks here](/documentation/business-messaging/whatsapp/webhooks/overview)

### Call Connect webhook

A webhook notification is sent in near real-time when a call initiated by your business is ready to be connected to the whatsapp user (an `SDP Answer`).

Critically, the webhook contains information required to establish a call connection via WebRTC.

Once you receive the Call Connect webhook, you can apply the `SDP Answer` received in the webhook to your WebRTC stack in order to initiate the media connection.
    
    
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
                  "display_phone_number": "16315553601",
                  "phone_number_id": ""
                },
                "contacts": [
                  {
                    "profile": {
                      "name": ""
                    },
                    "wa_id": "16315553602"
                  }
                ],
                "calls": [
                  {
                    "id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
                    "to": "16315553601",
                    "from": "16315553602",
                    "event": "connect",
                    "timestamp": "1671644824",
                    "direction": "USER_INITIATED",
                    "deeplink_payload": "deeplink_payload",
                    "cta_payload": "cta_payload",
                    "session": {
                      "sdp_type": "offer",
                      "sdp": ">"
                    }
                  }
                ]
              },
              "field": "calls"
            }
          ]
        }
      ]
    }

#### Webhook values for `"calls"`

Placeholder |  Description   
---|---  
`id` _String_|  A unique ID for the call  
`to` _Integer_|  The number being called (callee)  
`from` _Integer_|  The number of the caller  
`event` _Integer_|  The calling event that this webhook is notifying the subscriber of  
`timestamp` _Integer_|  The UNIX timestamp of the webhook event  
`direction` _String_|  The direction of the call being made.Can contain either:`BUSINESS_INITIATED`, for calls initiated by your business.`USER_INITIATED`, for calls initiated by a WhatsApp user.  
`deeplink_payload` _String_|  Arbitrary string specified in `biz_payload` query param on a call deeplink. Will only be returned if call was initiated from a deeplink with such param.See [Call Button Messages and Deep Links ](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links#send-payload-data-in-call-deeplink) for more details.  
`cta_payload` _String_|  Arbitrary string specified in `payload` field on a call button. Will only be returned if call was initiated from a call button with payload.See [Call Button Messages and Deep Links ](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links#send-interactive-message-with-a-whatsapp-call-button) for more details.  
`session` _JSON object_| **Optional**  
Contains the session description protocol (SDP) type and description language.Requires two values:`sdp_type` — (_String_) **Required** “offer”, to indicate SDP offer`sdp` — (_String_) **Required** The SDP info of the device on the other end of the call. The SDP must be compliant with [RFC 8866⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc8866&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg).[Learn more about Session Description Protocol (SDP)⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8866.html&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg)[View example SDP structures](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)  
`contacts` _JSON object_|  Profile information of the callee.Contains two values:`name` — The WhatsApp profile name of the callee.`wa_id` — The WhatsApp ID of the callee.  
  
  

### Call Terminate webhook

A webhook notification is sent whenever the call has been terminated for any reason, such as when the WhatsApp user hangs up, or when the business calls the `POST //calls` endpoint with an action of `terminate` or `reject`.
    
    
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
                       "display_phone_number": "16505553602",
                       "phone_number_id": "",
                  },
                   "calls": [
                    {
                        "id": "wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh",
                        "to": "16315553601",
                        "from": "16315553602",
                        "event": "terminate"
                        "direction": "USER_INITIATED",
                        "deeplink_payload": "deeplink_payload",
                        "cta_payload": "cta_payload",
                        "biz_opaque_callback_data": "random_string",
                        "timestamp": "1671644824",
                        "status" : [FAILED | COMPLETED],
                        "start_time" : "1671644824",
                        "end_time" : "1671644944",
                        "duration" : 120
                    }
                  ],
                  "errors": [
                    {
                        "code": INT_CODE,
                        "message": "ERROR_TITLE",
                        "href": "ERROR_HREF",
                        "error_data": {
                            "details": "ERROR_DETAILS"
                        }
                    }
                  ]
              },
              "field": "calls"
            }
          ]
        }
      ]
    }

#### Webhook values for `"calls"`

Placeholder |  Description   
---|---  
`id` _String_|  A unique ID for the call  
`to` _Integer_|  The number being called (callee)  
`from` _Integer_|  The number of the caller  
`event` _Integer_|  The calling event that this webhook is notifying the subscriber of  
`timestamp` _Integer_|  The UNIX timestamp of the webhook event  
`direction` _String_|  The direction of the call being made.Can contain either:`BUSINESS_INITIATED`, for calls initiated by your business.`USER_INITIATED`, for calls initiated by a WhatsApp user.  
`deeplink_payload` _String_|  Arbitrary string specified in `biz_payload` query param on a call deeplink. Will only be returned if call was initiated from a deeplink with such param.See [Call Button Messages and Deep Links ](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links#send-payload-data-in-call-deeplink) for more details.  
`cta_payload` _String_|  Arbitrary string specified in `payload` field on a call button. Will only be returned if call was initiated from a call button with payload.See [Call Button Messages and Deep Links ](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links#send-interactive-message-with-a-whatsapp-call-button) for more details.  
`start_time` _Integer_|  The UNIX timestamp of when the call started.Only present when the call was picked up by the other party.  
`end_time` _Integer_|  The UNIX timestamp of when the call ended.Only present when the call was picked up by the other party.  
`duration` _Integer_|  Duration of the call in seconds.Only present when the call was picked up by the other party.  
`biz_opaque_callback_date` _String_|  Arbitrary string your business passes into the call for tracking and logging purposes.Will only be returned if provided through an [Initiate Call request](/documentation/business-messaging/whatsapp/calling/reference#initiate-call) or [Accept Call request](/documentation/business-messaging/whatsapp/calling/user-initiated-calls#accept-call)  
`errors.code` _Integer_|  The `errors` object is present only for failed calls when there is error information available. Code is one of the [calling error codes](/documentation/business-messaging/whatsapp/calling/troubleshooting#calling-error-codes)  
  
## Dual tone multi frequency (DTMF) support

**The dialpad provided by the Calling API only supports DTMF use cases.**

It does not support consumer-to-consumer calls and does not change any other calling behaviors. For example, the dialpad cannot be used to dial a number and initiate a call or message on WhatsApp.

WhatsApp Business Calling API supports DTMF tones, with the intention to enable BSP applications to support IVR-based systems.

WhatsApp users can press tone buttons on their client app and these DTMF tones are injected into the WebRTC RTP stream established as a part of the VoIP connection.

Our WebRTC stream conforms to [RFC 4733⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc4733&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg) for the transfer of DTMF Digits via RTP Payload.

There is no webhook for conveying DTMF digits.

### DTMF clock rate

Only 8000 clock rate is supported in our SDPs. For user-initiated calls, our SDP offer includes only 8000 clock rate. For business-initiated calls, your SDP offer should have 8000 clock rate. Even if it is absent, the API still proceeds with 8000 clock rate against payload type 126.

The RTP packets representing DTMF events will use the same timestamp base and sequence number base as the regular audio packets. So you don’t have to worry about differing clock rates between audio packets and DTMF packets. The [duration field⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc4733%23section-2.3.5&h=AT6j4sMRjsRspFbMmjYdrj3itUYKtMtwGSXuSUupod4oZuQBinyRTzR6KYlI6iKdpZnCPdDpRTMv4xP1lI6n8WaqoUVTBmB0Ca11Hz6hJC7RRtfVRMeh7N_DRavknZ8k-3E5R3rH9we6pqDdLz8kdg) of the DTMF packet is calculated using 8000 clock units.

The API does not support 48000 clock rate for DTMF.

### Sending DTMF digits on consumer WhatsApp client

WhatsApp client applications are enhanced to have a dialpad for calls with CloudAPI business phone numbers. The WhatsApp user can press the buttons on the dialpad and send DTMF tones.

## SDP overview and sample SDP structures

Session Description Protocol (SDP) is a text-based format used to describe the characteristics of multimedia sessions, such as voice and video calls, in real-time communication applications. SDP provides a standardized way to convey information about the session’s media streams, including the type of media, codecs, protocols, and other parameters necessary for establishing and managing the session.

In the context of WebRTC, SDP is used to negotiate the media parameters between the sender and receiver, enabling them to agree on the specifics of the media exchange.

[View SDP sample structures for user-initiated calls](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)

Did you find this page helpful?

ON THIS PAGE

Overview

Prerequisites

Call sequence diagram

User-initiated calling flow

Part 1: A WhatsApp user calls your business from their client app

Part 2: Your business pre-accepts the call (recommended)

Part 3: Your business accepts the call after the WebRTC connection is made

Part 4: Your business or the WhatsApp user terminates the call

Endpoints for user-initiated calling

Pre-accept call

Request syntax

Request body

Body parameters

Success response

Error response

Accept call

Request syntax

Request body

Body parameters

Success response

Error response

Reject call

Request syntax

Request body

Body parameters

Success response

Error response

Terminate call

Request syntax

Request body

Body parameters

Success response

Error response

Webhooks for user-initiated calling

Call Connect webhook

Webhook values for "calls"

Call Terminate webhook

Webhook values for "calls"

Dual tone multi frequency (DTMF) support

DTMF clock rate

Sending DTMF digits on consumer WhatsApp client

SDP overview and sample SDP structures

* * *