# Boleto

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-br/boleto

---

# Boleto

Updated: Nov 14, 2025

Payments API also enables businesses to collect payments from their customers via WhatsApp using Boleto.

When using this integration, WhatsApp only facilitates the communication between merchants and buyers. Merchants are responsible for integrating with a PSP from which they can generate Boleto codes, and confirm their payment.

## Before you start

  1. Familiarize yourself with the [Orders API](/documentation/business-messaging/whatsapp/payments/payments-br/orders). Orders are the entrypoint for collecting payments in WhatsApp.
  2. You will need an existing integration with a PSP to generate Boleto codes and do automatic reconciliation when a payment is made.
  3. You must update the order status as soon as a payment is made.

## Integration steps

The following sequence diagram shows the typical integration with Boleto.

### 1\. Send an Order Details message

Follow the full integration guide in the [Orders API page](/documentation/business-messaging/whatsapp/payments/payments-br/orders).

If Boleto payment is available on this order, you will need to provide a `boleto` object in the `payment_settings` attribute.

#### Parameters object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`payment_settings`| Optional| Payment Settings Object| List of payment related configuration objects.  
  
#### Payment settings

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`type`| Required| String| Must be `boleto`.  
`boleto`| Required| Boleto Object| Boleto object that will be used to render the option to buyers during the checkout flow.  
  
#### Boleto object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
`digitable_line`| Required| String| The Boleto digital line / code which will be copied to the clipboard, when user taps on the Boleto CTA button.  
  
#### Payload example
    
    
    POST: /v1/messages  
    {  
     "recipient_type": "individual",  
     "to": "[recipient-wa-id]",  
     "type": "interactive",  
     "interactive": {  
       "type": "order_details",  
       "body": {  
         "text": "Your message content"  
       },  
       "action": {  
         "name": "review_and_pay",  
         "parameters": {  
           "reference_id": "unique-reference-id",  
           "type": "digital-goods",  
           "payment_type": "br",  
           "payment_settings": [  
             {  
               "type": "boleto",  
               "boleto": {  
                 "digitable_line": "03399026944140000002628346101018898510000008848",  
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
      
    

### 2\. Send an order status update

Once the payment is confirmed, you must send an order status update. Follow the integration guide in the [Orders API page](/documentation/business-messaging/whatsapp/payments/payments-br/orders).

Did you find this page helpful?

ON THIS PAGE

Before you start

Integration steps

1\. Send an Order Details message

Parameters object

Payment settings

Boleto object

Payload example

2\. Send an order status update

* * *