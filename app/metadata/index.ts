import { MetadataStorage } from "./metadata-storage";

export function getStore(): MetadataStorage {
    const globalScope: any = global;
    if (!globalScope.metadataStorage)
        globalScope.metadataStorage = new MetadataStorage();

    return globalScope.metadataStorage;
}