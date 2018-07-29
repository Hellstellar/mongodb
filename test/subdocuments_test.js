const assert = require('assert');
const User = require('../src/user');

describe('Subdocument operations', () => {
    it('Creates user with posts and saves it', (done) => {
        const joe = new User({ 
            name: 'joe',
            posts: [{ title: 'PostTitle' }]
        })
        joe.save()
            .then(() => User.findOne({ name: 'joe'}))
            .then( (user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            })
    })

    it('Creates new post for existing user', (done) => {
        const joe = new User({ 
            name: 'joe',
            posts: []
        })

        joe.save()
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                user.posts.push({ title: 'New Post'});
                return user.save()
            })
            .then(() => User.findOne({ name: 'joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            })
    })

    it('Removes post from existing user', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{ title: 'Post Title'}]
        })
        joe.save()
            .then(() => User.findOne({ name: 'joe'}))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
    })
})