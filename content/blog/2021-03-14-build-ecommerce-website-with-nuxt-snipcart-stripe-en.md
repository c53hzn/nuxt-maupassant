---
date: 2021-03-14
slug: build-ecommerce-website-with-nuxt-snipcart-stripe-en
language: English
title: Build an E-Commerce website with Nuxt, Snipcart and Stripe
description: You don't have a backend a and database, but still want to build a webstore? No problem! You can use Nuxt to build static website, Nuxt content to manage content and stock, Snipcart to manage orders and checkout functions, PayPal and Stripe to manage your funds.
categories: [Tech]
tags: [E-Commerce,Nuxt.js,Nuxt Content,snipcart,stripe]
keywords: [static website,webstore]
comments: true
---

## Preface

This is a translation of my original article [用nuxt、snipcart和stripe建立一个电商网站](/blog/build-ecommerce-website-with-nuxt-snipcart-stripe).

A while ago I wanted to start selling downloadable digital products, so I opened an [Etsy](https://www.etsy.com/hk-en/shop/JoyfulTemplateDesign) store that can host and sell digital products. I have created 8 listings, selling calendar templates, schedule planner templates and HTML webpage templates, etc, all designed by myself. But it seems hard to get any sale.

According to the stats provided by Etsy, everyday I get traffic from the platform (<3) even less than my own website (<10). I have tried discount sales and paid ads on Etsy, but still don't get much traffic, and still 0 sale. Then maybe I could put products on my own website and hope to get more viewers.

## Product page display

At first I only intended to put my products on my website for display purpose, to gain more online traffic for these products, then redirect purchase button back to Etsy. In this way, I only have to design product pages, and I don't have to worry about any APIs.

I started to use `Nuxt content` as CMS a few months back. It has great feature that allows reading content directly from a csv file, and I can use it to read product data and render to website.

First I need to download product data from Etsy, here is how the downloaded csv looks like

![001](/img/blog/2021-03-13/001.jpg)

This data structure is pretty great, the pictures are hosted on Etsy and picture URLs are accessible outside the platform, I can put this csv in `content/` folder and start using it immediately.

The next step is to create product catalogue page and product detail page.

You can use `async asyncData(){}` 、 `await` 、 `fetch` to load data.

```js
async asyncData(context) {
  var data = await context.$content('product/etsy.csv').fetch();
  var product_list = data.body;
  return {product_list}
}
  
```
Then render data in `/store/index.vue` and `/store/_sku.vue`.

After this, I thought, now that I have the product pages, why not add order and payment functions as well?

## Payment tool

### PayPal

For receiving online payments, `PayPal` is the most widely and globally used tool. There are two ways to integrate PayPal as a payment gateway.

#### PayPal Payments Pro

You will need to generate an APP KEY for integration, the benefit is that the page will stay at your website when checking out, but you will have to upgrade to a business account, and it will cost you extra monthly fees.

#### PayPal Express Checkout

You don't need an APP KEY for this integration, specifying your PayPal account email is good enough. Also it is available for individual accounts and comes with no extra monthly fees. 

Both ways require authentication on PayPal backend in advance, or your website will display error `422 Unprocessable entity`.

### Stripe

For receiving credit card payment, you might want to consider this third party payment tool: [stripe](https://stripe.com/).

So I registered an account, verified my email, added company info(just select individual), added bank account, then go to `Developer` section in menu on the left to generate an `API key`, we will be using it shortly after.

Stripe also supports Alipay and WeChat pay, but I don't want to go through their business account verification process, so just leave it be.

## Checkout(shopping cart) tool

### Why snipcart

With `stripe` and `PayPal` ready, we still need shopping cart, checkout and payment functions. I want my website to generate orders dynamically according to the product information on product pages. 

According to Stripe and PayPal's documents and some online demos I found, they cannot be achieved on static websites, then maybe we can work around it with `snipcart` , and use `stripe` and `PayPal` as payment gateway in `snipcart`.

Here you might want to take a look at the fees.

`stripe` is charging `3.4% + HK$2.35` per transaction, without monthly subscription fees. While `snipcart` is charging `2% + payment gateway fee` for each transaction, minimum 10 USD for each month.

Meanwhile `Etsy` is charging `5%` per order. So if I create a webstore using `Snipcart` and `stripe`, it will cost more than simply listing items on Etsy. If I want to keep my website static, there is no other choice.

But we can compare this combination with eBay and PayPal, one for managing orders, one for managing funds, and both cost fees. And if we compare the fees, `snipcart + stripe` is much cheaper than `eBay(minimum 10%) + PayPal(2.9%)`.

As for the combination of `Snipcart + PayPal`, it seems most benefitable for me, then I hope all buyers will choose PayPal as payment method.

And there are other advantages about Snipcart.

I learned about `snipcart` some time earlier that it can add shopping cart function to static websites or SPA websites. Even the seller does not own a backend, he/she can still manage online selling business. And this time I found that `snipcart` can do not only checkout, but also hosting digital products and generating downloading links that will be sent to buyers automatically once a payment is made. This suits me perfectly.

### Integrate with Snipcart

Register a [snipcart](https://snipcart.com) account, then follow the steps indicated on dashboard, fill in business information, you can choose individual in company type, then set up domains, now you can install `snipcart` codes in your website.

Click on the head button on top right, find `API KEYS` under `ACCOUNT`, choose `TEST` mode and get your `API KEY`. When your local test all pass, you can change to `LIVE KEY` and let your store go online.

I added the shopping cart function in `/store/_sku.vue` .

First add `link` in `head` section.

```js
link: [
  {rel: 'preconnect', href: 'https://app.snipcart.com'},
  {rel: 'preconnect', href: 'https://cdn.snipcart.com'},
  {rel: 'stylesheet', href: 'https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css'}
]
```

Then add `Add to cart` button in `html`

```html
<button class="snipcart-add-item"
  :data-item-id="sku"
  :data-item-file-guid="file_guid"
  :data-item-price="price"
  :data-item-url="'/store/'+sku"
  :data-item-description="title"
  :data-item-image="photos[0]"
  :data-item-name="title">
  Add to cart
</button>
```

Append this to `html` 

```html
<script async src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"></script>
<div id="snipcart" data-config-modal-style="side" data-api-key="TESTING_API_KEY" hidden></div>
```

Now you are ready for local tests.

## Testing in local environment

First I started building in `localhost:3000` , go to product page, add to cart, the cart page jumps out as expected, but when I tried to confirm payment, there is an error saying that the information in cart does not match what snipcart crawled from my website.

After researching for a while, I found out that snipcart does not allow you to generate orders in local enveironment, not even test orders.

But it seems odd if I deploy my website each time I change a line of codes. Is there a way that I can work this around?

Then a solution came out from the search results, a proxy domain.

[https://tunnel.staqlab.com](https://tunnel.staqlab.com) offers a proxy domain service that can forward your local website.

Go to their website, download the software, unzip, double click to run software, then there popped up a terminal and disappeared in a flash.

I thought I did something wrong, so I went back to their website and found that the software does not provide an interface, you will have to use command line after installation.

So I went back to the directory where I unzipped the file package, open `cmd` in this directory, input `staqlab-tunnel 3000` in terminal. The `3000` here stands for the port that I'm using, if you are using another port, just change it.

Then the terminal generated a subdomain for me: `https://xxxxxxx.staqlab-tunnel.com` . We can use this to access the website originally served on `localhost:3000`.

Now add this domain to `snipcart`'s domain whitelist and start testing.

Go to this address, the website will warn you first that this website is not save unless you are the developer of it, but I am the developer, so just click continue.

Add my item to shopping cart, click checkout, input buyer information, input testing credit cart info, confirm payment, then I almost immediately received emails for order and downloading links.

It's time to wrap up the tests and prepare for going online.

## Function going online

### Set up Stripe and PayPal in Snipcart

Go find the API KEY mentioned in [Payment tool](#Payment-tool) section, go back to snipcart and click the head button on top right, find `PAYMENT GATEWAY` under `STORE CONFIGURATIONS` , click `connect` button on the right of `stripe` input your API KEY and save.

According to snipcart's requirements, you can only have one active payment gateway in LIVE mode, so if you want to use PayPal Payments Pro, then you will have to say goodbye to Stripe.

But if you want to use PayPal Express Checkout, then it can be added as an extra payment gateway along with Stripe.

Let's scroll down to the bottom of `PAYMENT GATEWAY` page, add your PayPal Express Checkout account to it.

Also don't forget to authorize Snipcart in your PayPal backend, or your website will display error `422 Unprocessable entity`, you can refer to [this tutorial](https://docs.snipcart.com/v3/dashboard/paypal-configuration#granting-permissions-to-your-paypal-account-to-snipcart).

### Generate LIVE KEY in Snipcart

In order to generate a `LIVE KEY`, you need to set up a credit cart for paying snipcart fees. So I added a credit cart and went back to API page, but it still asked me to add a credit cart, which is weird. I have tried adding credit cart several times but it still asked me to add one. Then somehow it hit me that maybe refreshing the page can do a little good. Then I went back to API page and generated a `LIVE KEY` successfully.

### Other important settings in Snipcart

When developing under TEST mode, I have set up `REGIONAL SETTINGS` and `DOMAINS & URLS` on Snipcart, but when switching to LIVE mode, I have to set up once more.

Go to `REGIONAL SETTINGS` in the right menu under LIVE mode, select countries that you would like to sell to, or buyers from the whole world cannot place order except default countries like US and Canada.

Then go to `DOMAINS & URLS`, add your website domains and subdomains, then we are done here.

### Use Snipcart's LIVE KEY in Nuxt

Go back to `/store/_sku.vue` and modify the end of `html`

```html
<div id="snipcart" data-config-modal-style="side" data-api-key="LIVE_APP_API_KEY" hidden></div>
```

Save, git add, git commit, git push and wait for CI to deploy the website, done.

## Conclusion

Although I have set up my stores, one on Etsy and one on my own website, if orders don't come, then I'll be only paying the fees.

Well, still learned a lot during the process. Need to fight harder for the year 2021 now!