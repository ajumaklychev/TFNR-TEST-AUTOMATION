import { Locator, Page } from "@playwright/test";

export class Login {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('//*[@id="email"]');
        this.passwordInput = page.locator('//*[@id="password"]');
        this.signInButton = page.locator('//*[@id="btn-login"]');
    }
}

