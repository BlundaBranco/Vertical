# Checkout button templates

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-in/checkout-button-templates

---

# Checkout button templates

Updated: Dec 12, 2025

Checkout button templates are marketing templates that can showcase one or more products along with corresponding checkout buttons that WhatsApp users can use to make purchases without leaving the WhatsApp client.

## Single products

Checkout button templates can show a single product image or video header, along with message body text, message footer, a single checkout button, and up to 9 quick-reply buttons.

WhatsApp users who tap the button will see details of the order:

Users can proceed by selecting shipping information provided by you (if you know their information and supplied it in the send message payload)...

... or can add their own shipping information:

## Enabling coupons, realtime inventory, and pricing updates

Enabling coupons, realtime inventory and pricing updates is currently in beta and only available to India businesses and WhatsApp users with an India country calling code. Please reach out to whatsappindia-bizpayments-support@meta.com to know more.

To enable coupons, realtime inventory and pricing updates, you can set up a checkout endpoint that can exchange data in real time to update the order on the WhatsApp client. It enables businesses to receive the shipping address and offers coupons based on the order and allows users to apply the coupon. It also enables businesses to validate inventory and serviceability on the order before the user completes the checkout.

Setting up the checkout endpoint consists of the following steps and it’s the same method that [WhatsApp Flows endpoint](/docs/whatsapp/flows/guides/implementingyourflowendpoint#implementing-endpoint-for-flows) uses to share the data with WhatsApp clients.

  * Create a key pair and upload and sign the public key using the [Cloud API](/docs/whatsapp/cloud-api/reference/whatsapp-business-encryption#set-business-public-key).
  * Setup the endpoint
  * Implement Payload Encryption/Decryption
  * Link the checkout endpoint with payment configuration
  * Implement checkout endpoint logic

### Set up the endpoint

WhatsApp client makes a HTTPS request to exchange the data with the business endpoint. You should make sure the endpoint is configured probably to accept the request and link the endpoint url with the [payment configuration](/documentation/business-messaging/whatsapp/payments/payments-in/pg#link-your-payment-account):
    
    
    https://business.com/checkout  
      
    

Your server must be enabled to receive and process `POST` requests, use `HTTPS` and have a valid TLS/SSL certificate installed. This certificate does not have to be used in payload encryption/decryption.

### Implement Encryption/Decryption

The body of each request contains the encrypted payload and has the following form:

#### Sample endpoint request syntax
    
    
    {  
      encrypted_flow_data: "",  
      encrypted_aes_key: "",  
      initial_vector: ""  
    }  
      
    

Parameter |  Description   
---|---  
`encrypted_flow_data` string| **Required.** The encrypted request payload.  
`encrypted_aes_key` string| **Required.** The encrypted 128-bit AES key.  
`initial_vector` string| **Required.** The 128-bit initialization vector.  
  
After processing the decrypted request, create a response and encrypt it before sending it back to the WhatsApp client. Encrypt the payload using the AES key received in the request and send it back as a Base64 string.

You can refer to examples of how to [decrypt and encrypt](/docs/whatsapp/flows/guides/implementingyourflowendpoint#request-decryption-and-encryption).

If a request can not be decrypted, the endpoint should return HTTP 421 response status code (see [Business Endpoint Error Codes](/docs/whatsapp/flows/reference/error-codes#endpoint_error_codes) for more details).

#### Sample endpoint response
    
    
    curl -i -H "Content-Type: application/json" -X POST -d '{  
    "encrypted_flow_data":"4Wor0bpfvrNqnkH+XQZLn3HnU2Zi7hG\\/UHjISS93Fzn9J7youssaLeXlNUH",  
    "encrypted_aes_key":"ufA0fXD1Wz...",  
    "initial_vector":"G\\/1rq1naEOMR4TJHFvIs\\/Q==."  
    }' 'https://business.com/checkout'  
      
    HTTP/2 200  
    content-type: text/plain  
    content-length: 232  
    date: Wed, 06 Jul 2022 14:03:03 GMT  
      
    yZcJQaH3AqfzKgjn64vAcASaJrOMN27S6CESyU68WN/cDCP6abskoMa/pPjszXGKyyh/23lw84HW6ZilMfU6KL3j5AWwOx6GWNwtq8Aj7gz/Y7R+LccmJWxKo2UccMu5xJlduIFlFlOS1gAnOwKrk8wpuprsi4jAOspw3xO2uh3J883aC/csu/MhRPiYCaGGy/tTNvVDmb2Gw1WXFmpvLsZ/SBrgG0cDQJjQzpTO  
      
    

### Link the checkout endpoint with payment configuration

The business should have payment gateway based [payment configuration](/documentation/business-messaging/whatsapp/payments/payments-in/pg#link-your-payment-account) and reach out to whatsappindia-bizpayments-support@meta.com to enable the WhatsApp business account for checkout endpoint linking with with payment configuration.

Prior to linking the checkout endpoint, you should create a [payment configuration](/documentation/business-messaging/whatsapp/payments/payments-in/pg#link-your-payment-account) and link with the payment gateway account. We advise you to use the linked payment configuration only with checkout button template integration.

You can achieve the endpoint linking with payment configuration by following [Onboarding API’s - Link data endpoint](/documentation/business-messaging/whatsapp/payments/payments-in/onboarding-apis#link-or-update-data-endpoint)

### Implement checkout endpoint logic

WhatsApp checkout endpoint integration inherits the ‘data_exchange’ similar to Flows and supports a set of subactions based on the user interaction and passes the relevant information in each of these actions to allow businesses to provide user specific coupons and enable businesses to update the pricing information accordingly.

Sub Action |  Method |  Description   
---|---|---  
`get_coupons`| Request| When users click on a savings offer CTA, WhatsApp passes [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject) excluding the [payment settings](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paymentsettingsobject). It also passes the `user phone number` as an input parameter.
    
    
    {  
      "input":  
      {  
        "user_id": "user_phone_number"  
      }  
    }  
      
    

Refer get coupons request example to understand the order and input parameters  
| Response| Checkout endpoint expected to pass the list of coupon information, such as code, id and description.
    
    
    {  
      "coupons":  
        [  
            {  
                "code": "coupon_code",  
                "id": "coupon_id",  
                "description": "coupon_description"  
            }  
        ]  
      
    }  
      
    

Refer get coupons response example to understand the expected response.  
`apply_coupon`| Request| When users select or enter a coupon, WhatsApp passes [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject) excluding the [payment settings](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paymentsettingsobject). It also passes the `user phone number` and information about the coupon to be applied as an input parameter.
    
    
    {  
      "input":  
      {  
        "user_id": "user_phone_number",  
        "coupon":  
        {  
          "code": "WELCOME70"  
        }  
      }  
    }  
      
    

Refer apply coupon request example to understand the order and input parameters  
| Response| Checkout endpoint expected to update the item and order pricing in [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject) and attach the coupon with the orderRefer to apply coupon response example to understand the expected response.  
`remove_coupon`| Request| When users try to remove an applied coupon, WhatsApp passes [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject) excluding the [payment settings](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paymentsettingsobject). It also passes the `user phone number` as an input parameter.
    
    
    {  
      "input":  
      {  
        "user_id": "user_phone_number"  
      }  
    }  
      
    

Refer remove coupon request example to understand the expected response.  
| Response| Checkout endpoint expected to update the item and order pricing in [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject) and remove the coupon attached with the order.Refer remove coupon response example to understand the expected response.  
`apply_shipping`| Request| When users try to submit a shipping address, WhatsApp passes [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject) excluding the [payment settings](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paymentsettingsobject). It also passes the `user phone number` and shipping information as an input parameter.
    
    
    {  
      "input":  
      {  
        "user_id": "user_phone_number"  
      }  
    }  
      
    

Refer to the apply shipping request example to understand the expected response.  
| Response| Checkout endpoint expected to update the item and shipping pricing in [order parameters](/documentation/business-messaging/whatsapp/payments/payments-in/pg#paramobject).Refer to the apply shipping response example to understand the expected response.  
  
We have created a [checkout endpoint example⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FWhatsApp%2FWhatsApp-Checkout-Button-Template-Endpoint&h=AT60zgT3hZ87ByE9uEZnn-G0ZHKDuFO3zzD7cwDncy-Ll1EPrayAnc6DActrS7YTc445lLGt55wGgm2lXUinKAOE57IxJO28MrAzaRKnXHctOjJGvJEKLxzkcr_FZNLGECj5fk3tg6r84IO8ahwRGw) in Node.js that you can clone (remix) on Glitch to create your own endpoint and quickly prototype your checkout logic. Follow the instructions in the [README.md⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FWhatsApp%2FWhatsApp-Checkout-Button-Template-Endpoint%2Fblob%2Fmain%2FREADME.md&h=AT60zgT3hZ87ByE9uEZnn-G0ZHKDuFO3zzD7cwDncy-Ll1EPrayAnc6DActrS7YTc445lLGt55wGgm2lXUinKAOE57IxJO28MrAzaRKnXHctOjJGvJEKLxzkcr_FZNLGECj5fk3tg6r84IO8ahwRGw) file to get started. Using Glitch is entirely optional. You can clone the example code from Glitch and run it in any environment you prefer.

Upon completing the above steps, when business sends the checkout template with the linked payment configuration, WhatsApp enables the coupons, realtime inventory and pricing updates and allows users to apply coupons and share shipping addresses.

When enabled the `Apply a savings offer` will appear in the order summary screen

User can click on `Apply a savings offer` to explore the coupons, at this point WhatsApp makes `get_coupons` request to fetch the list coupons based on the passed order and `user phone number` information.

When the user tries to apply a coupon, WhatsApp makes `apply_coupon` and allow businesses to update the order or item pricing based on the selected coupon.

Similar to coupons, user can share the shipping address by clicking on `Add shipping address` and select the addresses saved with the businesses or add new address. WhatsApp makes `apply_shipping` request when user tries to submit the address and allow businesses to check inventory and logistics based on the address provided.

Users can then continue to place the order using their preferred payment method set up in the WhatsApp client:

Once the order is processed, a [payment webhook](/documentation/business-messaging/whatsapp/payments/payments-in/pg#step-2--receive-webhook-about-transaction-status) is triggered.

## Multiple products

You can create a [media card carousel template](/documentation/business-messaging/whatsapp/templates/marketing-templates/media-card-carousel-templates) that showcases up to 10 products in a card carousel, each with their own checkout button. To do this, simply create a media card carousel template as you normally would, but replace one of the buttons with a checkout button, and make sure that it is the first button in the card.

Checkout buttons in media card carousel templates trigger the same order and payment flow as checkout buttons in templates that showcase a single product.

## Checkout buttons

Each checkout button in a template must correspond to a single product. Checkout buttons, when creating a template, must have the following non-customizable syntax:
    
    
    {  
      "type": "order_details",  
      "text": "Buy now"  
    }  
      
    

Note that this is simply a button definition. The actual details about the product that maps to this button are included when you send the template in a template message. For example:
    
    
    {  
      "type": "button",  
      "sub_type": "order_details",  
      "index": 0,  
      "parameters": [  
        {  
          "type": "action",  
          "action": {  
            "order_details": {  
              "reference_id": "abc.123_xyz-1",  
              "type": "physical-goods",  
              "currency": "INR",  
              "payment_settings": [  
                {  
                  "type": "payment_gateway",  
                  "payment_gateway": {  
                    "type": "razorpay",  
                    "configuration_name": "prod-razor-pay-config-05"  
                  }  
                }  
              ],  
              "shipping_info": {  
                "country": "IN",  
                "addresses": [  
                  {  
                    "name": "Nidhi Tripathi",  
                    "phone_number": "919000090000",  
                    "address": "Bandra Kurla Complex",  
                    "city": "Mumbai",  
                    "state": "Maharastra",  
                    "in_pin_code": "400051",  
                    "house_number": "12",  
                    "tower_number": "5",  
                    "building_name": "One BKC",  
                    "landmark_area": "Near BKC Circle"  
                  }  
                ]  
              },  
              "order": {  
                "items": [  
                  {  
                    "amount": {  
                      "offset": 100,  
                      "value": 200000  
                    },  
                    "sale_amount": {  
                      "offset": 100,  
                      "value": 150000  
                    },  
                    "name": "Blue Elf Aloe",  
                    "quantity": 1,  
                    "country_of_origin": "India",  
                    "importer_name": "Lucky Shrub Imports and Exports",  
                    "importer_address": {  
                      "address_line1": "One BKC",  
                      "address_line2": "Bandra Kurla Complex",  
                      "city": "Mumbai",  
                      "zone_code": "MH",  
                      "postal_code": "400051",  
                      "country_code": "IN"  
                    }  
                  }  
                ],  
                "subtotal": {  
                  "offset": 100,  
                  "value": 150000  
                },  
                "shipping": {  
                  "offset": 100,  
                  "value": 20000  
                },  
                "tax": {  
                  "offset": 100,  
                  "value": 10000  
                },  
                "discount": {  
                  "offset": 100,  
                  "value": 15000,  
                  "description": "Additional 10% off"  
                },  
                "status": "pending",  
                "expiration": {  
                  "timestamp": "1726627150"  
                }  
              },  
              "total_amount": {  
                "offset": 100,  
                "value": 165000  
              }  
            }  
          }  
        }  
      ]  
    }  
      
    

If you are sending a [media card carousel template](/documentation/business-messaging/whatsapp/templates/marketing-templates/media-card-carousel-templates) (which can have two or more products), each checkout button must be defined in the template, and the item details that map to each button must be included when sending the template.

## Creating checkout button templates

Use the [**POST / /message_templates**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/template-api#post-version-waba-id-message-templates) endpoint to create a template that uses a checkout button.

### Request syntax
    
    
    POST //message_templates

### Post body

The post body below is for a checkout button template that shows a single button. See the [Media Card Carousel Templates](/documentation/business-messaging/whatsapp/templates/marketing-templates/media-card-carousel-templates) document to see carousel template post body syntax.
    
    
    {
      "name": "",
      "language": "",
      "category": "marketing",
      "components": [
        {
          "type": "header",
          "format": "",
          "example": {
            "header_handle": [
              ""
            ]
          }
        },
        {
          "type": "body",
          "text": "",
          "example": {
            "body_text": [
              [
                "",
                ""
              ]
            ]
          }
        },
    
        /* Footer component is optional */
        {
          "type": "footer",
          "text": ""
        },
    
        {
          "type": "buttons",
          "buttons": [
            {
              "type": "order_details",
              "text": "Buy now"
            },
    
            /* Quick-reply buttons are optional; up to 9 permitted */
            {
              "type": "quick_reply",
              "text": ""
            }
          ]
        }
      ]
    }

### Post body parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.** Message body text. Supports variables.Maximum 1024 characters.| `Hi {{1}}! The {{2}} is back in stock! Order now before it's gone!`  
``_String_| **Required if message body text string uses variables.** Message body text example variable string(s). Number of strings must match the number of variable placeholders in the message body text string.If message body text uses a single variable, `body_text` value can be a string, otherwise it must be an array containing an array of strings.| `Pablo`  
``_String_| **Required if using a message footer.** Message footer text string.60 characters maximum.| `Tap 'Stop' below to stop back-in-stock reminders.`  
``_String_| **Required if using a non-text media header.** Uploaded media asset handle. Use the [Resumable Upload API](/docs/graph-api/guides/upload) to generate an asset handle.Media assets are automatically cropped to a wide ratio based on the WhatsApp user’s device.| `4::anBlZw==:ARa525ZJ1g0J-8egeiRvb4Z4r9RSi9qeKF7-wXsUiaDFsll5CKbu5H7h_9mTW0TDfA8LEGHC4bAeXtJJiVQADMp5Ooe2huQlhpBxMadJiu3qVg:e:1724535430:634974688087057:100089620928913:ARaQoFQMm6BlbI3MYo4`  
``_String_| **Required.** Message header format. Value can be `image` or `video`.| `image`  
``_String_| **Required if using a quick-reply button.** Quick-reply button label text.Maximum 25 characters.| `Stop`  
``_String_| **Required.** Template [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en_US`  
``_String_| **Required.** Template name.Maximum 512 characters.| `item_back_in_stock_v1`  
  
### Example request

This example request creates a checkout button template with a single image message header, message body text that uses two variables, a footer, a single checkout button, and a quick-reply button.
    
    
    curl 'https://graph.facebook.com/v25.0/102290129340398/message_templates' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "name": "item_back_in_stock_v1",
      "language": "en_US",
      "category": "marketing",
      "components": [
        {
          "type": "header",
          "format": "image",
          "example": {
            "header_handle": [
              "3:NDU..."
            ]
          }
        },
        {
          "type": "body",
          "text": "Hi {{1}}! The {{2}} is back in stock! Order now before it\'s gone!",
          "example": {
            "body_text": [
              [
                "Pablo",
                "Blue Elf Aloe"
              ]
            ]
          }
        },
        {
          "type": "footer",
          "text": "Tap \'Stop\' below to stop back-in-stock reminders."
        },
        {
          "type": "buttons",
          "buttons": [
            {
              "type": "order_details",
              "text": "Buy now"
            },
            {
              "type": "quick_reply",
              "text": "Stop"
            }
          ]
        }
      ]
    }'

## Send a checkout button template

Once your checkout button template or carousel template has been approved, you can send it in a template message.

### Request syntax

Use the [**POST / /messages**](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send an approved checkout button template or carousel template to a WhatsApp user.
    
    
    POST //messages

### Post body

This post body syntax is for a checkout button template. See [Sending Media Card Carousel Templates](/documentation/business-messaging/whatsapp/templates/marketing-templates/media-card-carousel-templates) for media card carousel template post body payload syntax.
    
    
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "",
      "type": "template",
      "template": {
        "name": "",
        "language": {
          "policy": "deterministic",
          "code": ""
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "",
                "": {
                  "id": ""
                }
              }
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                
              },
              {
                
              }
            ]
          },
          {
            "type": "button",
            "sub_type": "order_details",
            "index": 0,
            "parameters": [
              {
                "type": "action",
                "action": {
                  "order_details": {
                    "reference_id": "",
                    "currency": "INR",
                    "type": "",
                    "payment_settings": [
                      {
                        "type": "payment_gateway",
                        "payment_gateway": {
                          "type": "",
                          "configuration_name": ""
                        }
                      }
                    ],
    
                    /* "shipping_info" required for physical-goods type, else omit */
                    "shipping_info": {
                      "country": "IN",
                      "addresses": [
    
                        /* object required if you know recipient's address, otherwise omit (i.e., set "addresses" to an empty array) */
                        {
                          "name": "",
                          "phone_number": "",
                          "address": "",
                          "city": "",
                          "state": "",
                          "in_pin_code": "",
                          "landmark_area": "",
                          "house_number": "",
                          "tower_number": "",
                          "building_name": ""
                        }
    
                      ]
                    },
    
                    "order": {
                      "items": [
                        {
                          "amount": {
                            "offset": 100,
                            "value": 
                          },
    
                          /* "sale_amount" optional */
                          "sale_amount": {
                            "offset": 100,
                            "value": 
                          },
    
                          "name": "",
                          "quantity": ,
                          "country_of_origin": "",
                          "importer_name": "",
                          "importer_address": {
                            "address_line1": "",
                            "address_line2": "",
                            "city": "",
                            "zone_code": "",
                            "postal_code": "",
                            "country_code": "IN"
                          }
                        }
                      ],
                      "subtotal": {
                        "offset": 100,
                        "value": 
                      }
                      "shipping": {
                        "offset": 100,
                        "value": 
                      },
                      "tax": {
                        "offset": 100,
                        "value": ,
                        "description": ""
                      },
    
                      /* "discount" optional */
                      "discount": {
                        "offset": 100,
                        "value": ,
                        "description": ""
                      },
                      "status": "pending",
    
                      /* "expiration" optional */
                      "expiration": {
                        "timestamp": ""
                      }
                    },
                    "total_amount": {
                      "offset": 100,
                      "value": 
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }

### Post body parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_Integer_| **Required if using a discount.** Discount amount, multiplied by discount.offset value.For example, to represent a discount of ₹2, the value would be `200`.Discount amount applies to the order subtotal.| `15000`  
``_String_| **Optional.** Discount description.Maximum 60 characters.| `Additional 10% off`  
``_String_| **Required if using an order expiration.** UTC timestamp indicating when we should disable the **Buy now** button. The timestamp will be used to generate a text string that appears at the bottom of the **Order details** window. For example:_This order expires on September 30, 2024 at 12:00 PM._ WhatsApp users who view the message after this time will be unable to purchase the item using the checkout button.Values must represent a UTC time at least 300 seconds from when the send message request is sent to us.| `1726692927`  
``_String_| **Required.** Importer address, line 1 (door, tower, number, street, etc.).Maximum 100 characters.| `One BKC`  
``_String_| **Optional.** Importer address, line 2 (landmark, area, etc.).Maximum 100 characters.| `Bandra Kurla Complex`  
``_String_| **Required.** Importer city.Maximum 120 characters.| `Mumbai`  
``_String_| **Required.** Importer name.Maximum 200 characters.| `Lucky Shrub Imports and Exports`  
``_String_| **Required.** Importer 6-digit postal index number.Maximum 6 digits.| `400051`  
``_String_| **Required.** Importer two-letter zone code.| `MH`  
``_String_| **Required.** Item’s country of origin.Maximum 100 characters.| `India`  
``_String_| **Required.** Item name.Maximum 60 characters.| `Blue Elf Aloe`  
``_Integer_| **Required.** Individual item price (price per item), multiplied by amount.offset value.For example, to represent an item price of ₹12.99, the value would be `1299`.| `200000`  
``_Integer_| **Required.** Number of items in order, if order is placed.Maximum 100 integers.| `1`  
``_Object_| **Required if template message body text uses variables, otherwise omit.** Object describing a message variable. If the template uses multiple variables, you must define an object for each variable.Supports `text`, `currency`, and `date_time` types. See [Messages Parameters](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api#parameter-object).There is no maximum character limit on this value, but it does count against the message body text limit of 1024 characters.| 
    
    
    {
    "type":"text",
    "text": "Nidhi"
    }  
  
``_String_| **Required.** Header asset’s uploaded media asset ID. Use the [**POST / /media**](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) endpoint to generate an asset ID.| `1558081531584829`  
``_String_| **Required.** Indicates header type and a matching property name.Note that the `` placeholder appears twice in the post body example above, as it serves as a placeholder for the type property’s value and its matching property name.Value can be `image` or `video`.| `image`  
``_String_| **Required.** Configuration name of payment gateway you have [configured](/documentation/business-messaging/whatsapp/payments/payments-in/onboarding-apis) on your WhatsApp Business Account.| `prod-razor-pay-config-05`  
``_String_| **Required.** Name of payment gateway you have [configured](/documentation/business-messaging/whatsapp/payments/payments-in/onboarding-apis) on your WhatsApp Business Account.Values can be:

  * `razorpay`
  * `payu`
  * `zaakpay`

| `razorpay`  
``_String_| **Required.** Product type. Value can be `digital-goods` or `physical-goods`.| `digital-goods`  
``_String_| **Optional.** Value to be included in messages webhooks (`messages.button.payload`) when the button is tapped.| `opt-out`  
``_String_| **Required.** Your unique order or invoice reference ID. Case-sensitive. Cannot be empty. Will be preceded by a hash (#) symbol in the checkout flow.Value must be unique for each checkout button template message. If sending a carousel template, each checkout button must have a unique reference ID.If you need to send multiple messages for the same order/invoice, it is recommended to append a sequence number to the value (for example, -1).Values can only contain English letters, numbers, underscores, dashes, or dots.Maximum 35 characters.| `abc.123_xyz-1`  
``_Integer_| **Required if using a sale amount.** Sale price, multiplied by `sale.offset` value.For example, to represent a sale price of ₹10, the value would be `1000`.| `150000`  
``_Integer_| **Required.** Order shipping cost, multiplied by `shipping.offset` value.For example, to represent a shipping cost of ₹.99, the value would be `99`.| `20000`  
``_String_| **Required if you know the recipient’s shipping information.** Product recipient’s address.Maximum 512 characters.| `Bandra Kurla Complex`  
``_String_| **Optional.** Product recipient’s building name.Maximum 128 characters.| `One BKC`  
``_String_| **Required if you know the recipient’s shipping information.** Full name of product recipient’s city.Maximum 100 characters.| `Mumbai`  
``_String_| **Optional.** Product recipient’s floor number.Maximum 10 characters.| `2`  
``_String_| **Optional.** Product recipient’s house number.Maximum 8 characters.| `12`  
``_String_| **Required if you know the recipient’s shipping information.** Product recipient’s postal index number.Maximum 6 characters.| `400051`  
``_String_| **Optional.** Product recipient’s landmark area.Maximum 128 characters.| `Near BKC Circle`  
``_String_| **Required if you know the recipient’s shipping information.** Product recipient’s full name.Maximum 256 characters.| `Nidhi Tripathi`  
``_String_| **Required if you know the recipient’s shipping information.** Product recipient’s WhatsApp phone number.Maximum 12 characters.| `919000090000`  
``_String_| **Required if you know the recipient’s shipping information.** Full name of product recipient’s state.Maximum 100 characters.| `Maharastra`  
``_String_| **Optional.** Product recipient’s tower number.Maximum 8 characters.| `2`  
``_Integer_| **Required.** Order subtotal. Calculate by multiplying `` by `` by `subtotal.offset`.For example, if the template is for placing a single order containing 2 items priced at ₹12.99, the value would be `2598`.| `150000`  
``_Integer_| **Required.** Tax amount, multiplied by `tax.offset`.For example, to represent a tax amount of ₹5, the value would be `500`.| `10000`  
``_String_| **Optional.** Tax description.Maximum 60 characters.| `Sales tax`  
``_String_| **Required.** Template [language and locale code](/documentation/business-messaging/whatsapp/templates/supported-languages).| `en_US`  
``_String_| **Required.** Template name.Maximum 512 characters.| `item_back_in_stock_v1`  
``_Integer_| **Required.** Total amount of order, multiplied by `total_amount.offset` value.For example, to represent a total amount of ₹18, value be `1800`.Must be a sum of:

  * `order.subtotal.value`
  * `order.shipping.value`
  * `order.tax.value`

Minus:

  * `order.discount.value`

| `165000`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
### Example request
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "template",
      "template": {
        "name": "item_back_in_stock_v2",
        "language": {
          "policy": "deterministic",
          "code": "en_US"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "id": "1558081531584829"
                }
              }
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": "Nidhi"
              },
              {
                "type": "text",
                "text": "Blue Elf Aloe"
              }
            ]
          },
          {
            "type": "button",
            "sub_type": "order_details",
            "index": 0,
            "parameters": [
              {
                "type": "action",
                "action": {
                  "order_details": {
                    "reference_id": "abc.123_xyz-1",
                    "type": "physical-goods",
                    "currency": "INR",
                    "payment_settings": [
                      {
                        "type": "payment_gateway",
                        "payment_gateway": {
                          "type": "razorpay",
                          "configuration_name": "prod-razor-pay-config-05"
                        }
                      }
                    ],
                    "shipping_info": {
                      "country": "IN",
                      "addresses": [
                        {
                          "name": "Nidhi Tripathi",
                          "phone_number": "919000090000",
                          "address": "Bandra Kurla Complex",
                          "city": "Mumbai",
                          "state": "Maharastra",
                          "in_pin_code": "400051",
                          "house_number": "12",
                          "tower_number": "5",
                          "building_name": "One BKC",
                          "landmark_area": "Near BKC Circle"
                        }
                      ]
                    },
                    "order": {
                      "items": [
                        {
                          "amount": {
                            "offset": 100,
                            "value": 200000
                          },
                          "sale_amount": {
                            "offset": 100,
                            "value": 150000
                          },
                          "name": "Blue Elf Aloe",
                          "quantity": 1,
                          "country_of_origin": "India",
                          "importer_name": "Lucky Shrub Imports and Exports",
                          "importer_address": {
                            "address_line1": "One BKC",
                            "address_line2": "Bandra Kurla Complex",
                            "city": "Mumbai",
                            "zone_code": "MH",
                            "postal_code": "400051",
                            "country_code": "IN"
                          }
                        }
                      ],
                      "subtotal": {
                        "offset": 100,
                        "value": 150000
                      },
                      "shipping": {
                        "offset": 100,
                        "value": 20000
                      },
                      "tax": {
                        "offset": 100,
                        "value": 10000
                      },
                      "discount": {
                        "offset": 100,
                        "value": 15000,
                        "description": "Additional 10% off"
                      },
                      "status": "pending",
                      "expiration": {
                        "timestamp": "1726627150"
                      }
                    },
                    "total_amount": {
                      "offset": 100,
                      "value": 165000
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }'

The following sample request and responses are only supported with Enabling coupons, realtime inventory and pricing updates feature and it is currently in beta and only available to India businesses and WhatsApp users with an India country calling code. Please reach out to whatsappindia-bizpayments-support@meta.com to know more.

### Get coupons - endpoint sample request
    
    
          {  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ]  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 20000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 165000  
                }  
            },  
            "input":  
            {  
                "user_id": "919000090000"  
            }  
        },  
        "action": "data_exchange",  
        "sub_action": "get_coupons",  
        "version": "1.0"  
    }  
      
    

### Get coupons - endpoint sample response
    
    
          {  
        "version": "1.0",  
        "sub_action": "get_coupons",  
        "data":  
        {  
            "coupons":  
            [  
                {  
                    "description": "Save R20 on the order",  
                    "code": "TRYNEW20",  
                    "id": "try_new_20_id"  
                },  
                {  
                    "description": "Save R30 on the order",  
                    "code": "TRYNEW30",  
                    "id": "try_new_30_id"  
                },  
                {  
                    "description": "Save R50 on the order",  
                    "code": "TRYNEW50",  
                    "id": "try_new50_id"  
                }  
            ]  
        }  
    }  
      
    

### Apply coupon - endpoint sample request
    
    
          {  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ]  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 20000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 165000  
                }  
            },  
            "input":  
            {  
                "user_id": "919000090000",  
                "coupon":  
                {  
                    "code": "TRYNEW10"  
                }  
            }  
        },  
        "action": "data_exchange",  
        "sub_action": "apply_coupon",  
        "version": "1.0"  
    }  
      
    

### Apply coupon - endpoint sample response
    
    
          {  
        "sub_action": "apply_coupon",  
        "version": "1.0",  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ]  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 20000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "coupon":  
                {  
                    "code": "TRYNEW10",  
                    "discount":  
                    {  
                        "value": 16500,  
                        "offset": 100  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 148500  
                }  
            }  
        }  
    }  
      
    

### Remove coupon - endpoint sample request
    
    
          {  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ]  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 20000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "coupon":  
                {  
                    "code": "TRYNEW10",  
                    "discount":  
                    {  
                        "value": 16500,  
                        "offset": 100  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 148500  
                }  
            },  
            "input":  
            {  
                "user_id": "919000090000"  
            }  
        },  
        "action": "data_exchange",  
        "sub_action": "remove_coupon",  
        "version": "1.0"  
    }  
      
    

### Remove coupon - endpoint sample response
    
    
          {  
        "sub_action": "remove_coupon",  
        "version": "1.0",  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ]  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 20000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 165000  
                }  
            }  
        }  
    }  
      
    

### Apply shipping - endpoint sample request
    
    
          {  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ]  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 20000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "coupon":  
                {  
                    "code": "TRYNEW10",  
                    "discount":  
                    {  
                        "value": 16500,  
                        "offset": 100  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 148500  
                }  
            },  
            "input":  
            {  
                "user_id": "919000090000",  
                "selected_address":  
                {  
                    "name": "Nidhi Tripathi",  
                    "phone_number": "919000090000",  
                    "address": "Bandra Kurla Complex",  
                    "city": "Mumbai",  
                    "state": "Maharastra",  
                    "in_pin_code": "400051",  
                    "house_number": "12",  
                    "tower_number": "5",  
                    "building_name": "One BKC",  
                    "landmark_area": "Near BKC Circle"  
                }  
            }  
        },  
        "action": "data_exchange",  
        "sub_action": "apply_shipping",  
        "version": "1.0"  
    }  
      
    

### Apply shipping - endpoint sample response
    
    
          {  
        "sub_action": "apply_shipping",  
        "version": "1.0",  
        "data":  
        {  
            "order_details":  
            {  
                "reference_id": "abc.123_xyz-1",  
                "type": "physical-goods",  
                "currency": "INR",  
                "shipping_info":  
                {  
                    "country": "IN",  
                    "addresses":  
                    [  
                        {  
                            "name": "Nidhi Tripathi",  
                            "phone_number": "919000090000",  
                            "address": "Bandra Kurla Complex",  
                            "city": "Mumbai",  
                            "state": "Maharastra",  
                            "in_pin_code": "400051",  
                            "house_number": "12",  
                            "tower_number": "5",  
                            "building_name": "One BKC",  
                            "landmark_area": "Near BKC Circle"  
                        }  
                    ],  
                    "selected_address":  
                    {  
                        "name": "Nidhi Tripathi",  
                        "phone_number": "919000090000",  
                        "address": "Bandra Kurla Complex",  
                        "city": "Mumbai",  
                        "state": "Maharastra",  
                        "in_pin_code": "400051",  
                        "house_number": "12",  
                        "tower_number": "5",  
                        "building_name": "One BKC",  
                        "landmark_area": "Near BKC Circle"  
                    }  
                },  
                "order":  
                {  
                    "items":  
                    [  
                        {  
                            "amount":  
                            {  
                                "offset": 100,  
                                "value": 200000  
                            },  
                            "sale_amount":  
                            {  
                                "offset": 100,  
                                "value": 150000  
                            },  
                            "name": "Blue Elf Aloe",  
                            "quantity": 1,  
                            "country_of_origin": "India",  
                            "importer_name": "Lucky Shrub Imports and Exports",  
                            "importer_address":  
                            {  
                                "address_line1": "One BKC",  
                                "address_line2": "Bandra Kurla Complex",  
                                "city": "Mumbai",  
                                "zone_code": "MH",  
                                "postal_code": "400051",  
                                "country_code": "IN"  
                            }  
                        }  
                    ],  
                    "subtotal":  
                    {  
                        "offset": 100,  
                        "value": 150000  
                    },  
                    "shipping":  
                    {  
                        "offset": 100,  
                        "value": 40000  
                    },  
                    "tax":  
                    {  
                        "offset": 100,  
                        "value": 10000  
                    },  
                    "discount":  
                    {  
                        "offset": 100,  
                        "value": 15000,  
                        "description": "Additional 10% off"  
                    },  
                    "status": "pending",  
                    "expiration":  
                    {  
                        "timestamp": "1726627150",  
                        "description": "order expires in 5 min"  
                    }  
                },  
                "coupon":  
                {  
                    "code": "TRYNEW10",  
                    "discount":  
                    {  
                        "value": 16500,  
                        "offset": 100  
                    }  
                },  
                "total_amount":  
                {  
                    "offset": 100,  
                    "value": 168500  
                }  
            }  
        }  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Single products

Enabling coupons, realtime inventory, and pricing updates

Set up the endpoint

Implement Encryption/Decryption

Sample endpoint request syntax

Sample endpoint response

Link the checkout endpoint with payment configuration

Implement checkout endpoint logic

Multiple products

Checkout buttons

Creating checkout button templates

Request syntax

Post body

Post body parameters

Example request

Send a checkout button template

Request syntax

Post body

Post body parameters

Example request

Get coupons - endpoint sample request

Get coupons - endpoint sample response

Apply coupon - endpoint sample request

Apply coupon - endpoint sample response

Remove coupon - endpoint sample request

Remove coupon - endpoint sample response

Apply shipping - endpoint sample request

Apply shipping - endpoint sample response

* * *