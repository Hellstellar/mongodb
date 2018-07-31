const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({name: 'joe'});
        blogPost = new BlogPost({ title: 'JavaScript', content: 'Awesome Language' })

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
                .then(() => done())
    })

    it.only('removes blogposts of deleted user', (done) => {
        joe.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                assert(count === 0);
                done();
            })
    })
})