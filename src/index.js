const dns = require("node:dns");

function CrawlBotVerifier(opts = {}) {
  const { domains } = opts;
  this._domains = {
    google: [/((?:)\.){0,}(googlebot|google|googleusercontent)\.com$/gi],
    bing: [/((?:)\.){0,}msn\.com$/gi],
    baidu: [/((?:)\.){0,}baidu\.(com|jp)$/gi]
  };

  if (domains) {
    for (const [key, val] of Object.entries(domains)) {
      this._domains[key] = val;
    }
  }
}

CrawlBotVerifier.prototype.verify = function verify(ip, engines) {
  if (typeof engines === 'string') {
    engines = [engines]
  } else if (!Array.isArray(engines)) {
    throw new Error(`The 'engines' param must be a string or an array of strings.`)
  }
  engines.map(engine => {
    if (engine in this._domains) {
      return this._domains[engine]
    }
    return []
  })

  const domains = engines.reduce((domains, engine) => {
    if (engine in this._domains) {
      return [...domains, ...this._domains[engine]]
    }
    return domains;
  }, [])

  return new Promise((resolve, _) => {
    dns.reverse(ip, (err, data) => {
      if (!err) {
        if (data && Array.isArray(data) && data.length > 0) {
          const hostname = data[0]
          const domain = hostname.split('.').slice(-2).join(".");
          for (let i = 0; i < domains.length; i++) {
            const domainRegex = domains[i]
            if (domainRegex instanceof RegExp) {
              if (new RegExp(domainRegex.source).test(hostname)) {
                resolve(true);
              }
            } else {
              if (domainRegex === domain) {
                resolve(true);
              }
            }
          }

          resolve(false)
        } else {
          resolve(false)
        }
      }

      resolve(false)
    })
  })
}

module.exports = CrawlBotVerifier
