# Block Users API guide

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/block-users

---

# Block Users API guide

Updated: Feb 23, 2026

The Block Users API enables your business to block bad actors from contacting you.

## How it works

When you block a WhatsApp user, the following happens:

  * The user cannot contact your business or see that you are online.
  * Your business cannot message the user. If you do, you will encounter an error.

Errors on the API occur per-number since blocks might succeed on some numbers and fail on others.

The Block Users API is synchronous.

## Limitations

  * You can only block users that have messaged your business in the last 24 hours.
  * You cannot use this API to block another WhatsApp Business account.
  * The blocklist has a 64,000 user limit.

## Features

The API contains three endpoints:
    
    
    // Block WhatsApp user numbers
    POST //block_users
    
    
    // Unblock WhatsApp user numbers
    DELETE //block_users
    
    
    // Get list of blocked WhatsApp user numbers
    GET //block_users

## Block users

Use this endpoint to block a list of WhatsApp user numbers.

### Endpoint
    
    
    POST //block_users

### Request body
    
    
    {  
      "messaging_product": "whatsapp",  
      "block_users": [  
        {  
          "user": " or "  
        }  
      ]  
    }  
      
    

### Request parameters

Parameter |  Description   
---|---  
`messaging_product` _String_|  _Required_ Messaging service used for the request. Must be `"whatsapp"`.  
`block_users` _Array_|  _Required_ List of user(s) to block.Each element contains a `user` field.  
`user` _string_|  The phone number or WhatsApp ID you want to block.  
  
### Response object
    
    
    SUCCESS (200)  
      
    {  
      "messaging_product": "whatsapp",  
      "block_users": {  
        "added_users": [  
          {  
            "input": " or ",  
            "wa_id": ""  
          }  
        ]  
      }  
    }  
      
    

### Response parameters

Parameter |  Description   
---|---  
`block_users` _Object_|  Contains two lists:

  1. `added_users` — List of successfully blocked users.
  2. `failed_users` — List of users that were not blocked.

  
`added_users` _Object_|  List of successfully blocked users.Contains values of both:

  * | `input`|  _String_ — Phone number of a WhatsApp user  
---|---  
  
  * `wa_id`|  _String_ — Unique ID of a WhatsApp user  
---|---  
  

  
  
`failed_users` _Object_|  List of users that were not blocked.Contains values of:

  * | `input`|  _String_ — Phone number of a WhatsApp user  
---|---  
  
  * `wa_id`|  _String_ — Unique ID of a WhatsApp user (may not be present if the number is invalid)  
---|---  
  
  * `errors`|  _Array_ — Error details for the user  
---|---  
  

  
      
    
    MIXED SUCCESS/FAILURE (400)  
      
    {  
      "messaging_product": "whatsapp",  
      "block_users": {  
        "added_users": [  
          {  
            "input": " or ",  
            "wa_id": ""  
          },  
          {  
            "input": " or ",  
            "wa_id": ""  
          },  
          ...  
        ],  
        "failed_users": [  
          {  
            "input": " or ",  
            "wa_id": "", // May not be present if the number is invalid  
            "errors": [  
              {  
                "message": "",  
                "code": ,  
                "error_data": {  
                  "details": ""  
                }  
              }  
            ]  
          }  
        ]  
      },  
      "error": {  
        "message": "(#139100) Failed to block/unblock users",  
        "type": "OAuthException",  
        "code": 139100,  
        "error_data": {  
          "details": "Failed to block some users, see the block_users response list for details"  
        },  
        "fbtrace_id": ""  
      }  
    }  
      
    

## Unblock users

Use this endpoint to unblock a list of WhatsApp user numbers.

### Endpoint
    
    
    DELETE //block_users

### Request body
    
    
    {  
      "messaging_product": "whatsapp",  
      "block_users": [  
         {  
           "user": " or "  
         }  
       ]  
    }  
      
    

### Request parameters

Parameter |  Description   
---|---  
`messaging_product` _String_|  _Required_ Messaging service used for the request. Must be `"whatsapp"`.  
`block_users` _Array_|  _Required_ List of user(s) to unblock.Each element contains a `user` field.  
`user` _string_|  The phone number or WhatsApp ID you want to unblock.  
  
### Response object
    
    
    SUCCESS (200)  
      
    {  
      "messaging_product": "whatsapp",  
      "block_users": {  
        "removed_users": [  
          {  
            "input": " or ",  
            "wa_id": ""  
          }  
        ]  
      }  
    }  
      
    

### Response parameters

Parameter |  Description   
---|---  
`block_users` _Object_|  Contains two lists:

  1. `removed_users` — List of successfully unblocked users.
  2. `failed_users` — List of users that were not unblocked.

  
`removed_users` _Object_|  List of successfully unblocked users.Contains values of both:

  * | `input`|  _String_ — Phone number of a WhatsApp user  
---|---  
  
  * `wa_id`|  _String_ — Unique ID of a WhatsApp user  
---|---  
  

  
  
`failed_users` _Object_|  List of users that were not unblocked.Contains values of:

  * | `input`|  _String_ — Phone number of a WhatsApp user  
---|---  
  
  * `wa_id`|  _String_ — Unique ID of a WhatsApp user (may not be present if the number is invalid)  
---|---  
  
  * `errors`|  _Array_ — Error details for the user  
---|---  
  

  
      
    
    MIXED SUCCESS/FAILURE (400)  
      
    {  
      "messaging_product": "whatsapp",  
      "block_users": {  
        "removed_users": [  
          {  
            "input": " or ",  
            "wa_id": ""  
          },  
          {  
            "input": " or ",  
            "wa_id": ""  
          },  
          ...  
        ],  
        "failed_users": [  
          {  
            "input": " or ",  
            "wa_id": "", // May not be present if the number is invalid  
            "errors": [  
              {  
                "message": "",  
                "code": ,  
                "error_data": {  
                  "details": ""  
                }  
              }  
            ]  
          }  
        ]  
      },  
      "error": {  
        "message": "(#139100) Failed to block/unblock users",  
        "type": "OAuthException",  
        "code": 139100,  
        "error_data": {  
          "details": "Failed to unblock some users, see the block_users response list for details"  
        },  
        "fbtrace_id": ""  
      }  
    }  
      
    

## Get list of blocked numbers

Use this endpoint to get a list of blocked numbers on your WhatsApp Business number.

### Endpoint
    
    
    GET //block_users

### Query options
    
    
    ?limit=10
    &after=
    &before=

### Query parameters

Parameter |  Description   
---|---  
`limit` _Optional_|  Maximum number of blocked users to fetch in the request.  
`after` _Optional_|  Learn more about [Paginated Results in Graph API](/docs/graph-api/results)  
`before` _Optional_|  Learn more about [Paginated Results in Graph API](/docs/graph-api/results)  
  
### Response object
    
    
    SUCCESS  
      
    {  
      "data": [  
        {  
          "messaging_product": "whatsapp",  
          "wa_id": ""  
        }  
      ],  
      "paging": {  
        "cursors": {  
          "after": "eyJvZAmZAzZAXQiOjAsInZAlcnNpb25JZACI6IjE3Mzc2Nzk2ODgzODM1ODQifQZDZD",  
          "before": "eyJvZAmZAzZAXQiOjAsInZAlcnNpb25JZACI6IjE3Mzc2Nzk2ODgzODM1ODQifQZDZD"  
        }  
      }  
    }  
      
    

### Response parameters

Parameter |  Description   
---|---  
`data` _Array_|  List of blocked users.Each element contains `messaging_product` and `wa_id` fields.  
`messaging_product` _String_|  _Required_ Messaging service used for the request. Must be `"whatsapp"`.  
`wa_id` _String_|  Unique ID of a WhatsApp user  
`paging` _Object_|  Learn more about [Paginated Results in Graph API](/docs/graph-api/results).  
  
## Error codes
    
    
    ERROR  
    {  
      "messaging_product": "whatsapp",  
      "error": {  
        "message": "(#139102) Blocklist concurrent update",  
        "type": "OAuthException",  
        "code": 139102,  
        "error_data": {  
            "details": "Blocklist was updated during retrieval - retry with offset 0"  
        },  
        "fbtrace_id": ""  
      }  
    }  
      
    

Code |  Description   
---|---  
`139100`Failed to block/unblock some users| Bulk blocking failed to block some or all of the users.  
`139101`Blocklist limit reached| The blocklist has reached its 64,000 user limit.  
`139102`Blocklist concurrent update| Occurs when the blocklist is updated while performing a pagination request and `version_id` does not match.  
`139103`Internal error| Internal error, please try again.  
`130429`Rate Limit Hit| Occurs when either:

  1. Too many numbers are in the request itself.
  2. Or, too many requests are made over a short period of time.

  
`131021`Self Block| Failed to block self phone number.  
`131047`Re-engagement required| Occurs if the business has not received a message from that number in the last 24 hours.This error will also be returned if the number is an invalid WhatsApp user.  
  
Did you find this page helpful?

ON THIS PAGE

How it works

Limitations

Features

Block users

Endpoint

Request body

Request parameters

Response object

Response parameters

Unblock users

Endpoint

Request body

Request parameters

Response object

Response parameters

Get list of blocked numbers

Endpoint

Query options

Query parameters

Response object

Response parameters

Error codes

* * *