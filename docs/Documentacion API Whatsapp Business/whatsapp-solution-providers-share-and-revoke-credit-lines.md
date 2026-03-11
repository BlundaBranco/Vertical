# Managing credit lines

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/share-and-revoke-credit-lines

---

# Managing credit lines

Updated: Dec 12, 2025

This document describes how Solution Partners can share and revoke lines of credit with onboarded business customers.

**Billing Liability Disclosure**

Business customers that you onboard through Embedded Signup must be granted access to your line of credit with Meta to pay for WhatsApp Business Platform access. This means that businesses pay you, and you receive an aggregated invoice to pay Meta.

You are the “Bill To Party” for all businesses sharing your credit line. You are liable for and will pay Meta for all WhatsApp Business Platform spend made by these businesses.

You can grant access to your line of credit using the APIs described in this document. You can revoke access to your line of credit for individual businesses within the [Meta Business Suite⁠](https://business.facebook.com/home/accounts) or with a series of API calls.

## Authentication and authorization

Nearly all credit line related endpoints require your system user access token. In addition, the system user who the token represents must have granted your app the **business_management** permission, and must have been granted an **Admin** or **Financial Editor** role on your business portfolio.

## Get your credit line ID

Nearly all API calls related to credit lines require your credit line ID. Use the [GET //extendedcredits](/docs/marketing-api/reference/business/extendedcredits#Reading) endpoint to get your business portfolio’s credit line ID.

### Request syntax
    
    
    curl 'https://graph.facebook.com///extendedcredits' \  
    -H 'Authorization: Bearer '  
      
    

### Request example
    
    
    curl 'https://graph.facebook.com/v24.0/102289599326934/extendedcredits' \  
    -H 'Authorization: Bearer EAAJi...'  
      
    

### Response

Upon success, the API will return the business portfolio’s extended credit line ID (“credit line ID”).
    
    
    {  
      "data": [  
        {  
          "id": "1972385232742146"  
        }  
      ]  
    }  
      
    

## Sharing your credit line

We are currently testing new steps for sharing your credit line with onboarded business customers. These steps will eventually replace this step, so if you wish to implement these steps now, refer to the Alternate method for sharing your credit line below.

Use the [POST //whatsapp_credit_sharing_and_attach](/docs/marketing-api/reference/extended-credit/whatsapp_credit_sharing_and_attach#Creating) endpoint to share your credit line with an onboarded business customer.

### Request syntax
    
    
    curl -X POST 'https://graph.facebook.com///whatsapp_credit_sharing_and_attach?waba_currency=&waba_id=' \  
    -H 'Authorization: Bearer '  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** The business’s currency, as a three-letter currency code. Support values are:

  * `AUD`
  * `EUR`
  * `GBP`
  * `IDR`
  * `INR`
  * `USD`

This currency is used for invoicing and corresponds to [pricing](/documentation/business-messaging/whatsapp/pricing) rates.| `USD`  
``| **Required.** The customer’s WABA ID.| `102290129340398`  
``| **Required.** Your extended credit line ID.| `1972385232742146`  
``| **Required.** Your system token.| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
  
### Response

Upon success:
    
    
    {  
      "allocation_config_id": "58501441721238",  
      "waba_id": "102290129340398"  
    }  
      
    

### Response parameters

Placeholder |  Description |  Example value   
---|---|---  
``| The extended credit line’s allocation configuration ID.Save this ID if you want to verify that your credit line has been shared with the customer.| `58501441721238`  
``| The customer’s WABA ID.| `102290129340398`  
  
## Alternate method for sharing your credit line

We are currently testing new steps for sharing your credit line with onboarded business customers. These steps are described below, and will eventually replace the current method for sharing your credit line with an onboarded customer.

### Step 1: Get your customer’s business portfolio ID

Use the [GET /](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/whatsapp-business-account-api#Reading) endpoint and request the `owner_business_info` field to get the business customer’s business portfolio ID.

#### Request syntax
    
    
    curl --get 'https://graph.facebook.com/v21.0/?fields=owner_business_info' \  
    -H 'Authorization: Bearer '  
      
    

#### Request parameters

  

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** The customer’s business token.| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
``| **Required.** The customer’s WABA ID.| `102290129340398`  
  
#### Response syntax

Upon success:
    
    
    {  
      "owner_business_info": {  
        "name": "",  
        "id": ""  
      },  
      "id": ""  
    }  
      
    

#### Response parameters

  

Placeholder |  Description |  Example value   
---|---|---  
``| The customer’s business portfolio ID.| `2729063490586005`  
``| The customer’s business portfolio name.| `Wind & Wool`  
``| The customer’s WABA ID.| `102290129340398`  
  
### Step 2: Share your credit line with the customer’s business

Use the [POST //whatsapp_credit_sharing](/docs/marketing-api/reference/extended-credit/whatsapp_credit_sharing#Creating) endpoint and your **system token** to indicate your intent to share your credit line with the customer’s business portfolio.

#### Request syntax
    
    
    curl -X POST 'https://graph.facebook.com///whatsapp_credit_sharing?receiving_business_id=' \  
    -H 'Authorization: Bearer '  
      
    

#### Request parameters

  

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** Your extended credit line ID.| `5985499441566032`  
``| **Required.** The customer’s business portfolio ID.| `2729063490586005`  
``| **Required.** You system user access token.| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
  
#### Response example

Upon success:
    
    
      "success": true,  
      "allocation_config_id": "58501441721238"  
    }  
      
    

#### Response parameters

  

Placeholder |  Description |  Example value   
---|---|---  
``| The extended credit line’s allocation configuration ID.| `58501441721238`  
  
### Step 3: Attach your credit line to the customer’s WABA

Use the [POST //whatsapp_credit_attach](/docs/marketing-api/reference/extended-credit/whatsapp_credit_attach) endpoint to attach your credit line to the customer’s WABA.

Note: Credit lines cannot be changed after being attached to a WABA. If the WABA needs a different credit line, a new WABA must be created and the new credit line can then be attached to it.

#### Request syntax
    
    
    curl -X POST 'https://graph.facebook.com/v21.0//whatsapp_credit_attach?waba_currency=&waba_id=' \  
    -H 'Authorization: Bearer '  
      
    

#### Request parameters

  

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** The customer’s business token.| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
``| **Required.** Your extended credit line ID.| `5985499441566032`  
``| **Required.** The customer’s WABA ID.| `102290129340398`  
``| **Required.** The customer’s business currency.| `USD`  
  
#### Response syntax

Upon success:
    
    
    {  
      "success": true,  
      "waba_id": "",  
      "allocation_config_id": ""  
    }  
      
    

#### Response parameters

  

Placeholder |  Description |  Example value   
---|---|---  
``| The extended credit line’s allocation configuration ID.Save this ID if you want to verify that your credit line has been shared with the customer.| `58501441721238`  
``| The customer’s WABA ID.| `102290129340398`  
  
Your credit line should now be shared with the business customer. If you want to verify that it has in fact been shared, see [Verifying that your credit line has been shared with a customer](/documentation/business-messaging/whatsapp/solution-providers/share-and-revoke-credit-lines#step-3--verify-credit-line-was-shared).

## Verifying shared status

Perform the following queries if you want to make sure that your credit line has been shared with an onboarded business customer.

### Step 1: Get credit line’s receiving credential

Use the [GET /](/docs/graph-api/reference/extended-credit-allocation-config) endpoint to request the `receiving_credential` field on your extended credit allocation ID (returned when you shared your credit line with the business customer).

### Request syntax
    
    
    curl 'https://graph.facebook.com//?fields=receiving_credential' \  
    -H 'Authorization: Bearer '  
      
    

### Response syntax

Upon success:
    
    
    {  
      "receiving_credential": {  
        "id": ""  
      },  
      "id": ""  
    }  
      
    

### Step 2: Get WABA’s primary funding ID

Use the [GET /](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/whatsapp-business-account-api#Reading) endpoint to request the `primary_funding_id` on the customer’s WABA ID.

### Request syntax
    
    
    curl 'https://graph.facebook.com/v21.0//?fields=primary_funding_id' \  
    -H 'Authorization: Bearer '  
      
    

### Response syntax

Upon success:
    
    
    {  
      "primary_funding_id": "",  
      "id": ""  
    }  
      
    

### Step 3: Compare IDs

Compare the receiving credential ID to the primary funding ID. If the values match, your credit line has been shared correctly with the business customer’s WABA.

## Revoke a shared credit line

These are the steps needed to remove the shared line of credit if you need to revoke access for any reason. You can revoke your credit line whenever you feel the need to and/or when your client removes you as a partner from their WhatsApp Business Account.

When you revoke a credit line from a customer’s account, that revocation applies to all WABAs that belong to the customer’s business **and** have been shared with you, the Solution Partner.

### Step 1: Get your credit line ID

#### Example request
    
    
    curl -i -X GET "https://graph.facebook.com/v25.0/105954558954427/
      extendedcredits?fields=id,legal_entity_name&
      access_token=EAAFl..."

#### Example response
    
    
    {  
      "data": [  
        {  
          "id": "1972385232742146",   //Credit line ID  
          "legal_entity_name": "Your Legal Entity",  
        }  
      ]  
    }  
      
    

### Step 2: Get the customer’s business portfolio ID

If the WhatsApp Business Account is currently shared with the Solution Partner, get the client’s business ID from the shared WhatsApp Business Account.   
  

In the following example, use the ID for the assigned WhatsApp Business Account.   
  
Request:
    
    
    curl -i -X GET "https://graph.facebook.com/v25.0/
      ?fields=owner_business_info&
      access_token="

Response:
    
    
    {  
      "owner_business_info": {  
        "name": "Client Business Name",  
        "id": "1972385232742147"  
      },  
    }  
      
    

If the WhatsApp Business Account was unshared with the Solution Partner or the client business removed the Solution Partner as a partner from the WhatsApp Business Account, you cannot access the client’s business ID from the above API call. See [Unshared WhatsApp Business Account](/documentation/business-messaging/whatsapp/solution-providers/share-and-revoke-credit-lines#unshared-whatsapp-business-accounts) for information.

### Step 3: Get the customer’s credit sharing record

In the following example, use your credit line ID as the extended credit ID.

  
  

Request:
    
    
    curl -i -X GET "https://graph.facebook.com///  
      owning_credit_allocation_configs?  
      receiving_business_id=&  
      fields=id,receiving_business&  
      access_token="  
      
    

Response:
    
    
    {  
      "id": "1972385232742140", // Allocation config (i.e., credit sharing) id  
      "receiving_business": {  
        "name": "Client Business Name"  
        "id": "1972385232742147"  
      },  
    }  
      
    

### Step 4: Revoke credit sharing

Request:
    
    
    curl -i -X DELETE "https://graph.facebook.com/v25.0/
      {allocation-config-id}?
      access_token={system-user-access-token}"

Response:
    
    
    {  
      "success": true,  
    }  
      
    

### Step 5: Verify credit sharing was revoked (Optional)

Request:
    
    
    curl -i -X GET "https://graph.facebook.com/v25.0/
      {allocation-config-id}?fields=receiving_business,request_status&
      access_token={system-user-access-token}"

Response:
    
    
    {  
      "receiving_business": {  
        "name": "Customer Business Name"  
        "id": "1972385232742147"  
      },  
      "request_status": "DELETED"  
    }  
      
    

## Troubleshooting

### Unshared WhatsApp Business Accounts

If a business customer unshares their WABA with you, or removes you as a partner from their WhatsApp Business Account, you will not be able to get their business portfolio ID via API.

Instead, you can get their portfolio ID from the email notification that was sent to admins of the business portfolio, when the business customer removed you as a partner, or unshared their WABA.

When WABA is unshared with you, all messaging for that WABA is blocked to protect your credit line. For complete security, we recommend that you revoke your credit line from the business customer’s WABA as soon as it has been unshared with you.

## See Also

  * Reference: [Business](/docs/marketing-api/reference/business)
  * Reference: [WhatsApp Business Account](/documentation/business-messaging/whatsapp/reference/whatsapp-business-account/whatsapp-business-account-api)
  * Reference: [Extended Credit](/docs/marketing-api/reference/extended-credit)

Did you find this page helpful?

ON THIS PAGE

Authentication and authorization

Get your credit line ID

Request syntax

Request example

Response

Sharing your credit line

Request syntax

Request parameters

Response

Response parameters

Alternate method for sharing your credit line

Step 1: Get your customer’s business portfolio ID

Request syntax

Request parameters

Response syntax

Response parameters

Step 2: Share your credit line with the customer’s business

Request syntax

Request parameters

Response example

Response parameters

Step 3: Attach your credit line to the customer’s WABA

Request syntax

Request parameters

Response syntax

Response parameters

Verifying shared status

Step 1: Get credit line’s receiving credential

Request syntax

Response syntax

Step 2: Get WABA’s primary funding ID

Request syntax

Response syntax

Step 3: Compare IDs

Revoke a shared credit line

Step 1: Get your credit line ID

Example request

Example response

Step 2: Get the customer’s business portfolio ID

Step 3: Get the customer’s credit sharing record

Step 4: Revoke credit sharing

Step 5: Verify credit sharing was revoked (Optional)

Troubleshooting

Unshared WhatsApp Business Accounts

See Also

* * *