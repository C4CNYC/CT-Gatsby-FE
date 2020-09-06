const path = require('path');
const fs = require('fs');

if (process.env.CODE4CHANGE_NODE_ENV !== 'production') {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    throw Error('.env not found, please copy sample.env to .env.');
  }
  require('dotenv').config({ path: envPath });
}

const {
  HOME_LOCATION: home,
  CCT_API_LOCATION: cctApiLocation,
  CCT_API_TOKEN: cctApiToken,
  CANVAS_API_LOCATION: canvasApi,
  CANVAS_API_TOKEN: canvasApiToken,
  FORUM_LOCATION: forum,
  NEWS_LOCATION: news,
  FORUM_PROXY: forumProxy,
  NEWS_PROXY: newsProxy,
  LOCALE: locale,
  STRIPE_PUBLIC_KEY: stripePublicKey,
  SERVICEBOT_ID: servicebotId,
  ALGOLIA_APP_ID: algoliaAppId,
  ALGOLIA_API_KEY: algoliaAPIKey
} = process.env;

const locations = {
  homeLocation: home,
  cctApiLocation: cctApiLocation,
  cctApiToken: cctApiToken,
  canvasApiLocation: canvasApi,
  forumLocation: forum,
  newsLocation: news,
  forumProxy: forumProxy,
  newsProxy: newsProxy
};

module.exports = Object.assign(locations, {
  canvasApiToken,
  locale,
  stripePublicKey:
    !stripePublicKey || stripePublicKey === 'pk_from_stripe_dashboard'
      ? null
      : stripePublicKey,
  servicebotId:
    !servicebotId || servicebotId === 'servicebot_id_from_servicebot_dashboard'
      ? null
      : servicebotId,
  algoliaAppId:
    !algoliaAppId || algoliaAppId === 'Algolia app id from dashboard'
      ? null
      : algoliaAppId,
  algoliaAPIKey:
    !algoliaAPIKey || algoliaAPIKey === 'Algolia api key from dashboard'
      ? null
      : algoliaAPIKey
});
