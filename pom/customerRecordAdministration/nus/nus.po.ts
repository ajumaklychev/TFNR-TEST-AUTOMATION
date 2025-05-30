import { Locator, Page } from "@playwright/test";

export class NUS {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
}

export class Search {
    readonly page: Page;

    readonly quantityInput: Locator;
    readonly numberOrMaskEntryInput: Locator;
    readonly searchAndReserveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.getByTestId('nus-quantity-input');
        this.searchAndReserveButton = page.getByTestId('nus-btn-srv');
    }
}

export class Results {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getCellFromResultsTable(colName: NusResultsTableColumns, rowNum: number): Locator {
        const cellTestId = `nus-table-body-row-${rowNum}-cell-${colName}`;
        return this.page.locator(`[data-testid="${cellTestId}"]`);
    }
}

export enum NusResultsTableColumns {
    tfn = 'tfn',
    respOrgId = 'resp-org-id',
    status = 'status',
    message = 'message',
}