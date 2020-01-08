import { AuthController } from '../auth-controller';

describe('AuthController V2', () => {
    let controller = new AuthController();

    describe('- check validation: post_id', () => {
        it('should return true', () => {
            expect(controller.validateParamId('123'))
            .toEqual(123);
        });
        it('should return false', () => {
            expect(controller.validateParamId('Ab2'))
            .toEqual(new Error('invalid resource parameter (Ab2)'));
        });
    });
});