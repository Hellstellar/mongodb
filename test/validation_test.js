const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
    it('required validation', (done) => {
        const user = new User({ name: '' })
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required');
        done();
    })

    it('length validation', (done) => {
        const user = new User({ name: 'al'})
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name should be longer than 2 characters');
        done();
    })

    it('prevents save of unvalid user', (done) => {
        const user = new User({name: 'al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name should be longer than 2 characters');
                done();
            })
    })
})