import { Page, expect } from '@playwright/test';
import { decode } from 'jsonwebtoken';
import { step } from '../../utils/miscellaneous';
import { Env } from '../../utils/env';

export class Authenticator {
    private bearerToken: string;
    private idToken: string;
    private userInfo: any;
    private idTokenStorage: any;
    private accessTokenStorage: any;
    private myUserInfoStorage: any;

    constructor(private page: Page) { }

    private getExpiryTimeInMilliseconds(): number {
        const now = Date.now();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        return now + oneDayInMs;
    }

    private getExpiryTimestampIn30Days(): number {
        const secondsIn30Days = 30 * 24 * 60 * 60;
        const nowInSeconds = Math.floor(Date.now() / 1000);
        return nowInSeconds + secondsIn30Days;
    }

    private buildIdTokenStorage(): void {
        const [header, payload, signature] = this.idToken.split('.');
        const decodedIdToken = decode(this.idToken, { complete: true });

        this.idTokenStorage = {
            id_token: this.idToken,
            decodedToken: {
                encoded: {
                    header,
                    payload,
                    signature,
                },
                header: decodedIdToken?.header,
                claims: { __raw: this.idToken, ...decodedIdToken.payload },
                user: decodedIdToken.payload,
            },
        };
    }

    private buildAccessTokenStorage(): void {
        this.accessTokenStorage = {
            body: {
                access_token: this.bearerToken,
                scope: "openid profile email",
                expires_in: 86400,
                token_type: "Bearer",
                audience: "https://oneportal.somos.com/prod",
                oauthTokenScope: "openid profile email",
                client_id: "iqBD71ODfUgYDm5YGlKsEJxKBBBBVkSw",
            },
            expiresAt: this.getExpiryTimestampIn30Days(),
        };
    }

    private buildMyUserInfoStorage(): void {
        this.myUserInfoStorage = {
            value: {
                current_tenant: this.userInfo.current_tenant,
                user_info: this.userInfo.user_info,
            },
            expiryTime: this.getExpiryTimeInMilliseconds(),
        };
    }

    @step()
    async apiLogin(username: string, password: string): Promise<void> {

        const url = 'https://platform-prd.us.auth0.com/oauth/token';

        const payload = {
            "grant_type": "password",
            "client_id": "iqBD71ODfUgYDm5YGlKsEJxKBBBBVkSw",
            "username": username,
            "password": password,
            "audience": "https://oneportal.somos.com/prod",
            "scope": "openid profile email"
        };

        const response = await this.page.request.post(url, { data: payload, headers: { 'Content-type': 'application/json' } });
        const responseBody = await response.json();
        this.idToken = responseBody.id_token;
        this.bearerToken = responseBody.access_token;
    }

    @step()
    async fetchUserInfo(environment: string) {
        if (!this.bearerToken) throw new Error('Token not available. Call apiLogin() first.');

        const url = `https://portal-ns-${environment}.oneportal.somos.com/v1/userinfo`;

        const response = await this.page.request.get(url, {
            headers: {
                'Authorization': `Bearer ${this.bearerToken}`
            }
        });
        this.userInfo = await response.json();
    }

    @step()
    async setLocalStorageViaAddInitScript(context: any, environment: string): Promise<void> {
        if (!this.bearerToken || !this.userInfo) {
            throw new Error('Login and fetch user info before setting local storage.');
        }

        this.buildIdTokenStorage();
        this.buildAccessTokenStorage();
        this.buildMyUserInfoStorage();

        await context.addInitScript(([idTokenStorage, accessTokenStorage, myUserInfoStorage, environment]) => {
            localStorage.setItem('@@auth0spajs@@::iqBD71ODfUgYDm5YGlKsEJxKBBBBVkSw::@@user@@', JSON.stringify(idTokenStorage, null, 2));
            localStorage.setItem('@@auth0spajs@@::iqBD71ODfUgYDm5YGlKsEJxKBBBBVkSw::https://oneportal.somos.com/prod::openid profile email', JSON.stringify(accessTokenStorage, null, 2));
            localStorage.setItem('myUserInfo', JSON.stringify(myUserInfoStorage, null, 2));
            localStorage.setItem('env', `portal:${environment.toUpperCase()}`);
        }, [this.idTokenStorage, this.accessTokenStorage, this.myUserInfoStorage, environment]);
    }

    @step()
    async setLocalStorage(environment): Promise<void> {
        if (!this.bearerToken || !this.userInfo) {
            throw new Error('Login and fetch user info before setting local storage.');
        }

        this.buildIdTokenStorage();
        this.buildAccessTokenStorage();
        this.buildMyUserInfoStorage();

        await this.page.goto('/');

        await this.page.evaluate(
            ([idTokenStorage, accessTokenStorage, myUserInfoStorage, environment]) => {
                localStorage.setItem('@@auth0spajs@@::iqBD71ODfUgYDm5YGlKsEJxKBBBBVkSw::@@user@@', JSON.stringify(idTokenStorage, null, 2));
                localStorage.setItem('@@auth0spajs@@::iqBD71ODfUgYDm5YGlKsEJxKBBBBVkSw::https://oneportal.somos.com/prod::openid profile email', JSON.stringify(accessTokenStorage, null, 2));
                localStorage.setItem('myUserInfo', JSON.stringify(myUserInfoStorage, null, 2));
                localStorage.setItem('env', `portal:${environment.toUpperCase()}`);
            },
            [this.idTokenStorage, this.accessTokenStorage, this.myUserInfoStorage, environment]
        );

    }

    @step()
    async startSharedSession(user: string = Env.respOrgUser): Promise<void> {
        const [response] = await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('usr/dashboard')),
            await this.page.goto(`https://app.somos.com/tfnr/login?withUser=${user}&allowSharedBrowserSessions=true`)
        ]);
        expect(response.status()).toBe(200);
        await expect(this.page).toHaveURL('/tfnr/dashboard');
    }

    @step()
    async validateSharedBrowserSession(): Promise<void> {
        const { key, value } = await this.page.evaluate(() => {
            for (const key in localStorage) {
                if (key.includes('P2')) {
                    return { key, value: localStorage.getItem(key) };
                }
            }
            return { key: null, value: null };
        });

        expect(key, 'Expected a localStorage key containing "P2"').not.toBeNull();
        expect(value, `Expected the value of "${key}" to be "true"`).toBe('true');
    }

}