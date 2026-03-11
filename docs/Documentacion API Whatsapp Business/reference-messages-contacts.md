# Contacts messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/contacts

---

# Contacts messages webhook reference

Updated: Oct 22, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for messages containing one or more contacts.

## Triggers

  * A WhatsApp user sends one or more contacts to a business.
  * A WhatsApp user sends one or more contacts to a business via a Click to WhatsApp ad.

## Syntax

Note that many contact object properties may be omitted if the WhatsApp user chooses not to share them, or their device prevents them from being shared.
    
    
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
                    "type": "contacts",  
                    "contacts": [  
                      {  
                        "addresses": [  
                          {  
                            "city": "",  
                            "country": "",  
                            "country_code": "",  
                            "state": "",  
                            "street": "",  
                            "type": "",  
                            "zip": ""  
                          }  
                        ],  
                        "birthday": "",  
                        "emails": [  
                          {  
                            "email": "",  
                            "type": ""  
                          }  
                        ],  
                        "name": {  
                          "formatted_name": "",  
                          "first_name": "",  
                          "last_name": "",  
                          "middle_name": "",  
                          "suffix": "",  
                          "prefix": ""  
                        },  
                        "org": {  
                          "company": "",  
                          "department": "",  
                          "title": ""  
                        },  
                        "phones": [  
                          {  
                            "phone": "",  
                            "wa_id": "",  
                            "type": ""  
                          }  
                        ],  
                        "urls": [  
                          {  
                            "url": "",  
                            "type": ""  
                          }  
                        ]  
                      }  
                    ],  
      
                      
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
``_String_|  Type of address, such as home or work.| `Home`  
``_String_|  Contact birthday.| `1999-01-23`  
``_String_|  City mentioned in the contact address.| `Menlo Park`  
``_String_|  ISO country code on the contact address.| `US`  
``_String_|  Country mentioned in the contact address.| `United States`  
``_String_|  Type of email, such as personal or work.| `Personal`  
``_String_|  Email address of the contact.| `bjohson@socialtsunami.com`  
``_String_|  Contact’s first name.| `Barbara`  
``_String_|  Contact’s formatted name.| `Barbara J. Johnson`  
``_String_|  Contact’s last name.| `Johnson`  
``_String_|  Contact’s middle name.| `Joana`  
``_String_|  Contact’s name prefix.| `Dr.`  
``_String_|  Contact’s name suffix.| `Esq.`  
``_String_|  Name of the company where the contact works.| `Social Tsunami`  
``_String_|  Name of the department where the contact works.| `Engineering`  
``_String_|  Contact’s job title.| `Software Engineer`  
``_String_|  Type of phone number. For example, cell, mobile, main, iPhone, home, work, etc.| `CELL`  
``_String_|  Contact’s phone number.| `+14125550829`  
``_String_|  State mentioned in the contact address.| `CA`  
``_String_|  Street mentioned in the contact address.| `1 Hacker Way`  
``_String_|  Type of website. For example, company, work, personal, Facebook Page, Instagram, etc.| `Company`  
``_String_|  Website URL associated with the contact or their company.| `socialtsunami.com`  
``_String_|  Contact’s WhatsApp number.| `14125550829`  
``_String_|  Zip code in the contact address.| `94025`  
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `+16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
## Example
    
    
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
                    "timestamp": "1744344496",  
                    "type": "contacts",  
                    "contacts": [  
                      {  
                        "name": {  
                          "first_name": "Barbara",  
                          "last_name": "Johnson",  
                          "formatted_name": "Barbara J. Johnson"  
                        },  
                        "org": {  
                          "company": "Social Tsunami"  
                        },  
                        "phones": [  
                          {  
                            "phone": "+1 (415) 555-0829",  
                            "wa_id": "14125550829",  
                            "type": "MOBILE"  
                          }  
                        ]  
                      }  
                    ]  
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