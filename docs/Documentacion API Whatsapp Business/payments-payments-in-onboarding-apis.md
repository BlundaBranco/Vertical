# Onboarding APIs

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/payments/payments-in/onboarding-apis

---

# Onboarding APIs

Updated: Nov 14, 2025

To receive payments on WhatsApp, you must have a payment configuration linked to the corresponding WhatsApp Business Account. Each payment configuration is associated with a unique name. As part of the order_details message, you can specify the payment configuration to use for a specific checkout.

Onboarding APIs allows you to programatically perform certain operations:

  * Get all payment configurations linked to a WhatsApp Business Account.
  * Get a specific payment configuration linked to a WhatsApp Business Account.
  * Create a payment configuration.
  * Regenerate payment gateway oauth link to link payment configuration to a payment gateway.
  * Remove a payment configuration.

## Get All Payment Configurations

Get a list of payment configurations linked to the WhatsApp Business Account.

### Request Syntax
    
    
    GET //payment_configurations  
      
    

### Sample Request
    
    
    curl 'https://graph.facebook.com/v16.0/102290129340398/payment_configurations' \  
    -H 'Authorization: Bearer EAAJB...'  
      
    

### Sample Response
    
    
    {  
      "data": [  
        {  
          "payment_configurations": [  
        {  
          "configuration_name": "test-payment-configuration",  
          "merchant_category_code": {  
            "code": "0000",  
                "description": "Test MCC Code"  
           },  
               "purpose_code": {  
             "code": "00",  
             "description": "Test Purpose Code"  
            },  
            "status": "Active",  
             "provider_mid": "test-payment-gateway-mid",  
            "provider_name": "RazorPay",  
            "created_timestamp": 1720203204,  
            "updated_timestamp": 1721088316  
        },  
              ....  
      ]  
         }  
      ]  
    }  
      
    

Field |  Description   
---|---  
`configuration_name`string| **Required.** The name of the payment configuration to be used in the Order Details message.  
`merchant_category_code`object| **Required.** Merchant Category Code:`code` string

  * **Required.** Will be a valid MCC code.

`description` string

  * **Required.** MCC code description.

  
`purpose_code`object| **Required.** Purpose Code:`code` string

  * **Required.** Will be a valid purpose code.

`description` string

  * **Required.** Purpose code description.

  
`status`string| **Required.** Status of the payment configuration. Must be one of [“Active”, “Needs_Connecting”, “Needs_Testing”].  
`provider_mid`string| **Optional.** Payment Gateway Merchant Identification Number (MID).  
`provider_name`string| **Optional.** Payment Gateway Name. Must be one of [“razorpay”, “payu”, “zaakpay”].  
`merchant_vpa`string| **Optional.** Merchant UPI handle.  
`created_timestamp`integer| **Optional.** Time when payment configuration was created.  
`updated_timestamp`integer| **Optional.** Time when payment configuration was last updated.  
  
## Get a specific Payment Configuration

Get a specific payment configuration linked to the WhatsApp Business Account.

### Request Syntax
    
    
    GET //payment_configuration/  
      
    

### Sample Request
    
    
    curl 'https://graph.facebook.com/v16.0/102290129340398/payment_configuration/test-payment-configuration' \  
    -H 'Authorization: Bearer EAAJB...'  
      
    

### Sample Response
    
    
    {  
      "data": [  
        {  
          "configuration_name": "test-payment-configuration",  
          "merchant_category_code": {  
            "code": "0000",  
            "description": "Test MCC Code"  
          },  
          "purpose_code": {  
            "code": "00",  
            "description": "Test Purpose Code"  
          },  
          "status": "Active",  
          "provider_mid": "test-payment-gateway-mid",  
          "provider_name": "RazorPay",  
          "created_timestamp": 1720203204,  
          "updated_timestamp": 1721088316  
         }  
      ]  
    }  
      
    

Field |  Description   
---|---  
`configuration_name`string| **Required.** The name of the payment configuration to be used in the Order Details message.  
`merchant_category_code`object| **Required.** Merchant Category Code:`code` string

  * **Required.** Will be a valid MCC code.

`description` string

  * **Required.** MCC code description.

  
`purpose_code`object| **Required.** Purpose Code:`code` string

  * **Required.** Will be a valid purpose code.

`description` string

  * **Required.** Purpose code description.

  
`status`string| **Required.** Status of the payment configuration. Must be one of [“Active”, “Needs_Connecting”, “Needs_Testing”].  
`provider_mid`string| **Optional.** Payment Gateway Merchant Identification Number (MID).  
`provider_name`string| **Optional.** Payment Gateway Name. Must be one of [“razorpay”, “payu”, “zaakpay”].  
`merchant_vpa`string| **Optional.** Merchant UPI handle.  
`created_timestamp`integer| **Optional.** Time when payment configuration was created.  
`updated_timestamp`integer| **Optional.** Time when payment configuration was last updated.  
  
## Create a Payment Configuration

Create a payment configuration.

### Request Syntax
    
    
    POST //payment_configuration  
      
    

### Sample Request

#### Payment Gateway type configuration
    
    
    curl -X  POST \  
    'https://graph.facebook.com/v15.0/102290129340398/payment_configuration' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -H 'Content-Type: application/json' \  
    -d '{  
           "configuration_name": "test-payment-configuration",  
           "purpose_code": "00",  
           "merchant_category_code": "0000",  
           "provider_name": "razorpay",  
           "redirect_url": "https://test-redirect-url.com"  
        }'  
      
    

#### UPI Vpa type configuration
    
    
    curl -X  POST \  
    'https://graph.facebook.com/v15.0/102290129340398/payment_configuration' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -H 'Content-Type: application/json' \  
    -d '{  
           "configuration_name": "test-payment-configuration",  
           "purpose_code": "00",  
           "merchant_category_code": "0000",  
           "provider_name": "upi_vpa",  
           "merchant_vpa": "test-upi-merchant-vpa@test"  
        }'  
      
    

Field |  Description   
---|---  
`configuration_name`string| **Required.** The name of the payment configuration to be used in the Order Details message.  
`merchant_category_code`string| **Optional.** Merchant Category Code.  
`purpose_code`object| **Optional.** Purpose Code.  
`provider_name`string| **Required.** Provider name of the payment configuration. Must be one of [“upi_vpa”, “razorpay”, “payu”, “zaakpay”].  
`merchant_vpa`string| **Optional.** Merchant UPI handle.  
`redirect_url`URI| **Optional.** The url which merchant will be redirected to after successfully linking a payment configuration.  
  
### Sample Response

#### Payment Gateway type configuration
    
    
    {  
      "oauth_url": "https://www.facebook.com/payment/onboarding/init/",  
      "expiration": 1721687287,  
      "success": true  
    }  
      
    

#### UPI Vpa type configuration
    
    
    {  
      "success": true  
    }  
      
    

Field |  Description   
---|---  
`oauth_url`string| **Optional.** Oauth url to be used to link payment configuration to the payment gateway  
`expiration`integer| **Optional.** Expiration time of the oauth url.  
`success`boolean| **Required.** Boolean flag to denote if payment configuration creation was successful or not.  
  
## Link or Update Data Endpoint

The following section explains how to link, update and delete data endpoint to enable coupons, shipping address and real-time inventory offered by [Checkout Button Templates](/documentation/business-messaging/whatsapp/payments/payments-in/checkout-button-templates#enabling_coupons_inventory).

### Request Syntax
    
    
    POST //payment_configuration/  
      
    

### Sample Request

#### Payment Gateway type configuration
    
    
    curl -X  POST \  
    'https://graph.facebook.com/v15.0/102290129340398/payment_configuration/test-payment-configuration' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -H 'Content-Type: application/json' \  
    -d '{  
           "data_endpoint_url": "https://test-data-endpoint-url.com"  
        }'  
      
    

Field |  Description   
---|---  
`data-endpoint-url`URI| **Optional.** The URL endpoint that the WhatsApp client sends a secure HTTPS request to for data exchange purposes in [Checkout Button Templates](/documentation/business-messaging/whatsapp/payments/payments-in/checkout-button-templates#enabling_coupons_inventory) offering.  
  
## Regenerate Payment Configuration OAuth link

Regenerate oauth link of payment gateway type payment configuration.

### Request Syntax
    
    
    POST //generate_payment_configuration_oauth_link  
      
    

### Sample Request
    
    
    curl -X  POST \  
    'https://graph.facebook.com/v15.0/102290129340398/generate_payment_configuration_oauth_link' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -H 'Content-Type: application/json' \  
    -d '{  
           "configuration_name": "test-payment-configuration",  
           "redirect_url": "https://test-redirect-url.com"  
        }'  
      
    

Field |  Description   
---|---  
`configuration_name`string| **Required.** The name of the payment configuration to be used in the Order Details message.  
`redirect_url`URI| **Optional.** The url which merchant will be redirected to after successfully linking a payment configuration.  
  
### Sample Response
    
    
    {  
      "oauth_url": "https://www.facebook.com/payment/onboarding/init/",  
      "expiration": 1721687287  
    }  
      
    

Field |  Description   
---|---  
`oauth_url`string| **Optional.** Oauth url to be used to link payment configuration to the payment gateway  
`expiration`integer| **Optional.** Expiration time of the oauth url.  
  
## Remove a Payment Configuration

Remove a payment configuration.

### Request Syntax
    
    
    DELETE //payment_configuration  
      
    

Field |  Description   
---|---  
`configuration_name`string| **Required.** The name of the payment configuration to be used in the Order Details message.  
  
### Sample Request
    
    
    curl -X  DELETE \  
    'https://graph.facebook.com/v15.0/102290129340398/payment_configuration' \  
    -H 'Authorization: Bearer EAAJB...' \  
    -H 'Content-Type: application/json' \  
    -d '{  
           "configuration_name": "test-payment-configuration"  
        }'  
      
    

### Sample Response
    
    
    {  
      "success": true  
    }  
      
    

Field |  Description   
---|---  
`success`boolean| **Required.** Boolean flag to denote if payment configuration removal was successful or not.  
  
## Payment Configuration Webhook

Businesses receive updates via WhatsApp webhooks when the status of the payment configuration changes.

To receive webhook, Businesses must subscribe to “payment_configuration_update” event for their respective application.

Webhook contains the following fields:

Field |  Description   
---|---  
`configuration_name`string| **Required.** The name of the payment configuration to be used in the Order Details message.  
`provider_name`string| **Required.** Provider name of the payment configuration. Must be one of [“razorpay”, “payu”, “zaakpay”].  
`provider_mid`string| **Required.** Payment gateway account merchant ID.  
`status`string| **Required.** Status of the payment configuration. Must be one of [“Active”, “Needs_Connecting”, “Needs_Testing”].  
`created_timestamp`integer| **Required.** Time when payment configuration was created.  
`updated_timestamp`integer| **Required.** Time when payment configuration was last updated.  
  
### Sample Payment Configuration Webhook
    
    
    {  
      "entry": [  
        {  
          "id": "0",  
          "time": 1725499886,  
          "changes": [  
            {  
              "field": "payment_configuration_update",  
              "value": {  
                "configuration_name": "test-payment-configuration",  
                "provider_name": "razorpay",  
                "provider_mid": "test-provider-mid",  
                "status": "Needs Testing",  
                "created_timestamp": 123457678,  
                "updated_timestamp": 123457678  
              }  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

### Errors

##### WhatsApp Payments Terms of Service Acceptance Pending

If you see the following error, accept the WhatsApp Payments terms of service using the link provided in the error message before trying again.
    
    
    {  
      "error": {  
        "message": "(#131005) Access denied",  
        "type": "OAuthException",  
        "code": 131005,  
        "error_data": {  
          "messaging_product": "whatsapp",  
          "details": "WhatsApp Payments Terms of Service acceptance pending for this WhatsApp Business Account.  
    Please use the following link to accept terms of service before using Business APIs: https://fb.me/12345"  
        }  
      }  
    }  
      
    

For all other errors that can be returned and guidance on how to handle them, see [WhatsApp Cloud API, Error Codes](/documentation/business-messaging/whatsapp/support/error-codes).

Did you find this page helpful?

ON THIS PAGE

Get All Payment Configurations

Request Syntax

Sample Request

Sample Response

Get a specific Payment Configuration

Request Syntax

Sample Request

Sample Response

Create a Payment Configuration

Request Syntax

Sample Request

Payment Gateway type configuration

UPI Vpa type configuration

Sample Response

Payment Gateway type configuration

UPI Vpa type configuration

Link or Update Data Endpoint

Request Syntax

Sample Request

Payment Gateway type configuration

Regenerate Payment Configuration OAuth link

Request Syntax

Sample Request

Sample Response

Remove a Payment Configuration

Request Syntax

Sample Request

Sample Response

Payment Configuration Webhook

Sample Payment Configuration Webhook

Errors

* * *