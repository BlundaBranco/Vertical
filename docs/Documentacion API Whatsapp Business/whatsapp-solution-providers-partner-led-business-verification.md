# Partner-led Business Verification

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/partner-led-business-verification

---

# Partner-led Business Verification

Updated: Nov 14, 2025

This feature is currently only available to approved **Select Solution** and **Premier** Solution Partners. See our [Sign up for partner-led business verification⁠](https://www.facebook.com/business/help/1091073752691122) Help Center article to learn how to request approval.

This document describes how to create business verification submissions for business customers who have been onboarded via Embedded Signup.

If you are an approved Solution Partner, you can gather required business verification documentation from your onboarded business customers and submit their business for verification on their behalf. Decisions on submissions created in this way can be made in minutes instead days.

## Requirements

  * you must already be an approved **Select Solution** or **Premier** Solution Partner, and [approved for access⁠](https://www.facebook.com/business/help/1091073752691122)
  * your [system user access token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens)
  * the system user whose system token you are using must be an admin on your business portfolio (see our [About business portfolio access⁠](https://www.facebook.com/business/help/442345745885606) Help Center article)
  * the system user whose system token you are using must have granted your app the **business_management** permission
  * the business customer’s business portfolio ID ([provided by the customer⁠](https://www.facebook.com/business/help/1181250022022158?id=180505742745347) or returned via API by requesting the `owner_business_info field` on the customer’s WABA ID, using their [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens))

## Limitations

You are limited to three submissions for a given business customer. If all three submissions are rejected, the customer must complete business verification on their own. If your submission is rejected three times, share the following Help Center article with the customer:

[How to Verify Your Business on Meta⁠](https://www.facebook.com/business/help/2058515294227817?id=180505742745347)

## Support

If you need help with partner-led business verification, open a Direct Support ticket:

  1. Go to [Direct Support⁠](https://business.facebook.com/direct-support/).
  2. Click **Ask a Question**.
  3. Under **Topic** select **WABiz: Onboarding**.
  4. Click **Request type** and select **Partner-led Business Verification for WhatsApp**.

## Supported Documents

See the following Help Center article for a list of business documents that we will accept:

[Upload official documents to verify your business⁠](https://www.facebook.com/business/help/159334372093366)

## Turnaround Time

The average turnaround time for a submission is 5 minutes, but can take several hours. If you do not receive a webhook notifying of the outcome of a submission after 24 hours, please open a Direct Support ticket.

## Webhooks

Submission decisions are communicated via **account_update** webhook, so make sure your app is subscribed to the **account_update** webhook field, and your app is [subscribed to webhooks on the business customer’s WhatsApp Business Account](/documentation/business-messaging/whatsapp/solution-providers/manage-webhooks#subscribe-to-a-whatsapp-business-account).

### Example webhook
    
    
    {  
      "entry": [  
        {  
          "id": "",  
          "time": ,  
          "changes": [  
            {  
              "value": {  
                "event": "PARTNER_CLIENT_CERTIFICATION_STATUS_UPDATE",  
                "partner_client_certification_info": {  
                  "client_business_id": "",  
                  "status": "",  
                  "rejection_reasons": [  
                    ""  
                  ]  
      
                }  
              },  
              "field": "account_update"  
            }  
          ]  
        }  
      ],  
      "object": "whatsapp_business_account"  
    }  
      
    

### Webhook parameters

Placeholder |  Description |  Example value   
---|---|---  
``| Business customer’s business portfolio ID.| `2729063490586005`  
``| Description of rejection reasons. Note that this parameter will be present even if the submission was rejected, but its value will be set to `NONE`.See the `rejection_reasons` field on the [WhatsApp Business Partner Client Verification Submission](/docs/graph-api/reference/whats-app-business-partner-client-verification-submission#Reading) node reference for a list of possible values and their descriptions.| `LEGAL_NAME_NOT_FOUND_IN_DOCUMENTS`  
``| Business verification status. Values can be:`APPROVED` — Indicates the customer’s business has been verified.`FAILED` — Indicates we were unable to verify the customer’s business based on the submitted business information.| `APPROVED`  
``| Business customer’s WABA ID.| `486585971195941`  
``| Unix timestamp indicating when the webhook was sent.| `1730752761`  
  
## Submitting a business for verification

Use the [POST //self_certify_whatsapp_business](/docs/marketing-api/reference/business/self_certify_whatsapp_business#Creating) endpoint to initiate business verification for a business customer who has onboarded via your implementation of Embedded Signup.

### Request
    
    
    curl 'https://graph.facebook.com/v21.0//self_certify_whatsapp_business' \  
    -H 'Authorization: Bearer ' \  
    -F 'end_business_id=""' \  
    -F 'business_documents[]=@""' \  
    -F 'business_documents[]=@""' \  
    -F 'business_documents[]=@""'  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** Your business portfolio ID.| `506914307656634`  
``| **Required.** The customer’s business portfolio ID.| `2729063490586005`  
``| **Required.** Path to the customer’s business document that you are submitting on their behalf.You can submit a maximum of 3 documents (the example request above submits 3). Use one parameter per document.The maximum size of each document is 5 MB.Supported file types:

  * PDF
  * JPEG
  * JPG
  * PNG

See our [Upload official documents to verify your business⁠](https://www.facebook.com/business/help/159334372093366) Help Center article for documents we will accept.| `NP7sEWs3x/wind_and_wool_bank_statement_04302024.txt`  
``| **Required.** Your system user access token.| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
  
### Response

Upon success:
    
    
    {  
      "success": true,  
      "message": "Your request has been received and will be reviewed shortly.",  
      "verification_attempts":   
    }  
      
    

### Response parameters

Placeholder |  Description |  Example value   
---|---|---  
``| Count of business verification submissions you have initiated on behalf of the business customer.| `1`  
  
## Getting submission status

Use the [GET //self_certified_whatsapp_business_submissions](/docs/marketing-api/reference/business/self_certified_whatsapp_business_submissions#Reading) endpoint to get the verification status of submissions you have created for a single business customer, or for all of your business customers.

### Request
    
    
    curl 'https://graph.facebook.com/v17.0//self_certified_whatsapp_business_submissions?fields=end_business_id=' \  
    -H 'Authorization: Bearer '  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| **Optional.** The customer’s business portfolio ID.Include this parameter if you only want to get data on submissions you have created for the business identified by the customer’s business portfolio ID.| `2729063490586005`  
``| **Required.** Your system user access token.| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
  
### Response

Upon success, the endpoint returns an array of [WhatsApp Business Partner Client Verification Submission](/docs/graph-api/reference/whats-app-business-partner-client-verification-submission) nodes, with default fields on each node.
    
    
    {  
      "data": [  
      
        // Structure for pending or approved submissions  
        {  
          "verification_status": "",  
          "submitted_time": "",  
          "update_time": "",  
          "client_business_id": "",  
          "submitted_info": {  
            "business_vertical": ""  
          },  
          "id": ""  
        },  
      
        // Structure for rejected submissions  
        {  
          "verification_status": "",  
          "rejection_reasons": [  
            "",  
            ""  
          ],  
          "submitted_time": "",  
          "update_time": "",  
          "client_business_id": "",  
          "submitted_info": {},  
          "id": ""  
        },  
      
        // Additional objects describing each submission would follow  
      
      ],  
      "paging": {  
        "cursors": {  
          "before": "",  
          "after": ""  
        },  
        "next": ""  
      }  
    }  
      
    

### Response parameters

See the [WhatsApp Business Partner Client Verification Submission](/docs/graph-api/reference/whats-app-business-partner-client-verification-submission) node reference for descriptions of returned fields and parameter values.

## Get business verification status

If you wish, you can use the [GET /](/docs/marketing-api/reference/business#Reading) endpoint and request the `verification_status` field on the customer’s business portfolio ID to see its verification status (alternatively, you can request the `business_verification_status` field on the customer’s WABA ID using their business token).

### Request
    
    
    curl 'https://graph.facebook.com/v21.0/?fields=verification_status' \  
    -H 'Authorization: Bearer '  
      
    

### Request parameters

Placeholder |  Description |  Example value   
---|---|---  
``| **Required.** The customer’s business portfolio ID.| `2729063490586005`  
``| **Required.** The customer’s business token.| `EAAAN6tcBzAUBOwtDtTfmZCJ9n3FHpSDcDTH86ekf89XnnMZAtaitMUysPDE7LES3CXkA4MmbKCghdQeU1boHr0QZA05SShiILcoUy7ZAb2GE7hrUEpYHKLDuP2sYZCURkZCHGEvEGjScGLHzC4KDm8tq2slt4BsOQE1HHX8DzHahdT51MRDqBw0YaeZByrVFZkVAoVTxXUtuKgDDdrmJQXMnI4jqJYetsZCP1efj5ygGscZBm4OvvuCYB039ZAFlyNn`  
  
### Response
    
    
    {  
      "verification_status": "",  
      "id": ""  
    }  
      
    

### Response parameters

Placeholder |  Description |  Example value   
---|---|---  
``| The business customer’s business portfolio ID.| `2729063490586005`  
``| The business portfolio’s verification status.See the `verification_status` field on the [Business](/docs/marketing-api/reference/business#Reading) node reference for a list of possible values.| `verified`  
  
Did you find this page helpful?

ON THIS PAGE

Requirements

Limitations

Support

Supported Documents

Turnaround Time

Webhooks

Example webhook

Webhook parameters

Submitting a business for verification

Request

Request parameters

Response

Response parameters

Getting submission status

Request

Request parameters

Response

Response parameters

Get business verification status

Request

Request parameters

Response

Response parameters

* * *