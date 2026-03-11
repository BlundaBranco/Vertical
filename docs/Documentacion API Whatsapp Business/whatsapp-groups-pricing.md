# Groups API Pricing

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/pricing

---

# Groups API Pricing

Updated: Oct 22, 2025

## Per-message pricing on Groups API

Groups API uses Cloud API’s [per-message pricing model](/documentation/business-messaging/whatsapp/pricing#per-message-pricing) to determine if a given message is billable. However, **you are charged each time a billable message is delivered to someone in the group.**

For example, if you send a (billable) marketing template message to a group with 5 WhatsApp users and it is delivered to all 5 users, you would be charged for 5 delivered messages at the going marketing message rate for each recipient’s country calling code.

If the message was delivered to only 4 of the 5 users, you would only be charged for the 4 delivered messages.

## How customer service windows work with Groups API

Customer service windows work differently when using Groups API.

When any WhatsApp user in the group messages you, a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) is opened between you and the entire group (or is refreshed, if one already exists). This allows you to send utility and marketing template messages, or free form messages, for free.

This is different from 1:1 messaging, where when a WhatsApp user messages you, a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) is opened between you and that customer (or is refreshed, if one already exists).

Everything else about [customer service windows](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) remains the same.

## Pricing information in Message Status webhook

Pricing information for messages sent using Groups API is included in [messages status webhooks](/documentation/business-messaging/whatsapp/groups/webhooks#pricing-information).

### How `read` and `delivered` message status webhooks are processed

In order for a message status to be considered `read`, it must have been at least `delivered`.

In some scenarios, such as when a user is present in the chat thread when a message arrives, the message is marked `delivered` and `read` nearly simultaneously. In this and other similar scenarios, the `delivered` webhook is not sent back. This is because it is implied that the message was delivered since it has been read.

### How pricing data is displayed in the Message Status webhook

Not all Message Status webhooks include pricing information.

With the introduction of [Per-message Pricing](/documentation/business-messaging/whatsapp/pricing#per-message-pricing), pricing data can be present in `sent`, `delivered` or `read` status webhook. If a message is **charged** , you can expect that at least one webhook (`delivered` or `read`) will contain the pricing information.

### Sent message status webhook
    
    
    // All versions
    
    "pricing": {
      "billable": "",
      "pricing_model": "",  // new value, see table below
      "type": "",            // new property, see table below
      "category": ""
    }

### Delivered / Read message status webhook
    
    
    // Version 24.0 and higher
    
    "pricing": {
      "billable": "",
      "pricing_model": "",  // new value, see table below
      "type": "",            // new property, see table below
      "category": ""
    }
    // Version 23.0 and lower
    "conversation": {
      "id": "",           // new behavior, see table below
      "expiration_timestamp": "",
      "origin": {
        "type": ""
      }
    },
    
    "pricing": {
      "billable": "",
      "pricing_model": "PMP",              // Value is now "PMP" instead of "CBP"
      "type": "",            // new property, see table below
      "category": ""
    }

### Parameters

Placeholder |  Description   
---|---  
``| Version 24.0 and higher:

  * The `conversation` object will be omitted entirely

Version 23.0 and lower:

  * Value will now be set to a unique ID per-message, instead of per-conversation.

  
``| Not changing.  
``| Not changing.  
``| Not changing.However, the `billable` property will be deprecated in a future [versioned release](/docs/graph-api/guides/versioning#calling_older_versions), so we recommend that you start using `pricing.type` and `pricing.category` together to determine if a message is billable, and if so, its billing rate.  
``| New property. Values can be:

  * `regular` — indicates the message is billable.
  * `free_group_customer_service` — indicates the message is free because it was either a utility template message or non-template message sent within a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows).

  
``| Values are not changing, but can now be interpreted as follows:

  * `group_marketing` — indicates a marketing template message.
  * `group_utility` — indicates a utility template message.
  * `group_service` — indicates a non-template message.

  
  
### Identifying billable messages

Billable messages have `pricing.type` set to regular. The `pricing.category` value indicates the rate (`group_marketing` or `group_utility`).

### Identifying free messages

Free messages have `pricing.type` set to `free_group_customer_service`. The `pricing.category` value tells you why it was free:

  * `group_utility` — the message was sent within an open group customer service window.
  * `group_service` — all non-templates messages are free.

## Messaging analytics for Groups API

The `analytics` field provides the number and type of messages sent and delivered by the phone numbers associated with a specific WABA — for conversation metrics, see Conversation Analytics.

You can use the following endpoint to retrieve analytics for messages sent using Groups API:
    
    
    /?fields=analytics.....

### Filter parameters for messaging analytics

For a full list of messaging analytics filter parameters, view the [Messaging Analytics reference](/documentation/business-messaging/whatsapp/analytics#conversation-analytics).

### Changes to filter parameters for Groups API

  

Name |  Description   
---|---  
`product_types`type: Array|  _Optional._ The types of messages (notification messages and/or customer support messages) for which you want to retrieve notifications.Provide an array and include:

  * `101` for group notification messages
  * `102` for group customer support messages.
  * `103` for inbound group messages

If the above values are not provided, the API call will be return analytics for all messages together.Inbound product type cannot be queried together with other product types, or you will see an error similar to the one below:
    
    
     {
     "error": {
       "message": "Invalid parameter",
       "type": "OAuthException",
       "code": 100,
       "error_subcode": 2388077,
       "is_transient": false,
       "error_user_title": "Insight Invalid Product Type Combination",
       "error_user_msg": "Unable to query this combination of product types. Please query individually and try again.",
     }
    }  
  
### Response value

Successful responses to the analytics API when querying Groups API message data will return an object similar to the following:

**Note: The country code filter is not supported for group sent messages.**
    
    
     With Country code filter
    {
      "analytics": {
        "phone_numbers": [
          "16505550111",
          "16505550112",
          "16505550113"
        ],
        "country_codes": [
          "US",
          "BR"
        ],
        "granularity": "DAY",
        "data_points": [
          {
            "start": 1543543200,
            "end": 1543629600,
            "sent": 196093,
            "delivered": 179715,
            "groups_delivered": 4
          },
          {
            "start": 1543629600,
            "end": 1543716000,
            "sent": 147649,
            "delivered": 139032
          }
          # more data points
        ]
      },
      "id": "102290129340398"
    }
    
    Without Country code filter
    {
      "analytics": {
        "phone_numbers": [
          "16505550111",
          "16505550112",
          "16505550113"
        ],
        "granularity": "DAY",
        "data_points": [
          {
            "start": 1543543200,
            "end": 1543629600,
            "sent": 196093,
            "delivered": 179715,
            "groups_sent": 2,
            "groups_delivered": 4
          },
          {
            "start": 1543629600,
            "end": 1543716000,
            "sent": 147649,
            "delivered": 139032
          }
          # more data points
        ]
      },
      "id": "102290129340398"
    }

## Pricing analytics for Groups API

The `pricing_analytics` field allows you to get pricing breakdowns for any messages delivered within a specified date range.
    
    
    GET /
    ?fields=pricing_analytics
    .start()
    .end()
    .granularity()
    .phone_numbers()
    .country_codes()
    .metric_types()
    .pricing_types()
    .pricing_categories()
    .dimensions()

### Filter parameters for pricing analytics

For a full list of messaging analytics filter parameters, view the [Messaging Analytics reference](/documentation/business-messaging/whatsapp/analytics#pricing-analytics).

### Changes to filter parameters for Groups API

Name |  Description   
---|---  
``_Array of strings_|  _Optional._ Array of pricing categories. If you send an empty array, we return results for all pricing categories.Values can be:

  * `GROUP_MARKETING`: Group messages charged the marketing rate.
  * `GROUP_SERVICE`: Group messages that were not charged. Includes all non-template messages and utility messages sent inside of a customer service window.
  * `GROUP_UTILITY`: Group messages charged the utility rate.

  
``_Array of strings_|  _Optional._ Array of pricing types. If you send an empty array, we return results for all pricing types.Values can be:

  * `FREE_GROUP_CUSTOMER_SERVICE`: Free group messages. These are non-template messages and utility messages sent within group customer service windows.
  * `REGULAR`: Billable messages. Includes all authentication and marketing template messages, and any utility template messages sent outside of a customer service window.

  
  
## Rate cards

Group utility messages are not eligible for volume tiers.

Messaging rates for Groups API are the same as per-messaging pricing rates for 1 to 1 messaging.

[View per-message pricing rate cards](/documentation/business-messaging/whatsapp/pricing#rate-cards-and-volume-tiers)

Did you find this page helpful?

ON THIS PAGE

Per-message pricing on Groups API

How customer service windows work with Groups API

Pricing information in Message Status webhook

How read and delivered message status webhooks are processed

How pricing data is displayed in the Message Status webhook

Sent message status webhook

Delivered / Read message status webhook

Parameters

Identifying billable messages

Identifying free messages

Messaging analytics for Groups API

Filter parameters for messaging analytics

Changes to filter parameters for Groups API

Response value

Pricing analytics for Groups API

Filter parameters for pricing analytics

Changes to filter parameters for Groups API

Rate cards

* * *