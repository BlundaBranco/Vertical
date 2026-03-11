# Sticker messages webhook reference

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/sticker

---

# Sticker messages webhook reference

Updated: Dec 11, 2025

This reference describes trigger events and payload contents for the WhatsApp Business Account **messages** webhook for messages containing a sticker.

## Triggers

  * A WhatsApp user sends a sticker to a business.
  * A WhatsApp user sends a sticker to a business via a Click to WhatsApp ad.

## Syntax
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "",
          "changes": [
            {
              "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                  "display_phone_number": "",
                  "phone_number_id": ""
                },
                "contacts": [
                  {
                    "profile": {
                      "name": ""
                    },
                    "wa_id": "",
                    "identity_key_hash": "" 
                  }
                ],
                "messages": [
                  {
                    "from": "",
                    "id": "",
                    "timestamp": "",
                    "type": "sticker",
                    "sticker": {
                      "mime_type": "",
                      "sha256": "",
                      "id": "",
                      "url": "",
                      "animated": 
                    },
    
                    
                    "referral": {
                      "source_url": "",
                      "source_id": "",
                      "source_type": "ad",
                      "body": "",
                      "headline": "",
                      "media_type": "",
                      "image_url": "",
                      "video_url": "",
                      "thumbnail_url": "",
                      "ctwa_clid": "",
                      "welcome_message": {
                        "text": ""
                      }
                    }
                  }
                ]
              },
              "field": "messages"
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
``_String_|  Identity key hash. Only included if you have enabled the [identity change check](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) feature.| `DF2lS5v2W6x=`  
``_Boolean_|  Boolean indicating if the sticker is animated (`true`) or not (`false`).| `true`  
``_String_|  Media asset ID. You can [perform a GET on this ID](/documentation/business-messaging/whatsapp/business-phone-numbers/media) to get the asset URL, then perform a GET on the returned URL (using your access token) to get the underlying asset.| `1003383421387256`  
``_String_|  Media asset MIME type.| `image/webp`  
``_String_|  Media asset SHA-256 hash.| `SfInY0gGKTsJlUWbwxC1k+FAD0FZHvzwfpvO0zX0GUI=`  
``_String_| **This JSON property is being released to developers gradually over several weeks, starting November 12, 2025, and may not be available to you immediately.** Media URL. You can query this URL directly with your access token to [download the media asset](/documentation/business-messaging/whatsapp/business-phone-numbers/media#download-media).| `https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=133...`  
``_String_|  Unix timestamp indicating when the webhook was triggered.| `1739321024`  
``_String_|  WhatsApp Business Account ID.| `102290129340398`  
``_String_|  WhatsApp message ID.| `wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQUFERjg0NDEzNDdFODU3MUMxMAA=`  
``_String_|  WhatsApp user ID. Note that a WhatsApp user’s ID and phone number may not always match.| `16505551234`  
``_String_|  WhatsApp user phone number. This is the same value returned by the API as the `input` value when sending a message to a WhatsApp user. Note that a WhatsApp user’s phone number and ID may not always match.| `+16505551234`  
``_String_|  WhatsApp user’s name as it appears in their profile in the WhatsApp client.| `Sheena Nelson`  
  
## Example
    
    
    {
      "object": "whatsapp_business_account",
      "entry": [
        {
          "id": "102290129340398",
          "changes": [
            {
              "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                  "display_phone_number": "15550783881",
                  "phone_number_id": "106540352242922"
                },
                "contacts": [
                  {
                    "profile": {
                      "name": "Sheena Nelson"
                    },
                    "wa_id": "16505551234"
                  }
                ],
                "messages": [
                  {
                    "from": "16505551234",
                    "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTRBNjU5OUFFRTAzODEwMTQ0RgA=",
                    "timestamp": "1744344496",
                    "type": "sticker",
                    "sticker": {
                      "mime_type": "image/webp",
                      "sha256": "wvqXMe6n7n1W0zphvLPoLj+s/NtKqmr3zZ7YzTP7xFI=",
                      "id": "1908647269898587",
                      "url": "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=133...",
                      "animated": true
                    }
                  }
                ]
              },
              "field": "messages"
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