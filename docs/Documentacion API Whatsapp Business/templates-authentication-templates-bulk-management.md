# Bulk management

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/bulk-management

---

# Bulk management

Updated: Nov 10, 2025

Use the [POST //upsert_message_templates](/docs/graph-api/reference/whats-app-business-account/upsert_message_templates#Creating) endpoint to bulk update or create authentication templates in multiple languages that include or exclude the optional security and expiration warnings.

If a template already exists with a matching name and language, the template will be updated with the contents of the request, otherwise, a new template will be created.

### Request syntax
    
    
    POST //upsert_message_templates  
      
    

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

All [template creation properties](/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates#properties) are supported, with these exceptions:

  * The `language` property is not supported. Instead, use `languages` and set its value to an array of [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages) strings. For example: `["en_US","es_ES","fr"]`.
  * The `text` property is not supported.
  * The `autofill_text` property is not supported.

### Example copy code request

This example creates three authentication templates in English, Spanish, and French, with copy code buttons. Each template is named “authentication_code_copy_code_button” and includes the security recommendation and expiration time.
    
    
    curl 'https://graph.facebook.com/v25.0/102290129340398/upsert_message_templates' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "name": "authentication_code_copy_code_button",
      "languages": ["en_US","es_ES","fr"],
      "category": "AUTHENTICATION",
      "components": [
        {
          "type": "BODY",
          "add_security_recommendation": true
        },
        {
          "type": "FOOTER",
          "code_expiration_minutes": 10
        },
        {
          "type": "BUTTONS",
          "buttons": [
            {
              "type": "OTP",
              "otp_type": "COPY_CODE"
            }
          ]
        }
      ]
    }'

### Example one-tap autofill request

This example (1) updates an existing template with the name “authentication_code_autofill_button” and language “en_US”, and (2) creates two new authentication templates in Spanish and French with one-tap autofill buttons. Both newly created templates are named “authentication_code_autofill_button” and include the security recommendation and expiration time.
    
    
    curl 'https://graph.facebook.com/v25.0/102290129340398/upsert_message_templates' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "name": "authentication_code_autofill_button",
      "languages": ["en_US","es_ES","fr"],
      "category": "AUTHENTICATION",
      "components": [
        {
          "type": "BODY",
          "add_security_recommendation": true
        },
        {
          "type": "FOOTER",
          "code_expiration_minutes": 15
        },
        {
          "type": "BUTTONS",
          "buttons": [
            {
              "type": "OTP",
              "otp_type": "ONE_TAP",
              "supported_apps": [
                {
                  "package_name": "com.example.luckyshrub",
                  "signature_hash": "K8a/AINcGX7"
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
      
    

Did you find this page helpful?

ON THIS PAGE

Request syntax

Post Body

Properties

Example copy code request

Example one-tap autofill request

Example response

* * *