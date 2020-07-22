# Purge Function
Use the Cosmic Purge Function to purge cached content on webpages using Cosmic Webhooks.

### Getting Started
You can run this Function locally for development:
```
git clone https://github.com/cosmicjs/purge-function
cd purge-function
npm install
npm run develop
```

### How it works
After deploying this function and triggering a POST request using a [Cosmic Webhook](https://docs.cosmicjs.com/webhooks/) the `/purge` route uses the `handler` in `index.js`. The following is what happens:
1. The base path is set using an environment valriable.
2. The Object `type_slug` is used to determine the next path to follow (so you can have multiple Object types using this).
3. A query string is added to the URL if supplied via the environment valriable.
4. A `purge` request is sent to your website, in this case, for the Cosmic website it is Fastly. See [the Fastly docs](https://developer.fastly.com/reference/api/purging/) on how this is done.
```javascript
module.exports.handler = async (event, context, callback) => {
  const axios = require('axios');
  const body = JSON.parse(event.body);
  let type = '';
  // CONFIG
  if (body.data.type_slug === 'articles')
    type = 'blog';
  // Send a PURGE request
  const url = process.env.BASE_PATH + '/' + type + '/' + body.data.slug + process.env.QUERY_STRING;
  const purge_res = await axios({
    method: 'purge',
    url: url
  });
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    body: purge_res.data
  };
  callback(null, response);
}
```

### Installation
1. [Login to Cosmic JS](https://cosmicjs.com) and go to Your Bucket > Settings > Functions
2. Add the link to this repo: `https://github.com/cosmicjs/purge-function` and click "Install Function"

#### function.json file properties
Key | Type | Description
--- | --- | ---
| title     | String | Function title
| description      | String | Function description (HTML allowed)
| image_url      | String | Image thumbnail
| repo_url      | String | Function git repo url
| env_vars      | Array | key / value for environment variables
| routes      | Array | Function routes: properties include path (string), method (string) and cors (bool)

Example `function.json` file:
```json
{
  "title": "Cache Purge",
  "description": "A function that purges a website cache. Currently works for Fastly.",
  "image_url": "https://cdn.cosmicjs.com/3cf62ab0-8e13-11ea-9b8f-cd0254a8c979-cosmic-dark.svg",
  "repo_url": "https://github.com/cosmicjs/purge-function",
  "env_vars": [
    {
      "key": "BASE_PATH",
      "value": ""
    },
    {
      "key": "QUERY_STRING",
      "value": ""
    }
  ],
  "routes": [
    {
      "path": "hello-world",
      "method": "get",
      "cors": true
    },
    {
      "path": "purge",
      "method": "post",
      "cors": true
    }
  ]
}
```
