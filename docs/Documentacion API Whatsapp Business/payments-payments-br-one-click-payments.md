# One-Click Payments

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-br/one-click-payments

---

# One-Click Payments

Updated: Nov 14, 2025

This feature is not publicly available yet and is only available for businesses based in Brazil and their Brazilian customers. To enable payments for your businesses, please contact your Solution Partner.

Payments API also enables businesses to collect payments from their customers via WhatsApp using One-Click Payments.

When using this integration, WhatsApp facilitates communication between merchants and buyers. Merchants are responsible for storing payment credentials and integrating with a payment service provider (PSP) to submit these credentials, completing and confirming their payments.

## Before you start

  1. Familiarize yourself with the [Orders API](/documentation/business-messaging/whatsapp/payments/payments-br/orders). Orders are the entrypoint for collecting payments in WhatsApp.
  2. You will need an existing integration with a PSP and do automatic reconciliation when a payment is made.
  3. You must update the order status as soon as a payment is made.

## Integration steps

The following sequence diagram shows the typical integration with One-Click Payments.

### 1\. Send an Order Details message

Follow the full integration guide in the [Orders API page](/documentation/business-messaging/whatsapp/payments/payments-br/orders).

If One-Click Payments is available on this order, you will need to provide a `offsite_card_pay` object in the `payment_settings` attribute.

#### Parameters object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`payment_settings`| Optional| Payment Settings Object| List of payment related configuration objects.  
  
#### Payment settings

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`type`| Required| String| Must be `offsite_card_pay`.  
`offsite_card_pay`| Required| Offsite Card Pay Object| Offsite Card Pay object that will be used to render the option to buyers during the checkout flow.  
  
#### Offsite card pay object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
`last_four_digits`| Required| String| The last four digits of the card, which will be displayed to the user for confirmation before they accept the payment (by tapping the “Send payment” CTA button).  
`credential_id`| Required| String| The ID of the credential associated with the card. After the user taps the “Send Payment” CTA button, the merchant will receive a webhook from Meta notifying that confirmation from the user. The payload of that webhook will contain this credential_id, which the merchant will use to determine the card or credential for payments.  
  
#### Order details payload example
    
    
    POST: /v1/messages  
    {  
     "recipient_type": "individual",  
     "to": "",  
     "type": "interactive",  
     "interactive": {  
       "type": "order_details",  
       "body": {  
         "text": "Your message content"  
       },  
       "action": {  
         "name": "review_and_pay",  
         "parameters": {  
           "reference_id": "",  
           "type": "digital-goods",  
           "payment_type": "br",  
           "payment_settings": [  
             {  
               "type": "offsite_card_pay",  
               "offsite_card_pay": {  
                 "last_four_digits": "5235",  
                 "credential_id": "1234567"  
               }  
             }  
           ],  
           "currency": "BRL",  
           "total_amount": {  
             "value": 50000,  
             "offset": 100  
           },  
           "order": {  
             "status": "pending",  
             "tax": {  
               "value": 0,  
               "offset": 100,  
               "description": "optional text"  
               },  
             "items": [  
               {  
                 "retailer_id": "1234567",  
                 "name": "Cake",  
                 "amount": {  
                   "value": 50000,  
                   "offset": 100  
                 },  
                 "quantity": 1  
               }  
             ],  
             "subtotal": {  
               "value": 50000,  
               "offset": 100  
             }  
           }  
         }  
       }  
     }  
    }  
      
    

### 2\. Receive the webhook notification

This webhook confirms the buyer’s intention to make a payment and includes the ID of the credential to use.

#### Webhook notification payload example
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "[]",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "[]",  
                  "phone_number_id": "[]"  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": "[]"  
                    },  
                    "wa_id": "[]"  
                  }  
                ],  
                "messages": [  
                  {  
                    "from": "[]",  
                    "id": "[]",  
                    "timestamp": "[]",  
                    "from_logical_id": "64244926160970",  
                    "type": "interactive",  
                    "interactive": {  
                      "type": "payment_method",  
                      "payment_method": {  
                        "payment_method": "offsite_card_pay",  
                        "payment_timestamp": 1726170122,  
                        "reference_id": "pix_test_webhook",  
                        "last_four_digits": "5235",  
                        "credential_id": "1234567"  
                      }  
                    }  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

### 3\. Send an order status update

Once the payment is confirmed, you must send an order status update. Follow the integration guide in the [Orders API page](/documentation/business-messaging/whatsapp/payments/payments-br/orders).

Did you find this page helpful?

ON THIS PAGE

Before you start

Integration steps

1\. Send an Order Details message

Parameters object

Payment settings

Offsite card pay object

Order details payload example

2\. Receive the webhook notification

Webhook notification payload example

3\. Send an order status update

* * *