# payment_configuration_update webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/payment_configuration_update

---

# payment_configuration_update webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **payment_configuration_update** webhook.

The **payment_configuration_update** webhook notifies you of changes to payment configurations for [Payments API India](/documentation/business-messaging/whatsapp/payments/payments-in/overview) and [Payments API Brazil](/documentation/business-messaging/whatsapp/payments/payments-br/overview).

## Triggers

  * The payment configuration associated with a WhatsApp Business Account has been connected to a payment gateway account.
  * The payment configuration associated with a WhatsApp Business Account has been disconnected from a payment gateway account.
  * The payment configuration associated with a WhatsApp Business Account is now active.

## Syntax
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "field": "payment_configuration_update",  
              "value": {  
                "configuration_name": "",  
                "provider_name": "",  
                "provider_mid": "",  
                "status": "",  
                "created_timestamp": ,  
                "updated_timestamp":   
              }  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_Integer_|  UNIX timestamp indicated when the payment configuration was created.| `1748827100`  
``_String_|  Payment configuration name to be used in the Order Details messages.| `razorpay-prod`  
``_String_|  Payment configuration status.Values can be:`Active` — Indicates the payment configuration has been tested in WhatsApp manager and can now be used with Payments API.`Needs Connecting` — Indicates the payment configuration has been disconnected from the payment gateway and needs to be connected again.`Needs Testing` — Indicates the payment configuration has been connected to the payment gateway but still needs testing in WhatsApp Manager.| `Needs Connecting`  
``_Integer_|  UNIX timestamp indicated when the payment configuration was updated.| `1749320300`  
``_String_|  Payment gateway merchant account ID.| `acc_GP4lfNA0iIMn5B`  
``_String_|  Name of the payment gateway provider associated with the payment configuration. Values can be:

  * `billdesk`
  * `payu`
  * `razorpay`
  * `zaakpay`

| `razorpay`  
``_Integer_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
  
## Example payload
    
    
    {  
      "entry": [  
        {  
          "id": "102290129340398",  
          "time": 1739321024,  
          "changes": [  
            {  
              "field": "payment_configuration_update",  
              "value": {  
                "configuration_name": "razorpay-prod",  
                "provider_name": "razorpay",  
                "provider_mid": "acc_GP4lfNA0iIMn5B",  
                "status": "Needs Testing",  
                "created_timestamp": 1748827100,  
                "updated_timestamp": 1749320300  
              }  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Example payload

* * *