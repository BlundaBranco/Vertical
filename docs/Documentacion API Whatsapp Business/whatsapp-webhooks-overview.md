# Webhooks

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/overview

---

# Webhooks

Updated: Dec 2, 2025

This document describes webhooks and how they are used by the WhatsApp Business Platform.

Webhooks are HTTP requests containing JSON payloads that are sent from Meta’s servers to a server of your designation. The WhatsApp Business Platform uses webhooks to inform you of incoming messages, the status of outgoing messages, and other important information, such as changes to your account status, messaging capability upgrades, and changes to your template quality scores.

For example, this is a webhook describing a message sent from a WhatsApp user to a business:
    
    
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
      
    

## Create a webhook endpoint

To receive webhooks, you must create and configure a webhook endpoint. To create your own endpoint, see our [Create a webhook endpoint](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint) document

If you aren’t ready to create your own endpoint yet, you can [create a test webhook endpoint](/documentation/business-messaging/whatsapp/webhooks/set-up-whatsapp-echo-bot) that logs webhook payloads to the console. Note, however, that before you can use your app in a production capacity, you must create your own endpoint.

## Permissions

You will need the following permissions to receive webhooks:

  * **whatsapp_business_messaging** — for **messages** webhooks
  * **whatsapp_business_management** — for all other webhooks

If you are a direct developer, use your system user to grant your app these permissions when generating your [system token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens).

If you are a [solution provider](/documentation/business-messaging/whatsapp/solution-providers/overview) and need these permissions to provide appropriate services to your business customers, you must be approved for advanced access for the permissions via [App Review](/docs/app-review) before your business customers will be able to grant your app these permissions during onboarding.

## Fields

Once you [created and configured](/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint) your webhook endpoint (or have set up a [test webhook endpoint](/documentation/business-messaging/whatsapp/webhooks/set-up-whatsapp-echo-bot)), use the **[App Dashboard](/apps)** > **WhatsApp** > **Configuration** panel to subscribe to individual webhook fields.

Note that if you created your app using the **Connect with customers through WhatsApp** use case, navigate to **[App Dashboard](/apps)** > **Use cases** > **Customize** > **Configuration** instead.

Field name |  Description   
---|---  
[account_alerts](/documentation/business-messaging/whatsapp/webhooks/reference/account_alerts)| The **account_alerts** webhook notifies you of changes to a business phone number’s [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits), [business profile](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#business-profiles), and [Official Business Account](/documentation/business-messaging/whatsapp/whatsapp-business-accounts#official-business-account) status.  
[account_review_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_review_update)| The **account_review_update** webhook notifies you when a WhatsApp Business Account has been reviewed against our policy guidelines.  
[account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update)| The **account_update** webhook notifies of changes to a WhatsApp Business Account’s [partner-led business verification](/documentation/business-messaging/whatsapp/solution-providers/partner-led-business-verification) submission, its [authentication-international rate](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) eligibility or primary business location, when it is shared with a [solution provider](/documentation/business-messaging/whatsapp/solution-providers/overview), [policy or terms violations](/documentation/business-messaging/whatsapp/policy-enforcement), or when it is deleted.  
[automatic_events](/documentation/business-messaging/whatsapp/webhooks/reference/automatic_events)| The **automatic_events** webhook notifies you when we detect a purchase or lead event in a chat thread between you and a WhatsApp user who has messaged you via your Click to WhatsApp ad, if you have opted-in to [Automatic Events](/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api) reporting.  
[business_capability_update](/documentation/business-messaging/whatsapp/webhooks/reference/business_capability_update)| The **business_capability_update** webhook notifies you of WhatsApp Business Account or business portfolio capability changes ([messaging limits](/documentation/business-messaging/whatsapp/messaging-limits#increasing-your-limit), [phone number limits](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#registered-number-cap), etc.).  
[history](/documentation/business-messaging/whatsapp/webhooks/reference/history)| The **history** webhook is used to synchronize the [WhatsApp Business app chat history](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) of a business customer onboarded by a solution provider.  
[message_template_components_update](/documentation/business-messaging/whatsapp/webhooks/reference/message_template_components_update)| The **message_template_components_update** webhook notifies you of changes to a template’s components.  
[message_template_quality_update](/documentation/business-messaging/whatsapp/webhooks/reference/message_template_quality_update)| The **message_template_quality_update** webhook notifies you of changes to a template’s [quality score](/documentation/business-messaging/whatsapp/templates/template-quality).  
[message_template_status_update](/documentation/business-messaging/whatsapp/webhooks/reference/message_template_status_update)| The **message_template_status_update** webhook notifies you of changes to the status of an existing template.  
[messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages)| The **messages** webhook describes messages sent from a WhatsApp user to a business and the status of messages sent by a business to a WhatsApp user.  
[partner_solutions](/documentation/business-messaging/whatsapp/webhooks/reference/partner_solutions)| The **partner_solutions webhook** describes changes to the status of a [Multi-Partner Solution](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions).  
[payment_configuration_update](/documentation/business-messaging/whatsapp/webhooks/reference/payment_configuration_update)| The **payment_configuration_update** webhook notifies you of changes to payment configurations for [Payments API India](/documentation/business-messaging/whatsapp/payments/payments-in/overview) and [Payments API Brazil](/documentation/business-messaging/whatsapp/payments/payments-br/overview).  
[phone_number_name_update](/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_name_update)| The **phone_number_name_update** webhook notifies you of business phone number [display name verification](/documentation/business-messaging/whatsapp/display-names#display-name-verificationn) outcomes.  
[phone_number_quality_update](/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_quality_update)| The **phone_number_quality_update** webhook notifies you of changes to a business phone number’s [throughput level](/documentation/business-messaging/whatsapp/throughput).  
[security](/documentation/business-messaging/whatsapp/webhooks/reference/security)| The **security** webhook notifies you of changes to a business phone number’s security settings.  
[smb_app_state_sync](/documentation/business-messaging/whatsapp/webhooks/reference/smb_app_state_sync)| The **smb_app_state_sync** webhook is used for synchronizing contacts of [WhatsApp Business app users who have been onboarded](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) via a solution provider.  
[smb_message_echoes](/documentation/business-messaging/whatsapp/webhooks/reference/smb_message_echoes)| The **smb_message_echoes** webhook notifies you of messages sent via the WhatsApp Business app or a [companion (“linked”) device](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users#linked-devices) by a business customer who has been [onboarded to Cloud API](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) via a solution provider.  
[template_category_update](/documentation/business-messaging/whatsapp/webhooks/reference/template_category_update)| The **template_category_update** webhook notifies you of changes to template’s [category](/documentation/business-messaging/whatsapp/templates/template-categorization).  
[user_preferences](/documentation/business-messaging/whatsapp/webhooks/reference/user_preferences)| The **user_preferences** webhook notifies you of changes to a WhatsApp user’s [marketing message preferences](/documentation/business-messaging/whatsapp/templates/marketing-templates#user-preferences-for-marketing-messages).  
  
## Override webhooks

You can use an alternate webhook endpoint for messages webhooks for your WhatsApp Business Account (WABA) or business phone number. This can be useful for testing purposes, or if you are a solution provider and wish to use unique webhook endpoints for each of your onboarded customers.

See our [Webhook overrides](/documentation/business-messaging/whatsapp/webhooks/override) document to learn how to override webhooks.

## Payload size

Webhook payloads can be up to 3 MB.

## Webhook delivery failure

If we send a webhook request to your endpoint and your server responds with an HTTP status code other than 200, or if we are unable to deliver the webhook for another reason, we will keep trying with decreasing frequency until the request succeeds, for up to 7 days.

Note that retries will be sent to all apps that have subscribed to webhooks (and their appropriate fields) for the WhatsApp Business Account. This can result in duplicate webhook notifications.

## Mutual TLS

Webhooks support mutual TLS (mTLS) for added security. See Graph API’s [mTLS for webhooks](/docs/graph-api/webhooks/getting-started#mtls-for-webhooks) document to learn how to enable and use mTLS.

## IP addresses

You can get the IP addresses of our webhook servers by running the following command in your terminal:
    
    
    whois -h whois.radb.net — '-i origin AS32934' | grep '^route' | awk '{print $2}' | sort

You can also use our geofeed to [download a CSV⁠](https://facebook.com/peering/geofeed) that lists our IP addresses.

Note, however, that we periodically change our IP addresses, so to avoid having to regenerate your list of allowed IP addresses, we recommend that you [use mTLS instead](/docs/graph-api/webhooks/getting-started#mtls-for-webhooks).

## Troubleshooting

If you are not receiving webhooks:

  * Make sure your endpoint is accepting requests.
  * Send a test payload to your endpoint via the **[App Dashboard](/apps)** > **WhatsApp** > **Configurations** panel.
  * Make sure your app is in **Live** mode; some webhooks will not be sent if your app is in **Dev** mode.
  * Use our [test webhook endpoint](/documentation/business-messaging/whatsapp/webhooks/set-up-whatsapp-echo-bot). If the test endpoint is digesting webhook payloads and displaying them in the console, the issue is likely with your endpoint code.

## Learn more

  * See our [Using Node.js to implement webhooks⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fbusiness.whatsapp.com%2Fblog%2Fhow-to-use-webhooks-from-whatsapp-business-api&h=AT71nxGTchswCio7xzYcnzBU1e2MZmbcM9tBgk_J7uXEfFb8TP58bspksihVy0WuCQxBsWpFBzLCjhVNECgcSeDPXYoLLxPWX4lFyRc3aF4PPLJtBvtQJrzS037zisX-lwm-ZzjXhf0QiADAeX_yjQ) WhatsApp Business blog post.

Did you find this page helpful?

ON THIS PAGE

Create a webhook endpoint

Permissions

Fields

Override webhooks

Payload size

Webhook delivery failure

Mutual TLS

IP addresses

Troubleshooting

Learn more

* * *