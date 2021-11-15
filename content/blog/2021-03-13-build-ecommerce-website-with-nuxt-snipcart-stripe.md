---
date: 2021-03-13
slug: build-ecommerce-website-with-nuxt-snipcart-stripe
language: 中文
title: 用nuxt、snipcart和stripe建立一个电商网站
description: 没有后台和数据库，静态网站也想做网店？完全没有问题。生成网站用nuxt，内容及产品管理用nuxt content，订单管理和结算功能用snipcart，收款用PayPal和stripe。从注册snipcart到功能上线，总共5小时搞定。
categories: [技术]
tags: [电商,网店,Nuxt.js,Nuxt Content,snipcart,stripe]
keywords: [E-Commerce,独立站,webstore]
comments: true
---

## 前言

之前因为想卖供人下载的虚拟产品，于是就到可以托管和销售虚拟产品的 [Etsy](https://www.etsy.com/hk-en/shop/JoyfulTemplateDesign) 开了账号，上传了 8 个自己设计的日历、日程表模板和 HTML 网页模板，但是总也卖不出去。

根据平台资料显示，我的平台产品每日流量（<3) 还不如我自己的网站每天的流量（<10) 多呢。但是降价促销也做了，付费平台广告也买了，流量还是上不去，并且也还是没人买。那我不如把产品放到自己网站上，也许看的人还多一些。

## 产品页展示

一开始我只是想把产品在自己网站上做个展示，占个网络流量，然后把购买按钮导流回 Etsy ，这样我就还是只需要做网页，不用费劲去搞 API。

这部分是前两个月断断续续完成的，不在文章概要里说的 5 个小时内。

由于转用了 `Nuxt content` 作为内容管理模块，我可以直接用 `content` 读取 csv 的功能来加载产品数据到网站上。

首先从 Etsy 下载我的产品数据，下载下来的 csv 是这样子的。

![001](/img/blog/2021-03-13/001.jpg)

这个数据结构挺好的，图片托管在 Etsy 上，连图片链接都有了，放到 `content/` 文件夹里就能直接用。

然后就是在网站的产品目录页和产品详情页加载产品信息。

使用 `async asyncData(){}` 、 `await` 、 `fetch`方法来加载数据

```js
async asyncData(context) {
	var data = await context.$content('product/etsy.csv').fetch();
	var product_list = data.body;
	return {product_list}
}
	
```
然后渲染到 `/store/index.vue` 和 `/store/_sku.vue` 上就行啦。

后来我就想，既然产品页面都有了，我何不把生成订单和收款功能也加上去呢？

## 收款工具

### PayPal

线上收款的话，国际上用的最广的是 `PayPal` ，如果想要在自己网站使用 PayPal 收款的话，有两种方式：

#### PayPal Payments Pro

配置这个需要生成开发者 APP KEY，好处是付款过程中页面不用跳转到 PayPal，但是需要商业账号才能用，且每个月要额外交月费。

#### PayPal Express Checkout

配置这个不需要开发者 APP KEY，只需要填写 PayPal 账号 email 就行，个人账号就能用，还不需要额外交月费。

两种方式都需要在 PayPal 后台给你的网站添加授权，否则前端会报错 `422 Unprocessable entity` 。

### Stripe

如果想允许买家使用信用卡付款的话，你还需要一些其他的第三方工具，比如 [stripe](https://stripe.com/) 。

注册账号之后，验证邮箱，添加公司详情（经营性质选个人也行），填写收款银行账号，然后在菜单的 `开发者` 那里获取 `API 秘钥` ，这个后面会用到。

Stripe 里面可以集成支付宝和微信收款，但是得要商业账号，我不想弄这些认证，于是作罢。

## 结算工具

### 为什么选snipcart

有 `PayPal` 和 `stripe` 之后，还需要有加到购物车、结算、付款的功能，我希望网站能根据产品页面信息动态生成订单。

根据 PayPal 和 Stripe 提供的文档和网上搜到的资料来看，这好像无法在静态网站上实现。那我们可以再绕一下，用 `snipcart` 来做这些，然后把 `PayPal` 和 `stripe` 作为 `snipcart` 的收款工具来用。

这里要注意的是， `stripe` 每笔交易收 `3.4% + HK$2.35` 的费用，没有月费，而 `snipcart` 每笔交易收 `2% + 付款渠道费` ，每月最低收费 10 美元，这样会被收两道钱。而 Etsy 的收费是每笔 `5%` ，如果自建网店就会比 Etsy 收费贵了。但是没办法，如果要保持现在的静态网站，就只能这样做。

换个角度来看，就是相当于 eBay 和 PayPal 的关系，一个处理订单，一个处理收款，并且两个都要收费。但是从费用上来看， `snipcart + stripe` 比 `eBay(最低10%) + PayPal(2.9%)` 要实惠多了。

而如果是 `snipcart + PayPal` 的话，好像是最划算的结果，希望买家都选 PayPal 吧。

再说说 Snipcart 的其他优势吧。

之前我知道 `snipcart` 可以在静态网站或是单页面网站上添加结算功能，这样即使卖家没有自己的网站后台，也可以做到线上售卖的生意。这次研究了下，发现它不止可以做结算，还可以在他们的后台上传虚拟产品，并生成下载链接，当有买家成功付款之后就会发送下载链接给买家，简直太适合我了。

### 集成snipcart

注册 [snipcart](https://snipcart.com) 账号，然后按照首页提示的步骤，先填写商业信息，经营性质可以选个人，然后配置域名，接下来就可以集成代码了。

在页面右上角点击人头按钮，弹出主菜单，找到 `ACCOUNT` 下面的 `API KEYS` ，先用 `TEST` 模式下的 `API KEY` ，等测试没问题了，换成 `LIVE KEY` 就能上线了。

相关功能加到了 `/store/_sku.vue` 这个模板里。

首先在 `head` 部分添加 `link`

```js
link: [
	{rel: 'preconnect', href: 'https://app.snipcart.com'},
	{rel: 'preconnect', href: 'https://cdn.snipcart.com'},
	{rel: 'stylesheet', href: 'https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css'}
]
```

然后在 `html` 的部分添加 `Add to cart` 按钮

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

在 `html` 部分的末尾加上

```html
<script async src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"></script>
<div id="snipcart" data-config-modal-style="side" data-api-key="TESTING_API_KEY" hidden></div>
```

现在可以开始测试了。

## 本地测试

我先在本机 `localhost:3000` 的环境下测试，加到购物车之后很顺利地弹出了结算按钮，可是输入了收件信息和付款信息之后，页面报错说 snipcart 爬取的信息和当前结算的信息不符。

我一头雾水地搜了半天，才发现原来 snipcart 的安全机制不允许开发人员在 `localhost` 环境下生成订单，连测试订单都不行。

但是我总不能每改一处代码就部署一次网站吧？有没有什么别的办法可以绕过去呢？

然后就搜到了一个解决办法，用代理。

[https://tunnel.staqlab.com](https://tunnel.staqlab.com) 提供了一个代理域名的服务，可以转发本地的请求。

打开网站，下载软件，解压缩，双击执行，电脑上闪过一个终端，然后又消失了。

我以为自己安装错了，又回到官网查看，才发现软件并不提供 UI，而是安装后使用命令行控制。

于是回到刚才解压缩的目录下，在此目录打开 `cmd` ，输入命令 `staqlab-tunnel 3000`，这里的 `3000` 是我用的端口，如果你用了别的端口，就改成别的。

然后终端就会生成一个看起来像乱码的子域名: `https://xxxxxxx.staqlab-tunnel.com` 。我们可以用它访问原来本机的 `localhost:3000` 的服务。

我们可以把这个域名加到 `snipcart` 的允许使用的域名清单里，然后就可以测试购买了。

进入这个网址，网站会先提醒访客此网站不安全，除非你是该网站的开发人员，不然不要点击进去，但我们是开发人员，点进去就可以了。

然后测试加到购物车，点击结算，输入买家信息，输入测试用的信用卡号码，付款，立刻就收到购买成功的邮件和包含下载链接的邮件了。

接下来就是结束测试，准备上线。

## 功能上线

### 在snipcart配置stripe和PayPal

找到前面 [收款工具](#收款工具) 里面说的 Stripe 的 API KEY ，回到 snipcart ，在页面右上角点击人头按钮，弹出主菜单，找到 `STORE CONFIGURATIONS` 下面的 `PAYMENT GATEWAY` ，在 `stripe` 那里点击 `connect` ，把刚才从 stripe 那里获取到的 API KEY 填进去，保存即可。

根据 Snipcart 的要求，你只可以有一个主要收款方式，如果想用 PayPal Payments Pro 的话，就不能用 Stripe 了。但是如果想额外添加 PayPal Express Checkout 收款则不受此限制。

所以我们可以在 `PAYMENT GATEWAY` 页面下拉至底部，添加一个 PayPal Express Checkout 的账号进去。

另外，别忘了在 PayPal 授权给 Snipcart，否则会报错 `422 Unprocessable entity`。授权步骤看 [这里](https://docs.snipcart.com/v3/dashboard/paypal-configuration#granting-permissions-to-your-paypal-account-to-snipcart).

### 在snipcart生成上线用的LIVE KEY

想要使用 `LIVE KEY` 的话，就要在 snipcart 添加缴付费用的信用卡，添加成功之后回到 API 页面，它还是叫我添加信用卡，这里不知道是触发了什么机制，添加了好几次，回来这个页面还是让我添加。后来不知怎的福至心灵，F5 刷新了一下页面，再回到 API KEY 那里，就可以生成 `LIVE KEY` 了。

### Snipcart的其他配置

原本在 Test 模式的时候，我已经设置过允许购买的买家国家/地区了，可是转成 LIVE 模式之后还需要重新设置一次。

从右边的菜单找到 `REGIONAL SETTINGS` ，然后勾选你想售卖的国家/地区，否则除了默认的美国和加拿大之外，所有地方的买家都无法下单。

然后在右边的菜单找到 `DOMAINS & URLS`，把你的网站域名加进去，这样 Snipcart 才能在你的网站上使用。

### 在Nuxt配置snipcart的LIVE KEY

我们回到 `/store/_sku.vue` 这里，修改 `html` 的末尾部分

```html
<div id="snipcart" data-config-modal-style="side" data-api-key="LIVE_APP_API_KEY" hidden></div>
```

save，git add，git commit，git push，等待 CI 自动部署，就完成了。

## 总结

虽然说终于算是有了自己的所谓“网店”，但是不管是 Etsy 还是 我的独立站，两边都一直不出单的话，还不如我发微博，一天能赚 0.1 人民币呢。

总而言之算是又学到了一些东西吧，2021 年，要加倍努力啊！