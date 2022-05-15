const TOKEN_FIELD = 'api-token';

export class TokenService {
    public static getToken(): string {
        let token = window.localStorage.getItem(TOKEN_FIELD);
        if (token) {
            return token
        }
        throw new Error("You are probably not logged in");
    }

    public static reset() {
        TokenService.save('');
    }

    public static save(token: string) {
        window.localStorage.setItem(TOKEN_FIELD, token);
    }

    private constructor() {
    }
}