# Create a webhook endpoint

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint

---

# Create a webhook endpoint

Updated: Nov 7, 2025

Learn about webhook requests and responses so you can set up and configure your own webhook endpoint on a public server.

Before you can use your app in a production capacity, you must create and configure your own webhook endpoint on a public server that can accept and respond to GET and POST requests, and that can validate and capture webhook payloads.

## TLS/SSL

Your webhook endpoint server must have a valid TLS or SSL digital security certificate, correctly configured and installed. Self-signed certificates are not supported.

## mTLS

Webhooks support mutual TLS (mTLS) for added security. See Graph API’s [mTLS for webhooks](/docs/graph-api/webhooks/getting-started#mtls-for-webhooks) document to learn how to enable and use mTLS.

Note that enabling and disabling mTLS is not supported at the WABA or business phone number level. If you have more than one application accessing the platform, you will need to enable mTLS for each application.

## GET requests

GET requests are used to verify your webhook endpoint. Anytime you set or edit the **Callback URL** field or the **Verify token** field in the App Dashboard, Meta will send a GET request to your webhook endpoint. You must validate and respond to this request.

### Request syntax
    
    
    GET   
      ?hub.mode=subscribe  
      &hub.challenge=  
      &hub.verify_token=  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| Your webhook endpoint URL.Add this URL to the **Callback URL** field in the App Dashboard when you configure webhooks later.| `https://www.luckyshrub.com/webhooks`  
``| A random string that Meta will generate.| `1158201444`  
``| A verification string of your own choosing. Store this string on your server.Add this string to the **Verify token** field in the App Dashboard when you configure webhooks later.| `vibecoding`  
  
### Validation

To validate GET requests, compare the `hub.verify_token` value in the request to the verification string you have stored on your server. If the values match, the request is valid, otherwise it is invalid.

### Response

If the request is valid, respond with HTTP status `200` and the `hub.challenge` value. If the request is invalid, respond with a 400-level HTTP status code, or anything other than status `200`.

When you configure webhooks, Meta will send a GET request to your webhook endpoint. If it returns status `200` and the `hub.challenge` value included in the request, Meta will consider your webhook endpoint verified, and begin sending you webhooks. If your webhook endpoint responds with anything else, however, Meta will consider your webhook endpoint unverified, and webhooks will not be sent to your endpoint.

## POST requests

Anytime a webhook event is triggered for any webhook fields you are subscribed to, a POST request will be sent to your webhook endpoint, containing a JSON payload describing the event.

### Request syntax
    
    
    POST   
    Content-Type: application/json  
    X-Hub-Signature-256: sha256=  
    Content-Length:   
      
      
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| Your webhook endpoint URL.| `https://www.luckyshrub.com/webhooks`  
``| Content length in bytes.| `492`  
``| Post body payload, formatted using JSON.| See [Fields](/documentation/business-messaging/whatsapp/webhooks/overview#fields) references for example payloads.  
``| HMAC-SHA256 hash, calculated using the post body payload and your [app secret](/docs/development/create-an-app/app-dashboard/basic-settings#app-secret) as the secret key.| `b63bb356dff0f1c24379efea2d6ef0b2e2040853339d1bcf13f9018790b1f7d2`  
  
### Validation

To validate the request:

Generate an HMAC-SHA256 hash using the JSON payload as the message input and your [app secret](/docs/development/create-an-app/app-dashboard/basic-settings#app-secret) as the secret key. Compare your generated hash to the hash assigned to the `X-Hub-Signature-256` header (everything after `sha256=`).

If the hashes match, the payload is valid. Capture the payload and digest its contents according to business needs. If they do not match, consider the payload invalid.

Note that we do not offer APIs for fetching historical webhook data, so capture and store webhook payload accordingly.

### Response

If the request is valid, respond with HTTP status 200. Otherwise, respond with a 400-level HTTP status, or anything other than status 200.

### Batching

POST requests are aggregated and sent in a batch with a maximum of 1000 updates. However batching cannot be guaranteed so be sure to adjust your servers to handle each POST request individually.

If any POST request sent to your server fails, we will retry immediately, then try a few more times with decreasing frequency over the next 36 hours. Your server should handle deduplication in these cases.

Unacknowledged responses will be dropped after 36 hours.

## Configure webhooks

Once you have created your webhook endpoint, navigate to the **[App Dashboard](/apps)** > **WhatsApp** > **Configuration** panel, and add your webhook endpoint URL to the **Callback URL** field, and your verification string to **Verify token** field.

Note that if you created your app using the **Connect with customers through WhatsApp** use case, navigate to **[App Dashboard](/apps)** > **Use cases** > **Customize** > **Configuration** instead.

If your webhook endpoint is responding to webhook verification GET requests properly, the panel will save your changes, and a list of fields you can subscribe to will appear. You can then [subscribe to any fields](/documentation/business-messaging/whatsapp/webhooks/overview#fields) that fulfill your business needs.

Note that you can use the [POST Application Subscriptions](/docs/graph-api/reference/v24.0/app/subscriptions#creating) endpoint to configure webhooks as an alternative method, but it requires the use of an [app token](/docs/facebook-login/guides/access-tokens#apptokens). See Graph API’s [Subscriptions edge](/docs/graph-api/webhooks/subscriptions-edge) document to learn how to do this, and use whatsapp_business_account as the object value.

Did you find this page helpful?

ON THIS PAGE

TLS/SSL

mTLS

GET requests

Request syntax

Request parameters

Validation

Response

POST requests

Request syntax

Request parameters

Validation

Response

Batching

Configure webhooks

* * *