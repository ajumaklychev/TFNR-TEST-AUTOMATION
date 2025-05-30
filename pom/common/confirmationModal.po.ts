import { Locator, Page } from "@playwright/test";

export class Confirmation {
    readonly page: Page;

    readonly confirmationModalHeader: Locator;
    readonly confirmationModalDescription: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.confirmationModalHeader = page.locator('[data-testid="confirmation-modal-header"] h3');
        this.confirmationModalDescription = page.locator('[data-testid="confirmation-modal-body"] p');
        this.yesButton = page.getByTestId('confirmation-modal-yes-button');
        this.noButton = page.getByTestId('confirmation-modal-no-button');
    }

}