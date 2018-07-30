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

    it('gets blogpost from user', (done) => {
        User.findOne({ name: 'joe'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JavaScript')
                done();
            })
    })

    it('Populates all associations', (done) => {
        User.findOne({ name: 'joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.blogPosts[0].title = 'JavaScript')
                assert(user.blogPosts[0].comments[0].content === 'nice blog')
                assert(user.blogPosts[0].comments[0].user.name === 'joe')
                done();
            })
    })
})