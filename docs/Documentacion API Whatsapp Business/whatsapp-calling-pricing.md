# Calling API Pricing

> Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/pricing

---

# Calling API Pricing

Updated: Mar 2, 2026

**All user-initiated calls are free.**

## Overview

Businesses are charged for calls based on:

  * Duration of the call (calculated in six-second pulses)
  * Country code of the phone number being called
  * Volume tier (based on minutes called within the calendar month) using same [tiering accrual](/documentation/business-messaging/whatsapp/pricing#tiering-accrual) as messaging

Note: Our systems count fractional pulses as one pulse. For example, a 56-second call (9.33 pulses) would be counted as 10 pulses.

For calls that cross pricing tiers (for example from the 0 - 50,000 tier to the 50,001 - 250,000 tier), the entire call is priced at the lower rate (that is, the rate of the higher volume tier).

A valid payment method is required to place calls.

**Note:** Call permission request messages are subject to [per-messaging pricing](/documentation/business-messaging/whatsapp/pricing).

## Volume-based pricing (VBP) rate cards

These rate cards represent the current VBP rates for the WhatsApp Business Calling API effective August 1, 2025:

  * [Rates in USD](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F520671944_623223040377923_7736077446508180620_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DHrtMQmq3kEwQ7kNvwHvACdS%26_nc_oc%3DAdnGrjKQTd70Jx8ea3KwzGWL4tD3RWy-489hTvaldsQfvFkl43Vttv3koAb1dsVEtr4%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfwAQHqlXT-nv-0ITzpOf9wch2URBCnIfPmL28eh1dA2HQ%26oe%3D69B29951&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in INR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F520297017_2631484657208999_4027192314064932495_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D61iadG9fo3AQ7kNvwH5yzkp%26_nc_oc%3DAdkzHhDxLzFGZgnX8fH5yIAxabfyLh57L1hcBsgMKmXFphKVW5nBSDgV6WRU-_x9lYw%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfzU5OiqGD0ybn-7ORHFDOJhOAThGjSUt7tt_sljI73f_g%26oe%3D69B2AAE7&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in IDR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F522403360_1317814323248646_3679642822059879321_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D6hU63PR6hhYQ7kNvwEf2owH%26_nc_oc%3DAdmUctj00E-25F8hoqz9qF0C4yWFD_cRtZVAWuf1snp1b6VlaaLeco3KqrB50cR1mgc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_Afxo98avXRL6e7nlDDEs0bSTt8yad4gBatCmYMOxFD6dJQ%26oe%3D69B2BB2E&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in EUR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F521916945_1437343154178501_4307701949709939168_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DfNgAfJBqO58Q7kNvwHnZJwW%26_nc_oc%3DAdlgE1lZNHrCF7cT4nAxCcL7muKaSeWob3ih4LV65iE12zI0pPXcFxJLKgdyzaZKJTc%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_Afxq4EJbb3IK-txLot7SxMOjBG9jd1bPKgjp6sXtQxduVg%26oe%3D69B29665&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in GBP](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F523820415_1707220083238148_129381165576389329_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DJCQs0vlVQO0Q7kNvwGjaVKo%26_nc_oc%3DAdlcKPTXdbVAEwL0MP-eJ_eyw5JcthfEGzTMrcibadM7jb9qimuR6aP0SeD6sVAvfsU%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_Afy2VSvpze3ESFA4wC1tx6dkfyWDgINr6yfLZVtRNtYzlg%26oe%3D69B29276&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in AUD](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F518358957_1395180011780140_6900177198446866717_n.csv%3F_nc_cat%3D106%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DmTOxJHQmcD4Q7kNvwHOmLNt%26_nc_oc%3DAdm93JClpV0TflXTUqA8OUvstcVLMnSUvLGrgwzo1aNZPiCQUsnp35PyKGAiebKDleA%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfyIp0yJTfiISnFyodv0jOsXwU2xrOmlqylkGwMger6_OQ%26oe%3D69B2B486&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in MXN](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F597620135_866494415956770_7234843917023384648_n.csv%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DdcNGkx6PW5IQ7kNvwE0hVhr%26_nc_oc%3DAdn0I8Ke77txgKr61uRP2HAaHtY37POE7lykbuNIFx-XEaL_TKwamrZGPCsqdFGbaFA%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfwzC3xSalsuWZUPnCuEhqc5Bg_X5dYbbet4ZA8xcsafpg%26oe%3D69B2B1DD&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)

## Calling rates effective from April 1, 2026

  * [Rates in AED](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645511190_1133518252157137_2467372875475309946_n.csv%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D8__Zz2OpaFUQ7kNvwHkE92f%26_nc_oc%3DAdk2vfAM6u7Q5ROlPqhkLQ07_Wfskn8sR7_4mOlbl4K3BeWVmsOmppV6BLc1Fz9NqJQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfzTj5XRB3UVTqGlHrm_WurfwEazcUIx9EivqFQVJYADmw%26oe%3D69B2C067&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in ARS](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645535007_2106356046881103_582637830823220785_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DuliP7bdceygQ7kNvwHj_hUL%26_nc_oc%3DAdln1d0Bd2EnVlz5wNiqxPmPezha8gOU7_BFV5KPyVIelNZ5DDxaWbaa6qB0V8aVRkQ%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfzBnfq-IcC6Bo9SN4hfPtCJRsUG_zDFtt1K_tE1UoL3hA%26oe%3D69B293E3&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in CLP](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645611842_1271840028191992_5006957948426311618_n.csv%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D7cxdg1C73qUQ7kNvwEqrY3q%26_nc_oc%3DAdmM5b37Y5ycCTxgCg1XV7NrsI2C9CEA8Sty1a1oLaNc6G7AnownQ9c7VqWC1_7nv5c%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfynioGjsp5sXLHm8uSfv78IIegreOc5rleapOfg-G9DtA%26oe%3D69B2B98F&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in COP](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F646311801_1407132617776179_5444633403759429454_n.csv%3F_nc_cat%3D102%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DtVRKb2nwAjkQ7kNvwF2IQRZ%26_nc_oc%3DAdlsHr1AS6h7q0T_Y7MYWR2-8qye_UJQOLPAHCANe0PldQ92zqU-vdSOAtkNeKE2yLE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfyRgLruNSWBqtKQybfldc2yJtgd5WTTta7cPidYXEJZIA%26oe%3D69B2BFD0&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in MYR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645561328_1252552899574408_4682816397710621478_n.csv%3F_nc_cat%3D105%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3D8I4zdK-3QQQQ7kNvwF3KX0G%26_nc_oc%3DAdmIExs5hL-D6IgqEIMnKKTUdwDvmJUKr0SkOOxRz9E6AX8yaShlehb3PDiA-Q9VnxU%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_Afwh07H3i_dVHJQwS8lenoEF5vRrRHzTLVaUn0x5Dadkjw%26oe%3D69B2B176&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in PEN](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645415974_1257706746500556_6555973872850235081_n.csv%3F_nc_cat%3D111%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3DXgCQt_jOX6gQ7kNvwFPT7sv%26_nc_oc%3DAdnWCI1orZIIDF8e8HF5oIIr-51OtH45zv6NJ2FlPybzZEN6loKz7xdKEKZZuhQ-o54%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_Afy7hjS5bvCLtNCynHFUsCgsVUDOo4PExtDWi1e51r1Fyg%26oe%3D69B2BA8F&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in SAR](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645597627_2103613467128564_5892801595358674774_n.csv%3F_nc_cat%3D103%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dx71IE06QVdMQ7kNvwH3ofGj%26_nc_oc%3DAdkt2mRBoRfNHIUNTT_whUUITUrluHo04HdFKOm9Vnhwr_o_bp9ZFg06omzqDiZex9Q%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfygQi7kRVct03uAPzX3Bj7_5pAd_URqAERyxoUxVlTrNw%26oe%3D69B2A8F3&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)
  * [Rates in SGD](https://l.facebook.com/l.php?u=https%3A%2F%2Fscontent.fros8-1.fna.fbcdn.net%2Fv%2Ft39.8562-6%2F645583466_1561915005494738_6425912842154707142_n.csv%3F_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3Db8d81d%26_nc_ohc%3Dt0W0cz0_qxkQ7kNvwFRpjWt%26_nc_oc%3DAdmtrLZP_Dqpb7zRjrgwlpWgAyBtK50KyAoI731pzRJgH5ZQMEgQwKXgzUT5xKy3JGE%26_nc_zt%3D14%26_nc_ht%3Dscontent.fros8-1.fna%26_nc_gid%3DK_6wumbyqXBTBj1jsxvMug%26_nc_ss%3D8%26oh%3D00_AfzQSQ8NeJYnSaZTCU5Il7bbqPduqGp-grYX0fa4ZvIo7Q%26oe%3D69B2A43C&h=AT47s1PTYJfPC0WXFiyz4ZOMFxwCy7trXYuFzAEFXI7drGZp6Shv-EN8Kvs8T1aEnUVs7hX7yMtlSpI27oIVMvyNBgZbAo45DE2bRM9FAn_C5jPiqcA8aJ8hMD4UPle_NkXWv0OIrf-C6gYAr19ItQ)

## How calling changes the 24 hour customer service window

Currently, when a WhatsApp user messages you, a [24-hour timer called a customer service window](/documentation/business-messaging/whatsapp/messages/send-messages#customer-service-windows) begins, or refreshes.

When you are within the window, your business can send any type of message to the WhatsApp user, which is otherwise not allowed.

With the introduction of the Calling API, the customer service window now also starts or refreshes for calls:

  * When a WhatsApp user calls you, regardless of if you accept the call or not
  * When a WhatsApp user accepts your call.

## Get cost and call analytics

You can call the `GET /` endpoint with a `?fields=call_analytics` query parameter to obtain call analytics for your WhatsApp Business Account (WABA).

The endpoints can provide useful information like cost, counts of completed calls, and average call duration. Learn more about [call analytics](/documentation/business-messaging/whatsapp/analytics#call-analytics).

Did you find this page helpful?

ON THIS PAGE

Overview

Volume-based pricing (VBP) rate cards

Calling rates effective from April 1, 2026

How calling changes the 24 hour customer service window

Get cost and call analytics

* * *