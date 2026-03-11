# Group management

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/reference

---

# Group management

Updated: Nov 14, 2025

## Overview

The Groups API gives you simple functions to control groups through their lifecycle.

When you create a new group, an invite link is created for inviting participants to the group.

Since you cannot manually add participants to the group, simply send a message with your invite link to WhatsApp users who you would like to join the group.

## Group management features

  * Create and delete group
  * Groups with join requests enabled
  * Get and reset group invite link
  * Send group invite link template message
  * Remove group participants
  * Get group info
  * Get active groups
  * Update group settings

To learn how to message groups, view the [Group Messaging reference](/documentation/business-messaging/whatsapp/groups/groups-messaging).

## Subscribe to groups metadata webhooks

In order to receive webhook notifications for metadata about your groups, please subscribe to the following webhook fields:

  * `group_lifecycle_update`
  * `group_participants_update`
  * `group_settings_update`
  * `group_status_update`

For a full reference of webhooks for the Groups API, please visit our [Webhooks for Groups API reference](/documentation/business-messaging/whatsapp/groups/webhooks).

## Create group

Use this endpoint to create a new group and generate a group invite link.

Once the group is created, you will receive a webhook with an `invite_link` parameter that contains an invite link for the group. You can send this invite link to WhatsApp users interested in joining the group.

Optionally, you can create a group that requires join approval. This means that if a WhatsApp user wants to join your group, you can approve or reject their request.

Learn more about groups with join requests enabled.

### Request syntax

Create a group with an initial group invite link:

`POST //groups`

### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "subject": "",
      "description": "",
      "join_approval_mode": ""
    }
    

### Request parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required** Business phone number ID.| `12784358810`  
``_String_| **Required** Group subject.Maximum 128 characters. Whitespace is trimmed.| `New Purchase Inquiry`  
``_String_| **Optional** Group description.Maximum 2048 characters.| `Jim, an existing client, would like to learn about new car purchase options for current year models.`  
``_String_| **Optional** Indicates if WhatsApp users who click the invitation link can join the group with or without being approved first.Values can be:

  * `approval_required` — Indicates WhatsApp users must be approved via join request before they can access the group.
  * `auto_approve` — Indicates WhatsApp users can join the group without approval.

If omitted, `join_approval_mode` is set to `auto_approve` by default.| `auto_approve`  
  
### Webhooks

A `group_lifecycle_update` webhook is triggered.

#### Group create succeed

[View the “Group create succeed” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#group-create-succeed)

#### Group create fail

[View the “Group create fail” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#group-create-fail)

#### User joins group using invite link

[View the “User joins group using invite link” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#user-joined-group-using-invite-link-succeed)

## Groups with join requests

You can create groups that require join request approval. Once enabled, WhatsApp users who click the group invitation link can submit a request to join the group, or cancel a prior request:

When a WhatsApp user joins the group using a join request, a [`group_participants_update` webhook for a user accepting the join request] (/documentation/business-messaging/whatsapp/groups/webhooks#user-accepts-or-cancels-join-request) is triggered. You can also get a list of open join requests via API. Use the contents of the webhook or API response to approve or reject requests.

### Get join requests

#### Request syntax

`GET //join_requests`

#### Request parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required.** Group ID.| `Y2FwaV9ncm91cDoxNzA1NTU1MDEzOToxMjAzNjM0MDQ2OTQyMzM4MjAZD`  
  
#### Response syntax

Upon success:
    
    
    {
      "data": [
        {
          "join_request_id": "",
          "wa_id": "",
          "creation_timestamp": "
        },
        //Additional join request objects would follow, if any
      ],
      "paging": {
        "cursors": {
          "before": "",
          "after": ""
        }
      }
    }
    

#### Response parameters

  

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_|  Join request ID.| `MTY0NjcwNDM1OTU6MTIwMzYzNDA0Njk0MjMzODIw`  
``_String_|  WhatsApp user ID.| `16505551234`  
``_Integer_|  Unix timestamp indicating when the join request was created.| `1755548877`  
``_String_|  Before cursor. See [Paginated Results](/docs/graph-api/results).| `eyJvZAmZAzZAXQiOjAsInZAlcnNpb25JZACI6IjE3NTU1NTM3MDUxNzUwNTQ1MTAifQZDZD`  
``_String_|  After cursor. See [Paginated Results](/docs/graph-api/results).| `eyJvZAmZAzZAXQiOjAsInZAlcnNpb25JZACI6IjE3NTU1NTM3MDUxNzUwNTQ1MTAifQZDZD`  
  
### Approve join requests

#### Request syntax

`POST //join_requests`

#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "join_requests": [
        "",
        // Additional join request IDs would go here, if approving in bulk
      ]
    }
    

#### Request parameters

  

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required.** Group ID.| `Y2FwaV9ncm91cDoxNzA1NTU1MDEzOToxMjAzNjM0MDQ2OTQyMzM4MjAZD`  
  
#### Response syntax

Upon success, the API will respond with the following JSON payload, and WhatsApp users whose join requests were approved will be able to access the group when tapping the invite link.
    
    
    {
      "messaging_product": "whatsapp",
      "approved_join_requests": [
        "",
        // Additional join request IDs would go here, it approved in bulk
      ],
    
      //Only included if unable to approve one or more join requests
    
      "failed_join_requests": [
        {
          "join_request_id": "",
          "errors": [
            {
              "code": "",
              "message": "",
              "title": "",
              "error_data": {
                "details": ""
              }
            }
          ]
        }
      ],
      "errors": [
        {
          "code": "",
          "message": "",
          "title": "",
          "error_data": {
            "details": ""
          }
        }
      ]
    }
    

#### Response parameters

  

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_|  ID of approved join request, or ID of failed join request, if we were unable to approve.| `MTY0NjcwNDM1OTU6MTIwMzYzNDA0Njk0MjMzODIw`  
``_Integer_|  Error code, if unable to approve.| `131203`  
``_String_|  Error message, if unable to approve.| `(#131203) Recipient has not accepted our new Terms of Service and Privacy Policy.`  
``_String_|  Error title, if unable to approve.| `Unable to add participant to group`  
``_String_|  Error details, if unable to approve.| `Recipient has not accepted our new Terms of Service and Privacy Policy.`  
  
#### Webhook

A `group_participants_update` webhook is triggered.

[View the “User accepts join request” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#user-accepts-or-cancels-join-request)

### Reject join requests

#### Request syntax

`DELETE //join_requests`

#### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "join_requests": [
        "",
        //Additional join request IDs would go here, it rejecting in bulk
      ]
    }
    

#### Request parameters

  

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required.** Group ID.| `Y2FwaV9ncm91cDoxNzA1NTU1MDEzOToxMjAzNjM0MDQ2OTQyMzM4MjAZD`  
``_String_| **Required.** ID of join request to reject.| `MTY0NjcwNDM1OTU6MTIwMzYzNDA0Njk0MjMzODIw`  
  
#### Response syntax

Upon success, the API will respond with the following JSON payload, and the WhatsApp user will see the **Request to join** button again when accessing the group invite link.
    
    
    {
      "messaging_product": "whatsapp",
      "rejected_join_requests": [
        "",
        //Additional join request IDs would go here, it rejecting in bulk
      ],
    
      //Only included if unable to reject one or more join requests
      "failed_join_requests": [
        {
          "join_request_id": "",
          "errors": [
            {
              "code": "",
              "message": "",
              "title": "",
              "error_data": {
                "details": ""
              }
            }
          ]
        }
      ],
      "errors": [
        {
          "code": "",
          "message": "",
          "title": "",
          "error_data": {
            "details": ""
          }
        }
      ]
    }
    

#### Response parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_|  ID of rejected join request, or ID of failed join request, if we were unable to reject.| `MTY0NjcwNDM1OTU6MTIwMzYzNDA0Njk0MjMzODIw`  
``_Integer_|  Error code, if unable to reject.| `131203`  
``_String_|  Error message, if unable to reject.| `(#131203) Recipient has not accepted our new Terms of Service and Privacy Policy.`  
``_String_|  Error title, if unable to reject.| `Unable to add participant to group`  
``_String_|  Error details, if unable to reject.| `Recipient has not accepted our new Terms of Service and Privacy Policy.`  
  
### Webhook

None.

## Get and reset group invite link

Once an invite link is reset, all previous invite links will become invalid.

An invite link for the group is generated when the group is created. Use these endpoints to get and reset group invite links.

For each endpoint, you will need your group ID in order to get or reset a link for the correct group as follows:

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required** The ID of the group you want to get or reset an invite link for.| `Y2FwaV9ncm91cDoxOTUwNTU1MDA3OToxMjAzNjMzOTQzMjAdOTY0MTUZD`  
  
### Get group invite link

#### Request syntax

`GET //invite_link`

#### Response body
    
    
    {
      "messaging_product": "whatsapp",
      "invite_link": "https://chat.whatsapp.com/"
    }
    

Note that `invite_link` always begins with the prefix `https://chat.whatsapp.com/`. The only variable portion is ``.

### Reset group invite link

#### Request syntax

`POST //invite_link`

#### Request body
    
    
    {
      "messaging_product": "whatsapp",
    }
    

#### Response body
    
    
    {
      "messaging_product": "whatsapp",
      "invite_link": "https://chat.whatsapp.com/"
    }
    

## Send group invite link template message

[Template Library⁠](https://business.facebook.com/wa/manage/template-library) contains a utility message template for sending group invite links to WhatsApp users. Use these pre-defined templates to send group invitations as utility messages.

**In order to keep the template priced as`utility`, you cannot modify it when you copy it from template library to your WABA.**

To send the template message:

#### Step 1. Add a group invite link template in Template Library to your account templates:

_In WhatsApp Manager_

  1. Navigate to [Template Library⁠](https://business.facebook.com/wa/manage/template-library)
  2. On the left, click the **Group invite link** dropdown, then click the **Group invite upon request** checkbox.
  3. Select the template you want to use, give it a name, and click **Submit**.

_Via the API_

You can query template libraries applicable to group invite links using the request below:

`GET /message_template_library?category=utility&topic=group_invite_link&language=en`

[Read more about finding and adding the template to your WABA via the api](/documentation/business-messaging/whatsapp/templates/template-library#using-the-api)

Template approval may require up to 24 hours. You’ll be able to send messages with this template after its approval.

#### Step 2. Send the template message

  1. Send the template using the request syntax and body below, substituting your group id, the name you gave your template, and other applicable values.

When you provide the group id in the api request, it will be automatically translated into the corresponding group invite link upon message delivery.

### Request syntax

`POST //messages`

### Endpoint parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_Integer_| **Required** Business phone number ID.| `13057863445`  
  
### Request body
    
    
    curl --location 'https://graph.facebook.com///messages?access_token=' \
          --header 'Content-Type: application/json' \
          --data '{
            "messaging_product": "whatsapp",
            "to": "",
            "type": "template",
            "template": {
              "name": "",
              "language": {
                "code": ""
              },
              "components": [
                {
                  "type": "body",
                  "parameters": [
                    {
                      "type": "group_id",
                      "group_id": ""
                    },
                    {
                      ...additional parameters
                    }
                  ]
                }
              ]
            }
          }'
    

[Learn more about Template Library](/documentation/business-messaging/whatsapp/templates/template-library)

### Webhooks

#### User joins group using invite link

[View the “User joins group using invite link” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#user-joined-group-using-invite-link-succeed)

## Delete group

This endpoint deletes the group and removes all participants, including the business. No request body is required.

### Request Syntax

`DELETE /`

### Request properties

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required**  
The ID of the group you want to delete.| `Y2FwaV9ncm91cDoxOTUwNTU1MDA3OToxMjAzNjMzOTQzMjAdOTY0MTUZD`  
  
### Webhooks

A `group_lifecycle_update` webhook is triggered.

#### Delete group succeed

[View the “Delete group succeed” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#delete-group-succeed)

#### Delete group fails

[View the “Delete group fails” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#delete-group-fails)

## Remove group participants

Use this endpoint to remove participants from the group.

**Note: If a participant is removed from a group, they can no longer join the group via an invite link.**

### Request syntax

`DELETE //participants`

### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "participants": [
        { "user": " or " },
        { "user": " or "" },
        ...
      ]
    }
    

### Request properties

Placeholder |  Description |  Sample Value   
---|---|---  
`"participants": []`_Array_| **Optional** Specifies an array of phone numbers or WhatsApp IDs of WhatsApp accounts. The business phone number used to create the group is always added to the group as the creator and admin.

  * Maximum 8 participants.
  * The array cannot be empty.

| 
    
    
    { "user": "+17865347866" },
    { "user": "+7669992245" },
    ...  
  
### Webhooks

A `group_participants_update` webhook is triggered.

#### Group participant leaves

[View the “Group participant leaves” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#delete-group-succeed)

## Get group info

Use this endpoint to retrieve metadata about a single group.

**Note:** Specifying no fields in the query parameters will just return the group ID and messaging product.

### Request syntax

`GET /?fields=`

### Endpoint parameters

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Required**  
The ID of the group you are querying info from.| `Y2FwaV9ncm91cDoxOTUwNTU1MDA3OToxMjAzNjMzOTQzMjAdOTY0MTUZD`  
``_String_| **Optional**  
A comma-separated list of fields to return. If no fields are passed in, only the group id is returned.| `"subject,description,participants,join_approval_mode"`[Learn more about Graph API fields here](/docs/graph-api/overview#fields)  
  
### Available fields

Field |  Description |  Sample Return Value   
---|---|---  
`join_approval_mode` _String_|  Indicates if WhatsApp users who click the invitation link can join the group with or without being approved first.Values can be:

  * `approval_required` — Indicates WhatsApp users must be approved via join request before they can access the group.
  * `auto_approve` — Indicates WhatsApp users can join the group without approval.

| `auto_approve`  
`subject` _String_|  The subject for the group.| `"Artificial Intelligence Insights"`  
`description` _String_|  The group description, if set during creation time.| `"Explore AI developments, share knowledge, and discuss the future of artificial intelligence with fellow enthusiasts and experts."`  
`suspended` _Boolean_|  Returns `true` if the group has been suspended by whatsapp.| `false`  
`creation_timestamp` _Integer_|  UNIX timestamp in seconds at which the group was created.| `683731200`  
`participants` _List_|  A list of objects `{"wa_id": ""}`, where `` is a participant in the group being queried.| `[{"wa_id": "2228675309"}, {"wa_id": "7693349922"}]`  
`total_participant_count` _Integer_|  The total number of participants in the group, excluding your business.| `6`  
  
### Sample response
    
    
    {
      "messaging_product": "whatsapp",
      "id": "",
      "subject": "",
      "creation_timestamp": "",
      "suspended": "",
      "description": "",
      "total_participant_count": "",
      "participants": [
        {
          "wa_id": ""
        },
        {
          "wa_id": ""
        }
      ],
      "join_approval_mode": ""
    }
    

## Get active groups

Use this endpoint to retrieve a list of active groups for a given business phone number.

### Request syntax

`GET //groups`

### Query Parameters
    
    
    ?limit=, // Optional
    &after=, // Optional
    &before= // Optional
    

Parameter |  Description   
---|---  
``_Optional_|  Number of groups to fetch in the request.Min: 1 | Default: 25 | Max: 1024  
``_Optional_|  Cursor that points to the beginning of a page of data. Learn more about [Paginated Results in Graph API here](/docs/graph-api/results)  
``_Optional_|  Cursor that points to the end of a page of data. Learn more about [Paginated Results in Graph API here](/docs/graph-api/results)  
  
### Response Object
    
    
    {
      "data": {
        "groups": [
          {"id": "GROUP_ID", "subject": SUBJECT, "created_at": "TIMESTAMP"},
          {"id": "GROUP_ID", "subject": SUBJECT, "created_at": "TIMESTAMP"}
          …
        ]
      },
      "paging": {
        "cursors": {
          "after": "MTAxNTExOTQ1MjAwNzI5NDE=",
          "before": "NDMyNzQyODI3OTQw"
        },
        "previous": "https://graph.facebook.com/VERSION/PHONE_NUMBER_ID/groups?limit=10&before=NDMyNzQyODI3OTQw",
        "next": "https://graph.facebook.com/VERSION/PHONE_NUMBER_ID/groups?limit=25&after=MTAxNTExOTQ1MjAwNzI5NDE="
      }
    }
    

### Response parameters

Parameter |  Description   
---|---  
`data[groups]`_List_|  A list of groups, each containing the group id, group subject, and UNIX timestamp for group creation.  
`paging` _Object_|  A pagination object.Learn more about [Paginated Results in Graph API here](/docs/graph-api/results)  
  
## Update group settings

Use this webhook to update your group’s subject, description, and photo.

### Request syntax

`POST /`

### Request body
    
    
    {
      "messaging_product": "whatsapp",
      "subject": "",
      "profile_picture_file": "",
      "description": "",
    }
    

### Request properties

  

**Note**

Placeholder |  Description |  Sample Value   
---|---|---  
``_String_| **Optional** A path to an image file stored in your local directory.**To upload a file** : Follow the same request structure as the [Upload Media](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) endpoint.Sample file upload cURL:
    
    
    curl 'https://graph.facebook.com/v23.0/ \
              -X POST \
              -H 'Authorization: Bearer ...' \
              -F 'messaging_product=whatsapp' \
              -F 'file=@/media/pictures/square_pic.png'

Group profile picture requirement:

  * Only support mime type image/jpeg
  * Maximum size: 5MB
  * Image should be in square, that is, height = width.
  * Minimum size: 192 x 192

| `/local/path/file.jpg`  
``_String_| **Optional** The new subject for the group.

  * Maximum length: 128 characters.
  * Must not be empty if provided.

| `"Watch Enthusiasts"`  
``_String_| **Optional** The new description for the group.

  * Max length: 2048 characters

| `"Join our community to discuss the latest timepieces, share watch reviews, and connect with fellow horology enthusiasts."`  
  
### Webhooks

A `group_settings_update` webhook is triggered.

#### Group settings update succeed

[View the “Group settings update succeed” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#group-settings-update-succeed).

#### Group settings update partial fail

[View the “Group settings update partial fail” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#group-settings-update-partial-fail).

#### Group settings update total fail

[View the “Group settings update total fail” sample webhook](/documentation/business-messaging/whatsapp/groups/webhooks#group-settings-update-total-fail).

Did you find this page helpful?

ON THIS PAGE

Overview

Group management features

Subscribe to groups metadata webhooks

Create group

Request syntax

Request body

Request parameters

Webhooks

Group create succeed

Group create fail

User joins group using invite link

Groups with join requests

Get join requests

Request syntax

Request parameters

Response syntax

Response parameters

Approve join requests

Request syntax

Request body

Request parameters

Response syntax

Response parameters

Webhook

Reject join requests

Request syntax

Request body

Request parameters

Response syntax

Response parameters

Webhook

Get and reset group invite link

Get group invite link

Request syntax

Response body

Reset group invite link

Request syntax

Request body

Response body

Send group invite link template message

Step 1. Add a group invite link template in Template Library to your account templates:

Step 2. Send the template message

Request syntax

Endpoint parameters

Request body

Webhooks

User joins group using invite link

Delete group

Request Syntax

Request properties

Webhooks

Delete group succeed

Delete group fails

Remove group participants

Request syntax

Request body

Request properties

Webhooks

Group participant leaves

Get group info

Request syntax

Endpoint parameters

Available fields

Sample response

Get active groups

Request syntax

Query Parameters

Response Object

Response parameters

Update group settings

Request syntax

Request body

Request properties

Webhooks

Group settings update succeed

Group settings update partial fail

Group settings update total fail

* * *