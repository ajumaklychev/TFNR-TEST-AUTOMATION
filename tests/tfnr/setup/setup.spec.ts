import { test as setup, expect } from '@playwright/test';
import { Authenticator } from '../../../pom/common/authenticate';
import { UserSessionHelper } from '../../../pom/common/userSession';
import { Env } from '../../../utils/env';

setup.describe.configure({ retries: 2 });

setup('verify that shared browser session is set properly even when the user is switched multiple times', { tag: ['@setup'] }, async ({ page }) => {
    const authHelper = new Authenticator(page);
    const userSession = new UserSessionHelper(page);

    await authHelper.apiLogin(Env.email, Env.password);
    await authHelper.fetchUserInfo(Env.environment);
    await authHelper.setLocalStorage(Env.environment);
    await authHelper.startSharedSession();

    await setup.step(`validates on all ends that user and local storage set properly for RESP_ORG_USER`, async () => {
        await userSession.verifyStorage({ preferred_auth0_user: Env.respOrgUser }, ['view_info']);
        await userSession.verifyUserContextViaUI(Env.respOrgUser);
        await authHelper.validateSharedBrowserSession();
    });

    await setup.step(`miscellaneous step to navigate to URC screen`, async () => {
        await page.goto('/tfnr/user-management/URC');
        await expect(page).toHaveURL('/tfnr/user-management/URC');
    });

    await setup.step(`switches user, validates on all ends that user and local storage set properly for ROC_USER`, async () => {
        await userSession.switchUser(Env.rocUser);
        await userSession.verifyStorage({ preferred_auth0_user: Env.rocUser }, ['view_info']);
        await userSession.verifyUserContextViaUI(Env.rocUser);
        await authHelper.validateSharedBrowserSession();
    });

    await setup.step(`miscellaneous step to navigate to URC screen`, async () => {
        await page.goto('/tfnr/user-management/URC');
        await expect(page).toHaveURL('/tfnr/user-management/URC');
    });

    await setup.step(`switches user, validates on all ends that user and local storage set properly for HELP_DESK_ADMIN`, async () => {
        await userSession.switchUser(Env.helpDeskAdmin);
        await userSession.verifyStorage({ preferred_auth0_user: Env.helpDeskAdmin }, ['view_info']);
        await userSession.verifyUserContextViaUI(Env.helpDeskAdmin);
        await authHelper.validateSharedBrowserSession();
    });

    await setup.step(`miscellaneous step to navigate to URC screen`, async () => {
        await page.goto('/tfnr/user-management/URC');
        await expect(page).toHaveURL('/tfnr/user-management/URC');
    });

    await setup.step(`switches user, validates on all ends that user and local storage set properly for RESP_ORG_USER`, async () => {
        await userSession.switchUser(Env.respOrgUser);
        await userSession.verifyStorage({ preferred_auth0_user: Env.respOrgUser }, ['view_info']);
        await userSession.verifyUserContextViaUI(Env.respOrgUser);
        await authHelper.validateSharedBrowserSession();
    });

    await setup.step(`stores the storageState to reuse in the rest of the project`, async () => {
        await page.context().storageState({ path: '.auth/login.json' });
    });

});