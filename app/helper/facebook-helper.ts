
import axios, { Method } from "axios";

export type FacebookUserInfo = {
    id?: string,
    name?: string,
    raw?: Array<{}>,
    accessToken?: string
};

export type FBAPIVersion = 'v5.0'

export default class FacebookHelper {

    readonly version: FBAPIVersion;
    readonly token: string;

    constructor(version: FBAPIVersion, token: string) {
        this.version = version;
        this.token = token;
    }

    public async user(): Promise<FacebookUserInfo> {
        const response = await this.request('me', { field: 'id,name' }, 'GET')
        let result: FacebookUserInfo = {}
        result.id = response?.data.id;
        result.name = response?.data.name;
        result.raw = response?.data;
        result.accessToken = this.token;
        return result;
    }

    private async request(path: string, params: {}, method: Method) {
        try {
            const response = await axios({
                headers: { 'User-Agent': 'Facebook Graph API Requester' },
                method,
                params: Object.assign({ access_token: this.token }, params),
                url: `https://graph.facebook.com/${this.version}/${path}`
            })
            return response    
        } catch(error) {
            console.log(error);
        }
    }
};

