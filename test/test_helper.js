const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users_test', { useNewUrlParser: true });

mongoose.connection
        .once('open', () => console.log('Connection was successful'))
        .on('error', (err) => console.warn('Warning', err))

beforeEach(() => {
        mongoose.connection.collections.users.drop();
})