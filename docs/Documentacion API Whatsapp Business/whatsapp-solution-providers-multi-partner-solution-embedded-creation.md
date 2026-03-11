# Multi-Partner Solution — Embedded creation

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solution-embedded-creation

---

# Multi-Partner Solution — Embedded creation

Updated: Dec 12, 2025

[Multi-Partner Solutions](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions) (MPS) allow Solution Partners and Tech Providers to jointly manage customer WhatsApp assets in order to provide WhatsApp messaging services to customers.

If you are a Solution Partner, instead of using the app dashboard to create an MPS, you can create one using a snippet of JavaScript and an HTML button which you can embed somewhere on your website. Tech Providers who want to partner with you can use the button to grant your app permission to manage solutions for one or more of their apps, which you can then do using a series of API requests.

## Flow

Tech Providers who visit your website and click the embedded solution creation button will be asked to authenticate, and after doing so, will be presented with an interface that allows them to choose an existing app:

After choosing an app, they can review and confirm that they will be granting your app permission to manage their app’s Multi-Partner Solutions.

Once the Tech Provider dismisses the interface, a user access token will be generated and returned to flow, where you can capture it. You can then use the token in a series of API calls to get Tech Provider’s chosen app ID(s) and create and accept a solution.

## Requirements

  * Facebook Login for Business must be [configured on your app](/documentation/business-messaging/whatsapp/embedded-signup/implementation#step-2--create-a-facebook-login-for-business-configuration), with **Valid Oauth Redirect URIs** and **Allowed Domains for the JavasScript SDK** set. You should already have set these values when configuring Embedded Signup.
  * Your app must undergo App Review and be approved for advanced access for the **manage_app_solution** permission.

## Embedded creation button

### Step 1: Grant permission to app

Access the Meta Business Suite and use your system user to grant your app the **manage_app_solution** permission.

  1. Log into [business.facebook.com⁠](https://business.facebook.com).
  2. Use the business portfolio dropdown menu on the left to locate your business portfolio and click the gear icon (for settings).
  3. Navigate to **Users** > **System Users**.
  4. Click the system user who has business asset access on your app and WhatsApp Business Account.
  5. Click the **Generate token** button.
  6. Select your app.
  7. Set an expiration date for the token.
  8. Select the **manage_app_solution** permission.
  9. Generate a token.

Use this token when accepting any Multi-Partner Solutions you create for your partners (see below).

### Step 2: Add embedded button code

Add the following code to your website or portal, or wherever you plan on directing Tech Providers who will be working with you as part of an MPS. Be sure to replace `` with your app ID.
    
    
    
    
    
    
      // Configure JavaScript SDK
      window.fbAsyncInit = function() {
        FB.init({
          appId: "", // Replace with your app ID
          cookie: true,
          xfbml: true,
          version: "v20.0"
        });
      };
    
      // Launch MPS creation flow
      function launchSolutionCreationFlow() {
        FB.login(
          function (response) {
            if (response.authResponse) {
              const accessToken = response.authResponse.accessToken;
              console.log(accessToken); // Replace with your code that captures access token
            } else {
              console.log("User failed to authorize"); // Replace with your code that logs auth failure
            }
          },
          {
            scope: "manage_app_solution"
          }
        );
      }
    
    
    Launch Solution Creation

Direct prospective Tech Provider partners to this location and instruct them to complete the flow. Let them know that completing the flow does not create the solution (it requires some API calls on your part) and that you’ll provide them with the solution ID once it has been created.

## Solution creation

### Step 1: Capture user token

Anytime a Tech Provider uses the embedded solution creation button and completes the flow, the flow returns an `authResponse` object (`response.authResponse`) that has an `accessToken` property:
    
    
    {  
      status: 'connected',  
      authResponse: {  
        accessToken: '',  
        expiresIn:'',  
        reauthorize_required_in:'',  
        signedRequest:'',  
        userID:''  
      }  
    }  
      
    

Capture the `accessToken` property value. This is the Tech Provider’s user access token, which you will need next.

### Step 2: Get app details

Use the Tech Provider’s user access token and the **[GET /me/assigned_applications](/docs/graph-api/reference/user/assigned_applications)** endpoint to get a list of app IDs that the Tech Provider selected when they completed the flow.

#### Example request
    
    
    curl 'https://graph.facebook.com/v20.0/me/application_details' \  
    -H 'Authorization: Bearer EAAJB'  
      
    

#### Example response

Example response of a Tech Provider who selected a single app in the flow.
    
    
    {  
      "data": [  
        {  
          "link": "www.mediamonsoon.com",  
          "name": "media_monsoon_prod",  
          "id": "634974688087057"  
        }  
      ]  
    }  
      
    

Each object in the response describes an app the Tech Provider selected when completing the flow. Capture the `id` property value of each app for the next step.

### Step 3: Create a solution for Tech Provider

Use the Tech Provider’s access token and an app ID from the previous step to make a request to the **[POST //whatsapp_business_solution](/documentation/business-messaging/whatsapp/reference/application/solution-creation-api#Creating)** endpoint.

Repeat this request for each app ID returned in the previous step.

#### Request Syntax
    
    
    POST //whatsapp_business_solution
    
    
    {  
      "owner_permissions": ["MESSAGING"],  
      "partner_app_id": "",  
      "partner_permissions": ["MESSAGING"],  
      "solution_name": ""  
    }  
      
    

  * `` — Your app ID.
  * `` — Name to give the solution. This name will appear in the App Dashboard for both you and the Tech Provider, so the name should be unique and distinguishable from other solutions you or the Tech Provider may later initiate or accept.

#### Response

Upon success, the API will create a solution and associate your app and the Tech Provider’s app to it.
    
    
    {  
      "solution_id": ""  
    }  
      
    

Capture the `solution_id` value. This is the solution ID, which you will need in the next step.

### Step 4: Accept the solution

Use your system user access token from the Grant Permission to App step and the solution ID to make a request to the **[POST //accept](/documentation/business-messaging/whatsapp/reference/whatsapp-business-solution/solution-accept-api#Creating)** endpoint for any solutions you have created for Tech Providers.

#### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v20.0/795033096057724/accept' \  
    -H 'Authorization: Bearer EAAAT...  
      
    

#### Example response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

Once you have accepted the solution, inform the Tech Partner that the solution has been created successfully, and provide them with any solution IDs you have created and accepted.

Did you find this page helpful?

ON THIS PAGE

Flow

Requirements

Embedded creation button

Step 1: Grant permission to app

Step 2: Add embedded button code

Solution creation

Step 1: Capture user token

Step 2: Get app details

Example request

Example response

Step 3: Create a solution for Tech Provider

Request Syntax

Response

Step 4: Accept the solution

Example request

Example response

* * *