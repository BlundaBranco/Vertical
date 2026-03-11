# Hosted Embedded Signup

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/hosted-es

---

# Hosted Embedded Signup

Updated: Nov 4, 2025

If you don’t want to implement Embedded Signup by adding JavaScript code to your website or customer portal, you can instead use a link that, when clicked, displays a web page describing onboarding steps, and a button that launches the Embedded Signup flow:

## Limitations

Hosted Embedded Signup (“Hosted ES”) can only be used to onboard business customers to Cloud API, and the flow cannot be customized.

## Requirements

  * You must have completed the steps to become a Solution Partner or Tech Provider.
  * If your app is for messaging, it must be able to send messages, manage templates, and have a properly configured production webhook endpoint.
  * Your app must be subscribed to the [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) webhook.
  * Solution Partners must have a line of credit.

You will also need:

  * Your [system token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens).
  * Your app secret.

## Step 1: Create a Facebook Login for Business configuration

If you don’t already have a Facebook Login for Business configuration, you must create one. A Facebook Login for Business configuration defines which permissions to request, and what additional information to collect, from business customers who access Embedded Signup.

Navigate to **Facebook Login for Business** > **Configurations** and click the **\+ Create configuration** button to access the configuration flow.

Use a name that will help you differentiate this configuration from any others you may create in the future. When completing the flow, be sure to select the WhatsApp Embedded Signup login variation:

When choosing assets and permissions, select only those assets and permissions that you will actually need from your business customers.

For example, if you select the **Catalogs** asset but don’t actually need access to customer catalogs, your customers will likely abandon the flow at the catalog selection screen and ask you for clarification.

## Step 2: Get the Hosted ES URL

Navigate to the **WhatsApp** > **Quickstart** panel and click the **View onboarding** button.

Locate the **Zero integration onboarding** card. The URL displayed in the card is the onboarding page URL:

Click the **Copy button** to copy the URL to your clipboard. Map this URL to a button on your website or customer portal that, when clicked, opens the URL in a new browser window.

To see what this looks like, you can load the URL in a new browser window or tab, or click the blue “new window” icon, which does the same thing.

This onboarding page looks like this:

Click the **Get started** button. This is the flow that business customers who click the button on your website or customer portal will see. Complete the flow if you wish.

## Step 3: Capture customer asset IDs

When a business customer completes the flow, an [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) webhook is triggered with `event` set to `PARTNER_ADDED`. Capture the customer’s WhatsApp Business Account ID and business portfolio ID from the webhook payload.

## Step 4: Generate an HMAC-SHA256 hash

Generate an HMAC-SHA256 hash of your app secret and system token.

### Bash example for Linux and macOS
    
    
    echo -n "" | openssl dgst -sha256 -hmac ""  
      
    

  * `` — Your system token.
  * `` — Your app secret ([**App Dashboard**](/apps) > **App settings** > **Basic**)

## Step 5: Get a business token

Use the [POST //system_user_access_tokens](/docs/marketing-api/reference/business/system_user_access_tokens#Creating) endpoint to get and capture the customer’s [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens). (Target the customer’s business portfolio ID, not yours).

### Request syntax
    
    
    curl 'https://graph.facebook.com///system_user_access_tokens' \  
    -H 'Content-Type: application/x-www-form-urlencoded' \  
    -H 'Authorization: Bearer ' \  
    -d 'appsecret_proof=' \  
    -d 'fetch_only=true'  
      
    

  * `` — API version.
  * `` — HMAC-SHA256 hash of your app secret and system token.
  * `` — Business customer’s business portfolio ID.
  * `` — Your system token.

### Response syntax

Upon success:
    
    
    {  
      "access_token": ""  
    }  
      
    

  * `` — The business customer’s business token.

## Step 6: Get the customer’s business phone number ID

Use the [GET //phone_numbers](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/phone-number-management-api#Reading) endpoint to get and capture the business customer’s business phone number ID.

### Request syntax
    
    
    curl 'https://graph.facebook.com///phone_numbers' \  
    -H 'Authorization: Bearer '  
      
    

  * `` — API version.
  * `` — Business customer’s business token.
  * `` — Business customer’s WhatsApp Business Account ID.

### Response syntax
    
    
    {  
      "data": [  
        {  
          "verified_name": "",  
          "code_verification_status": "",  
          "display_phone_number": "",  
          "quality_rating": "",  
          "platform_type": "",  
          "throughput": {  
            "level": ""  
          },  
          "last_onboarded_time": "",  
          "webhook_configuration": {  
            "application": ""  
          },  
          "id": ""  
        }  
      ]  
    }  
      
    

  * `` — Business phone number ID.
  * `` — Business phone number verification status.
  * `` — Business display phone number.
  * `` — Unix timestamp indicating when the number was added the business customer’s WhatsApp Business Account (essentially, when the customer successfully completed the flow.)
  * `` — Platform.
  * `` — Business phone number quality rating.
  * `` — Throughput level.
  * `` — Business phone number verified name.
  * `` — Webhook callback URL associated with the number.

## Step 7: Onboard the customer

Onboard the business customer by completing the steps in the appropriate onboarding guide below:

  * [Onboarding business customers as a Tech Provider or Tech Partner](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-customers-as-a-tech-provider) (skip step 1)
  * [Onboarding business customers as a Solution Partner](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-customers-as-a-solution-partner) (skip step 1)

Did you find this page helpful?

ON THIS PAGE

Limitations

Requirements

Step 1: Create a Facebook Login for Business configuration

Step 2: Get the Hosted ES URL

Step 3: Capture customer asset IDs

Step 4: Generate an HMAC-SHA256 hash

Bash example for Linux and macOS

Step 5: Get a business token

Request syntax

Response syntax

Step 6: Get the customer’s business phone number ID

Request syntax

Response syntax

Step 7: Onboard the customer

* * *