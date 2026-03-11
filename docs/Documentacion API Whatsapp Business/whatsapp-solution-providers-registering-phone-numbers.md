# Registering business phone numbers

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/registering-phone-numbers

---

# Registering business phone numbers

Updated: Nov 14, 2025

This document describes the steps to programmatically register business phone numbers on WhatsApp Business Accounts (WABA).

Note that **Embedded Signup performs steps 1-3 automatically** (unless you are [bypassing the phone number addition screen](/documentation/business-messaging/whatsapp/embedded-signup/bypass-phone-addition)) so you only need to perform step 4 when a business customer completes the flow. If you have disabled phone number selection, however, you must perform all 4 steps.

Registering business phone numbers is a four step process:

  1. Create the number on a WABA.
  2. Get a verification code for that number.
  3. Use the code to verify the number.
  4. Register the verified number for API use.

These steps are described below.

You can also perform all 4 steps repeatedly to register business phone numbers in bulk.

## Limitations

Business phone numbers must meet our [phone number requirements](/docs/whatsapp/phone-numbers#requirements).

## Step 1: Create the phone number

Send a POST request to the [WhatsApp Business Account > Phone Numbers](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/phone-number-management-api#Creating) endpoint to create a business phone number on a WABA.

### Request syntax
    
    
    POST //phone_numbers

### Post body
    
    
    {  
      "cc": "",  
      "phone_number": "",  
      "verified_name": ""  
    }  
      
    

### Body properties

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required**.  
The phone number’s country calling code.| `1`  
``_String_| **Required.**  
The phone number, with or without the country calling code.| `15551234`  
``_String_| **Required.**  
The phone number’s [display name⁠](https://www.facebook.com/business/help/338047025165344).| `Lucky Shrub`  
  
### Response

Upon success, the API returns a business phone number ID. Capture this ID for use in the next step.
    
    
    {  
      "id": ""  
    }  
      
    

### Response properties

Placeholder |  Description |  Example Value   
---|---|---  
``| An unverified [WhatsApp Business Phone Number](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api) ID.| `106540352242922`  
  
### Example request
    
    
    curl 'https://graph.facebook.com/v25.0/102290129340398/phone_numbers' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAH7...' \
    -d '{
        "cc": "1",
        "phone_number": "14195551518",
        "verified_name": "Lucky Shrub"
    }'

### Example Response
    
    
    {  
      "id": "110200345501442"  
    }  
      
    

## Step 2: Request a verification code

Send a POST request to the [WhatsApp Business Phone Number > Request Code](/documentation/business-messaging/whatsapp/reference/whatsapp-business-pre-verified-phone-number/request-verification-code-api) endpoint to have a verification code sent to the business phone number.

### Request syntax
    
    
    POST //request_code
      ?code_method=
      &language=

### Query string parameters

Placeholder |  Description |  Example Value   
---|---|---  
``| **Required.**  
Indicates how you want the verification code delivered to the business phone number. Values can be `SMS` or `VOICE`.| `SMS`  
``| **Required.**  
Indicates language used in delivered verification code.| `en_US`  
  
### Response
    
    
    {  
      "success":   
    }  
      
    

### Response properties

Placeholder |  Description |  Example Value   
---|---|---  
``| Boolean indicating success or failure.  
Upon success, the API will respond with `true` and a verification code will be sent to the business phone number using the method specified in your request.| `true`  
  
### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/110200345501442/request_code?code_method=SMS&language=en_US' \
    -H 'Authorization: Bearer EAAJB...'

### Example response
    
    
    {  
      "success": true  
    }  
      
    

### Example SMS delivery

Example of an SMS message in English containing a verification code, delivered to a business phone number:
    
    
    WhatsApp code 123-830  
      
    

## Step 3: Verify the number

Send a POST request to the [WhatsApp Business Phone Number > Verify Code](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/verify-code-api) endpoint to verify the business phone number, using the verification code contained in the SMS or voice message delivered to the number.

### Request syntax
    
    
    POST //verify_code
      ?code=

### Query string parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**  
Verification code, without the hyphen.| `123830`  
  
### Response
    
    
    {  
      "success":   
    }  
      
    

### Response properties

Placeholder |  Description |  Example Value   
---|---|---  
``| Boolean indicating success or failure.  
Upon success, the API will respond with `true`, indicating that the business phone number has been verified.| `true`  
  
### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/110200345501442/verify_code?code=123830' \
    -H 'Authorization: Bearer EAAJB...'

### Example response
    
    
    {  
      "success": true  
    }  
      
    

## Step 4: Register the number

Send a POST request to the [WhatsApp Business Phone Number > Register](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/register-api) endpoint to register the business phone number for use with the API.

### Request syntax
    
    
    POST //register

### Post body
    
    
    {  
      "messaging_product": "whatsapp",  
      "pin": ""  
    }  
      
    

### Body properties

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**  
If the verified business phone number already has two-step verification enabled, set this value to the number’s 6-digit two-step verification PIN. If you do not recall the PIN, you can [update](/documentation/business-messaging/whatsapp/business-phone-numbers/two-step-verification#updating-verification-code) it.  
If the verified business phone number does not have two-step verification enabled, set this value to a 6-digit number. This will be the business phone number’s two-step verification PIN.| `123456`  
  
### Response

Upon success, the API will respond with `true`, indicating successful registration.
    
    
    {  
      "success":   
    }  
      
    

### Response properties

Placeholder |  Description |  Example Value   
---|---|---  
``| Boolean indicating success or failure.  
Upon success, the API will respond with `true`, indicating successful registration.| `true`  
  
### Example request
    
    
    curl 'https://graph.facebook.com/v25.0/110200345501442/register' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "pin": "123456"
    }'

### Example response
    
    
    {  
      "success": true  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Limitations

Step 1: Create the phone number

Request syntax

Post body

Body properties

Response

Response properties

Example request

Example Response

Step 2: Request a verification code

Request syntax

Query string parameters

Response

Response properties

Example request

Example response

Example SMS delivery

Step 3: Verify the number

Request syntax

Query string parameters

Response

Response properties

Example request

Example response

Step 4: Register the number

Request syntax

Post body

Body properties

Response

Response properties

Example request

Example response

* * *