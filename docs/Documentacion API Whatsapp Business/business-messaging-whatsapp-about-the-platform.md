# About the WhatsApp Business Platform

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/about-the-platform

---

# About the WhatsApp Business Platform

Updated: Dec 5, 2025

The WhatsApp Business Platform enables businesses to communicate with customers at scale.

This documentation is intended for developers using our APIs. If you are looking for information on other ways to use WhatsApp for your business see the [WhatsApp Business site⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fbusiness.whatsapp.com%2F&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg).

## Core APIs and capabilities

### WhatsApp Cloud API

WhatsApp Cloud API enables you to programmatically message and call on WhatsApp. You can use Cloud API to send users a variety of messages, from simple text messages to rich media and interactive messages.

WhatsApp Cloud API includes:

  * **Messaging:** Send text messages, rich media, and interactive messages
  * **Calling:** Make and receive calls to customers
  * **Groups:** Create, manage, and message WhatsApp group conversations

WhatsApp messaging provides a powerful and private way to engage with customers. Use Cloud API to:

  * Send order confirmations and shipping updates
  * Share appointment availability and other reminders
  * Drive upsell and cross-sell opportunities
  * Facilitate end-to-end transactions, from product discovery to payment
  * Enable multi-factor authentication or one-time passwords to verify accounts and users
  * Deliver custom interactive conversational experiences

[Learn more about message types on WhatsApp Cloud API.](/documentation/business-messaging/whatsapp/messages/send-messages)

### Business Management API

The WhatsApp Business Management API enables you to programmatically manage a WhatsApp Business Account and its associated assets.

Manage account assets with Business Management API like:

  * **Business phone numbers:** Add and remove phone numbers associated with your business
  * **Templates:** Create and modify message templates for scalable messaging.

Business Management API also gives you access to account analytics like:

  * **Messaging analytics:** The number and type of messages sent and delivered.
  * **Pricing analytics:** Granular pricing breakdowns for delivered messages.
  * **Template analytics:** Sent/read/delivered template metrics, alongside template message button clicks.   

  * [Learn more about message templates.](/documentation/business-messaging/whatsapp/templates/overview)
  * [Learn more about managing business phone numbers.](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)
  * [Learn more about account analytics.](/documentation/business-messaging/whatsapp/analytics)

### Marketing Messages API for WhatsApp

MM API for WhatsApp is an API for sending optimized marketing messages on WhatsApp.

When you send marketing messages through the MM API for WhatsApp, you can access new features not available on Cloud API and get automatic optimizations, so high engagement messages can reach more customers.

The MM API for WhatsApp includes:

  * **Quality-based delivery:** Up to 9% higher marketing message deliveries over Cloud API for high engagement content.
  * **Automated creative optimizations:** Automatic enhancements to marketing creative to increase message performance.
  * **Performance benchmarks and recommendations:** Comparison of read and click rates versus similar templates from businesses in your region.
  * **Conversion metrics:** Measure marketing messages that lead users to perform app events such as ‘Add to Cart’, ‘Checkout Initiated’, or ‘Purchase’.

[Learn more about the Marketing Messages API for WhatsApp.](/documentation/business-messaging/whatsapp/marketing-messages/overview)

### Webhooks

Webhooks deliver JSON payloads to your server for message status updates, incoming messages, asynchronous error handling, and many other notification utilities.

The platform relies heavily on webhooks, as the contents of any message sent from a WhatsApp user to your business phone number is communicated via webhook, and all outgoing message delivery status updates are reported via webhook.

[Learn more about webhooks](/documentation/business-messaging/whatsapp/webhooks/overview).

## Technical foundations

### HTTP protocol and API requests

The WhatsApp Business Platform is built on [Graph API](/docs/graph-api/overview) and uses HTTP protocol. API requests include path, body, and header parameters.

#### Example: Sending a text message using cURL
    
    
    curl 'https://graph.facebook.com/v17.0/106540352242922/messages' \  
      -H 'Content-Type: application/json' \  
      -H 'Authorization: Bearer EAAJB...' \  
      -d '{  
        "messaging_product": "whatsapp",  
        "recipient_type": "individual",  
        "to": "+16505555555",  
        "type": "text",  
        "text": {  
          "preview_url": true,  
          "body": "Here's the info you requested! https://www.meta.com/quest/quest-3/"  
        }  
      }'  
      
    

[Learn more about the Graph API.](/docs/graph-api)

### JSON responses

API responses are formatted in JSON.

#### Example: Requesting a business phone number’s metadata
    
    
    {  
      "verified_name": "Lucky Shrub",  
      "code_verification_status": "VERIFIED",  
      "display_phone_number": "15550783881",  
      "quality_rating": "GREEN",  
      "platform_type": "CLOUD_API",  
      "throughput": {  
        "level": "STANDARD"  
      },  
      "webhook_configuration": {  
        "application": "https://www.luckyshrub.com/webhooks"  
      },  
      "id": "106540352242922"  
    }  
      
    

### Authentication and authorization

Authentication uses OAuth (not 2.0) access tokens, while permissions restrict access to specific resources.

  * [Learn more about access tokens.](/documentation/business-messaging/whatsapp/access-tokens)
  * [Learn more about permissions.](/documentation/business-messaging/whatsapp/permissions)

## Key resources

### Business portfolios

A business portfolio allows organizations to bring all their Meta business assets together so they can be managed in one place. On the WhatsApp Business Platform, a business portfolio mainly serves as a container for WhatsApp Business Accounts (WABA). You must have a business portfolio to use the platform.

Business portfolios can be verified, and verification status factors into improved functionality, such as higher throughput and [Official Business Account](/documentation/business-messaging/whatsapp/official-business-accounts) status.

[Learn more about business portfolios.⁠](https://www.facebook.com/business/help/486932075688253)

### WhatsApp business accounts (WABA)

A WhatsApp Business Account represents your business, storing metadata and linking to phone numbers, templates, and analytics.

[Learn more about WhatsApp Business Accounts.](/documentation/business-messaging/whatsapp/whatsapp-business-accounts)

### Business phone numbers

Business phone numbers, real or virtual, are used for sending and receiving WhatsApp messages. They can have display names and earn Official Business Account status.

[Learn more about business phone numbers.](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)

### Message templates

Templates are customizable messages that you can construct in advance of sending them. Template messages generally require approval before you can send them.

Templates are useful for messaging at scale. They are also the only type of message that can be sent to WhatsApp users outside of a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows).

Templates have quality scores and are subject to various messaging limits.

[Learn more about message templates.](/documentation/business-messaging/whatsapp/templates/overview)

### Test resources

When you [get started with Cloud API](/documentation/business-messaging/whatsapp/get-started), a test WABA and test business phone number are automatically created for you. Test WABAs and test phone numbers are useful for testing purposes, as they have relaxed messaging limits and don’t require a payment method on file in order to send template messages.

You can delete your business portfolio and its test resources if:

  * You are an admin on the business portfolio associated with the app
  * No other apps are associated with the business portfolio
  * The business portfolio is not associated with any other WABAs
  * The WABA is not associated with any other business phone numbers.

To delete your business portfolio and its test resources:

  1. Go to the **App Dashboard > WhatsApp > Configuration** panel.
  2. Locate the **Test Account** section.
  3. Click the **Delete** button.

We recommend using our API Playground when testing endpoints. You can find the playground in the “API Reference” section on the left sidebar of this page. In each reference, there is a “Try it” button which opens the playground.

Also helpful for testing is our [Postman collection⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.postman.com%2Fmeta%2Fwhatsapp-business-platform%2F&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg).

## Tools and integrations

### WhatsApp Manager

WhatsApp Manager is a web app for managing WABAs, phone numbers, templates, and reviewing analytics.

[Access WhatsApp Manager⁠](https://business.facebook.com/wa/manage/home/)

### Third-party SDKs

Some SDKs, like [PyWa⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fpywa.readthedocs.io%2Fen%2F2.0.1%2F&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg) (Python wrapper), are available but are not maintained or endorsed by Meta.

### Postman collection

The official Postman collection lets you execute common API queries.

[Access the WhatsApp Business Platform Postman collection⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.postman.com%2Fmeta%2Fwhatsapp-business-platform%2F&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg).

## Security and performance

### Throughput

Business phone numbers can send up to 80 messages per second by default, with capacity upgrades available.

[Learn more about throughput.](/documentation/business-messaging/whatsapp/throughput)

### Encryption

With the Cloud API, every WhatsApp message continues to be protected by Signal protocol encryption that secures messages before they leave the device. This means messages with a WABA are securely delivered to the destination chosen by each business.

The Cloud API uses industry standard encryption techniques to protect data in transit and at rest. The API uses Graph API for sending messages and Webhooks for receiving events, and both operate over industry standard HTTPS, protected by TLS. See our Encryption Overview whitepaper for additional details.

See the [WhatsApp Encryption Overview whitepaper⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.whatsapp.com%2Fsecurity%2FWhatsApp-Security-Whitepaper.pdf&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg) for additional details.

### Scaling

The Cloud API automatically scales usage within your rate limits.

### Rate limits

Requests made by your app on your WhatsApp Business Account (WABA) are counted against your app’s request count. An app’s request count is the number of requests it can make during a rolling one hour.

For the following endpoints, your app can make 200 requests per hour, per app, per WABA, by default. For active WABAs with at least one registered phone number, your app can make 5000 requests per hour, per app, per active WABA.

Type of request |  Endpoint   
---|---  
`GET`| `/`  
`GET`, `POST`, and `DELETE`| `//assigned_users`  
`GET`| `//phone_numbers`  
`GET`, `POST`, and `DELETE`| `//message_templates`  
`GET`, `POST`, and `DELETE`| `//subscribed_apps`  
`GET`| `/`  
  
For the following [Credit Line API](/documentation/business-messaging/whatsapp/solution-providers/share-and-revoke-credit-lines) requests, your app can make 5000 requests per hour.

Type of request |  Endpoint   
---|---  
`GET`| `//extendedcredits`  
`POST`| `//whatsapp_credit_sharing_and_attach`  
`GET` and `DELETE`| `/`  
`GET`| `//owning_credit_allocation_configs`  
  
For more information on how to get your current rate usage, see [Headers](/docs/graph-api/overview/rate-limiting#headers).

In addition, the platform applies several message rate limits:

  * Test message rate limit (for unverified WABAs)
  * Quality rating and messaging limits (for verified WABAs)
  * Capacity rate limit (for all accounts)
  * Business phone rate limit (per phone number)

#### Pair rate limits

Business phone numbers can send 1 message every 6 seconds to the same WhatsApp user (0.17 messages/second), which equals about 10 messages per minute or 600 per hour. Exceeding this limit triggers [error code 131056](/documentation/business-messaging/whatsapp/support/error-codes#throttling-errors) until you are back within the allowed rate.

You may send up to 45 messages in a 6-second burst, but this “borrows” from your future quota. After a burst, you must wait the equivalent time it would take to send those messages at the normal rate (e.g., a burst of 20 requires a ~2-minute wait before sending more to that user).

To manage post-burst throttling, if a send request fails, retry after 4^X seconds (starting with X=0 and increasing X by 1 after each failure) until successful.

## Terms and policies

### User opt-in

You must obtain user [opt-in](/documentation/business-messaging/whatsapp/getting-opt-in) before sending message templates. Opt-in must clarify your business name and intent.

[Learn more about the WhatsApp Business Messaging Policy.⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.whatsapp.com%2Flegal%2Fbusiness-policy%2F&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg)

### Terms and policies

All platform use must comply with WhatsApp’s terms and policies. Using unauthorized third-party tools is prohibited.

  * [Learn more about terms and policies.⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.whatsapp.com%2Flegal%2Fbusiness-terms%2F&h=AT620R61G43e6lZdbxdnO7YyZQHSOdOlTGrYR7QntqaYwKRrHi4JBMKduRQdikhhBdpODEq4kgwUqUxRNjvG_gxusYYXCNXWRziSYCJNAC6YgUdPNoS9ZPPFVnSHieIQlJ7_l3Vdr4czBpvKeEmHAg)

## Next steps

[Get started with the WhatsApp Business Platform.](/documentation/business-messaging/whatsapp/get-started)

**Learn more**

  * [Display names](/documentation/business-messaging/whatsapp/display-names)
  * [Phone numbers](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers)
  * [Pricing](/documentation/business-messaging/whatsapp/pricing)
  * [Webhooks](/documentation/business-messaging/whatsapp/webhooks/overview)

Did you find this page helpful?

ON THIS PAGE

Core APIs and capabilities

WhatsApp Cloud API

Business Management API

Marketing Messages API for WhatsApp

Webhooks

Technical foundations

HTTP protocol and API requests

Example: Sending a text message using cURL

JSON responses

Example: Requesting a business phone number’s metadata

Authentication and authorization

Key resources

Business portfolios

WhatsApp business accounts (WABA)

Business phone numbers

Message templates

Test resources

Tools and integrations

WhatsApp Manager

Third-party SDKs

Postman collection

Security and performance

Throughput

Encryption

Scaling

Rate limits

Pair rate limits

Terms and policies

User opt-in

Terms and policies

Next steps

* * *