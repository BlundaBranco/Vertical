# Cloud API flow

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/default-flow

---

# Cloud API flow

Updated: Nov 11, 2025

This document describes the default screens that your business customers will be presented with as they navigate the Embedded Signup flow. Note that if you inject [pre-filled data](/documentation/business-messaging/whatsapp/embedded-signup/pre-filled-data), you can pre-fill some of these screens, and bypass many of them entirely, reducing the likelihood of errors and making it much easier for your business customers to onboard onto the platform. This is the UI flow for the latest version v4.

## Screens

### Authentication screen

This screen authenticates business customers using their Facebook or Meta Business Suite credentials.

  

### Authorization screen

This screen describes the data the business customer will be permitting your app to access.

  

### Business Asset Selection Screen

This screen gives customers the option to select existing business assets such as a Meta business portfolio and WhatsApp Business Account.

Users also have the option to create new assets if they have not reached their portfolio limit.

  

### Business Asset Creation Screen

This screen gives customers the option to select existing business assets such as a Meta business portfolio and WhatsApp Business Account.

Users also have the option to create new assets if they have not reached their portfolio limit.

  

### Phone number addition screen

This screen allows the business customer to enter a new business phone number to associate with their WhatsApp Business Account.

It also allows the customer to choose how they wish to receive their verification code, which they will need to provide in the next step.

If you are providing phone numbers to your customers, you will have to deliver these codes to your customers, or provide pre-verified numbers instead.

  

### Phone number verification screen

This screen allows the business customer to verify ownership of the business phone number they entered in the previous step.

  

### Permissions review screen

This screen provides a summary of the permissions the business customer will be granting to your app.

  

### Success screen

This screen indicates that Meta successfully created and associated all of the business customer’s assets (business portfolio, WABA, phone number display profile, and business phone number).

When the customer clicks Finish, a message event will be triggered, containing the customer’s WABA ID and business phone number ID, which you must then use to onboard the customer to the platform.

  

Did you find this page helpful?

ON THIS PAGE

Screens

Authentication screen

Authorization screen

Business Asset Selection Screen

Business Asset Creation Screen

Phone number addition screen

Phone number verification screen

Permissions review screen

Success screen

* * *