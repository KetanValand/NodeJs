const app = require('./app');

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
    console.log(`Example app listening on port ${SERVER_PORT}`);
});