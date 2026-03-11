# Tracking with the Meta Pixel

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/pixel-tracking

---

# Tracking with the Meta Pixel

Updated: Nov 4, 2025

The [Meta Pixel](/docs/meta-pixel) is a snippet of JavaScript code that allows you to track visitor activity on your website. It works by loading a small library of functions that you can use whenever a site visitor takes an action (i.e., an event) that you want to track; this is called a conversion.

Embedding the Meta Pixel is a feature that lets you know how many visitors to a given page have clicked on the embedded signup button. This can help you understand how many people considered WhatsApp and how many successfully converted.

Make sure the [initial code setup](/docs/meta-pixel/get-started#base-code) triggers a `Pageview` event with your Facebook app ID and the `feature` parameter.

## Example
    
    
    
    
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'your-pixel-id');
      fbq('track', 'PageView', {appId: 'your-facebook-app-id', feature: 'whatsapp_embedded_signup'});
    
    
      your-pixel-id&ev=PageView&noscript=1"/>
    
    

Did you find this page helpful?

ON THIS PAGE

Example

* * *