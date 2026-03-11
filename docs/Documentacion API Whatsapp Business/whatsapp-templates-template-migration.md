# Template migration

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-migration

---

# Template migration

Updated: Nov 14, 2025

This document describes how to migrate templates from one WhatsApp Business Account (WABA) to another. Note that migration doesn’t move templates, it recreates them in the destination WABA.

## Limitations

  * Templates can only be migrated between WABAs owned by the same Meta business.
  * Only templates with a status of `APPROVED` and a `quality_score` of either `GREEN` or `UNKNOWN` are eligible for migration.

## Request syntax

Use the [WhatsApp Business Account > Migrate Message Templates](/docs/graph-api/reference/whats-app-business-account/migrate_message_templates) endpoint to migrate templates from one WABA to another.
    
    
    curl -X POST "https://graph.facebook.com///migrate_message_templates" \  
    -H "Authorization: Bearer " \  
    -H "Content-Type: application/json" \  
    -d '  
    {  
      "source_waba_id": "",  
      "page_number": ,  
      "count":   
      
        
      "template_ids": []  
    }'  
      
    

### Parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_Integer_| **Optional.** Overrides the default batch size with a maximum count of 500.If the request takes longer than 30 seconds to execute and times out, reduce the count number.| `200`  
``_WhatsApp Business Account ID_| **Required.** Destination WhatsApp Business Account ID.| `104996122399160`  
``_Integer_| **Optional.** Indicates amount of templates to migrate as sets of 500. Zero-indexed. For example, to migrate 1000 templates, send one request with this value set to `0` and another request with this value set to `1`, in parallel.| `0`  
``_Array of strings_| **Optional.** Only use to migrate specific template IDs with a max array length of 500. For example, to migrate failed template IDs, add the specific template ID to the array.| `["35002248699842","351234565148","54382248699842"]`  
``_WhatsApp Business Account ID_| **Required.** Source WhatsApp Business Account ID.| `102290129340398`  
  
## Response
    
    
    {  
      "migrated_templates": [],  
      "failed_templates": []  
    }  
      
    

### Response properties

Placeholder |  Description |  Example Value   
---|---|---  
``_List_|  List of template IDs that were successfully duplicated in the destination WhatsApp Business Account.| `"1473688840035974","6162904357082268","6147830171896170"`  
``_Map_|  Map identifying templates that were not duplicated in the destination WhatsApp Business Account.  
Keys are template IDs and values are failure reasons.| `"1019496902803242":"Incorrect category",``"259672276895259":"Formatting error - dangling parameter",``"572279198452421":"Incorrect category"`  
  
## Example request
    
    
    curl -X POST 'https://graph.facebook.com/v25.0/104996122399160/migrate_message_templates?source_waba_id=102290129340398&page_number=0' \
    -H 'Authorization: Bearer EAAJB...'

## Example response
    
    
    {  
      "migrated_templates": [  
        "1473688840035974",  
        "6162904357082268",  
        "6147830171896170"  
      ],  
      "failed_templates": {  
        "1019496902803242": "Incorrect category",  
        "259672276895259": "Formatting error - dangling parameter",  
        "572279198452421": "Incorrect category"  
      }  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Limitations

Request syntax

Parameters

Response

Response properties

Example request

Example response

* * *