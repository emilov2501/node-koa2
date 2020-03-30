const { initApp } = require('./src/app')
const db = require('./src/db');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;

function mountApp() {
  // Connection DB
  const { app } = initApp();
  db.connect(process.env.DB_PATH, (err) => {
    if (err) return console.log('MongoDB is not connect...');
    app.listen(PORT, () => console.log(`Listening http://${HOST}:${PORT}`));
  });
}

mountApp();