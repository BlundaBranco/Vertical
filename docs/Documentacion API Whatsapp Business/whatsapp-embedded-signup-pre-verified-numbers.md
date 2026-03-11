# Pre-verified phone numbers

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/pre-verified-numbers

---

# Pre-verified phone numbers

Updated: Dec 12, 2025

This document explains how to offer your business customers pre-verified business phone numbers. Pre-verified business phone numbers are WhatsApp business phone numbers that have already been verified by you, eliminating the need for customers to have to contact you for a one-time password.

Note that pre-verified business phone numbers are represented by [WhatsApp Business Pre-Verified Phone Number](/documentation/business-messaging/whatsapp/reference/business/whatsapp-business-pre-verified-phone-numbers-api) objects, which are **temporary**. When a business customer selects one of these numbers and completes the Embedded Signup flow, the temporary object will be replaced by a valid [WhatsApp Business Phone Number](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api) object. You must get this new object’s ID and use it to [register the number](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers#step-4--register-the-number) within 90 days.

## Requirements

  * Your business must be an approved Solution Partner.
  * The app user must be a [business admin⁠](https://www.facebook.com/business/help/623924618023072) on the business account that pre-verified business phone numbers are added to.
  * A [User](/documentation/business-messaging/whatsapp/access-tokens#user-access-tokens) or [System User access token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens).
  * The [business_management](/docs/permissions/reference/business_management) permission.
  * Business phone numbers [must be valid](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers).

## Limitations

  * You are responsible for keeping track of who has claimed a pre-verified business phone number.
  * If a pre-verified business phone number is not claimed by an end client in the Embedded Signup flow within 90 days of verification, the number will revert to an unverified status and must be verified again to have its status restored for another 90 days.
  * Unclaimed pre-verified business phone numbers can’t be re-verified until 45 days before they are scheduled to revert to an unverified status. This time is indicated by the [`verification_expiry_time` field](/documentation/business-messaging/whatsapp/reference/business/whatsapp-business-pre-verified-phone-numbers-api#fields).
  * If you add a phone number to your pool of pre-verified business phone numbers (Step 1) but do not verify it within 90 days (Step 3), it will be removed from your pool and you will have to add it again.
  * Once a business customer claims a pre-verified business phone number, you have 90 days to register it.

## Creating pre-verified numbers

Follow these steps to create a pre-verified business phone number, surface it in Embedded Signup, and register it after it has been claimed by a business customer.

### Step 1: Create a pre-verified business phone number

Use the [**POST / /add_phone_numbers**](/docs/marketing-api/reference/business/add_phone_numbers#Creating) endpoint to add a pre-verified business phone number to your business portfolio’s pool of business phone numbers.

#### Request Syntax
    
    
    POST //add_phone_numbers
      ?phone_number=

#### Response

Upon success, the API will return a [WhatsApp Business Pre-Verified Phone Number](/documentation/business-messaging/whatsapp/reference/business/whatsapp-business-pre-verified-phone-numbers-api) ID. Capture this value for use in the next request.
    
    
    {  
      "id": ""  
    }  
      
    

#### Sample Request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/506914307656634/add_phone_numbers?phone_number=15550783881' \
    -H 'Authorization: Bearer EAAJB...'

#### Sample Response
    
    
    {  
      "id": "106540352242922"  
    }  
      
    

### Step 2: Request a verification code

Use the [**POST / /request_code**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-pre-verified-phone-number/request-verification-code-api#Creating) endpoint to request a one-time-password over SMS or voice for the newly created pre-verified business phone number.

#### Request Syntax
    
    
    POST //request_code
      ?code_method=
      &language=

#### Response

Upon success, the API will return `true`.
    
    
    {  
      "success":   
    }  
      
    

In addition, we will send an SMS or voice message containing a one-time-password to the phone number. Capture the one-time-password for use in the next request.

#### One-Time-Password SMS Syntax
    
    
    WhatsApp code   
      
    

#### One-Time-Password Voice Message Syntax

Repeated three times.
    
    
    Verification code is   
      
    

#### Sample Request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/106540352242922/request_code?code_method=SMS&language=en_US' \
    -H 'Authorization: Bearer EAAJB...'

#### Sample Response
    
    
    {  
      "success": true  
    }  
      
    

#### Sample One-Time-Password SMS Message
    
    
    WhatsApp code 123-456  
      
    

#### Sample One-Time-Password Voice Message

Repeated three times.
    
    
    Verification code is 123456  
      
    

### Step 3: Verify the number

Use the [**POST / /verify_code**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-pre-verified-phone-number/verify-code-api#Creating) endpoint to verify the number using its one-time-password.

#### Request Syntax
    
    
    POST //verify_code
      ?code=

#### Response

Upon success, the API will return `true` and the number will have its `code_verification_status` set to `VERIFIED` for 90 days.
    
    
    {  
      "success":   
    }  
      
    

#### Sample Request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/106540352242922/verify_code?code=123456' \
    -H 'Authorization: Bearer EAAJB...'

#### Sample Response
    
    
    {  
      "success": true  
    }  
      
    

Once you have a pre-verified business phone number with a verified status (or a set of such numbers), display them in the new Embedded Signup flow.

## Displaying pre-verified numbers in Embedded Signup

You can display pre-verified business phone numbers in the Embedded Signup flow using [pre-filled form data](/documentation/business-messaging/whatsapp/embedded-signup/pre-filled-data). To do this, add a `preVerifiedPhone` object with an `ids` property to the `setup` object and assign the IDs of your pre-verified business phone numbers as an array of strings to the `ids` property:
    
    
    {  
      scope: '',  
      extras: {  
        feature: '',  
        setup: {  
          preVerifiedPhone: {  
            ids: []  
          }  
        }  
      }  
    }  
      
    

For example:
    
    
    {  
      scope: 'business_management,whatsapp_business_management',  
      extras: {  
        feature: 'whatsapp_embedded_signup',  
        version: 2,  
        setup: {  
      business: {  
        name: 'Acme Inc.',  
        email: 'johndoe@acme.com',  
        phone: {  
          code: 1,  
          number: '6505551234'  
            },  
        website: 'https://www.acme.com',  
            address: {  
              streetAddress1: '1 Acme Way',  
              city: 'Acme Town',  
              state: 'CA',  
              zipPostal: '94000',  
              country: 'US'  
            },  
            timezone: 'UTC-08:00'  
          },  
          phone: {  
            displayName: 'Acme Inc.',  
            category: 'ENTERTAIN',  
            description: 'Gears and widgets'  
          },  
          preVerifiedPhone: {  
            ids: ['106540352242922','105954558954427']  
          }  
        }  
      }  
    }  
      
    

Note that if a pre-verified business phone number with a status of `VERIFIED` is not claimed within 90 days of verification, its status will be set to `UNVERIFIED` but it will still appear in the Embedded Signup flow. If a business customer attempts to claim an unverified number, they must complete verification on their own, which means they must request a one-time password from you.

To prevent this experience, **we recommend that you keep track of when you verified a number and re-verify it before it reverts to an unverified state.**

If you don’t know when you last verified a given pre-verified business phone number, request the `code_verification_time` and `verification_expiry_time` fields on the pre-verified business phone number ID. These fields indicate its most recent verification time and its verification expiration time.

## Determining if a number has been claimed through Embedded Signup

See Getting claimed phone number IDs.

## Getting and registering claimed phone numbers

Once a business customer claims a pre-verified business phone number, it will be replaced with a verified WhatsApp business phone number (a [WhatsApp Business Phone Number](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api#Reading) object with a `code_verification_status` set to `VERIFIED`).

You will have 90 days to [register this number](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers#step-4--register-the-number) using its ID. If you do not register it within this time frame, it will revert to an `UNVERIFIED` status and you will have to [request a new verification code](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers#step-2--request-a-verification-code) and use the code to [verify the WhatsApp business phone number](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers#step-3--verify-the-number) again.

### Getting claimed numbers via session logging

If you are using [session logging](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener), the ID will be returned in a message event and captured by your event listener. Send this ID to your server and then use it to register the WhatsApp business phone number.

### Getting claimed numbers via API

If you are not using session logging, use the [**GET / /phone_numbers**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/phone-number-management-api#Reading) endpoint to get a list of WhatsApp business phone numbers on the WhatsApp Business Account.

Parse for the `display_phone_number` property on each object returned in the result set. If an object in the result set has a `display_phone_number` value that matches a number you used to create a pre-verified business phone number, the object represents the WhatsApp business phone number that has replaced the pre-verified business phone number. Copy this object’s ID and use it to register the WhatsApp business phone number.

Alternatively, you can use the same endpoint with `field` expansion to request the `display_phone_number` field and specify the display phone number. For example:
    
    
    GET /102290129340398/phone_numbers?display_phone_number=16505551234

## Get pre-verified business phone numbers

Use the [**GET / /preverified_numbers**](/docs/marketing-api/reference/business/preverified_numbers#Reading) endpoint to get a list of all [WhatsApp Business Pre-Verified Phone Number](/documentation/business-messaging/whatsapp/reference/business/whatsapp-business-pre-verified-phone-numbers-api) objects, regardless of their verification status, in your business account’s pool of pre-verified business phone numbers:
    
    
    GET //preverified_numbers

Results are automatically sorted in order of creation time. You can also use field expansion to request the `code_verification_status` field to have the API only return pre-verified business phone numbers with the indicated verification state:
    
    
    GET //preverified_numbers?code_verification_status=VERIFIED

## Sharing and unsharing pre-verified numbers

Use the [**POST / /share_preverified_numbers**](/docs/marketing-api/reference/business/share_preverified_numbers#Updating) endpoint to to share pre-verified business phone numbers with a [multi-partner solution](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions) you are a part of, or a DELETE request to the same endpoint to unshare them.

Shared pre-verified business phone numbers can be surfaced by partners of a solution in their implementation of Embedded Signup.

If you are sharing numbers with multiple business partners, we recommend that you advise your partners to get a list of shared pre-verified numbers before surfacing them in Embedded Signup. This reduces the likelihood of a partner attempting to surface a number that has already been claimed (claimed numbers do not appear in the flow, but the partner might not know this and wonder why it’s not appearing).

### Sharing Request Syntax
    
    
    POST //share_preverified_numbers
      ?partner_business_id=
      &preverified_id=

### Unsharing Request Syntax
    
    
    DELETE //share_preverified_numbers
      ?partner_business_id=
      &preverified_id=

### Response

Upon success, the API will return true. If sharing, notify your business partner of the newly shared pre-verified number and provide them with the number’s ID. If unsharing, the number will no longer appear in the partner’s implementation of Embedded Signup.
    
    
    {  
      "success":   
    }  
      
    

### Example Sharing Request
    
    
    curl -X POST 'https://graph.facebook.com/v17.0/share_preverified_numbers?partner_business_id=506914307656634&preverified_id=1706193509821738' \  
    -H 'Authorization: Bearer EAAH0...'  
      
    

### Example Unsharing Request
    
    
    curl -X DELETE 'https://graph.facebook.com/v17.0/share_preverified_numbers?partner_business_id=506914307656634&preverified_id=1706193509821738' \  
    -H 'Authorization: Bearer EAAH0...'  
      
    

### Example Response
    
    
    {  
      "success": true  
    }  
      
    

## Registering pre-verified numbers programmatically

If you have customized Embedded Signup to [bypass the phone number addition screen](/documentation/business-messaging/whatsapp/embedded-signup/bypass-phone-addition), you can register pre-verified business phone numbers on an onboarded business customer’s WhatsApp Business Account programmatically. To do this, first complete all of the steps to create a pre-verified number, then use the pre-verified number ID to complete **Step 1** and **Step 4** in the [Register Phone Numbers](/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers) document.

Did you find this page helpful?

ON THIS PAGE

Requirements

Limitations

Creating pre-verified numbers

Step 1: Create a pre-verified business phone number

Request Syntax

Response

Sample Request

Sample Response

Step 2: Request a verification code

Request Syntax

Response

One-Time-Password SMS Syntax

One-Time-Password Voice Message Syntax

Sample Request

Sample Response

Sample One-Time-Password SMS Message

Sample One-Time-Password Voice Message

Step 3: Verify the number

Request Syntax

Response

Sample Request

Sample Response

Displaying pre-verified numbers in Embedded Signup

Determining if a number has been claimed through Embedded Signup

Getting and registering claimed phone numbers

Getting claimed numbers via session logging

Getting claimed numbers via API

Get pre-verified business phone numbers

Sharing and unsharing pre-verified numbers

Sharing Request Syntax

Unsharing Request Syntax

Response

Example Sharing Request

Example Unsharing Request

Example Response

Registering pre-verified numbers programmatically

* * *