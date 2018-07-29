const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment =require('../src/comment');

describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({ name: 'joe'})
        blogPost = new BlogPost({ title: 'JavaScript', content: 'Awesome language'})
        comment = new Comment({ content: 'nice blog'})

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
                .then(() => done())
    })

    it.only('gets blogpost from user', (done) => {
        User.findOne({ name: 'joe'})
            .then((user) => {
                console.log(user)
                done();
            })
    })
})