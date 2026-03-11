# Template previews

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/template-preview

---

# Template previews

Updated: Nov 4, 2025

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
Comma-separated list of [language and locale codes](/documentation/business-messaging/whatsapp/templates/supported-languages) of language versions you want returned.  
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
      
    

Did you find this page helpful?

ON THIS PAGE

Request syntax

Request parameters

Example request

Example response

* * *