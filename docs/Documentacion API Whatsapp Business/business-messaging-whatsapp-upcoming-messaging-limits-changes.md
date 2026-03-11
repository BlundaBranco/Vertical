# Upcoming changes to messaging limits

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/upcoming-messaging-limits-changes

---

# Upcoming changes to messaging limits

Updated: Oct 26, 2025

The changes described in this document are now live, and are only here for reference purposes. Our [Messaging limits](/documentation/business-messaging/whatsapp/messaging-limits) document has been updated to reflect these changes.

Messaging limits are currently calculated and set on a per-number basis. **Starting October 7, 2025** , messaging limits will instead be calculated and set on a business portfolio basis, and will be shared by all business phone numbers within each portfolio.

Existing business portfolios will have their messaging limit set to the highest limit of any phone number within their portfolio (e.g. if a portfolio has a phone number with a limit of 100K and other phone numbers with lower limits, the portfolio’s limit will be set to 100K).

These changes will result in:

  * **Faster access to higher limits** , with upgrades within 6 hours (compared to the current 24 hours) and immediate access to the portfolio’s limits for newly registered numbers.
  * **Greater flexibility** , allowing you to have as many phones as needed without requiring additional phones to access higher limits, since all phones share the portfolio’s limit.
  * **Reduced administrative burden and operational costs** , by minimizing the need for unnecessary phone numbers.

## Changes

|  Before Oct 7th, 2025 |  Starting Oct 7th, 2025   
---|---|---  
**Where are limits set?**|  On individual business phone numbers.For example, phone number A could have a limit of 10K but phone number B could have a limit of 100K.| On individual business portfolios.For example, a portfolio with two business phone numbers could have a limit of 100K, and both phone numbers share the 100K limit.  
**Starting limit for newly created business portfolios**|  Not applicable| 250  
**Starting limit for a newly registered number**|  250| Shares the messaging limit set on the business portfolio.  
**Limit upon becoming eligible for automatic scaling**|  1,000| 2,000  
**Time to increase limit via automatic scaling**|  Limit increased 24 hours after meeting criteria.| Limit increased 6 hours after meeting criteria.  
**Phone number quality states**|  The **Flagged**  [phone number quality⁠](https://www.facebook.com/business/help/896873687365001) state is possible.If your business phone number quality rating has been set to **Flagged** for the last 7 days, we will decrease its limit by one level, immediately.| The **Flagged**  [phone number quality⁠](https://www.facebook.com/business/help/896873687365001) state is no longer possible.If your business phone number quality rating drops, its messaging limit will not be downgraded.  
**Automatic scaling criteria**| 

  * Your business phone number is connected
  * Your business phone number quality rating is **Medium** or **High**)
  * In the last 7 days, your business has utilized at least half of your current messaging limit

| 

  * You are sending [high-quality messages](/documentation/business-messaging/whatsapp/messages/send-messages#message-quality) across all of your business phone numbers and templates.
  * In the last 7 days, your business has utilized at least half of your current messaging limit

  
**Webhooks**| [business_capability_update](/documentation/business-messaging/whatsapp/webhooks/reference/business_capability_update) webhook:

  * `max_daily_conversation_per_phone` value indicates business phone numbers’s messaging limit.

[phone_number_quality_update](/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_quality_update) webhook:

  * `current_limit` value indicates business phone numbers’s messaging limit or [throughput level](/documentation/business-messaging/whatsapp/throughput).

| [business_capability_update](/documentation/business-messaging/whatsapp/webhooks/reference/business_capability_update) webhook:

  * A new `max_daily_conversations_per_business` parameter will be included, which indicates the business portfolio’s messaging limit (`2000`, `10000`, `100000`, or `UNLIMITED`).
  * The existing `max_daily_conversation_per_phone` parameter will now indicate the business portfolio’s messaging limit (values same as above). The parameter will be removed in February, 2026.

[phone_number_quality_update](/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_quality_update) webhook:

  * A new `max_daily_conversations_per_business` parameter will be included that describes the portfolio’s messaging limit (values same as above).
  * The existing `current_limit` value will now indicate the business portfolio’s messaging limit or the business phone number’s [throughput level](/documentation/business-messaging/whatsapp/throughput). The parameter will be removed in February, 2026.

  
**Throughput eligibility requirements**|  For a business phone number to become eligible for [1,000 messages per second](/documentation/business-messaging/whatsapp/throughput):

  * The business phone number must be able to initiate an [unlimited number of messages in a rolling 24-hour period](/documentation/business-messaging/whatsapp/messaging-limits).
  * The business phone number must have a **Medium**  [quality rating⁠](https://www.facebook.com/business/help/896873687365001) or higher.

| For a business phone number to become eligible for [1,000 messages per second](/documentation/business-messaging/whatsapp/throughput):

  * The business portfolio associated with the phone number must have an unlimited messaging limit.
  * The business phone number must be used to message 100K or more unique WhatsApp user phone numbers, outside of a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows), within a moving 24-hour period.
  * The business phone number must have a **Medium**  [quality rating⁠](https://www.facebook.com/business/help/896873687365001) or higher.

If you meet our eligibility requirements, we will automatically upgrade your business phone number to 1,000 mps within 12 hours.  
**Endpoints**|  To get a business phone number’s current messaging limit, request the `messaging_limit_tier` field on the [business phone number](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api#Reading).| To get a business portfolio’s current messaging limit, request the (new) `whatsapp_business_manager_messaging_limit` field on the [business portfolio](/docs/marketing-api/reference/business#Reading), or a [WhatsApp Business Account](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/whatsapp-business-account-api#Reading) or [business phone number](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api#Reading) within the portfolio.You can request this field directly on any of these resources, or indirectly using field expansion with any endpoints that return business portfolios, WhatsApp Business Accounts, or business phone numbers.  
  
## WhatsApp Manager changes

Starting October 7, 2025, the [WhatsApp Manager⁠](https://business.facebook.com/wa/manage/home/) > **Overview** panel’s **Limits** section will be updated to reflect portfolio-based limits and scaling information:

In addition, a new **Messaging Limits** panel will be added to WhatsApp Manager, displaying your business portfolio’s current limit and scaling information:

## Upcoming change support

If you are an Enterprise Developer and run into any issues or have technical questions related to changes mentioned in Messaging limits, please [open a Direct Support ticket](/documentation/business-messaging/whatsapp/support#enterprise-developer-support), using **Topic: “WABiz: Account & WABA”** and **Request Type: “Messaging Limits”**. If you have multiple Meta business accounts, be sure to select the appropriate account.

Did you find this page helpful?

ON THIS PAGE

Changes

WhatsApp Manager changes

Upcoming change support

* * *