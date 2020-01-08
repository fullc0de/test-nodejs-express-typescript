import { PostController } from "../post-controller"
import { User } from "../../../model";
import { getConnectionOptions, createConnections } from "typeorm";

beforeAll(async () => {
    return (async () => {
        const conns = await createConnections([{
            "name": "default",
            "type": "postgres",
            "url": 'postgres://postgres:123456@127.0.0.1/test',
            "entities": [
                "build/model/**/*.js"
            ],
            "synchronize": false,
        },{
            "name": "mysqldb",
            "type": "mysql",
            "url": 'mysql://root:123456@127.0.0.1/test'
        }]);
        conns.forEach(conn => {
            console.log(`conn name = ${conn.name}`);
        });
    })();
});

describe('PostController V1', () => {
    let controller = new PostController();

    describe('- check functionality of base controller', () => {
        expect.assertions(2);
        it('get current user', async () => {
            let user = await controller.currentUser('EAAJ9boVcoZBkBACowZA6VDyUJZAsmr73uQdqlG6LfWBT4wZB1BK18EGsETscnWrMw05KP4oulYaZB2JZACKZB4708fDMpM8tVtV4TpyOJdDkzSypgvWwuikRx1imE30HHlfAZBUytOzdu76ZCNMswdva7z3IQPlZCHFWoCmnoDAGZCatAZDZD');
            expect(user).toBeTruthy();
            if (user != null) {
                expect(user).toMatchSnapshot();
            }
        })
    });

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