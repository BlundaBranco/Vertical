# On-Behalf-Of account ownership model deprecation

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/obo-model-deprecation

---

# On-Behalf-Of account ownership model deprecation

Updated: Nov 14, 2025

We have deprecated the On-Behalf-Of (“OBO”) account ownership model and replaced it with [partner-initiated WABA creation](/documentation/business-messaging/whatsapp/solution-providers/partner-initiated-waba-creation). All existing WABAs created under the OBO model should have been transferred to business customers by October 1, 2025. Post 1st October 2025, all the eligible OBO accounts will be auto-migrated in batches through the end of 2025.

## Deprecation timeline

  * **March 24, 2025** : [partner-initiated WABA creation](/documentation/business-messaging/whatsapp/solution-providers/partner-initiated-waba-creation) is made available to all Solution Providers.
  * **September 29, 2025** : last day to onboard business customers to the OBO model.
  * **October 1, 2025** : last day to transfer ownership of OBO model WABAs to business customers.

## Payment methods

Partner-initiated WABA creation does not support automatic payment setup. Instead, you must share your credit line with the business customer via the API. See [Partner-initiated WABA creation](/documentation/business-messaging/whatsapp/solution-providers/partner-initiated-waba-creation) for details.

## Multi-Partner Solutions

Business customers cannot be onboarded to a Multi-Partner Solution as part of the partner-initiated WABA creation process, but can be added to an MPS afterwards. See [Partner-initiated WABA creation](/documentation/business-messaging/whatsapp/solution-providers/partner-initiated-waba-creation) for details.

## Marketing Messages Lite API

Existing OBO model WABAs need to be transferred to business customers if you want to use them with the Marketing Messages Lite API, but this can be done as part of the [MM Lite API onboarding process](/docs/whatsapp/marketing-messages-lite-api/onboarding#onboard-via-a-partner-using-whatsapp-manager).

Did you find this page helpful?

ON THIS PAGE

Deprecation timeline

Payment methods

Multi-Partner Solutions

Marketing Messages Lite API

* * *