const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
        mongoose.connect('mongodb://localhost:27017/users_test', { useNewUrlParser: true });
        mongoose.connection
                .once('open', () => { 
                        console.log('Connection was successful');
                        done();
                })
                .on('error', (err) => console.warn('Warning', err))
})


beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
                done();
        });
})