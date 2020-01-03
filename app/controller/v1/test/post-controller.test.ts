import { PostController } from "../post-controller"

describe('PostController V1', () => {
    let controller = new PostController();
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