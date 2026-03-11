# Display names

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/display-names

---

# Display names

Updated: Dec 12, 2025

You must provide a display name when [registering](/documentation/business-messaging/whatsapp/business-phone-numbers/registration) a business phone number. The display name appears in your business phone number’s WhatsApp profile:

It can also appear at the top of **individual chat** threads and the **chat list** if your business phone number is approved via display name verification. Note that if a WhatsApp user edits your profile name in the WhatsApp client, the name they set will appear instead.

## Display name guidelines

See our [Display name guidelines for the WhatsApp Business Platform⁠](https://www.facebook.com/business/help/757569725593362) Help Center article for naming guidelines.

## Display name verification

When you reach a [higher messaging limit](/documentation/business-messaging/whatsapp/messaging-limits), your business phone number’s display name will automatically undergo verification based on our [display name guidelines⁠](https://www.facebook.com/business/help/757569725593362). When we complete the process, a [phone_number_name_update](/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_name_update) webhook and Meta Business Suite notification will be triggered.

If your display name is approved, the webhook will have `decision` set to `APPROVED`, and we will set the `name_status` field on your business phone number to `APPROVED`.

If your display name is rejected, the webhook will have `decision` set to `REJECTED`, and we will set the `name_status` field on your business phone number to `DECLINED`. If your name is rejected, we recommend that you re-review our [display name guidelines⁠](https://www.facebook.com/business/help/757569725593362) and [edit your display name⁠](https://www.facebook.com/business/help/378834799515077) accordingly, or file an appeal via [Developer Support](/documentation/business-messaging/whatsapp/support#developer-support) or [Enterprise Developer Support](/documentation/business-messaging/whatsapp/support#enterprise-developer-support).

## Viewing display name in WhatsApp Manager

Your business phone number’s display name appears in the **Name** column in the [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/) > **Account tools** > **Phone numbers** panel.

## Getting display name and display name status via API

Request the `verified_name` and `name_status` field on your WhatsApp Business Phone Number ID to get its display name and display name status. See the [GET /](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api#Reading) reference for a list of returnable values and their meanings.

Note that the `verified_name` value does not indicate if the display name is approved or not, it just represents the display name string that will undergo verification when eligible. The `name_status` field indicates its approval status.

### Example request
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922?fields=verified_name%2Cname_status' \
    -H 'Authorization: Bearer EAAJB...'

### Example response

Upon success:
    
    
    {  
      "verified_name": "Lucky Shrub",  
      "name_status": "APPROVED",  
      "id": "106540352242922"  
    }  
      
    

## Updating display name via WhatsApp Manager

To update your display name via WhatsApp Manager:

  1. Navigate to [WhatsApp Manager⁠](https://business.facebook.com/latest/whatsapp_manager/) > **Account tools** > **Phone numbers**.
  2. Select your business phone number.
  3. Click the **Profile** tab.
  4. In the **Display name** section, click the **Edit** button and complete the flow.

Once you complete the flow, your display name will undergo display name verification again.

This information is also available in our [How to change your WhatsApp Business display name⁠](https://www.facebook.com/business/help/378834799515077) Help Center article.

## Updating display name via API

Use the [POST /](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/whatsapp-business-account-phone-number-api#Updating) endpoint’s `new_display_name` field to update your display name via API.

### Example request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/106540352242922?new_display_name=Lucky%20Shrub' \
    -H 'Authorization: Bearer EAAJB...'

### Example response

Upon success:
    
    
    {  
      "success": true  
    }  
      
    

Upon success, your display name will undergo display name verification. If you want to check the verification status, request the `new_display_name` and `new_name_status` fields on your business phone number ID:

### Example request
    
    
    curl 'https://graph.facebook.com/v23.0/106540352242922?fields=new_display_name,new_name_status' \  
    -H 'Authorization: Bearer EAAJB...'  
      
    

### Example response

Upon success:
    
    
    {  
      "new_display_name": "New Lucky Shrub",  
      "new_name_status": "PENDING_REVIEW",  
      "id": "106540352242922"  
    }  
      
    

If your newly updated display name is approved, your business phone number’s `verified_name` and `name_status` fields will be updated to reflect your new display name and name status, and **phone_number_name_update** webhooks will be triggered.

## Learn more

The following Help Center articles provide additional information about display names.

  * [About WhatsApp Business display name⁠](https://www.facebook.com/business/help/338047025165344)
  * [How to change your WhatsApp Business display name⁠](https://www.facebook.com/business/help/378834799515077)

Did you find this page helpful?

ON THIS PAGE

Display name guidelines

Display name verification

Viewing display name in WhatsApp Manager

Getting display name and display name status via API

Example request

Example response

Updating display name via WhatsApp Manager

Updating display name via API

Example request

Example response

Example request

Example response

Learn more

* * *