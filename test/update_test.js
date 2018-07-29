const assert = require('assert');
const User = require('../src/user')

describe('updating users', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'joe', likes: 0 });
        joe.save()
            .then(() => done())
    })

    const assertName = (operation, done) => {
        operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex')
            done();
        })
    }

    it('instance set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
            
    })

    it('instance update', (done) => {
        assertName(joe.update({name: 'Alex'}), done);      
    })

    it('class update', (done) => {
        assertName(User.update({name: 'joe'},{name: 'Alex'}), done);      
    })

    it('class update one', (done) => {
        assertName(User.findOneAndUpdate({name: 'joe'},{name: 'Alex'}), done);      
    })

    it('class update by id', (done) => {
        assertName(User.findByIdAndUpdate(joe._id,{name: 'Alex'}), done);      
    })

    it('increment post count by one', (done) => {
        User.update({ name: 'joe'}, { $inc: {likes: 1}})
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user.likes === 1)
                done();
            })
    })

})