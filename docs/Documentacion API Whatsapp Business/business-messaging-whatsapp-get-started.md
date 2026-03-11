# WhatsApp Cloud API Get Started

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/get-started

---

# WhatsApp Cloud API Get Started

Updated: Oct 1, 2025

This guide helps developers quickly get started with the WhatsApp Cloud API. It covers the basic setup steps, including registering as a developer, creating a Meta app, sending your first message, and setting up a test webhook endpoint. You’ll also learn how to generate secure access tokens and send both template and non-template messages. Advanced features and further resources are introduced for deeper exploration.

* * *

## Download the Sample App

The Jasper’s Market sample app contains all of the messages and code used in the Jasper’s Market demo. You can use this sample app to learn how to build an application that sends and handles WhatsApp Cloud API data.

[Download the Jasper’s Market Sample App](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-business-jaspers-market&h=AT4ehd06k7OneteGIrVRLQRJJDnSjJQCiP7PfhW2FLTOI95j11SsvbgYs-6hPjrfG3GqGSLj3X_fwDgoG9m7Dry-4o9gpn3pnLNsLUYZxlPP5GNgZuhiiKWezbR_0VpMsF0-YkJkC3KSSCPSO8vP0g)

* * *

## Prerequisites

  1. You must have a Facebook account or a managed Meta account.
  2. You must be registered as a developer. 
     * If you have not registered as a developer, navigate to  and follow the prompts.
  3. You need access to a device with WhatsApp on it so you can send and receive test messages during setup.

* * *

## Step 1. Create a New Meta Developer App and Set Up with WhatsApp

You need to create a Meta developer app and set the app up with the WhatsApp use case.

Click on “Go to App Dashboard” and follow the instructions below to get started.

[Go to App Dashboard](https://developers.facebook.com/apps)

### If you **already have** a Meta app

  1. Select your existing app in the App Dashboard.
  2. Click on **Add use cases.**
  3. Select **Connect with customers through WhatsApp** and follow the prompts to add the use case to your app. 
     * Note: If you do not have a Meta Business Portfolio, you will create one during this process.

### If you **do not have** a Meta app

  1. Follow the prompts in the App Dashboard to create a new app. 
     * Select the **Connect with customers through WhatsApp** use case.
     * Select an existing Business Portfolio or follow the prompts to create a new one.
     * Finish creating your app.
  2. Once your app has been created, select **Use cases** (pencil icon) from the sidebar.

* * *

## Step 2. Connect Your Meta App to a WhatsApp Business Account

After creating your Meta app, you need to connect it to a WhatsApp Business Account. This connection allows your app to access the WhatsApp Cloud API and send messages on behalf of your business.

  1. Navigate to the [App Dashboard](https://developers.facebook.com/apps) and select your app.
  2. Click on **Use cases** (pencil icon) in the sidebar.
  3. Under your **Connect with customers through WhatsApp** use case, click **Customize.**
  4. In the **API Setup** section, select an existing WhatsApp Business Account or create a new one: 
     * **To use an existing account:** Select the WhatsApp Business Account from the dropdown menu.
     * **To create a new account:** Click **Create a WhatsApp Business Account** and follow the prompts to set up your business profile.
  5. Once connected, you will see your WhatsApp Business Account ID displayed in the API Setup panel. 
     * Save this ID for use in API calls.

> **Note:** If you created a new Meta Business Portfolio during app creation, a WhatsApp Business Account may have been automatically created for you. Verify the connection in the API Setup section before proceeding.

* * *

## Step 3. Send Your First Template Message

With your new app set up, let’s send your first message on WhatsApp.

  1. Click on **Use cases** (pencil icon) on the sidebar.
  2. Under your **Connect with customers through WhatsApp** use case, click **Customize.**
  3. In Quickstart, click on the **Start using the API** button and follow the first 2 steps to send the `hello_world` template message to a phone number of your choosing. 
     * Make sure to retain both your test phone number ID and WhatsApp Business Account ID for later use.
  4. Once you receive the message you sent, make sure to reply back to keep the conversation going.

* * *

## Step 4. Set Up the Test Webhook App

You will need to set up a webhook endpoint in order to receive notifications about message statuses, such as read and delivered.

Use our sample webhook server for testing purposes by following the [Using a test webhook app](/documentation/business-messaging/whatsapp/webhooks/set-up-whatsapp-echo-bot) guide.

Once your test webhook application is established, respond in the WhatsApp chat thread you created with yourself. You will see the webhook payload in your test application like this:
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "215589313241560883",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "15551797781",  
                  "phone_number_id": "7794189252778687"  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": "Jessica Laverdetman"  
                    },  
                    "wa_id": "13557825698"  
                  }  
                ],  
                "messages": [  
                  {  
                    "from": "17863559966",  
                    "id": "wamid.HBgLMTc4NjM1NTk5NjYVAGHAYWYET688aASGNTI1QzZFQjhEMDk2QQA=",  
                    "timestamp": "1758254144",  
                    "text": {  
                      "body": "Hi!"  
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
      
    

* * *

## Step 5. Create a System User and Generate a Permanent Access Token

The temporary access token you created to send the `hello_world` template message expires quickly and is not suitable for development purposes. So you should create a permanent token for use across the WhatsApp Business Platform.

  1. Navigate to [Business Settings⁠](https://business.facebook.com/latest/settings) and click **System users** in the sidebar.
  2. Click the **Add+** button in the upper-right corner and follow the prompts to create a new system user.
  3. Select the new system user you created, and click **Assign Assets.**
     * Select your app and toggle **Manage app** under **Full control.**
     * Select your WhatsApp account and toggle **Manage WhatsApp Business Accounts** under **Full control.**
     * Click the **Assign assets** button.
  4. Click **Generate token.**
     * Follow the prompts to generate your token.
     * Add the following permissions to the token: 
       * [business_management](https://developers.facebook.com/docs/permissions#b)
       * [whatsapp_business_messaging](https://developers.facebook.com/docs/permissions#w)
       * [whatsapp_business_management](https://developers.facebook.com/docs/permissions#w)
     * Copy the token and store it in a secure place to be used in the later steps.

* * *

## Step 6. Send a Non-Template Message

When you responded to your earlier test message, you triggered what is known as a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows). This 24-hour window allows you to send [non-template messages](/documentation/business-messaging/whatsapp/messages/send-messages#message-types) to users on WhatsApp. With the customer service window now open, you can send a non-template message to yourself. To do this, insert your test phone number ID, the system user access token, and your phone number in the code sample below, then paste the code into your terminal and run it.
    
    
    curl 'https://graph.facebook.com/v23.0//messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "",
      "type": "text",
      "text": {
        "body": "Hello!"
      }
    }'

After successfully sending your message, check your test webhook application to view the webhook event confirming the message receipt.

* * *

## Step 7. Finish

The WhatsApp Cloud API enables you to send messages and receive webhooks—these are the fundamental building blocks for messaging integration. Beyond these basics, the API offers additional features such as group creation and management, as well as support for calling. To explore these advanced capabilities, check out the “Learn more” section below.

* * *

## Learn more

  * [Learn about the different types of non-template messages](/documentation/business-messaging/whatsapp/messages/send-messages)
  * [Learn how to create and send template messages](/documentation/business-messaging/whatsapp/templates/overview)
  * [Learn how to create and manage WhatsApp groups via API](/documentation/business-messaging/whatsapp/groups)
  * [Learn how to send and receive calls on WhatsApp via API](/documentation/business-messaging/whatsapp/calling)
  * [Learn how to add a business phone number](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)
  * [Learn how to set up your own webhook server](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)
  * [Become a Solution Provider](/documentation/business-messaging/whatsapp/solution-providers/overview)
  * [View WhatsApp API OpenAPI Specification⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fopenapi&h=AT4ehd06k7OneteGIrVRLQRJJDnSjJQCiP7PfhW2FLTOI95j11SsvbgYs-6hPjrfG3GqGSLj3X_fwDgoG9m7Dry-4o9gpn3pnLNsLUYZxlPP5GNgZuhiiKWezbR_0VpMsF0-YkJkC3KSSCPSO8vP0g)

Did you find this page helpful?

ON THIS PAGE

Download the Sample App

Prerequisites

Step 1. Create a New Meta Developer App and Set Up with WhatsApp

If you already have a Meta app

If you do not have a Meta app

Step 2. Connect Your Meta App to a WhatsApp Business Account

Step 3. Send Your First Template Message

Step 4. Set Up the Test Webhook App

Step 5. Create a System User and Generate a Permanent Access Token

Step 6. Send a Non-Template Message

Step 7. Finish

Learn more

* * *