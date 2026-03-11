# Authentication templates

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates

---

# Authentication templates

Updated: Nov 14, 2025

If your mobile app offers users the option to receive one-time passwords or verification codes via WhatsApp, you must use an authentication template.

Authentication templates consist of:

  * Fixed, non-customizable **preset text** : _ is your verification code._
  * An optional **security disclaimer** : _For your security, do not share this code._
  * An optional **expiration warning** : _This code expires in  minutes._
  * Either a **one-tap autofill** button, a **copy code** button, or no button at all if using zero-tap.

One-tap autofill buttons are the preferred solution as they offer the best user experience. However, one-tap autofill buttons are currently only supported on Android and require additional changes to your app’s code.

## Linked device security

Authentication templates now feature linked device security. This means that authentication messages are only delivered to a user’s primary WhatsApp device.

Authentication messages that are sent to a user’s linked devices are masked with a prompt instructing the user to view the message on their primary device.

This feature is enabled by default and does not require code changes. It cannot be configured or customized. Only available on Cloud API.

## One-tap autofill authentication templates

Authentication templates include a one-tap autofill button.

When a WhatsApp user taps the autofill button, the WhatsApp client triggers an activity which opens your app and delivers it the password or code.

See [One-Tap Autofill Authentication Templates](/documentation/business-messaging/whatsapp/templates/authentication-templates/autofill-button-authentication-templates) to learn how to use them.

## Copy code authentication templates

Copy code authentication templates allow you to send a one-time password or code along with a copy code button to your users.

When a WhatsApp user taps the copy code button, the WhatsApp client copies the password or code to the device’s clipboard. The user can then switch to your app and paste the password or code into your app.

See [Copy Code Authentication Templates](/documentation/business-messaging/whatsapp/templates/authentication-templates/copy-code-button-authentication-templates) to learn how to use them.

## Zero-tap authentication templates

Zero-tap authentication templates allow your users to receive one-time passwords or codes via WhatsApp without having to leave your app.

When a user in your app requests a password or code and you deliver it using a zero-tap authentication template, the WhatsApp client broadcasts the included password or code, which your app can then capture with a broadcast receiver.

See [Zero-Tap Authentication Templates](/documentation/business-messaging/whatsapp/templates/authentication-templates/zero-tap-authentication-templates) to learn how to use them.

## Best practices

  * Confirm the user’s WhatsApp phone number before sending the one-time password or code to that number.
  * Make it clear to your user that the password or code will be delivered to their WhatsApp phone number, especially if you offer multiple ways for the user to receive password or code delivery. See [Getting Opt-In](/documentation/business-messaging/whatsapp/getting-opt-in) for additional tips.
  * When the user pastes the password or code into your app, or your app receives it as part of the one-tap autofill button flow, make it clear to the user that your app has captured it.

See also [Best practices for authenticating users via WhatsApp](/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-best-practices).

## Customizing time-to-live

See [Time-to-live](/documentation/business-messaging/whatsapp/templates/time-to-live).

## Template previews

You can generate previews of authentication template text in various languages that include or exclude the security recommendation string and code expiration string using the [**GET / /message_template_previews**](/docs/graph-api/reference/whats-app-business-account/message_template_previews#Reading) endpoint.

### Request syntax
    
    
    GET //message_template_previews
      ?category=AUTHENTICATION,
      &language=, // Optional
      &add_security_recommendation=, // Optional
      &code_expiration_minutes=, // Optional
      &button_types= // Optional

### Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_Comma-separated list_| **Optional.**  
Comma-separated list of [language codes](/documentation/business-messaging/whatsapp/templates/supported-languages) of language versions you want returned.  
If omitted, versions of all supported languages will be returned.| `en_US,es_ES`  
``_Boolean_| **Optional.**  
Set to `true` if you want the security recommendation body string included in the response.  
If omitted, the security recommendation string will not be included.| `true`  
``_Int64_| **Optional.**  
Set to an integer if you want the code expiration footer string included in the response.  
If omitted, the code expiration footer string will not be included.  
Value indicates number of minutes until code expires.Minimum `1`, maximum `90`.| `10`  
``_Comma-separated list of strings_| **Required.**  
Comma-separated list of strings indicating button type.  
If included, the response will include the button text for each button in the response.  
For authentication templates, this value must be `OTP`.| `OTP`  
  
### Example request
    
    
    curl 'https://graph.facebook.com/v17.0/102290129340398/message_template_previews?category=AUTHENTICATION&languages=en_US,es_ES&add_security_recommendation=true&code_expiration_minutes=10&button_types=OTP' \  
    -H 'Authorization: Bearer EAAJB...'  
      
    

### Example response
    
    
    {  
      "data": [  
        {  
          "body": "*{{1}}* is your verification code. For your security, do not share this code.",  
          "buttons": [  
            {  
              "autofill_text": "Autofill",  
              "text": "Copy code"  
            }  
          ],  
          "footer": "This code expires in 10 minutes.",  
          "language": "en_US"  
        },  
        {  
          "body": "Tu código de verificación es *{{1}}*. Por tu seguridad, no lo compartas.",  
          "buttons": [  
            {  
              "autofill_text": "Autocompletar",  
              "text": "Copiar código"  
            }  
          ],  
          "footer": "Este código caduca en 10 minutos.",  
          "language": "es_ES"  
        }  
      ]  
    }  
      
    

## Bulk management

Use the [**POST / /upsert_message_templates**](/docs/graph-api/reference/whats-app-business-account/upsert_message_templates#Creating) endpoint to bulk update or create authentication templates in multiple languages that include or exclude the optional security and expiration warnings.

If a template already exists with a matching name and language, the template will be updated with the contents of the request, otherwise, a new template will be created.

### Request syntax
    
    
    POST //upsert_message_templates

### Post Body
    
    
    {  
      "name": "",  
      "languages": [],  
      "category": "AUTHENTICATION",  
      "components": [  
        {  
          "type": "BODY",  
          "add_security_recommendation":  // Optional  
        },  
        {  
          "type": "FOOTER",  
          "code_expiration_minutes":  // Optional  
        },  
        {  
          "type": "BUTTONS",  
          "buttons": [  
            {  
              "type": "OTP",  
              "otp_type": "",  
              "supported_apps": [  
                {  
                  "package_name": "", // One-tap and zero-tap buttons only  
                  "signature_hash": "" // One-tap and zero-tap buttons only  
                }  
              ]  
            }  
          ]  
        }  
      ]  
    }  
      
    

### Properties

All template creation properties are supported, with these exceptions:

  * The `language` property is not supported. Instead, use `languages` and set its value to an array of [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages) strings. For example: `["en_US","es_ES","fr"]`.
  * The `text` property is not supported.
  * The `autofill_text` property is not supported.

### Example copy code request

This example creates three authentication templates in English, Spanish, and French, with copy code buttons. Each template is named “authentication_code_copy_code_button” and includes the security recommendation and expiration time.
    
    
    curl 'https://graph.facebook.com/v17.0/102290129340398/upsert_message_templates' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "name": "authentication_code_copy_code_button",  
      "languages": ["en_US","es_ES","fr"],  
      "category": "AUTHENTICATION",  
      "components": [  
        {  
          "type": "BODY",  
          "add_security_recommendation": true  
        },  
        {  
          "type": "FOOTER",  
          "code_expiration_minutes": 10  
        },  
        {  
          "type": "BUTTONS",  
          "buttons": [  
            {  
              "type": "OTP",  
              "otp_type": "COPY_CODE"  
            }  
          ]  
        }  
      ]  
    }'  
      
    

### Example one-tap autofill request

This example (1) updates an existing template with the name “authentication_code_autofill_button” and language “en_US”, and (2) creates two new authentication templates in Spanish and French with one-tap autofill buttons. Both newly created templates are named “authentication_code_autofill_button” and include the security recommendation and expiration time.
    
    
    curl 'https://graph.facebook.com/v17.0/102290129340398/upsert_message_templates' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "name": "authentication_code_autofill_button",  
      "languages": ["en_US","es_ES","fr"],  
      "category": "AUTHENTICATION",  
      "components": [  
        {  
          "type": "BODY",  
          "add_security_recommendation": true  
        },  
        {  
          "type": "FOOTER",  
          "code_expiration_minutes": 15  
        },  
        {  
          "type": "BUTTONS",  
          "buttons": [  
            {  
              "type": "OTP",  
              "otp_type": "ONE_TAP",  
              "supported_apps": [  
                {  
                  "package_name": "com.example.luckyshrub",  
                  "signature_hash": "K8a/AINcGX7"  
                }  
              ]  
            }  
          ]  
        }  
      ]  
    }'  
      
    

### Example response
    
    
    {  
      "data": [  
        {  
          "id": "954638012257287",  
          "status": "APPROVED",  
          "language": "en_US"  
        },  
        {  
          "id": "969725527415202",  
          "status": "APPROVED",  
          "language": "es_ES"  
        },  
        {  
          "id": "969725530748535",  
          "status": "APPROVED",  
          "language": "fr"  
        }  
      ]  
    }  
      
    

## Sample app

See our [WhatsApp One-Time Password (OTP) Sample App⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FWhatsApp%2FWhatsApp-OTP-Sample-App&h=AT6iB5QeSeAW70aBrpJdcAmEZo-7sMKy-KpxFLQL_NzC3lTNB5dYN5SVDjeLPdVJUOnWDqii7Repscmnn6-1bc7gvJLjMuZAkIYPYQ7Qlbf2DhJylcwD3lDyshCxdyBAPS0weypP79_PIa_f8BHOTg) for Android on Github. The sample app demonstrates how to send and receive OTP passwords and codes via the API, how to integrate the one-tap autofill and copy code buttons, how to create a template, and how to spin up a sample server.

## Learn more

  * [Official Business Account](/documentation/business-messaging/whatsapp/official-business-accounts) — You may wish to request Official Business Account status to build trust with your users, which will reduce the likelihood that they dismiss or ignore your messages.
  * [Status messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks — We recommend that you subscribe to the messages webhook field so you can be notified when a user receives and reads your authentication template with an OTP button.

Did you find this page helpful?

ON THIS PAGE

Linked device security

One-tap autofill authentication templates

Copy code authentication templates

Zero-tap authentication templates

Best practices

Customizing time-to-live

Template previews

Request syntax

Request parameters

Example request

Example response

Bulk management

Request syntax

Post Body

Properties

Example copy code request

Example one-tap autofill request

Example response

Sample app

Learn more

* * *