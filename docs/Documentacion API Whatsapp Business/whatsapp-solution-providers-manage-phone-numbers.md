# Business customer phone numbers

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/manage-phone-numbers

---

# Business customer phone numbers

Updated: Feb 27, 2026

This document describes business customer phone numbers, their requirements, and endpoints commonly used to manage business phone numbers.

## Basics

Your business customers need a dedicated number to use WhatsApp. Phone numbers already in use with the WhatsApp app are not supported, but numbers in use with the WhatsApp Business app [can be registered](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users).

Business customers can have multiple phone numbers associated with their [Meta Business Account⁠](https://business.facebook.com/settings/), so they can add another number for API use if they wish.

When completing the Embedded Signup flow, your business customers should use a phone number and display name that they want to have appear in the WhatsApp app. We strongly discourage signing up with a test or personal number, or test display name, as are difficult to change.

  * For more detailed information relating to phone numbers and WhatsApp for Business Platform, see [Phone Numbers](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers).
  * For information on how to migrate an existing registered WhatsApp phone number, see [Migrate Phone Number](/documentation/business-messaging/whatsapp/solution-providers/support/migrating-phone-numbers-among-solution-partners-via-embedded-signup).

## Instructions for business customers

This section is directed towards customers of Embedded Signup and provides guidance about actions they may perform relating to phone numbers.

### Add Phone Numbers to a WhatsApp Business Account

There are two methods to add additional numbers to a WhatsApp Business Account (WABA):

  1. **[Recommended]** Go through the embedded signup flow again, select the existing Business Manager & WABA, add the number, and verify it.
  2. In the **Business Manager** , go to the **Phone Numbers** tab of **WhatsApp Manager** , and select **Add Phone Number**. When using this option, the Solution Partner has to manually verify the phone number as phone verification is not available in the Business Manager. For this reason, it is recommended that businesses follow the embedded signup flow to add additional numbers.

## Instructions for Solution Partners

This section is directed towards Solution Partners and provides instructions for managing customer phone numbers.

### Getting phone numbers

Use the [GET //phone_numbers](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/phone-number-management-api#Reading) endpoint to get a list of business phone numbers on a business customer’s WABA.

#### Request
    
    
    curl 'https://graph.facebook.com///phone_numbers' \
    -H 'Authorization: Bearer '

#### Response

Upon success:
    
    
    {
      "data": [
        {
          "verified_name": "",
          "code_verification_status": "",
          "display_phone_number": "",
          "quality_rating": "",
          "platform_type": "CLOUD_API",
          "throughput": {
            "level": ""
          },
          "webhook_configuration": {
            "application": ""
          },
          "id": ""
        }
      ],
      "paging": {
        "cursors": {
          "before": "",
          "after": ""
        }
      }
    }

### Register phone numbers

After a successful phone verification from the Embedded Signup flow, registration should succeed with an API call to the [`register` endpoint](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/register-api#Creating). For this, provide any `code_method` (`sms`| `voice`). Since the phone number is already verified, you do not need to worry about the registration code.  
---|---  
  
Alternatively, **you can pre-verify phone numbers** and offer them to your customers in the new Embedded Signup flow. This prevents customers from having to contact you for a one-time password during the onboarding process. See [Pre-Verified Phone Numbers](/documentation/business-messaging/whatsapp/embedded-signup/pre-verified-numbers).

A phone number **must** be registered up to 14 days after going through the Embedded Signup flow. If a number is not registered during that window, the phone must go through to the Embedded Signup flow again prior to registration.

### Get phone metadata

The `phone_numbers` endpoint allows you to see the status of a phone number’s display name and other metadata.

#### Example request

In the following example, use the ID for the assigned WABA.
    
    
    curl -i -X GET "https://graph.facebook.com///phone_numbers
      ?fields=
        display_phone_number,
        name_status,
        new_name_status
      &access_token="

To find the ID of a WhatsApp Business Account, go to [**Business Manager** ⁠](https://business.facebook.com/) > **Business Settings** > **Accounts** > **WhatsApp Business Accounts**. Find the account you want to use and click on it. A panel opens, with information about the account, including the ID.

#### Example response
    
    
    {
      "data": [
        {
          "id": "1972385232742141",
          "display_phone_number": "+1 631-555-1111",
          "last_onboarded_time": "2023-08-22T19:05:53+0000",
          "name_status": "APPROVED",
          "new_name_status": "APPROVED",
        }
      ]
    }

### Response parameters

Name |  Description   
---|---  
`name_status`| The review status of the current display name request. Available Options:

  * `APPROVED`: The name has been approved.
  * `DECLINED`: The name has not been approved.
  * `EXPIRED`: The approved name has expired.
  * `PENDING_REVIEW`: Your name request is under review.
  * `NONE`: No display name has been set.

  
`new_name_status`| The review status of a display name change request. This field returns data only if a display name change was requested.  
  
### Get phone number OTP status

To see if a phone number has been verified via OTP (one-time password), check that number’s `code_verification_status` field. First, make a `GET` call to the `///phone_numbers
      ?access_token="

The response includes the code_verification_status with one of the following options: `VERIFIED` or `NOT_VERIFIED`. A sample response looks like this:
    
    
    [
      {
        "code_verification_status": "NOT_VERIFIED",
        "id": "1754951608042154"
      }
    ]

Alternatively, you can get the status by calling a phone number’s ID:
    
    
    curl -i -X GET \
    "https://graph.facebook.com//
      ?access_token="

Use the [WhatsApp Business Account > Phone Numbers](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/phone-number-management-api#Reading) endpoint to get a phone number’s ID. See [Retrieve Phone Numbers](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#get-all-phone-numbers) for usage details.

### Filter phone numbers by account mode

You can query phone numbers and filter them based on their `account_mode`. For the request, you can use the parameters listed below.

#### Request parameters

Name |  Description   
---|---  
`field`| Contains the field being used for filtering. In this example, you should use `account_mode`.  
`operator`| Contains how you want to filter the accounts. In this example, you should use `EQUAL`.  
`value`| Contain what account mode you are looking for. Supported Values:

  * `SANDBOX`: The account is unverified.
  * `LIVE`: The account is not eligible for the unverified trial experience or it has upgraded to a verified account.

  
  
#### Example request

In the following example, use the ID for the assigned WABA.
    
    
    curl -i -X GET "https://graph.facebook.com///phone_numbers
      ?filtering=[{
        "field":"account_mode",
        "operator":"EQUAL",
        "value":"SANDBOX"}]
      &access_token="

#### Example response
    
    
    {
      "data": [
        {
          "id": "1972385232742141",
          "display_phone_number": "+1 631-555-1111",
          "verified_name": "John’s Cake Shop",
          "quality_rating": "UNKNOWN",
        }
      ],
      "paging": {
      "cursors": {
        "before": "abcdefghij"
        "after": "klmnopqr"
      }
       }
    }

## Learn More

  * [Phone numbers: WhatsApp for Business Platform Overview](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)
  * [Phone numbers: Migrate an existing registered number](/documentation/business-messaging/whatsapp/solution-providers/support/migrating-phone-numbers-among-solution-partners-via-embedded-signup)
  * Reference: [WhatsApp Business Account](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/whatsapp-business-account-api)

Did you find this page helpful?

ON THIS PAGE

Basics

Instructions for business customers

Add Phone Numbers to a WhatsApp Business Account

Instructions for Solution Partners

Getting phone numbers

Request

Response

Register phone numbers

Get phone metadata

Example request

Example response

Response parameters

Get phone number OTP status

Filter phone numbers by account mode

Request parameters

Example request

Example response

Learn More

* * *