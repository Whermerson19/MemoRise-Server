import express from 'express'

const app = express();

app.listen(3333, () => console.log("Memorise server is Running"));

export default app;