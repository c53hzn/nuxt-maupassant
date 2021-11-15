---
date: 2020-05-01
slug: enable-spellcheck-on-chrome-en
language: English
title: How to enable spell check on Chrome
description: My Chrome used to check spelling for me when typing, but recently the spellcheck isn't working normally. I thought it was something related to coding, but it turns out to be just a browser setting thing.
categories: [Tech]
tags: [Chrome,HTML,spellcheck]
comments: true
---

## Annoying typos driving me mad

I have been writing blog articles with both Chinese and English versions since April, and I can always find a lot of typos after posting the English version.

Also I've been using this `CMS` that I built on my own, the editor just wouldn't show any spelling mistakes for me.

But the browser used to check spellings, when has it stopped?

I started searching some programming ways to solve it, but they won't work, then I tried searching only Chrome-related keywords, and found the solution.

This [reddit discussion](https://www.reddit.com/r/chrome/comments/6ztplx/cant_enable_spell_check_in_chrome/) is the key solution that I found.

## Can it be solved with codes?

Yes, and no.

If spellcheck is enabled on Chrome, you can control whether to allow this feature by setting `spellcheck="true"` or `spellcheck="false"` for specific elements on your website or web apps.

And unlike other `true/false` attributes, if you want it enabled, you have to address it explicitly with `spellcheck="true"` , like this `<input type="text" spellcheck="true"/>`, rather than just write down the attribute name, like `<input type="text" spellcheck/>`. You can find some explanations [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck).

But if it is disabled on Chrome, the codes are just useless, you will not be able to turn it on by force. 

By *disabled*, I don't mean that you might really have clicked a button called `disable spellcheck`, it's possible that you just haven't *enabled* the right setting. Believe me, I've been there too.

I'm a Chinese speaker, but I can also read Japanese and some Korean, so I added Japanese and Korean to browser language setting to stop Chrome translating Japanese and Korean pages. And I might have changed something that I shouldn't change at that time.

## Let's set it right on Chrome

Go to `three dots > Settings > Advanced > Languages > Spell Check`

If you only see a language `English` but without specific country name in parenthesis next to it, like `English(United Kingdom)` or `English(United States)`, then you will see this message:
 
> checkSpell check isn’t supported for the languages you selected.

So please add those languages with country names in parenthesis and enable spellcheck for these languages, then your wavy red underline will be back and working.

**Shortcut**

Go to any input box or textarea box, type anything, right click on any word, then go to `Spell check > Language settings`.  