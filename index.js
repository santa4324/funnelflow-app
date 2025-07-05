const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Studio App!', status: 'running' });
});

app.listen(PORT, () => {
  console.log(`Studio app listening on port ${PORT}`);
});
