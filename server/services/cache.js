const redis = require('redis');
const util = require('util');
const { cache } = require('config');

const client = redis.createClient({
  host: 'redis', // MACOS only??
});

client.get = util.promisify(client.get);
client.set = util.promisify(client.set);
client.del = util.promisify(client.del);

const setKey = (key, val) =>
  client.set(key, JSON.stringify(val), 'EX', cache.ttl);

const getKey = key => client.get(key);

const delKey = key => client.del(key);

module.exports = {
  setKey,
  getKey,
  delKey,
};

// client.set('key', 'val', (err, res) => {
//   console.log('----------', err, res);
//   client.get('key', console.log)
// });
