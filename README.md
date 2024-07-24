# Crawl Bot Verifier

Verify any crawl bot including Google, Bing, and Baidu.The most common way of verifying a craw bot is by checking the User-Agent string on every request, but User-Agent strings can be spoofed and to circumvent this, we can do a reverse DNS lookup to verify each request and that's what this library does.

This library verifies a crawl bot by making a reverse DNS lookup and try to match the result with the domains provided. It supports Google, Bing, and Baidu out of the box.

## Supports by Default

- Google
- Bing
- Baidu

## You can make it support as many as you'd like

Simply provide the domains. For example, when we do reverse dns on Bing bot IP:

```
IP: 13.66.144.0
Domain: msnbot-13-66-139-0.search.msn.com
```

Take out the first subdomain, in this case `msnbot-13-66-139-0.search` and we'll be left with `msn.com`, now provide this as the domain input.

You can also provide a regex instead of a domain string. For example,

```js
const CrawlBotVerifier = require("crawl-bot-verifier");
const crawlBotVerifier = new CrawlBotVerifier({
  domains: { bing: [/(?:).msn.com$/gi] },
});
```

Note that the provided domains will override the default domains. If you provide domains for bing, then that will only override the default domains for bing.

```js
const CrawlBotVerifier = require("crawl-bot-verifier");
const crawlBotVerifier = new CrawlBotVerifier({
  domains: { bing: ["msn.com"] },
});
```

## Usage

```js
const CrawlBotVerifier = require("crawl-bot-verifier");
const crawlBotVerifier = new CrawlBotVerifier({
  domains: { bing: ["msn.com"] },
});

const IP = "";
const searchEngines = ["google", "bing"];

// verify method takes two arguments, the I.P address
// and the search engines to match against.
crawlBotVerifier.verify(IP, searchEngines).then((isMatch) => {
  if (isMatch) {
    // Do something
  } else {
    // Do something else
  }
});
```

## Supporting other bots

To support other bots simply, pass the domains for the new bot.

```js
const CrawlBotVerifier = require("crawl-bot-verifier");

const otherDomains = ["some-domain.com"];

const crawlBotVerifier = new CrawlBotVerifier({
  domains: { bing: ["msn.com"], other: otherDomains },
});
```

## For referenece:

### Google bots IPs list

https://developers.google.com/static/search/apis/ipranges/googlebot.json

### Bing bots IPs list

https://www.bing.com/toolbox/bingbot.json

## TODO

- Verify by IP ranges
