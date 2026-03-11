# Configure Call Settings

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/call-settings

---

# Configure Call Settings

Updated: Feb 25, 2026

**Calling is not enabled by default on a business phone number**

Use the `POST //settings` endpoint to enable Calling API features on a business phone number.

**Calling Eligibility**

To qualify for Calling API features, your business must have a messaging limit of at least 2000 business-initiated conversations in a rolling 24-hour period.

[Learn more about Quality Ratings and Messaging Limits](/documentation/business-messaging/whatsapp/messaging-limits)

When you test your WhatsApp Calling integration using public test numbers (PTNs) and sandbox accounts, Calling API restrictions are relaxed.

[Learn more about testing your WhatsApp Calling API integration](/documentation/business-messaging/whatsapp/calling#testing-and-sandbox-accounts)

## Overview

Use these endpoints to view and configure call settings for the WhatsApp Business Calling API.

You can also [configure session initiation protocol (SIP)](/documentation/business-messaging/whatsapp/calling/sip) for call signaling instead of using Graph API endpoint calls and webhooks.

## Configure/Update business phone number calling settings

Use this endpoint to update call settings configuration for an individual business phone number.

**WhatsApp clients reflecting latest calling config**

After you update call configuration, WhatsApp users may take up to 7 days to reflect those changes. Most users refresh much sooner. You can force an immediate refresh in WhatsApp by entering the chat window with business and open the chat info page. Regardless of WhatsApp client behavior, the semantics of settings are still honored on the server side.

### Request syntax
    
    
    POST //settings

### Endpoint parameters

  

Placeholder |  Description |  Sample Value   
---|---|---  
``_Integer_| **Required**  
The business phone number for which you are updating Calling API settings.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `+12784358810`  
  
### Request body
    
    
    {  
      "calling": {  
        "status": "ENABLED",  
        "call_icon_visibility": "DEFAULT",  
        "call_icons": {  
          "restrict_to_user_countries": [  
            "US",  
            "BR"  
          ]  
        },  
        "call_hours": {  
          "status": "ENABLED",  
          "timezone_id": "America/Manaus",  
          "weekly_operating_hours": [  
            {  
              "day_of_week": "MONDAY",  
              "open_time": "0400",  
              "close_time": "1020"  
            },  
            {  
              "day_of_week": "TUESDAY",  
              "open_time": "0108",  
              "close_time": "1020"  
            }  
          ],  
          "holiday_schedule": [  
            {  
              "date": "2026-01-01",  
              "start_time": "0000",  
              "end_time": "2359"  
            }  
          ]  
        },  
        "callback_permission_status": "ENABLED",  
        "sip": {  
          "status": "ENABLED | DISABLED (default)",  
          "servers": [  
            {  
              "hostname": SIP_SERVER_HOSTNAME,  
              "port": SIP_SERVER_PORT,  
              "request_uri_user_params": {  
                "KEY1": "VALUE1",  
                "KEY2": "VALUE2"  
              }  
            }  
          ]  
        }  
      }  
    }  
      
    

### Body parameters

Parameter |  Description |  Sample Value   
---|---|---  
`status` _String_| **Optional**  
Enable or disable the Calling API for the given business phone number.| `“ENABLED”``“DISABLED”`  
`call_icon_visibility` _String_| **Optional**  
Configure whether the WhatsApp call button icon displays for users when chatting with the business.[View call icon visibility behavior details below](/documentation/business-messaging/whatsapp/calling/call-settings#call-icons)| [View call icon visibility behavior details below](/documentation/business-messaging/whatsapp/calling/call-settings#call-icons)  
`call_icons` _String_| **Optional**  
Configure whether WhatsApp call button icon displays for users when chatting with the business.[View call icons visibility behavior details below](/documentation/business-messaging/whatsapp/calling/call-settings#call-icons)| [View call icons behavior details below](/documentation/business-messaging/whatsapp/calling/call-settings#call-icons)  
`call_hours` _JSON object_| **Optional**  
Allows you to specify and trigger call settings for incoming calls based on your timezone, business operating hours, and holiday schedules.Any previously configured values in `call_hours` will be replaced with the values passed in the request body of this API call.[View call hours behavior details below](/documentation/business-messaging/whatsapp/calling/call-settings#call-hours)| [View call hours behavior details below](/documentation/business-messaging/whatsapp/calling/call-settings#call-hours)  
`callback_permission_status` _String_| **Optional**  
Configure whether a WhatsApp user is prompted with a call permission request after calling your business.Note: The call permission request is triggered from either a missed or connected call.[View callback permission status behavior details below ](/documentation/business-messaging/whatsapp/calling/call-settings#callback-permissions)| `“ENABLED”``“DISABLED”`  
`sip` _JSON object_| **Optional**  
Configure call signaling via signal initiation protocol (SIP).**Note: When SIP is enabled, you cannot use calling related endpoints and will not receive calling related webhooks.**[Learn how to configure and use SIP call signaling](/documentation/business-messaging/whatsapp/calling/sip)| 
    
    
    "sip": {  
      "status": "ENABLED | DISABLED (default)",  
      "servers": [ // one server per app]  
        {  
          "hostname": SIP_SERVER_HOSTNAME  
          "port": SIP_SERVER_PORT,  
          "request_uri_user_params": {  
            "KEY1": "VALUE1", // for cases like TGRP  
            "KEY2": "VALUE2",  
          }  
        }  
      ]  
    }  
      
      
  
### Calling status

When the `status` parameter is set to `“ENABLED”`, calling features are enabled for the business phone number. WhatsApp client applications will render the call button icon in both the business chat and business chat profile.

When the `status` parameter is set to `“DISABLED”`, calling features are **disabled** , and both the business chat and business chat profile **do not display the call button icon.**

Updates to `status` will update the call button icon in existing business chats in near real-time when the business phone number is in the WhatsApp user’s contacts.

Otherwise, updates are real-time for a limited number of users in conversation with the business, and are eventual for the rest of the conversations.

#### Call button icon visibility

When Calling API features are enabled for a business number, you can still choose whether to show the call button icon or not by using the `call_icon_visibility` parameter. Note: Disabling call button icon visibility **does not** disable a WhatsApp user’s ability to make unsolicited calls to your business.

The behavior for supported options is as follows:

`DEFAULT`

The Call button icon will be displayed in the chat menu bar and the business info page, allowing for unsolicited calls to the business by WhatsApp users.

`DISABLE_ALL`

The call button icon is hidden in the chat menu bar and the business info page, and all other entry points external to the chat are also disabled. Consumers cannot make unsolicited calls to the business.

Your business can still [send interactive messages](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links#send-interactive-message-with-a-whatsapp-call-button) or [template messages](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links#create-and-send-whatsapp-call-button-template-message) with a Calling API CTA button.

### Callback permissions

Calling a WhatsApp user requires explicit permission from the user. One way to obtain calling permissions is to request permission when a WhatsApp user calls your business.

You can configure the call permission UI to automatically show in the WhatsApp user’s client app when they call your business number. The user may change their permission selection at any time.

### Call icons

With the `call_icons` setting, you can specify the countries where these icons should show up.
    
    
    "call_icons": {  
      "restrict_to_user_countries": [  
        "US",  
        "BR"  
      ]  
    }  
      
    

Parameter |  Description |  Sample Values   
---|---|---  
`restrict_to_user_countries` _List of Strings_| **Optional**  
Restrict the visibility of call icons to these countries._NOTE: For example if you restrict it to “US,” then it will apply to all the people who have a US registered phone number. These people could be physically located inside or outside of the USA._|  Restrict to US and Brazil:
    
    
    "restrict_to_user_countries": [  
      "US",  
      "BR"  
    ]  
      
    

No restriction:
    
    
    "restrict_to_user_countries": []  
      
      
  
### Call hours

With the `call_hours` setting, you can specify the timezone, business operating hours, and holiday schedules that will be enforced for all user-initiated calls.

Configuring this setting restricts calls only to available weekly hours you configure. User-initiated calls are unavailable outside of the weekly hours and holiday schedules you set.

The WhatsApp client app will show users an option to chat with the business, or request a callback, if `callback_permission_status` is `ENABLED`. The user will also be shown the next available calling slot on the option screen.
    
    
    "call_hours": {  
      "status": "ENABLED",  
      "timezone_id": "America/Manaus",  
      "weekly_operating_hours": [  
        {  
          "day_of_week": "MONDAY",  
          "open_time": "0400",  
          "close_time": "1020"  
        },  
        {  
          "day_of_week": "TUESDAY",  
          "open_time": "0108",  
          "close_time": "1020"  
        }  
      ],  
      "holiday_schedule": [  
        {  
          "date": "2026-01-01",  
          "start_time": "0000",  
          "end_time": "2359"  
        }  
      ]  
    }  
      
    

Parameter |  Description |  Sample Values   
---|---|---  
`status` _String_| **Required**  
Enable or disable the call hours for the business.If call hours are disabled, the business is considered open all 24 hours of the day, 7 days a week.| `“ENABLED”``“DISABLED”`  
`timezone_id` _String_| **Required**  
The timezone that the business is operating within.[Learn more about supported values for `timezone_id`](/docs/facebook-business-extension/fbe/reference#time-zones)| `“America/Menominee”``“Asia/Singapore”`  
`weekly_operating_hours` _List of JSON object_| **Required**  
The operating hours schedule for each day of the week.Each entry is a JSON object with 3 key/value pairs:`day_of_week` — (_Enum_) **[Required]** The day of the week.Can take one of seven values: `"MONDAY"`, `“TUESDAY”`, `“WEDNESDAY”`, `“THURSDAY”`, `“FRIDAY”`, `“SATURDAY”`, `“SUNDAY”`| `open_time`| `close_time` — (_Integer_) **[Required]**  
---|---  
  
Opening and closing times represented in 24 hour format, for example `"1130"` = 11:30AM

  * Maximum of 2 entries allowed per day of week
  * `open_time` must be before `close_time`
  * Overlapping entries not allowed

    
    
    {  
    "day_of_week": "MONDAY",  
    "open_time": "0400",  
    "close_time": "1020"  
    },  
    {  
    "day_of_week":"TUESDAY",  
    "open_time": "0108",  
    "close_time": "1020"  
    }  
    ...  
      
      
  
`holiday_schedule` _String_| **Optional**  
An optional override to the weekly schedule.Up to 20 overrides can be specified.Note: If `holiday_schedule` is not passed in the request, then the existing `holiday_schedule` will be deleted and replaced with an empty schedule.`date` — (_String_) **[Required]** Date for which you want to specify the override.YYYY-MM-DD format.| `open_time`| `close_time` — (_Integer_) **[Required]**  
---|---  
  
Opening and closing times represented in 24 hour format, for example, `”1130”` = 11:30AM

  * Maximum of 2 entries allowed per day of week
  * `open_time` must be before `close_time`
  * Overlapping entries not allowed

    
    
    {  
    "date": "2026-01-01",  
    "start_time": "0000",  
    "end_time": "2359",  
    }  
    ...  
      
      
  
### Success response
    
    
    {  
      "success": true  
    }  
      
    

### Error response

Possible errors that can occur:

  * Permissions/Authorization errors
  * Invalid status
  * Invalid schedule for `call_hours`
  * Holiday given in `call_hours` is a past date
  * Timezone is invalid in `call_hours`
  * `weekly_operating_hours` in `call_hours` cannot be empty
  * Date format in `holiday_schedule` for call_hours is invalid
  * More than 2 entries not allowed in `weekly_operating_hours` schedule in `call_hours`
  * Overlapping schedule in `call_hours` is not allowed

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

## Get phone number calling settings

Use this endpoint to check the configuration of your Calling API feature settings.

This endpoint can return information for other Cloud API feature settings.

### Request syntax
    
    
    GET //settings

### Endpoint parameters

  

Parameter |  Description |  Sample Value   
---|---|---  
``_Integer_| **Required**  
The business phone number for which you are getting Calling API settings.[Learn more about formatting phone numbers in Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)| `124545784358810`  
  
### App permission required

`whatsapp_business_management`: Advanced access is required to use the API for end business clients

### Response body
    
    
    {  
      "calling": {  
        "status": "ENABLED",  
        "call_icon_visibility": "DEFAULT",  
        "callback_permission_status": "ENABLED",  
        "call_hours": {  
          "status": "ENABLED",  
          "timezone_id": "[REDACTED]",  
          "weekly_operating_hours": [  
            {  
              "day_of_week": "MONDAY",  
              "open_time": "0400",  
              "close_time": "1020"  
            },  
            {  
              "day_of_week": "TUESDAY",  
              "open_time": "0108",  
              "close_time": "1020"  
            }  
          ],  
          "holiday_schedule": [  
            {  
              "date": "2026-01-01",  
              "start_time": "0000",  
              "end_time": "2359"  
            }  
          ]  
        },  
        "sip": {  
          "status": "ENABLED",  
          "servers": [  
            {  
              "hostname": "[REDACTED]",  
              "sip_user_password": "[REDACTED]"  
            }  
          ]  
        }  
      },  
        
    }  
      
    

### Include SIP user password in response

Optionally, you can include SIP user credentials in your response body by adding the SIP credentials query parameter in the POST request:
    
    
    GET //settings?include_sip_credentials=true

Where the response will look like this:
    
    
    {  
      "calling": {  
        ... // other calling api settings  
        "sip": {  
          "status": "ENABLED",  
          "servers": [  
            {  
              "hostname": "sip.example.com",  
              "sip_user_password": "{SIP_USER_PASSWORD}"  
            }  
          ]  
        }  
      }  
    }  
      
    

### Response details

The `GET //settings` endpoint returns Calling API settings, along with other configuration information for your WhatsApp business phone number.

[Learn more about Calling API settings and their values](/documentation/business-messaging/whatsapp/calling/call-settings#body-parameters)

#### Response with calling restrictions

If your business has restrictions enforced, the response body contains information about the restriction along with other calling API settings.
    
    
     {  
       "calling": {  
         ... // other calling api settings  
         "restrictions": {  
           "restrictions_list": [  
             {  
               "type": "[RESTRICTED_BUSINESS_INITIATED_CALLING|RESTRICTED_USER_INITIATED_CALLING]",  
               "reason": "Business|User initiated calling capability has been temporarily disabled for this phone number due to high negative feedback from users.",  
               "expiration": 1754072386  
             }  
           ]  
         }  
       }  
    }  
      
    

Parameter |  Description   
---|---  
``_JSON Object_|  The restrictions object contains the following values: `restriction_list` _(JSON Object)_ : list of currently imposed restrictions with the following values   
`type` _(string)_ \- for calling restriction, this would have the value of `RESTRICTED_BUSINESS_INITIATED_CALLING` or `RESTRICTED_USER_INITIATED_CALLING``reason` _(string)_ \- description of restriction`expiration` _(Integer)_ \- The UNIX time at which the restriction will expire in UTC timezone  
  
### Error response

Possible errors that can occur:

  * Permissions/Authorization errors

[View Calling API Error Codes and Troubleshooting for more information](/documentation/business-messaging/whatsapp/calling/troubleshooting)

[View general Cloud API Error Codes here](/documentation/business-messaging/whatsapp/support/error-codes)

## Call settings in WhatsApp Manager

You can also control your call settings via [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/).

To access calling controls in WhatsApp Manager:

  1. Click on **Account tools** > **Phone numbers** panel
  2. Click the gear icon next to the phone number you are using for calling
  3. Click the **Calls** tab

## Configure and use call signaling via session initiation protocol (SIP)

Session Initiation Protocol (SIP) is a signaling protocol used for initiating, maintaining, modifying, and terminating real-time communication sessions between two or more endpoints. You can send and receive call signals using SIP instead of Graph API endpoints.

[Learn more about how to use and configure SIP](/documentation/business-messaging/whatsapp/calling/sip)

## Settings update webhooks

You can subscribe to a new webhook subscription field `account_settings_update` to get notified on updates to phone number settings.

  * You’ll be notified even for your own updates
  * Currently, only changes to calling settings are supported. Under the calling object, only changes to these fields are observed: status, call_icon_visibility, callback_permission_status, sip.status, and srtp_key_exchange_protocol.

### Steps to get started

  * [Set up your webhook subscription](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint#configure-webhooks) and subscribe to the `account_settings_update` field.
  * The same app should also be subscribed to the WhatsApp Business Account of your business phone number.
  * Your app should have `whatsapp_business_management` permission to receive the webhooks. Using access token for the same app, if you’re able to [get settings](/documentation/business-messaging/whatsapp/calling/call-settings#get-phone-number-calling-settings) successfully, your app is good to receive the webhooks too.

### Webhook payload
    
    
    {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "id": "whatsapp-business-account-id",
                "changes": [
                    {
                        "value": {
                            "messaging_product": "whatsapp",
                            "timestamp": "1671644824",
                            "type": "[phone_number_settings]",
                            "phone_number_settings": {
                                "phone_number_id": "phone-number-id",
                                "calling": {
                                    "status": "ENABLED",
                                    "call_icon_visibility": "DEFAULT",
                                    "callback_permission_status": "ENABLED",
                                    "call_hours": {
                                        "status": "ENABLED",
                                        "timezone_id": "[REDACTED]",
                                        "weekly_operating_hours": [
                                            {
                                                "day_of_week": "MONDAY",
                                                "open_time": "0400",
                                                "close_time": "1020"
                                            },
                                            {
                                                "day_of_week": "TUESDAY",
                                                "open_time": "0108",
                                                "close_time": "1020"
                                            }
                                        ],
                                        "holiday_schedule": [
                                            {
                                                "date": "2026-01-01",
                                                "start_time": "0000",
                                                "end_time": "2359"
                                            }
                                        ]
                                    },
                                    "sip": {
                                        "status": "ENABLED",
                                        "servers": [
                                            {
                                                "hostname": "[REDACTED]",
                                                "port": SIP_SERVER_PORT
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        "field": "account_settings_update"
                    }
                ]
            }
        ]
    }

### Webhook values

Placeholder |  Description   
---|---  
`messaging_product` _String_|  Always `whatsapp` for now  
`timestamp` _Integer_|  Time when the settings got updated  
`type` _String_|  Type of the change. Currently only `PHONE_NUMBER_SETTINGS`  
`phone_number_settings` _Object_|  This field is present if the type is `PHONE_NUMBER_SETTINGS`. Currently only `calling` sub-field under this is supported.  
`phone_number_settings.phone_number_id` _String_|  The phone number id, whose settings got updated  
`phone_number_settings.calling` _Object_|  This is present only if fields related to `calling` are updated. It’s null otherwise. When present, the payload is same as [Get settings API](/documentation/business-messaging/whatsapp/calling/call-settings#get-phone-number-calling-settings)  
  
## Calling restrictions for user feedback

If your calls receive a high negative user feedback, such as blocks and reports, business initiated calling, user initiated calling, or both functionalities on your phone number can be restricted.

### Early warning

You will be notified when the business phone number is close to being paused as an early warning. The early warning notifications will be communicated via below channels

#### Email

Enforcement emails are sent to the email addresses of all users and admins associated with the business. If you did not receive an email, confirm which email you have designated as the contact email for your app and make sure that it is active, can receive new email, and does not flag the email as junk or spam mail.

#### Webhook

A webhook will be sent on the `account_update` field:
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "0",  
          "time": 1623862418,  
          "changes": [  
            {  
              "field": "account_update",  
              "value": {  
                "phone_number": "PN",  
                "event": "ACCOUNT_VIOLATION",  
                "violation_info": {  
                   "violation_type": "[LOW_BUSINESS_INITIATED_CALLING_QUALITY|LOW_USER_INITIATED_CALLING_QUALITY]",  
                }  
              }  
            }  
          ]  
        }  
      ]  
    }  
      
    

If either business or user initiated calling are close to being paused, you will receive a webhook for the respective violation type. Refer [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) for information about the webhook.

### Pause in calling functionality

Once the negative user feedback reaches a threshold, Cloud API will automatically restrict calling functionality on your phone number for a period of 7 days. While paused the calling phone number will be unable to

  *  _Make business initiated calls to users_
  *  _Send call permissions requests_

Once your phone number has been paused, notifications will be communicated via below channels.

Note: Any call permissions approved or declined by the users while paused, will still be valid.

#### Email

Enforcement emails are sent to the email addresses of all users and admins associated with the business. If you did not receive an email, confirm which email you have designated as the contact email for your app and make sure that it is active, can receive new email, and does not flag the email as junk or spam mail.

#### Webhook

A webhook will be sent on the `account_update` field:
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "0",  
          "time": 1641848059,  
          "changes": [  
            {  
              "field": "account_update",  
              "value": {  
                "phone_number": "PN",  
                "event": "ACCOUNT_RESTRICTION",  
                "restriction_info": [  
                  {  
                    "restriction_type": "RESTRICTED_BUSINESS_INITIATED_CALLING",  
                    "expiration": 1641848057  
                  }  
                ]  
              }  
            }  
          ]  
        }  
      ]  
    }  
      
    

Refer [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) for information about the webhook.

### Pause in user initiated calling functionality

Once the negative user feedback reaches a threshold, Cloud API will automatically restrict user initiated calling functionality on your phone number for a period of 7 days. While paused the calling phone number will be unable to

  *  _Receive calls from users_
  *  _Have call icon visible_

Once your phone number has been paused, notifications will be communicated via below channels.

#### Email

Enforcement emails are sent to the email addresses of all users and admins associated with the business. If you did not receive an email, confirm which email you have designated as the contact email for your app and make sure that it is active, can receive new email, and does not flag the email as junk or spam mail.

#### Webhook

A webhook will be sent on the `account_update` field:
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "0",  
          "time": 1641848059,  
          "changes": [  
            {  
              "field": "account_update",  
              "value": {  
                "phone_number": "PN",  
                "event": "ACCOUNT_RESTRICTION",  
                "restriction_info": [  
                  {  
                    "restriction_type": "RESTRICTED_USER_INITIATED_CALLING",  
                    "expiration": 1641848057  
                  }  
                ]  
              }  
            }  
          ]  
        }  
      ]  
    }  
      
    

Refer [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) for information about the webhook.

## Calling restrictions for low call pickup rates

When calling is enabled on your business phone number, you are expected to pick up calls that users place to you.

If a significant number of calls placed to your calling-enabled business phone number are not picked up, you will be notified and expected to make a change.

### What happens if you do not pick up calls

  1. **Warning via Email:** You receive an email notification with options to change how you handle incoming calls.
  2. **Calling becomes restricted on the business phone number:** The calling button will be hidden from users.

### How to mitigate the situation

####  _If you receive a warning_  

  * **Continue allowing users to call:**
    * Please identify and address the cause of calls not being picked up and make sure you are properly resourced to handle expected call volumes.
  * **Hide call buttons for user-initiated calls:**
    * You can do so either by working with your partner or going to [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/overview/) > Account tools > Phone numbers > select Phone number [WA phone number] > Calls > toggle off Display call buttons.
  * **Turn off calling altogether:**
    * You can do so either by working with your partner or going to [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/overview/) > Account tools > Phone numbers > select Phone number [WA phone number] > Calls > toggle off Allow voice calls.

#### _If the call button is hidden for the business phone number_  

  * **Re-display calling buttons:**
    * Please identify and address the cause of calls not being picked up and make sure you are properly resourced to handle expected call volumes.
    * Next, display the calling buttons by either working with your partner or going to [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/overview/) > Account tools > Phone numbers > select Phone number [WA phone number] > Calls > toggle on Display call buttons.
  * **Turn off calling altogether:**
    * You can do so either by working with your partner or going to [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/overview/) > Account tools > Phone numbers > select Phone number [WA phone number] > Calls > toggle off Allow voice calls.

### Webhooks

#### Warning webhook
    
    
    [  
      {  
        "object": "whatsapp_business_account",  
        "entry": [  
          {  
            "id": "0",  
            "time": 1641848059,  
            "changes": [  
              {  
                "field": "account_update",  
                "value": {  
                  "phone_number": "16505552771",  
                  "event": "ACCOUNT_VIOLATION",  
                  "violation_info": {  
                    "violation_type": "USER_INITIATED_CALLS_LOW_PICKUP_RATE",  
                    "remediation": "Please identify and address the cause of user-initiated calls not being picked up and make sure the business is properly resourced to handle expected call volumes."  
                  }  
                }  
              }  
            ]  
          }  
        ]  
      }  
    ]  
      
    

#### Enforcement webhook
    
    
    [  
      {  
        "object": "whatsapp_business_account",  
        "entry": [  
          {  
            "id": "0",  
            "time": 1641848059,  
            "changes": [  
              {  
                "field": "account_update",  
                "value": {  
                  "phone_number": "16505552771",  
                  "event": "ACCOUNT_RESTRICTION",  
                  "restriction_info": [  
                    {  
                      "restriction_type": "RESTRICTED_USER_INITIATED_CALLING_CALL_BUTTON_HIDDEN",  
                      "remediation": "The call button has been hidden due to low pickup rates. Please identify and address the cause of user-initiated calls not being picked up.  Next, display the calling buttons by either working with your partner or going to WhatsApp Manager > Account tools > Phone numbers > select Phone number > Calls > toggle on Display call buttons"  
                    }  
                  ]  
                }  
              }  
            ]  
          }  
        ]  
      }  
    ]  
      
    

Did you find this page helpful?

ON THIS PAGE

Overview

Configure/Update business phone number calling settings

Request syntax

Endpoint parameters

Request body

Body parameters

Calling status

Call button icon visibility

Callback permissions

Call icons

Call hours

Success response

Error response

Get phone number calling settings

Request syntax

Endpoint parameters

App permission required

Response body

Include SIP user password in response

Response details

Response with calling restrictions

Error response

Call settings in WhatsApp Manager

Configure and use call signaling via session initiation protocol (SIP)

Settings update webhooks

Steps to get started

Webhook payload

Webhook values

Calling restrictions for user feedback

Early warning

Email

Webhook

Pause in calling functionality

Email

Webhook

Pause in user initiated calling functionality

Email

Webhook

Calling restrictions for low call pickup rates

What happens if you do not pick up calls

How to mitigate the situation

If you receive a warning

If the call button is hidden for the business phone number

Webhooks

Warning webhook

Enforcement webhook

* * *