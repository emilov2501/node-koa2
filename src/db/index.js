const mongoose = require('mongoose');

async function connection (path, fn) {
  try {
    const connect = await mongoose.connect(path, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    fn()
  } catch (ex) {
    fn(ex)
  }
};

module.exports = connection;
