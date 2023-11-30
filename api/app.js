const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');


const app = express()
const port = 8081;

app.use(bodyParser.json());
app.use('/api', router)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
