const assert = require('assert');
const User = require('../src/user')

describe('Creating Records', () => {
    it('saves user', () => {
        const joe = new User({ name: 'joe' });
        joe.save();    
    })
})