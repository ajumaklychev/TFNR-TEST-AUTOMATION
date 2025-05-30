import { NusResultsTableColumns } from '../../../../pom/customerRecordAdministration/nus/nus.po';
import { test, expect } from '../../../../fixtures/base'
import { cleanNumber, clickAndWaitForResponse } from '../../../../utils/miscellaneous';
import { Env } from '../../../../utils/env';
import { CADActions } from '../../../../pom/numberAdministration/cad/cad.actions';
import { UserSessionHelper } from '../../../../pom/common/userSession';
import { AppNavigator } from '../../../../pom/common/appNavigator';

test('TS008-Verify That As A User I Want To Be Able To Retrieve Simple CAD',
    { tag: ['@cad', '@high', '@positive', '@tfnrResp', '@regression', '@ui'] },
    async ({ page, NUS, CAD, confirmationModal, appNavigator }) => {

        await appNavigator.gotoNUSscreen();
        await NUS.searchComponent.searchAndReserveRandomNumber();
        const reservedNumber = cleanNumber(await NUS.resultsComponent.getCellFromResultsTable(NusResultsTableColumns.tfn, 0).innerText());

        await appNavigator.gotoCADscreen();
        await CAD.retrieveComponent.retrieveCadViaTfn(reservedNumber);
        await confirmationModal.clickYesButton();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutBasicInformation({ serviceOrder: `pw${reservedNumber}`, effectiveDate: { now: true } });

        await CAD.resultsComponent.basicCustomerRecordTab.expandAreaOfServiceAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.expandStatesAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.selectState('Florida');
        await CAD.resultsComponent.basicCustomerRecordTab.expandCarriersAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.expandIntraLataAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutIntraLata('9989');
        await CAD.resultsComponent.basicCustomerRecordTab.expandInterLataAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutInterLata('9989');
        await CAD.resultsComponent.basicCustomerRecordTab.expandDestinationAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutDestination(reservedNumber, '100');
        await CAD.resultsComponent.submitCad();
        await CAD.verifyCadStatusMessage('Customer Record Created Successfully.');

        await test.step('keeps retrieving cad for 3 mins every 20 seconds until it is active', async () => {
            test.setTimeout(3 * 60 * 1000);
            await clickAndWaitForResponse(page, '[data-testid="cad-btn-rte"]', 'ACTIVE', { endpointIncludes: '/cus/rec/tfnum/', responsePath: 'lstEffDtTms[0].custRecStat' });
            const firstStatus = CAD.resultsComponent.getCadStatusOptionNumber(0);
            await expect(firstStatus).toContainText('Active');
        });

        await CAD.resultsComponent.openCopyCadModal();
        await CAD.copyModal.verifyModalIsVisible();
        await CAD.copyModal.fillOutCustomerRecordDetails({ daysFromNow: 7 });
        await CAD.copyModal.submitCustomerRecord();
        await CAD.resultsComponent.submitCad();
        await CAD.verifyCadStatusMessage('Customer Record Copied Successfully.');

        await CAD.resultsComponent.openTransferCadModal();
        await CAD.transferModal.verifyModalIsVisible();
        await CAD.transferModal.fillOutCustomerRecordDetails({ daysFromNow: 4 });
        await CAD.transferModal.submitCustomerRecord();
        await CAD.resultsComponent.submitCad();
        await CAD.verifyCadStatusMessage('Customer Record Transferred Successfully.');

        await CAD.resultsComponent.openCopyCadModal();
        await CAD.copyModal.verifyModalIsVisible();
        await CAD.copyModal.fillOutCustomerRecordDetails({ daysFromNow: 6 });
        await CAD.copyModal.submitCustomerRecord();
        await CAD.resultsComponent.submitCad();
        await CAD.verifyCadStatusMessage('Customer Record Copied Successfully.');

        await CAD.resultsComponent.deleteCadCprLad();
        await confirmationModal.verifyConfirmationDescription('Are you sure you want to delete the Entire Customer Record?');
        await confirmationModal.clickYesButton();
        await CAD.verifyCadStatusMessage('Customer Record Deleted Successfully.');

        await CAD.resultsComponent.selectLastHistoricalCadStatusOption();
        await CAD.resultsComponent.deleteCadCprLad();
        await confirmationModal.verifyConfirmationDescription('Are you sure you want to delete the Entire Customer Record?');
        await confirmationModal.clickYesButton();
        await CAD.verifyCadStatusMessage('Customer Record Deleted Successfully.');

        await CAD.resultsComponent.selectLastHistoricalCadStatusOption();
        await CAD.resultsComponent.openCopyCadModal();
        await CAD.copyModal.fillOutCustomerRecordDetails({ now: true }, { action: 'Disconnect' });
        await CAD.copyModal.submitCustomerRecord();
        await CAD.verifyCadStatusMessage('Disconnect is Pending and you must submit or save the record to complete Disconnect Action');
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutBasicInformation({ referral: 'no' });
        await CAD.resultsComponent.submitCad();
        await CAD.verifyCadStatusMessage('Customer Record Disconnected Successfully.');

    });

test('TS009-Verify That As A User I Want To Be Able To Update Simple CAD',
    { tag: ['@cad', '@high', '@positive', '@tfnrResp', '@regression', '@ui'] },
    async ({ page, browser, NUS, CAD, confirmationModal, appNavigator }) => {

        await appNavigator.gotoNUSscreen();
        await NUS.searchComponent.searchAndReserveRandomNumber();
        const reservedNumber = cleanNumber(await NUS.resultsComponent.getCellFromResultsTable(NusResultsTableColumns.tfn, 0).innerText());

        await appNavigator.gotoCADscreen();
        await CAD.retrieveComponent.retrieveCadViaTfn(reservedNumber);
        await confirmationModal.clickYesButton();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutBasicInformation({ serviceOrder: `pw${reservedNumber}`, effectiveDate: { daysFromNow: 2 }, effectiveTime: '12:30 AM' });

        await CAD.resultsComponent.basicCustomerRecordTab.expandAreaOfServiceAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.expandStatesAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.selectState('Florida');
        await CAD.resultsComponent.basicCustomerRecordTab.expandCarriersAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.expandIntraLataAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutIntraLata('9989');
        await CAD.resultsComponent.basicCustomerRecordTab.expandInterLataAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutInterLata('9989');
        await CAD.resultsComponent.basicCustomerRecordTab.expandDestinationAccordion();
        await CAD.resultsComponent.basicCustomerRecordTab.fillOutDestination(reservedNumber, '100');
        await CAD.resultsComponent.submitCad();
        await CAD.verifyCadStatusMessage('Customer Record Created Successfully.');

        const firstStatus = CAD.resultsComponent.getCadStatusOptionNumber(0);
        await expect(firstStatus).toContainText('Pending');

        await expect(CAD.resultsComponent.uploadButton).toBeEnabled();
        await expect(CAD.resultsComponent.downloadButton).toBeEnabled();
        await expect(CAD.resultsComponent.printButton).toBeEnabled();

        const [response] = await Promise.all([
            page.waitForResponse(resp =>
                resp.url().includes('cus/rec/unlock') &&
                resp.request().method() === 'PUT' &&
                resp.status() === 200
            ),

            await CAD.resultsComponent.cancelButton.click(),
            await expect(CAD.resultsComponent.cancelButton).toHaveCount(0)
        ]);
        expect(response.ok()).toBeTruthy();

        // below stack created new context for helpDeskAdmin wtih required screen objects
        const isolatedContext = await browser.newContext({
            storageState: '.auth/login.json',
        });
        const secondPage = await isolatedContext.newPage();
        const CADTwo = new CADActions(secondPage);
        const appNavigatorTwo = new AppNavigator(secondPage);
        const userSessionTwo = new UserSessionHelper(secondPage);

        await test.step('go to CAD screen in isolated context with helpDeskAdmin user', async () => {
            await secondPage.bringToFront();
            await appNavigatorTwo.gotoCADscreen();
            await userSessionTwo.switchUser(Env.helpDeskAdmin);
            await CADTwo.retrieveComponent.retrieveCadViaTfn(reservedNumber);
        });

        await test.step('verify that CAD record is unlocked for helpDeskAdmin', async () => {
            await CADTwo.resultsComponent.editButton.click();
            await expect(CADTwo.statusMessageText).toHaveCount(0);
            await CADTwo.resultsComponent.cancelButton.click();
        });

        await test.step('locks the CAD record for respOrgUser', async () => {
            await page.bringToFront();
            await CAD.retrieveComponent.retrieveCadViaTfn(reservedNumber);
            await CAD.verifyCadStatusMessage('Customer Record Retrieved Successfully.');
            await CAD.resultsComponent.editButton.click();
        });

        await test.step('verify that CAD record is locked for helpDeskAdmin', async () => {
            await secondPage.bringToFront();
            await CADTwo.retrieveComponent.retrieveCadViaTfn(reservedNumber);
            await CADTwo.resultsComponent.editButton.click();
            await CADTwo.verifyCadStatusMessage(` The Update request cannot be processed at this time. ${Env.respOrgUser} is working on this Customer Record. (511008)`);
        });

        await test.step('verify that CAD record changes can be reverted', async () => {
            await page.bringToFront();
            await CAD.resultsComponent.basicCustomerRecordTab.expandDestinationAccordion();
            await CAD.resultsComponent.basicCustomerRecordTab.fillOutDestination('912-132-4331', '11');
            await CAD.resultsComponent.submitCad();
            await CAD.verifyCadStatusMessage('Customer Record Update Failed.');
            await CAD.resultsComponent.revertButton.click();
            await confirmationModal.verifyConfirmationDescription('You have edited the Customer Record Setup. You will lose your updates if you continue, Do you want to continue?');
            await confirmationModal.clickYesButton();
            await CAD.verifyCadStatusMessage('Customer Record Reverted Successfully.');
        });

        await test.step('verify that CAD record can be updated', async () => {
            await CAD.resultsComponent.basicCustomerRecordTab.serviceOrderInput.fill('')
            await CAD.resultsComponent.basicCustomerRecordTab.fillOutBasicInformation({ serviceOrder: 'updated' });
            await CAD.resultsComponent.submitCad();
            await CAD.verifyCadStatusMessage('Customer Record Updated Successfully.');
            await expect(CAD.resultsComponent.basicCustomerRecordTab.serviceOrderInput).toHaveValue('updated');
        });

        await test.step('verify that CAD record can be deleted', async () => {
            await CAD.resultsComponent.deleteButton.click();
            await confirmationModal.verifyConfirmationDescription('Are you sure you want to delete the Entire Customer Record?');
            await confirmationModal.clickYesButton();
            await CAD.verifyCadStatusMessage('Customer Record Deleted Successfully.');
        });

        // best practice to close the manually created contexts
        await isolatedContext.close();
    });