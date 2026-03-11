# Offsite Pix payments

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-br/offsite-pix

---

# Offsite Pix payments

Updated: Nov 14, 2025

Payments API also enables businesses to collect payments from their customers via WhatsApp using dynamic Pix codes.

When using this integration, WhatsApp only facilitates the communication between merchants and buyers. Merchants are responsible for integrating with a bank or PSP in order to generate dynamic Pix codes, and confirm their payment.

## Before you start

  1. Familiarize yourself with the [Orders API](/documentation/business-messaging/whatsapp/payments/payments-br/orders). Orders are the entrypoint for collecting payments in WhatsApp.
  2. You will need an existing integration with a bank or PSP to generate dynamic Pix codes and do automatic reconciliation when a payment is made. You must be able to update the order status as soon as a payment is made.

## Integration steps

The following sequence diagram shows the typical integration with Pix.

### 1\. Send an Order Details message

Follow the full integration guide in the [Orders API page](/documentation/business-messaging/whatsapp/payments/payments-br/orders).

If Pix is available on this order, you will need to provide a `pix_dynamic_code` to the `payment_settings` attribute.

#### Parameters object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`payment_settings`| Optional| Payment Settings Object| List of payment related configuration objects.  
  
#### Payment settings

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`type`| Required| String| Must be `pix_dynamic_code`.  
`pix_dynamic_code`| Required| Dynamic Pix Object| Dynamic Pix Code object that will be used to render the option to buyers during the checkout flow.  
  
#### Dynamic Pix code object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
`code`| Required| String| The dynamic Pix code which will be copied by the buyer.  
`merchant_name`| Required| String| Account holder name. Displayed in-app for the buyer for informational purposes.  
`key`| Required| String| Pix key. Displayed in-app for the buyer for informational purposes.  
`key_type`| Required| String| Pix key type. One of `CPF`, `CNPJ`, `EMAIL`, `PHONE` or `EVP`.  
  
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
               "type": "pix_dynamic_code",  
               "pix_dynamic_code": {  
                 "code": "00020101021226700014br.gov.bcb.pix2548pix.example.com...",  
                 "merchant_name": "Account holder name",  
                 "key": "39580525000189",  
                 "key_type": "CNPJ"  
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

Dynamic Pix code object

Payload example

2\. Send an order status update

* * *