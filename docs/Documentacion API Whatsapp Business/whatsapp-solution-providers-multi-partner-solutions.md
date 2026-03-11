# Multi-Partner Solutions

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions

---

# Multi-Partner Solutions

Updated: Feb 27, 2026

This document explains how to set up Multi-Partner Solutions (“solutions”) and how to use them with [Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/overview).

Multi-Partner Solutions allow Solution Partners and Tech Providers to jointly manage customer WhatsApp assets in order to provide WhatsApp messaging services to their customers. For example, if you are a Tech Provider and are unable to offer custom or full WhatsApp messaging services to your customers, you can work with a Solution Partner to offer your customers the Solution Partner’s services.

Once created and accepted via API or App Dashboard, the solution’s ID can be used to customize the Embedded Signup flow. Any customers onboarded via the customized flow can grant asset access to all of the solution’s partners.

Note that solutions can also be set up via an embedded button that triggers an interface that gathers app information from Tech Providers. This flow and the API calls involved are described in the [Multi-Partner Solution — Embedded Creation](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solution-embedded-creation) document, but the information below is still relevant and should be read first.

## Requirements

You must be an approved [Solution Partner](/documentation/business-messaging/whatsapp/solution-providers/overview#solution-partners), a Tech Provider who has completed the steps in our [Get Started for Tech Providers](/documentation/business-messaging/whatsapp/solution-providers/get-started-for-tech-providers) document appropriate for your intended usage, or a Tech Provider who has been upgraded to a [Tech Partner](/documentation/business-messaging/whatsapp/solution-providers/overview#tech-partners).

If your app will be calling our APIs to access onboarded customer data:

  * The app must be the same app whose token will be used in API requests.
  * The app must have undergone App Review and been approved for the [whatsapp_business_management](/docs/permissions#w) and [whatsapp_business_messaging](/docs/permissions#w) permissions.
  * The app must be subscribed to the **account_updates** webhooks field and be able to successfully digest webhooks for onboarded customers.

## Creating Multi-Partner Solutions

Use the **App Dashboard** > **WhatsApp** > **Partner Solutions** panel to create, accept, and manage solutions.

Solutions can be created by either partner of the solution. Once created, a solution request is sent to the invited partner, who can then use the panel in their App Dashboard to accept or decline the request. Once accepted, either partner can use the solution ID to customize the Embedded Signup flow and onboard business customers.

### Solution States

Solutions states are displayed in the **Partner solutions** panel. Solutions can have the following states:

State |  Description   
---|---  
**Active**|  The solution has been accepted by the invited party and can be used to configure Embedded Signup for customer onboarding.  
**Deactivated**|  The solution has been deactivated.  
Customers who attempt to access Embedded Signup configured for a solution in this state will see an error informing them that it cannot be used for onboarding at this time.  
**Draft**|  The solution has been initiated and saved, but you have not sent it to your partner.  
Customers who attempt to access Embedded Signup configured for a solution in this state will see an error informing them that it cannot be used for onboarding at this time.  
**Inactive**|  The solution request was declined by your partner.  
Customers who attempt to access Embedded Signup configured for a solution in this state will see an error informing them that it cannot be used for onboarding at this time.  
**Pending**|  Solution has not been accepted or declined by your partner.  
Customers who attempt to access Embedded Signup configured for a solution in this state will see an error informing them that it cannot be used for onboarding at this time.  
**Pending deactivation**|  Your partner has requested to deactivate the solution. You can accept or decline this request.  
  
### Onboarding Limits

Tech Providers who are part of a solution can onboard up to 200 total new customers in a rolling one week period. Only customers who are new to the WhatsApp Business Platform count against this limit.

## Embedded Signup

[Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/overview) can be configured and hosted by either of the solution’s partners, or both partners. Once implemented, customers who access it will see a customized version of the Embedded Signup flow, which makes it clear that by completing the flow they are granting WhatsApp data access to both partners:

When a customer completes the flow, all of the customer’s WhatsApp assets that we need are automatically generated, and access to those assets is granted to both partners of the solution.

## Billing

Customers onboarded via Embedded Signup configured with a solution ID share the credit line of the Solution Partner associated with the solution.

## Step 1: Determine Solution Details

Contact your potential partner and work together to determine:

  * A solution name. The solution name will appear in the **Partner Solutions** panel in the App Dashboard for both you and your partner, so you should both agree on a name that can be distinguished from other solutions you may initiate or accept.
  * Who will create and initiate the solution request. Either partner can do this. If you are initiating the request, you will need your partner’s app ID.
  * Who will host Embedded Signup configured with the solution ID. Either or both partners can do this.
  * Anything else, such as contracts, service level agreements, services provided, billing processes, etc. This is left to the discretion of you and your partner, subject to each of your separate agreements with Meta.

## Step 2: Subscribe to Webhooks

Subscribe to the **account_update** and **partner_solutions** webhooks fields. These webhooks will inform you when new business customers are onboarded, and when partner solutions that you are associated with are created or edited.

See the Webhooks section below for example payloads and what to look for when you receive any of these webhooks.

## Step 3: Create a Solution

If you are creating the solution, navigate to the **App Dashboard** > **WhatsApp** > **Partner solutions** panel and click the **Create a partner solution** button.

Use your partner’s app ID to complete the flow. As part of the creation flow you can designate which solution partner apps can be used by onboarded business customers to send messages (**Only me** , **Only my partner**).

Upon creation, an email and Meta Business Suite notification will be sent to your partner, and a **partner_solutions** webhook will be triggered.

The partner solution will appear in the **Partner solutions** panel with a **Pending** status until accepted by your partner. If accepted, its status will change to **Active**. If declined, its status will change to **Inactive**.

## Step 4: Accept The Solution Request

Everyone with admin (**Full control**) privileges on your business portfolio will be notified by email and Meta Business Suite notification when your partner sends you a partner solution request.

In addition, a **partner_solutions** webhook will be triggered with `event` set to `SOLUTION_CREATED` and `solution_status` set to `INITIATED`. Capture the included solution ID (`solution_id`) if you will be accepting/rejecting and managing the solution via API.

You can use either the App Dashboard or the API to accept the partner solution request.

### Via App Dashboard

The request will appear in the **App Dashboard** > **WhatsApp** > **Partner solutions** panel with a **Pending** status.

If you have multiple solutions and are having a hard time locating the solution request, use the dropdown menu in the top-right corner of the panel and filter by **Pending**.

Confirm that everything is correct before accepting the request, as solutions cannot be declined once they have been accepted.

Once you accept the solution, its status will be set to **Active** and you and your partner can use its ID to configure Embedded Signup.

If any information is incorrect, decline the request and ask your partner to submit a new request with the correct settings. Your partner will automatically be notified by email and Meta Business Suite notification if you decline the request.

### Via API

Before accepting the solution, use the [**GET / **](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/solution-details-api#get-version-solution-id) endpoint to get details about the solution and confirm that everything is correct, as solutions cannot be declined once they have been accepted.

Include the following fields in your query:

  * `name`
  * `owner_permissions`
  * `partners{partner_permissions,partner_app}`

#### Example request
    
    
    curl -g 'https://graph.facebook.com/v25.0/795033096057724&fields=name,owner_permissions,partners{partner_permissions,partner_app}' \
    -H 'Authorization: Bearer EAAAT...'

#### Example response
    
    
    {  
      "name": "Social OVD with Lucky Shrub",  
      "owner_permissions": [  
        "MANAGE",  
        "DEVELOP",  
        "MANAGE_TEMPLATES",  
        "MANAGE_PHONE",  
        "VIEW_COST",  
        "MANAGE_EXTENSIONS",  
        "VIEW_PHONE_ASSETS",  
        "MANAGE_PHONE_ASSETS",  
        "VIEW_TEMPLATES",  
        "VIEW_INSIGHTS"  
      ],  
      "partners": {  
        "data": [  
          {  
            "partner_permissions": [  
              "MANAGE",  
              "DEVELOP",  
              "MANAGE_TEMPLATES",  
              "MANAGE_PHONE",  
              "VIEW_COST",  
              "MANAGE_EXTENSIONS",  
              "VIEW_PHONE_ASSETS",  
              "MANAGE_PHONE_ASSETS",  
              "VIEW_TEMPLATES",  
              "VIEW_INSIGHTS"  
            ],  
            "partner_app": {  
              "link": "https://www.facebook.com/games/?app_id=21202248997039",  
              "name": "Lucky Shrub",  
              "id": "21202248997039"  
            },  
            "id": "795033099391057"  
          }  
        ],  
        "paging": {  
          "cursors": {  
            "before": "QVFIUl9hX0RqLUZAPemJQVWdsYTl5WlBsY0lCb0FNTExOY2N2NzJtRENZAbDd3azBNXzhPZAndqaU5sSXdfWWJaSXJ1S2pqMi0tQUdUdm1LTGZATUDNIdGRNNE1B",  
            "after": "QVFIUl9hX0RqLUZAPemJQVWdsYTl5WlBsY0lCb0FNTExOY2N2NzJtRENZAbDd3azBNXzhPZAndqaU5sSXdfWWJaSXJ1S2pqMi0tQUdUdm1LTGZATUDNIdGRNNE1B"  
          }  
        }  
      },  
      "id": "795033096057724"  
    }  
      
    

  * `name` — the name of the solution, as it appears in the App Dashboard.
  * `owner_permissions` — the permissions your partner’s app will be granted by business customers who onboard via Embedded Signup.
  * `partner_permissions` — the permissions your app will be granted by business customers who onboard via Embedded Signup.
  * `partner_app` — the app (your app) that will be granted the permissions identified in `partner_permissions`.

If everything is correct, use the [**POST / /accept**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/solution-accept-api#Updating) endpoint to accept the solution request, otherwise use the [**POST / /reject**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/solution-details-api#Updating) endpoint to reject it.

#### Example accept request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/795033096057724/accept' \
    -H 'Authorization: Bearer EAAAT...'

#### Example reject request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/795033096057724/reject' \
    -H 'Authorization: Bearer EAAAT...'

#### Example response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

## Step 5: Configure Embedded Signup

Assign the solution ID to the `solutionID` property in the `extras.setup` object within the [launch method and callback registration](/documentation/business-messaging/whatsapp/embedded-signup/implementation#launch-method-and-callback-registration) portion of the Embedded Signup code.
    
    
    // Launch method and callback registration  
    const launchWhatsAppSignup = () => {  
      FB.login(fbLoginCallback, {  
        config_id: '', // your configuration ID goes here, ensure it is in quotes  
        response_type: 'code',  
        override_default_response_type: true,  
        extras: {  
          setup: {  
            solutionID: '' // add solution ID here, ensure it is in quotes  
          },  
          featureType: '',  
          sessionInfoVersion: '3',  
        }  
      });  
    }  
      
    

Both you and your partner’s business portfolio (**Business Settings** > **Business Info**) will appear throughout the Embedded Signup flow.

Once configured, surface the customized Embedded SIgnup flow to customers on your platform wherever you feel it is appropriate. Note that if you have multiple active partner solutions, it is your responsibility to inject the correct solution ID into your Embedded Signup configuration and surface it to your intended customers, otherwise a customer could be onboarded using the wrong solution.

## Step 6: Listen for Onboarded Business Customers

To listen for onboarded customers, your app must be subscribed to the **account_update** webhook field.

When a customer completes the Embedded Signup flow configured with your solution, an account update webhook is triggered with a `PARTNER_ADDED` or `PARTNER_APP_INSTALLED` event. Capture the `waba_id`, `solution_id`, and `owner_business_id` property values contained in the webhook payload, as well as any other values you may need in order to provide the customer with WhatsApp messaging services.

In addition, we will send an email to admins of the business portfolio that owns the app, and a Meta Business Suite notification to the business portfolio that owns the app.

## Step 7: Share Your Credit Line (Solution Partners only)

If you are a Solution Partner, [share your line of credit](/documentation/business-messaging/whatsapp/solution-providers/share-and-revoke-credit-lines#sharing-your-credit-line) with any business customers newly onboarded via the partner solution.

**Note** : If you are a Solution Partner trying to add a user to a WhatsApp Business Account that is shared with you, you would need to account for the following scenarios:

  * If you are not granted the `MESSAGING` permission on the solution, then you need to decide which granular tasks you need when adding the user to the shared WhatsApp Business Account: `DEVELOP`, `MANAGE_TEMPLATES`, `MANAGE_PHONE`, `VIEW_COST`, `MANAGE_EXTENSIONS`, `VIEW_PHONE_ASSETS`, `MANAGE_PHONE_ASSETS`, `VIEW_TEMPLATES`, `VIEW_INSIGHTS`, `MANAGE_USERS`, and `MANAGE_BILLING`.
  * In this scenario, also note that `MANAGE_BILLING` is needed for credit line sharing.
  * `MANAGE` will only work if you are given **Full access** on the solution, i.e. including `MESSAGING`.

## Webhooks

### account_update

When a new business customer has successfully completed the Embedded Signup flow, an **account_update** webhook will be triggered with the `event` property set to `PARTNER_ADDED`.
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "value": {  
                "event": "",  
                "waba_info": {  
                  "waba_id": "",  
                  "owner_business_id": "",  
                  "solution_id": "",  
                  "solution_partner_business_ids": []  
                }  
              },  
              "field": "account_update"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

#### Payload Properties

  

Placeholder |  Description |  Example   
---|---|---  
``| Your business portfolio ID.| `506914307656634`  
``| Onboarded customer’s business portfolio ID.| `6143763655652543`  
``| Onboarded customer’s WhatsApp Business Account ID.| `102290129340398`  
``| If set to `PARTNER_ADDED`, indicates that the business customer has successfully completed the Embedded Signup flow.| `PARTNER_ADDED`  
``| Strings of business portfolio IDs of the Tech Provider (or Tech Partner) and Solution Partner associated with the solution.| `"506914307656634","116133292427920"`  
``| Solution ID.| `303610109049230`  
``| UNIX timestamp indicating when the customer successfully completed the Embedded Signup flow.| `1690592557`  
  
### partner_solutions

When a Multi-Partner Solution is created or modified, a **partner_solutions** webhook describing the change will be triggered.
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "value": {  
                "event": "SOLUTION_CREATED",  
                "solution_id": "",  
                "solution_status": "INITIATED"  
              },  
              "field": "partner_solutions"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

#### Payload Properties

  

Placeholder |  Description |  Example   
---|---|---  
``| Your business portfolio ID.| `506914307656634`  
``| Event description. Values can be:

  * `SOLUTION_CREATED` — Solution created.
  * `SOLUTION_UPDATED` — The `solution_status` has changed.

| `SOLUTION_CREATED`  
``| Solution ID.| `774485461512159`  
``| Solution status. Values can be:

  * `ACTIVE` — The solution partner has accepted the solution request and it can be used with Embedded Signup.
  * `DEACTIVATED` — The solution has been deactivated and cannot be used with Embedded Signup to onboard business customers.
  * `DRAFT` — Solution has been drafted but invitation has not been sent to the solution partner.
  * `INITIATED` — The solution partner has been invited to accept the solution, but has yet to accept or reject the request.
  * `PENDING` — The solution partner has yet to accept or reject the solution request.
  * `PENDING_DEACTIVATION` — The solution owner requested for an active solution to be deactivated but the solution partner has yet to accept the deactivation request.
  * `REJECTED` — The solution partner has rejected the solution request.

| `INITIATED`  
``| UNIX timestamp indicating when the customer successfully completed the Embedded Signup flow.| `1718143652`  
  
## Editing or Deactivating Solutions

You can use the App Dashboard or API to edit or deactivate a solution.

When you request deactivation, the solution’s status will change to **Pending deactivation** and your partner will be notified by email and Meta Business Suite notification. In addition, a **partner_solutions** webhook will be triggered with `event` set to `SOLUTION_UPDATED` and `solution_status` set to `PENDING_DEACTIVATION`. Your partner can then accept or reject your request.

Note that partner solutions can still be used to onboard customers until your partner accepts the deactivation request.

If the deactivation request is rejected, the solution will remain in an **Active** state and can continue to be used to onboard customers.

If the deactivation request is accepted, the solution status will be set to **Deactivated** and can no longer be used to onboard business customers, so make sure that neither you nor your partner are surfacing it to business customers.

### Limitations

  * You can only edit solutions that were created by you.
  * You can request deactivation of any solutions that you create which are in an **Active** state.

### Via App Dashboard

Use the **App Dashboard** > **WhatsApp** > **Partner solutions** panel to edit or deactivate a solution. Note that you can only edit solutions that were initiated by you.

State |  Permitted actions   
---|---  
**Active**|  You may edit the solution name, or deactivate the solution.  
**Deactivated**|  Solutions in this state cannot be edited.  
**Draft**|  You may edit the solution name.  
**Inactive**|  You may edit the solution name.  
**Pending**|  Solutions in this state cannot be edited until accepted or declined by your partner.  
**Pending deactivation**|  You may accept or decline the partner’s deactivation request.  
  
### Via API

### Send deactivation request

Use the [**POST / /send_deactivation_request**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/send-deactivation-request-api) endpoint to send a solution deactivation request. You must be the solution owner in order to send this request.

#### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v20.0/795033096057724/send_deactivation_request \  
    -H 'Authorization: Bearer EAAAT...'  
      
    

#### Example response

Upon success:
    
    
    {  
        "success": true  
    }  
      
    

### Accept deactivation request

Use the [**POST / /accept_deactivation_request**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/accept-deactivation-request-api#Updating) endpoint to accept a solution deactivation request. You must be the solution owner in order to send this request.

#### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v20.0/795033096057724/accept_deactivation_request \  
    -H 'Authorization: Bearer EAAAT...'  
      
    

#### Example response

Upon success:
    
    
    {  
        "success": true  
    }  
      
    

### Reject deactivation request

Use the [**POST / /reject_deactivation_request**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/reject-deactivation-request-api#Updating) endpoint to reject a solution deactivation request. You must be the solution owner in order to send this request.

#### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v20.0/795033096057724/reject_deactivation_request \  
    -H 'Authorization: Bearer EAAAT...'  
      
    

#### Example response

Upon success:
    
    
    {  
        "success": true  
    }  
      
    

## Manually Checking for Onboarded Customers

As a fallback in case of webhook problems, you can manually check for onboarded customers using the [**GET / /client_whatsapp_business_accounts**](/docs/marketing-api/reference/business/client_whatsapp_business_accounts#Reading) endpoint, which returns WABA IDs of all customers newly onboarded via the solution.

### Request Syntax
    
    
    GET //client_whatsapp_business_accounts
      ?filtering=[
        {
          "field":"partners",
          "operator":"ALL",
          "value":[
            ""
          ]
        }
      ]

Replace `` with your partner’s business portfolio ID.

### Response
    
    
    {  
      "data": [  
        {  
          "id": "",  
          "name": "",  
          "timezone_id": "",  
          "business_type": "ent",  
          "message_template_namespace": ""  
        },  
        ...  
      ],  
      "paging": {  
        "cursors": {  
          "before": "",  
          "after": ""  
        },  
        "next": ""  
      }  
    }  
      
    

Placeholder |  Description |  Example Value   
---|---|---  
``| Customer WhatsApp Business Account ID.| `102290129340398`  
``| Customer WhatsApp Business Account name.| `Cool New Customer 2`  
``| Customer WhatsApp Business Account timezone ID.| `7`  
``| Paginated results cursor. See [Paginated Results](/docs/graph-api/results).| `QVFIU...`  
``| Paginated results cursor. See [Paginated Results](/docs/graph-api/results).| `QVFIU...`  
``| Paginated results link. See [Paginated Results](/docs/graph-api/results).| `https://graph.facebook.com/v18.0/50691...`  
  
### Example Request
    
    
    curl -g 'https://graph.facebook.com/v25.0/506914307656634/client_whatsapp_business_accounts?filtering=[{%22field%22%3A%22partners%22%2C%20%22operator%22%3A%20%22ALL%22%2C%20%22value%22%3A%20[%22520744086200222%22]}]' \
    -H 'Authorization: Bearer EAAJB...'

### Example Response
    
    
    {
      "data": [
        {
          "id": "102290129340398",
          "name": "Cool New Customer 2",
          "timezone_id": "7",
          "business_type": "ent",
          "message_template_namespace": ""
        },
        {
          "id": "112077945305052",
          "name": "Cool New Customer 1",
          "timezone_id": "7",
          "business_type": "ent",
          "message_template_namespace": ""
        },
        ...
      ],
      "paging": {
        "cursors": {
          "before": "QVFIU...",
          "after": "QVFIU..."
        },
        "next": "https://graph.facebook.com/v25.0/50691..."
      }
    }

## Getting Solution Data

### Get fields on a solution

Use the [**GET / **](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/solution-details-api#get-version-solution-id) endpoint to get default fields on a solution, or use the `fields` query string parameter to request specific fields.

#### Example Request
    
    
    curl 'https://graph.facebook.com/v25.0/17602267745700?fields=name,status,partners' \
    -H 'Authorization: Bearer EAAAT...'

#### Example Response
    
    
    {  
      "name": "Social OVD with Lucky Shrub",  
      "status": "ACTIVE",  
      "partners": {  
        "data": [  
          {  
            "partner_app": {  
              "link": "https://www.socialoverdrive.com/",  
              "name": "Social Overdrive",  
              "id": "637576208107267"  
            },  
            "status": "ACCEPTED",  
            "id": "17602267745704"  
          }  
        ],  
        "paging": {  
          "cursors": {  
            "before": "QVFIUmxnSE9LUFliNzlUTWdhTlYzQjBtekprSC0wQUdoZAGRYbFlzeUpDMG9yNkF1OHYyel9tcUlBbGhFckxJQ1Y3UFZA4dUkycEk0WDJwRGYzT2JYbVhEdFdB",  
            "after": "QVFIUmxnSE9LUFliNzlUTWdhTlYzQjBtekprSC0wQUdoZAGRYbFlzeUpDMG9yNkF1OHYyel9tcUlBbGhFckxJQ1Y3UFZA4dUkycEk0WDJwRGYzT2JYbVhEdFdB"  
          }  
        }  
      },  
      "id": "17602267745700"  
    }  
      
    

### Get solutions associated with your app

Use the [**GET / /whatsapp_business_solutions**](/docs/graph-api/reference/application/whatsapp_business_solutions#Reading) endpoint to get a list of solutions your app is associated with.

#### Example Request
    
    
    curl 'https://graph.facebook.com/v25.0/21202248997039/whatsapp_business_solutions' \
    -H 'Authorization: Bearer EAAAT...'

#### Example Response
    
    
    {  
      "data": [  
        {  
          "name": "Social OVD with Lucky Shrub",  
          "status": "INITIATED",  
          "status_for_pending_request": "PENDING_ACTIVATION",  
          "id": "19702253086782"  
        },  
        {  
          "name": "Social OVD with Social Brew",  
          "status": "ACTIVE",  
          "status_for_pending_request": "NONE",  
          "id": "17602267745700"  
        }  
      ],  
      "paging": {  
        "cursors": {  
          "before": "QVFIUkxlbkhTZA1VleGwyWHd3SmlSMnlnelhlbUVSSjVYQmU2aXVmb1YyWk9JTkx3b2gwNE9FS3J2ejMzNENxbmh1bWZAqSkZAJUzNfbmF4NmtPaFYxQldaaXR3",  
          "after": "QVFIUlgyLTlQYWV0eTNGWXVhcTJnOEhzY1lvUDloVV8wUUxVQk9YMVJ5UGlBZAmx1Q1BjaEVwd0tWdmNvRU9jdGRiNnlrc193alRNaDV2SXZAfN1kybDBibEFR"  
        }  
      }  
    }  
      
    

### Get solutions that onboarded a WABA

Use the [**GET / /solutions**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/whatsapp-business-account-solutions-list-api#Reading) endpoint to get a list of solutions that onboarded a specific WABA.

#### Example Request
    
    
    curl 'https://graph.facebook.com/v25.0/102290129340398/solutions' \
    -H 'Authorization: Bearer EAAAT...'

#### Example Response
    
    
    {  
      "data": [  
        {  
          "name": "Social OVD with Social Brew",  
          "status": "ACTIVE",  
          "status_for_pending_request": "NONE",  
          "id": "17602267745700"  
        }  
      ],  
      "paging": {  
        "cursors": {  
          "before": "QVFIUjZACTFNmWURVTHN2NFVaM2ZApd2RaOGIxOU5wenpQZADFkbVdtSEJDSGFDelhDOU5hT28xcmJLS05TM3U0UUFmdVNGUWFfdjdJb1o2OTVNY083ZAHYtc2x3",  
          "after": "QVFIUjZACTFNmWURVTHN2NFVaM2ZApd2RaOGIxOU5wenpQZADFkbVdtSEJDSGFDelhDOU5hT28xcmJLS05TM3U0UUFmdVNGUWFfdjdJb1o2OTVNY083ZAHYtc2x3"  
        }  
      }  
    }  
      
    

### Get partners of a solution

Use the [**GET / /partners**](/docs/graph-api/reference/whats-app-business-solution/partners#Reading) endpoint to get a list of partners of a solution.

#### Example Request
    
    
    curl 'https://graph.facebook.com/v25.0/17602267745700/partners' \
    -H 'Authorization: Bearer EAAAT...'

#### Example Response
    
    
    {  
      "data": [  
        {  
          "partner_app": {  
            "link": "https://www.socialoverdrive.com",  
            "name": "Social Overdrive",  
            "id": "637576208107267"  
          },  
          "status": "ACCEPTED",  
          "id": "17602267745704"  
        }  
      ],  
      "paging": {  
        "cursors": {  
          "before": "QVFIUmxnSE9LUFliNzlUTWdhTlYzQjBtekprSC0wQUdoZAGRYbFlzeUpDMG9yNkF1OHYyel9tcUlBbGhFckxJQ1Y3UFZA4dUkycEk0WDJwRGYzT2JYbVhEdFdB",  
          "after": "QVFIUmxnSE9LUFliNzlUTWdhTlYzQjBtekprSC0wQUdoZAGRYbFlzeUpDMG9yNkF1OHYyel9tcUlBbGhFckxJQ1Y3UFZA4dUkycEk0WDJwRGYzT2JYbVhEdFdB"  
        }  
      }  
    }  
      
    

## Getting customer business tokens

If you are not hosting Embedded Signup but want to get an onboarded business customer’s [business integration system user access token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens) (“business token”), you can get their token using the business portfolio ID and solution ID contained in the account_update webhook that was triggered when the customer completed the Embedded Signup flow.

### Request

Use the [GET //access_token](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/access-token-api#Reading) endpoint and request the `business_id` parameter to get an onboarded business customer’s [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).
    
    
    curl 'https://graph.facebook.com///access_token?business_id=' \  
    -H 'Authorization: Bearer '  
      
    

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Optional.** Graph API version.| v25.0  
``| **Required.** The onboarded business customer’s business portfolio ID.This is included in [account_update webhooks](/documentation/business-messaging/whatsapp/solution-providers/manage-webhooks#onboarded-business-customer) when the business customer completes Embedded Signup.| `2729063490586005`  
``| **Required.** Your Multi-Partner Solution ID.| `303610109049230`  
``| **Required.** Your [system user access token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
  
### Response

Upon success:
    
    
    {  
      "data": [  
        {  
          "access_token": ""  
        }  
      ]  
    }  
      
    

## Migrating business customer assets among solutions

You have several options for migrating business customer assets to and from Multi-Partner Solutions. See [Migrating business customer assets](/documentation/business-messaging/whatsapp/solution-providers/support#migrating-business-customer-assets).

Did you find this page helpful?

ON THIS PAGE

Requirements

Creating Multi-Partner Solutions

Solution States

Onboarding Limits

Embedded Signup

Billing

Step 1: Determine Solution Details

Step 2: Subscribe to Webhooks

Step 3: Create a Solution

Step 4: Accept The Solution Request

Via App Dashboard

Via API

Example request

Example response

Example accept request

Example reject request

Example response

Step 5: Configure Embedded Signup

Step 6: Listen for Onboarded Business Customers

Step 7: Share Your Credit Line (Solution Partners only)

Webhooks

account_update

Payload Properties

partner_solutions

Payload Properties

Editing or Deactivating Solutions

Limitations

Via App Dashboard

Via API

Send deactivation request

Example request

Example response

Accept deactivation request

Example request

Example response

Reject deactivation request

Example request

Example response

Manually Checking for Onboarded Customers

Request Syntax

Response

Example Request

Example Response

Getting Solution Data

Get fields on a solution

Example Request

Example Response

Get solutions associated with your app

Example Request

Example Response

Get solutions that onboarded a WABA

Example Request

Example Response

Get partners of a solution

Example Request

Example Response

Getting customer business tokens

Request

Request parameters

Response

Migrating business customer assets among solutions

* * *