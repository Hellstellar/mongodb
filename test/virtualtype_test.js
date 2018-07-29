const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
    it('checks virtual type value', (done) => {
        const joe = new User({ 
            name: 'joe', posts: [{ title: 'New Title'}, { title: 'new title'}]
        })
        joe.save()
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user.postCount === user.posts.length)
                done();
            })
    })
})