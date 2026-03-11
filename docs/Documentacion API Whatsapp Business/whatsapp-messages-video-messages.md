# Video Messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/video-messages

---

# Video Messages

Updated: Nov 3, 2025

Video messages display a thumbnail preview of a video image with an optional caption. When the WhatsApp user taps the preview, it loads the video and displays it to the user.

## Sending Video Messages

Use the **[POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api)** endpoint to send a video message to a WhatsApp user.

### Request Syntax
    
    
    POST //messages

### Post Body
    
    
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "{{wa-user-phone-number}}",  
      "type": "video",  
      "video": {  
        "id" : "", /* Only if using uploaded media */  
        "link": "", /* Only if linking to your media */  
        "caption": ""  
      }  
    }  
      
    

### Post Body Parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Optional.** Video caption text.Maximum 1024 characters.| `A succulent eclipse!`  
``_String_| **Required if using an uploaded media asset (recommended)**.[Uploaded media](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) asset ID.| `1166846181421424`  
``_String_| **Required if linking to your media asset (not recommended)** URL of video asset on your public server. For better performance, we recommend that you [upload your media asset](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) instead.| `https://www.luckyshrub.com/assets/lucky-shrub-eclipse-viewing.mp4`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Supported Video Formats

Only H.264 video codec and AAC audio codec supported. Single audio stream or no audio stream only.

Note that videos encoded with the H.264 “High” profile and B-frames are not supported by Android WhatsApp clients. We recommend that you use H.264 “Main” profile without B-frames, or the H.264 “Baseline” profile when encoding (or re-encoding with a tool like ffmpeg), and place moov boxes before mdat boxes, for broader compatibility. If you are using ffmpeg, you can use the -movflags faststart flag to place moov boxes before mdata boxes.

Video Type |  Extension |  MIME Type |  Max Size   
---|---|---|---  
3GPP| .3gp| video/3gpp| 16 MB  
MP4 Video| .mp4| video/mp4| 16 MB  
  
## Example Request

Example request to send a video message with a caption to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '{
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "video",
      "video": {
        "id" : "1166846181421424",
        "caption": "A succulent eclipse!"
      }
    }'

## Example Response
    
    
    {  
      "messaging_product": "whatsapp",  
      "contacts": [  
        {  
          "input": "+16505551234",  
          "wa_id": "16505551234"  
        }  
      ],  
      "messages": [  
        {  
          "id": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA"  
        }  
      ]  
    }  
      
    

Did you find this page helpful?

ON THIS PAGE

Sending Video Messages

Request Syntax

Post Body

Post Body Parameters

Supported Video Formats

Example Request

Example Response

* * *