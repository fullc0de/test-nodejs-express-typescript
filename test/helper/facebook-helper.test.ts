import FacebookHelper from '../../app/helper/facebook-helper';

describe('Facebook Helper', () => {
    let helper = new FacebookHelper('v5.0', 'EAAJ9boVcoZBkBACowZA6VDyUJZAsmr73uQdqlG6LfWBT4wZB1BK18EGsETscnWrMw05KP4oulYaZB2JZACKZB4708fDMpM8tVtV4TpyOJdDkzSypgvWwuikRx1imE30HHlfAZBUytOzdu76ZCNMswdva7z3IQPlZCHFWoCmnoDAGZCatAZDZD');

    describe('- request primary user information', () => {
        it('test user\'id and name', async (done) => {
            const info = await helper.user();
            expect(info.id).toBe('169051301009945');
            expect(info.name).toBe('Heath Hwang');
            done();
        });
    });
});
