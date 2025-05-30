import { Page, expect } from "@playwright/test";
import { step } from "../../utils/miscellaneous";

export class AppNavigator {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    @step()
    async gotoTFNRDashboardAsUser(user:string) {
        await this.page.goto(`/tfnr/login?withUser=${user}&allowSharedBrowserSessions=true`);
        await expect(this.page).toHaveURL(/tfnr\/dashboard/, { timeout: 15000 });
    }

    @step()
    async gotoNUSscreen() {
        const NUS_URL = '/tfnr/numadmin/NUS';
        await this.page.goto(NUS_URL);
        await expect(this.page).toHaveURL(NUS_URL);
    }

    @step()
    async gotoCADscreen() {
        const CAD_URL = '/tfnr/cusadmin/CAD';
        await this.page.goto(CAD_URL);
        await expect(this.page).toHaveURL(CAD_URL);
    }

}