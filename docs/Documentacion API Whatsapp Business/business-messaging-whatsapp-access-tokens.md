# Access Tokens Guide

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/access-tokens

---

# Access Tokens Guide

Updated: Mar 1, 2026

The platform supports the following access token types. The type you use depends on who will be using your application, and whether you are a [solution provider](/documentation/business-messaging/whatsapp/solution-providers/overview).

  * If you are a **direct developer** , meaning only you or your business will be accessing your own data, use a System User access token.
  * If you are a **Tech Provider** , use a Business Integration System User access token.
  * If you are a **solution partner** , use System User access tokens to share your line of credit with newly onboarded customers, and Business Integration System User access tokens for everything else.

## System user access tokens

System user access tokens (“system tokens”) represent you, your business, organization, or people within them. The main advantage of these tokens is that they are long-lived and can represent automated services within your business that don’t require any user input.

System tokens rely on system users. Most endpoints check if the user identified by the token has access to the queried resource. If the user doesn’t have access to the resource, the system rejects the request with error code `200`.

System users can be admins or employees.

### Admin system users

By default, admin system users have full access to all WhatsApp Business Accounts (WABAs) and their assets owned by or shared with you or your business portfolio.

Admin system users are useful if your app needs access to all of the business portfolio’s assets, without having to manually grant business asset access to each asset whenever it is created, or shared with your business portfolio.

You can override an admin system user’s default business asset access by granting partial access on a per-WABA basis. See Business Asset Access to learn how to set and override access.

### Employee system users

Employee system users must be granted access to individual WABAs that are owned by, or shared with, your business portfolio. If your app will only need access to a few WABAs that you own, an employee system user should be sufficient.

Once created, you must grant **Partial** or **Full**business asset access to each WABA that the system user needs to access.

### Generate system user access tokens

To generate a system token, access the [**Business settings** ⁠](https://business.facebook.com/settings/) panel and then click **System Users** :

Click the **+Add** button, and in the **Create system user** window that appears, enter a system user name and assign it an **Admin** or **Employee** role:

Once you create the admin system user, it appears in the list of system users. Click the system user’s name to display the asset assignment overlay:

Click the **Assign assets** button to display the **Select assets and assign permissions** window:

Select your app and grant your system user the **Manage app** permission, then click the **Assign assets** button to confirm and dismiss the window.

Back in the **System Users** panel, reload the page to confirm that your system user has been granted **Full control** of your app. It may take a few minutes for the permissions to be granted, so reload the page after a few minutes if your app doesn’t appear as an assigned asset. Once the asset has been assigned, it should look like this:

Once you see that your system user has been granted full control of your app, in the asset assignment overlay, click the **Generate token** button. In the window that appears, select your app, choose a token expiration preference, and assign your app these three Graph API permissions:

  * `business_management`
  * `whatsapp_business_management`
  * `whatsapp_business_messaging`

You can search for `business` to find these permissions quickly:

Click the **Generate token** button and copy the token when it appears.

## Business Integration System User access tokens

Business Integration system user access tokens (“business tokens”) are scoped to individual onboarded customers and should be used by Tech Providers and solution partners when accessing onboarded customer data.

These tokens are useful for apps that perform programmatic, automated actions on customer WABAs, without having to rely on input from an app user, or requiring future re-authentication.

To generate a Business Integration System User access token, you must implement Embedded Signup (configured with Facebook Login for Businesses) and exchange the code returned to you when a customer completes the flow.

See [Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/overview) and [Business Integration System User access tokens](/docs/facebook-login/facebook-login-for-business#business-integration-system-user-access-tokens) to learn more about these tokens and how to generate them.

## User access tokens

Although User access tokens are supported and can be used by all app developers, you likely will only use them when you first use the App Dashboard to [send your first test message](/documentation/business-messaging/whatsapp/get-started). As you develop your app, however, you most likely will switch to a System User access token (and eventually a Business System User access token, if you are a Tech Provider or a Solution Provider). This is because user access tokens expire quickly, so you will have to keep generating a new one every few hours.

There are several ways to generate a User access token:

  * Access the **App Dashboard** > **WhatsApp** > **API setup** panel. This panel always generates a new User access token whenever you visit it. The token is automatically scoped to your user, since you are signed into your developer account when you access the panel.
  * Use [Graph API Explorer](/tools/explorer).
  * Implement [Facebook Login](/docs/facebook-login).

## Use tokens in requests

When making API requests, include your token in an authorization request header, preceded by `Bearer`. For example:
    
    
    curl 'https://graph.facebook.com/v18.0/102290129340398/message_templates' \  
    -H 'Authorization: Bearer EAAJB...' \  
      
    

## Business asset access

After creating a system user, you must set business asset access levels. Many endpoints require the system user whose token is included in API requests to have either **Partial** or **Full** business asset access to the WABA being queried (or its assets). If the system user doesn’t have this access, these endpoints return error code `200`.

If you set a system user’s business asset access on a WABA to **Partial** access, you can further restrict access to certain assets or actions on the WABA. For example, if you have a large business and want a certain department to only have read access to a WABA’s template and business phone number data, you could create a system user for that department and set granular access to view only for that data.

To set business asset access on a WABA, follow these steps:

  1. Sign into [Meta Business Suite⁠](https://business.facebook.com).
  2. Locate your business portfolio in the dropdown menu at the top of the page and click its **Settings** (gear) icon.
  3. Navigate to **Accounts** > **WhatsApp Accounts**.
  4. Select the appropriate WABA.
  5. Select the **WhatsApp Account Access** tab.
  6. Click the **+Add people** button.
  7. Select the appropriate system user and assign appropriate access levels on the WABA.

Did you find this page helpful?

ON THIS PAGE

System user access tokens

Admin system users

Employee system users

Generate system user access tokens

Business Integration System User access tokens

User access tokens

Use tokens in requests

Business asset access

* * *