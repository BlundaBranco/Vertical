# Text messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/text

---

# Text messages webhook reference

Updated: Oct 27, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for messages containing only text.

## Triggers

  * A WhatsApp user sends a text message to a WhatsApp business phone number.
  * A WhatsApp user forwards a text message to a business phone number.
  * A WhatsApp user uses the **Message business** button in a [catalog, single-, or multi-product message](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services) to send a message to the business.
  * A WhatsApp user sends a text message to a business via a [Click to WhatsApp ad⁠](https://www.facebook.com/business/help/447934475640650?id=371525583593535) (an ad with a WhatsApp **message destination**).

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
                    "type": "text",  
                    "text": {  
                      "body": ""  
                    },  
      
                      
                    "context": {  
                      "from": "",  
                      "id": "",  
                      "referred_product": {  
                        "catalog_id": "",  
                        "product_retailer_id": ""  
                      }  
                    },  
      
                      
                    "context": {  
                      "forwarded": true,              
                      "frequently_forwarded": true    
                    },  
      
                      
                    "referral": {  
                      "source_url": "",  
                      "source_id": "",  
                      "source_type": "ad",  
                      "body": "",  
                      "headline": "",  
                      "media_type": "",  
                      "image_url": "",  
                      "video_url": "",  
                      "thumbnail_url": "",  
                      "ctwa_clid": "",    
                      "welcome_message": {  
                        "text": ""  
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
      
    

## Parameters

Placeholder |  Description |  Example value   
---|---|---  
``_String_|  Click to WhatsApp ad click ID.The `ctwa_clid` property is omitted entirely for messages originating from an ad in WhatsApp Status ([WhatsApp Status ad placements⁠](https://www.facebook.com/business/help/1074444721456755)).| `Aff-n8ZTODiE79d22KtAwQKj9e_mIEOOj27vDVwFjN80dp4_0NiNhEgpGo0AHemvuSoifXaytfTzcchptiErTKCqTrJ5nW1h7IHYeYymGb5K5J5iTROpBhWAGaIAeUzHL50`  
``_String_|  Click to WhatsApp ad greeting text.| `Hi there! Let us know how we can help!`  
``_String_|  Click to WhatsApp ad headline.| `Chat with us`  
``_String_|  Click to WhatsApp ad ID.| `120226305854810726`  
``_String_|  Click to WhatsApp ad image URL. Only included if the ad is an image ad.| `https://scontent.xx.fbcdn.net/v/t45.1...`  
``_String_|  Click to WhatsApp ad media type. Values can be:`image` — Indicates an image ad.`video` — Indicates a video ad.| `image`  
``_String_|  Click to WhatsApp ad primary text.| `Summer succulents are here!`  
``_String_|  Click to WhatsApp ad URL.| `https://fb.me/3cr4Wqqkv`  
``_String_|  Click to WhatsApp ad video thumbnail URL. Only included if ad is a video ad.| `https://scontent.xx.fbcdn.net/v/t45.3...`  
``_String_|  Click to WhatsApp ad video URL. Only included if ad is a video ad.| `https://scontent.xx.fbcdn.net/v/t45.2...`  
``_String_|  Business display phone number.| `15550783881`  
``_String_|  Business phone number ID.| `106540352242922`  
``_String_|  WhatsApp message ID of the message the WhatsApp user used to access the Message business button.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgARGA9wcm9kdWN0X2lucXVpcnkA`  
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_String_|  Text body of the message.| `Is it available in another color?`  
``_String_| [Product catalog ID](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services).| `194836987003835`  
``_String_| [Product ID](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services).| `di9ozbzfi4`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `+16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
## Examples

### Text message

This example describes a text message sent by a WhatsApp user (the user just typed something into the chat field and sends).
    
    
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
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTRBNjU5OUFFRTAzODEwMTQ0RgA=",  
                    "timestamp": "1749416383",  
                    "type": "text",  
                    "text": {  
                      "body": "Does it come in another color?"  
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
      
    

### Message business button

This example describes a text message sent by a WhatsApp user who used a **Message business** button when [viewing a single product](/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services) to send the message.
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "419561257915477",  
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
                    "context": {  
                      "from": "15550783881",  
                      "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgARGA9wcm9kdWN0X2lucXVpcnkA",  
                      "referred_product": {  
                        "catalog_id": "194836987003835",  
                        "product_retailer_id": "di9ozbzfi4"  
                      }  
                    },  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTA2NTUwRkNEMDdFQjJCRUU0NQA=",  
                    "timestamp": "1750016800",  
                    "text": {  
                      "body": "Is this still available?"  
                    },  
                    "type": "text"  
                  }  
                ]  
              },  
              "field": "messages"  
            }  
          ]  
        }  
      ]  
    }  
      
    

### Click to WhatsApp ad

This example describes a text message sent by a WhatsApp user who tapped a [Click to WhatsApp ad⁠](https://www.facebook.com/business/help/447934475640650) and sent the generated message to the business.

Note that for messages originating from an ad in WhatsApp Status ([WhatsApp Status ad placements⁠](https://www.facebook.com/business/help/1074444721456755)) the `referral.ctwa_clid` property is omitted entirely.
    
    
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
                    "referral": {  
                      "source_url": "https://fb.me/3cr4Wqqkv",  
                      "source_id": "120226305854810726",  
                      "source_type": "ad",  
                      "body": "Summer Succulents are here!",  
                      "headline": "Chat with us",  
                      "media_type": "image",  
                      "image_url": "https://scontent.xx.fbcdn.net/v/t45.1...",  
                      "ctwa_clid": "Aff-n8ZTODiE79d22KtAwQKj9e_mIEOOj27vDVwFjN80dp4_0NiNhEgpGo0AHemvuSoifXaytfTzcchptiErTKCqTrJ5nW1h7IHYeYymGb5K5J5iTROpBhWAGaIAeUzHL50",  
                      "welcome_message": {  
                        "text": "Hi there! Let us know how we can help!"  
                      }  
                    },  
                    "from": "16505551234",  
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUQ0N0VFMDA2MTQ0RkJFNkNDNAA=",  
                    "timestamp": "1750275992",  
                    "text": {  
                      "body": "Can I get more info about this?"  
                    },  
                    "type": "text"  
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

Examples

Text message

Message business button

Click to WhatsApp ad

* * *