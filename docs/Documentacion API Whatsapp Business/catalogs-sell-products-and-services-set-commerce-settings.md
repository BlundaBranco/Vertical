# Set Commerce Settings

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/catalogs/sell-products-and-services/set-commerce-settings

---

# Set Commerce Settings

Updated: Nov 14, 2025

You can enable or disable the shopping cart and the product catalog on a per-business phone number basis. By default, the shopping cart is enabled and the storefront icon is hidden for all business phone numbers associated with a WhatsApp Business Account.

## Requirements

  * A [system token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [user token](/documentation/business-messaging/whatsapp/access-tokens#user-access-tokens).
  * The [whatsapp_business_management](/docs/permissions/reference/whatsapp_business_management) permission.
  * If using a [system token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens), the system user must be granted full control over the WhatsApp Business Account.
  * Businesses based in India must [comply with all online selling laws⁠](https://www.facebook.com/help/1104628230079278).

## Get business phone numbers

Use the [WhatsApp Business Account > Phone Numbers](/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers#get-all-phone-numbers) endpoint to get a list of all business phone numbers associated with a WhatsApp Business Account.

## Enable or disable cart

Use the [Business Phone Number > WhatsApp Commerce Settings](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/phone-number-api) endpoint to enable or disable the shopping cart for a specific business phone number.

When enabled, cart-related buttons appear in the chat, catalog, and product details views:

When the cart is disabled, customers can see products and their details, but cart-related buttons do not appear in any view.

### Request syntax
    
    
    POST //whatsapp_commerce_settings
      ?is_cart_enabled=

### Parameters

Placeholder |  Sample Value |  Description   
---|---|---  
``| `106850078877666`| Business phone number ID.  
``| `true`| Boolean. Set to `true` to enable cart or `false` to disable it. Default value is `true`.  
  
### Sample request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/106850078877666/whatsapp_commerce_settings?is_cart_enabled=true' \
    -H 'Authorization: Bearer EAAJB...'

### Sample response
    
    
    {  
      "success": true  
    }  
      
    

## Enable or disable catalog

Use the [Business Phone Number > WhatsApp Commerce Settings](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/phone-number-api) endpoint to enable or disable the product catalog for a specific business phone number.

When enabled, the catalog storefront icon and catalog-related buttons appear in chat views and business profile views:

When the catalog is disabled, the storefront icon and catalog-related buttons will not appear in any views and the catalog preview with thumbnails will not appear in the business profile view.

If you disable the catalog, wa.me links to your catalog, as well as the **View catalog** button that appears when you send your catalog link in a message will display an **Invalid catalog link** warning when tapped.

### Request syntax
    
    
    POST //whatsapp_commerce_settings
      ?is_catalog_visible=

### Parameters

Placeholder |  Sample Value |  Description   
---|---|---  
``| `106850078877666`| Business phone number ID.  
``| `true`| Boolean. Set to `true` to show catalog storefront icon or `false` to hide it. Default value is `false`.  
  
### Sample request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/106850078877666/whatsapp_commerce_settings?is_catalog_visible=true' \
    -H 'Authorization: Bearer EAAJB...'

### Sample response
    
    
    {  
      "success": true  
    }  
      
    

## Get commerce settings

Use the [Business Phone Number > WhatsApp Commerce Settings](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/phone-number-api) endpoint to get an individual business phone number’s commerce settings.

### Request syntax
    
    
    GET //whatsapp_commerce_settings

### Parameters

Placeholder |  Sample Value |  Description   
---|---|---  
``| `106850078877666`| Business phone number ID.  
  
### Sample request
    
    
    curl -X GET 'https://graph.facebook.com/v25.0/106850078877666/whatsapp_commerce_settings' \
    -H 'Authorization: Bearer EAAJB...'

### Sample response
    
    
    {  
      "data": [  
        {  
          "is_cart_enabled": true,  
          "is_catalog_visible": true,  
          "id": "727705352028726"  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Requirements

Get business phone numbers

Enable or disable cart

Request syntax

Parameters

Sample request

Sample response

Enable or disable catalog

Request syntax

Parameters

Sample request

Sample response

Get commerce settings

Request syntax

Parameters

Sample request

Sample response

* * *