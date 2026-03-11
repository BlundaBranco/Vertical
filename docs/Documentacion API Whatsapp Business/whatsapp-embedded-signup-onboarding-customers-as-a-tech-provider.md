# Onboarding business customers as a Tech Provider or Tech Partner

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-customers-as-a-tech-provider

---

# Onboarding business customers as a Tech Provider or Tech Partner

Updated: Nov 14, 2025

This document describes the steps Tech Providers and Tech Partners must perform to onboard new business customers who have completed the Embedded Signup flow.

If you are a Tech Provider or Tech Partner, any business customer who completes your implementation of the Embedded Signup flow will not be able to use your app to access their WhatsApp assets or send and receive messages (if you are offering messaging services) until you complete these steps.

## What you will need

  * the business customer’s WABA ID (returned via [session logging](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener) or [API request](/documentation/business-messaging/whatsapp/solution-providers/manage-accounts#get-shared-waba-id-with-access-token))
  * the business customer’s business phone number ID (returned via [session logging](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener) or [API request](/documentation/business-messaging/whatsapp/solution-providers/manage-phone-numbers#getting-phone-numbers))
  * your app ID (displayed at the top of the **App Dashboard**)
  * your app secret (displayed in the **App Dashboard** > **App settings** > **Basic** panel)

Also, if you wish to test messaging capabilities using the customer’s business phone number, you will need a WhatsApp phone number that can already send and receive messages from other WhatsApp numbers.

Perform all of the requests described below using server-to-server requests. Do not use client-side requests.

## Step 1: Exchange the token code for a business token

Use the **GET /oauth/access_token** endpoint to exchange the token code [returned](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener) by Embedded Signup for a business integration system user access token (“business token”).

### Request
    
    
    curl --get 'https://graph.facebook.com/v21.0/oauth/access_token' \  
    -d 'client_id=' \  
    -d 'client_secret=' \  
    -d 'code='  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** Your app ID. This is displayed at the top of the **App Dashboard**.| `236484624622562`  
``| **Required.** Your app secret. You can get this from the **App Dashboard** > **App Secret** > **Basic** panel.| `614fc2afde15eee07a26b2fe3eaee9b9`  
``| **Required.** The code [returned by Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener) when the customer successfully completed the flow.| `AQBhlXsctMxJYbwbrpybxlo9tLPGy-QAmjBJA03jxLos43wxlBlrYozY5C33BXJULd133cOJf_5y6EkJZYMrAmW-EMj3Wdap9-NUM2nS4s8tC-ES7slBhh6QpCFM7-SzpI-iqsjqTGyxbUUW3AeaEyLkeZFIkBgcQ_SOxo9HShm20SDR5_n7AT9ZJ5dcgpqBQykNT-pQ8V7Ne9-sr6RLAWtJMF7-Zx6ABudRcWIN53tUTtquDVNuq3lrco4BlVQAv-54tR83Ae0ODN9Uet6j-BVLuetXhQCM3sz9RdgedlbxkidMbkztvYX1j7baOrJxyLyYGWYgbnUrKRQKCtWTsO5ekIGFgtbpS8UPJNqV6j8E5XKPJ8QA7ZFqzkB0s2O__J5FrjHzc_rDo1EuRbw98ihHDzQnvuXeHapEyfhLDJct0A`  
  
### Response

Upon success:
    
    
      
      
    

### Response parameters

Placeholder |  Description |  Example value   
---|---|---  
``| The customer’s [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
  
## Step 2: Subscribe to webhooks on the customer’s WABA

Use the [POST //subscribed_apps](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/subscribed-apps-api#post-version-waba-id-subscribed-apps) endpoint to subscribe your app to webhooks on the business customer’s WABA. If you want the customer’s webhooks to be sent to a different callback URL than the one set on your app, you have multiple [webhook override](/documentation/business-messaging/whatsapp/webhooks/override) options.

### Request
    
    
    curl -X POST 'https://graph.facebook.com///subscribed_apps' \  
    -H 'Authorization: Bearer '  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** The business customer’s [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
``_String_| **Required.** WhatsApp Business Account ID.| `102290129340398`  
  
### Response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

## Step 3: Register the customer’s phone number

Use the [POST //register](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/register-api) endpoint to register the business customer’s business phone number for use with Cloud API.

### Request
    
    
    curl 'https://graph.facebook.com/v21.0//register' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "pin": ""  
    }'  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_| **Required.** The business customer’s business phone number ID.| `106540352242922`  
``_String_| **Required.** The business customer’s [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
``_String_| **Required.** Set this value to a 6-digit number. This will be the business phone number’s two-step verification PIN.| `581063`  
  
### Response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

## Step 4: Send a test message

 _This step is optional._

If you wish to test the messaging capabilities of your business customer’s business phone number, send a message to the customer’s number from your own WhatsApp number (this will open a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows), allowing you to respond with any type of message).

Next, use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a text message in response.

### Request
    
    
    curl 'https://graph.facebook.com/v21.0//messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "text",  
      "text": {  
        "body": ""  
      }  
    }'  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_| **Required.** Message body text. Supports URLs.Maximum 4096 characters.| `Message received, loud and clear!`  
``_String_| **Required.** The business customer’s business phone number ID.| `106540352242922`  
``_String_| **Required.** The business customer’s [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
``_String_| **Required.** Your WhatsApp phone number that can send and receive messages from other WhatsApp numbers.Note that this cannot be a business phone number already registered for use with Cloud API.| `+16505551234`  
  
### Response

Upon success:
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "",  
          "wa_id": ""  
        }  
      ],  
      "messages": [  
        {  
          "id": ""  
        }  
      ]  
    }  
      
    

### Response parameters

Placeholder |  Description |  Example value   
---|---|---  
``| WhatsApp message ID.| `wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA`  
``| Your WhatsApp user ID.| `16505551234`  
``| Your WhatsApp phone number that the message was sent to.| `+16505551234`  
  
If you were able to successfully send and receive messages using the customer’s business phone number, and if **messages** webhooks were triggered [describing the initial message that you sent](/documentation/business-messaging/whatsapp/webhooks/reference/messages), as well as the [delivery statuses](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) of the message you sent in response, the customer’s business phone number is working properly.

## Step 5: Instruct the customer to add a payment method

Instruct your customer to use the WhatsApp Manager to add a payment method. You can provide them with the following Help Center link:

[⁠](https://www.facebook.com/business/help/488291839463771)

Alternatively, you can instruct them to:

  1. Access the **WhatsApp Manager** > **Overview** panel at [⁠](https://business.facebook.com/wa/manage/home/)
  2. Click the **Add payment method** button
  3. Complete the flow

Once your customer adds a payment method, they are fully onboarded onto the WhatsApp Business Platform and can begin using your app to access their WhatsApp assets and send and receive messages (if you are providing them with that service).

Did you find this page helpful?

ON THIS PAGE

What you will need

Step 1: Exchange the token code for a business token

Request

Request parameters

Response

Response parameters

Step 2: Subscribe to webhooks on the customer’s WABA

Request

Request parameters

Response

Step 3: Register the customer’s phone number

Request

Request parameters

Response

Step 4: Send a test message

Request

Request parameters

Response

Response parameters

Step 5: Instruct the customer to add a payment method

* * *