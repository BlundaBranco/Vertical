# Interactive media carousel messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-media-carousel-messages

---

# Interactive media carousel messages

Updated: Dec 22, 2025

Interactive media carousel messages display a set of horizontally scrollable media cards. Each card can display an image or video header, body text, and either quick-reply buttons or a URL button.

For example, this is an interactive media card carousel message showing three cards in a scrollable area (highlighted by a dotted rectangle), each with an image header, body text, and URL button:

This is the same message, but using quick-reply buttons instead of URL buttons:

## Components

  * Messages must include between 2 and 10 cards.
  * Main message body text is required.
  * Main message headers, footers, and interactive components are not supported.
  * Cards must include either an image or video header. Other header types are not supported.
  * Card body text is optional.
  * Cards must include either one URL button, or one or more quick-reply buttons. Button types and numbers must match across all cards (for example, if you define a card with 2 quick-reply buttons, all cards must define exactly 2 quick-reply buttons).

## Request syntax
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "interactive",  
      "interactive": {  
        "type": "carousel",  
        "body": {  
          "text": ""  
        },  
        "action": {  
      
            
          "cards": [  
            {  
              "card_index": ,  
              "type": "cta_url",  
              "header": {  
                "type": "",  
                "": {  
                  "link": ""  
                }  
              },  
      
                
              "body": {  
                "text": ""  
              },  
      
              "action": {  
                  
                "name": "cta_url",  
                "parameters": {  
                  "display_text": "",  
                  "url": ""  
                }  
                  
                "buttons": [  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "",  
                      "title": ""  
                    }  
                  },  
                    
              }  
            },  
              
          ]  
        }  
      }  
    }'  
      
    

## Request parameters

Placeholder| Description| Example value  
---|---|---  
``  
  
_String_| **Required.**  
  
Access token.| `EAAJB...`  
``  
  
_String_| **Optional.**  
  
API version.| `v23.0`  
``  
  
_Integer_| **Required.**  
  
Business phone number ID.| `106540352242922`  
``  
  
_String_| **Optional.**  
  
Card body text. Max 160 characters, and up to 2 line breaks.| `*Blue Echeveria*\n\nA rosette-shaped succulent with powdery blue leaves, perfect for brightening up any space.`  
``  
  
_Integer_| **Required.**  
  
Zero-index card index. Cards will appear left to right in scrollable view, starting from 0.| `0`  
``  
  
_String_| **Required.**  
  
Header type. Value can be:   
  
`image` — Indicates a card image header.   
  
`video` — Indicates a card video header.   
  
See [Supported media types](/documentation/business-messaging/whatsapp/business-phone-numbers/media).| `image`  
``  
  
_String_| **Required.**  
  
Publicly available media asset URL.| `https://www.luckyshrub.com/assets/blue-echeveria.jpeg`  
``  
  
_String_| **Required.**  
  
Main message body text. Maximum 1024 characters.| `Of course! Here are three of our latest arrivals, each under $25:`  
``  
  
_String_| **Required if using a quick-reply button.**  
  
Quick-reply button ID. Maximum 20 characters.| `learn-blue-echeveria`  
``  
  
_String_| **Required if using a quick-reply button.**  
  
Quick-reply button label text. Maximum 20 characters.| `Learn more`  
``  
  
_String_| **Required if using a URL button.**  
  
URL button label text. Maximum 20 characters.| `Buy now`  
``  
  
_String_| **Required if using a URL button.**  
  
URL to load in the device’s default web browser when tapped by the user. Maximum 20 characters.| `https://shop.luckyshrub.com/latest/blue-echeveria`  
``  
  
_String_| **Required.**  
  
WhatsApp user phone number.| `16505551234`  
  
## Example requests

### URL buttons example

This example request sends a media carousel message composed of 3 cards, each with an image header, card body text, and a URL button.
    
    
    curl 'https://graph.facebook.com/v23.0/106540352242922/messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "16505551234",  
      "type": "interactive",  
      "interactive": {  
        "type": "carousel",  
        "body": {  
          "text": "Of course! Here are three of our latest arrivals, each under $25:"  
        },  
        "action": {  
          "cards": [  
            {  
              "card_index": 0,  
              "type": "cta_url",  
              "header": {  
                "type": "image",  
                "image": {  
                  "link": "https://www.luckyshrub.com/assets/blue-echeveria.jpeg"  
                }  
              },  
              "body": {  
                "text": "*Blue Echeveria*\n\nA rosette-shaped succulent with powdery blue leaves, perfect for brightening up any space."  
              },  
              "action": {  
                "name": "cta_url",  
                "parameters": {  
                  "display_text": "Buy now",  
                  "url": "https://shop.luckyshrub.com/latest/blue-echeveria"  
                }  
              }  
            },  
            {  
              "card_index": 1,  
              "type": "cta_url",  
              "header": {  
                "type": "image",  
                "image": {  
                  "link": "https://www.luckyshrub.com/assets/zebra-haworthia.jpeg"  
                }  
              },  
              "body": {  
                "text": "*Zebra Haworthia*\n\nStriking white stripes on deep green leaves give this compact succulent a bold, modern look."  
              },  
              "action": {  
                "name": "cta_url",  
                "parameters": {  
                  "display_text": "Buy now",  
                  "url": "https://shop.luckyshrub.com/latest/zebra-haworthia"  
                }  
              }  
            },  
            {  
              "card_index": 2,  
              "type": "cta_url",  
              "header": {  
                "type": "image",  
                "image": {  
                  "link": "https://www.luckyshrub.com/assets/panda-plant.jpeg"  
                }  
              },  
              "body": {  
                "text": "*Panda Plant*\n\nSoft, fuzzy leaves with chocolate-brown edges—adorable and easy to care for."  
              },  
              "action": {  
                "name": "cta_url",  
                "parameters": {  
                  "display_text": "Buy now",  
                  "url": "https://shop.luckyshrub.com/latest/panda-plant"  
                }  
              }  
            }  
          ]  
        }  
      }  
    }'  
      
    

### Quick-reply buttons example

This example request sends a media carousel message composed of 3 cards, each with an image header, card body text, and two quick-reply buttons.
    
    
    curl 'https://graph.facebook.com/v23.0/106540352242922/messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "16505551234",  
      "type": "interactive",  
      "interactive": {  
        "type": "carousel",  
        "body": {  
          "text": "Of course! Here are three of our latest arrivals, each under $25:"  
        },  
        "action": {  
          "cards": [  
            {  
              "card_index": 0,  
              "type": "cta_url",  
              "header": {  
                "type": "image",  
                "image": {  
                  "link": "https://www.luckyshrub.com/assets/blue-echeveria.jpeg"  
                }  
              },  
              "body": {  
                "text": "*Blue Echeveria*\n\nA rosette-shaped succulent with powdery blue leaves, perfect for brightening up any space."  
              },  
              "action": {  
                "buttons": [  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "learn-blue-echeveria",  
                      "title": "Learn more"  
                    }  
                  },  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "fav-blue-echeveria",  
                      "title": "Add to favorites"  
                    }  
                  }  
                ]  
              }  
            },  
            {  
              "card_index": 1,  
              "type": "cta_url",  
              "header": {  
                "type": "image",  
                "image": {  
                  "link": "https://www.luckyshrub.com/assets/zebra-haworthia.jpeg"  
                }  
              },  
              "body": {  
                "text": "*Zebra Haworthia*\n\nStriking white stripes on deep green leaves give this compact succulent a bold, modern look."  
              },  
              "action": {  
                "buttons": [  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "learn-zebra-haworthia",  
                      "title": "Learn more"  
                    }  
                  },  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "fav-zebra-haworthia",  
                      "title": "Add to favorites"  
                    }  
                  }  
                ]  
              }  
            },  
            {  
              "card_index": 2,  
              "type": "cta_url",  
              "header": {  
                "type": "image",  
                "image": {  
                  "link": "https://www.luckyshrub.com/assets/panda-plant.jpeg"  
                }  
              },  
              "body": {  
                "text": "*Panda Plant*\n\nSoft, fuzzy leaves with chocolate-brown edges—adorable and easy to care for."  
              },  
              "action": {  
                "buttons": [  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "learn-panda-plant",  
                      "title": "Learn more"  
                    }  
                  },  
                  {  
                    "type": "quick_reply",  
                    "quick_reply": {  
                      "id": "fav-panda-plant",  
                      "title": "Add to favorites"  
                    }  
                  }  
                ]  
              }  
            }  
          ]  
        }  
      }  
    }'  
      
    

## Example response
    
    
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

Components

Request syntax

Request parameters

Example requests

URL buttons example

Quick-reply buttons example

Example response

* * *