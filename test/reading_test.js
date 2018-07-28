const assert = require('assert');
const User = require('../src/user');

describe('Reading users', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({ name: 'joe' })
        joe.save()
           .then(() => {
               done();
           }) 
    });

    it('finds all records with the name joe', (done) => {
        User.find({ name: 'joe' })
            .then((users) => {
                assert(users[0]._id.equals(joe._id))
                done();
            })
    })

    it('find user by id', (done) => {
        User.findOne({_id: joe.id})
            .then((user) => {
                assert(user.name === 'joe')
                done();
            })
    })
})