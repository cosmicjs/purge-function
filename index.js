module.exports.handler = async (event, context, callback) => {
  const axios = require('axios');
  const body = JSON.parse(event.body);
  let type = '';
  // CONFIG
  if (body.data.type_slug === 'articles')
    type = 'blog';
  if (body.data.type_slug === 'changelogs')
    type = 'changelog';
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
