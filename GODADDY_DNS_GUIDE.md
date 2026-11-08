# COGNISRIN — GoDaddy Domain Configuration Guide for `cognisrin.in`

This guide explains how to connect your GoDaddy-registered domain **`cognisrin.in`** to **Cloudflare Pages** for **100% free hosting**, free edge SSL certificate, fast global CDN, and automated `www` redirection.

> [!IMPORTANT]
> **Do NOT purchase hosting on GoDaddy!**
> Cloudflare Pages provides enterprise-grade, unlimited-bandwidth hosting completely free. You only need your existing GoDaddy domain registration.

---

## METHOD A: Cloudflare Nameservers (Recommended Best Practice)
Using Cloudflare's free DNS management provides automatic apex CNAME flattening, free TLS/SSL certificates, HTTP/3, and DDoS protection.

### Step 1: Add Domain to Cloudflare
1. In your Cloudflare dashboard ([dash.cloudflare.com](https://dash.cloudflare.com)), click **Add a Domain**.
2. Enter: `cognisrin.in`
3. Select the **Free Plan** ($0 / month).
4. Cloudflare will scan your existing DNS records and present two Cloudflare Nameservers (e.g., `aria.ns.cloudflare.com` and `dave.ns.cloudflare.com`).

### Step 2: Update Nameservers on GoDaddy
1. Log into your [GoDaddy Account](https://account.godaddy.com/).
2. Go to **My Products** > Under **Domains**, find `cognisrin.in` > Click **DNS** (or **Manage DNS**).
3. Scroll down to the **Nameservers** section.
4. Click **Change Nameservers**.
5. Select **I'll use my own nameservers** (Advanced).
6. Enter the two Cloudflare nameservers provided in Step 1.
7. Click **Save** and confirm the authorization prompt.

### Step 3: Link Custom Domain in Cloudflare Pages
1. In Cloudflare dashboard, go to **Workers & Pages** > Select your `cognisrin` project.
2. Select the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter: `cognisrin.in` and click **Continue**.
5. Click **Activate domain**.
6. Repeat for `www.cognisrin.in` so visitors typing either address arrive smoothly.

---

## METHOD B: Keeping GoDaddy Nameservers (Standard DNS CNAME Setup)
If you prefer to keep GoDaddy's default nameservers, configure DNS records directly in GoDaddy:

1. Log into your GoDaddy DNS Management for `cognisrin.in`.
2. Delete any default GoDaddy parking or forwarding records.
3. Add the following records:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `<your-project>.pages.dev` | 1 Hour / Automatic |
| **CNAME** | `@` (or Root Forwarding) | `<your-project>.pages.dev` | 1 Hour / Automatic |

> [!NOTE]
> Some GoDaddy configurations do not support root `@` CNAME records directly. In that scenario, in GoDaddy DNS settings, scroll down to **Forwarding** > Under **Domain**, click **Add Forwarding** > Forward `http://cognisrin.in` to `https://www.cognisrin.in` with **301 (Permanent) Redirect** and **Forward with masking OFF**.

---

## 4. Verification and SSL/HTTPS
1. DNS propagation typically takes between 15 minutes and 2 hours (up to 24 hours globally).
2. Cloudflare will automatically issue and renew a free Universal SSL/TLS certificate.
3. Under Cloudflare **SSL/TLS** > **Overview**, set encryption mode to **Full (strict)**.
4. Under **Edge Certificates**, toggle on **Always Use HTTPS** and **Automatic HTTPS Rewrites**.
5. Test by visiting:
   - `https://cognisrin.in`
   - `https://www.cognisrin.in`
   - `https://cognisrin.in/founder/nikhilendra-srinivas`

All addresses will resolve securely with a green padlock.
