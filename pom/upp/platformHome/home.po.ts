import { Locator, Page } from "@playwright/test";

export class Home {
    readonly page: Page;

    readonly environmentsDropdown: Locator;
    readonly qaDropdownOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.environmentsDropdown = page.locator('//*[@data-slot="main-wrapper"]/div');
        this.qaDropdownOption = page.locator('//div[contains(text(),"QA Environment")]/parent::span/..');
    }
}