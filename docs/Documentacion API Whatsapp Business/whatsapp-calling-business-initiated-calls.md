# Business-Initiated Calls

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/business-initiated-calls

---

# Business-Initiated Calls

Updated: Nov 13, 2025

## Overview

The Calling API supports making calls to WhatsApp users from your business.

The user dictates when calls can be received by [granting call permissions to the business phone number](/documentation/business-messaging/whatsapp/calling/user-call-permissions).

### Call sequence diagram

 _Note: The`ACCEPTED` call status webhook will typically arrive after the call has been established. The Cloud API primarily sends it for call event auditing._

## Prerequisites

Before you get started with business-initiated calling, ensure that:

  * [Subscribe](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint#configure-webhooks) to the “calls” webhook field
  * [Calling APIs are enabled on your business phone number](/documentation/business-messaging/whatsapp/calling/call-settings)

Lastly, **before you can call a WhatsApp user, you must obtain their permission to do so.**

[Learn how to obtain WhatsApp user calling permissions here](/documentation/business-messaging/whatsapp/calling/user-call-permissions)

## Business-initiated calling flow

### Part 1: Obtain permission to call the WhatsApp user

You can obtain call permissions from the WhatsApp user in one of the following ways:

#### Send a call permission request message

You can request call permissions by sending the WhatsApp user a permission request. Send it as a free form message during an open customer service window, or use a template message.

  * [Learn how to send a **free form** call permission request](/documentation/business-messaging/whatsapp/calling/user-call-permissions#how-to-send-a-free-form-call-permission-request-message)
  * [Learn how to send a **template** call permission request](/documentation/business-messaging/whatsapp/calling/user-call-permissions#how-to-create-and-send-call-permission-request-template-messages)

#### Enable `callback_permission_status` in call settings

When `callback_permission_status` is enabled, the user automatically provides call permission to your business when they place a call to you.

[Learn how to enable `callback_permission_status`](/documentation/business-messaging/whatsapp/calling/call-settings#configure-update-business-phone-number-calling-settings)

#### WhatsApp user grants permanent permissions

The user can also grant permanent permissions to the business at any time through their business profile.

### Part 2: Your business initiates a new call to the WhatsApp user

Now that you have user permission, you can initiate a new call to the WhatsApp user in question.

You can now call the `POST /calls` endpoint with the following request body to initiate a new call:
    
    
    POST /calls
    {
      "messaging_product": "whatsapp",
      "to":"12185552828", // The WhatsApp user's phone number (callee)
      "action":"connect",
      "session" : {
          "sdp_type" : "offer",
          "sdp" : ">"
      }
    }

If there are no errors, you will receive a successful response:
    
    
    {
      "messaging_product": "whatsapp",
      "calls" : [
         "id" : "wacid.HBgLMTIxODU1NTI4MjgVAgARGCAyODRQIAFRoA", // The WhatsApp call ID
       ]
    }

_Note: Response with error code`138006` indicates a lack of a call request permission for this business number from the WhatsApp user._

### Part 3: You establish the call connection using webhook signaling

After you successfully initiate a new call, you receive a Call Connect webhook response containing an `SDP Answer` from Cloud API. Your business will then apply the `SDP Answer` from this webhook to your WebRTC stack to initiate the media connection.
    
    
    {
        "entry": [
            {
                "changes": [
                    {
                        "field": "calls",
                        "value": {
                            "calls": [
                                {
                                    "biz_opaque_callback_data": "TRx334DUDFTI4Mj", // Arbitrary string passed by business for tracking purposes
                                    "session": {
                                        "sdp_type": "answer",
                                        "sdp": ""
                                    },
                                    "from": "13175551399", // The business phone number placing the call (caller)
                                    "connection": {
                                        "webrtc": {
                                            "sdp": ""
                                        }
                                    },
                                    "id": "wacid.HBgLMTIxODU1NTI4MjgVAgARGCAyODRQIAFRoA", // The WhatsApp call ID
                                    "to": "12185552828", // The WhatsApp user's phone number (callee)
                                    "event": "connect",
                                    "timestamp": "1749196895",
                                    "direction": "BUSINESS_INITIATED"
                                }
                            ],
                            "metadata": { // ID and display number for the business phone number placing the call (caller)
                                "phone_number_id": "436666719526789",
                                "display_phone_number": "13175551399"
                            },
                            "messaging_product": "whatsapp"
                        }
                    }
                ],
                "id": "366634483210360" // WhatsApp Business Account ID associated with the business phone number
            }
        ],
        "object": "whatsapp_business_account"
    },

You then receive an appropriate status webhook, indicating that the call is `RINGING`, `ACCEPTED`, or `REJECTED`:
    
    
    {
      "entry": [
        {
          "changes": [
            {
              "field": "calls",
              "value": {
                "statuses": [
                  {
                    "id": "wacid.HBgLMTIxODU1NTI4MjgVAgARGCAyODRQIAFRoA", // The WhatsApp call ID
                    "type": "call",
                    "status": "[RINGING|ACCEPTED|REJECTED]", // The current call status
                    "timestamp": "1749197000",
                    "recipient_id": "12185552828" // The WhatsApp user's phone number (callee)
                  }
                ],
                "metadata": { // ID and display number for the business phone number placing the call (caller)
                  "phone_number_id": "436666719526789",
                  "display_phone_number": "13175551399"
                },
                "messaging_product": "whatsapp"
              }
            }
          ],
          "id": "366634483210360" // WhatsApp Business Account ID associated with the business phone number
        }
      ],
      "object": "whatsapp_business_account"
    }

### Part 4: Your business or the WhatsApp user terminates the call

Either you or the WhatsApp user can terminate the call at any time.

You call the `POST /calls` endpoint with the following request body to terminate the call:
    
    
    POST /calls  
    {  
      "messaging_product": "whatsapp",  
      "call_id": "wacid.HBgLMTIxODU1NTI4MjgVAgARGCAyODRQIAFRoA", // The WhatsApp call ID  
      "action" : "terminate"  
    }  
      
    

If there are no errors, you will receive a success response:
    
    
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
                  "phone_number_id": "436666719526789",
                  "display_phone_number": "13175551399",
    
                },
                "calls": [
                  {
                    "id": "wacid.HBgLMTIxODU1NTI4MjgVAgARGCAyODRQIAFRoA",
                    "to": "12185552828", // The WhatsApp user's phone number (callee)
                    "from": "13175551399", // The business phone number placing the call (caller)
                    "event": "terminate",
                    "direction": "BUSINESS_INITIATED",
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

## Endpoints for business-initiated calling

### Initiate call

Use this endpoint to initiate a call to a WhatsApp user by providing a phone number and a WebRTC call offer. There is a rate limit of 10000 per 24 hours for initiating new calls per business phone number.

#### Request syntax
    
    
    POST /calls

Placeholder |  Description |  Sample Value   
---|---|---  
``_Integer_| **Required**  
ID of the business phone number from which you are initiating the new call.| `106540352242922`  
  
#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "to": "14085551234",
      "action": "connect",
      "session": {
        "sdp_type": "offer",
        "sdp": ">"
      },
      "biz_opaque_callback_data": "0fS5cePMok"
    }

#### Body parameters

Parameter |  Description |  Sample Value   
---|---|---  
`to` _Integer_| **Required**  
The number being called (callee)[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `“17863476655”`  
`action` _String_| **Required**  
The action being taken on the given call ID.Values can be `connect` | `pre_accept` | `accept` | `reject` | `terminate`| `“connect”`  
`session` _JSON object_| **Optional**  
Contains the session description protocol (SDP) type and description language.Requires two values:`sdp_type` — (_String_) **Required** “offer”, to indicate SDP offer`sdp` — (_String_) **Required** The SDP info of the device on the other end of the call. The SDP must be compliant with [RFC 8866⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc8866&h=AT7WL6dDyzVOfUvfxFCuMa6J9UqL7hlLC5dcP_kKx7A15fZVCfYJ0S0I4ShD-Dl6DrdpZjHQA6lLgGn__p21FMnVRWSRo7HRMwu98r8OqL0gmNhOUCxOdPMyc3LnySqJhUYAF7HcCyUsj3Yz1qGbtQ).[Learn more about Session Description Protocol (SDP)⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8866.html&h=AT7WL6dDyzVOfUvfxFCuMa6J9UqL7hlLC5dcP_kKx7A15fZVCfYJ0S0I4ShD-Dl6DrdpZjHQA6lLgGn__p21FMnVRWSRo7HRMwu98r8OqL0gmNhOUCxOdPMyc3LnySqJhUYAF7HcCyUsj3Yz1qGbtQ)[View example SDP structures](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)| 
    
    
    "session" :
    {
    "sdp_type" : "offer",
    "sdp" : ">"
    }  
  
`biz_opaque_callback_data` _String_| **Optional**  
An arbitrary string you can pass in that is useful for tracking and logging purposes.Any app subscribed to the “calls” webhook field on your WhatsApp Business Account can receive this string, as it is included in the `calls` object within the subsequent [Call Terminate Webhook](/documentation/business-messaging/whatsapp/calling/business-initiated-calls#call-terminate-webhook) payload.Cloud API does not process this field.Maximum 512 characters| `“0fS5cePMok”`  
  
#### Success response
    
    
    {
      "messaging_product": "whatsapp",
      "calls" : [{
         "id" : "wacid.ABGGFjFVU2AfAgo6V",
       }]
    }

#### Error response

Possible errors that can occur:

  * Invalid `phone-number-id`
  * Permissions/Authorization errors
  * Request format validation errors, for example connection info, sdp, ice
  * SDP validation errors
  * Calling restriction errors

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

  

### Terminate call

Use this endpoint to terminate an active call.

This must be done even if there is an `RTCP BYE` packet in the media path. Ending the call this way also ensures pricing is more accurate.

When the WhatsApp user terminates the call, you do not have to call this endpoint. Once the call is successfully terminated, you will receive a [Call Terminate Webhook](/documentation/business-messaging/whatsapp/calling/business-initiated-calls#call-terminate-webhook).

#### Request syntax
    
    
    POST /calls

Parameter |  Description |  Sample Value   
---|---|---  
``_Integer_| **Required**  
The business phone number which you are terminating a call from.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `18274459827`  
  
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
The ID of the phone call.For inbound calls, you receive a call ID from the [Call Connect webhook](/documentation/business-messaging/whatsapp/calling/business-initiated-calls#call-connect-webhook) when a WhatsApp user initiates the call.| `“wacid.ABGGFjFVU2AfAgo6V-Hc5eCgK5Gh”`  
`action` _String_| **Required**  
The action being taken on the given call ID.Values can be `connect` | `pre_accept` | `accept` | `reject` | `terminate`| `“terminate”`  
  
#### Success response
    
    
    {
      "messaging_product": "whatsapp",
      "success" : true
    }

#### Error response

Possible errors that can occur:

  * Invalid `call id`
  * Invalid `phone-number-id`
  * The WhatsApp user has already terminated the call
  * Reject call is already in progress
  * Permissions/Authorization errors

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

## Webhooks for business-initiated calling

With all Calling API webhooks, there is a `”calls”` object inside the `”value”` object of the webhook response. The `”calls”` object contains metadata about the call that is used to action on each call placed or received by your business.

To receive Calling API webhooks, subscribe to the “calls” webhook field.

[Learn more about Cloud API webhooks here](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status)

### Call connect webhook

You receive a webhook notification in near real-time when a call initiated by your business is ready to connect to the WhatsApp user (an `SDP Answer`).

Critically, the webhook contains information required to establish a call connection via WebRTC.

Once you receive the Call Connect webhook, you can apply the `SDP Answer` received in the webhook to your WebRTC stack to initiate the media connection.
    
    
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
                    "direction": "BUSINESS_INITIATED",
                    "session": {
                      "sdp_type": "answer",
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
`session` _JSON object_| **Optional**  
Contains the session description protocol (SDP) type and description language.Requires two values:`sdp_type` — (_String_) **Required** “offer”, to indicate SDP offer`sdp` — (_String_) **Required** The SDP info of the device on the other end of the call. The SDP must be compliant with [RFC 8866⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc8866&h=AT7WL6dDyzVOfUvfxFCuMa6J9UqL7hlLC5dcP_kKx7A15fZVCfYJ0S0I4ShD-Dl6DrdpZjHQA6lLgGn__p21FMnVRWSRo7HRMwu98r8OqL0gmNhOUCxOdPMyc3LnySqJhUYAF7HcCyUsj3Yz1qGbtQ).[Learn more about Session Description Protocol (SDP)⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc8866.html&h=AT7WL6dDyzVOfUvfxFCuMa6J9UqL7hlLC5dcP_kKx7A15fZVCfYJ0S0I4ShD-Dl6DrdpZjHQA6lLgGn__p21FMnVRWSRo7HRMwu98r8OqL0gmNhOUCxOdPMyc3LnySqJhUYAF7HcCyUsj3Yz1qGbtQ)[View example SDP structures](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)  
`contacts` _JSON object_| `wa_id` — The WhatsApp ID of the callee.  
  
  

### Call status webhook

This webhook is sent during the following calling events:

  1. Ringing: When the WhatsApp user’s client device begins ringing
  2. Accepted: When the WhatsApp user accepts the call
  3. Rejected: When the WhatsApp user rejects the call. You also receive the call terminate webhook in this case

The webhook structure here is similar to the Status webhooks used for the Cloud API messages.
    
    
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
                       "phone_number_id": "",
                  },
                  "statuses": [{
                        "id": "wacid.ABGGFjFVU2AfAgo6V",
                        "timestamp": "1671644824",
                        "type": "call"
                        "status": "[RINGING|ACCEPTED|REJECTED]",
                        "recipient_id": "163155536021",
                        "biz_opaque_callback_data": "random_string",
                   }]
              },
              "field": "calls"
            }
          ]
        }
      ]
    }

[_Learn more about Cloud API status webhooks_](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status)

#### Webhook values for `"statuses"`

Placeholder |  Description   
---|---  
`id` _String_|  A unique ID for the call  
`timestamp` _Integer_|  The UNIX timestamp of the webhook event  
`recipient_id` _Integer_|  The phone number of the WhatsApp user receiving the call  
`status` _Integer_|  The current call status.Possible values:`RINGING`: Business initiated call is ringing the user`ACCEPTED`: Business initiated call is accepted by the user`REJECTED`: Business initiated call is rejected by the user  
`biz_opaque_callback_data` _String_|  Arbitrary string your business passes into the call for tracking and logging purposes.Will only be returned if provided through [Initiate New Call API requests](/documentation/business-messaging/whatsapp/calling/business-initiated-calls#initiate-a-new-call)  
  
  

### Call terminate webhook

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
                        "direction": "BUSINESS_INITIATED",
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
`start_time` _Integer_|  The UNIX timestamp of when the call started.Only present when the call was picked up by the other party.  
`end_time` _Integer_|  The UNIX timestamp of when the call ended.Only present when the call was picked up by the other party.  
`duration` _Integer_|  Duration of the call in seconds.Only present when the call was picked up by the other party.  
`biz_opaque_callback_data` _String_|  Arbitrary string your business passes into the call for tracking and logging purposes.Will only be returned if provided through an [Initiate Call API request](/documentation/business-messaging/whatsapp/calling/business-initiated-calls#initiate-call) or [Accept Call request](/documentation/business-messaging/whatsapp/calling/reference#accept-call)  
`errors.code` _Integer_|  The `errors` object is present only for failed calls when there is error information available. Code is one of the [calling error codes](/documentation/business-messaging/whatsapp/calling/troubleshooting#calling-error-codes)  
  
## SDP overview and sample structures

Session Description Protocol (SDP) is a text-based format used to describe the characteristics of multimedia sessions, such as voice and video calls, in real-time communication applications. SDP provides a standardized way to describe the session’s media streams. This includes media type, codecs, protocols, and parameters for establishing and managing the session.

In the context of WebRTC, SDP is used to negotiate the media parameters between the sender and receiver, enabling them to agree on the specifics of the media exchange.

[View SDP sample structures for business-initiated calls](/documentation/business-messaging/whatsapp/calling/reference#sdp-overview-and-sample-sdp-structures)

Did you find this page helpful?

ON THIS PAGE

Overview

Call sequence diagram

Prerequisites

Business-initiated calling flow

Part 1: Obtain permission to call the WhatsApp user

Send a call permission request message

Enable callback_permission_status in call settings

WhatsApp user grants permanent permissions

Part 2: Your business initiates a new call to the WhatsApp user

Part 3: You establish the call connection using webhook signaling

Part 4: Your business or the WhatsApp user terminates the call

Endpoints for business-initiated calling

Initiate call

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

Webhooks for business-initiated calling

Call connect webhook

Webhook values for "calls"

Call status webhook

Webhook values for "statuses"

Call terminate webhook

Webhook values for "calls"

SDP overview and sample structures

* * *