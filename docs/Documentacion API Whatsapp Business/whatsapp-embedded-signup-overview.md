# Embedded Signup

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/overview

---

# Embedded Signup

Updated: Nov 25, 2025

Embedded Signup is an authentication and authorization desktop- and mobile-compatible interface that makes it easy for your business customers to generate the assets you will need to successfully onboard them to the WhatsApp Business Platform.

The Embedded Signup flow gathers business-related information from your business customers, automatically generates all WhatsApp assets needed by the platform, and grants your app access to these assets, so you can quickly provide your business customers with WhatsApp messaging services.

## How it works

Embedded Signup leverages the Facebook Login for Business product and our JavaScript SDK. Once configured, you can add a link or button to your website or portal that launches the flow.

Business customers who click the link or button will be presented with a new window where they can:

  * authenticate their identity using their Facebook or Meta Business Credentials
  * accept terms of service for Cloud API, WhatsApp Business, Meta, Marketing Messages Lite API and Meta Business Tool Terms
  * select multiple WhatsApp APIs and accept terms of service
  * grant your app access to their WhatsApp assets
  * select an existing business portfolio or create a new one
  * select an existing WhatsApp Business Account (WABA) or create a new one
  * enter and verify their business phone number (their own, or one you have provided)
  * enter a display name that can appear in place of their number in the WhatsApp client

Upon successful completion, Embedded Signup returns the customer’s WABA ID, business phone number ID, and an exchangeable token code, to the window that spawned the flow. You must send this data to your server and use it in a server-to-server call to:

  * exchange the code for a customer-scoped business token
  * register the customer’s business phone number for Cloud API use
  * subscribe your app to webhooks on the customer’s WABA
  * share your credit line with the customer (Solution Partners only)

When these steps are complete, if you are a Solution Partner or are partnered with one, the customer can begin using your or your partner’s app for messaging immediately. If you are not a Solution Partner, or not partnered with one, the customer must first attach a payment method to their WABA before they can begin messaging.

We’re testing a new experience in the Embedded Signup flow for all versions. The flow itself is unchanged, but after completion, you may see a new **View your setup guide** button. Clicking it will take you to a new setup guidance page in WhatsApp Manager, which offers next steps on:

  * Business verification
  * Resolving integrity issues and accessing Business Support Home
  * Sending the first message via a partner solution
  * Sending business-initiated messages using templates

## Asset ownership

Business customers onboarded via Embedded Signup own all of their WhatsApp assets, which they can leverage with other Meta solutions such as [Ads that Click to WhatsApp⁠](https://www.facebook.com/business/help/447934475640650).

Business customers also have full access to [WhatsApp Manager⁠](https://business.facebook.com/wa/manage/), which they can use to access their assets. Note that you cannot restrict this access in any way. Refer to available assets [here](/documentation/business-messaging/whatsapp/embedded-signup/version-4).

## Limitations

### Onboarding limits

By default, you can onboard up to 10 new business customers in a rolling 7-day window. Only newly onboarded customers count against this limit. You can see your current onboarded customer count in the **WhatsApp Manager** > **Partner overview** panel. You will be notified by email if you approach this limit.

If you complete Business Verification, App Review, and Access Verification, we will automatically increase your limit to 200 new business customers in a rolling 7-day window. If you need to onboard more than 200 customers per week, apply to become a [Meta Business Partner⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fbusiness.whatsapp.com%2Fpartners%2Fbecome-a-partner&h=AT6HMcYm14P12vzBObk_dCG8R6aAVEVlPkX7IbBzmgqqMM9cjKVa4o3C6GZE3VsgOykPRxv8gqssHhOW2-11bw7llEI1gCsT9tlTEEXRc_OjIlai-i4-wHGFPoI9NBwwVoYcwm1h-wQvnsZZGZWFCA).

**Note:** Existing WhatsApp Business Accounts (WABAs) that were originally created via the developer app cannot be selected or onboarded directly through the Embedded Signup flow.

### Business customer messaging limits

Business customers onboarded via Embedded Signup start with standard [messaging limits](/documentation/business-messaging/whatsapp/messaging-limits), which can be increased through API usage.

### Business customer phone number limits

  * Business phone numbers can only be registered for use with Cloud API.
  * Business phone numbers already in use with the [WhatsApp Business app⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fbusiness.whatsapp.com%2Fproducts%2Fbusiness-app&h=AT6HMcYm14P12vzBObk_dCG8R6aAVEVlPkX7IbBzmgqqMM9cjKVa4o3C6GZE3VsgOykPRxv8gqssHhOW2-11bw7llEI1gCsT9tlTEEXRc_OjIlai-i4-wHGFPoI9NBwwVoYcwm1h-wQvnsZZGZWFCA) are supported, but require you customize the flow to enable [WhatsApp Business app user onboarding](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) (aka “Coexistence”).
  * Business customers onboarded via Embedded Signup start with default [messaging limits](/documentation/business-messaging/whatsapp/messaging-limits).

## Cloud API flow

See [Cloud API Flow](/documentation/business-messaging/whatsapp/embedded-signup/default-flow) for descriptions of each screen that your business customers will be presented with as part of the default implementation of Embedded Signup.

Note that if you know information about your customer’s business, you can [inject this data](/documentation/business-messaging/whatsapp/embedded-signup/pre-filled-data), which can significantly reduce the number of screens that your customers have to interact with.

## Access tokens

Embedded Signup generates [business tokens](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens). When a business customer completes the Embedded Signup flow, an exchangeable token code will be returned as a message event and captured by the JavaScript SDK. You must exchange this code for a business token using a server-to-server call.

If you are a Tech Provider, you will use business tokens exclusively.

If you are a Solution Partner, you will use your [system user access token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) (“system token”) to share your credit line with onboarded business customers, and business tokens for everything else. Note that the system user who the token represents must have granted your app the **business_management** permission, and must have been granted an **Admin** or **Financial Editor** role on your business portfolio, in order to be able to share your credit line.

## Permissions

Embedded Signup can be configured to support business messaging products for your customers. If you are only interested in the Cloud API flow you are likely only going to need:

  * **whatsapp_business_management** — necessary if your app needs access to onboarded customer WhatsApp Business Account settings and message templates.
  * **whatsapp_business_messaging** — necessary if your app needs access to onboarded customer business phone number settings, or if your app will be used by customers to send and receive messages.

You can specify which permissions your app needs during the [implementation](/documentation/business-messaging/whatsapp/embedded-signup/implementation) process.

Note that while your app is in development mode, these permissions will appear in Embedded Signup’s [authorization screen](/documentation/business-messaging/whatsapp/embedded-signup/default-flow#authorization-screen) to anyone who has an **admin** , **developer** , or **tester** role on your app. However, once you switch your app to live mode, only permissions that have been approved for advanced access through the [App Review](/documentation/business-messaging/whatsapp/solution-providers/app-review) process will appear in the flow.

## Billing

### Solution Partners

If you are a Solution Partner, you must already have a [line of credit⁠](https://www.facebook.com/business/help/1684730811624773?id=2129163877102343) and have accepted the Credit Allocation API terms in the **Business Settings** > **Payments** panel in the Meta Business Suite. In addition, you must share your line of credit with any customers as part of the onboarding process.

### Tech Providers and Tech Partners

If you are a Tech Provider or Tech Partner, your onboarded business customers must add a payment method to their WhatsApp Business Account. They can do this by following the steps described in our [Add a credit card to your WhatsApp Business Platform account⁠](https://www.facebook.com/business/help/488291839463771) Help Center article.

## Sandbox accounts

You can test the Embedded Signup flow using your own Facebook account, but this can result in additional business portfolios, WABAs, and business phone numbers. If you don’t want to clutter your Facebook account with test data, you can claim a sandbox test account instead, and use it to simulate a business customer completing the flow.

When you complete the flow using the sandbox account, the sandbox account’s [WABA ID, business phone number ID](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener), and an [exchangeable token code](/documentation/business-messaging/whatsapp/embedded-signup/implementation#response-callback) will be returned, just as if it were a real customer completing the flow.

### Sandbox account limitations

  * Sandbox accounts are valid for 30 days, after which they will be deactivated and must be reclaimed in order to be used again.
  * The sandbox account cannot be used to create additional sandbox business portfolios, WABAs, or business phone numbers; the assets are generated automatically and will appear in the Embedded Signup flow.
  * The sandbox account is associated with the app’s admin. In order for the sandbox account’s assets to appear in the Embedded Signup flow, the app admin must be signed into their Meta developer account.
  * The sandbox account’s business portfolio will not appear in the Meta Business Suite or WhatsApp Manager
  * You can exchange the returned token code for the sandbox account’s business token and use it to get data on the account’s WABA ID, but the business phone number cannot be used to send or receive messages.

### Claiming sandbox accounts

To claim your sandbox account:

  1. Navigate to the [App Dashboard](/apps) > **WhatsApp** > **Quickstart** panel.
  2. Locate the **Testing Integrations** section.
  3. Click the **Claim sandbox account** button.

### Deleting sandbox accounts

Sandbox account deletion is being released gradually over several weeks, starting June 25, 2025.

If you are done testing and want to keep your testing environment clean, you can delete your sandbox account. Deleting a sandbox account is irreversible and removes all associated test data. If you accidentally delete your sandbox account but need to test again, you must claim a new one.

To delete your sandbox account:

  1. Navigate to the [App Dashboard](/apps) > **WhatsApp** > **Quickstart** panel.
  2. Locate the **Testing Integrations** section, then locate your sandbox account.
  3. Click your sandbox account’s **Delete account** button.

## 555 business phone numbers

Business customers can claim up to two 555 business phone numbers. These numbers behave the same way as standard business phone numbers (subject to pricing rules, impacted by quality ratings, etc.), but must have their display names approved before they can be used to send messages. In addition, 555 numbers:

  * Have a US country calling code (+1)
  * Have a 555 area code
  * Are verified automatically
  * Cannot be migrated to another WhatsApp Business Account, or used outside of the WhatsApp Business platform

If your business customers are eligible for 555 numbers, the [phone number addition screen](/documentation/business-messaging/whatsapp/embedded-signup/default-flow#phone-number-addition-screen) will automatically give them the option to choose a 555 number:

## WhatsApp Asset migration

Embedded Signup can be used to migrate onboarded business customer assets in several ways. See [Migrating business customer assets](/documentation/business-messaging/whatsapp/solution-providers/support#migrating-business-customer-assets).

## App Review

You will not be able to onboard business customers until your app has been approved for **advanced access** for each of the permissions it requires.

See [App Review](/documentation/business-messaging/whatsapp/solution-providers/app-review) to learn more about App Review and what you must provide in order to complete the process successfully.

## Embedded Signup Integration Helper

The Embedded Signup Integration Helper is a setup and testing tool within the App Dashboard. The tool allows you to:

  * launch Embedded Signup in various flow configurations
  * see data that gets returned when a business customer completes the flow
  * generate implementation code and onboarding queries, which you can copy and paste into your website, business customer portal, and server
  * send API queries to endpoints you will need to use when onboarding customers who complete the flow

You can access the integration helper by navigating to **App Dashboard** > **WhatsApp** > **Embedded Signup Builder**.

**Note:** The Embedded Signup Integration Helper is available only for Business-type apps. You can view your app type at the top of the app dashboard.

## Webhooks

As part of the onboarding process, you must subscribe your app to webhooks on the WABA of each business customer who completes the Embedded Signup flow.

Webhooks will be triggered and sent to the callback URL configured on your app, according to the webhook fields you have subscribed to. This means that all webhooks for all of your onboarded business customers will be sent to your app’s callback URL. However, you can override the callback URL on an individual WhatsApp Business Account or business phone number. See [Webhook Overrides](/documentation/business-messaging/whatsapp/webhooks/override) to learn how to do this.

## Localization

The Embedded Signup flow is available in 30 languages. The localized flow is automatically triggered based on the language that the business customer uses Facebook in.

Arabic, Czech, Danish, Greek, English (UK), Spanish (Spain), Spanish, Finnish, French (France), Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Norwegian (bokmal), Dutch, Polish, Portuguese (Brazil), Portuguese (Portugal), Romanian, Russian, Swedish, Thai, Turkish, Vietnamese, Simplified Chinese (China), Traditional Chinese (Hong Kong), Traditional Chinese (Taiwan).

## Next steps

Learn how to [implement Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/implementation) into your website or portal.

Did you find this page helpful?

ON THIS PAGE

How it works

Asset ownership

Limitations

Onboarding limits

Business customer messaging limits

Business customer phone number limits

Cloud API flow

Access tokens

Permissions

Billing

Solution Partners

Tech Providers and Tech Partners

Sandbox accounts

Sandbox account limitations

Claiming sandbox accounts

Deleting sandbox accounts

555 business phone numbers

WhatsApp Asset migration

App Review

Embedded Signup Integration Helper

Webhooks

Localization

Next steps

* * *