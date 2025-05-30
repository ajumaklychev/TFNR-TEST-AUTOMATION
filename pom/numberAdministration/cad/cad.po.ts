import { Locator, Page } from "@playwright/test";

export class CAD {
    readonly page: Page;

    readonly statusMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.statusMessageText = page.getByTestId('cad-page-status-message');
    }
}

export class Retrieve {
    readonly page: Page;

    readonly tfnInput: Locator;
    readonly effectiveDateInput: Locator;
    readonly effectiveTimeInput: Locator;
    readonly retrieveButton: Locator;
    readonly clearButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.tfnInput = page.getByTestId('cad-inp-tfn');
        this.effectiveDateInput = page.getByTestId('cad-data-picker-input');
        this.effectiveTimeInput = page.getByTestId('cad-inp-tim');
        this.retrieveButton = page.getByTestId('cad-btn-rtv');
        this.clearButton = page.getByTestId('cad-btn-clr');
    }
}

export class Results {
    readonly page: Page;

    readonly retrieveButton: Locator;
    readonly editButton: Locator;
    readonly copyButton: Locator;
    readonly transferButton: Locator;
    readonly deleteButton: Locator;
    readonly uploadButton: Locator;
    readonly downloadButton: Locator;
    readonly printButton: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator;
    readonly revertButton: Locator;
    readonly cadHistoricalStatusOptions: Locator;
    readonly cadTab: Locator;
    readonly cprTab: Locator;
    readonly ladTab: Locator;

    constructor(page: Page) {
        this.page = page;

        this.retrieveButton = page.getByRole('button', { name: 'Retrieve' });
        this.editButton = page.getByTestId('cad-btn-edt');
        this.copyButton = page.getByRole('button', { name: 'Copy' });
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.deleteButton = page.getByTestId('cad-btn-del');
        this.uploadButton = page.getByTestId('cad-btn-upl');
        this.downloadButton = page.getByTestId('cad-btn-dwn');
        this.printButton = page.getByTestId('cad-btn-prt');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.cadHistoricalStatusOptions = page.getByTestId('cad-acn-select-element');
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.revertButton = page.getByRole('button', { name: 'Revert' });
        this.cadTab = page.getByRole('button', { name: 'Basic Customer Record (CAD)' });
        this.cprTab = page.getByRole('button', { name: 'Call Processing Record (CPR)' });
        this.ladTab = page.getByRole('button', { name: 'Label Definitions (LAD)' });
    }

    getCadStatusOptionNumber(optionNumber: number): Locator {
        return this.cadHistoricalStatusOptions.locator('option').nth(optionNumber);
    }
}

export class CADTab {
    readonly page: Page;

    readonly serviceOrderInput: Locator;
    readonly nowCheckBox: Locator;
    readonly effectiveDateInput: Locator;
    readonly effectiveTimeInput: Locator;
    readonly highPriorityCheckBox: Locator;
    readonly customerIdInput: Locator;
    readonly agentIdInput: Locator;
    readonly subscriberNameInput: Locator;
    readonly subscriberAddressInput: Locator;
    readonly holdRadioButton: Locator;
    readonly areaOfServiceAccordion: Locator;
    readonly statesAccordion: Locator;
    readonly listOfStatesButton: Locator;
    readonly chooseFromListModalSearchInput: Locator;
    readonly chooseFromListModalSelectButton: Locator;
    readonly carriersAccordion: Locator;
    readonly intraLataCarriersAccordion: Locator;
    readonly listOfIntraLataCarriersButton: Locator;
    readonly interLataCarriersAccordion: Locator;
    readonly listOfInterLataCarriersButton: Locator;
    readonly destinationAccordion: Locator;
    readonly addDestinationRowButton: Locator;
    readonly destinationNumberInput: Locator;
    readonly destinationNumberOfLinesInput: Locator;
    readonly referralDropDown: Locator;

    constructor(page: Page) {
        this.page = page;

        this.serviceOrderInput = page.getByTestId('cad-inp-svc');
        this.nowCheckBox = page.getByTestId('cad-cbx-now');
        this.effectiveDateInput = page.getByTestId('cad-eff-data-picker-input');
        this.effectiveTimeInput = page.getByTestId('cad-dat-tim');
        this.areaOfServiceAccordion = page.getByRole('button', { name: 'Areas of Service *' });
        this.statesAccordion = page.getByRole('button', { name: 'States' });
        this.listOfStatesButton = page.getByTestId('cad-lst-aosState');
        this.chooseFromListModalSearchInput = page.getByTestId('table-search-input');
        this.chooseFromListModalSelectButton = page.getByTestId('cad-lst-slt');
        this.carriersAccordion = page.getByRole('button', { name: 'Carriers *' });
        this.intraLataCarriersAccordion = page.getByRole('button', { name: 'IntraLATA Carriers' });
        this.listOfIntraLataCarriersButton = page.getByTestId('cad-lst-intraLATACarrier');
        this.interLataCarriersAccordion = page.getByRole('button', { name: 'InterLATA Carriers' });
        this.listOfInterLataCarriersButton = page.getByTestId('cad-lst-interLATACarrier');
        this.destinationAccordion = page.getByRole('button', { name: 'Destination *' });
        this.addDestinationRowButton = page.getByTestId('cad-add-des');
        this.destinationNumberInput = page.getByTestId('cad-des-tfn0');
        this.destinationNumberOfLinesInput = page.getByTestId('cad-des-ntl0');
        this.referralDropDown = page.getByTestId('cad-ref-select-element');
    }

    getCellFromChooseFromTheListTable(colName: ChooseFromTheListTableColumns, rowNum: number = 0): Locator {
        const cellTestId = `table-body-row-${rowNum}-cell-${colName}`;
        return this.page.locator(`[data-testid="${cellTestId}"]`);
    }

    getDestinationNumberInput(row: number): Locator {
        return this.page.getByTestId(`cad-des-tfn${row}`);
    }
    getDestinationNumberOfLinesInput(row: number): Locator {
        return this.page.getByTestId(`cad-des-ntl${row}`);
    }

    getNumberOfDestinationRows(): Promise<number> {
        return this.page.locator('input[name^="destNum_"]').count();
    }
}

export class Copy {
    readonly page: Page;

    readonly copyCustomerRecordHeaderText: Locator;
    readonly tfnInput: Locator;
    readonly nowCheckBox: Locator;
    readonly effectiveDateInput: Locator;
    readonly effectiveTimeInput: Locator;
    readonly actionChangeRadioButton: Locator;
    readonly actionDisconnectRadioButton: Locator;
    readonly actionNewRadioButton: Locator;
    readonly copyPortionsFromCrCheckBox: Locator;
    readonly copyPortionsFromCprCheckBox: Locator;
    readonly copyPortionsFromLadCheckBox: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.copyCustomerRecordHeaderText = page.getByRole('heading', { name: 'Copy Customer Record' });
        this.tfnInput = page.getByTestId('cad-tgt-tfn');
        this.nowCheckBox = page.getByTestId('cad-tgt-now');
        this.effectiveDateInput = page.getByTestId('ctd-data-picker-input');
        this.effectiveTimeInput = page.getByTestId('cad-tgt-tim');
        this.actionChangeRadioButton = page.getByTestId('cad-cpy-chg');
        this.actionDisconnectRadioButton = page.getByTestId('cad-cpy-dsc');
        this.actionNewRadioButton = page.getByTestId('cad-cpy-new');
        this.copyPortionsFromCrCheckBox = page.getByTestId('cad-cpy-bsc');
        this.copyPortionsFromCprCheckBox = page.getByTestId('cad-cpy-cpr');
        this.copyPortionsFromLadCheckBox = page.getByTestId('cad-cpy-lad');
        this.submitButton = page.getByTestId('cad-cpy-sub');
        this.cancelButton = page.getByTestId('cad-cpy-cnl');
    }
}

export class Transfer {
    readonly page: Page;

    readonly transferCustomerRecordHeaderText: Locator;
    readonly tfnInput: Locator;
    readonly nowCheckBox: Locator;
    readonly effectiveDateInput: Locator;
    readonly effectiveTimeInput: Locator;
    readonly transferPortionsFromCrCheckBox: Locator;
    readonly transferPortionsFromCprCheckBox: Locator;
    readonly transferPortionsFromLadCheckBox: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.transferCustomerRecordHeaderText = page.getByRole('heading', { name: 'Transfer Customer Record' });
        this.tfnInput = page.getByTestId('cad-tgt-tfn');
        this.nowCheckBox = page.getByTestId('cad-tgt-now');
        this.effectiveDateInput = page.getByTestId('ctd-data-picker-input');
        this.effectiveTimeInput = page.getByTestId('cad-tgt-tim');
        this.transferPortionsFromCrCheckBox = page.getByTestId('cad-tfr-bsc');
        this.transferPortionsFromCprCheckBox = page.getByTestId('cad-tfr-cpr');
        this.transferPortionsFromLadCheckBox = page.getByTestId('cad-tfr-lad');
        this.submitButton = page.getByTestId('cad-cpy-sub');
        this.cancelButton = page.getByTestId('cad-cpy-cnl');
    }

}

export enum ChooseFromTheListTableColumns {
    value = 'label',
    checkBox = 'selected'
}