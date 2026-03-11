# App-Only Install

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/app-only-install

---

# App-Only Install

Updated: Nov 4, 2025

You can configure Embedded Signup so that only [business tokens](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens) can be used to access assets owned by customers onboarded via the flow. This approach offers enhanced security by reducing risk associated with [system tokens](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens), flexibility in simplifying onboarding for other Meta assets, and scalability to support a larger number of onboardings. By using a granular token, you can also reduce the negative impact in case of a compromised token, making it a more secure and efficient way to manage your business customer assets.

Note that App-Only Install can’t be used to [onboard WhatsApp Business app users](/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users).

## Enabling the feature in Embedded Signup v3

To enable this feature, set `features` to `app_only_install` in the Embedded Signup configuration.
    
    
    {  
      "config_id": "",  
      "response_type": "code",  
      "override_default_response_type": true,  
      "extras": {  
        "version": "v3",  
        "features": [  
          {  
            "name": "app_only_install"  
          }  
        ]  
      }  
    }  
      
    

To enable this feature along with a [Multi-Partner Solution](/documentation/business-messaging/whatsapp/solution-providers/multi-partner-solutions):
    
    
    {  
      "config_id": "",  
      "response_type": "code",  
      "override_default_response_type": true,  
      "extras": {  
        "version": "v3",  
        "features": [  
          {  
            "name": "app_only_install"  
          }  
        ],  
        "setup": {  
          "solutionID": ""  
        }  
      }  
    }  
      
    

When a business customer successfully completes the flow, the [session logging message event](/documentation/business-messaging/whatsapp/embedded-signup/implementation#session-logging-message-event-listener) will have `event` set to `FINISH_GRANT_ONLY_API_ACCESS`:
    
    
    {  
      data: {  
        phone_number_id: "",  
        waba_id: "",  
        business_id: "",  
      },  
      type: "WA_EMBEDDED_SIGNUP",  
      event: "FINISH_GRANT_ONLY_API_ACCESS",  
    }  
      
    

When a business customer successfully completes the flow, an **account_update** webhook is triggered with `event` set to `PARTNER_APP_INSTALLED`.
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": "",  
          "changes": [  
            {  
              "value": {  
                "event": "PARTNER_APP_INSTALLED",  
                "waba_info": {  
                  "waba_id": "",  
                  "owner_business_id": "",  
                  "partner_app_id": "",  
                  "solution_id": "",  
                  "solution_partner_business_ids": [  
                    "",  
                    ""  
                  ]  
                }  
              }  
            }  
          ],  
          "field": "account_update",  
          "object": "whatsapp_business_account"  
        }  
      ]  
    }  
      
    

If an onboarded business customer uses [Meta Business Suite⁠](https://business.facebook.com) to uninstall/remove the app, an **account_update** webhook is triggered with `event` set to `PARTNER_APP_UNINSTALLED`.
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": "",  
          "changes": [  
            {  
              "value": {  
                "event": "PARTNER_APP_UNINSTALLED"  
              },  
              "field": "account_update"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

You can use the [Business Token Management API](/docs/facebook-login/facebook-login-for-business#bisu-token-api) to get an onboarded business customer’s business token.
    
    
    curl -i -X POST "https://graph.facebook.com/v22.0//system_user_access_tokens  
      ?appsecret_proof=  
      &access_token=  
      &system_user_id=  
      &fetch_only=true"  
      
    

Did you find this page helpful?

ON THIS PAGE

Enabling the feature in Embedded Signup v3

* * *