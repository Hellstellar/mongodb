const assert = require('assert');
const User = require('../src/user');

describe('deleting users', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({ name: 'joe'});
        joe.save()
           .then(() => {
               done();
           })
    })

    it('instance remove method', (done) => {
        joe.remove()
           .then(() => User.findOne({ name: 'joe'}))
           .then((user) =>{
                assert(user === null);
                done();
           })
    })

    it('class remove method', (done) => {
        User.remove({name: 'joe'})
           .then(() => User.findOne({ name: 'joe'}))
           .then((user) =>{
                assert(user === null);
                done();
           })
    })

    it('class findOneAndRemove method', (done) => {
        User.findOneAndRemove({name: 'joe'})
           .then(() => User.findOne({ name: 'joe'}))
           .then((user) =>{
                assert(user === null);
                done();
           })
    })

    it('class findByIdAndRemove method', (done) => {
        User.findByIdAndRemove(joe._id)
           .then(() => User.findOne({ name: 'joe'}))
           .then((user) =>{
                assert(user === null);
                done();
           })
    })
})