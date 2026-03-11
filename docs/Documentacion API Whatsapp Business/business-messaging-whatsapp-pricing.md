# Pricing on the WhatsApp Business Platform

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing

---

# Pricing on the WhatsApp Business Platform

Updated: Mar 2, 2026

This document explains how pricing works on the WhatsApp Business Platform.

## Cloud API and Marketing Messages API for WhatsApp

To align with industry-standards, effective July 1, 2025, Meta now charges on a **per-message basis** :

  * You are only charged when a [template message](/documentation/business-messaging/whatsapp/messages/template-messages) is delivered (`"type":"template"`).
  * Rates vary based on the template’s category and the recipient WhatsApp phone number’s country calling code.

Meta provides value to businesses in several ways:

  * All non-template messages are free (`"type":"text"`, `"type":"image"`, and so on). These can only be sent within an open [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows). See [Sending messages](/documentation/business-messaging/whatsapp/messages/send-messages#sending-messages) for a list of message types.
  * Utility templates delivered within an open customer service window are free.
  * You can unlock lower rates for utility and authentication template messages, based on messaging volume.
  * All messages are free for 72 hours, including template messages, if sent within an open free entry point window.

## Pricing explainer

Our pricing explainer PDF outlines how Meta charges and the various ways Meta provides value to businesses, in PDF form:

[Pricing Explainer PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.2365-6%2F506409115_515804291560768_5477144239594007982_n.pdf%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3De280be%26_nc_ohc%3D-JiH8cPL7KgQ7kNvwEEvRhw%26_nc_oc%3DAdkbxNtvGAoXyy41rAjwMXyqGR8rpi85d2p1APamroN8LUEPkhpWJkIGm_bXkYolNhU%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afw2J_rTEH664z64FQsqOBjU6zawz8qIjDSH0ceFkg5Pbw%26oe%3D69C6FFBA&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

## Message template categories

Unlike non-template messages, template messages are the only message type that can be sent outside of a customer service window. Templates can be categorized as:

  * Marketing
  * Utility
  * Authentication

See [Template categorization](/documentation/business-messaging/whatsapp/templates/template-categorization) to learn how template categorization works.

### Template messages vs. non-template messages

  * CSW = [Customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows)
  * FEP = Free entry point window

Businesses are responsible for reviewing the category assigned to their approved templates. Whenever a template is used, a business accepts the charges associated with the category applied to the template at time of use.

## Charge example

In the example below, a business sends 4 messages to a WhatsApp user but is only charged for 2 (1 marketing charge, 1 utility charge).

Hour |  Action |  Rate |  Reason   
---|---|---|---  
0| You send a marketing template message to a WhatsApp user, promoting your new product.| Marketing| All marketing template messages are charged.  
2| The user messages you about the product.This opens a 24 hour [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) (“CSW”).| -| Messages sent from a WhatsApp user to a business are not charged.  
3| You send a [text message](/documentation/business-messaging/whatsapp/messages/text-messages) to the user (`"type":"text"`), describing the product in more detail.| None| All non-template messages are free within an open customer service window.  
4| The user purchases the product and you send them a utility template confirming their order.| None| The CSW is still open, and utility templates sent within an open CSW are free.  
26| The CSW closes, which means you can no longer send non-template messages.| -| 24 hours have passed since the user last messaged you.  
30| You send a utility template message to the user, updating them on their order.| Utility| Utility template messages sent outside of a CSW are charged, and no open CSW exists between you and the user.  
  
## Pricing calendar

To better enable our customers to plan and prepare for pricing updates, the following pricing calendar applies for messaging and voice on the WhatsApp Business Platform:

  * Meta may update pricing only _on the 1st day of each quarter_ , thus up to 4 times per year: January 1, April 1, July 1, and/or October 1.
  * Meta will provide advanced notice that is better aligned to the effort required to implement different types of pricing updates, per below:

Type of pricing update |  Examples |  Minimum advance notice   
---|---|---  
**Rate card update**|  Updating the rate for a given market–productUpdating the volume tiers for a given market–product (utility and authentication only)Moving a market from one pricing region (e.g. “Other”) to another or to be standalone on the rate card| 1 month  
**Pricing model add-on**|  Our July 1, 2025, introduction of new volume tiers for utility and authentication messages| 3 months  
**Pricing model change**|  Our July 1, 2025 update to our pricing model, from conversation-based pricing to per-message pricing| 6 months  
  
## Rates

Rates vary based on [template category](/documentation/business-messaging/whatsapp/templates/template-categorization), volume tier, and country/region rate.

### Rate cards and volume tiers

These rate cards reflect our current rates and volume tiers, effective January 1, 2026, based on WhatsApp Business Account timezone. This information is also available interactively on our [WhatsApp Business website⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Fbusiness.whatsapp.com%2Fproducts%2Fplatform-pricing%23rates&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw).

Rates and volume tiers in USD:

  * [USD rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613097921_829408843431679_7810092641806537646_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DBoJJnRHzQMIQ7kNvwH0-wy7%26_nc_oc%3DAdk_-FExGWSHfCdTKKhkIG0ajcLK8kDyq335x0lcuQyEn0hhONu0VbeFQ3zld6Qzzeo%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxuLcAav1cD9IGRrQs7sZquT2PCFG8yWW1nTbYN81TERg%26oe%3D69B2A379&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [USD volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612650454_1382747956168005_5107801514951256200_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DXZjJX_5FpAEQ7kNvwGa-j7q%26_nc_oc%3DAdnoa-7k9NPtdunlRiivdpS6TXtw_nloiHTBq-y7rbW9XSasSLdTjsumuffBxowr1Jc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfygrIwS5B9aKJAQsXvOqcOwoSC57aIld4eHHYWBZJ20ww%26oe%3D69B2BC55&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [USD rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613082154_1611799993323666_5808670464347184450_n.pdf%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D97VJsHUi8_EQ7kNvwEl4bct%26_nc_oc%3DAdlHmwgXGL7KCxedG8DWSSezpnlzToHSCqkdHvKvDqix7NWZiqX5bXa7ZsC_6sT3ukw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfydD1z6vCI-6pedeXJmWOhkdeqn_7jbpQdHN5_lFTQi_g%26oe%3D69B2A9BD&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Rates and volume tiers in AUD:

  * [AUD rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613671409_3010976015762428_224345004977675966_n.csv%3F_nc_cat%3D109%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D5aanZ0VObQEQ7kNvwGixths%26_nc_oc%3DAdkJn7jir-dwLrL3VrZTLAHIo1lWDwn4M4u0LRingC99HhtluG3GG4XB97qs5ic-LkE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxJNb4TIu7MuqlsbRy1q0NcrZqKCF-bbCKBaQQepWG_xQ%26oe%3D69B2A2F3&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [AUD volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612126795_1985099432053549_8200095052240900162_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D_ufM7x4fK1MQ7kNvwGeKzfG%26_nc_oc%3DAdn3Qe6Ci5SdCNqzJ4ApMw6MMT6IFh8WkTVj0UQ_9K8CgaifuKJRPmxqvYn-FEwRTL8%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afw9PeV0V6Oq4NV2pCrIcpt79tUime9sgfBcY80NM9BTrg%26oe%3D69B2A6E5&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [AUD rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613501258_763900836739429_2586031885181820769_n.pdf%3F_nc_cat%3D107%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D22bR_3Cyjo0Q7kNvwE3hERW%26_nc_oc%3DAdnPTg2oCMvy2GupdjsybpZJRJdVuvpwsX5rtZJa7VurnxDBgnByDipagL9NOJEje1o%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzQYrkFbkcSvUb_GWWvV0VCdFr0v8uILPiz8pEkXTcM-g%26oe%3D69B28E43&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Rates and volume tiers in EUR:

  * [EUR rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612915026_1851018822285651_6618063477270339820_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D0PdQxS5LSxYQ7kNvwFXyVXN%26_nc_oc%3DAdnz3kZeqwBJh2rwJCXxZmxLf6qzEN5yKi3c5J1j3uoJGG-Ut2TRqo0U_S7sFH3UZZw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzFHdolS2_18-ljZktYtx0afAgleqDKEzwRsWYx-MPieg%26oe%3D69B2A342&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [EUR volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612491841_2246276429193721_4631922761189101366_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DB8wLn_3XWYAQ7kNvwGlkFm9%26_nc_oc%3DAdmtm04IZbN4sXllW3r7uyLgVPN1MOrHY_GAbWFB0Gyo5nQkFCNJtxKsgK9dIsVIhh8%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwmsULBog7LWFXp5E3T0WASXl3JtJSu6dHB38dVY90AkQ%26oe%3D69B2B252&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [EUR rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F611402038_1365076144846880_6687787258004461540_n.pdf%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DTDmFcOdrI5cQ7kNvwG4yECe%26_nc_oc%3DAdl8YJbOjG9KPVFVF0w0rh-2I2OMcUiZwGE7dwpSZPgtDSs1fehXCtL2fCLqUKG1qZE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzseYO4nJ3wQfs5SsAaRoqr8jTxBZk3ayWkG7exn-nlOg%26oe%3D69B29FE9&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Rates and volume tiers in GBP:

  * [GBP rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613220798_1213179374358230_8917351099919715504_n.csv%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DUTeHQ-jHu60Q7kNvwFvX9HI%26_nc_oc%3DAdn65c0qbWs7aaNXVaRwV12jBa1OYWI_iL5YapMr252xnKs7MHZYlh4xZUy_37WRM-g%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwvbGssbvLhdQgx39DtWKNdYWyv5fLSjCgbw9xhsaHGmA%26oe%3D69B292A7&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [GBP volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613103270_1201270381543536_5873449895943701671_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DycTGPKMaTNEQ7kNvwENQdfp%26_nc_oc%3DAdmb-5lxkcTKvarzNselqF-fO44f_JK3d4B-A8k211y2d6w3L3t5QTfjDSVRYUBJF1I%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afznv-izMysorrmgt24d6NhuA-5rNLaBQBj4gzWddV1BOA%26oe%3D69B29146&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [GBP rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F614378447_1755328639187981_8185748163222129401_n.pdf%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DMCiAr_S_LAgQ7kNvwHtb42t%26_nc_oc%3DAdlxuhKq0DfApaAPEW8EDJF32T5WQ5qJjRyTUGhb6m6tqYY11Clduz9hEsdJGxo_dCQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwI6VaoJ9Rka64EXYAo4WXBmoXf0ymi5ekshY-5Aw3JFA%26oe%3D69B28FCD&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Rates and volume tiers in IDR:

  * [IDR rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612073660_1590866108938555_6360182959847126008_n.csv%3F_nc_cat%3D104%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DQJ28bKVJx8sQ7kNvwEy4kc1%26_nc_oc%3DAdmhblZaioKJRroJ9SGA8NIKhcbk57f26jvNTsGmBy2xsvKwbaNYR68xB7KtICrgtL4%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfyxhaEzunyN4MW9jQ3V4omWWhmtJPIt_ZdGgYTWhAo2tg%26oe%3D69B2C4CE&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [IDR volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612534809_914766097781847_68203316073012715_n.csv%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DDP_swTzypTMQ7kNvwHt_8o3%26_nc_oc%3DAdmbqN1IgcDkgpudNqq9YoxFUBUJ_89a6tNOR-v1x7L6D5NtPA1ED4ze2IUB0EmROdQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afy1MYA5LA68JZILRAbmzqiUg47Jkr0WecKlHNBgBe0nGw%26oe%3D69B2A316&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [IDR rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613023854_1209937397923198_1654831141025997512_n.pdf%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D7PM9aSWsGwgQ7kNvwGElYaV%26_nc_oc%3DAdkqp1ND8SpPjw6_AbOAXbm77o4dyxbqr4YKntS3qWJbgIvmPZaUXNyr2V4tw0kUo7o%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afxf4ppUUEf_3Cvo6NGFM1vy23nJ_TNBd8qD56t5I4hw_Q%26oe%3D69B2B7E7&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Rates and volume tiers in INR:

  * [INR rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612891582_1915472539177641_7245368194742665442_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DD0mIANdKetIQ7kNvwH9Izxn%26_nc_oc%3DAdmG8x9EyjGgY9IOgpaSkxni8gUktoBOWebXdIS6fyIewxMTckDDNYct2RFbqQVPpPA%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzF21PwdiqxekT1pxQnYnV_iNHSUqKFf0fbHLJ5rPtQDg%26oe%3D69B2C525&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [INR volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612637066_1540626437215291_3541164870606595807_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DBAWo8p72uiQQ7kNvwHEeoRp%26_nc_oc%3DAdme0f4RMv5OrPR49Q9Xi3Zo5NK7bF5Q2LjttRlKldrlwSqz_HZ7Agn9wo6DhYe8l-4%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwW6qJuZDaDL5ljwva7PK7Zyfv0KB_0-AkLCiHWSfA1pQ%26oe%3D69B2BCB2&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [INR rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F613427402_1308808131292109_8259516863261584201_n.pdf%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DeJ-fFItncsYQ7kNvwGDKHl2%26_nc_oc%3DAdntvUG-DOwP45YCfm_cT6eGjdGHVY91Mq3t9agd1byaJjOKZZ_eGAHAV-bmTFqs9Dk%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afw15GK60OiuFELUa0Qxr2qteZ4ONGu9M7n9d9C38S-FuQ%26oe%3D69B2AC31&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Rates and volume tiers in MXN:

  * [MXN rates CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612020411_1520914742538571_126144230239442646_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DVm_foTfuFQcQ7kNvwHp1nfy%26_nc_oc%3DAdmRQTTRcmMqvL1UJR5CkB_jJ5oHT-7z2AZQnatzneMCeNQjFeIjOubOOEpDbd7lsC8%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwcXQCXdaYWG5ZAk4IWkNyvayZk7Ow_zRXj2BgTPCAvig%26oe%3D69B29198&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [MXN volume tiers CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612044380_1677827379874778_2409160019059014573_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DVienNppYkpkQ7kNvwGDfKOK%26_nc_oc%3DAdkkploBWaRMorkZOBJjmufpZMSgBZE5i3Hmxn7Bbnx2mAX6Fgo-Y9FO6XyLaDpTTxY%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzJugsKy7aSvY03ZqGU_Jqgdo7U1772NEAoqAyshwDkLA%26oe%3D69B29057&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)
  * [MXN rates and volume tiers PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F612827720_1926445168251428_6596147172436142804_n.pdf%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DD7BZY3WWHAUQ7kNvwENBQiG%26_nc_oc%3DAdnHL6A_3_1mhoCzin9Wx2UHaPz_8W4OpPT3ZvV2Phv-t1rcmGjSic2rSl-_C0ciZzU%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwNjd6a-OulPDmrp1_wAErjJYFGRul4z0w1DpNMxqVvHQ%26oe%3D69B2AB86&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

### Updates to rate cards

Below represents future updates to our rates. See our rate cards above for current rates.

**Rate cards effective July 1, 2026**

Effective July 1, 2026, as of 9am PT – Eligible customers can create new WhatsApp Business Accounts in BRL (Brazilian Reals). This is only available for Solution Partners and directly-integrated clients whose Sold-To country is Brazil in [Billing Hub⁠](https://business.facebook.com/billing_hub/legal_entities). Per our [pricing calendar](/documentation/business-messaging/whatsapp/pricing#pricing-calendar), Meta will publish per-message rates in BRL by June 1, 2026.

**Rate cards effective April 1, 2026**

Effective April 1, 2026, at 12am by WhatsApp Business Account timezone – The rates below apply. These rates reflect:

  * Saudi Arabia – Higher marketing message rate.
  * India – Higher authentication-international rate.
  * Pakistan – Higher utility and authentication rates. No change to the authentication-international rate.
  * Turkey – Lower utility and authentication rates.

Effective April 1, 2026, as of 9am PT – As announced in November 2025, Meta will introduce per-message rates in 8 new currencies to help customers better manage their messaging costs amidst currency fluctuations. WhatsApp Business Account (WABA) currencies cannot be changed, so customers can choose to be charged in a newly-available currency by creating a new WABA in that currency.

  * Argentina - ARS
  * Chile - CLP
  * Colombia - COP
  * Malaysia - MYR
  * Peru - PEN
  * Saudi Arabia - SAR
  * Singapore - SGD
  * United Arab Emirates - AED

Rates effective April 1, 2026 across 15 currencies are reflected below.

Below represents future updates to our rates. See our [current rate cards](/documentation/business-messaging/whatsapp/pricing#rate-cards-and-volume-tiers) above.

Currency |  Rates(CSV) |  Volume tiers(CSV) |  Rates and Volume tiers(PDF)   
---|---|---|---  
USD | [USD rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646470925_1849155895772539_7552673321538952781_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DriS5Bt8IQB8Q7kNvwEWdysD%26_nc_oc%3DAdnVdEDtyqA8TpL8grtNrHKx-Xa_G8FgGqUZs4B_aL0DRcY49JxNd0IR0AYhKwccfz4%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afx2yOypUQvzJ43xZ8tvHdDhRNIpo8GyfpACcTrwFpF7dQ%26oe%3D69B2B604&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [USD volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646306673_1435549594886031_2261744566831300901_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DVhTDNNZuV-sQ7kNvwFQBRWf%26_nc_oc%3DAdnEhYdtl7KPpNhGnjExQTFPYk2oFQn_j5rw-XyZX0VA68ZgA6UuHJdheh5YDNz45Oo%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afxz4GkpIA837QmhMMnIvoD0ztAPchCYmggqEEOE6vWgcw%26oe%3D69B291C4&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [USD rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645496976_875816982085197_2219019266491158387_n.pdf%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DfeWhRq3u2BsQ7kNvwEu0I8N%26_nc_oc%3DAdnGyrMxOD4_OhH_Z9D7iqz4Vts5Ezcq7k7MyHtTZdy5Mww5B2eKKaljncLDoJOzClM%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afw1NlO1thLmHDSsZD6gk_tvB10mDTAlcWfL9WB321fzyw%26oe%3D69B2BF51&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
AED | [AED rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645568463_1218551013344515_5562601556096942883_n.csv%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DlWs96O2j9QoQ7kNvwGt8HXI%26_nc_oc%3DAdlODugDDN5mE4UcIiX8-jOAd-B0p3Ai1OZkp-Jyt8KXOgYLbPrZg9aZjeCfmE3q7dE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzICIx25vx-PghJkAtUGMD8HQinGcbUFb3jhbWzRxqBxw%26oe%3D69B2AE4F&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [AED Volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644884592_1251019696987730_4052510796950881731_n.csv%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DLeueeCkCLREQ7kNvwHvARtX%26_nc_oc%3DAdlLXCCinQ0_WyyKMfguTg0vhDyrC63bCez-b_gBCnw516f5hL-6yOE8kpJc1hJOAdw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxpaL6VNtPEA_wjkm0v7SC2ej_K8M0i3x42y4pXuzwQrA%26oe%3D69B2BABF&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [AED rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645631130_2035100300414824_2224138623976625824_n.pdf%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D7cCP0OAm0WEQ7kNvwEtWphU%26_nc_oc%3DAdnb3GW3j30UI7beHP4NX6p51rD5N-6Rg1bwHuxMnrSL3cSJd-0-ZfIbKv9Okf2ZC8c%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afy-Lr9IXPJ9c2fq13guxZL_9msu0fQDcpmGMKov33wXLw%26oe%3D69B2C2D7&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
ARS | [ARS rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F643913641_4440615829516590_3465054171242509021_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DvD18SU_aAEYQ7kNvwGS7cbi%26_nc_oc%3DAdnoc4cWWEOvs8ukbPY8_XbWW1MoM2pPxNQJm0qZBR0zLvbIBm8QsG0Pb-Ol8DLm0Sw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwtXBgh26jyD7ZXcNl9gKtaVmvxy-6wUGKUo-p3NFqEJQ%26oe%3D69B2AFED&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [ARS volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646298715_1665001634670116_5064640796895645839_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dyn5XWuTJULIQ7kNvwGMPDHI%26_nc_oc%3DAdmc4mmeqHsNIouqg9hi6Ajzfgk0uUkQUk4h2gHRYkPtw3Db_UEHS3FVAphb7Uu-lY8%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxnzcCqFEV96zDohZyYBJzUYAVkBDSlz9iABgShmqVSlA%26oe%3D69B2A2A8&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [ARS rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645582939_1268429208528690_1655505193378266281_n.pdf%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DnHsM0CNHG0sQ7kNvwF8vHLO%26_nc_oc%3DAdkzVnmNzYNlBB07NKGGHj_BnCl0DkJ-10uhH44d4xE45R8vI7aMTf4NlnQUOwWXEfo%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afz74S-8eWevRZJIu3vNFQfDUohDcONWFECCcOLr5nqO0Q%26oe%3D69B2B641&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
AUD | [AUD rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645214705_926106903280653_9059172455483634440_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D0ruTsih0534Q7kNvwE_BvyA%26_nc_oc%3DAdmfbStyM51_jekHQUPOqnUnpgaCiWcS0nOgadwNKlay1mG9rNyG0a_mLh0qgb93nUc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzeLD-7tWv5esC3d5iVV9Q5URJcl2Kg6A0STcE5qnDY3Q%26oe%3D69B29A89&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [AUD volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645532473_3766343983661985_2332432266070842193_n.csv%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DTPX6FWUjUn8Q7kNvwF_2QY4%26_nc_oc%3DAdn3XKAuQHvBL3aYdwXRZwloyLL6mUC1g26c4jI4S9lXlcXLCtClJRCWsVQJplVwtyo%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfyJ_95fraek7MdIZPrQv1bWz8-vFd-iCzO18lK1j85Y7w%26oe%3D69B299D6&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [AUD rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645804786_1126134129579524_6009237526232527587_n.pdf%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DH5WVQoQJa8UQ7kNvwHBO0En%26_nc_oc%3DAdlPcrPS3Q23bHeE84vJ6A43fXqAa9XSXZmoIrXL0y4kG1e_737EBfnFamvVNsdrW9Q%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxZeZT74uRbCYWJm6r_cJXalB_-8p0iWuhXlXVHdy4wpQ%26oe%3D69B2B966&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
CLP | [CLP rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645117105_1445559120350029_5331117661031875470_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DBb5nk5cXCpQQ7kNvwF92xTo%26_nc_oc%3DAdmEABbRyfoj2-6tyIBOMLA_lSfKs8oOxBofRbuydojwud4yHDTp5B23UbtxracuXlQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afwrtoq6pi9GGMC42y1xoAveXnOPB2FkLLroAagUbc1sVA%26oe%3D69B2B6DB&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [CLP volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646099733_1592291005343764_8884003281514145550_n.csv%3F_nc_cat%3D109%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DJ4jXWCEHo3cQ7kNvwEY8dFU%26_nc_oc%3DAdmAr2WTPynZ3dM6I2VkTJ5uOniCSCY9sAHenv2QUlJKrO0e0rrER_TPzrx9NwHPPfk%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzSKrtLTbzVGkYPVkJ1U__Is4Oa5_pwsusz1_Wg6L23nw%26oe%3D69B29A4E&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [CLP rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645929741_1210713851143066_2773150999300661104_n.pdf%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DRo9wHZVW2CMQ7kNvwF4V1bh%26_nc_oc%3DAdmMO1vymHTIg10QPOn0udgBQIXnO0TtvO0HFvVNoq8odcVrtfqZ05Q0UvqKkM0QB70%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxiJtGMzLp0RkqIuNeEoxHkPmJ-wyQknH_MdfKDKhwtoA%26oe%3D69B2AF6B&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
COP | [COP rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646133333_1211289621088523_2636271817655230827_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DBTUcE5Q3_cwQ7kNvwFqZxeY%26_nc_oc%3DAdkTdqmzZ9WwHGyg-ELmN59pE9NsxvSOVecGMUx_qsNb7V_IERYARWTTAnPUfXw4EhM%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwWyX9Otyyo7sSjpKkQGHXpi3Odm4RUnOhoSil3UHRZmg%26oe%3D69B2B61F&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [COP volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645837202_1462156562105280_792028471136264795_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DeurI9FV0JYwQ7kNvwFIlQ-5%26_nc_oc%3DAdlTR12MwuNOdUjh24Ylatp-0zDkhrD7dCY9EIxYpll8nUrNb-3gQuxZB0RpGxoR3GI%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxGLhR511FF3DxpHVlxa6R8v53X7xxqENKaM6cO7ZjbsQ%26oe%3D69B2C5ED&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [COP rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645914603_1406397620652471_4722825080262332290_n.pdf%3F_nc_cat%3D109%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DIDaHZaSqbkgQ7kNvwGso-Nx%26_nc_oc%3DAdnvjJU9544qVl9tGW58jrxk0CxW25mIkmQbtyp-WZ11ecOT8LWsuiw9MFxZjwvM5ak%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afy5dwsXAtqoxVHUyz1tBIoWRWiQF5y63MCUD1wY0SnUag%26oe%3D69B2C0D0&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
EUR | [EUR rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645657810_1506583167707281_5211914176614444549_n.csv%3F_nc_cat%3D109%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D5HTA7Jj1etEQ7kNvwHFLf6f%26_nc_oc%3DAdnT6NCt9XWz_3NaYBvq6Sduoxo3lvAtOOePkyCspJ1-srLdC5x6IOgWNyIUaz4Qmqw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfysU81NTwkiWhH4YB6hJduBVox9Ud01UarhuenNG4yZtw%26oe%3D69B28FB5&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [EUR volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646407708_1628331888477444_1399223550584718589_n.csv%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DpnnL28fwDooQ7kNvwHT5Tx5%26_nc_oc%3DAdnVXs-DojlSNSFHbVULh5KtZlvnnpx1mptLGf-dCXLiFigrAbCQfDWe8fP2MBCPLR0%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfywmiwWhjh-9VUMF5922znniW3zIocpMZGFfDer0OsaRQ%26oe%3D69B2A6F9&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [EUR rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644400405_3352091681633190_2586888755581435859_n.pdf%3F_nc_cat%3D109%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dt-s4I1wd-2AQ7kNvwF4uJK9%26_nc_oc%3DAdnrkkpiRqn1kjqobFjPx9wvvU7AsvARd2s0HyBEc28k16is8oC0e4eQaqAq9jjwzyU%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afy9hHfTQJZrzDtkLFoiK6gWdMPp5tMhY7jM0c_rvsONlw%26oe%3D69B2AEB6&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
GBP | [GBP rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645512344_2936605500064292_6503548893920492980_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DWhjRsr2iCCwQ7kNvwE9whmW%26_nc_oc%3DAdnav4_UmzwyLgQ6EOk9U12NH_QuUClHKiPOamjAH1kF0i7vwwsdIeUoivIKVzduNms%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxM7LtnWu55FSUhF9qmMGOxt8TnO-FH_yu3rFiIH1WxrQ%26oe%3D69B291C7&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [GBP volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646069105_1235686318174867_3885515129383727955_n.csv%3F_nc_cat%3D107%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DE2fY25GC7UIQ7kNvwHruxkA%26_nc_oc%3DAdlEjounJI0Y31mV_iKqDGLi9sHeoG0U8kj77AVzJIgA-uJmWm4A6WKNlH2rxXmhb0Y%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxUrlfRylcjbyepeIzy_05oxW-IgSm8LgU_nOwvMqPTqw%26oe%3D69B2A752&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [GBP rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645607000_1962269551367326_4978849776780260406_n.pdf%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DBunOkynJAM8Q7kNvwFUGz9q%26_nc_oc%3DAdmOqTPjXE73Y3arYJlsCpAgMzfq61p4Kst4gCBAyUAvfX7b4LFhMHSC9TqwYTMRJQ4%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afx2A7z7M0YQ3Em08r_iXwJgwqJPCdVZCbf6Vabn8pDZDw%26oe%3D69B2B740&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
IDR | [IDR rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645587393_1342652894302700_2285464581249130509_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DRp9I614-AEUQ7kNvwG5XBOv%26_nc_oc%3DAdm-CqxAZXoc2i4Dg_Dbu8GsSUZZMpHw2bbXA4jd0RnC-YBafK6L4jxKlq5enofDqyw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afw8rioEXe0GDWGt4CRvvRqjQ3J2eXDqmGMT9_nONT4hNg%26oe%3D69B2A41B&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [IDR volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645618453_4384412775139879_7250237823263059099_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DYW5JzNZrUBoQ7kNvwHepDLn%26_nc_oc%3DAdmQ7cMgu3JW4W7HtfFg-ZDQIv0-SjKWVUmGruK1iHmN7Rjs41WMf9p9YoI_fVMxW_Y%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afx0QIKXG8VDy4mCst9FFgEX6pyMLtHhL8JhvbcxaAE-SQ%26oe%3D69B29BDC&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [IDR rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645784931_1631884417835144_8385037940032668186_n.pdf%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D78Oa2k9N5b0Q7kNvwHM8zYj%26_nc_oc%3DAdkXbjw2UHVQunRLiWWtDMxA55rhihWnytJyy1bLuZuqt9Xk7YZyrQ1hmK315g_KqXQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfyWvje5M74o2mwu0hQQrs5YW7Hex3L8kaeGJ2nzjaE2vA%26oe%3D69B2B425&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
INR | [INR rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644691399_780808657975887_7414210297525862992_n.csv%3F_nc_cat%3D104%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dj9ExP14ZiecQ7kNvwGzlKj3%26_nc_oc%3DAdnv8_X1rbXGLHN-EazTuTeQ2Ep_jIxtAKjid_n9X62FpTJmtQBWlZdDdua5xTx9o0A%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afxjos3wwMNAeBcSdZciN_WMCnxXwDDFv6rj_PEjhMpP7Q%26oe%3D69B2A56A&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [INR volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645821617_1655024272180131_6677648043329546477_n.csv%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DsC20GJQrUzIQ7kNvwGQIWUb%26_nc_oc%3DAdnrCKST2crwfiKKrXJJNfpO8k78-D2YIBhciyN9A7zvq4FMesTesbPmzl-auD-mJS8%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzqKZKG8kpT4T0LvQZYVO1ARXG5SELuiPt1dH0nKJ_8lg%26oe%3D69B2C0F9&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [INR rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645340924_1688614612580625_263955352162865764_n.pdf%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DakeyZFmskPcQ7kNvwE6pwZB%26_nc_oc%3DAdl8Oip1ZN6s-WKd6WOHrcY20cwRFNy-gOaCazyRTrlXy827YdPx-cfEokiLid8h3SA%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfyjkjZQuFTkMqfSxDovHAtfYx4nn4IMHcsaEGTo8CT7-Q%26oe%3D69B2AB7C&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
MXN | [MXN rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645445263_1271743954832842_1411479554011782916_n.csv%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dj0IkwlmcRlgQ7kNvwH6BkK2%26_nc_oc%3DAdkS7adet1Ht29p7o0xbAgtobcSuz_JEp8WjGbNAtFc4tN8re3AqdI00U4gKt3MOKHE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afya9A2pfw7j_ZeQjFakIey2_z0I3kHJ6UgNPRFP0YIbEg%26oe%3D69B2900E&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [MXN volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646192865_928155136530656_947493470799381719_n.csv%3F_nc_cat%3D101%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dw-voRqI0o4wQ7kNvwEh4FvQ%26_nc_oc%3DAdnZzpm4Q1z1fT4lUak79haXpuimPmNcvjHzDf00Nhq1tb0VVhu_3nvswUC-njHqKpQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzlZ24Vc0iwFLQx5y0iHnXra2xO5ID5mounimVu2gBafQ%26oe%3D69B29970&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [MXN rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645566606_944960415149672_8610149435879562431_n.pdf%3F_nc_cat%3D104%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DpL6gRInmLeoQ7kNvwETn1vv%26_nc_oc%3DAdnNy9Uw2ASF_nSM4E58Mkjtcn03qsjaiF9DiZmd8_l4E4CnGxcEmfT_mC6gKlYZeYo%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxB-XQ8mOhsz8tCwCnND5LqtcooQEI7uHUsmS_U4XrL5Q%26oe%3D69B29590&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
MYR | [MYR rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646114417_2136379863764004_2630854448304510767_n.csv%3F_nc_cat%3D107%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dx0Gd1XmjQJwQ7kNvwHYSOUV%26_nc_oc%3DAdlU1Lx-CbhcUygDIEzvyewvsOntZRhrCqbsFc18YnSlgSees1Y9EHICSvlik_XR8YM%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfymqhT2yKp_SI1o6Q5DLNh1JOOrgxJAmnK1u7jfYNjA0A%26oe%3D69B2A46B&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [MYR volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644697449_872977558897233_1162427474351345029_n.csv%3F_nc_cat%3D110%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D2_J_9E3ebxgQ7kNvwFEuznO%26_nc_oc%3DAdkoUH3mmVb1IQgowCLaudakApEdg8-w-hv30HG68tB7op4dOsp783mmpI_5zoMxLVc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfySacV3g1IQYfQHLxuc5jZaS6_9g4dC48pxfPkGFk-IdA%26oe%3D69B2A62A&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [MYR rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646539144_1277569544265333_5845311436988828454_n.pdf%3F_nc_cat%3D107%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DdQP1YzP7lL0Q7kNvwGf7ev1%26_nc_oc%3DAdlLYM0hHl41qi-etpmuym0bxSSWyZZCUaZHjHCjSEBRuBWPYsamENFj2s8MmDx7wEw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfzlwjFK2fbkxwhz-oGeJ180lBYS9I_3XqAY3Xa_jt7rSw%26oe%3D69B2A2B8&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
PEN | [PEN rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644526679_1245236104472842_5372707696864398897_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D7bjYzSL6ycQQ7kNvwFzYEdK%26_nc_oc%3DAdkY-qaJRvZT3wNGGg0K-EUKGcJUlwDvJkLfASRXlK62j0VfFEBb2YS6dqcmlZ-uXsI%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxHJIHOTrPdpIlBDh1DYJIVBJiNm4Uuf8vq5RaQrFeNtw%26oe%3D69B292B5&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [PEN volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646333054_895979836675305_867995930513186609_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D6DXrB9rENO0Q7kNvwG0HEWq%26_nc_oc%3DAdlqVY0E-9AYdDfulRgC4e73wQoDPHs7zg0Y6givPBYbB7r8D8--SQEJDtRhvux48BA%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afz51ade0VFx4KH4JcDAl_K9YHkZoCYRMNDZeVXlwbSdUw%26oe%3D69B2B33A&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [PEN rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645589709_1370458944837684_3841619281669354961_n.pdf%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DMan9N0BdSL4Q7kNvwHMaSG8%26_nc_oc%3DAdnJyXMAKL75wuWr85JCQIsM-CrTBHckzqvNXkqjUKIz33o4XkbG-0RvIrZMld7kI_4%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfxYFTCqk7y89ESaz-Q6GKGjqCVo8J5LAro8xjqktMsATA%26oe%3D69B29E51&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
SAR | [SAR rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645645764_916404958018930_2300127246605885555_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DTDRqYUSSPt0Q7kNvwEngTnk%26_nc_oc%3DAdnerglihkKMi1RcXAOT3Pjgo_Mo7OvVASINtu5KhhPzuNOQBBNz37g5Sut8Rs7J0RQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfyB4Xxg8YFgvH5pbrigNdHODQlfnz0zKuO3CcRBmCB3EA%26oe%3D69B2B726&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [SAR volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646716218_1310823414430310_1575388575695975710_n.csv%3F_nc_cat%3D107%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DGlWFY66GSLQQ7kNvwFLO5rE%26_nc_oc%3DAdnNjjzOWZ0F3OSCIRvDrQKl3eWhgvKn8qsIUevcqrltN-zixbe22g6nMm1lCdrbu68%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfyCALF2MZykKMlOv597ZUbQZUVdXjTdQ2UNpAgdrbuASQ%26oe%3D69B2B397&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [SAR rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645775673_1461224458735741_2238612946963442858_n.pdf%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dz4VThy_q5-UQ7kNvwEevAFZ%26_nc_oc%3DAdm9_KuirtA-S3S5ZFJSoPMhH-KL7nimjTn0Qc-h6BFPZqeCQwNnUhrWY7b6LkBmUvg%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwEvQFdJSuGKu5eej3fZo9u7HsWL68icZOScux6rsnfzQ%26oe%3D69B2A66A&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
SGD | [SGD rates effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F628896908_776793545472202_7743392366323079631_n.csv%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DSoDYck0uzKsQ7kNvwF5r8Oh%26_nc_oc%3DAdmRG5Ir-vNFPpl63yYDVj9lvXQhFe8VXPku-okPw83sUNeiAmggtywATi7QGTC_QAE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwzE91Gec262jn-o1Fji-WJlIknhf0Ew6m3Zo0x-bo2Gg%26oe%3D69B2B37A&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [SGD volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644180979_1552935369145288_6674819583459142637_n.csv%3F_nc_cat%3D110%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DgvEo1h5VYCUQ7kNvwGbqyOR%26_nc_oc%3DAdnxfWnY1r-CXH3AftMq43qJeqGrvobvJND5F18DVuK-KnxV83kpVkpPKWX3I_J0vAc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwX6im4wGn7Ff9l5Y1JUTrKXpFQDAkyfN1mAO6r_x_jOQ%26oe%3D69B2BD74&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)| [SGD rates and volume tiers effective April 1, 2026](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F644858913_1277822710882171_4488990594670025917_n.pdf%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DjIoCfmHKyRwQ7kNvwHQSFjl%26_nc_oc%3DAdmAx73yZ1job7xSFUXDV0aYJx7lwlCHowzIidue3XolpX-yR5bEc7F4mcL6CpbWs5k%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_AfwwSy4-mbEj0-LfND0WQfjSFEBB_EUEfRj9HCOxfBjp6Q%26oe%3D69B2A663&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)  
  
**Billing localization for India and Brazil**

Meta is introducing billing localization to help eligible customers to better manage costs of messaging amidst currency fluctuations. This will apply to the markets below, and specifically to Solution Partners and directly-integrated clients whose Sold-To country in Billing Hub is a market below:

  * [India⁠](https://www.facebook.com/business/help/2301408543603167) – As of January 1, 2026.
  * [Brazil⁠](https://www.facebook.com/business/help/4344414845795884) – As of July 1, 2026.

**Previous updates**

  * Effective January 1, 2026 at 12am by WhatsApp Business Account timezone, the rate updates below applied: 
    * India - Higher marketing rate.
    * France, Egypt - Lower marketing rates.
    * North America - Lower utility and authentication rates.
  * Effective October 1, 2025 at 12am by WhatsApp Business Account timezone, the rate updates below applied: 
    * Colombia – Higher utility and authentication rates.
    * Mexico – Lower marketing rates.
    * United Arab Emirates – Higher marketing message rate.
    * Argentina, Egypt, Saudi Arabia – Lower utility and authentication rates.
    * Zimbabwe is mapped to our “Rest of Africa” region vs. “Other”. Messages delivered to WhatsApp users with a +263 country calling code (Zimbabwe) will be charged “Rest of Africa” rates.
  * Effective July 1, 2025 – Lower utility and authentication message rates across several markets, to ensure pricing is on-par to alternate channels for these use cases. Marketing conversation rates became marketing message rates.
  * Effective April 1, 2025 – Lowered [authentication-international conversation rates](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) for Egypt, Nigeria, Pakistan, and South Africa.
  * Effective February 1, 2025 – Lowered [authentication conversation rates](/documentation/business-messaging/whatsapp/pricing#rates) for Egypt, Malaysia, Nigeria, Pakistan, Saudi Arabia, South Africa, and the United Arab Emirates.
  * Effective November 1, 2024 – [Service conversations](/documentation/business-messaging/whatsapp/pricing/conversation-based-pricing#service-conversations) are now free for all businesses.
  * Effective October 1, 2024 – Updated [marketing conversation rates](/documentation/business-messaging/whatsapp/pricing#rates) in India, Saudi Arabia, the United Arab Emirates, and the United Kingdom.
  * Effective August 1, 2024 – Lowered [utility conversation rates](/documentation/business-messaging/whatsapp/pricing#rates).

### Authentication-international rates

Specific countries have an authentication-international rate. Our rate cards reflect these rates. See [Authentication-International rates](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) to learn about these rates and if they apply to you.

### Country calling codes

Charges for conversations are based on the country calling code of the recipient WhatsApp phone number. The table below shows how Meta maps country calling codes to countries or regions. If a country is not listed below, it maps to **Other**.

This information is also available in a CSV file:

[Country Calling Codes and Regional Rate Mapping CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F559604326_1510649803514615_3972087685039081235_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DyPuW5PepK58Q7kNvwHhRZv3%26_nc_oc%3DAdlgDKx8EmA6DquA-W9lDLAQV0xgEDhoJUdJvoPLJy79FZq3Iso7K9OkAg4UzfW5PFc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3Dtd7DLRsztx4zDnbzAPkKFg%26_nc_ss%3D8%26oh%3D00_Afy2YR-x1bTfc0d8oLfrUMi2r6USypeY-Jyq2bknxp2aqA%26oe%3D69B29413&h=AT4B9ZsmM2hKjZtYr8GPFhG9sJIa2mrjAZHBQCoaZbjLaNdWyLNrUYaRSE7boTth2alKk7Ea12x5PiiBpjnElfPF21ZMUrxycupB2iEMf5aPErIYszz5L8odRzMH7lIQjTf9Haz612lPSp3KpNwTpw)

Markets |  Calling Code   
(and network prefix if applicable)   
---|---  
Countries   
Argentina  
  
Brazil  
  
Chile  
  
Colombia  
  
Egypt  
  
France  
  
Germany  
  
India  
  
Indonesia  
  
Israel  
  
Italy  
  
Malaysia  
  
Mexico  
  
Netherlands  
  
Nigeria  
  
Pakistan  
  
Peru  
  
Russia  
  
Saudi Arabia  
  
South Africa  
  
Spain  
  
Turkey  
  
United Arab Emirates  
  
United Kingdom|   
54  
  
55  
  
56  
  
57  
  
20  
  
33  
  
49  
  
91  
  
62  
  
972  
  
39  
  
60  
  
52  
  
31  
  
234  
  
92  
  
51  
  
7  
  
966  
  
27  
  
34  
  
90  
  
971  
  
44  
North America   
Canada   
  
United States|   
1   
  
1  
Rest of Africa   
Algeria   
  
Angola   
  
Benin   
  
Botswana   
  
Burkina Faso   
  
Burundi   
  
Cameroon   
  
Chad   
  
Republic of the Congo (Brazzaville)   
  
Eritrea   
  
Ethiopia   
  
Gabon   
  
Gambia   
  
Ghana   
  
Guinea-Bissau   
  
Ivory Coast   
  
Kenya   
  
Lesotho   
  
Liberia   
  
Libya   
  
Madagascar   
  
Malawi   
  
Mali   
  
Mauritania   
  
Morocco   
  
Mozambique   
  
Namibia   
  
Niger   
  
Rwanda   
  
Senegal   
  
Sierra Leone   
  
Somalia   
  
South Sudan   
  
Sudan   
  
Swaziland   
  
Tanzania   
  
Togo   
  
Tunisia   
  
Uganda   
  
Zambia   
  
Zimbabwe|   
213   
  
244   
  
229   
  
267   
  
226   
  
257   
  
237   
  
235   
  
242   
  
291   
  
251   
  
241   
  
220   
  
233   
  
245   
  
225   
  
254   
  
266   
  
231   
  
218   
  
261   
  
265   
  
223   
  
222   
  
212   
  
258   
  
264   
  
227   
  
250   
  
221   
  
232   
  
252   
  
211   
  
249   
  
268   
  
255   
  
228   
  
216   
  
256   
  
260   
  
263  
Rest of Asia Pacific   
Afghanistan   
  
Australia   
  
Bangladesh   
  
Cambodia   
  
China   
  
Hong Kong   
  
Japan   
  
Laos   
  
Mongolia   
  
Nepal   
  
New Zealand   
  
Papua New Guinea   
  
Philippines   
  
Singapore   
  
Sri Lanka   
  
Taiwan   
  
Tajikistan   
  
Thailand   
  
Turkmenistan   
  
Uzbekistan   
  
Vietnam|   
93   
  
61   
  
880   
  
855   
  
86   
  
852   
  
81   
  
856   
  
976   
  
977   
  
64   
  
675   
  
63   
  
65   
  
94   
  
886   
  
992   
  
66   
  
993   
  
998   
  
84  
Rest of Central and Eastern Europe   
Albania   
  
Armenia   
  
Azerbaijan   
  
Belarus   
  
Bulgaria   
  
Croatia   
  
Czech Republic   
  
Georgia   
  
Greece   
  
Hungary   
  
Latvia   
  
Lithuania   
  
Moldova   
  
North Macedonia   
  
Poland   
  
Romania   
  
Serbia   
  
Slovakia   
  
Slovenia   
  
Ukraine|   
355   
  
374   
  
994   
  
375   
  
359   
  
385   
  
420   
  
995   
  
30   
  
36   
  
371   
  
370   
  
373   
  
389   
  
48   
  
40   
  
381   
  
421   
  
386   
  
380  
Rest of Western Europe   
Austria   
  
Belgium   
  
Denmark   
  
Finland   
  
Ireland   
  
Norway   
  
Portugal   
  
Sweden   
  
Switzerland|   
43   
  
32   
  
45   
  
358   
  
353   
  
47   
  
351   
  
46   
  
41  
Rest of Latin America   
Bolivia   
  
Costa Rica   
  
Dominican Republic   
  
Ecuador   
  
El Salvador   
  
Guatemala   
  
Haiti   
  
Honduras   
  
Jamaica   
  
Nicaragua   
  
Panama   
  
Paraguay   
  
Puerto Rico   
  
Uruguay   
  
Venezuela|   
591   
  
506   
  
1 (809, 829, 849)   
  
593   
  
503   
  
502   
  
509   
  
504   
  
1 (658, 876)   
  
505   
  
507   
  
595   
  
1 (787, 939)   
  
598   
  
58  
Rest of Middle East   
Bahrain   
  
Iraq   
  
Jordan   
  
Kuwait   
  
Lebanon   
  
Oman   
  
Qatar   
  
Yemen|   
973   
  
964   
  
962   
  
965   
  
961   
  
968   
  
974   
  
967  
Other   
All other countries|   
Varies by country  
  
## Volume tiers

You can unlock lower utility and authentication rates based on the number of messages you send in a month.

### Tiering accrual

  * **Messages are aggregated at the business portfolio level, across all WhatsApp Business Accounts (WABAs) owned by the portfolio** — To determine what tier rates may apply in a given month for a given market–category pair, Meta aggregates messages across all of a business portfolio’s WABAs for each market-category pair (e.g., Brazil–authentication, Brazil–utility, India–authentication, and so on).
  * **Only messages that are charged count toward the tiers** — Thus, the following messages do not count: 
    * Utility templates delivered to WhatsApp users within an open customer service window.
    * Utility templates delivered within a free entry point window.
  * **Volume tiers will be determined solely by Meta** — All insights data is approximate due to small variations in data processing. Undue reliance should not be placed on insights data.

### Key dynamics

  * **Tiers are market–category specific** — Volume tiers are aligned to our rate cards and differ by market (e.g., Brazil or Rest of Latin America) and category (utility, authentication).
  * **Rates are tier-specific** — When a business sends enough messages at a given market–category pair to reach the next tier, they unlock the rate of the next tier, specifically for messages in that tier. This rate applies across all of their WABAs.
  * **Tiers reset monthly** — At the start of the next month (12am WABA timezone), message count resets to 0 and businesses begin to accrue messages toward that month.

### Volume tiers examples

The table below is illustrative and only highlights the dynamics of volume tiers. Please refer to our rate cards to see the rates charged.

Below are several examples to highlight how the tiers work and what is charged in a given month, for a given market–category. These examples refer to the illustrative table above:

Example 1: A business that sends a total of B authentication messages in a month to India is charged:

  * List rate for the first A messages.
  * Tier rate 1 for messages A+1 to B.
  * Total charges for that month = Rate per tier 𝗑 messages in each tier.

Example 2: A business that starts to be charged our authentication-international rates on the 15th day of the month:

  * Day 1 to 14 of that month: Volume tiers apply on the authentication rate.
  * Day 15 onward of that month: Volume tiers apply on the authentication-international rate, with messages continuing to accrue in that month. For example, if a business has already reached the Tier 2, the business would be charged Tier 2’s authentication-international rate:

Example 3: A business has 3 WABAs sending authentication messages to India. For WABA A, it is still July 31 based on their timezone. For WABAs B and C, it is already August 1 based on their timezone. For July, the business is already being charged Tier Rate 1.

  * The business portfolio will be accruing toward tiers for both July (via WABA A) and August (via WABAs B, C) for a period of time.
  * The business can reach the next tier for July, via WABA A. If that happens, messages for the remainder of July for WABA A will be charged Tier Rate 2.

Example 4: A business has 3 WABAs, integrated across 2 solution providers. Provider 1 sends the first B messages in a given month, and provider 2 starts sending messages as of when the business is in the 3rd tier. The business does not send enough messages that month to reach the next tier. What we would charge each provider:

  * Provider 1: List rate for A messages, then Tier Rate 1 from A+1 to B, and Tier Rate 2 for B+1 to C.
  * Provider 2: Tier Rate 2 across all of their messages.

### Tiering webhooks

Starting October 1, 2025, an [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) webhook with `event` set to `VOLUME_BASED_PRICING_TIER_UPDATE` will be triggered when your WhatsApp Business Account reaches a new volume tier, in any market, in a given month. This complements our [pricing_analytics](/documentation/business-messaging/whatsapp/analytics#pricing-analytics) endpoint, which will continue to provide intra-month tiering progress and tiering information for delivered messages.

Example webhook:
    
    
    {  
      "object": "whatsapp_business_account",  
      "entry": [  
        {  
          "id": "102290129340398",  
          "time": 1743451903,  
          "changes": [  
            {  
              "value": {  
                "volume_tier_info": {  
                    "tier_update_time": 1743451903,  
                    "pricing_category": "UTILITY",  
                    "tier": "25000001:50000000",  
                    "effective_month": "2025-11",  
                    "region": "India"  
                },  
                "event": "VOLUME_BASED_PRICING_TIER_UPDATE"  
              },  
              "field": "account_update"  
            }  
          ]  
        }  
      ]  
    }  
      
    

  * `tier_update_time` tells when your WABA reached a higher volume tier (Unix timestamp).
  * `pricing_category` tells you the template category for which your new volume tier rate applies.
  * `tier` tells you the new volume tier’s lower and upper bounds.
  * `effective_month` tells you the month in which your new volume tier rate is in effect.
  * `region` tells you the WhatsApp user country/region for which your new volume tier rate applies.

Note that it’s possible for multiple [account_update](/documentation/business-messaging/whatsapp/webhooks/reference/account_update) webhooks to be triggered that describe the same tier switch event. In these cases, use the webhook with the smaller `tier_update_time` Unix timestamp as the official webhook.

### Tiering analytics

You can get [volume tier information](/documentation/business-messaging/whatsapp/analytics#volume-tier-information) via [template analytics](/documentation/business-messaging/whatsapp/analytics#template-analytics).

## Free non-template messages

Non-template messages, which can only be sent within an open [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows), are free. These messages will have `type` set to `free_customer_service` in the `pricing` object of status [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks:
    
    
    "pricing": {  
      "billable": false,  
      "pricing_model": "PMP",  
      "type": "free_customer_service",  
      "category": "service"  
    }  
      
    

## Free utility template messages

Utility template messages sent within an open [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) are free. These messages will have `type` set to `free_customer_service` and `category` set to `utility` in the `pricing` object of status [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks:
    
    
    "pricing": {  
      "billable": false,  
      "pricing_model": "PMP",  
      "type": "free_customer_service",  
      "category": "utility"  
    }  
      
    

### Edge case

If you send a message to a WhatsApp user prior to July 1, 2025 (which is when Meta switched from conversation-based pricing to per-message pricing), a utility conversation is opened between you and a user that spans the switch to per-message pricing (the conversation was opened before the switch but won’t close until after the switch). In this case, utility templates sent to the user after the switch while the conversation is open will be free, but attributed to the open conversation. In status [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks, these messages will have a `pricing_model` of `CBP` and the utility conversation ID will be assigned to `conversation.id`. Once the conversation closes, subsequent utility messages will use per-message pricing, which will be reflected in new webhooks.

## Free Entry Point windows

If a WhatsApp user messages you via a Click to WhatsApp Ad or Facebook Page Call-to-Action button using a device running our Android or iOS app (our desktop and web apps are not supported):

  * A 24-hour [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) is opened (as normal).
  * If you respond within 24 hours using any type of message, the message will be free, and a Free Entry Point (“FEP”) window will be opened, starting from the time when you responded.

FEP windows remain open for 72 hours. While open, you can send any type of message to the user at no charge. Note, however, that the customer service window is independent of the FEP window, so if the customer service window closes, you will only be able to send template messages.

## New pricing policy for AI Providers leveraging WhatsApp Business Platform

Click [here](/documentation/business-messaging/whatsapp/pricing/ai-providers) to learn more about our new pricing policy for “AI Providers” leveraging WhatsApp Business Platform, which is effective February 16, 2026 and updated as of March 4, 2026.

## Analytics

Use the [pricing_analytics field](/documentation/business-messaging/whatsapp/analytics#pricing-analytics) to get per-message pricing breakdowns and tiering information for delivered messages.

## Webhooks

Billable messages have `type` set to `regular` in the `pricing` object of status [messages](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) webhooks:
    
    
    "pricing": {  
      "billable": true,  
      "pricing_model": "PMP",  
      "type": "regular",  
      "category": ""  
    }  
      
    

The `` tells you what rate was applied (e.g. `marketing`). See the status messages webhook reference for a list of possible values.

Note that currently, tiering information is not included in any webhooks. Use the [pricing_analytics field](/documentation/business-messaging/whatsapp/analytics#pricing-analytics) to get tiering information for delivered messages.

## Billing

Billing and billing-related actions are handled through the Meta Business Suite. See [About Billing For Your WhatsApp Business Account⁠](https://www.facebook.com/business/help/2225184664363779) for more information.

## WhatsApp Business Calling API pricing

The WhatsApp Business Calling API has different pricing. See our [Calling API pricing document](/documentation/business-messaging/whatsapp/calling/pricing) to learn more.

## Conversation-based pricing

[Conversation-based pricing](/documentation/business-messaging/whatsapp/pricing/conversation-based-pricing) is deprecated. It was replaced with per-message pricing on July 1, 2025.

Did you find this page helpful?

ON THIS PAGE

Cloud API and Marketing Messages API for WhatsApp

Pricing explainer

Message template categories

Template messages vs. non-template messages

Charge example

Pricing calendar

Rates

Rate cards and volume tiers

Updates to rate cards

Authentication-international rates

Country calling codes

Volume tiers

Tiering accrual

Key dynamics

Volume tiers examples

Tiering webhooks

Tiering analytics

Free non-template messages

Free utility template messages

Edge case

Free Entry Point windows

New pricing policy for AI Providers leveraging WhatsApp Business Platform

Analytics

Webhooks

Billing

WhatsApp Business Calling API pricing

Conversation-based pricing

* * *