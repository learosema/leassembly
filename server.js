const PORT = 1337;
const HOST = 'localhost';

const express = require('express');

const app = express();
app.use(express.static('.'));
app.listen(PORT, HOST, () => console.log(`Server listening at http://${HOST}:${PORT}/`));