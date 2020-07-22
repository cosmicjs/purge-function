# Purge Function
Use the Cosmic Purge Function for purching cached content on webpages using Cosmic Webhooks.

### Getting Started
You can run this Function locally for development:
```
git clone https://github.com/cosmicjs/purge-function
cd purge-function
npm install
npm run develop
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
