# Register a Business Phone Number

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/registration

---

# Register a Business Phone Number

Updated: Nov 4, 2025

To use your business phone number with Cloud API you must register it. Register your business phone number in the following scenarios:

  * Account creation: When you implement this API, register the business phone number you want to use. Meta enforces two-step verification during account creation to add an extra layer of security to your accounts.
  * Name Change: In this case, your phone is already registered and you want to change your display name. To do that, you must [first file for a name change on WhatsApp Manager⁠](https://www.facebook.com/business/help/378834799515077). Once the name is approved, you need to register your phone again under the new name.

Before you can register your business phone number you must first [verify its ownership](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#verify).

### Migration exception

If you are migrating a phone number from the On-Premises API to the Cloud API, there are extra steps you need to perform before registering a phone number with the Cloud API. See [Migrate From On-Premises API to Cloud API](/documentation/business-messaging/whatsapp/support/migrating-from-onprem-to-cloud) for the full process.

## Register a business phone number

To register your verified business phone number, make a `POST` call to `PHONE_NUMBER_ID/register`. Include the parameters listed below.

Endpoint |  Authentication   
---|---  
`PHONE_NUMBER_ID/register`(See [Get Phone Number ID](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#get-all-phone-numbers))| Solution Partners must authenticate themselves with an access token with the `whatsapp_business_management` and `whatsapp_business_messaging` permissions.  
  
### Limitations

Requests to the registration endpoint are limited to 10 requests per business number in a 72-hour moving window.

When you make a registration request, the API checks how many registration requests you have made to register that number in the last 72 hours. If you have already made 10 requests, the API will return error code `133016`, and the number will be prevented from being registered for the next 72 hours.

### Parameters

Name |  Description   
---|---  
`messaging_product`| **Required.** Messaging service used. Set this to `"whatsapp"`.  
`pin`| **Required.** If your verified business phone number already has two-step verification enabled, set this value to your number’s 6-digit two-step verification PIN. If you cannot recall your PIN, you can change it. See [Two-step verification](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#two-step-verification).If your verified business phone number does not have two-step verification enabled, set this value to a 6-digit number. This will be the newly verified business phone number’s two-step verification PIN.  
`data_localization_region`| **Optional.**  
If included, enables [local storage](/documentation/business-messaging/whatsapp/local-storage) on the business phone number. Value must be a 2-letter ISO 3166 country code (for example, `IN`) indicating the country where you want data-at-rest to be stored.  
Supported values:  
**APAC**

  * Australia: `AU`
  * Indonesia: `ID`
  * India: `IN`
  * Japan: `JP`
  * Singapore: `SG`
  * South Korea: `KR`

**Europe**

  * EU (Germany): `DE`
  * Switzerland: `CH`
  * United Kingdom: `GB`

**LATAM**

  * Brazil: `BR`

**MEA**

  * Bahrain: `BH`
  * South Africa: `ZA`
  * United Arab Emirates: `AE`

**NORAM**

  * Canada: `CA`

Once enabled, cannot be disabled or changed directly. Instead, you must deregister the number and register it again without this parameter (to disable), or include the parameter with the new country code (to change).  
To enable local storage on a number that has already been registered, you must deregister the number, then register it again and include this parameter.  
  
### Example request without local storage
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/register ' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "pin": "212834"
    }

### Example request with local storage
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/register ' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "pin": "212834",
      "data_localization_region": "CH"
    }

All API calls require authentication with access tokens.

Developers can authenticate their API calls with the access token generated in the **App Dashboard** > **WhatsApp** > **API Setup**.

Solution Partners must authenticate themselves with an access token with the `whatsapp_business_messaging` and `whatsapp_business_management` permissions. See [System User Access Tokens](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) for information.

## Deregister a business phone number

Deregistering a business phone number makes it unusable with Cloud API and disables [local storage](/documentation/business-messaging/whatsapp/local-storage) on the number, if it had been enabled.

To deregister a business phone number, make a `POST` call to `PHONE_NUMBER_ID/deregister`:

Endpoint |  Authentication   
---|---  
`PHONE_NUMBER_ID/deregister`(See [Get Phone Number ID](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#get-all-phone-numbers))| Solution Partners must authenticate themselves with an access token with the `whatsapp_business_management` and `whatsapp_business_messaging` permissions.  
  
### Limitations

  * This endpoint cannot be used to deregister a business phone number that is in use with [both Cloud API and the WhatsApp Business app](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users).
  * Deregistration does not delete a number or its message history. To delete a number and its history, see [Delete Phone Number from a WABA](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#deleting-business-phone-numbers).
  * Requests to the deregistration endpoint are limited to 10 requests per business number in a 72-hour moving window. If you exceed this amount, the API will return error code `133016`, and the business phone number will be prevented from being deregistered for the next 72 hours.

### Example

Sample Request:
    
    
    curl -X POST \
     'https://graph.facebook.com/v25.0/FROM_PHONE_NUMBER_ID/deregister' \
     -H 'Authorization: Bearer ACCESS_TOKEN'

A successful response looks like:
    
    
    {
      "success": true
    }
    

## See also

  * [Resetting your PIN](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#changing-your-pin-via-whatsapp-manager)
  * [Cloud API Local Storage](/documentation/business-messaging/whatsapp/local-storage)

Did you find this page helpful?

ON THIS PAGE

Migration exception

Register a business phone number

Limitations

Parameters

Example request without local storage

Example request with local storage

Deregister a business phone number

Limitations

Example

See also

* * *