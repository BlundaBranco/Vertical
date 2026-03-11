# Configure message time-to-live

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/time-to-live

---

# Configure message time-to-live

Updated: Feb 27, 2026

If a message cannot be delivered to a WhatsApp user, delivery is retried for a period of time known as the _time-to-live_ (“TTL”), or message validity period.

You can customize the default TTL for authentication and utility templates sent via Cloud API, and for marketing templates sent via Marketing Messages Lite API (“MM Lite API”).

Set a TTL for all of your authentication templates, preferably equal to or less than your code expiration time, to ensure your customers only get a message when a code is still usable.

## Defaults, min and max values, and compatibility table

|  Authentication |  Utility |  Marketing   
---|---|---|---  
**Default TTL**|  10 minutes30 days for authentication templates created before October 23, 2024| 30 days| 30 days  
**Compatibility**|  Cloud API| Cloud API only| Marketing Messages (MM) Lite API  
**Customizable range**|  30 seconds to 15 minutes| 30 seconds to 12 hours| 12 hours to 30 days  
  
## Customize the TTL

To set a custom TTL on an authentication, utility, or marketing template, include the `message_send_ttl_seconds` property in the `POST //message_templates` call.

You can change the TTL on a previously configured template using this method, as well.

TTL can be customized in 1 second increments.

### Valid `message_send_ttl_seconds` property values

  * Authentication templates: `30` to `900` seconds (30 seconds to 15 minutes)
  * Utility templates: `30` to `43200` seconds (30 seconds to 12 hours)
  * Marketing templates: `43200` to `2592000` (12 hours to 30 days)

For authentication and utility templates, you can set the `message_send_ttl_seconds` property value to `-1`, which will set a custom TTL of 30 days.

### Example request
    
    
    curl 'https://graph.facebook.com/v21.0/102290129340398/message_templates' \  
          -H 'Authorization: Bearer EAAJB...' \  
          -H 'Content-Type: application/json' \  
          -d '  
          {  
            "name": "test_template",  
            "language": "en_US",  
            "category": "MARKETING",  
            // Configure your TTL in seconds below  
            "message_send_ttl_seconds": "120",  
            "components": [  
              {  
                "type": "BODY",  
                "text": "Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.",  
                "example": {  
                  "body_text": [  
                    [  
                      "the end of August","25OFF","25%"  
                    ]  
                  ]  
                }  
              },  
              {  
                "type": "FOOTER",  
                "text": "Use the buttons below to manage your marketing subscriptions"  
              },  
            ]  
          }'  
      
    

### Sample response
    
    
    {  
      "id": "572279198452421",  
      "status": "PENDING",  
      "category": "MARKETING"  
    }  
      
    

### When TTL is exceeded

Messages that cannot be delivered within the default or customized TTL are dropped.

If you do not receive a [delivered message webhook](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) before the TTL is exceeded, assume the message was dropped.

If you send a message that [fails to deliver](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status), there could be a minor delay before you receive the webhook, so you may wish to build in a small buffer before assuming the message was dropped.

Did you find this page helpful?

ON THIS PAGE

Defaults, min and max values, and compatibility table

Customize the TTL

Valid message_send_ttl_seconds property values

Example request

Sample response

When TTL is exceeded

* * *