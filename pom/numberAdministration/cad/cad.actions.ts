import { Page, expect } from "@playwright/test";
import { CAD, CADTab, ChooseFromTheListTableColumns, Copy, Results, Retrieve, Transfer } from "./cad.po";
import { step } from "../../../utils/miscellaneous";

export class CADActions extends CAD {

  readonly copyModal: CopyActions;
  readonly transferModal: TransferActions;
  readonly resultsComponent: ResultsActions;
  readonly retrieveComponent: RetrieveActions;

  constructor(page: Page) {
    super(page);
    this.copyModal = new CopyActions(page);
    this.transferModal = new TransferActions(page);
    this.resultsComponent = new ResultsActions(page);
    this.retrieveComponent = new RetrieveActions(page);
  }

  @step()
  async verifyCadStatusMessage(message: string) {
    await expect(this.statusMessageText).toContainText(message);
  }

}

export class RetrieveActions extends Retrieve {
  constructor(page: Page) {
    super(page);
  }

  @step()
  async retrieveCadViaTfn(tfn: string) {
    await this.tfnInput.fill(tfn);
    await this.retrieveButton.click();
  }
}

export class ResultsActions extends Results {

  readonly basicCustomerRecordTab: CADTabActions;

  constructor(page: Page) {
    super(page);
    this.basicCustomerRecordTab = new CADTabActions(page);
  }

  @step()
  async submitCad() {
    await this.submitButton.click();
  }

  @step()
  async openCopyCadModal() {
    await this.copyButton.click();
  }

  @step()
  async openTransferCadModal() {
    await this.transferButton.click();
  }

  @step()
  async deleteCadCprLad() {
    await this.deleteButton.click();
  }

  @step()
  async selectLastHistoricalCadStatusOption() {
    const dropdownOptions = this.cadHistoricalStatusOptions;
    const lastOption = dropdownOptions.locator('option').last();
    const value = await lastOption.getAttribute('value');
    await dropdownOptions.selectOption(value);
  }
}

export class CADTabActions extends CADTab {
  constructor(page: Page) {
    super(page);
  }

  @step()
  async fillOutBasicInformation(options: BasicCadOptionalParams) {

    if (options.serviceOrder) {
      await this.serviceOrderInput.fill(`${options.serviceOrder}`);
      await this.serviceOrderInput.press('Tab');
    }

    if (options.effectiveDate) {
      if ('now' in options.effectiveDate) {
        await this.nowCheckBox.check();
      } else {
        const date = new Date();
        date.setDate(date.getDate() + options.effectiveDate.daysFromNow);
        const formatted = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        await this.effectiveDateInput.fill(formatted);
        await this.effectiveDateInput.press('Tab');
      }
    }

    if (options.effectiveTime) {
      await this.effectiveTimeInput.fill(options.effectiveTime);
      await this.effectiveTimeInput.press('Tab');
    }

    if (options.referral) {
      const optionValue = `_value_${options.referral}`;
      await this.referralDropDown.selectOption({ value: optionValue });
    }
  }

  @step()
  async expandAreaOfServiceAccordion() {
    await this.areaOfServiceAccordion.click();
  }

  @step()
  async expandStatesAccordion() {
    await this.statesAccordion.click();
  }

  @step()
  async selectState(state: string) {
    await this.listOfStatesButton.click();
    await this.chooseFromListModalSearchInput.fill(state);
    const stateFiltered = this.getCellFromChooseFromTheListTable(ChooseFromTheListTableColumns.value);
    await expect(stateFiltered).toContainText(state);
    await this.getCellFromChooseFromTheListTable(ChooseFromTheListTableColumns.checkBox).getByRole('checkbox').check();
    await this.chooseFromListModalSelectButton.click();
  }

  @step()
  async expandCarriersAccordion() {
    await this.carriersAccordion.click();
  }

  async expandIntraLataAccordion() {
    await this.intraLataCarriersAccordion.click();
  }

  @step()
  async expandInterLataAccordion() {
    await this.interLataCarriersAccordion.click();
  }

  @step()
  async fillOutIntraLata(intraLataValue: string) {
    await this.listOfIntraLataCarriersButton.click();
    await this.chooseFromListModalSearchInput.fill(intraLataValue);
    const intraLata = this.getCellFromChooseFromTheListTable(ChooseFromTheListTableColumns.value);
    await expect(intraLata).toContainText(intraLataValue);
    await this.getCellFromChooseFromTheListTable(ChooseFromTheListTableColumns.checkBox).getByRole('checkbox').check();
    await this.chooseFromListModalSelectButton.click();
  }

  @step()
  async fillOutInterLata(interLataValue: string) {
    await this.listOfInterLataCarriersButton.click();
    await this.chooseFromListModalSearchInput.fill(interLataValue);
    const intraLata = this.getCellFromChooseFromTheListTable(ChooseFromTheListTableColumns.value);
    await expect(intraLata).toContainText(interLataValue);
    await this.getCellFromChooseFromTheListTable(ChooseFromTheListTableColumns.checkBox).getByRole('checkbox').check();
    await this.chooseFromListModalSelectButton.click();
  }

  @step()
  async expandDestinationAccordion() {
    await this.destinationAccordion.click();
  }

  @step()
  async fillOutDestination(tfn: string, numberOfLines: string) {
    const row = await this.getNumberOfDestinationRows();

    if (row > 0) {
      await this.addDestinationRowButton.click();
    }
  
    await this.getDestinationNumberInput(row).fill(tfn);
    await this.getDestinationNumberOfLinesInput(row).fill(numberOfLines);

  }
}

class CopyActions extends Copy {

  constructor(page: Page) {
    super(page);
  }

  @step()
  async verifyModalIsVisible() {
    await expect(this.copyCustomerRecordHeaderText).toBeVisible();
  }

  @step()
  async fillOutCustomerRecordDetails(effectiveDate: CadEffectiveDate, options?: CopyOptionalParams) {

    if ('now' in effectiveDate) {
      await this.nowCheckBox.check();
    } else {
      const date = new Date();
      date.setDate(date.getDate() + effectiveDate.daysFromNow);
      const formatted = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

      await this.effectiveDateInput.fill(formatted);
      await this.effectiveDateInput.press('Tab');
    }

    if (options?.copyPortionsFromSource) {
      switch (options.copyPortionsFromSource) {
        case 'CR':
          await this.copyPortionsFromCrCheckBox.check();
          break;
        case 'CPR':
          await this.copyPortionsFromCprCheckBox.check();
          break;
        case 'LAD':
          await this.copyPortionsFromLadCheckBox.check();
          break;
      }
    }

    if (options?.action === 'Disconnect') {
      await this.actionDisconnectRadioButton.check();
    } else if (options?.action === 'New') {
      await this.actionNewRadioButton.check();
    }

    if (options?.effectiveTime) {
      await this.effectiveTimeInput.fill(options.effectiveTime);
      await this.effectiveTimeInput.press('Tab');
    }

  }

  @step()
  async submitCustomerRecord() {
    await this.submitButton.click();
  }
}

class TransferActions extends Transfer {

  constructor(page: Page) {
    super(page);
  }

  @step()
  async verifyModalIsVisible() {
    await expect(this.transferCustomerRecordHeaderText).toBeVisible();
  }

  @step()
  async fillOutCustomerRecordDetails(effectiveDate: CadEffectiveDate, options?: TransferOptionalParams) {

    if ('now' in effectiveDate) {
      this.nowCheckBox.check();
    } else {
      const date = new Date();
      date.setDate(date.getDate() + effectiveDate.daysFromNow);
      const formatted = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

      await this.effectiveDateInput.fill(formatted);
      await this.effectiveDateInput.press('Tab');
    }

    if (options?.transferPortionsFromSource === 'CPR') {
      await this.transferPortionsFromCprCheckBox.check();
    } else if (options?.transferPortionsFromSource === 'LAD') {
      await this.transferPortionsFromLadCheckBox.check();
    }

    if (options?.effectiveTime) {
      await this.effectiveTimeInput.fill(options.effectiveTime);
      await this.effectiveTimeInput.press('Tab');
    }
  }

  @step()
  async submitCustomerRecord() {
    await this.submitButton.click();
  }
}

type CadEffectiveDate =
  | { daysFromNow: number; now?: never }
  | { now: true; daysFromNow?: never };

type BasicCadOptionalParams = {
  serviceOrder?: string;
  effectiveDate?: CadEffectiveDate;
  effectiveTime?: string;
  highPriority?: true;
  customerId?: string;
  agentId?: string;
  subscriberName?: string;
  subscriberAddress?: string;
  hold?: 'Yes' | 'No';
  endIntercept?: string;
  referral?: 'yes' | 'no';
};

type CopyOptionalParams = {
  effectiveTime?: string;
  action?: 'Disconnect' | 'New';
  copyPortionsFromSource?: 'CR' | 'CPR' | 'LAD';
};

type TransferOptionalParams = {
  effectiveTime?: string;
  transferPortionsFromSource?: 'CPR' | 'LAD';
}