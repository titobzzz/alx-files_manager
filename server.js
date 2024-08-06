import express from 'express';

const port = parseInt(process.env.PORT, 10) || 5000;
const app = express();

app.use(express.json());
app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
