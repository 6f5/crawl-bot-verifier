const CrawlBotVerifier = require("../index.js");
const { expect } = require("chai")

const GOOGLE_IPS = ['192.178.6.0', '96.182.100.34', '34.101.50.144']
const BING_IPS = ['13.66.144.0', '13.66.139.0', '40.77.167.0']
const BAIDU_IPS = ['119.63.195.254', '123.125.66.120']
describe("#verify", () => {
  const botVerifier = new CrawlBotVerifier({ domains: { baidu: [/(?:)\.baidu\.(com|jp)$/gi] } })

  it("should verify Google bot", async () => {
    const result = await Promise.all(GOOGLE_IPS.map(ip => botVerifier.verify(ip, ['google'])));
    expect(result).to.have.all.members([true, false, true])
  })

  it("should verify Bing bot", async () => {
    const result = await Promise.all(BING_IPS.map(ip => botVerifier.verify(ip, ['bing'])))
    expect(result).to.have.all.members([true, true, true])
  })

  it("should verify Baidu bot", async () => {
    const result = await Promise.all(BAIDU_IPS.map(ip => botVerifier.verify(ip, ['baidu'])))
    expect(result).to.have.all.members([true, true])
  })
})
