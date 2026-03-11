# Audio messages

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/audio-messages

---

# Audio messages

Updated: Feb 17, 2026

On March 17th, 2026, voice messages will start receiving a [“played” status webhook](/documentation/business-messaging/whatsapp/webhooks/reference/messages/status) the first time a WhatsApp user plays a voice message shared by the business.

You can use Cloud API to send voice messages and basic audio messages.

## Voice messages

A voice message (sometimes referred to as a voice note, voice memo, or audio) is a recording of one or more persons speaking, and can include background sounds like music. Voice messages include features like automatic download, profile picture, and voice icon. These features are not available with basic audio messages. If the user sets voice message transcripts to **Automatic** , the message includes a text transcription.

  * Voice messages require .ogg files encoded with the **OPUS** codec. If you send a different file type or a file encoded with a different codec, voice message transcription will fail.
  * The play icon will only appear if the file is 512KB or smaller, otherwise it will be replaced with a download icon (a downward facing arrow).
  * The message displays your business’s profile image with a microphone icon.
  * The text transcription appears if the user has enabled **Automatic**  [voice message transcripts⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F241617298315321%2F&h=AT7rMz1uh49lzRZM149teNPq5D6WoIkESYJMV_FxG8FkZ_2AMB3I6Qv-EXvy3FfaRwGKHHIA-I4UwLo0qJGBb2t2MLVM0xbyckLuJRpcZB2M6jH3w0JKIK_7Hh1IfCZoQeqRcDXu0qrL61MOiGaprw). If the user has set this to **Manual** , the text “Transcribe” will appear instead, which will display the transcribed text once tapped. If the user has set voice message transcripts to **Never** , no text will appear.

## Basic audio messages

Basic audio messages display a download icon and a music icon. When the WhatsApp user taps the play icon, the user manually download the audio message for the WhatsApp client to load and then play the audio file.

  * The download icon will be replaced with a play icon if the WhatsApp user has enabled [auto-download⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F366146522333492%2F&h=AT7rMz1uh49lzRZM149teNPq5D6WoIkESYJMV_FxG8FkZ_2AMB3I6Qv-EXvy3FfaRwGKHHIA-I4UwLo0qJGBb2t2MLVM0xbyckLuJRpcZB2M6jH3w0JKIK_7Hh1IfCZoQeqRcDXu0qrL61MOiGaprw) for audio media and conditions for auto-download are met (e.g. connected to wi-fi).
  * If you send a .ogg file encoded with the OPUS code as a basic audio message, the music icon will be replaced with a microphone icon. In addition, if the user has enabled **Automatic** or **Manual**  [voice message transcripts⁠](https://l.facebook.com/l.php?u=https%3A%2F%2Ffaq.whatsapp.com%2F241617298315321%2F&h=AT7rMz1uh49lzRZM149teNPq5D6WoIkESYJMV_FxG8FkZ_2AMB3I6Qv-EXvy3FfaRwGKHHIA-I4UwLo0qJGBb2t2MLVM0xbyckLuJRpcZB2M6jH3w0JKIK_7Hh1IfCZoQeqRcDXu0qrL61MOiGaprw), a text transcription or the text “Transcribe” will accompany the message.

## Request syntax

Use the [POST //messages](/documentation/business-messaging/whatsapp/reference/whatsapp-business-phone-number/message-api) endpoint to send an audio message to a WhatsApp user.
    
    
    curl 'https://graph.facebook.com///messages' \  
    -H 'Content-Type: application/json' \  
    -H 'Authorization: Bearer ' \  
    -d '  
    {  
      "messaging_product": "whatsapp",  
      "recipient_type": "individual",  
      "to": "",  
      "type": "audio",  
      "audio": {  
        "id": "",   
        "link": "",   
        "voice":    
      }  
    }'  
      
    

## Request parameters

Placeholder |  Description |  Example Value   
---|---|---  
``_String_| **Required.**[System token](/documentation/business-messaging/whatsapp/access-tokens#system-user-access-tokens) or [business token](/documentation/business-messaging/whatsapp/access-tokens#business-integration-system-user-access-tokens).| `EAAAN6tcBzAUBOZC82CW7iR2LiaZBwUHS4Y7FDtQxRUPy1PHZClDGZBZCgWdrTisgMjpFKiZAi1FBBQNO2IqZBAzdZAA16lmUs0XgRcCf6z1LLxQCgLXDEpg80d41UZBt1FKJZCqJFcTYXJvSMeHLvOdZwFyZBrV9ZPHZASSqxDZBUZASyFdzjiy2A1sippEsF4DVV5W2IlkOSr2LrMLuYoNMYBy8xQczzOKDOMccqHEZD`  
``_String_| **Optional.** Graph API version.| v25.0  
``_Boolean_| **Optional.** Set to `true` if sending a voice message. Voice messages must be Ogg files encoded with the **OPUS** codec.To send a basic audio message, set to `false` or omit entirely.| `true`  
``_String_| **Required if using uploaded media, otherwise omit.** ID of the [uploaded media asset](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media).| `1013859600285441`  
``_String_| **Required if using hosted media, otherwise omit.** URL of the media asset hosted on your public server. For better performance, we recommend using `id` and an [uploaded media asset ID](/documentation/business-messaging/whatsapp/business-phone-numbers/media#upload-media) instead.| `https://www.luckyshrub.com/media/ringtones/wind-chime.mp3`  
``_String_| **Required.** WhatsApp business phone number ID.| `106540352242922`  
``_String_| **Required.** WhatsApp user phone number.| `+16505551234`  
  
## Supported audio formats

Audio Type |  Extension |  MIME Type |  Max Size   
---|---|---|---  
AAC| .aac| audio/aac| 16 MB  
AMR| .amr| audio/amr| 16 MB  
MP3| .mp3| audio/mpeg| 16 MB  
MP4 Audio| .m4a| audio/mp4| 16 MB  
OGG Audio| .ogg| audio/ogg (OPUS codecs only; base audio/ogg not supported; mono input only)| 16 MB  
  
The most common errors associated with audio files are mismatched MIME types (MIME type doesn’t match the file type indicated by the file name) and invalid encoding for Ogg files (OPUS codec only). If you encounter an error when sending a media file, verify that your audio file’s MIME type matches its extension and is a supported type. For Ogg files, use the OPUS codec for encoding.

## Example request

Example request to send an image message using an uploaded media ID and a caption.
    
    
    curl 'https://graph.facebook.com/v25.0/106540352242922/messages' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer EAAJB...' \
    -d '
    {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": "+16505551234",
      "type": "audio",
      "audio": {
        "id" : "1013859600285441",
        "voice": true
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

Voice messages

Basic audio messages

Request syntax

Request parameters

Supported audio formats

Example request

Example Response

* * *