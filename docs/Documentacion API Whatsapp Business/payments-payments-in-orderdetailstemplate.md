# Send order details template message

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-in/orderdetailstemplate

---

# Send order details template message

Updated: Oct 31, 2025

## Overview

Order details message template is a template with [interactive components](/documentation/business-messaging/whatsapp/templates/overview#components) that extends the call-to-action button to support sending order details and provides a richer experience compared to templates with only text components.

Once your Order details message templates have been created and approved, you can use the approved template to send the template message with order or bill information to prompt them to make a payment.

Before sending an order details template message, businesses need to create a template with an “open order details” call-to-action button. See [Create Message Templates for Your WhatsApp Business Account⁠](https://www.facebook.com/business/help/2055875911147364?id=2129163877102343) for more information on prerequisites and how to create a template.

## Creating an order details template on Whatsapp Manager

To create an order details template, business needs a business portfolio with a WhatsApp Business Account.

In **WhatsApp Manager** > **Account tools** :

  1. Click on `create template`
  2. Select `Utility` category to expand `Order details message` option
  3. Enter the desired `template name` and supported `locale`
     * Depending on the number of `locales` selected there will be an equal number of template variants and businesses need to fill in the template details in respective locale.
  4. Please fill in template components such as `Header`, `Body` and optional `footer` text and submit.
  5. Once submitted, templates will be [categorized as per the guidelines](/documentation/business-messaging/whatsapp/templates/template-categorization#template-category-guidelines) and undergo the [approval process](/documentation/business-messaging/whatsapp/templates/template-review#approval-process) refrain from having [marketing content](/documentation/business-messaging/whatsapp/templates/template-categorization#marketing-templates) as part of template components.
  6. The template will be approved or rejected after the template components are verified by the system. 
     * If business believe the category determined is not consistent with our template category guidelines, please confirm there are no [common issues](/documentation/business-messaging/whatsapp/templates/template-review) that leads to rejections and if you are looking for further clarification you may [request a review](/documentation/business-messaging/whatsapp/templates/template-categorization#requesting-review) of the template via [Business Support⁠](https://business.facebook.com/business-support-home/)
  7. Once approved template [status](/documentation/business-messaging/whatsapp/templates/overview#template-status) will be changed to `ACTIVE`
     * Please be informed that template’s status can change automatically from `ACTIVE` to `PAUSED` or `DISABLED` based on customer feedback and engagement. We recommend that you [monitor status changes](/documentation/business-messaging/whatsapp/templates/template-review#common-rejection-reasons) and take appropriate actions whenever such change occurs.

## Creating an order details template using template creation APIs

To create a template through API and understand the general syntax, required categories and components please refer to [templates API](/documentation/business-messaging/whatsapp/templates/overview#creating-templates). All the guidelines outlined above in creating templates apply through API as well.

Order details template is categorized as “Utility” template and apart from ‘name’ and ‘language’ of choice, it has general template components such as HEADER, BODY, FOOTER and a fixed BUTTON with “ORDER_DETAILS” type and “Review and Pay” text.
    
    
    POST https://graph.facebook.com///message_templates  
    {  
      "name": "",  
      "language": "",  
      "category": "UTILITY",  
      /* Businesses can create the order details template under marketing category by including display_format attribute */  
      /* "display_format": "order_details",*/  
      "components": [  
        {  
          "type": "HEADER",  
          "format": "TEXT",  
          "text": ""  
        },  
        {  
          "type": "BODY",  
          "text": ""  
        },  
        {  
          "type": "FOOTER",  
          "text": ""  
        },  
        {  
          "type": "BUTTONS",  
          "buttons": [  
            {  
              "type": "ORDER_DETAILS",  
              "text": "Review and Pay"  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Sending order details template message

Order details template message allows the businesses to send invoice(order_details) message as predefined `Open order details` call-to-action button component parameters. It supports businesses to send all payment integration (such as [UPI Intent](/documentation/business-messaging/whatsapp/payments/payments-in/upi-intent#step-2--assemble-the-interactive-object), [Payment Gateway](/documentation/business-messaging/whatsapp/payments/payments-in/pg#step-1) or [Payment Links](/documentation/business-messaging/whatsapp/payments/payments-in/payment-links#step-2--assemble-the-interactive-object)) integration as button parameters.

To send an order details template message, make a `POST` call to `/PHONE_NUMBER_ID/messages` endpoint and attach a message object with `type=template`. Then, add a template object with a predefined `Open order details` call-to-action button.

For example following sample describes how to send [UPI Intent](/documentation/business-messaging/whatsapp/payments/payments-in/upi-intent#step-2--assemble-the-interactive-object) in order details template message parameters to prompt the consumer to make a payment.

The below example shows an example payload with `upi` as the payment type. For other variants of the `payment_settings` block (for example, for the type `payment_gateway` type), refer to this [document](/documentation/business-messaging/whatsapp/payments/payments-in/pg#step-1).
    
    
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "template",  
      "template": {  
        "name": "",  
        "language": {  
          "policy": "deterministic",  
          "code": ""  
        },  
        "components": [  
          {  
            "type": "header",  
            "parameters": [  
              {  
                "type": "image", // Uses header with image as an example  
                "image": {  
                  "link": "http(s)://the-url"  
                }  
              }  
            ]  
          },  
          {  
            "type": "button",  
            "sub_type": "order_details",  
            "index": 0,  
            "parameters": [  
              {  
                "type": "action",  
                "action": {  
                  "order_details": {  
                    "currency": "INR",  
                    "order": {  
                      "discount": {  
                        "offset": 100,  
                        "value": 250  
                      },  
                      "items": [  
                        {  
                          "amount": {  
                            "offset": 100,  
                            "value": 400  
                          },  
                          "name": "",  
                          "quantity": 1,  
                          "retailer_id": "",  
                          "country_of_origin": "",  
                          "importer_name": "",  
                          "importer_address": {  
                            "address_line1": "",  
                            "city": "",  
                            "country_code": "",  
                            "postal_code": ""  
                          }  
                        }  
                      ],  
                      "shipping": {  
                        "offset": 100,  
                        "value": 0  
                      },  
                      "status": "pending",  
                      "subtotal": {  
                        "offset": 100,  
                        "value": 400  
                      },  
                      "tax": {  
                        "offset": 100,  
                        "value": 500  
                      }  
                    },  
                    "payment_settings": [  
                      {  
                        "type": "upi_intent_link",  
                        "upi_intent_link": {  
                          "link": "upi://pay?pa=merchant_vpa&pn=merchant%20Name&mc=mc_code&purpose=purpose_code&tr=transaction_record"  
                        }  
                      }  
                    ],  
                    "payment_configuration": "unique_payment_config_id",  
                    "payment_type": "upi",  
                    "reference_id": "reference_id_value",  
                    "total_amount": {  
                      "offset": 100,  
                      "value": 650  
                    },  
                    "type": "digital-goods"  
                  }  
                }  
              }  
            ]  
          }  
        ]  
      }  
    }  
      
    

Once the order details template message is delivered, a successful response will include an object with an identifier prefixed with wamid. Use the ID listed after wamid to track your message status.
    
    
    {  
        "messaging_product": "whatsapp",  
        "contacts": [  
            {  
                "input": "",  
                "wa_id": ""  
            }  
        ],  
        "messages": [  
            {  
                "id": "wamid.ID"  
            }  
        ]  
    }  
      
    

## Post order details template message flow

After the order details template message delivery the rest of the payment flow is the same as “Sending invoice in customer session window” and depends on the chosen [payment integration](/documentation/business-messaging/whatsapp/payments/payments-in/overview) order details parameters. For more details refer [UPI Intent](/documentation/business-messaging/whatsapp/payments/payments-in/upi-intent#step-5--consumer-pays-for-the-order), [Payment Gateway](/documentation/business-messaging/whatsapp/payments/payments-in/pg#step-2--receive-webhook-about-transaction-status) and [Payment Links](/documentation/business-messaging/whatsapp/payments/payments-in/payment-links#step-5--consumer-pays-for-the-order) post payments flows.

Did you find this page helpful?

ON THIS PAGE

Overview

Creating an order details template on Whatsapp Manager

Creating an order details template using template creation APIs

Sending order details template message

Post order details template message flow

* * *