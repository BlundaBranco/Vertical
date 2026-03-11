# Throughput

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/throughput

---

# Throughput

Updated: Nov 21, 2025

For each registered business phone number, Cloud API supports up to 80 messages per second (mps) by default, and up to 1,000 mps by automatic upgrade.

Throughput is inclusive of inbound and outbound messages and all message types. Note that business phone numbers, regardless of throughput, are still subject to their WhatsApp Business Account [rate limit](/documentation/business-messaging/whatsapp/about-the-platform#rate-limits) and [template messaging limits](/documentation/business-messaging/whatsapp/messaging-limits).

If you attempt to send more messages than your current throughput level allows, the API will return error code `130429` until you are within your allowed level again. Also, throughput levels are intended for messaging campaigns involving different WhatsApp user phone numbers. If you attempt to send too many messages to the same WhatsApp user number, you may encounter a pair [rate limit](/documentation/business-messaging/whatsapp/about-the-platform#rate-limits) error.

## WhatsApp Business app phone numbers

In order to remain compatible with the WhatsApp Business app, business phone numbers that are in use with both the WhatsApp Business app and Cloud API (“[coexistence numbers](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users)”) have a fixed throughput of 20 mps.

## Higher throughput

If you meet our eligibility requirements, we will automatically upgrade your business phone number to 1,000 mps at no cost to you. Higher throughput does not incur additional charges or affect pricing.

The upgrade process itself can take up to 1 minute. During this time the number will not be usable on our platform. If used in an API request, the API will return error code `131057`. Once a business phone number has been upgraded, it will automatically be upgraded for any future throughput increases with no downtime.

Once your number is upgraded to higher throughput, a [phone_number_quality_update](/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_quality_update) webhook will be triggered with `event` set to `THROUGHPUT_UPGRADE` and `max_daily_conversations_per_business` set to `TIER_UNLIMITED`.

## Eligibility

  * The business portfolio associated with the phone number must have an unlimited [messaging limit](/documentation/business-messaging/whatsapp/messaging-limits).
  * The business phone number must be used to message 100K or more unique WhatsApp user phone numbers, outside of a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows), within a moving 24-hour period.
  * The business phone number must have a `quality_score` of `YELLOW` (shown as a **Medium**  [quality rating⁠](https://www.facebook.com/business/help/896873687365001) in WhatsApp Manager) or higher.

## Webhooks

Your webhook servers should be able to withstand 3x the capacity of outgoing message traffic and 1x the capacity of expected incoming message traffic. For example, if sending 1,000 mps with a 30% expected response rate, your servers should be able to process up to 3000 message status webhooks plus an additional 300 incoming message webhooks.

We attempt to deliver webhooks concurrently, so we recommend you configure and load test your webhook server to handle concurrent requests with the following latency standard:

  * Median latency not to exceed 250ms.
  * Less than 1% latency exceeds 1s.

We will attempt to re-deliver failed webhooks for up to 7 days, with exponential backoff.

## Media messages

To take full advantage of higher throughput, we recommend that you [upload your media assets](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) to our servers and use the returned media IDs, instead of hosting the assets on your own servers and using media asset URLs, when [sending messages](/documentation/business-messaging/whatsapp/messages/send-messages) that include a media asset. If you prefer (or must) host the assets on your own servers, we recommend that you use [media caching](/documentation/business-messaging/whatsapp/messages/send-messages#media-http-caching).

## Getting throughput level

Use the [WhatsApp Business Phone Number](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api) endpoint to get a phone number’s current throughput level:
    
    
    GET /?fields=throughput

Did you find this page helpful?

ON THIS PAGE

WhatsApp Business app phone numbers

Higher throughput

Eligibility

Webhooks

Media messages

Getting throughput level

* * *