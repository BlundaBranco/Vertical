# Groups API Error Codes and Troubleshooting

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/error-codes

---

# Groups API Error Codes and Troubleshooting

Updated: Oct 31, 2025

## Error Codes

Code |  Description |  HTTP Status Code   
---|---|---  
`131020`Bad Group| Cannot send messages to single member groups.| `400`Bad Request  
`131041`Group unknown| The group was not found, either because it doesn’t exist or you are not a member.| `400`Bad Request  
`131059`Invalid cursor| The cursor has either expired or become corrupted. Start pagination from the beginning again.| `400`Bad Request  
`131201`Request partially succeeded| Not all participant-level operations in the request succeeded.| `206`Partial Content Success  
`131202`Duplicate participant| Duplicate participants in the participant array input.| `400`Bad Request  
`131204`Participant overlimit| Group participant size exceeds limit.| `400`Bad Request  
`131207`Group suspended| The group violates platform policies.| `403`Forbidden  
`131208`Group Rate Limit Hit| Group operation failed because there were too many group operations from this phone number in a short period.| `429`Too many requests  
`131209`Invalid Group Profile Picture Aspect Ratio| Width and height of the image must be equal.| `400`Bad Request  
`131210`Image is Too Small to Process| Image width and height must be greater than 192px.| `400`Bad Request  
`131211`Group create limit reached| Reached the limit for the maximum number of groups that can be created for this number.| `400`Bad Request  
`131212`Participant is not a part of the group.| Participant is not a part of the group.| `400`Bad Request  
`131213`Group join request does not exist.| Group join request does not exist.| `400`Bad Request  
`131214`Group creation is temporarily disabled| Group creation is temporarily disabled due to excessive marketing messages sent by the WABA in customer service window over the past 7 days.| `400`Bad Request  
`131215`This phone number is not eligible to access Groups APIs| Groups APIs are only available for eligible phone numbers. Please check eligibility for Groups APIs in our documentation - /documentation/business-messaging/whatsapp/groups/get-started| `400`Bad Request  
  
Did you find this page helpful?

ON THIS PAGE

Error Codes

* * *