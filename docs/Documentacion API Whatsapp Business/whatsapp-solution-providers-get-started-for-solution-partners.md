# Get started as a Solution Partner

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/get-started-for-solution-partners

---

# Get started as a Solution Partner

Updated: Dec 12, 2025

This guide goes over the steps [Solution Partners](/documentation/business-messaging/whatsapp/solution-providers/overview#solution-partners) need to take in order to offer the Cloud API to their customers. There are 4 main stages:

  1. Prepare & Plan
  2. Set up Assets
  3. Sign Contracts
  4. Build Integration

After you’re done, please keep up with monthly updates.

## Prepare & plan

### Read documentation

Before you start, we recommend reading through our [developer documentation](/documentation/business-messaging/whatsapp/about-the-platform#whatsapp-cloud-api) and our [Postman collection⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.postman.com%2Fmeta%2Fworkspace%2Fwhatsapp-business-platform%2Fcollection%2F13382743-84d01ff8-4253-4720-b454-af661f36acc2&h=AT7kvq7iw2HKHnJtpm-5Ozuz6NO1s639g1nrX1wjebm1tQXMDT6DGHqG4BOF_8WSQib27wyLr8hooCxyxoz8XlFIrf0DzvTOR8XG9wAv-jBO7w30Ah-YG1SAvZtLYkS3ov2r2UQcWVK7_uVRaMdLzw). This helps you understand how the Cloud API works, including how to get started and migrate numbers.

### Plan onboarding & migration

**We recommend that you use Embedded Signup to onboard new business customers to the Cloud API.** If you haven’t already, implement [Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/overview). Embedded Signup is the fastest and easiest way to register business customers, enabling them to start sending messages in less than five minutes.

## Set up assets

To use the Cloud API, Solution Partners need to have the following assets:

Asset |  Specific Instructions   
---|---  
**Business portfolio**|  You can use an existing one, or [set up a new one⁠](https://www.facebook.com/business/help/1710077379203657). Save the business portfolio ID.  
**WhatsApp Business Account** (WABA)| See [Create a WhatsApp Business Account for the WhatsApp Business API⁠](https://www.facebook.com/business/help/2087193751603668) for help.  
[**Meta App**](/apps/)|  If you don’t have an app, you need to [create one](/docs/development/create-an-app) with the **Business** type. Remember to add a display name and a contact email to your app.As a (Solution Partner), your app must go through [App Review](/docs/app-review) and request Advanced Access to the following permissions:

  * [`whatsapp_business_management`](/docs/permissions/reference/whatsapp_business_management) — Used to manage phone numbers, message templates, registration, business profile under a WhatsApp Business Account. To get this permission, your app must go through [App Review](/docs/app-review).
  * [`whatsapp_business_messaging`](/docs/permissions/reference/whatsapp_business_messaging) — Used to send/receive messages from WhatsApp users, upload/download media under a WhatsApp Business Account. To get this permission, your app must go through [App Review](/docs/app-review).
  * [`whatsapp_business_manage_events`](/docs/permissions#whatsapp_business_manage_events) — Used to log events—such as purchases, add-to-cart actions, leads, and more under a WhatsApp Business Account. Only request this permission if you are using the [Marketing Messages Lite API](/docs/whatsapp/marketing-messages-lite-api) with [Conversions API](/docs/marketing-api/conversions-api). To get this permission, your app must go through [App Review](/docs/app-review).

As a Solution Partner, you can also feel free to use the same Meta app across different clients and WABAs. But be aware that each app can only have one webhook endpoint and each app needs to go through App Review.  
**System User**|  See [Add system users to your business portfolio⁠](https://www.facebook.com/business/help/503306463479099) for help.Currently, a Meta App with `whatsapp_business_messaging`, `whatsapp_business_management`, `whatsapp_business_manage_events`, and `business_messaging` permissions has access to up to:

  * 1 admin system user
  * 1 employee system user

We recommend using the admin system user for your production deployment. See [About business portfolio access⁠](https://www.facebook.com/business/help/442345745885606) for more information.  
**Business Phone Number**|  This is the phone number the business will use to send messages. Phone numbers need to be verified through SMS/voice call.For Solution Partners and Direct Developers: If you wish to use your own number, then you should [add a phone number⁠](https://www.facebook.com/business/help/456220311516626) in WhatsApp Manager and verify it with the verify endpoint via [Graph API](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#verify-phone-numbers).For business customers of Solution Partners: If you wish to use your own number, then you should add and verify their numbers using the Solution Partner’s [Embedded Signup flow](/documentation/business-messaging/whatsapp/embedded-signup/overview).There is no limit to the amount of business phone numbers that can be onboarded to the Cloud API.  
**Consumer Phone Number**|  This is a phone number that is currently using the consumer WhatsApp app. This number will be receiving the messages sent by your business phone number.  
  
## Sign contracts

### Accepting Terms of Service

In order to access the WhatsApp Business Messaging Cloud API you need to first accept the WhatsApp Business Platform Terms of Service on behalf of your business.

To do so, navigate to [WhatsApp Manager⁠](https://business.facebook.com/wa/manage/) and accept the Terms of Service in the informational banner.

For any new Cloud API businesses, you will need to accept Terms of Service before you can start using Cloud API. Registration calls will fail until you accept the Terms of Service.

You as a developer need to accept the Terms of Service. If you are a Solution Partner, you do not need your customers to accept.

## Build integration

### Step 1: Get system user access token

Graph API calls use access tokens for authentication. For more information, see [Access Tokens](/docs/facebook-login/access-tokens). We recommend using your system user to generate your token.

To generate a system user access token:

  1. Go to [**Business portfolio** ⁠](https://business.facebook.com/) > **Business Settings** > **Users** > **System Users** to view the system user you created.

  2. Click on that user and select **Add Assets**. This action launches a new window.

  3. Under **Select Asset Type** on the left side pane, select **Apps**. Under **Select Assets** , choose the Meta app you want to use (your app must have the correct permissions). Enable **Develop App** for that app.

  4. Select **Save Changes** to save your settings and return to the system user main screen.

  5. Now you are ready to generate your token. In the system user main screen, click **Generate Token** and select your Meta app.

  6. After selecting the app, you will see a list of available permissions. Select `whatsapp_business_management` , `whatsapp_business_messaging` , and `whatsapp_business_manage_events` . Click **Generate Token**.

  7. A new window opens with your system user, assigned app and access token. Save your token.

  8. Optionally, you can click on your token and see the Token Debugger. In your debugger, you should see the permissions you have selected. You can also directly paste your token into the [Access Token Debugger](/tools/debug/accesstoken).

### Step 2: Set up webhooks

With Webhooks set up, you can receive real-time HTTP notifications from the WhatsApp Business Platform. This means you get notified when, for example, you get a message from a customer or there are changes to your WhatsApp Business Account (WABA).

To set up your webhook endpoint, you need to create an internet-facing web server with a URL that meets Meta’s and WhatsApp’s requirements. See our [Webhooks](/documentation/business-messaging/whatsapp/webhooks/overview) document for more information. If you need an endpoint for testing purposes, [you can deploy a test app](/documentation/business-messaging/whatsapp/webhooks/set-up-whatsapp-echo-bot) that simply dumps webhook payloads to your console.

#### App setup

Once the endpoint is ready, configure it to be used by your Meta app:

In the App Dashboard, go to **WhatsApp** > **Configuration** , then click the **Edit** button.

  * Callback URL: This is the URL Meta will be sending the events to. See the [Webhooks, Getting Started](/docs/graph-api/webhooks/getting-started) guide for information on creating the URL.
  * Verify Token: This string is set up by you, when you create your webhook endpoint.

After adding the information, click **Verify and Save**.

After saving, back in the **Configuration** panel, click the **Manage** button and subscribe to individual webhook fields. To receive notifications of customer messages, be sure to subscribe to the **messages** webhook field.

You only need to set up Webhooks once for every application you have. You can use the same Webhook to receive multiple event types from multiple WhatsApp Business Accounts, or set up an override. For more information, see our Webhooks section.

### Step 3: Subscribe to your WABA

To make sure you get notifications for the correct account, subscribe your app:
    
    
    curl -X POST \
    'https://graph.facebook.com/v25.0//subscribed_apps' \
    -H 'Authorization: Bearer '

If you get the response below, all Webhook events for the phone numbers under this account will be sent to your configured Webhooks endpoint.
    
    
    {  
      "success": true  
    }  
      
    

### Step 4: Get phone number ID

To send messages, you need to register the phone number you want to use. Before you can register it, you need to get the phone number’s ID. To get your phone number’s ID, make the following API call:
    
    
    curl -X GET \
    'https://graph.facebook.com/v25.0//phone_numbers' \
    -H 'Authorization: Bearer '

If the request is successful, the response includes all phone numbers connected to your WABA:
    
    
    {  
      "data": [  
        {  
          "verified_name": "Jasper's Market",  
          "display_phone_number": "+1 631-555-5555",  
          "id": "1906385232743451",  
          "quality_rating": "GREEN"  
        },  
        {  
          "verified_name": "Jasper's Ice Cream",  
          "display_phone_number": "+1 631-555-5556",  
          "id": "1913623884432103",  
          "quality_rating": "NA"  
        }  
      ]  
    }  
      
    

Save the ID for the phone number you want to register. See [Read Phone Numbers](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) for more information about this endpoint.

#### Migration exception

If you are migrating a phone number from the On-Premises API to the Cloud API, there are extra steps you need to perform before registering a phone number with the Cloud API. See [Migrate From On-Premises API to Cloud API](/documentation/business-messaging/whatsapp/support/migrating-from-onprem-to-cloud) for the full process.

### Step 5: Register phone number

With the phone number’s ID in hand, you can register it. In the registration API call, you perform two actions at the same time:

  1. Register the phone.
  2. [Enable two-step verification](/documentation/business-messaging/whatsapp/business-phone-numbers/two-step-verification) by setting a 6-digit registration code —you must set this code on your end. Save and memorize this code as it can be requested later.

**Setting up two-factor authentication is a requirement to use the Cloud API. If you do not set it up, you will get an onboarding failure message:**

Sample request:
    
    
    curl -X POST \
    'https://graph.facebook.com/v25.0//register' \
    -H 'Authorization: Bearer ' \
    -H 'Content-Type: application/json' \
    -d '{"messaging_product": "whatsapp","pin": ""}'

Sample response:
    
    
    {  
      "success": true  
    }  
      
    

#### Embedded Signup users

A phone number **must** be registered up to 14 days after going through the Embedded Signup flow. If a number is not registered during that window, the phone must go through to the Embedded Signup flow again prior to registration.

### Step 6: Receive a message From consumer app

Once participating customers send a message to your business, you get **24 hours of free messages with them** —that window of time is called the customer service window. For testing purposes, we want to enable this window, so you can send as many messages as you would like.

From a personal WhatsApp iOS/Android app, send a message to the phone number you just registered. Once the message is sent, you should receive an incoming message to your Webhook with a notification in the following format.
    
    
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
                  "display_phone_number": "16315551234",  
                  "phone_number_id": "PHONE_NUMBER_ID"  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": "Kerry Fisher"  
                    },  
                    "wa_id": "16315555555"  
                  }  
                ],  
                "messages": [  
                  {  
                    "from": "16315555555",  
                    "id": "wamid.ABGGFlA5FpafAgo6tHcNmNjXmuSf",  
                    "timestamp": "1602139392",  
                    "text": {  
                      "body": "Hello!"  
                    },  
                    "type": "text"  
                    }  
                ]  
              },  
            "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

### Step 7: Send a test message

Once you have enabled the customer service window, you can send a test message to the consumer number you used in the previous step. To do that, make the following API call:
    
    
    curl -X  POST \
    'https://graph.facebook.com/v25.0//messages' \
    -H 'Authorization: Bearer ' \
    -H 'Content-Type: application/json' \
    -d '{"messaging_product": "whatsapp", "to": "16315555555","text": {"body" : "hello world!"}}'

If your call is successful, your response will include a message ID. Use that ID to track the progress of your messages through Webhooks. The maximum length of the ID is 128 characters.

Sample response:
    
    
    {  
      "id":"wamid.gBGGFlaCGg0xcvAdgmZ9plHrf2Mh-o"  
    }  
      
    

With the Cloud API, there is no longer a way to explicitly check if a phone number has a WhatsApp ID. To send someone a message using the Cloud API, just send it directly to the WhatsApp user’s phone number after they have [opted-in](/documentation/business-messaging/whatsapp/getting-opt-in). See [Sending messages](/documentation/business-messaging/whatsapp/messages/send-messages).

## Keep up with monthly updates

We will release Cloud API updates on the first Tuesday of every month. Those will include new features and improvements. You don’t need to do any work to use any of the new features, since the Cloud API updates automatically.

## FAQs

### General FAQs

**Which company will be providing the Cloud API?**

WhatsApp develops and operates the WhatsApp Business API, which enables businesses to communicate with WhatsApp consumer users on the WhatsApp network. When using the Cloud API, Meta will host the WhatsApp Business API for you and provide an endpoint for the WhatsApp service for your incoming and outgoing WhatsApp communications.

**Are there any additional costs for the Cloud API?**

Access to Cloud API is free, and we expect it to generate additional cost savings for developers, as Meta hosts and maintains the Cloud API.

### Technical implementation FAQs

**What is the architecture of the Cloud API?**

The Cloud API architecture significantly simplifies the Solution Partner’s operational and infrastructure requirements to integrate with WhatsApp Business Platform. First, it removes the infrastructure requirements to run Business API docker containers (CAPEX savings). Second, it obviates the need of operational responsibilities to manage the deployment (OPEX savings). 

**What will disaster recovery look like: if a region is unavailable, how much time does it take to move messages to another region?**

We will have disaster recovery and data replication across multiple regions. The expected downtime would be within our SLA and usually in the order of less than a minute to less than five minutes.

### Data privacy & security FAQs

**Where are the servers for Cloud API?**

Cloud API processes messages on servers in Meta data centers, which are located [here⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatacenters.atmeta.com%2Fall-locations%2F&h=AT7kvq7iw2HKHnJtpm-5Ozuz6NO1s639g1nrX1wjebm1tQXMDT6DGHqG4BOF_8WSQib27wyLr8hooCxyxoz8XlFIrf0DzvTOR8XG9wAv-jBO7w30Ah-YG1SAvZtLYkS3ov2r2UQcWVK7_uVRaMdLzw). If a business opts to use Cloud API Local Storage, message data is stored in data centers located in another designated country. A list of the Local Storage supported locations are listed [here](/documentation/business-messaging/whatsapp/business-phone-numbers/registration#limitations).

**Is the Cloud API end-to-end encrypted? What is the encryption model?**

See [Cloud API Overview, Encryption](/documentation/business-messaging/whatsapp/about-the-platform#encryption).

**What happens to message data at rest? How long is it stored?**

Cloud API messages at rest are encrypted. Messages have a maximum retention period of 30 days in order to provide the base features and functionality of the Cloud API service; for example, retransmissions.

**Does Meta have access to encryption keys?**

In order to send and receive messages through Cloud API, Cloud API manages the encryption/decryption keys on behalf of the business. For more detail, see the [WhatsApp Encryption Overview technical whitepaper⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.whatsapp.com%2Fsecurity%2FWhatsApp-Security-Whitepaper.pdf&h=AT7kvq7iw2HKHnJtpm-5Ozuz6NO1s639g1nrX1wjebm1tQXMDT6DGHqG4BOF_8WSQib27wyLr8hooCxyxoz8XlFIrf0DzvTOR8XG9wAv-jBO7w30Ah-YG1SAvZtLYkS3ov2r2UQcWVK7_uVRaMdLzw).

### Regulatory compliance FAQs

**How does Cloud API comply with regional data protection laws (such as GDPR, LGPD, and PDPB)?**

Meta takes data protection and people’s privacy very seriously and we comply with applicable legal, industry, and regulatory requirements governing data protection, as well as industry best practices. Cloud API customers must meet their own obligations under data protection laws, such as the General Data Protection Regulation (GDPR). Please visit our [Meta Business Messaging Compliance Center⁠](https://www.facebook.com/business/business-messaging/compliance) to learn more.

Did you find this page helpful?

ON THIS PAGE

Prepare & plan

Read documentation

Plan onboarding & migration

Set up assets

Sign contracts

Accepting Terms of Service

Build integration

Step 1: Get system user access token

Step 2: Set up webhooks

App setup

Step 3: Subscribe to your WABA

Step 4: Get phone number ID

Migration exception

Step 5: Register phone number

Embedded Signup users

Step 6: Receive a message From consumer app

Step 7: Send a test message

Keep up with monthly updates

FAQs

General FAQs

Technical implementation FAQs

Data privacy & security FAQs

Regulatory compliance FAQs

* * *