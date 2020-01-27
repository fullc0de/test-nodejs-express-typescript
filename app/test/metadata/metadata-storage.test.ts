import ControllerInterface from '../../controller/interface/controller-interface';
import { Context } from '../../controller/common-interfaces';
import { MetadataStorage } from '../../metadata/metadata-storage';

describe('metadata > storage', () => {
    let storage = new MetadataStorage();

    it('should make proper routing information with input ', () => {
        storage.registerRoute("users", "v1", { version: "v1" });
        storage.registerRoute("posts", "v1", { version: "v1" });
        storage.registerRoute("posts", "v2", { version: "v2" });
        
        let routeInfos = storage.buildRoutes("api");

        expect(routeInfos.length).toEqual(4);
    });
});