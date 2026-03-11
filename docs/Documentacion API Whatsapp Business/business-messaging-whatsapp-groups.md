# Groups API

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/groups

---

# Groups API

Updated: Nov 14, 2025

**Eligibility for Groups API**

The Groups API is now open to all businesses with an [Official Business Account (OBA)](/documentation/business-messaging/whatsapp/official-business-accounts)

The Groups API enables you to programmatically create groups for messaging and collaboration.

## How it works

Groups are an invite-only experience where participants join using a group invite link you send them. This invite link provides context about the group, helping the user decide whether they want to join.

## Get Started

When you are ready to start using the Groups API, head on over to our “Get Started” guide for more information:

[Get Started with Groups API](/documentation/business-messaging/whatsapp/groups/get-started)

## Quick Facts

  * **Max group participants:** 8
  * **Supported message types:** Text, media, text-based templates, and media-based templates
  * **Max groups you can create:** 10,000 per business number
  * **Max Cloud API businesses per group:** 1

## Analytics

**Performance metrics are not available for message templates used in Groups.**

Please create new templates specifically for Groups use instead of repurposing templates used for one-to-one messaging.

## Limits

**Eligibility for Groups API**

To qualify for groups features, your business must be an [Official Business Account (OBA)](/documentation/business-messaging/whatsapp/official-business-accounts)

_Groups are**not available** for [Coexistence users](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) and phone numbers onboarded to [Multi-solution Conversations](/documentation/business-messaging/whatsapp/solution-providers/multi-solution-conversations)_.

_The[Calling API](/documentation/business-messaging/whatsapp/calling) is not supported in groups._

  * **Non-supported message types:**
    * Calling
    * Disappearing messages
    * View-once
    * Auth
    * Commerce messages
    * Interactive messages   

  * **Non-supported actions:**
    * Admin hide group participant list
    * Edit message
    * Delete message
    * Marking message as read

## Pricing

The Groups API uses [per-message pricing](/documentation/business-messaging/whatsapp/pricing).

[Learn more about Groups API pricing here](/documentation/business-messaging/whatsapp/groups/pricing)

## Features and reference

### Group management features

  * [Create and delete group](/documentation/business-messaging/whatsapp/groups/reference#create-group)
  * [Groups with join requests enabled](/documentation/business-messaging/whatsapp/groups/reference#groups-with-join-requests)
  * [Get and reset group invite link](/documentation/business-messaging/whatsapp/groups/reference#get-and-reset-group-invite-link)
  * [Send group invite link template message](/documentation/business-messaging/whatsapp/groups/reference#send-group-invite-link-template-message)
  * [Remove group participants](/documentation/business-messaging/whatsapp/groups/reference#remove-group-participants-endpoint)
  * [Get group info](/documentation/business-messaging/whatsapp/groups/reference#get-group-info)
  * [Get active groups](/documentation/business-messaging/whatsapp/groups/reference#get-active-groups)
  * [Update group settings](/documentation/business-messaging/whatsapp/groups/reference#update-group-settings)

[ _View Group Management reference_](/documentation/business-messaging/whatsapp/groups/reference)

### Group messaging features

  * [Send group messages](/documentation/business-messaging/whatsapp/groups/groups-messaging#send-group-message)
  * [Receive group messages](/documentation/business-messaging/whatsapp/groups/groups-messaging#receive-group-messages)
  * [Pin and unpin group message](/documentation/business-messaging/whatsapp/groups/groups-messaging#pin-and-unpin-group-message)

[ _View Group Messaging reference_](/documentation/business-messaging/whatsapp/groups/groups-messaging)

Did you find this page helpful?

ON THIS PAGE

How it works

Get Started

Quick Facts

Analytics

Limits

Pricing

Features and reference

Group management features

Group messaging features

* * *