# Conversation-based pricing (DEPRECATED)

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/conversation-based-pricing

---

# Conversation-based pricing (DEPRECATED)

Updated: Nov 14, 2025

Conversation-based pricing is deprecated. It was replaced on July 1, 2025, with [per-message pricing](/documentation/business-messaging/whatsapp/pricing). The document below is for reference purposes only.

This document explains how conversation-based pricing works on the WhatsApp Business Platform.

Charges are applied per conversation, not per individual message sent or received.

Conversations are 24-hour message threads between you and your customers. They are opened and charged when messages you send to customers are delivered. The criteria that determines when a conversation is opened and how it is categorized is explained below.

Businesses are responsible for reviewing the category assigned to their approved templates. Whenever a template is used, a business accepts the charges associated with the category applied to the template at time of use.

## Conversation categories

Conversations are categorized with one of the following categories:

  * **Marketing** — Enables you to achieve a wide range of goals, from generating awareness to driving sales and retargeting customers. Examples include new product, service, or feature announcements, targeted promotions/offers, and cart abandonment reminders.
  * **Utility** — Enables you to follow-up on user actions or requests. Examples include opt-in confirmation, order/delivery management (e.g., delivery update); account updates or alerts (for example., payment reminder); or feedback surveys.
  * **Authentication** — Enables you authenticate users with one-time pass codes, potentially at multiple steps in the login process (e.g., account verification, account recovery, integrity challenges).
  * **Service** — Enables you to resolve customer inquiries.

Marketing, utility, and authentication conversations can only be opened with template messages. Service conversations can be opened with any type of message other than a template message.

See [Message Types](/documentation/business-messaging/whatsapp/messages/send-messages#message-types) to learn more about the various types of messages you can send to customers.

## Opening conversations

Conversations are opened when you send a message to a customer under the following conditions.

### Marketing, Utility, and Authentication Conversations

When you send an approved marketing, utility, or authentication template to a customer, we check if an open conversation matching the template’s **category** already exists between you and the customer. If one exists, no new conversation is opened. If one does not exist, a new **conversation of that category** is opened, lasting 24 hours.

For example:

  * **Hour 0:** You send a targeted promotion (marketing [template message](/documentation/business-messaging/whatsapp/messages/template-messages)) to a customer. No open marketing conversation exists between you and the customer, so a marketing conversation lasting 24 hours is opened.
  * **Hour 4:** The customer completes an order on your site, so you send them an order confirmation (utility template message). No open utility conversation exists between you and the customer, so a utility conversation lasting 24 hours is opened.
  * **Hour 10:** You send a shipment confirmation (utility template message) to the customer. An open utility conversation already exists between you and the customer, so a new utility conversation is not opened.

To learn more about template categories and how to choose an appropriate category when creating templates, see [Template Categorization](/documentation/business-messaging/whatsapp/templates/template-categorization).

For additional examples, see our [pricing explainer PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F350685135_631521772182777_716278591301876804_n.pdf%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DnSJzxHVOSdcQ7kNvwHck0Mx%26_nc_oc%3DAdlEPyAOT4KEfhiz6UpkZpG1u40Dq7tDYzujroBFXHWTfkkP76NuE75H4y5-ZAi4bIY%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfwFuzdav8gHbuOXm-QX4vR3ZoOu8KMgB5BYnajY8OizYA%26oe%3D69B2A450&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA).

### Service conversations

Service conversations are now free. This change does not affect how service conversations are opened.

A service conversation is opened when any message other than a template message is delivered to your customer and no open conversation of **any category** exists between you and the customer.

Note that a [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) must exist between you and the customer before you can send them a non-template message.

For example:

  * **Hour 0:** You send a targeted promotion (marketing template) to a customer. No open marketing conversation exists between you and the customer, so a marketing conversation lasting 24 hours is opened.
  * **Hour 4:** The customer messages you. This opens a customer service window between you and the customer, allowing you to send them any type of message for the next 24 hours.
  * **Hour 5:** You send an interactive list message to the customer. An open conversation already exists between you and the customer (a marketing conversation in this case), so a service conversation is not opened.
  * **Hour 24:** The marketing conversation expires.
  * **Hour 25:** The 24-hour customer service window is still open, so you send a second text message to the customer. No open conversation exists between you and the customer anymore, so a service conversation is opened, lasting 24 hours.
  * **Hour 26:** The 24-hour customer service window is still open, so you send a third text message to the customer. An open service conversation already exists between you and the customer, so a new service conversation is not opened.

For additional examples, see our [pricing explainer PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F350685135_631521772182777_716278591301876804_n.pdf%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DnSJzxHVOSdcQ7kNvwHck0Mx%26_nc_oc%3DAdlEPyAOT4KEfhiz6UpkZpG1u40Dq7tDYzujroBFXHWTfkkP76NuE75H4y5-ZAi4bIY%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfwFuzdav8gHbuOXm-QX4vR3ZoOu8KMgB5BYnajY8OizYA%26oe%3D69B2A450&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA).

## Customer Service Windows

See [Customer Service Windows](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows).

## Conversation duration

Marketing, utility, authentication, and service conversations last 24 hours unless closed by a newly opened free-entry point conversation.

Free-entry point conversations last 72 hours.

## Multiple conversations

It is possible to have multiple open conversations between you and a customer. This can happen in the following situations:

  * An open marketing, utility, or authentication conversation exists between you and a customer and you send them a template message of a different category within 24 hours.
  * An open service conversation exists between you and a customer and you send them a template message within 24 hours.

## Free Tier conversations

As of November 1, 2024, you can open an unlimited number of service conversations at no charge. See [Free Service Conversations](/documentation/business-messaging/whatsapp/pricing/conversation-based-pricing) to learn more.

## Free Entry Point conversations

A free entry point conversation is opened if (1) a customer using a device running Android or iOS (the desktop and web clients are not supported) messages you via a [Click to WhatsApp Ad⁠](https://www.facebook.com/business/help/447934475640650/) or [Facebook Page Call-to-Action⁠](https://www.facebook.com/help/977869848936797) button and (2) you respond within 24 hours. If you do not respond within 24 hours, a free entry point conversation is not opened and you must use a template to message the customer, which opens a marketing, utility, or authentication conversation, per the category of the template.

The free entry point conversation is opened as soon as your message is delivered and lasts 72 hours. When a free entry point conversation is opened, it automatically closes all other open conversations between you and the customer, and no new conversations will be opened until the free entry point conversation expires.

Once the free entry point conversation is opened, you can send any type of message to the customer without incurring additional charges. However, you can only send non-templates messages if there is an open customer service window between you and the customer.

For example, if the customer messages you via a Click to WhatsApp Ad at 10am and you respond via a template message at 10pm the same day:

  * The free entry point conversation starts at 10pm and lasts 72 hours.
  * You can send template messages at no charge in those 72 hours.
  * You can send non-template messages until 10am the next day, at which point the [customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) closes, as it is independent of the free entry point conversation (if the customer messages you again, however, it opens another 24-hour customer service window in which you can send any type of message).

## Rates

Rates vary based on conversation category and country/region rate. You can download the rate card below that corresponds to your WhatsApp Business Account’s currency to see our rates by country/region for each conversation category.

These rates apply for any conversation opened on or after June 1, 2023 at 12:00 AM, based on WhatsApp Business Account time zone.

### Rate Cards

These rate cards represent the current rates on our platform.

  * [Rates in USD](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F488548499_1171612161004324_55612467351100312_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dqb65Mc7at0QQ7kNvwEt1hGC%26_nc_oc%3DAdlhyW8t7s1r7Bc9BJfriaNblg0DHFeHL0tX7SOeaoPOGwkC932-YtT-9fihAayH0bA%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfwNGU8zbagS5KwmAQIyOwnYVPDSNiiJB91I78mrgBIoEA%26oe%3D69B2B98F&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)
  * [Rates in INR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F487824680_1091145839722631_1669566641969332666_n.csv%3F_nc_cat%3D110%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DZjIsvHkM6y0Q7kNvwEt_HBI%26_nc_oc%3DAdnKx-S1lj9OBnf3CFwHZ5AU0PscBqmRJUQP-admAzuyNriryGfSv1JXHOTX-QMu6h8%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfzYQVxFpieJLwx8IOtvPye9LOYWrrN_2Wv4jZj1_8Gmnw%26oe%3D69B297B4&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)
  * [Rates in IDR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F487922265_2064407927393143_2707471833597803937_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dch0GKfybP54Q7kNvwE91R7X%26_nc_oc%3DAdkew9trnMwA4NSTOyy1hgmMp1qcTSlDsd7PiLT02hNX4dNNHEjnoe6yQeypmFszvuk%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfzyWxrdCP8rgo5C4yyIWkCvtYEiOP3hnWpCBK5jZKBxsA%26oe%3D69B2BAAA&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)
  * [Rates in EUR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F487823906_2411534455881440_2846910812011875203_n.csv%3F_nc_cat%3D110%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DjahX8ZyzoIQQ7kNvwGNvg1T%26_nc_oc%3DAdleAD8juwDxKCsAYhqtVs4xzbGchrzc9mq26SxSzXoHLoP-bycBNA7tESR-Bgg-o0s%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_Afzl0srpBHS_RjAzkUN2Q0CukRmpYJgevL_4pqTnofEFVA%26oe%3D69B2BC52&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)
  * [Rates in GBP](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F487967306_962284482744376_932505914283994051_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DzLTfeUTnYYkQ7kNvwHQhI8q%26_nc_oc%3DAdmFGTIFHsTcD1Gkgn3jf1j4OAU4iOsNV0j_Y15N8UeW-CjdIdhClUK8xtjfZ9Nos24%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfyyeZLiuigK8ceOB6ZF5tXnXg6b2XOyA_A5j_1sE3IbsQ%26oe%3D69B2C0AB&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)
  * [Rates in AUD](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F487931440_1489088359143806_5504887697981709499_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dy8QWVgBa8HoQ7kNvwGdIXL-%26_nc_oc%3DAdm-w1ryGIItZfKOKexLYIcM2ke6IyYviKeDhEd5XgQGyWrj7NH4fcW4ifts6UKcGzM%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_AfwNKNc1dxY44fnCPtVSAd6Tr2x8BxZQ7HJVWPeIG_GZDA%26oe%3D69B298CD&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)

### Authentication-International rates

Starting June 1, 2024, we are introducing authentication-international rates. See [Authentication-International Rates](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) to learn about these rates and if they apply to you.

Effective April 1, 2025, we are lowering our authentication-international rates in Egypt, Nigeria, Pakistan and South Africa, as part of continued efforts to ensure our prices are on-par with alternate channels.

### Marketing Messages Lite API pricing

Per-message pricing is coming to MM Lite API. Starting July 1, 2025, Cloud API marketing rates will apply to messages sent via MM Lite API.

Marketing Messages Lite API (“MM Lite API”) has different pricing. View the [MM Lite API pricing document](/documentation/business-messaging/whatsapp/pricing) for details.

### WhatsApp Business Calling API pricing

The WhatsApp Business Calling API has different pricing. View the [Calling API pricing document](/documentation/business-messaging/whatsapp/calling/pricing) for details.

### Updates to rate cards

As announced in June 2024, we may update rates up-to-quarterly. For marketing, updates are to reflect demand and the value these messages deliver. For utility and authentication, our objective is to price on-par with alternate channels.

To support these efforts, we have made the following updates:

  * **Effective April 1, 2025**

    * Lowered [authentication-international pricing rates](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) for Egypt, Nigeria, Pakistan, and South Africa.

  * **Effective February 1, 2025**

    * Lowered [authentication pricing rates](/documentation/business-messaging/whatsapp/pricing#rates) for Egypt, Malaysia, Nigeria, Pakistan, Saudi Arabia, South Africa, and the United Arab Emirates.

    * Added [authentication-international pricing rates](/documentation/business-messaging/whatsapp/pricing/authentication-international-rates) for Egypt, Malaysia, Nigeria, Pakistan, Saudi Arabia, South Africa, and the United Arab Emirates.

  * **Effective November 1, 2024**

    * [Service conversations](/documentation/business-messaging/whatsapp/pricing#service-conversations) are now free for all businesses, including via AI-enabled conversational experiences.

  * **Effective October 1, 2024**

    * Updated [pricing rates](/documentation/business-messaging/whatsapp/pricing#rates) in India, Saudi Arabia, the United Arab Emirates, and the United Kingdom.

  * **Effective August 1, 2024**

    * Lowered utility conversation [pricing rates](/documentation/business-messaging/whatsapp/pricing#rates).

### Country calling codes

Charges for conversations are based on the country of the user’s phone number. We rely on your customer’s country calling code and network prefix (area code) to determine their country. The table below shows how we map country codes to countries or regions. If a country is not listed below, it maps to Other.

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
  
Zambia|   
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
Rest of Central & Eastern Europe   
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
  
The information in the table above is also available in a CSV file:

  * [Country Calling Codes and Regional Rate Mapping CSV](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F559604326_1510649803514615_3972087685039081235_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DyPuW5PepK58Q7kNvwHhRZv3%26_nc_oc%3DAdlgDKx8EmA6DquA-W9lDLAQV0xgEDhoJUdJvoPLJy79FZq3Iso7K9OkAg4UzfW5PFc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DZC-bxXQoCivR7Z6Xs5WkMA%26_nc_ss%3D8%26oh%3D00_Afxg4caF43zgiv6vA_yq2jy8mC2ZUGCjiLtZec1n6gTSjQ%26oe%3D69B29413&h=AT7F7UctSv7xXT_-pa06cN580JSi797l3kiWLgxYsCeGK5ytpImwGqHGpNAuVW9I15xPfpVLPcGWpAeDqJoVA0SGOyeUIum3vnmyUTPMFzuosxoX6bYGcJM2kdPPc-vWvflXh4xip8IBFNVQIp35IA)

## Webhooks

Pricing information is included in all message webhooks. See:

  * Cloud API: [Message Status Updates](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status)
  * On-Premises API (deprecated): Message Status Updates

## Billing

Billing and billing-related actions are handled through the Meta Business Suite. See [About Billing For Your WhatsApp Business Account⁠](https://www.facebook.com/business/help/2225184664363779) for more information.

## Marketing Messages Lite API

If you are using the Marketing Messages Lite API (“MM Lite API”), such usage is subject to MM Lite API pricing. See the [MM Lite API pricing](/documentation/business-messaging/whatsapp/pricing) document for MM Lite API pricing information and rate cards.

## See also

  * [Conversations](/documentation/business-messaging/whatsapp/messages/send-messages)
  * [About Billing For Your WhatsApp Business Account⁠](https://www.facebook.com/business/help/2225184664363779)
  * [Pricing](/documentation/business-messaging/whatsapp/pricing)
  * [Template Categorization](/documentation/business-messaging/whatsapp/templates/template-categorization)
  * [Sending messages with Cloud API](/documentation/business-messaging/whatsapp/messages/send-messages)

Did you find this page helpful?

ON THIS PAGE

Conversation categories

Opening conversations

Marketing, Utility, and Authentication Conversations

Service conversations

Customer Service Windows

Conversation duration

Multiple conversations

Free Tier conversations

Free Entry Point conversations

Rates

Rate Cards

Authentication-International rates

Marketing Messages Lite API pricing

WhatsApp Business Calling API pricing

Updates to rate cards

Country calling codes

Webhooks

Billing

Marketing Messages Lite API

See also

* * *