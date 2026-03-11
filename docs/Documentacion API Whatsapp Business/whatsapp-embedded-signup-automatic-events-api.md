# Automatic Events API

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api

---

# Automatic Events API

Updated: Nov 18, 2025

Business customers who access Embedded Signup can opt in to automatic event identification:

If a business customer opts in, Meta use a combination of regex and natural language processing to analyze the customer’s new message threads originating from Click-to-WhatsApp ads. If our analysis determines that a lead gen or purchase event occurred, an [automatic_events](/documentation/business-messaging/whatsapp/webhooks/reference/automatic_events) webhook is triggered, describing the event. You can then report the event for the customer using the [Conversions API](/docs/marketing-api/conversions-api) so the customer can use it on a Meta surface (in 2026, see Limitations below).

To learn more about how this feature works, see these [additional resources⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fmeta.highspot.com%2Fitems%2F6839e4fecd0bb354418ee7ec&h=AT4wKbr9kH1QLv_VzUmBlspygl3wtTwKRuSg5GK_VUbbuMTZgzO6Va8ZDp4G5kfpWEuK_YNsDfErxyH2MxKtUcy7hPRg9gjUdaCzivUHzz5ZxPDlr6RKmmhsl71LG6MpDWdL7U0KzckNLpjQxMLrrw).

## Limitations

  * Automatic event identification is a new feature. Your business customers won’t see or use automatic events reported via Conversions API in Meta surfaces until 2026. However, you can surface this information to your customers using your own solution before then. This allows them to gain a deeper understanding of their own customers’ needs, preferences, and ad performance.
  * Automatic event identification is not available to business customers in the European Union, United Kingdom, or Japan.

## Requirements

  * You have already [implemented](/documentation/business-messaging/whatsapp/embedded-signup/implementation) Embedded Signup and are able to onboard business customers who complete the flow.
  * Your [webhook server](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint) is successfully processing webhooks.

## Setup

Automatic event identification is available as an opt-in feature to all business customers automatically. To receive event notifications, you must subscribe your app to the **automatic_events** webhook field. However, as soon as you do this, you may begin receiving these webhooks before you can process them. Therefore, complete these steps using a test app before moving your code to production and subscribing your production app to the webhook field.

### Step 1: Subscribe to the automatic_events webhook field

Navigate to the [App Dashboard](/apps) > **Webhooks** > **Configuration** panel and subscribe to the [automatic_events](/documentation/business-messaging/whatsapp/webhooks/reference/automatic_events) webhook field.

### Step 2: Adjust your webhook callback

Adjust your webhook callback code so that it can successfully process **automatic_events** webhook payloads.

#### Lead gen event structure
    
    
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
                "automatic_events": [  
                  {  
                    "id": "",  
                    "event_name": "LeadSubmitted",  
                    "timestamp": ,  
                    "ctwa_clid": ""  
                  }  
                ]  
              },  
              "field": "automatic_events"  
            }  
          ]  
        }  
      ]  
    }  
      
    

#### Lead gen event example
    
    
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
                "automatic_events": [  
                  {  
                    "id": "wamid.HBgLMTIwNjY3NzQ3OTgVAgASGBQzQUY3MDVCQzFBODE5ODU4MUZEOQA=",  
                    "event_name": "LeadSubmitted",  
                    "timestamp": 1749069089,  
                    "ctwa_clid": "Afc3nYt4TTydumlFFsatFz8bR2yHCtVA92Veu_zDE4DgAI-QqCwM6eC3-K3lTGHRiLxRTVXFEsdyKQQSa-2obZyuGBq_EYypt_OwbMihBV0pbUoRmrGnEjwFTHop-Px0TfA"  
                  }  
                ]  
              },  
              "field": "automatic_events"  
            }  
          ]  
        }  
      ]  
    }  
      
    

#### Purchase event structure
    
    
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
                "automatic_events": [  
                  {  
                    "id": "",  
                    "event_name": "Purchase",  
                    "timestamp": ,  
                    "ctwa_clid": "",  
                    "custom_data": {  
                      "currency": "",  
                      "value":   
                    }  
                  }  
                ]  
              },  
              "field": "automatic_events"  
            }  
          ]  
        }  
      ]  
    }  
      
    

#### Purchase event example
    
    
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
                "automatic_events": [  
                  {  
                    "id": "wamid.HBgLMTIwNjY3NzQ3OTgVAgARGBIwRkU4NDI5Nzk3RjZDMzE2RUMA",  
                    "event_name": "Purchase",  
                    "timestamp": 1749069131,  
                    "ctwa_clid": "Afc3nYt4TTydumlFFsatFz8bR2yHCtVA92Veu_zDE4DgAI-QqCwM6eC3-K3lTGHRiLxRTVXFEsdyKQQSa-2obZyuGBq_EYypt_OwbMihBV0pbUoRmrGnEjwFTHop-Px0TfA",  
                    "custom_data": {  
                      "currency": "USD",  
                      "value": 25000  
                    }  
                  }  
                ]  
              },  
              "field": "automatic_events"  
            }  
          ]  
        }  
      ]  
    }  
      
    

### Step 3: Trigger webhooks

To trigger an **automatic_events** webhook:

  1. Access your test implementation of Embedded Signup.
  2. Authenticate the flow using a business that has a Click-to-WhatsApp ad already configured.
  3. In the [Business Asset Creation Screen](/documentation/business-messaging/whatsapp/embedded-signup/default-flow#business-asset-creation-screen), check the **Instruct Meta to automatically identify order and lead events** checkbox, and complete the flow.
  4. Access the Click-to-WhatsApp ad and click it to send a message to the business.
  5. Use the business to reply to the message with one of the strings below (must be exact).

  * **For a purchase event:**  _Your tracking number is AB123456789BR_
  * **For a lead gen event:**  _I am interested in learning more about the product_

After you have triggered both **automatic_events** webhook payloads, confirm that your webhook callback has processed each webhook according to your business needs.

### Step 4: Report each event using Conversions API (optional)

You can optionally report each event using the [Conversions API](/docs/marketing-api/conversions-api/business-messaging). Include any relevant values from the event webhook, as appropriate.

See [Send events via Conversions API](/docs/marketing-api/conversions-api/business-messaging#send-events-via-the-conversions-api-2) for additional information about reporting events.

#### Lead gen syntax
    
    
    curl 'https://graph.facebook.com///events' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "data": [  
        {  
          "event_name": "LeadSubmitted",  
          "event_time": ,  
          "action_source": "business_messaging",  
          "messaging_channel": "whatsapp",  
          "user_data": {  
            "ctwa_clid": ""  
          },  
          "messaging_outcome_data": {  
            "outcome_type": "automatic_events"  
          }  
        }  
      ]  
    }  
    '  
      
    

#### Purchase event syntax
    
    
    curl 'https://graph.facebook.com///events' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "data": [  
        {  
          "event_name": "Purchase",  
          "event_time": ,  
          "action_source": "business_messaging",  
          "messaging_channel": "whatsapp",  
          "user_data": {  
            "ctwa_clid": ""  
          },  
          "custom_data": {  
            "currency": "",  
            "value":   
          },  
          "messaging_outcome_data": {  
            "outcome_type": "automatic_events"  
          }  
        }  
      ]  
    }  
    '  
      
    

## Enabling and disabling via Meta Business Suite

Business customers who have already been onboarded via Embedded Signup can enable automatic event identification using Meta Business Suite.

If a business customer who you have already onboarded wants to enable this feature, you can send them these instructions:

  1. Access Meta Business Suite at [⁠](https://business.facebook.com).
  2. Navigate to **Settings** > **Accounts** > **WhatsApp accounts** and click your WhatsApp Business Account.
  3. Scroll down to **Privacy and data sharing** in the **Summary** tab.
  4. Use the “**Automatically identify**... “ toggles to enable or disable automatic event identification as desired.

Did you find this page helpful?

ON THIS PAGE

Limitations

Requirements

Setup

Step 1: Subscribe to the automatic_events webhook field

Step 2: Adjust your webhook callback

Lead gen event structure

Lead gen event example

Purchase event structure

Purchase event example

Step 3: Trigger webhooks

Step 4: Report each event using Conversions API (optional)

Lead gen syntax

Purchase event syntax

Enabling and disabling via Meta Business Suite

* * *