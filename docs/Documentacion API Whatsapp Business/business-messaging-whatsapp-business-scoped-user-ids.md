# Business-scoped user IDs

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids

---

# Business-scoped user IDs

Updated: Feb 6, 2026

**February 6, 2026 update**

  * Multiple changes have been added. These are listed in the Document changelog.
  * It is recommended that you begin capturing business-scoped user IDs (BSUIDs) and mapping them to WhatsApp user phone numbers as soon as possible.
  * In order to aid you with testing, starting February 16, 2026, test BSUIDs will appear in test messages webhooks triggered via the App Dashboard.
  * Starting March 31, 2026, messages webhooks will begin including users’ actual BSUIDs.

WhatsApp is launching usernames later in 2026.

Usernames are an optional feature for users and businesses. If a username is adopted by a WhatsApp user, their username will be displayed instead of their phone number in the app. Business usernames are not intended for privacy, however. If you adopt a business username, it will not cause your business phone number to be hidden in the app.

To support usernames, Meta will share a new backend user identifier called business-scoped user ID, or BSUID. BSUID uniquely identifies a WhatsApp user and is tied to a specific business.

This document describes how the addition of usernames will impact API requests, API responses, and webhook payloads. Additional changes to support usernames before the feature is made available will be recorded here.

**Any changes described in this document are subject to change.**

## User usernames

A user username is a unique, optional name that WhatsApp users can set in order to display their username instead of their phone number in the app. Usernames can be used in lieu of profile names when personalizing message content for individual users.

WhatsApp users are limited to 1 username, but are able to change them periodically. Changing a username does not affect the user’s phone number or business-scoped user ID, and does not affect the user’s ability to communicate with other WhatsApp users or businesses on the WhatsApp Business Platform.

Usernames are assigned to the `username` property in API responses and webhooks payloads. Once enabled, a WhatsApp user’s username will appear in all incoming [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages#incoming-messages) webhooks, and all **delivered** and **read**  [status messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks.

## Business-scoped user ID

BSUIDs will begin appearing in webhooks starting March 31, 2026.

A BSUID is a unique user identifier that can be used to message a WhatsApp user when you don’t know their phone number. BSUID will be assigned to the `user_id` parameter and appear in all messages webhooks, regardless of whether or not the user has enabled the username feature.

BSUIDs are scoped to individual business portfolios. This means that any business phone number owned by a given portfolio can be used to message a BSUID scoped to the same portfolio, and attempts to message the BSUID using a phone number owned by a different portfolio will fail.

BSUIDs will be:

  * generated automatically
  * prefixed with the user’s [ISO 3166 alpha-2⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fiso-3166-country-codes.html&h=AT6Ea8-M_LpWC3BbxCOURUbrdqbgrGnSY9LVje8uTiGy-YK53MCmuUkXcahDkiBNDJaTEM-y6kna6NdOekCy2q6d9kbL3X3GJRTHACpTdD0LK8h91IWeHousl57BJS1ScxmlrMmAJ-eyyy877o9kxg) two-letter country code and a period, followed by up to 128 alphanumeric characters (for example, `US.13491208655302741918`)
  * unique to each business portfolio-user pair ([business portfolios⁠](https://www.facebook.com/business/help/486932075688253) were formerly known as Business Managers)
  * regenerated if a user changes their phone number (which trigger a system status messages webhook)

BSUIDs can be used to send any type of message except for one-tap, zero-tap, and copy code [authentication templates](/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates), which require user phone numbers.

When making API requests with BSUIDs, use the entire BSUID value: country code, period, and all alpha numeric characters. Omitting or changing the country code, period, or alpha numeric characters will cause your request to fail.

If you are a managed business with multiple business portfolios, and want to use BSUIDs that will work across all of them, see Parent business-scoped user IDs.

## Parent business-scoped user IDs

If you are a managed business and want to link business portfolios, you can ask your Meta point-of-contact to check if you are eligible. If you are eligible, and your business portfolios become linked, parent BSUIDs will be included in all messages webhooks, assigned to a new `parent_user_id` property.

Parent BSUIDs can be used in place of regular BSUIDS to message users. Functionally, parent BSUIDs have the same properties as regular BSUIDs, but can be used by any business phone number within the set of linked portfolios.

Note that you can still message users using their regular BSUID scoped to your business portfolio.

## Phone numbers

If a WhatsApp user enables the username feature, their phone number will not be included in webhooks, unless you have interacted with the user before, as explained below. Therefore, regardless of whether or not the user has enabled the feature, the user’s BSUID will be included in any webhooks that would normally include their phone number, assigned to a new user_id property.

To reduce the chance of losing conversation context with existing users who enable the usernames feature, user phone numbers will be included in webhooks if any of the following conditions are met:

  * You have messaged or called the user’s phone number within the last 30 days of the webhook being triggered
  * You have received a message or call from the user’s phone number within the last 30 days of the webhook being triggered
  * You are in the user’s WhatsApp contacts list
  * The user is in your contact book

BSUIDs will begin appearing in webhooks starting March 31, 2026. However, our APIs will not support sending messages targeted to the BSUIDs until May 2026 (exact date pending). Once our APIs support BSUIDs in May, you will be able to message users using either their BSUID, phone number, or both.

If you are a solution provider and provide WhatsApp messaging services to your business customers, your customers will be able to use your app to message users, using their portfolio’s business phone numbers and any BSUIDs scoped to their portfolio. If you attempt to use one of your business customer’s BSUIDs with your own business phone number, however, it will fail, since BSUIDs are scoped to portfolios (and essentially, the assets the portfolio owns).

If you are unsure of asset ownership:

  * Send a GET request to the [Client WhatsApp Business Accounts API](/docs/marketing-api/reference/business/client_whatsapp_business_accounts/#Reading) to get a list of WABAs that you do not own, but that are shared with you.
  * Send a GET request to the [Owned WhatsApp Business Accounts API](/docs/marketing-api/reference/business/owned_whatsapp_business_accounts/#Reading) to get a list of WABAs that you own.
  * Send a GET request to the [Phone Numbers API](/docs/graph-api/reference/whats-app-business-account/phone_numbers/#Reading) to get a list of phone numbers owned by a given WABA.

## Requesting phone numbers from users

To make it easier to request phone numbers from WhatsApp users, a `REQUEST_CONTACT_INFO` button type is available that can be added to `utility` and `marketing` templates.

If a user taps this button, their virtual contact card and WhatsApp phone number will be shared in the message thread, and a [contacts webhook](/documentation/business-messaging/whatsapp/webhooks/reference/messages/contacts) will be triggered, containing the user’s phone number and [vCard⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc6350&h=AT6Ea8-M_LpWC3BbxCOURUbrdqbgrGnSY9LVje8uTiGy-YK53MCmuUkXcahDkiBNDJaTEM-y6kna6NdOekCy2q6d9kbL3X3GJRTHACpTdD0LK8h91IWeHousl57BJS1ScxmlrMmAJ-eyyy877o9kxg).

If you are using the contact book feature, their phone number will also be added to your contact book automatically, unless you have enabled local storage. If you have enabled local storage, send a message to the user’s phone number. This will add the user’s phone number and BSUID to your contact book.

To add a request contact information button to a utility or marketing template, use the following payload structure when creating or editing a utility or marketing template:
    
    
    {  
      "type": "buttons",  
      "buttons": [  
        {  
          "type": "REQUEST_CONTACT_INFO"  
        },  
          
      ]  
    }  
      
    

Request contact information buttons cannot be customized, so you do not need to include any parameter values when sending the template.

Example contacts webhook payload with a vCard:
    
    
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
                      "name": "",  
                      "username": "",  
                    },  
                    "user_id": ""  
                  }  
                ],  
                "messages": [  
                  {  
                    "id": "",  
                    "timestamp": "",  
                    "type": "contacts",  
                    "origin": "contact_request/other",         
                    "contacts": [  
                      {  
                        "vcard": "",                    
                        "phones": [  
                          {  
                            "phone": ""  
                          }  
                        ]  
                      }  
                    ]  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Contact book

In early April 2026, to support messaging thread continuity, a contact book feature that stores WhatsApp user contact information is being released.

Once the feature is available, if you send a message/call to a user’s phone number, or receive a message/call from a user’s phone number, the user’s phone number and BSUID will be added to your contact book. Once this data has been recorded, it will be used to populate any webhook payloads and API responses that include the user’s phone number or BSUID, regardless of whether or not the user has enabled the usernames feature.

Contact book data will be retained until you disable the feature, or deactivate your account. If you wish, you can disable this feature anytime after March 16, 2026, in the **Meta Business Suite** > **Business settings** > [**Business info** ⁠](https://business.facebook.com/latest/settings/business_info) panel. If you disable your contact book, it will stop storing user information, and any existing user information it has already stored will be deleted. If you re-enable the contact book later, it will start storing user information again, but previously stored information cannot be restored.

Limitations:

  * If you are using [local storage](/documentation/business-messaging/whatsapp/local-storage) and a user shares their phone number with you by tapping a request contact information button, the user’s contact information will not be added to your contact book. Instead, send a message to the user’s phone number once it has been shared with you. This will cause their phone number and BSUID to be captured by your contact book.
  * Contact books are scoped to business portfolios. This means that if you have linked portfolios, a user’s phone number and BSUID would have to be recorded to each portfolio’s contact book independently; user contact information is not shared or synced across linked portfolios.

## Country codes

If a WhatsApp user enables the username feature, their phone number (and thus, country dialing code) may not appear in webhooks. In these cases, the user’s BSUID will appear instead, prefixed with the user’s [ISO 3166 alpha-2⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fiso-3166-country-codes.html&h=AT6Ea8-M_LpWC3BbxCOURUbrdqbgrGnSY9LVje8uTiGy-YK53MCmuUkXcahDkiBNDJaTEM-y6kna6NdOekCy2q6d9kbL3X3GJRTHACpTdD0LK8h91IWeHousl57BJS1ScxmlrMmAJ-eyyy877o9kxg) two-letter country code (e.g., `US.13491208655302741918`).

## Business usernames

Businesses will also be able to adopt a business username. If you adopt a business username, however, it will not cause your business phone number to be hidden in the WhatsApp or WhatsApp Business client.

A business username is mapped to a single business phone number across all of WhatsApp, i.e. a phone number can have only one username at a given time, and no two WhatsApp phone numbers (consumer or business) can have the same username.

Business usernames must adhere to the following format:

  * may only contain english letters (a-z), digits (0-9), period (.) and underscore (_) characters
  * must be between 3-35 characters in length
  * must contain at least one English letter (a-z, A-Z)
  * must not start or end with a period or have 2 consecutive periods
  * must not start with www
  * must not end with a domain (e.g., .com, .org, .net, .int, .edu, .gov, .mil, .us, .in, .html, and so on)
  * case is ignored when comparing usernames, but period and underscore characters are not; for example, myID and myid are the same *username but myid, my.id, and my_id are all distinct

### Reserved usernames

Before the username feature is made available, you will have the option to claim a username that WhatsApp has reserved for you. Alternatively, you can adopt a different username that aligns with your branding requirements. A reserved username can be claimed through WhatsApp Manager, Meta Business Suite, or via API. Claimed usernames that are approved will become active once the username feature is made available.

If a reserved username is already in use with your Facebook Page or Instagram account, you must link your business phone number to your Facebook Page or Instagram account before you will be able to claim the username.

You can link your phone number when claiming the username in Meta Business Suite or WhatsApp Manager, or by accessing your Facebook Page or Instagram account and [adding your phone number directly⁠](https://www.facebook.com/business/help/4631406400243963).

To link your phone number, you must have full control of the page or account, or basic partial access with the manage_phone permission. See [About business portfolio and business asset permissions⁠](https://www.facebook.com/business/help/442345745885606) for information about control/access and permissions.

### Chat window display priority

The following priority will be followed (in decreasing order of priority) for displaying business profile information in chat windows in the app. Your business phone numbers will always appear in your business profile.

  * Saved contact name
  * Verified business name or [Official Business Account](/documentation/business-messaging/whatsapp/official-business-accounts) name
  * Username
  * Phone number

### Support

  * You can contact your Partner Manager with any concerns.
  * You can reach out to any of the [standard support channels](/documentation/business-messaging/whatsapp/support); for API integrations, please raise a Direct support ticket with question type, **WA Usernames API Integration**.
  * Use the **Report Abuse** channel via [Direct Support⁠](https://business.facebook.com/direct-support/) to report impersonation.
  * Use our [WhatsApp Intellectual Property Contact Form⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.whatsapp.com%2Fcontact%2Fforms%2F5071674689613749&h=AT6Ea8-M_LpWC3BbxCOURUbrdqbgrGnSY9LVje8uTiGy-YK53MCmuUkXcahDkiBNDJaTEM-y6kna6NdOekCy2q6d9kbL3X3GJRTHACpTdD0LK8h91IWeHousl57BJS1ScxmlrMmAJ-eyyy877o9kxg) form to report infringement.

### Adopt or change a business username

You will be able to adopt or change a business username using Meta Business Suite, WhatsApp Manager, WhatsApp Business app, or the API, later in the year (exact date pending).

Request syntax:
    
    
    curl -X POST 'https://graph.facebook.com///username' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "username": ""  
    }'  
      
    

Response syntax, upon success:
    
    
    {  
      "status": ""  
    }  
      
    

  * `status` — The status of the latest requested username. Values can be: 
    * `approved` — The requested username has been approved and will be visible to WhatsApp users once the usernames feature is made available.
    * `reserved` — The requested username has been reserved and approved but not yet visible to WhatsApp users. It will appear to WhatsApp users once the feature is available for everyone.

Response syntax, upon failure:
    
    
    {  
      "error": {  
        "message": "",  
        "type": "",  
        "code": ,  
        "error_data": {  
          "messaging_product": "whatsapp",  
          "details": ""  
        },  
        "error_subcode": ,  
        "fbtrace_id": ""  
      }  
    }  
      
    

Code| Details| Possible reason and solutions  
---|---|---  
`10`| Application does not have permission for this action| Confirm that the system user whose token is used in the request has appropriate [business asset access](/documentation/business-messaging/whatsapp/access-tokens#business-asset-access) on the WhatsApp Business Account: either **Full control** or **Partial access** for **Phone numbers**.  
`33`| Invalid ID| (1) The business phone number ID is invalid, (2) the WhatsApp Business Account associated with the business phone number has been deleted, or (3) the user whose token was used in the request has not granted the app the **whatsapp_business_management** permission (which requires Advanced Access if you are a [solution provider](/documentation/business-messaging/whatsapp/solution-providers/overview))  
`100`| Param Invalid| The username format is invalid.  
`147001`| Username not available| The username has already been claimed, doesn’t pass our internal checks, or is not available for on the platform. Try requesting another username.  
`147002`| Account not eligible to request a username| The business portfolio that owns the WhatsApp Business Account and business phone number must have a higher [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits).  
`147003`| FB Account not linked| You must [link⁠](https://www.facebook.com/business/help/4631406400243963) the phone number to the Facebook Page that already uses the requested username.  
`147004`| IG Account not linked| You must [link⁠](https://www.facebook.com/business/help/4631406400243963) the phone number to the Instagram account that already uses the requested username  
`133010`| Account not registered| The business phone number must first be [registered for API use](/documentation/business-messaging/whatsapp/business-phone-numbers/registration).  
  
### Get current username

You can use the **GET / /username** endpoint to get the status of the business username associated with the business phone number, or information about the username.

Request syntax:
    
    
    curl 'https://graph.facebook.com///username' \  
    -H 'Authorization: Bearer '  
      
    

Response syntax:
    
    
    {  
      "username": "",  
      "status": ""  
    }  
      
    

  * `username` — Current username. Will be omitted if the business phone number has no username.
  * `status` — Username status. Values can be: 
    * `approved` — The username is approved and visible to WhatsApp users.
    * `reserved` — The username is reserved for the business phone number but is not visible to WhatsApp users. It will become visible once the usernames feature is made available to everyone.

### Get reserved usernames

Adding a new **GET / /username_suggestions** endpoint that returns a list of usernames that have been reserved for your business portfolio.

Call the **POST / /username** endpoint to claim the desired username from the list, which will then need to be approved. Once approved and usernames become available in your country, it will move to to an “active” status, meaning the business username will start appearing on your business profile, and users will be able to search for it using exact match search.

Request syntax:
    
    
    curl 'https://graph.facebook.com///username_suggestions' \  
    -H 'Authorization: Bearer '  
      
    

Response syntax:
    
    
    {  
      "data": [  
       {  
         "username_suggestions": [  
           "",  
             
         ]  
       }  
     ],  
    }  
      
    

  * `username_suggestions` — An array of reserved usernames, if any. These usernames have a higher chance of approval.

### Delete a username

You can use the **DELETE / /username** endpoint to delete the business username associated with the business phone number.

Request syntax:
    
    
    curl -X DELETE 'https://graph.facebook.com///username' \  
    -H 'Authorization: Bearer '  
      
    

Response syntax:
    
    
    {  
      "success":   
    }  
      
    

  * `success` — Boolean. Will be set to `true` if the username is deleted successfully, otherwise it will be set to `false`.

### business_username_updates webhook

A new **business_username_update** webhook will be added. This webhook will be triggered when a business username status changes.

Please subscribe each of your apps to this webhook field to be notified of username changes.
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "field": "business_username_update",  
              "value": {  
                "display_phone_number": "",  
                "username": "",  
                "status": ""  
              }  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `id` — WhatsApp Business Account ID.
  * `time` — Unix timestamp indicated when the webhook was triggered.
  * `display_phone_number` — The business phone number’s display number (the number displayed on your profile in the app).
  * `username` — The username for which the status has changed. Omitted if `status` is set to `deleted`.
  * `status` — Values can be: 
    * `approved` — Indicates the username is approved and visible to WhatsApp users. Triggered when the username’s status changes from `reserved` to `approved`, or the username was changed via the WhatsApp Business app.
    * `deleted` — Indicates the username has been deleted via the WhatsApp Business app.
    * `reserved` — Indicates the username is reserved for the business phone number but is not visible to WhatsApp users. It will become visible once the usernames feature is made available to everyone.

## Messages

### Send message requests

These changes will apply to [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#Creating) endpoint requests.

This example syntax is sending a `text` message, but the changes apply to all message types.
    
    
    'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",      
      "recipient": "",           
      "type": "text",  
      "text": {  
        "body": ""  
      }  
    }'  
      
    

You can include both `to` (phone number) and `recipient` (BSUID or parent BSUID) in your request. If you do, `to` (phone number) will take precedence. If you prefer, you can also use one or the other:

To send a message using only the user’s phone number:

  * set `to` to the user’s phone number
  * omit the `recipient` property

To send a message using only the user’s BSUID or parent BSUID:

  * set `recipient` to the user’s BSUID or parent BSUID
  * omit the `to` property

### Send message response

These changes apply to [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#Creating) endpoint responses.
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "",      
          "wa_id": "",               
          "user_id": ""                          
        }  
      ],  
      "messages": [  
        {  
          "id": ""  
        }  
      ]  
    }  
      
    

  * `input` — New value (BSUID or parent BSUID). 
    * Will return the user’s phone number, if the message was sent to the user’s phone number.
    * Will return the user’s BSUID or parent BSUID, if it was sent to their BSUID or parent BSUID.
    * Will return the group ID, it sent to a group.
  * `wa_id` — New behavior (can be omitted). Will return the user’s phone number, if the message was sent to the user’s phone number. Otherwise, it will be omitted.
  * `user_id` — New property. 
    * Will return the user’s BSUID or parent BSUID, if the message was sent to user’s BSUID or parent BSUID, or if you included both the user’s phone number and their BSUID or parent BSUID when sending the message (causing the message to be sent to the user’s phone number, which takes precedence).
    * Will be omitted if the message was sent to the user’s phone number.

Example response to a send message request sent to a user’s phone number (user BSUID or parent BSUID not used in request):
    
    
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
      
    

Example response to a send message request sent to a user’s BSUID (user phone number not used in request):
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "US.13491208655302741918",  
          "user_id": "US.13491208655302741918"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA"  
        }  
      ]  
    }  
      
    

Example response to a send message request sent to a user’s phone number and BSUID (user phone number takes precedence):
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "+16505551234",  
          "wa_id": "16505551234",  
          "user_id": "US.13491208655302741918"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA"  
        }  
      ]  
    }  
      
    

### Error codes

Adding new error code response to the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#Creating) endpoint.

  * Error code — `131062`
  * Details — `Business-scoped User ID (BSUID) recipients are not supported for this message.`

## Marketing Messages API for WhatsApp

### Send marketing message requests

Marketing Messages API for WhatsApp will support both phone numbers, BSUIDs, and parent BSUIDs. Sending messages to phone numbers is recommended, primarily so you can continue to receive phone numbers in webhooks.

These changes will apply to [POST //marketing_messages](/documentation/business-messaging/whatsapp/marketing-messages/send-marketing-messages#send-marketing-template-messages) endpoint requests.
    
    
    'https://graph.facebook.com///marketing_messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",      
      "recipient": "",           
      "type": "template",  
      "template": {  
          
      }  
    }'  
      
    

You can include both `to` (phone number) and `recipient` (BSUID or parent BSUID) in your request. If you do, `to` (phone number) will take precedence. If you prefer, you can also use one or the other:

To send a message using only the user’s phone number:

  * set `to` to the user’s phone number
  * omit the `recipient` property

To send a message using only the user’s BSUID or parent BSUID:

  * set `recipient` to the user’s BSUID or parent BSUID
  * omit the `to` property

### Send marketing message response

These changes apply to [POST //marketing_messages](/documentation/business-messaging/whatsapp/marketing-messages/send-marketing-messages#send-marketing-template-messages) endpoint responses.
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "",      
          "wa_id": "",            
          "user_id": ""                       
        }  
      ],  
      "messages": [  
        {  
          "id": "",  
          "message_status": ""  
        }  
      ]  
    }  
      
    

  * `input` — New value (BSUID or parent BSUID). 
    * Will return the user’s phone number, if the message was sent to the user’s phone number.
    * Will return the user’s BSUID or parent BSUID, if it was sent to their BSUID or parent BSUID.
    * Will return the group ID, if it was sent to a group.
  * `wa_id` — Will return the user’s phone number, if the message was sent to the user’s phone number. Otherwise, it will be omitted.
  * `user_id` — New property. 
    * Will return the user’s BSUID or parent BSUID, if the message was sent to the user’s BSUID or parent BSUID, or if you included both the user’s phone number and their BSUID/parent BSUID when sending the message (causing the message to be sent to the user’s phone number, which takes precedence).
    * Will be omitted if the message was sent to the user’s phone number.

Example response to a send a template message to a user’s phone number:
    
    
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
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA",  
          "message_status": "accepted"  
        }  
      ]  
    }  
      
    

Example response to a send a template message to a user’s BSUID:
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "US.13491208655302741918",  
          "user_id": "US.13491208655302741918"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA",  
          "message_status": "accepted"  
        }  
      ]  
    }  
      
    

## Messages webhooks

Starting February 16, 2026, test messages webhooks triggered via the **App Dashboard** (**Use cases** > **Connect with customers through WhatsApp** > **Customize** > **Configuration** , or **WhatsApp** > **Configuration** , for apps created before December 2026), will include test BSUIDs.

### Status messages webhooks

These changes will apply to sent, delivered, read, and failed [status messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks.
    
    
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
                      "name": "",                 
      
                        
                      "username": ""                       
      
                    },  
                    "wa_id": "",                  
                    "user_id": "",                            
      
                      
                    "parent_user_id": ""               
                  }  
                ],  
      
                "statuses": [  
                  {  
                    "id": "",  
                    "status": "",  
                    "timestamp": "",  
                    "recipient_id": "",           
                    "recipient_user_id": "",                  
      
                      
                    "parent_recipient_user_id": ""     
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `contacts` — New array. Only included for sent, delivered, and read status messages. Will be omitted entirely for `failed` status messages webhooks. 
    * `name` — New property. Value will be set to the WhatsApp user’s display name.
    * `username` — New property. 
      * Will be set to the WhatsApp user’s username if the user has enabled the usernames feature.
      * Will be omitted entirely for `sent` status messages webhooks, or if the user has not enabled the usernames feature.
    * `wa_id` — New property. 
      * Will be omitted if the user has enabled the usernames feature and the phone number cannot be included based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number if you sent the message to the user’s phone number.
    * `user_id` — New property. Will be set to the WhatsApp user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, the property will be omitted entirely.
  * `statuses`
    * `recipient_id` — New behavior (can be omitted). 
      * Will be set to the user’s phone number, if you sent the message to the user’s phone number.
      * Will be set to the group ID, if you sent the message to a group.
      * Will be omitted if you sent the message to the user’s BSUID or parent BSUID and we are unable to include their phone number based on the conditions described in the Phone numbers section.
    * `recipient_user_id` — New property. Will be set to the user’s BSUID or parent BSUID, if you sent the message to the user’s BSUID or parent BSUID. Otherwise, it will be omitted.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted entirely.

Example delivered status messages webhook describing a message sent from a business that has enabled parent BSUIDS to the phone number of a WhatsApp user who has enabled the usernames feature:
    
    
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
                      "name": "Pablo M.",  
                      "username": "@pablomorales"  
                    },  
                    "wa_id": "16505551234",  
                    "user_id": "US.13491208655302741918",  
                    "parent_user_id": "US.11815799212886844830"  
                  }  
                ],  
                "statuses": [  
                  {  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                    "status": "delivered",  
                    "timestamp": "1750030073",  
                    "recipient_id": "16505551234",  
                    "recipient_user_id": "US.13491208655302741918",  
                    "parent_recipient_user_id": "US.11815799212886844830",  
                    "pricing": {  
                      "billable": true,  
                      "pricing_model": "PMP",  
                      "type": "regular",  
                      "category": "marketing"  
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
      
    

Example delivered status messages webhook describing a message sent from a business that has enabled parent BSUIDS, to the BSUID of a WhatsApp user who has enabled the username feature. In this example, we are unable to include their phone number based on the conditions described in the Phone numbers section (so `wa_id` and `recipient_id` are omitted).
    
    
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
                      "name": "Pablo M.",  
                      "username": "@pablomorales"  
                    },  
                    "user_id": "US.13491208655302741918",  
                    "parent_user_id": "US.11815799212886844830"  
                  }  
                ],  
                "statuses": [  
                  {  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                    "status": "delivered",  
                    "timestamp": "1750030073",  
                    "recipient_user_id": "US.13491208655302741918",  
                    "parent_user_id": "US.11815799212886844830",  
                    "pricing": {  
                      "billable": true,  
                      "pricing_model": "PMP",  
                      "type": "regular",  
                      "category": "marketing"  
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
      
    

### Incoming messages webhooks

These changes apply to incoming messages webhooks ([text](/documentation/business-messaging/whatsapp/webhooks/reference/messages/text), [image](/documentation/business-messaging/whatsapp/webhooks/reference/messages/image), [interactive](/documentation/business-messaging/whatsapp/webhooks/reference/messages/interactive), and so on), including incoming messages sent by users in a Group chat.

The example syntax below is for an incoming **text** message, but the changes are the same for all incoming message types.
    
    
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
                      "name": "",  
      
                        
                      "username": ""                   
                    },  
                    "wa_id": "",               
                    "user_id": "",                        
      
                      
                    "parent_user_id": ""           
                  }  
                ],  
                "messages": [  
                  {  
                    "from": "",      
                    "from_user_id": "",                   
      
                      
                    "from_parent_user_id": "",     
      
                      
                    "group_id": "",  
      
                    "id": "",  
                    "timestamp": "",  
                    "type": "text",  
                    "text": {  
                      "body": ""  
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
      
    

  * `contacts`
    * `profile`
      * `username` — New property. 
        * Will be set to the user’s username, if the user has enabled the username feature.
        * Will be omitted if the user has not adopted a username.
    * `wa_id` — New behavior (can be omitted). 
      * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number if the user has not enabled the usernames feature.
    * `user_id` — New property, set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `messages`
    * `from` — New behavior (can be omitted). 
      * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number if the user has not enabled the usernames feature.
    * `from_user_id` — New property, set to the user’s BSUID.
    * `from_parent_user_id` — New property, set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.

Example incoming text message from a user who has enabled the username feature, to a business that has enabled parent BSUIDs. In this scenario, we are unable to include their phone number based on the conditions described in the Phone numbers section.
    
    
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
                      "name": "Sheena Nelson",  
                      "username": "@realsheenanelson"  
                    },  
                    "user_id": "uUS.13491208655302741918",  
                    "parent_user_id": "US.11815799212886844830"  
                  }  
                ],  
                "messages": [  
                  {  
                    "from_user_id": "US.13491208655302741918",  
                    "from_parent_user_id": "US.11815799212886844830",  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTRBNjU5OUFFRTAzODEwMTQ0RgA=",  
                    "timestamp": "1749416383",  
                    "type": "text",  
                    "text": {  
                      "body": "Does it come in another color?"  
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
      
    

### System status messages webhooks

These changes apply to [system status](/documentation/business-messaging/whatsapp/webhooks/reference/messages/system) messages webhooks.
    
    
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
                "messages": [  
                  {  
                    "from": "",  
                    "id": "",  
                    "timestamp": "",  
                    "type": "system",  
                    "system": {  
                      "body": "User...",                         
                      "wa_id": "",         
                      "user_id": "",                  
      
                        
                      "parent_user_id": "",    
                      "type": ""             
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
      
    

  * `system`
    * `body` — New string. Will be set to `User  changed from  to ` if the user changed their business phone number.
    * `wa_id` — New behavior (can be omitted). 
      * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number if the user has not enabled the usernames feature.
    * `user_id` — New property. Will be set to the user’s new BSUID.
    * `parent_user_id` — New property. Will be set to the user’s new parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted. `type` — New value (`user_changed_user_id`). Will be set to `user_changed_user_id` if the WhatsApp user changed their phone number.

### user_preferences webhooks

These changes will apply to [user_preferences](/documentation/business-messaging/whatsapp/webhooks/reference/user_preferences) webhooks.
    
    
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
                      "name": "",  
      
                        
                      "username": ""                   
                    },  
                    "wa_id": "",               
                    "user_id": "",                        
      
                      
                    "parent_user_id": ""           
                  }  
                ],  
                "user_preferences": [  
                  {  
                    "wa_id": "",               
                    "user_id": "",                        
      
                      
                    "parent_user_id": "",          
      
                    "detail": "",  
                    "category": "marketing_messages",  
                    "value": "",  
                    "timestamp":   
                  }  
                ]  
              },  
              "field": "user_preferences"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `contacts`
    * `profile`
      * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Property omitted if the user has disabled the username feature.
    * `wa_id` — New behavior (can be omitted). 
      * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number if the user has not enabled the usernames feature.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `user_preferences`
    * `wa_id` — New behavior (can be omitted). Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `user_id` — New property,. Will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.

## Groups API

### Get group info

These changes apply to [GET /](/documentation/business-messaging/whatsapp/groups/reference#get-group-info) endpoint responses.
    
    
    {  
      "participants": [  
        {  
          "wa_id": ""          
          "user_id": "",                   
      
            
          "parent_user_id": "",     
      
            
          "username": ""                
      
        }  
      ],  
      "subject": "",  
      "id": "",  
      "messaging_product": "whatsapp"  
    }  
      
    

  * `wa_id` — New behavior (can be omitted). 
    * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
    * Will be set to the user’s phone number if the user has not enabled the usernames feature.
  * `user_id` — New property. Will be set to the user’s BSUID.
  * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `username` — New property. 
    * Will be set to the user’s username, if the user has enabled the username feature.
    * Will be omitted if the user is not using, or has disabled, the username feature.

### Get group join requests

These changes apply to [GET //join_requests](/documentation/business-messaging/whatsapp/groups/reference#groups-with-join-requests) endpoint responses.
    
    
    {  
      "data": [  
        {  
          "join_request_id": "",  
          "creation_timestamp": "",  
          "wa_id": "",                      
          "user_id": "",                                
      
            
          "parent_user_id": "",                  
      
            
          "username": ""                             
        }  
      ],  
      "paging": {  
        "cursors": {  
          "before": "",  
          "after": ""  
        }  
      }  
    }  
      
    

  * `wa_id` — New behavior (can be omitted). 
    * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
    * Will be set to the user’s phone number if the user has not enabled the usernames feature.
  * `user_id` — New property. Will be set to the user’s BSUID.
  * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Will be omitted if the user has not enabled the username feature.

### Remove group participants

These changes apply to [DELETE //participants](/documentation/business-messaging/whatsapp/groups/reference#remove-group-participants) endpoint requests.
    
    
    curl -g -X DELETE 'https://graph.facebook.com///participants' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "participants": [  
        {  
          "user": ""      
        }  
      ]  
    }'  
      
    

  * `user` — Will accept a user’s phone number or BSUID.

## Groups API webhooks

### Status messages webhooks for groups

These changes will apply to `delivered` and `read`[status messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks for messages sent to a group.
    
    
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
                        "name": "",     
      
                          
                        "username": ""           
                      },  
                      "wa_id": "",      
                      "user_id": "",                
      
                        
                      "parent_user_id": ""  
                    },  
                    # Additional contact objects would follow, if aggregated  
                    {  
                      ...  
                    }  
                  ],  
      
                "statuses": [  
                  {  
                    "id": "",  
                    "status": "",  
                    "timestamp": "",  
                    "recipient_id": "",  
                    "recipient_type": "group",  
                    "recipient_participant_id": "",   
                    "recipient_participant_user_id": "",                  
      
                      
                    "recipient_participant_parent_user_id": "",    
      
                      
                    "conversation": {  
                      "id": "",  
                      "expiration_timestamp": "",  
                      "origin": {  
                        "type": ""  
                      }  
                    },  
      
                    "pricing": {  
                      "billable": ,  
                      "pricing_model": "",  
                      "type": "",  
                      "category": ""  
                    }  
                  },  
                  # Additional status objects would follow, if aggregated  
                  {  
                    ...  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `contacts` — New array. Only included for delivered and read status messages. Will be omitted entirely for failed status messages webhooks. 
    * `name` — New property. Value will be set to the WhatsApp user’s display name.
    * `username` — New property. Will be set to the WhatsApp user’s username if the user has adopted a username. Will be omitted for sent status messages webhooks, or if the user has not enabled the usernames feature.
    * `wa_id` — New property. 
      * Will be omitted if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number, if you sent the message to the user’s phone number.
    * `user_id` — New property. Will be set to the WhatsApp user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `recipient_participant_id` — Changed. Will be set to the user’s phone number, if the message was sent to their phone number. Otherwise, it will be omitted.
  * `recipient_participant_user_id` — Will be set to the user’s BSUID or parent BSUID, if you sent the message to the user’s BSUID or parent BSUID. Otherwise, it will be omitted.
  * `recipient_participant_parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.

### group_participants_update webhooks

These changes apply to the [group_participants_update](/documentation/business-messaging/whatsapp/groups/webhooks#group-participants-update-webhooks) webhook.
    
    
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
                "groups": [  
                  {  
                    "timestamp": ,  
                    "group_id": "",  
      
                      
                    "type": "group_participants_remove",  
                    "request_id": "REQUEST_ID",  
                    "removed_participants": [  
                      {  
                        "input": "",        
                      }  
                    ],  
      
                    "initiated_by": "business"  
      
                      
                    "type": "group_participants_remove",  
                    "request_id": "REQUEST_ID",  
                    "removed_participants": [  
                      {  
                        "wa_id": ""         
                        "user_id": "",                  
                        "parent_user_id": "",    
                        "username": ""               
                      }  
                    ],  
      
                    "initiated_by": "participant"  
      
                      
                    "type": "group_participants_add",  
                    "reason": "invite_link",  
                    "added_participants": [  
                      {  
                        "wa_id": ""         
                        "user_id": "",                  
                        "parent_user_id": "",    
                        "username": ""               
                      }  
                    ]  
      
                      
                    "type": "group_join_request_created",  
                    "join_request_id": "",  
                    "wa_id": "",            
                    "user_id": "",                      
                    "parent_user_id": "",        
                    "username": ""                   
      
                      
                    "type": "group_join_request_revoked",  
                    "join_request_id": "",  
                    "wa_id": ""             
                    "user_id": "",                      
                    "parent_user_id": "",        
                    "username": ""                   
                  }  
                ]  
              },  
              "field": "group_participants_update"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `input` — New value (BSUID or parent BSUID). 
    * Will be set to the user’s phone number if you removed the user from the group using their phone number.
    * Will be set to the user’s BSUID or parent BSUID if you removed the user from the group using their BSUID or parent BSUID.
  * `wa_id` — New behavior (can be omitted). 
    * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
  * `user_id` — New property. Will be set to the user’s BSUID.
  * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.

## Block Users API

### Block or unblock user requests

These changes apply to the POST and DELETE [Block Users](/documentation/business-messaging/whatsapp/block-users) requests. This example is for a block user request syntax, but the changes also apply to unblock requests.
    
    
    curl 'https://graph.facebook.com///block_users' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "block_users": [  
        {  
          "user": ""  
        },  
        {  
          "user_id": ""     
        }  
      ]  
    }'  
      
    

You can include both `user` (phone number) and `user_id` (BSUID or parent BSUID) in your request. If you do, `user` (phone number) will take precedence. If you prefer, you can also use one or the other:

To block or unblock a user using only their phone number:

  * Set `user` to the user’s phone number
  * Omit the `user_id` object

To block or unblock a user using only their BSUID or parent BSUID:

  * Set `user_id` to the user’s BSUID or parent BSUID
  * Omit the `user` object

### Block or unblock request responses

These changes will apply to the POST and DELETE [Block Users](/documentation/business-messaging/whatsapp/block-users) request responses.
    
    
    {  
      "messaging_product": "whatsapp",  
      "block_users": {  
        "added_users": [  
          {  
            "input": "",    
            "wa_id": "",    
            "user_id": ""               
          }  
        ]  
      }  
    }  
      
    

  * `input` — New value (BSUID or parent BSUID). 
    * Will be set to the user’s BSUID or parent BSUID if you used the user’s BSUID or parent BSUID to block or unblock the user.
    * Will be set to the user’s phone number if you used the user’s phone number to block or unblock the user.
  * `wa_id` — New behavior (can be omitted). 
    * Will be set omitted if you used the user’s BSUID or parent BSUID to block or unblock the user.
    * Will be set to the user’s phone number if you used their phone number to block or unblock the user.
  * `user_id` — New property. 
    * Will be set to the user’s BSUID or parent BSUID if you used the user’s BSUID or parent BSUID to block or unlock the user.
    * Will be omitted if you used the user’s phone number to block or unblock the user.

## Calling API

### Businesses-initiated call requests

The changes apply to business-initiated Calling API requests.
    
    
    'https://graph.facebook.com///calls' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "to": "",      
      "recipient": "",           
      "action": "connect",  
      "session": {  
        "sdp_type": "offer",  
        "sdp": ""  
      }  
    }'  
      
    

You can include both `to` (phone number) and `recipient` (BSUID or parent BSUID) in your request. If you do, `to` (phone number) will take precedence. If you prefer, you can also use one or the other:

To call a user using only their phone number:

  * set `to` to the user’s phone number
  * omit the `recipient` property

To call a user using only their BSUID or parent BSUID:

  * set `recipient` to the user’s BSUID or parent BSUID
  * omit the `to` property

### Get call permissions

The changes apply to [get call permissions](/documentation/business-messaging/whatsapp/calling/user-call-permissions#call-permission-request-basics) requests. There are no changes to responses.

Get call permissions using a user’s phone number:
    
    
    curl 'https://graph.facebook.com///call_permissions?user_wa_id=' \  
    -H 'Authorization: Bearer ' \  
      
    

  * `user_wa_id` — Set to the user’s phone number.

Get call permissions using a user’s BSUID or parent BSUID:
    
    
    curl 'https://graph.facebook.com///call_permissions?recipient=' \  
    -H 'Authorization: Bearer ' \  
      
    

  * `recipient` — Set to the user’s BSUID or parent BSUID.

### Send call permission request

See send message requests.

### Call permission request webhooks

These changes will apply to incoming call permission reply [interactive messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/interactive) webhooks.
    
    
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
                      "name": "",  
      
                        
                      "username": ""                  
      
                    },  
                    "wa_id": "",              
                    "user_id": "",                       
      
                      
                    "parent_user_id": ""          
      
                  }  
                ],  
                "messages": [  
                  {  
                    "context": {  
                      "from": "",  
                      "id": ""  
                    },  
                    "from": "",     
                    "from_user_id": "",                  
      
                      
                    "from_parent_user_id": ""     
      
                    "id": "",  
                    "timestamp": "",  
                    "type": "interactive",  
                    "interactive": {  
                      "type":  "call_permission_reply",  
                      "call_permission_reply": {  
                        "response": accept,  
                        "expiration_timestamp": "",  
                        "response_source": ""  
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
      
    

  * `contacts`
    * `profile`
      * `username` — New property. Will be set to the user’s username if the user has adopted a username. Will be omitted if the user is not using a username.
    * `wa_id` — New property. 
      * Will be omitted if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number if the user has not adopted a username.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `messages`
    * `from` — New behavior (can be omitted). 
      * Will be set to the user’s phone number if the user has not enabled the user name feature.
      * Will be omitted if the user has enabled the username feature and we are unable to include their phone number based on the conditions described in the Phone numbers section.
    * `from_user_id` — New property. Will be set to the user’s BSUID.

### Business-initiated connected calls webhooks

These changes apply to business-initiated [connected calls](/documentation/business-messaging/whatsapp/calling/reference#call-connect-webhook) webhooks.
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "calls",  
              "value": {  
                "contacts": [                                    
                  {  
                    "profile": {  
                        
                      "username": ""                   
                    },  
                    "wa_id": "",              
                    "user_id": "",                        
      
                      
                    "parent_user_id": ""           
                  }  
                ],  
                "calls": [  
                  {  
                    "biz_opaque_callback_data": "",  
                    "session": {  
                      "sdp_type": "answer",  
                      "sdp": ""  
                    },  
                    "from": "",  
                    "id": "",  
                    "to": "",                 
                    "to_user_id": "",                     
      
                      
                    "to_parent_user_id": "",       
      
                    "event": "connect",  
                    "timestamp": "",  
                    "direction": "BUSINESS_INITIATED"  
                  }  
                ],  
                "metadata": {  
                  "phone_number_id": "",  
                  "display_phone_number": ""  
                },  
                "messaging_product": "whatsapp"  
              }  
            }  
          ],  
          "id": ""  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

  * `contacts` — New array. 
    * `profile`
      * `username` — New property. 
        * Will be set to the WhatsApp user’s username if the user has adopted a username.
        * Will be omitted for sent status messages webhooks, or if the user is not using a username.
    * `wa_id` — New property. 
      * Will be omitted if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section.
      * Will be set to the user’s phone number, if you sent the message to the user’s phone number.
    * `user_id` — New property. Will be set to the WhatsApp user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `calls`
    * `to` — New behavior (can be omitted). Will be set to the user’s phone number if the user has adopted a username and we are able to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be omitted.
    * `to_user_id` — New property. Will be set to the user’s BSUID.
    * `to_parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, the property will be omitted entirely.

### User-initiated connected calls webhooks

These changes will apply to user-initiated [connected calls](/documentation/business-messaging/whatsapp/calling/reference#call-connect-webhook) webhooks.
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "calls",  
              "value": {  
                "metadata": {  
                  "phone_number_id": "",  
                  "display_phone_number": ""  
                },  
                "calls": [  
                  {  
                    "session": {  
                      "sdp_type": "offer",  
                      "sdp": ""  
                    },  
                    "from": "",               
                    "from_user_id": "",                   
      
                      
                    "from_parent_user_id": "",     
      
                    "id": "",  
                    "to": "",  
                    "event": "connect",  
                    "timestamp": "",  
                    "direction": "USER_INITIATED"  
                  }  
                ],  
                "contacts": [  
                  {  
                    "wa_id": "",              
                    "profile": {  
                      "name": "",             
      
                        
                      "username": ""                   
      
                    },  
                    "user_id": ""                       ,  
      
                      
                    "parent_user_id": ""           
                  }  
                ],  
                "messaging_product": "whatsapp"  
              }  
            }  
          ],  
          "id": ""  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

  * `calls`
    * `from` — New behavior (can be omitted). Will be omitted if the username has enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `from_user_id` — New property. Will be set to the user’s BSUID.
    * `from_parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `contacts`
    * `wa_id` — New behavior (can be omitted). 
      * Will be omitted if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `name` — New property. Will be set to the user’s profile name.
    * `username` — New property. If the user has adopted a username, it will be set to the user’s username. Otherwise, it will be omitted.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.

### Business-initiated terminated calls webhooks

These changes apply to business-initiated [terminated calls](/documentation/business-messaging/whatsapp/calling/reference#call-terminate-webhook) webhooks.
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "calls",  
              "value": {  
                "calls": [  
                  {  
                    "biz_opaque_callback_data": "",  
                    "from": "",  
                    "id": "",  
                    "to": "",                
                    "to_user_id": "",                    
      
                      
                    "to_parent_user_id": "",      
      
                    "event": "terminate",  
                    "timestamp": "",  
                    "direction": "BUSINESS_INITIATED",  
                    "status": "COMPLETED"  
                  }  
                ],  
                "metadata": {  
                  "phone_number_id": "",  
                  "display_phone_number": ""  
                },  
                "contacts": [                                   
                  {  
                    "profile": {  
                      
                    "username": ""                   
                    },  
                    "wa_id": "",             
                    "user_id": "",                       
      
                      
                    "parent_user_id": ""          
                  }  
                ],  
                "messaging_product": "whatsapp"  
              }  
            }  
          ],  
          "id": ""  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

  * `calls`
    * `to` — New behavior (can be omitted). Will be set to the user’s phone number if the user has adopted a username and we are able to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be omitted.
    * `to_user_id` — New property. This will be set to the user’s BSUID.
    * `to_parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `contacts` — New array. 
    * `profile`
      * `username` — New property. If the user has adopted a username, it will be set to the user’s username. Otherwise, it will be omitted.
    * `wa_id` — New property. Will be set to the user’s phone number, if the terminated call was made to the user’s phone number. Otherwise, it will be omitted.
    * `user_id` — New property. This will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.

### User-initiated terminated calls webhooks

These changes will apply to user-initiated [terminated calls](/documentation/business-messaging/whatsapp/calling/reference#call-terminate-webhook) webhooks.
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "calls",  
              "value": {  
                "metadata": {  
                  "phone_number_id": "",  
                  "display_phone_number": ""  
                },  
                "calls": [  
                  {  
                    "duration": ,  
                    "start_time": "",  
                    "biz_opaque_callback_data": "",  
                    "end_time": "",  
                    "from": "",               
                    "from_user_id": "",                   
      
                      
                    "from_parent_user_id": "",     
      
                    "id": "",  
                    "to": "",  
                    "event": "terminate",  
                    "timestamp": "",  
                    "direction": "USER_INITIATED",  
                    "status": "COMPLETED"  
                  }  
                ],  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": ""              
      
                        
                      "username": ""                   
                    },  
                    "wa_id": "",              
                    "user_id": "",                        
      
                      
                    "parent_user_id": ""           
                  }  
                ],  
                "messaging_product": "whatsapp"  
              }  
            }  
          ],  
          "id": ""  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

  * `calls`
    * `from` — New behavior (can be omitted). Will be omitted if the user has enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `from_user_id` — New property. Will be set to the user’s BSUID.
    * `from_parent_user_id` — New property. Will be set to the user’s parent BSUID if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `contacts`
    * `profile`
      * `name` — New property. This will be set to the user’s profile name
      * `username` — New property. If the user has adopted a username, it will be set to the user’s username. Otherwise, it will be omitted.
    * `wa_id` — Will be omitted if the user has enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `user_id` — New property. This will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.

### Business-initiated calls status webhooks

These changes will apply to business-initiated [calls status](/documentation/business-messaging/whatsapp/calling/reference#call-status-webhook) webhooks.
    
    
    {  
      "entry": [  
        {  
          "changes": [  
            {  
              "field": "calls",  
              "value": {  
                "statuses": [  
                  {  
                    "biz_opaque_callback_data": "",  
                    "id": "",  
                    "type": "call",  
                    "status": "",  
                    "timestamp": "",  
                    "recipient_id": "",           
                    "recipient_user_id": "",                  
      
                      
                    "recipient_parent_user_id": ""     
                  }  
                ],  
                "metadata": {  
                  "phone_number_id": "",  
                  "display_phone_number": ""  
                },  
                "contacts": [                                        
                  {  
                    "profile": {  
                        
                      "username": ""                       
                    },  
                    "wa_id": "",                  
                    "user_id": "",                            
      
                      
                    "parent_user_id": ""               
                  }  
                ],  
                "messaging_product": "whatsapp"  
              }  
            }  
          ],  
          "id": ""  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

  * `statuses`
    * `recipient_id` — New behavior (can be omitted). 
      * Will be omitted if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `recipient_user_id` — New property. This will be set to the user’s BSUID.
    * `recipient_parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.
  * `contacts` — New array. 
    * `profile`
      * `username` — New property. Will be set to the user’s username, if the user has enabled the usernames feature. Otherwise, it will be omitted.
    * `wa_id` — New property. Will be set to the user’s phone number if the call was made to the user’s phone number. Otherwise, it will be omitted.
    * `user_id` — New property. This will be set to the user’s BSUID.
    * `parent_user_id` — New property. Will be set to the user’s parent BSUID, if you have enabled parent BSUIDs. Otherwise, it will be omitted.

### SIP invites for business-initiated calls

These changes apply to business-initiated calls made using [SIP](/documentation/business-messaging/whatsapp/calling/sip).
    
    
      
    INVITE sip:@wa.meta.vc;transport=tls SIP/2.0  
      
      
    Record-Route:   
    Via: SIP/2.0/TLS 159.65.244.171:5061;received=2803:6081:798c:93f8:5f9b:bfe8:300:0;branch=z9hG4bK0da2.36614b8977461b486ceabc004c723476.0;i=617261  
    Via: SIP/2.0/TLS 137.184.87.1:35181;rport=56533;received=137.184.87.1;branch=z9hG4bKQNa6meey5Dj2g  
    Max-Forwards: 69  
    From: ;tag=Kc9QZg4496maQ  
      
      
    To: @wa.meta.vc>  
      
      
    Call-ID: dc2c5b33-1b81-43ee-9213-afb56f4e56ba  
    CSeq: 96743476 INVITE  
    Contact:   
    User-Agent: SignalWire  
    Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY  
    Supported: timer, path, replaces  
    Allow-Events: talk, hold, conference, refer  
    Session-Expires: 600;refresher=uac  
    Min-SE: 90  
    Content-Type: application/sdp  
    Content-Disposition: session  
    Content-Length: 2427  
    X-Relay-Call-ID: dc2c5b33-1b81-43ee-9213-afb56f4e56ba  
    Remote-Party-ID: ;party=calling;screen=yes;privacy=off  
    Content-Type: application/sdp  
    Content-Length:  2427  
      
      
      
    

  *  — Will be the user’s BSUID or parent BSUID if the call was made to the user’s BSUID or parent BSUID, or the user’s phone number if sent to their phone number.

### SIP invites for user-initiated calls

These changes apply to user-initiated calls made using [SIP](/documentation/business-messaging/whatsapp/calling/sip).
    
    
    INVITE sip:+17015558857@meta-voip.example.com;transport=tls SIP/2.0  
    Via: SIP/2.0/TLS [2803:6080:e888:51aa:d4a4:c5e0:300:0]:33819;rport=33819;received=2803:6080:e888:51aa:d4a4:c5e0:300:0;branch=z9hG4bKPjNvs.IZBnUa1W4l8oHPpk3SUMmcx3MMcE;alias  
    Max-Forwards: 70  
      
      
    From: "" @wa.meta.vc>;tag=bbf1ad6e-79bb-4d9c-8a2c-094168a10bea  
      
      
    To:   
      
      
    Contact: @wa.meta.vc;transport=tls;ob>;isfocus  
      
      
    Call-ID: outgoing:wacid.HBgLMTIxOTU1NTA3MTQVAgASGCAzODg1NTE5NEU1NTBEMTc1RTFFQUY5NjNCQ0FCRkEzRhwYCzE3MDE1NTU4ODU3FQIAAA==  
    CSeq: 2824 INVITE  
    Route:   
    X-FB-External-Domain: wa.meta.vc  
      
      
    x-wa-meta-user-id:   
    x-wa_meta-parent-user-id:   
    x-wa-meta-user-name:   
      
      
    Allow: INVITE, ACK, BYE, CANCEL, NOTIFY, OPTIONS  
    User-Agent: Facebook SipGateway  
    Content-Type: application/sdp  
    Content-Length: 1028  
      
      
      
    

  * `` — Will be set to the user’s BSUID.
  * `` — Will be the user’s BSUID or parent BSUID if the call was made to the user’s BSUID or parent BSUID, or if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be the user’s phone number.
  * `` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `` — Will be the user’s username, if the user has enabled the usernames feature. Otherwise, it will be omitted.

### SIP OK responses for business-initiated calls
    
    
    SIP/2.0 200 OK  
    Via: SIP/2.0/TLS 54.172.60.1:5061;received=2803:6080:f934:8894:7eb5:24f9:300:0;branch=z9hG4bK1e5a.0da2ace9cc912d9e5f2595ca4acb9847.0  
    Via: SIP/2.0/UDP 172.25.10.217:5060;rport=5060;branch=z9hG4bK5cdada8c-cbf0-4369-b02d-cc97d3c36f2b_c3356d0b_54-457463274351249162  
    Record-Route:   
    Record-Route:   
    Record-Route:   
    Record-Route:   
    Call-ID: f304a1d2cafb8139c1f9ff93a7733586@0.0.0.0  
      
      
    From: "" @meta-voip.example.com>;tag=28460006_c3356d0b_5cdada8c-cbf0-4369-b02d-cc97d3c36f2b  
      
      
    To: ;tag=0d185053-2615-46c7-8ff2-250bda494cf1  
    CSeq: 2 INVITE  
    Allow: INVITE, ACK, BYE, CANCEL, NOTIFY, OPTIONS  
    Supported: timer  
    X-FB-External-Domain: wa.meta.vc  
      
      
    @wa.meta.vc;transport=tls;ob;X-FB-Sip-Smc-Tier=collaboration.sip_gateway.sip.prod>;isfocus  
      
      
      
    x-wa-meta-user-id:   
    x-wa_meta-parent-user-id:   
    x-wa-meta-user-name:   
      
      
    Content-Type: application/sdp  
    Content-Length:   645  
      
      
      
    

  * `` — Will be set to the user’s BSUID.
  * `` — Will be the user’s BSUID or parent BSUID if the call was made to the user’s BSUID or parent BSUID, or if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be the user’s phone number.
  * `` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `` — Will be set to the user’s username, if the user has enabled the usernames feature. Otherwise, it will be omitted.

### SIP BYE responses for business- and user-initiated calls
    
    
    BYE sip:+12195550714@103.30.244.182:5061;transport=tls SIP/2.0  
    Via: SIP/2.0/TLS [2803:6080:e800:6746::]:56843;rport;branch=z9hG4bKPj65946b3e6f68128d52b6a498a8fd00a5;alias  
    Record-Route:   
    Record-Route:   
    Via: SIP/2.0/TLS [2803:6080:e800:6746:3347:2251:14a4:a00]:5061;branch=z9hG4bKPj65946b3e6f68128d52b6a498a8fd00a5  
    Via: SIP/2.0/TLS [2803:6080:e934:3f82:b543:8a4d:1414:a00]:52767;rport=52767;received=2803:6080:e934:3f82:b543:8a4d:1414:a00;branch=z9hG4bKPj-D8BXdIVMqAUT9MIJIp78LxKUZNnjYKF;alias  
    Max-Forwards: 69  
      
      
    From: @wa.meta.vc>;tag=0fb8b5f1-2703-49f4-a454-46b1bcb9bfac  
      
      
    To: ;tag=2c21fad0-c581-4e54-a707-3bd52abfcc3f  
    Call-ID: 21e38222-6fcb-4631-8e7d-5b94cf849c90  
    CSeq: 31641 BYE  
      
      
    x-wa-meta-user-id:   
    x-wa_meta-parent-user-id:   
    x-wa-meta-user-name:   
      
      
    X-FB-External-Domain: wa.meta.vc  
    Allow: INVITE, ACK, BYE, CANCEL, NOTIFY, OPTIONS  
    User-Agent: Facebook SipGateway  
    Content-Length:  0  
      
    

  * `` — Will be set to the user’s BSUID.
  * `` — Will be the user’s BSUID or parent BSUID if the call was made to the user’s BSUID or parent BSUID, or if the user has adopted a username and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be the user’s phone number.
  * `` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `` — Will be set to the user’s username, if the user has enabled the usernames feature. Otherwise, it will be omitted.

## Coexistence

### History webhooks

These changes will apply to [history](/documentation/business-messaging/whatsapp/webhooks/reference/history) webhooks that describe an onboarded business customer’s WhatsApp Business app chat history.
    
    
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
                "history": [  
                  {  
                    "metadata": {  
                      "phase": ,  
                      "chunk_order": ,  
                      "progress":   
                    },  
                    "threads": [  
                      /* First chat history thread object */  
                      {  
                        "id": "",             
                        "context": {                                      
                          "wa_id": "",        
                          "user_id": "",                           
      
                            
                          "parent_user_id": "",             
      
                            
                          "username": ""                        
      
                        },  
                        "messages": [  
                          /* First message object in thread */  
                          {  
                            "from": "",    
                            "from_user_id" : "",                   
      
                              
                            "from_parent_user_id": "",      
      
                            "to": "",  
                            "id": "",  
                            "timestamp": ",  
                            "type": "",  
                            "": {  
                                
                            },  
                            "history_context": {  
                              "status": ""  
                            }  
                          },  
                          /* Additional message objects in thread would follow, if any */  
                        ]  
                      },  
                      /* Additional chat history thread objects would follow, if any */  
                    ]  
                  }  
                ]  
              },  
              "field": "history"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `id` — New behavior (can be omitted). Will be omitted if, at the time of the history sync request, the user has already enabled usernames and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
  * `context` — New context object. 
    * `wa_id` — New property. 
      * Will be omitted if, at the time of the sync request, the user has already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
    * `username` — New property. 
      * Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.
  * `messages`
    * `from` — New behavior (can be omitted). 
      * Will be omitted if, at the time of the sync request, the user has already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `from_user_id` — New property. Will be set to the user’s BSUID.
    * `from_parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.

These changes will apply to [history](/documentation/business-messaging/whatsapp/webhooks/reference/history) webhooks that describe a media asset sent from a WhatsApp user to a business customer, or vice-versa.
    
    
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
                      "username": "",                          
                    },  
                    "wa_id": "",             
                    "user_id": "",                                
      
                      
                    "parent_user_id": ""                          
                  },  
                ],  
      
                  
                "messages": [  
                  {  
                    "from": "",              
                    "from_user_id": "",                           
      
                       
                    "from_parent_user_id": "",             
      
                    "id": "",  
                    "timestamp": "",  
                    "type": "",  
                    "": {  
                        
                    }  
                  }  
                ],  
      
                  
                "message_echoes": [  
                  {  
                    "from": "",  
                    "to": "",                
                    "to_user_id": "",                             
      
                      
                    "to_parent_user_id": "",               
      
                    "id": "",  
                    "timestamp": "",  
                    "type": "",  
                    "": {  
                        
                    }  
                  }  
                ]  
      
              },  
              "field": "history"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `contacts` — New object. 
    * `profile`
      * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.
    * `wa_id` — New property. 
      * Will be omitted if, at the time of the sync request, the user has already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `messages`
    * `from` — New behavior (can be omitted). 
      * Will be omitted if, at the time of the sync request, the user has already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `from_user_id` — New property. Will be set to the user’s BSUID.
    * `from_parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `message_echoes`
    * `to` — New behavior (can be omitted). 
      * Will be omitted if, at the time of the sync request, the user has already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `to_user_id` — New property. Will be set to the user’s BSUID.
    * `to_parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.

### smb_message_echoes webhooks

These changes will apply to [smb_message_echoes](/documentation/business-messaging/whatsapp/webhooks/reference/smb_message_echoes) webhooks.
    
    
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
                      "username": ""                      
                    },  
      
                    "wa_id": "",        
                    "user_id": "",                           
      
                      
                    "parent_user_id": ""              
                  }  
                ],  
                "message_echoes": [  
                  {  
                    "from": "",  
                    "to": "",           
                    "to_user_id": "",                        
      
                      
                    "to_parent_user_id": "",          
      
                    "id": "",  
                    "timestamp": "",  
                    "type": "",  
                    "": {  
                        
                    }  
                  }  
                ]  
              },  
              "field": "smb_message_echoes"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `contacts` — New array. 
    * `profile`
      * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.
    * `wa_id` — New property. Will be omitted if, at the time when the business customer used the WhatsApp Business app to send the message to the user, the user had already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `message_echoes`
    * `to` — New behavior (can be omitted). Will be omitted if, at the time when the business customer used the WhatsApp Business app to send the message to the user, the user had already enabled the usernames feature and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
    * `to_user_id` — New property. Will be set to the user’s BSUID.
    * `to_parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.

### smb_app_state_sync webhooks

These changes will apply to [smb_app_state_sync](/documentation/business-messaging/whatsapp/webhooks/reference/smb_app_state_sync) webhooks.
    
    
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
                "state_sync": [  
                  {  
                    "type": "contact",  
                    "contact": {  
                      "full_name": "",  
                      "first_name": "",  
                      "phone_number": "",      
                      "user_id": "",                          
      
                        
                      "parent_user_id": "",            
      
                        
                      "username": ""                       
                    },  
                    "action": "",  
                    "metadata": {  
                      "timestamp": ""  
                    }  
                  },  
                    
                ]  
              },  
              "field": "smb_app_state_sync"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `phone_number` — New behavior (can be omitted). Will be omitted if, at the time of the sync request, the user has already enabled usernames and we are unable to include their phone number based on the conditions described in the Phone numbers section. Otherwise, it will be set to the user’s phone number.
  * `user_id` — New property. Will be set to the user’s BSUID.
  * `parent_user_id` — Will be set to the user’s parent BSUID, if you enabled parent BSUIDs. Otherwise, it will be omitted.
  * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.

### Revoke messages webhooks

These changes will apply to [revoke messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/revoke) webhooks.
    
    
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
                     "name": "",  
      
                       
                     "username": ""              
                   },  
                   "wa_id": "",  
                   "user_id": "",                   
      
                     
                   "parent_user_id": ""      
                 }  
               ],  
               "messages": [  
                 {  
                   "from": "",  
                   "id": "",  
                   "timestamp": "",  
                   "type": "revoke",  
                   "revoke": {  
                     "original_message_id": ""  
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
      
    

  * `contacts`
    * `profile`
      * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — Will be set to the user’s parent BSUID if you enabled parent BSUIDs. Otherwise, it will be omitted.

### Edit messages webhooks

These changes will apply to [edit messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/edit) webhooks.
    
    
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
                     "name": "",  
      
                       
                     "username": ""                
                   },  
                   "wa_id": "",            
                   "user_id": "",                     
      
                     
                   "parent_user_id": ""        
                 }  
               ],  
               "messages": [  
                 {  
                   "from": "",  
                   "id": "",  
                   "timestamp": "",  
                   "type": "edit",  
                   "edit": {  
                     "original_message_id": "",  
                     "message": {  
                       "context": {  
                         "id": ""  
                       },  
                       "type": "image",  
                       "image": {  
                         "caption": "",  
                         "mime_type": "",  
                         "sha256": "",  
                         "id": "",  
                         "url": ""  
                       }  
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
      
    

  * `contacts`
    * `profile`
      * `username` — New property. Will be set to the user’s username, if the user has enabled the username feature. Otherwise, it will be omitted.
    * `wa_id` — New property. Will be omitted if, at the time when WhatsApp user edits the message, the user has already enabled the usernames feature and the phone number cannot be included based on the conditions described in the Phone numbers section. Otherwise, it will be omitted.
    * `user_id` — New property. Will be set to the user’s BSUID.
    * `parent_user_id` — Will be set to the user’s parent BSUID if you enabled parent BSUIDs. Otherwise, it will be omitted.

## Analytics

No changes.

## Billing and invoicing

No changes.

## FAQs

**What do I need to do to support usernames?**

BSUIDs and parent BSUIDs will begin appearing in webhooks payloads in March 2026, before usernames are made available to WhatsApp users. In order to process messages from users who enable the feature once it is available, you will need to support BSUIDs (and parent BSUIDs if you enable them). To do this, you must:

  * Update your webhook integrations to support BSUIDs (and parent BSUID, if using).
  * Build logic to support handling multiple identifiers (phone numbers from non-username adopters; BSUIDs from username adopters if phone number is not present in webhooks), and map relevant fields back to your CRM/database.
  * Update internal and external systems related to these integrations to be able to handle BSUIDs and join with previous identifiers; primarily CRM (either 3P or internal database) and any tools or workflows triggered off of CRM (e.g., triggered campaign messages, campaign management, measurement, billing, and so on).
  * If you still require customer phone numbers, update your messaging bots/journeys (if used) to request phone numbers, handle scenarios where users do not share phone numbers, and iterate on these new conversation journeys. See [WhatsApp Business Solution Terms⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.whatsapp.com%2Flegal%2Fbusiness-solution-terms&h=AT6Ea8-M_LpWC3BbxCOURUbrdqbgrGnSY9LVje8uTiGy-YK53MCmuUkXcahDkiBNDJaTEM-y6kna6NdOekCy2q6d9kbL3X3GJRTHACpTdD0LK8h91IWeHousl57BJS1ScxmlrMmAJ-eyyy877o9kxg) for general restrictions in AI use cases.
  * If you have multiple business portfolios with Meta, you may want to implement a solution to enable central CRM access across multiple portfolios, to minimize the operational overhead that comes with using and storing BSUIDs (and parent BSUIDs).

**When will I receive a BSUID or parent BSUID vs. a phone number?**

When a user adopts a username, they will have phone number privacy meaning their phone number will not be displayed in the app, and their phone number will not be included in webhooks. If the user’s phone number is not present (the wa_id property is missing), you can use their BSUID (or parent BSUID, if using), which will be included and assigned to a new user_id property (`parent_user_id` for parent BSUIDs).

If a user has not adopted usernames, you will receive both their phone number and their BSUID (and parent BSUID, if enabled).

Note that will continue to share the phone number if certain conditions are met. Per our Cloud API Terms of Service, however, phone numbers and related data are retained for a maximum of 30 days to support features like message redelivery. There may be situations where you receive messages from existing users outside of this 30 day window, which may look like a new user thread to you. Therefore, it is essential that you begin supporting BSUIDs as soon as possible, to minimize losing any conversation context.

**Why do partners and directly-integrated businesses using the Cloud API, including directly integrated ads that click to WhatsApp advertisers, have to adopt BSUID?**

Partners and businesses must adopt BSUID to continue processing incoming messages from WhatsApp username adopters. Once BSUID is adopted and user messages from username adopters are processed, message webhooks will no longer include phone numbers in some cases as part of the webhook such as wa_id, so anyone using the Cloud API must ensure all connected systems can handle BSUID. They will also be able to ask for a user’s phone number in-thread.

**If I have not yet adopted BSUIDs and start to receive messages from username adopters which I cannot process, recourse is there?**

If you have not yet adopted BSUID and are not able to process messages from username adopters, there will not be any recourse or corrective action that you can take.

For messages from new customers: the webhook will continue to be sent of an incoming message. Depending on the specifics of the implementation, this may impact your systems that are not equipped to handle incoming messages without user phone numbers, and BSUID assigned to the new user_id field. For messages from your existing customers: the phone number will continue to be included if the conditions described in the Phone numbers section are met.

Once you support BSUIDs, request phone numbers from users by implementing a phone number request button.

**How do business usernames differ from display names? When will a user see a business username vs a display name?**

Business usernames will provide an ability for the users to reach the business by the business’ username, meaning an end user can search for a business username using their exact username and reach out to the businesses. Since end users cannot search by display names, business usernames offer a clear advantage as a searchable and unique identifier for users to reliably find the correct business.

Business usernames must follow specific formatting rules on length and allowed characters, while display names have some more leeway in terms of formatting.

Business usernames are unique and are tied 1-1 to phone numbers, meaning @JaspersMarket would be tied to one phone number while @JaspersMarketCustomerSupport would be tied to another phone number. Display names are not tied 1-1 to phone numbers, meaning the display name Jasper’s Market can have 10 phone numbers under this display name.

When a business has both a username and display name, display name will be shown first (e.g., in Profile, Chat list, Messages, and so on.), for the businesses to build trust with the users and for users to recognize the business when business reaches out to the user.

## Document changelog

### February 18, 2026

  * Clarified that API requests that accept both a phone number and a BSUID or parent BSUID can include both identifiers simultaneously, with the phone number taking precedence. Updated send message requests, send marketing message requests, business-initiated call requests, and block or unblock user requests.

### February 6, 2026

  * Changed number of alphanumeric characters that compose BSUIDs from 256 to 128 alphanumeric characters.
  * Changed how to use a BSUID to send a message; BSUIDs must now be assigned to dedicated properties/fields in message send requests (instead of existing properties/fields supporting both BSUIDs and phone numbers).
  * Changed how country codes will appear in webhooks: they will be prefixed to user BSUIDs instead of assigned to a dedicated webhook property.
  * Added parent BSUID information, which can be used across linked business portfolios.
  * Added contact book information, which can automatically store user phone numbers and BSUIDs.
  * Added phone number request button information.
  * Changed syntax examples, payload examples, and descriptions for all webhooks that returned empty strings in cases where a user has enabled the usernames feature. Now, these properties will not be set to an empty string. Instead, they will be omitted (e.g, the `wa_id` property in incoming messages webhooks).
  * Changed how errors are returned when attempting to adopt or change a business username.
  * Changed response syntax for getting a business’s current username.
  * Removed ability to cancel pending business username requests.
  * Changed phone_number_username_update webhook to business_username_updates webhook.

Did you find this page helpful?

ON THIS PAGE

User usernames

Business-scoped user ID

Parent business-scoped user IDs

Phone numbers

Requesting phone numbers from users

Contact book

Country codes

Business usernames

Reserved usernames

Chat window display priority

Support

Adopt or change a business username

Get current username

Get reserved usernames

Delete a username

business_username_updates webhook

Messages

Send message requests

Send message response

Error codes

Marketing Messages API for WhatsApp

Send marketing message requests

Send marketing message response

Messages webhooks

Status messages webhooks

Incoming messages webhooks

System status messages webhooks

user_preferences webhooks

Groups API

Get group info

Get group join requests

Remove group participants

Groups API webhooks

Status messages webhooks for groups

group_participants_update webhooks

Block Users API

Block or unblock user requests

Block or unblock request responses

Calling API

Businesses-initiated call requests

Get call permissions

Send call permission request

Call permission request webhooks

Business-initiated connected calls webhooks

User-initiated connected calls webhooks

Business-initiated terminated calls webhooks

User-initiated terminated calls webhooks

Business-initiated calls status webhooks

SIP invites for business-initiated calls

SIP invites for user-initiated calls

SIP OK responses for business-initiated calls

SIP BYE responses for business- and user-initiated calls

Coexistence

History webhooks

smb_message_echoes webhooks

smb_app_state_sync webhooks

Revoke messages webhooks

Edit messages webhooks

Analytics

Billing and invoicing

FAQs

Document changelog

February 18, 2026

February 6, 2026

* * *