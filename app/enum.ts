
enum Resource {
    Auth = 'Auth',
    Post = 'Post',
    Comment = 'Comment'
}

type APIVer = 'v1' | 'v2';

function isAPIVer(str: string): str is APIVer {
    return str == 'v1' || str == 'v2';
}

export { 
    Resource, 
    APIVer,
    isAPIVer
}
