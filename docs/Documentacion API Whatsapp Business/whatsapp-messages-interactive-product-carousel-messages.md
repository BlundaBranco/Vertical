# Interactive product carousel messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-product-carousel-messages

---

# Interactive product carousel messages

Updated: Dec 4, 2025

The interactive product carousel message enables businesses to send horizontally scrollable product cards within WhatsApp conversations, allowing users to browse and engage with products directly in-thread.

This format integrates with the Product Catalog and supports Single Product Message (SPM) actions on each card, providing a seamless and interactive shopping experience via the WhatsApp Business APIs and mobile clients

## How to build a product carousel message

The product carousel message contains a `card` object. You must add 2 card objects to your message, and can add a maximum of 10. Each card exists in a `cards[]` array and must be given a `"card_index"` value of `0` through `9`.

The type of each card must be set to `"product"`, and each card must reference the same `"catalog_id"`.

You must add a message body to the message, and no header, footer, or buttons are allowed.

Lastly, each card must specify the product and catalog identifiers `"product_retailer_id"` and `"catalog_id"`.

### The `card` object
    
    
    ...  
    {  
      "card_index": 0,  
      "type": "product",  
      "action": {  
        "product_retailer_id": "abc123xyz",  
        "catalog_id": "123456789"  
    }  
    ...  
      
    

## Request Syntax
    
    
    curl 'https://graph.facebook.com///messages' \  
      -H 'Content-Type: application/json' \  
      -H 'Authorization: Bearer ' \  
      -d '{  
        "messaging_product": "whatsapp",  
        "recipient_type": "individual",  
        "to": "",  
        "type": "interactive", // must be interactive  
        "interactive": {  
          "type": "carousel", // must be carousel  
          "body": {  
            "text": ""  
          },  
          "action": {  
            "cards": [  
              {  
                "card_index": 0,  
                "type": "product",  
                "action": {  
                  "product_retailer_id": "abc123xyz",  
                  "catalog_id": "123456789"  
                }  
              }  
              // additional product cards  
            ]  
          }  
        }  
      }'  
      
    

## Request parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Required.** Maximum 1024 characters.| `Which option do you prefer?`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Card Object Parameters
    
    
    ...  
    {  
      "card_index": ,  
      "type": "product",  
      "action": {  
        "product_retailer_id": "",  
        "catalog_id": ""  
    }  
    ...  
      
    

Placeholder |  Description |  Sample value   
---|---|---  
``  
_Integer_| **Required**  
Unique index for each card (0-9). Must not repeat within the message.| `2`  
``  
_String_| **Required**  
The unique retailer ID of the product in the catalog.| `"0JkSUu4qizuXv"`  
``  
_String_| **Required**  
The unique ID of the catalog containing the product.| `"Lq1ZtoWL5OkljTerAW"`  
  
## Example Request
    
    
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "1234567890",  
      "type": "interactive",  
      "interactive": {  
        "type": "carousel",  
        "body": {  
          "text": "Check out our featured products!"  
        },  
        "action": {  
          "cards": [  
            {  
              "card_index": 0,  
              "type": "product",  
              "action": {  
                "product_retailer_id": "abc123xyz",  
                "catalog_id": "123456789"  
              }  
            },  
            {  
              "card_index": 1,  
              "type": "product",  
              "action": {  
                "product_retailer_id": "def456uvw",  
                "catalog_id": "123456789"  
              }  
            }  
          ]  
        }  
      }  
    }  
      
    

## Example Response
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "+16505551234",  
          "wa_id": "16505551234"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA"  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

How to build a product carousel message

The card object

Request Syntax

Request parameters

Card Object Parameters

Example Request

Example Response

* * *