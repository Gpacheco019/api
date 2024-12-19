const { Client } = require('pg');

const createClient = () => {
  return new Client({
    host: 'db',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'mycontacts',
  });
};

const connectWithRetry = () => {
  const client = createClient();
  client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => {
      console.error('Connection error', err.stack);
      setTimeout(connectWithRetry, 5000); // Tentar novamente após 5 segundos
    });
};


connectWithRetry();

exports.query = async (query, values) => {
  const client = createClient();
  await client.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error('Query error', err.stack);
    throw err;
  } finally {
    await client.end();
  }
};
