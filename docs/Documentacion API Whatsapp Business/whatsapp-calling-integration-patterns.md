# Integration Patterns

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/integration-patterns

---

# Integration Patterns

Updated: Feb 25, 2026

## Possible high-level approaches

Approach |  Number setup |  Business Solution Provider responsibilities |  Calling Tech Provider responsibilities |  End business responsibilities   
---|---|---|---|---  
**Message BSP capable of Calling**|  Existing messaging number extended for calling or new number| 

  * Messaging BSP reuses their app and subscribes it to calls webhooks. Creation of new calling specific app also works but [not recommended](/documentation/business-messaging/whatsapp/calling/integration-patterns#single-app-vs--multiple-apps)
  * Process calls webhooks and coordinate with real-time media infra
  * Make calls related Graph API calls similar to messaging Graph API calls

| Not applicable because there is only a single partner involved.| 

  * Enable and use calling
  * Continue paying the bill from BSP which now has calls related usage line items

  
[**Multi-solution Conversation**](/documentation/business-messaging/whatsapp/solution-providers/multi-solution-conversations)|  Single number independently operated by both messaging BSP and Calling BSP/TP| 

  * Messaging BSP does no changes

| 

  * Calling BSP/TP hosts ES on their own website pointing to their own app
  * Gets end-biz to go through their ES

| 

  * Onboard using calling partner’s ES
  * Pay the bills to Messaging BSP like before
  * For Calling partner incurred activity, pay the bill to calling partner if they are a BSP or to Meta if they are not a BSP

  
Exclusive Calling ISV| New number for calling| Not applicable because there is no messaging BSP| 

  * Calling ISV hosts Embedded Signup (ES) on their website pointing to their own app
  * Gets end-biz to go through their ES
  * If ISV is a tech provider or partner, Meta bills end-biz directly. ISV and end-biz figure out their own billing
  * If ISV is a BSP, they can extend their credit line to end-biz

| 

  * Onboard using ES on TP
  * If ISV is Tech Provider or Partner, pay Meta directly 
    * This requires end-biz to have a direct payment relation with Meta. Setting up this relation may take several weeks
  * If ISV is BSP, pay the bill from BSP

  
[Multi-platform solution](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions) using Calling ISV registered as Tech Provider (TP)| New calling exclusive number serviced (**only**) by Calling TP| 

  * BSP and TP work together to create / approve a multi-partner solution. BSP and TP have their own apps
  * Work out Messaging BSP <> Calling ISV commercial relation
  * Extend credit line to end business
  * Can receive messages or calls but cannot send messages or calls because you can select only one of the two partners to send messages/calls in a multi-platform solution

| 

  * BSP and TP work together to create / approve a multi-partner solution. BSP and TP have their own apps
  * Work out Messaging BSP <> Calling ISV commercial relation
  * Onboard end clients using ES pointing to created solution
  * Send/receive messages or calls

| 

  * Onboard using ES on TP
  * Biz is informed about TP in ES
  * Pay the bill from BSP

  
  
## Multi-solution conversations (MSC)

Multi-solution Conversations allow multiple solutions on the same phone number, localizing messaging and calling in a single chat thread.

[Learn more about Multi-Solution Conversations](/documentation/business-messaging/whatsapp/solution-providers/multi-solution-conversations)

## Integrating using a third party calling provider detailed design

The following logical architecture illustrates how to integrate WhatsApp Business Calling using a third party (3p) calling provider.

In this scenario, you would use the 3p vendor behind the scenes, and that 3p vendor would not be visible to Meta. This pattern is similar to any other SaaS service you may be using.

The diagram also illustrates how this architecture can be optionally extended to integrate with the SIP infrastructure on your side.

**Our terms disallow use of PSTN on _any_ leg of the WhatsApp call in the overall call flow.**

Even if you bridge WA call into the SIP world, you must ensure it still stays exclusively on VoIP and never touches the PSTN. SIP trunk by itself is not disallowed because technically a SIP trunk can be used without any PSTN at all.

(_Right click image and choose “Open in new tab” for enlarged image_)

## Single app vs. multiple apps

This section covers guidelines and considerations for reusing your existing messaging app for calling vs. creating a new app specifically for Calling API features.

To integrate with the WhatsApp Calling API, you need to call [Graph API endpoints](/documentation/business-messaging/whatsapp/about-the-platform#whatsapp-cloud-api) and process Webhooks from Meta. This [requires you to have an app](/docs/development/create-an-app), and almost always, you should already have an app that is used for messaging.

In short, you can reuse an existing app which is used for [Embedded Signup](/documentation/business-messaging/whatsapp/embedded-signup/overview) and for a messaging use case.

In this setup, the Webhook Callback URI is the same for both message and call related webhooks, but the webhook payload can be used to distinguish between the two categories of functions (messaging and calling). Hence you can still forward Calling API specific webhooks to a calls related component from your main webhook business logic.

Reusing the same app offers the following benefits:

  * Reduced operational overhead (for example, app review, ongoing maintenance)
  * Simplified footprint on Meta
  * Equality between the app used for embedded signup and the one used for invoking Graph APIs and receiving webhooks
  * There would be no impact to existing functionality by reusing that app for calling. You just need to make sure the Webhook server is able to gracefully handle ‘calls’ related webhooks.

Having separate apps is still supported, see the [Get Started FAQ](/documentation/business-messaging/whatsapp/calling/faq#getting-started-faq) for details.

## Guidelines for Media path integration

The WhatsApp Business Calling VoIP stack is designed to be compatible with WebRTC. However, to ensure smooth integration with the WhatsApp protocol, Meta restricts the supported functionalities. As a result, the following requirements and recommendations apply.

### Mandatory requirements

If any mandatory requirement is unmet, the call will fail. This failure can occur either during the call signaling phase, leading to a rejected call, or during the media packet decoding phase.

  * Use only the Opus audio codec.
  * Set the media clock rate to 48 kHz.
  * Set the DTMF clock rate to 8 kHz.
  * Use a ptime of 20ms.
  * Audio must use a single SSRC. The Meta relay server overwrites the SSRC of all business audio packets to a fixed SSRC before these packets reach the WA client. WA clients handle only one audio source from their peers. Using multiple SSRCs causes undefined behavior. This includes severe media corruption, audio glitches, and likely total media failure.

### Recommendations

While the following aspects are not mandatory, they are recommended to achieve high call quality and reliability.

  * **ICE Process**
    * Our VoIP stack is ICE-LITE, so it is recommended that BSPs’ VoIP stack is ICE-FULL. ([RFC 5245 Section 2.7⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc5245%23section-2.7&h=AT4yKjrH_Svo5qkGgvNp7y1hHfOfcVkKIp8Oum5JsKgGFCbshYcJy6p_Rda1Hc8o5Rv9_uglJlT0JY3UDeS95-i-IFYiqjaHfJV47OfsRXM683HE4mieFnpgEnM48aIjH1xDJmsTXZZdu75RsGB5vg))
    * BSPs’ VoIP stack should initiate the ICE process by sending STUN connectivity checks.
    * BSPs’ VoIP stack should assume the ICE CONTROLLING role, as Meta will only assume the CONTROLLED role.
    * Use regular nomination instead of aggressive nomination. ([RFC 5245 Section 8.1.1.2⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc5245%23section-8.1.1.2&h=AT4yKjrH_Svo5qkGgvNp7y1hHfOfcVkKIp8Oum5JsKgGFCbshYcJy6p_Rda1Hc8o5Rv9_uglJlT0JY3UDeS95-i-IFYiqjaHfJV47OfsRXM683HE4mieFnpgEnM48aIjH1xDJmsTXZZdu75RsGB5vg))
    * Wait for the ICE process to complete before nominating the candidate and starting DTLS.
    * Do not switch the candidate in the middle of the call.
  * **DTLS**
    * Use ECDH keys for the DTLS certificates to prevent packet fragmentation during transmission.
    * BSP should act as a DTLS client. ([RFC 6347 Section 4.2⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc6347%23section-4.2&h=AT4yKjrH_Svo5qkGgvNp7y1hHfOfcVkKIp8Oum5JsKgGFCbshYcJy6p_Rda1Hc8o5Rv9_uglJlT0JY3UDeS95-i-IFYiqjaHfJV47OfsRXM683HE4mieFnpgEnM48aIjH1xDJmsTXZZdu75RsGB5vg))
  * **Addressing Audio Clipping**
    * Delay the audio from the SIP leg until the media connection with Meta is established.
    * Integrate with the [pre-accept API](/documentation/business-messaging/whatsapp/calling/reference#pre-accept-call) to help mitigate audio clipping in user-initiated calls.

Did you find this page helpful?

ON THIS PAGE

Possible high-level approaches

Multi-solution conversations (MSC)

Integrating using a third party calling provider detailed design

Single app vs. multiple apps

Guidelines for Media path integration

Mandatory requirements

Recommendations

* * *