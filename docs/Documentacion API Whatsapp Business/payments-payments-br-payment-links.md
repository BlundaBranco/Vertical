# Payment links

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-br/payment-links

---

# Payment links

Updated: Nov 14, 2025

Payments API also enables businesses to collect payments from their customers via WhatsApp using Payment Links.

When using this integration, WhatsApp only facilitates the communication between merchants and buyers. Merchants are responsible for integrating with a PSP from which they can generate Payment Links, and confirm their payment.

## Before You Start

  1. Familiarize yourself with the [Orders API](/documentation/business-messaging/whatsapp/payments/payments-br/orders). Orders are the entrypoint for collecting payments in WhatsApp.
  2. You will need an existing integration with a PSP to generate Payment Links and do automatic reconciliation when a payment is made.
  3. You must update the order status as soon as a payment is made.

## Integration steps

The following sequence diagram shows the typical integration with Payment Links.

### 1\. Send an order details message

Follow the full integration guide in the [Orders API page](/documentation/business-messaging/whatsapp/payments/payments-br/orders).

If Payment Link payment is available on this order, you will need to provide a `payment_link` to the `payment_settings` attribute.

#### Parameters object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`payment_settings`| Optional| Payment Settings Object| List of payment related configuration objects.  
  
#### Payment settings

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`type`| Required| String| Must be `payment_link`.  
`payment_link`| Required| Payment Link Object| Payment Link object that will be used to render the option to buyers during the checkout flow.  
  
#### Payment link object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
`uri`| Required| String| The Payment Link’s uri which will be opened in the web browser, when user taps on the Payment Link CTA button.  
  
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
               "type": "payment_link",  
               "payment_link": {  
                 "uri": "https://my-payment-link-url",  
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

Before You Start

Integration steps

1\. Send an order details message

Parameters object

Payment settings

Payment link object

Payload example

2\. Send an order status update

* * *