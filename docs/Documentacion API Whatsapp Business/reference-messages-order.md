# Order messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/order

---

# Order messages webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for order messages.

## Triggers

  * A WhatsApp user orders one or more products via a [catalog, single-, or multi-product message](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services).

## Syntax
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "",  
                  "phone_number_id": ""  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": ""  
                    },  
                    "wa_id": "",  
                    "identity_key_hash": ""   
                  }  
                ],  
                "messages": [  
                  {  
                    "from": "",  
                    "id": "",  
                    "timestamp": "",  
                    "type": "order",  
                    "order": {  
                      "catalog_id": "",  
                      "text": "",  
                      "product_items": [  
                        {  
                          "product_retailer_id": "",  
                          "quantity": ,  
                          "item_price": ,  
                          "currency": ""  
                        }  
                      ]  
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
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Business display phone number.| `15550783881`  
``_String_|  Business phone number ID.| `106540352242922`  
``_String_|  Catalog currency code.| `USD`  
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_String_|  Text accompanying the order.| `Love these!`  
``_String_| [Product catalog ID](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services).| `194836987003835`  
``_String_| [Product ID](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services).| `di9ozbzfi4`  
``_Integer_|  Individual product price.| `7.99`  
``_Integer_|  Product quantity.| `2`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
## Example

This example webhook describes an order placed by a WhatsApp user for 3 products via an interactive catalog message.
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "102290129340398",  
          "changes": [  
            {  
              "value": {  
                "messaging_product": "whatsapp",  
                "metadata": {  
                  "display_phone_number": "15550783881",  
                  "phone_number_id": "106540352242922"  
                },  
                "contacts": [  
                  {  
                    "profile": {  
                      "name": "Sheena Nelson"  
                    },  
                    "wa_id": "16505551234"  
                  }  
                ],  
                "messages": [  
                  {  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=",  
                    "timestamp": "1750096325",  
                    "type": "order",  
                    "order": {  
                      "catalog_id": "194836987003835",  
                      "text": "Love these!",  
                      "product_items": [  
                        {  
                          "product_retailer_id": "di9ozbzfi4",  
                          "quantity": 2,  
                          "item_price": 30,  
                          "currency": "USD"  
                        },  
                        {  
                          "product_retailer_id": "nqryix03ez",  
                          "quantity": 1,  
                          "item_price": 25,  
                          "currency": "USD"  
                        }  
                      ]  
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
      
    

Did you find this page helpful?

ON THIS PAGE

Triggers

Syntax

Parameters

Example

* * *