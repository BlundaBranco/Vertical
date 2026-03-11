# Contacts messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/contacts-messages

---

# Contacts messages

Updated: Nov 3, 2025

Contacts messages allow you to send rich contact information directly to WhatsApp users, such as names, phone numbers, physical addresses, and email addresses.

When a WhatsApp user taps the message’s profile arrow, it displays the contact’s information in a profile view:

Each message can include information for up to 257 contacts, although it is recommended to send fewer for usability and negative feedback reasons.

Please be aware that a contact’s metadata (e.g., addresses, birthdays, emails) may not be supported by the recipient, especially on their primary device. Please refer to this [documentation⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F378279804439436%2F%3Fcms_platform%3Dandroid&h=AT7CZduuurPUWAhA9GJJjdhNCcgbQGAXoAKp0suI36L4Bqgt7RwWQRGsgFDkU1ExdK1DYonRFyRffiXnQekYOSiPMHCsJTSGDLTJm5bwwpZehFpsev-oshxyDh3dA6VVi0NNGVwQirX5A6v880_0ig) for the definitions of primary and linked devices.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send a contacts message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "to": "",  
      "type": "contacts",  
      "contacts": [  
        {  
          "addresses": [  
            {  
              "street": "",  
              "city": "",  
              "state": "",  
              "zip": "",  
              "country": "",  
              "country_code": "",  
              "type": ""  
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
              "phone": "",  
              "type": "",  
              "wa_id": ""  
            }  
              
          ],  
          "urls": [  
            {  
              "url": "",  
              "type": ""  
            }  
              
          ]  
        }  
      ]  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Type of address, such as home or work.| `Home`  
``_String_| **Optional.** Graph API version.| v25.0  
``_String_| **Optional.** Contact’s birthday. Must be in `YYYY-MM-DD` format.| `1999-01-23`  
``_String_| **Optional.** City where the contact resides.| `Menlo Park`  
``_String_| **Optional.** Name of the company where the contact works.| `Lucky Shrub`  
``_String_| **Optional.** ISO two-letter country code.| `US`  
``_String_| **Optional.** Country name.| `United States`  
``_String_| **Optional.** Department within the company.| `Legal`  
``_String_| **Optional.** Email address of the contact.| `bjohnson@luckyshrub.com`  
``_String_| **Optional.** Type of email, such as personal or work.| `Work`  
``_String_| **Optional.** Contact’s first name.| `Barbara`  
``_String_| **Required.** Contact’s formatted name. This will appear in the message alongside the profile arrow button.| `Barbara J. Johnson`  
``_String_| **Optional.** Contact’s job title.| `Lead Counsel`  
``_String_| **Optional.** Contact’s last name.| `Johnson`  
``_String_| **Optional.** Contact’s middle name.| `Joana`  
``_String_| **Optional.** WhatsApp user phone number.| `+16505559999`  
``_String_| **Optional.** Type of phone number. For example, cell, mobile, main, iPhone, home, work, etc.| `Home`  
``_String_| **Optional.** Prefix for the contact’s name, such as Mr., Ms., Dr., etc.| `Dr.`  
``_String_| **Optional.** Two-letter state code.| `CA`  
``_String_| **Optional.** Street address of the contact.| `1 Lucky Shrub Way`  
``_String_| **Optional.** Suffix for the contact’s name, if applicable.| `Esq.`  
``_String_| **Optional.** Type of website. For example, company, work, personal, Facebook Page, Instagram, etc.| `Company`  
``_String_| **Optional.** Website URL associated with the contact or their company.| `https://www.luckyshrub.com`  
``_String_| **Optional.** WhatsApp user ID. If omitted, the message will display an Invite to WhatsApp button instead of the standard buttons.See Button Behavior below.| `19175559999`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
``_String_| **Optional.** Postal or ZIP code.| `94025`  
  
## Button behavior

If you include the contact’s WhatsApp ID in the message (via the `wa_id` property), the message will include a **Message** and a **Save contact** button:

If the WhatsApp user taps the **Message** button, it will open a new message with the contact. If the user taps the **Save contact** button, they will be given the option to save the contact as a new contact, or to update an existing contact.

If you omit the `wa_id` property, both buttons will be replaced with an **Invite to WhatsApp** button:

## Example request

Example request to send a contacts message with two physical addresses, two email addresses, two phone numbers, and two website URLs.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "to": "+16505551234",
      "type": "contacts",
      "contacts": [
        {
          "addresses": [
            {
              "street": "1 Lucky Shrub Way",
              "city": "Menlo Park",
              "state": "CA",
              "zip": "94025",
              "country": "United States",
              "country_code": "US",
              "type": "Office"
            },
            {
              "street": "1 Hacker Way",
              "city": "Menlo Park",
              "state": "CA",
              "zip": "94025",
              "country": "United States",
              "country_code": "US",
              "type": "Pop-Up"
            }
          ],
          "birthday": "1999-01-23",
          "emails": [
            {
              "email": "bjohnson@luckyshrub.com",
              "type": "Work"
            },
            {
              "email": "bjohnson@luckyshrubplants.com",
              "type": "Work (old)"
            }
          ],
          "name": {
            "formatted_name": "Barbara J. Johnson",
            "first_name": "Barbara",
            "last_name": "Johnson",
            "middle_name": "Joana",
            "suffix": "Esq.",
            "prefix": "Dr."
          },
          "org": {
            "company": "Lucky Shrub",
            "department": "Legal",
            "title": "Lead Counsel"
          },
          "phones": [
            {
              "phone": "+16505559999",
              "type": "Landline"
            },
            {
              "phone": "+19175559999",
              "type": "Mobile",
              "wa_id": "19175559999"
            }
          ],
          "urls": [
            {
              "url": "https://www.luckyshrub.com",
              "type": "Company"
            },
            {
              "url": "https://www.facebook.com/luckyshrubplants",
              "type": "Company (FB)"
            }
          ]
        }
      ]
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

Request syntax

Request parameters

Button behavior

Example request

Example response

* * *