import { Page } from "@playwright/test";
import { NUS, Search, Results } from "./nus.po";
import { step } from "../../../utils/miscellaneous";

export class NUSActions extends NUS {
    readonly searchComponent: SearchActions;
    readonly resultsComponent: ResultsActions;

    constructor(page: Page) {
        super(page);
        this.searchComponent = new SearchActions(page);
        this.resultsComponent = new ResultsActions(page);
    }
}

class SearchActions extends Search {
    constructor(page: Page) {
        super(page);
    }

    @step()
    async searchAndReserveRandomNumber(quantity?: string) {
        if (quantity) {
            await this.quantityInput.fill(quantity);
        }

        await Promise.all([
            this.page.waitForResponse(response => response.url().includes('/num/tfn/srchres/random') && response.status() === 200),
            this.searchAndReserveButton.click()
        ]);
    }
}

class ResultsActions extends Results {

    constructor(page: Page) {
        super(page);
    }
}