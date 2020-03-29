import mongoose  from 'mongoose';

const states = {
  db: null
}

async function connection (path, fn) {

  if (states.db) {
    return fn();
  }

  try {
    const connect = await mongoose.connect(path, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
    states.db = connect
    fn();
    
  } catch (ex) {
    fn(ex)
  }
};

module.exports.connect = connection
