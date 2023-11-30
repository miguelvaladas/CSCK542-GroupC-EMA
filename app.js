import express, { json } from 'express';
import router from './routes.js';

//initialize express server
const app = express();
app.use(json());

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.use('/', router);

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
