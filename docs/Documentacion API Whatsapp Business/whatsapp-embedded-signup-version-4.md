# Version 4

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/version-4

---

# Version 4

Updated: Dec 12, 2025

Release date: October 8, 2025. Check back soon for updates on additional supported products.

To upgrade to the v4 experience: You need to create a new [Facebook Login for Business Configuration](/documentation/business-messaging/whatsapp/embedded-signup/implementation/#step-2-create-a-facebook-login-for-business-configuration), and select your desired products. Selecting the products will automatically set you to v4.

See [screenshots](/documentation/business-messaging/whatsapp/embedded-signup/version-4#using-the-facebook-login-for-business-configuration-to-get-started-with-v4) below.

## Overview of v4 changes

  * Simplified onboarding experience for businesses: 
    * You can onboard businesses to more business messaging in a single flow ([see supported products](/documentation/business-messaging/whatsapp/embedded-signup/version-4#supported-products)).
    * Asset selection, business information, and permissions are each consolidated onto a single page.
    * Asset admins can share assets from other business portfolios.
    * Phone numbers are auto-linked to Facebook Pages when onboarding to ads that click to WhatsApp via the Marketing API.
    * Value proposition and Terms of Service are clearly presented.
  * The [Facebook Login for Business Configuration](/documentation/business-messaging/whatsapp/embedded-signup/version-4#using-the-facebook-login-for-business-configuration-to-get-started-with-v4) is used to define which products to add into your onboarding flow.

## Learn more

  * [v4 - Cloud API flow](/documentation/business-messaging/whatsapp/embedded-signup/default-flow)

## Supported products

v4 supports additional business messaging products, ensuring businesses to set up and manage multiple communication channels from a single platform:

  * **Conversions API (WhatsApp)** : Track and optimize messaging interactions by selecting the messaging platform you want to monitor, enabling enhanced measurement and optimization.
  * **Click to WhatsApp Ads (CTWA)** : Create ads that direct users to initiate WhatsApp conversations with your business.
  * **Click to Messenger Ads (CTM)** : Run advertising campaigns that start conversations with users on Facebook Messenger.
  * **Click to Direct Ads (CTD)** : Launch Instagram ad campaigns that drive users to direct messaging conversations on Instagram Direct.

## All other supported products

v4 continues to support existing business messaging products, allowing businesses to seamlessly manage their established communication channels.

  * **Cloud API** : Integrate and manage WhatsApp messaging at scale, enabling businesses to send and receive messages, automate workflows, and access advanced messaging features.
  * **Marketing Messages API for WhatsApp** : Utilize to manage optimized marketing messaging , providing tools for message analytics, and enhanced customer engagement.
  * **WhatsApp Business App users (aka “Coexistence”) support** : Onboarding via Coexistence continues to be supported through the [`feature_type` parameter](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users#step-2--customize-embedded-signup).
  * **Partner-led Business Verification (PLBV) support** : [PLBV](/documentation/business-messaging/whatsapp/solution-providers/partner-led-business-verification) enables partners to verify business after onboarding via Embedded Signup. If you are considering this option, ensure you are an approved Select Solution or Premier Solution Partner, and [approved for access⁠](https://www.facebook.com/business/help/1091073752691122).
  * **Automatic Events API** : [Automatic Events API](/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api) notifies your application about key events that occur through Click-to-WhatsApp ads.

## Use the Facebook Login for Business Configuration to get started with v4

v4 enables you to easily set up and change which products you want to include in your onboarding flow:

Step 1: Navigate to [App Dashboard](https://developers.facebook.com/apps) > **Facebook Login for Business** > **Configurations** to create a new configuration.

Step 2: Select **Embedded Signup** as the login variation.

Step 3: Select which products you want to include in your onboarding flow. Selecting more than one product is optional.

Step 4: Copy the configuration id to use inside the Facebook Login SDK.

## Required assets and permissions

When selecting products for v4, the flow will automatically select all necessary permissions and assets. You will need advanced access for all permissions automatically selected in the flow. If needed, you can select additional assets and permissions. The table below is a reference on what assets and permissions you need depending on what product you would like to offer.

Product |  Required assets |  Required permissions (Advanced Access)   
---|---|---  
[Cloud API](/documentation/business-messaging/whatsapp/about-the-platform#whatsapp-cloud-api)| WhatsApp Business accounts| whatsapp_business_managementwhatsapp_business_messaging  
[Click to WhatsApp (CTWA on Marketing API)](/docs/marketing-api/ad-creative/messaging-ads/click-to-whatsapp)| WhatsApp Business accountsFacebook PagesAd accounts| ads_readads_managementpages_manage_adspages_read_engagementpages_show_list  
[Click to Messenger (CTM on MAPI)](/docs/marketing-api/ad-creative/messaging-ads/click-to-messenger)| Facebook PagesAd accounts| ads_managementpages_manage_adspages_read_engagementpages_show_list  
[Click to Instagram (CTD on MAPI)](/docs/marketing-api/ad-creative/messaging-ads/click-to-instagram)| Facebook PagesAd accountsInstagram accounts| ads_managementpages_manage_adspages_read_engagementpages_show_list  
[Marketing Messages API for WhatsApp](/documentation/business-messaging/whatsapp/marketing-messages/overview)| WhatsApp Business accounts| whatsapp_business_managementwhatsapp_business_messaging  
[Conversions API for CTWA](/docs/marketing-api/conversions-api/business-messaging#ads-that-click-to-whatsapp)| WhatsApp Business accountsPixels| whatsapp_business_manage_events  
[Conversions API for CTM](/docs/marketing-api/conversions-api/business-messaging#ads-that-click-to-messenger)| Facebook PagesAd accountsPixels| page_events  
[Conversions API for CTD](/docs/marketing-api/conversions-api/business-messaging#ads-that-click-to-instagram-direct)| Facebook PagesAd accountsInstagram accountsPixels| instagram_manage_events  
  
Did you find this page helpful?

ON THIS PAGE

Overview of v4 changes

Learn more

Supported products

All other supported products

Use the Facebook Login for Business Configuration to get started with v4

Required assets and permissions

* * *