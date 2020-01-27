
enum Resource {
    SignUp = 'SignUp',
    Post = 'Post',
    Comment = 'Comment'
}

type APIVer = 'v1' | 'v2';

function isAPIVer(str: string): str is APIVer {
    return str == 'v1' || str == 'v2';
}

function prevVer(ver: APIVer): APIVer | undefined {
    let prevVN: number = +ver.slice(-1) - 1;
    let prevVersion = `v${prevVN}`;
    if (isAPIVer(prevVersion)) {
        return prevVersion;
    } else {
        return undefined;
    }
}

export { 
    Resource, 
    APIVer,
    isAPIVer,
    prevVer
}
