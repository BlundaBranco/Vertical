# Cloud API Calling

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling

---

# Cloud API Calling

Updated: Dec 10, 2025

## Overview

The WhatsApp Business Calling API enables you to initiate and receive calls with users on WhatsApp using Voice over Internet Protocol (VoIP).

### Architecture

(_Right click image and choose “Open in new tab” for enlarged image_)

### Signaling and media possible configurations

|  Default configuration after enabling calling |  SIP with WebRTC |  SIP with SDES media   
---|---|---|---  
Signaling protocol| Graph APIs + Webhooks| SIP (needs explicit [enablement](/documentation/business-messaging/whatsapp/calling/sip#configure-update-sip-settings-on-business-phone-number))| SIP (needs explicit [enablement](/documentation/business-messaging/whatsapp/calling/sip#configure-update-sip-settings-on-business-phone-number))  
Signaling transport| HTTPS| TLS| TLS  
Media protocol| WebRTC (ICE + DTLS1 \+ SRTP)| WebRTC (ICE + DTLS + SRTP)| [SDES⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc4568&h=AT4l3eE7nmFC1mOb8dQ4ingXBgLucJXDzcuzweN-9f0BxstezRjPUYH_FuWa0FnQoP5L1pU1VS3jCWt1tmTDldHwR8xpEYTQ8x-PpyvUYuzlPMwYcJ4GhqejVhCC4L-U7vR5RTzHgR8K1yOTixOj0Q) SRTP (needs explicit [enablement](/documentation/business-messaging/whatsapp/calling/sip#configure-sdes-for-srtp-key-exchange-protocol))  
Audio codec2| OPUS| OPUS| OPUS  
  
**Notes**

  1. You can use SDES instead of ICE+DTLS with Graph API + Webhook signaling
  2. Support for G.711 Audio codec is coming soon (available in Alpha for select partners)

## Get started

### Step 1: Prerequisites

Before you get started with the Calling API, ensure that:

  1. [Your business number is in use with Cloud API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) (not the WhatsApp Business app)
  2. Subscribe your app to the `calls` webhook field (unless you plan to use [SIP](/documentation/business-messaging/whatsapp/calling/sip))
  3. The same app should also be [subscribed to the WhatsApp Business Account](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint#configure-webhooks) of your business phone number.
  4. This app should have messaging permissions (`whatsapp_business_messaging`) for the business number
  5. The business must have a messaging limit of at least [2000 business-initiated conversations](/documentation/business-messaging/whatsapp/messaging-limits) in a rolling 24-hour period. More details on [scaling your account capabilities⁠](https://www.facebook.com/business/help/595597942906808).
  6. [Enable Calling features on your business phone number](/documentation/business-messaging/whatsapp/calling/call-settings)

### Step 2: Configure optional calling features

The WhatsApp Business Calling API offers a number of features that affect when and how calling features appear to users on your WhatsApp profile

  * Inbound call control allows you to prevent users from placing calls from your business profile
  * Business call hours allows you to avoid missed calls and direct users to message when your call center is closed
  * Callback requests offer users the option to request a callback when you don’t pick up a call or if your call center is closed

[Learn more about call control settings](/documentation/business-messaging/whatsapp/calling/call-settings#parameter-details)

### Step 3: Make and receive calls

You can test your WhatsApp Calling integration using public test numbers and Sandbox WhatsApp Business Account.

[Learn more about testing your WhatsApp Calling API integration](/documentation/business-messaging/whatsapp/calling#testing-and-sandbox-accounts)

Cloud API Calling offers two call initiation paths:

  * **User-initiated calls:** Calls that are made from a WhatsApp user to your business
  * **Business-initiated calls:** Calls that are made from your business to a WhatsApp user

## Testing and Sandbox accounts

Sandbox accounts are only available to Tech Partners.

[Sandbox accounts](/documentation/business-messaging/whatsapp/calling/sandbox) and public test numbers enable you to test you WhatsApp Calling API integration with relaxed calling limitations. Specifically business initiated calling limits are relaxed for Sandbox accounts and public test numbers to help integration and testing efforts.

#### Limits (Per business + WhatsApp user pair)

  * Sandbox accounts can send **25 call permissions per day** and **100 per week** (compared to 1 per day and 2 per week for production accounts)
  * When business-initiated calls go unanswered or are rejected 
    * **5 consecutive unanswered calls** result in system message to reconsider an approved permission (compared to 2 consecutive unanswered calls for production accounts)
    * **10 consecutive unanswered calls** result in an approved permission being automatically revoked. (compared to 4 consecutive unanswered calls for production accounts)

You obtain a public test number after completing the [Get Started flow.](/documentation/business-messaging/whatsapp/get-started)

You are also not required to have a messaging limit of at least [2000 business-initiated conversations](/documentation/business-messaging/whatsapp/messaging-limits) in a rolling 24-hour period to test Calling API features when using public test numbers and Sandbox accounts.

Calling is disabled by default on test numbers. You must [configure calling features in phone number call settings](/documentation/business-messaging/whatsapp/calling/call-settings#configure-call-settings) before using the Calling API on a test number.

[Learn more about Sandbox Accounts for Calling](/documentation/business-messaging/whatsapp/embedded-signup/overview#sandbox-accounts)

## Availability

#### User-initiated calling

User-initiated calling is available in [every location Cloud API is available](/documentation/business-messaging/whatsapp/support#country-restrictions).

#### Business-initiated calling

Business-initiated calling is currently available in [every location Cloud API is available](/documentation/business-messaging/whatsapp/support#country-restrictions), **except the following countries:**

  * USA
  * Canada
  * Egypt
  * Vietnam
  * Nigeria

**Note:** The business phone number’s country code must be in this supported list. The consumer phone number can be from any [country where Cloud API is available.](/documentation/business-messaging/whatsapp/support#country-restrictions)

## Next steps

Use the guides below to integrate calling features in your application:

  * [Learn how to receive user-initiated calls](/documentation/business-messaging/whatsapp/calling/user-initiated-calls)
  * [Learn how to place business-initiated calls](/documentation/business-messaging/whatsapp/calling/business-initiated-calls)
  * [Learn how to drive consumer awareness of calling availability in your business](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links)

## Changelog

Use this table as a centralized place to keep track of feature updates related to WhatsApp Business Calling APIs

Date |  Title |  Description   
---|---|---  
January 27, 2026| Calling restrictions based on user feedback are now in effect| Learn more about [calling restrictions based on user feedback](/documentation/business-messaging/whatsapp/calling/call-settings#calling-restrictions-for-user-feedback).  
December 19, 2025| Update in business initiated call limit| The number of business-initiated calls per user has been increased to 100 per day from 10 per day.[Learn more about business-initiated call limits](/documentation/business-messaging/whatsapp/calling/user-call-permissions#limits--per-business---whatsapp-user-pair-)  
December 10, 2025| Introduced `restrict_to_user_countries` for call icon settings| Now you can control in which countries the call icon should be visible. [Learn more about call icon country settings](/documentation/business-messaging/whatsapp/calling/call-settings#call-icons).  
October 13, 2025| 

  * Update in business initiated call limit
  * Added “Testing and Sandbox” section to documentation

| The number of business-initiated calls per user has been increased to 10 per day from 5 per day.[Learn more about business-initiated call limits](/documentation/business-messaging/whatsapp/calling/user-call-permissions#limits--per-business---whatsapp-user-pair-)A [Testing and Sandbox accounts](/documentation/business-messaging/whatsapp/calling#testing-and-sandbox-accounts) has been added to the documentation  
September 29, 2025| Asterisk integration guide| New guide to [integrate with Asterisk](/documentation/business-messaging/whatsapp/calling/integration-examples#asterisk-using-sip)  
September 24, 2025| Context propagation from call buttons and deep links| Specify an opaque string in call buttons or call deep links to help with tracking the origin of user-initiated calls. [Learn more](/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links)  
September 8, 2025| Health status API calling update| [Health Status API](/documentation/business-messaging/whatsapp/support/health-status) is now extended to include a new `can_receive_call_sip` field to help you self-diagnose issues related to [SIP](/documentation/business-messaging/whatsapp/calling/sip) setup  
September 5, 2025| Introduced new low call pickup calling restrictions| Low call pickup rate restrictions are now in effect. Learn more at [Calling Restriction for Low Call Pickup Rates](/documentation/business-messaging/whatsapp/calling/call-settings#calling-restrictions-for-low-call-pickup-rates)  
July 21, 2025| Account settings update webhooks| Get webhooks when settings are updated. [Learn more](/documentation/business-messaging/whatsapp/calling/call-settings#settings-update-webhooks).  
  
Did you find this page helpful?

ON THIS PAGE

Overview

Architecture

Signaling and media possible configurations

Get started

Step 1: Prerequisites

Step 2: Configure optional calling features

Step 3: Make and receive calls

Testing and Sandbox accounts

Limits (Per business + WhatsApp user pair)

Availability

User-initiated calling

Business-initiated calling

Next steps

Changelog

* * *