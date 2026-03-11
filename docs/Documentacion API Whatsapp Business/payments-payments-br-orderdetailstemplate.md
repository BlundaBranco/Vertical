# Send order details template message

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-br/orderdetailstemplate

---

# Send order details template message

Updated: Nov 4, 2025

## Overview

Order details message template is a template with [interactive components](/documentation/business-messaging/whatsapp/templates/overview#components) that extends the call-to-action button to support sending order details and provides a richer experience compared to templates with only text components.

Once your Order details message templates have been created and approved, you can use the approved template to send the template message with order or bill information to prompt customers to make a payment.

Before sending an order details template message, businesses need to create a template with an “order details” call-to-action button. See [Create Message Templates for Your WhatsApp Business Account⁠](https://www.facebook.com/business/help/2055875911147364?id=2129163877102343) for more information on prerequisites and how to create a template.

## Creating an order details template on Whatsapp Manager

To create an order details template, business needs a business portfolio with a WhatsApp Business Account.

In **WhatsApp Manager** > **Account tools** :

  1. Click on `create template`
  2. Select `Utility` or `Marketing` category to see the `Order details` template format option.
  3. Select `Order details` template format, and click **Next**
  4. Enter the desired `template name` and supported `locale`
     * Depending on the number of `locales` selected there will be an equal number of template variants and businesses need to fill in the template details in respective locale.
  5. Fill in template components such as `Header`, `Body` and optional `footer` text. 
     * For the `Header`, you can choose one of three media types: `Text`, `Image` or `Document`. Choose `Document` if you want to send **PDF files** in the header of this template.
  6. Click submit.
  7. Once submitted, templates will be [categorized as per the guidelines](/documentation/business-messaging/whatsapp/templates/template-categorization#template-category-guidelines) and undergo the [approval process](/documentation/business-messaging/whatsapp/templates/template-review#approval-process).
  8. The template will be approved or rejected after the template components are verified by the system. 
     * If business believe the category determined is not consistent with our template category guidelines, please confirm there are no [common issues](/documentation/business-messaging/whatsapp/templates/template-review) that leads to rejections and if you are looking for further clarification you may [request a review](/documentation/business-messaging/whatsapp/templates/template-categorization#requesting-review) of the template via [Business Support⁠](https://business.facebook.com/business-support-home/)
  9. Once approved template [status](/documentation/business-messaging/whatsapp/templates/overview#template-status) will be changed to `ACTIVE`
     * Please be informed that template’s status can change automatically from `ACTIVE` to `PAUSED` or `DISABLED` based on customer feedback and engagement. We recommend that you [monitor status changes](/documentation/business-messaging/whatsapp/templates/template-review#common-rejection-reasons) and take appropriate actions whenever such change occurs.

## Creating an order details template using template creation APIs

To create a template through API and understand the general syntax, required categories and components please refer to [templates API](/documentation/business-messaging/whatsapp/templates/overview#creating-templates). All the guidelines outlined above in creating templates apply through API as well.

Order details template can be categorized as “Utility” or “Marketing” template and apart from ‘name’ and ‘language’ of choice, it has general template components such as HEADER, BODY, FOOTER and a fixed BUTTON with “ORDER_DETAILS” type.
    
    
    POST https://graph.facebook.com///message_templates  
    {  
      "name": "",  
      "language": "",  
      "category": "UTILITY or MARKETING",  
      "display_format": "ORDER_DETAILS",  
      "components": [  
        {  
          "type": "HEADER",  
          "format": "TEXT" OR "IMAGE" OR "DOCUMENT",  
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
              "text": ""  
            }  
          ]  
        }  
      ]  
    }  
      
    

## Sending order details template message

Order details template message allows the businesses to send invoice (order_details) message as predefined `order details` call-to-action button component parameters. It supports businesses to send all payment integration (such as [Dynamic Pix code](/documentation/business-messaging/whatsapp/payments/payments-br/offsite-pix), [Payment Links](/documentation/business-messaging/whatsapp/payments/payments-br/payment-links), [Boleto](/documentation/business-messaging/whatsapp/payments/payments-br/boleto), etc) integration as button parameters.

To send an order details template message, make a `POST` call to `/PHONE_NUMBER_ID/messages` endpoint and attach a message object with `type=template`. Then, add a template object with a predefined `order details` call-to-action button.

You can optionally include a **PDF file** as attachment in the `header` component of the template message. To do so, you use `type=document` in the `parameter` object of the `header` component object, as described in our [Components](/documentation/business-messaging/whatsapp/templates/components#media-header) document.

For example following sample describes how to send [Copy Pix code](/documentation/business-messaging/whatsapp/payments/payments-br/offsite-pix) in order details template message parameters to prompt the consumer to make a payment.
    
    
    POST https://graph.facebook.com///messages  
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
            "type": "button",  
            "sub_type": "order_details",  
            "index": 0,  
            "parameters": [  
              {  
                "type": "action",  
                "action": {  
                  "order_details": {  
                    "reference_id": "",  
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

After the order details template message delivery the rest of the payment flow is the same as “Sending invoice in customer session window” and depends on the chosen [payment integration](/documentation/business-messaging/whatsapp/payments/payments-br/overview) order details parameters.

Did you find this page helpful?

ON THIS PAGE

Overview

Creating an order details template on Whatsapp Manager

Creating an order details template using template creation APIs

Sending order details template message

Post order details template message flow

* * *