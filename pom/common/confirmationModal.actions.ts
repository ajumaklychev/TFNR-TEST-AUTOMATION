import { Page, expect } from "@playwright/test";
import { Confirmation } from "./confirmationModal.po";
import { step } from "../../utils/miscellaneous";

export class ConfirmationActions extends Confirmation {

    constructor(page: Page) {
        super(page);
    }

    @step()
    async clickYesButton() {
        await this.yesButton.click();
    }

    @step()
    async clickNoButton() {
        await this.noButton.click();
    }

    @step()
    async verifyConfirmationDescription(description: string) {
        await expect(this.confirmationModalDescription).toContainText(description);
    }

    @step()
    async verifyConfirmationHeader(header: string) {
        await expect(this.confirmationModalHeader).toContainText(header);
    }

}