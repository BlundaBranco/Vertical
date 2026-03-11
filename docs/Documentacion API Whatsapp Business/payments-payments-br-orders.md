# Orders

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-br/orders

---

# Orders

Updated: Nov 14, 2025

Payments API introduces two new types of [interactive messages](/documentation/business-messaging/whatsapp/messages/send-messages#interactive-messages): `order_details` and `order_status`. They are the entrypoint to collect payment in WhatsApp.

  1. `order_details` messages are sent to create an order in the buyer’s WhatsApp client app. This message includes a list of the items being purchased, any fees being charged, and the payment settings used to collect payment. The payment settings will vary depending on the integration type ([Pix](/documentation/business-messaging/whatsapp/payments/payments-br/offsite-pix), [payment links](/documentation/business-messaging/whatsapp/payments/payments-br/payment-links), [Boleto](/documentation/business-messaging/whatsapp/payments/payments-br/boleto)).
  2. `order_status` messages are sent when businesses update the order status either based on the WhatsApp payment status change notification or based on their internal processes.

Orders start in `pending` status. When the merchant has fully fulfilled the order and the buyer should not expect any further updates, it must be marked as `completed`.

## Sending order messages

Both message types contain the same 4 main components of an interactive message: _header_ , _body_ , _footer_ , and _action_. The parameters in the _action_ component will vary based on the message type.

Once the interactive message object is assembled, make a POST call to the [messages endpoint](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#messages). Remember to set the type to `interactive`.

### Order details example
    
    
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
                 "uri": "https://my-payment-link-url"  
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
      
    

### Order status example
    
    
    {  
      "recipient_type": "individual",  
      "to": "whatsapp-id",  
      "type": "interactive",  
      "interactive": {  
        "type": "order_status",  
        "body": {  
          "text": "your-mandatory-text-body-content"  
        },  
        "footer": {  
          "text": "your-optional-text-footer-content"  
        },  
        "action": {  
          "name": "review_order",  
          "parameters": {  
            "reference_id": "unique-reference-id",  
            "order": {  
              "status": "processing"  
            }  
            "payment": {  
              "status": "captured",  
              "timestamp": 1722445231  
            }  
          }  
        }  
      }  
    }  
      
    

### Message response

For either type, if your message is sent successfully, you will get the following response:
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "[PHONE_NUMBER_ID]",  
          "wa_id": "[PHONE-NUMBER_ID]"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY1MDUwNzY1MjAVAgARGBI5QTNDQTVCM0Q0Q0Q2RTY3RTcA"  
        }  
      ]  
    }  
      
    

For all errors that can be returned and guidance on how to handle them, see [Cloud API Errors Codes](/documentation/business-messaging/whatsapp/support/error-codes).

## Full API Reference

### Order Details

To send an order_details message, businesses must assemble an interactive object of type order_details with the following components:

#### Interactive Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
type| Required| String| Must be `order_details`.  
header| Optional| Object| Thumbnail image for order details message. It has the following fields:

  * `type`: Must be `image`.
  * `image`: See Image Object.

If the header is not present, the API finds the first product with an image and uses that for the thumbnail image.  
body| Required| Object| An object with the body of the message. The object contains the following field:

  * `text` string: The content of the message. Emojis and markdown are supported. Maximum length is 1024 characters.

  
footer| Optional| Object| An object with the footer of the message. The object contains the following field:

  * `text` string: **Required** if footer is present. The footer content. Emojis, markdown, and links are supported. Maximum length is 60 characters.

  
action| Required| Action Object| See Action Object below.  
  
#### Image Object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
link| Required| String| Url of the image.  
provider| Optional| String| Name of the url provider.  
  
#### Action Object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
name| Required| String| Must be `review_and_pay`.  
parameters| Required| Parameters Object| See Parameters Object.  
  
#### Parameters Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
reference_id| Required| String| Unique identifier for the order or invoice provided by the business. This cannot be an empty string and can only contain English letters, numbers, underscores, dashes, or dots, and should not exceed 60 characters.The reference_id must be unique for each order_details message for the same business. If the partner would like to send multiple order_details messages for the same order, invoice, etc. it is recommended to include a sequence number in the reference_id to ensure reference_id uniqueness.  
type| Required| String| Must be one of `digital-goods` or `physical-goods`.  
payment_type| Required| String| Must be `br`.  
payment_settings| Optional| Payment Settings Object| List of payment related configuration objects.  
currency| Required| String| ISO 4217 currency code for the order. Must be `BRL` (Brazilian Real).  
total_amount| Required| Amount Object| See Amount Object.`total_amount.value` must be equal to `order.subtotal.value` \+ `order.tax.value` \+ `order.shipping.value` \- `order.discount.value`  
order| Required| Order Object| See Order Object.  
  
#### Payment Settings

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
`type`| Required| String| One of `pix_dynamic_code`, `payment_link`, `boleto`.  
One of the following objects: `pix_dynamic_code`, `payment_link`, `boleto`.| Required| Object| Payment instructions which will be displayed to buyers during the checkout process.  
  
#### Order Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
status| Required| String| Status of the order. Only supported value here is `pending`.  
catalog_id| Optional| String| Unique identifier of the Facebook catalog being used by the business.  
expiration| Optional| Expiration Object| Expiration for that order. The CTA for payment will be disabled after expiry on the user end. See Expiration Object.  
items| Required| List of Item Objects| List must have at least one item. See Item Object.  
subtotal| Required| Amount Object| See Amount Object.The value **must be equal** to sum of (`item.amount.value` or `item.sale_amount.value`) * `item.quantity`.The following fields are part of the `subtotal` object:`offset` string

  * **Required.** Must be `100` for `BRL`.

`value` string

  * **Required.** Positive integer representing the amount value multiplied by offset. For example, S$12.34. has value 1234

  
tax| Required| Amount With Description Object| The tax information for this order. Even though the object is required, the amount can be zero. When zero is used, the tax line is not rendered in the client. See Amount With Description Object.  
shipping| Optional| Amount With Description Object| See Amount Object.  
discount| Optional| Discount Object| The discount for the order. See Discount object.  
  
#### Expiration Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
timestamp| Required| String| UTC time in seconds. Minimum threshold is 300 seconds.  
description| Required| String| Text explanation for when the order will expire. Max character limit is 120 characters.  
  
#### Item Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
retailer_id| Required| String| Content ID for an item in the order from your catalog.  
name| Required| String| The item’s name to be displayed to the user. Cannot exceed 60 characters.  
amount| Required| Amount Object| The price per item. See Amount Object.  
quantity| Required| Integer| Number of items in this order.  
sale_amount| Optional| Amount Object| The discounted price per item. This should be less than the original amount. If included, this field is used to calculate the subtotal amount. See Amount Object.  
  
#### Discount Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
value| Required| Integer| Positive integer representing the amount value multiplied by offset. For example, 12.34 BRL has value 1234.  
offset| Required| Integer| Must be `100` for `BRL`.  
description| Optional| String| Max character limit is 60 characters.  
discount_program_name| Optional| String| Text used for defining incentivised orders. If order is incentivised, the merchant needs to define this information. Max character limit is 60 characters.  
  
#### Amount Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
value| Required| Integer| Positive integer representing the amount value multiplied by offset. For example, 12.34 BRL has value 1234.  
offset| Required| Integer| Must be `100` for `BRL`.  
  
#### Amount Object (With Description)

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
value| Required| Integer| Positive integer representing the amount value multiplied by offset. For example, 12.34 BRL has value 1234.  
offset| Required| Integer| Must be `100` for `BRL`.  
description| Optional| String| Max character limit is 60 characters.  
  
### Order Status

To send an order_status message, businesses must assemble an interactive object of type order_details with the following components:

#### Interactive Object

**Field Name**| **Optional?**| **Type**| **Description**  
---|---|---|---  
type| Required| String| Must be `order_status`.  
header| Optional| Object| Optional object for the message’s header for the message.  
body| Required| Object| An object with the body of the message. The object contains the following field:

  * `text` string: The content of the message. Emojis and markdown are supported. Maximum length is 1024 characters.

  
footer| Optional| Object| An object with the footer of the message. The object contains the following field:

  * `text` string: **Required** if footer is present. The footer content. Emojis, markdown, and links are supported. Maximum length is 60 characters.

  
action| Required| Action Object| See Action Object below.  
  
#### Action Object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
name| Required| String| Must be `review_order`.  
parameters| Required| Parameters Object| See Parameters Object.  
  
#### Parameters Object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
reference_id| Required| String| The unique ID provided in the `order_details` message.  
order| Required| Order Object| See Order Object.  
payment| Optional| Payment Object| See Payment Object.  
  
#### Order Object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
status| Required| String| The new order status. See supported order status.  
description| Optional| String| Optional text for sharing status related information in order-details page. Could be useful while sending cancellation. Length should not exceed 120 characters.  
  
#### Payment Object

Field Name |  Optional? |  Type |  Description   
---|---|---|---  
status| Required| String| The new payment status. See supported payment status.  
timestamp| Optional| Integer| Optional epoch timestamp in seconds  
  
#### Supported Order Status

Currently we support the following order status values:

Value |  Description   
---|---  
`pending`| Order is pending / not processed yet.  
`processing`| Merchant/partner is fulfilling the order, performing service, etc.  
`partially-shipped`| Part of the products in order have been shipped by the merchant.  
`shipped`| All the products in order have been shipped by the merchant.  
`completed`| The order is completed and no further action is expected from the user or the partner/merchant.  
`canceled`| The partner/merchant would like to cancel the order_details message for the order/invoice. The status update will fail if there is already a successful or pending payment for this order_details message.  
  
#### Supported Payment Status

Currently we support the following payment status values:

Value |  Description   
---|---  
`pending`| Payment is pending.  
`captured`| Payment was successfully captured. Receiving this payment status will update the order bubble to include the “paid” label (with green checkmark).  
`failed`| Payment failed.  
  
## Errors and Statuses

These are the relevant errors for the WhatsApp Payments API:

Error Code |  Description   
---|---  
`2040 - Message is not supported`| The message you are trying to send cannot be received by this user  
`2046 - Order status invalid transition`| The order status cannot be updated from the existing value to the new one  
`2047 - Order cancellation failure`| The order could not be cancelled  
  
For a comprehensive list with detailed descriptions of error codes and HTTP status codes, please refer to these our [Error Codes](/documentation/business-messaging/whatsapp/support/error-codes) document.

Did you find this page helpful?

ON THIS PAGE

Sending order messages

Order details example

Order status example

Message response

Full API Reference

Order Details

Interactive Object

Image Object

Action Object

Parameters Object

Payment Settings

Order Object

Expiration Object

Item Object

Discount Object

Amount Object

Amount Object (With Description)

Order Status

Interactive Object

Action Object

Parameters Object

Order Object

Payment Object

Supported Order Status

Supported Payment Status

Errors and Statuses

* * *