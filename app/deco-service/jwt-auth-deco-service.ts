import { TokenAutoInterface } from '../decorator/interface/service-interface';

export class JwtAuthDecoService implements TokenAutoInterface {
    private privateKey: string;

    public extract(token: string): string {

        return `hello token [${token}]`;
    }

    public constructor(key: string) {
        this.privateKey = key;
    }
}