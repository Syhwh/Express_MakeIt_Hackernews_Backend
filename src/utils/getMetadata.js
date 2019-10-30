const metascraper = require('../../node_modules/metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(), 
  require('metascraper-publisher')(),
  require('metascraper-title')(), 
])

const got = require('got')

const getMetadata = async (targetUrl) => {
  const { body: html, url } = await got(targetUrl)
  const metadata = await metascraper({ html, url })
  return (metadata)
}
module.exports = getMetadata;