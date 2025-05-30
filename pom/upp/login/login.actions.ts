import { Page } from "@playwright/test";
import { step } from "../../../utils/miscellaneous";
import { Login } from "./login.po";
import { Env } from '../../../utils/env';

export class LoginActions extends Login {
    constructor(page: Page) {
        super(page);
    }

    @step()
    async login() {
        await this.emailInput.fill(Env.email);
        await this.passwordInput.fill(Env.password);
        await this.signInButton.click();
    }
}