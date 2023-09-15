
export class DocumentSessionStorage {

    private static readonly _accessToken: string = 'token';

    static get token() {
        return sessionStorage.getItem(DocumentSessionStorage._accessToken)!;
    }

    static set token(value: string) {
        sessionStorage.setItem(DocumentSessionStorage._accessToken, value!);
    }

}