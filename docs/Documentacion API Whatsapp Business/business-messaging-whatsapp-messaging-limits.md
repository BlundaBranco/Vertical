# Messaging Limits

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits

---

# Messaging Limits

Updated: Nov 26, 2025

The `messaging_limit_tier` field, which used to return a business phone number’s messaging limit, has been deprecated. Request the `whatsapp_business_manager_messaging_limit` field instead.

This document describes messaging limits for the WhatsApp Business Platform.

Messaging limits are the maximum number of unique WhatsApp user phone numbers your business can deliver messages to, outside of a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows), within a moving 24-hour period.

Messaging limits are calculated and set at the business portfolio level and are shared by all business phone numbers within a portfolio. This means that if a business portfolio has multiple business phone numbers, it’s possible for one number to consume all of the portfolio’s messaging capability within a given period.

Newly created business portfolios have a messaging limit of 250, but this limit can be increased to:

  * 2,000 (by completing a scaling path)
  * 10,000 (via automatic scaling)
  * 100,000 (via automatic scaling)
  * Unlimited (via automatic scaling)

## Increasing your limit

You can increase your messaging limit to 2,000 by completing one of the scaling paths below. After that, we will automatically increase your limit to the next higher limit if you meet our automatic scaling criteria.

### Scaling paths

  * [Verify your business⁠](https://www.facebook.com/business/help/2058515294227817)
  * Have your [solution provider verify your business](/documentation/business-messaging/whatsapp/solution-providers/partner-led-business-verification) (if you were onboarded by one)
  * Send 2,000 delivered messages outside of customer service windows to unique WhatsApp user phone numbers within a 30-day moving period, using templates with a high [quality rating](/documentation/business-messaging/whatsapp/templates/template-quality).

Once you complete one of these paths, we will analyze your [message quality](/documentation/business-messaging/whatsapp/messages/send-messages#message-quality). Based on this analysis, your number’s eligibility for automatic scaling will either be approved or denied.

### Approvals

If your request is approved, we will immediately increase your business phone number’s messaging limit to 2,000 and notify you by email and developer alert. In addition, a [business_capability_update](/documentation/business-messaging/whatsapp/webhooks/reference/business_capability_update) webhook will be triggered with `max_daily_conversations_per_business` (for webhooks v24.0 and newer) and `max_daily_conversation_per_phone` (for v23.0 and older, until February, 2026) set to the new limit.

Additional messaging limit increases for your number can now happen automatically, via automatic scaling.

### Denials

If your request is denied, we will maintain your business phone number’s messaging limit at its current level and notify you via email and developer alert. In addition, an [account_alerts](/documentation/business-messaging/whatsapp/webhooks/reference/account_alerts) webhook will be triggered, with the `alert_type` and `alert_description` properties indicating alternate methods you can pursue to increase your limit.

`alert_type` Value |  Action you can take   
---|---  
`INCREASED_CAPABILITIES_ELIGIBILITY_DEFERRED`| Send 2,000 delivered messages outside of customer service windows to unique WhatsApp user phone numbers in a 30-day moving period, using templates with a high [quality rating](/documentation/business-messaging/whatsapp/templates/template-quality).  
`INCREASED_CAPABILITIES_ELIGIBILITY_FAILED`| Send 2,000 delivered messages outside of customer service windows to unique WhatsApp user phone numbers within a 30-day moving period, using templates with a high [quality rating](/documentation/business-messaging/whatsapp/templates/template-quality).  
`INCREASED_CAPABILITIES_ELIGIBILITY_NEED_MORE_INFO`| [Verify your identity⁠](https://www.facebook.com/business/help/587323819101032), or send 2,000 delivered messages outside of customer service windows to unique WhatsApp user phone numbers within a 30-day moving period, using templates with a high [quality rating](/documentation/business-messaging/whatsapp/templates/template-quality).  
  
## Automatic scaling

Once your business portfolio’s messaging limit has been increased to 2,000, we will determine if it should be increased further according to the following criteria:

  * You are sending [high-quality messages](/documentation/business-messaging/whatsapp/messages/send-messages#message-quality) across all of your business phone numbers and templates
  * In the last 7 days, your business has utilized at least half of your current messaging limit

If these criteria are met, we will increase your portfolio’s limit by one level within 6 hours.

## Checking your limit

### Via Meta Business Suite

Your business phone number’s current messaging limit is displayed in the [WhatsApp Manager⁠](https://business.facebook.com/wa/manage/home/) > **Account tools** > **Messaging limits** panel:

### Via API

Use the [GET /](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api#Reading) endpoint and request the `whatsapp_business_manager_messaging_limit` field.

Note that the `messaging_limit_tier`, which used to return the phone number’s messaging limit, has been deprecated.

### Example request
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922?fields=whatsapp_business_manager_messaging_limit' \
    -H 'Authorization: Bearer EAAJB...'

#### Example response
    
    
    {  
      "whatsapp_business_manager_messaging_limit": "TIER_250",  
      "id": "106540352242922"  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Increasing your limit

Scaling paths

Approvals

Denials

Automatic scaling

Checking your limit

Via Meta Business Suite

Via API

Example request

Example response

* * *