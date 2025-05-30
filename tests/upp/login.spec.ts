import { test, expect } from '../../fixtures/base'

test('signs in via UI', { tag: ['@smoke', '@login'] }, async ({ page, login, home }) => {
    //TODO below reminders will be addressed once UPP team will add the communicated selectors

    // add assertion that dropdown is visible
    // add assertion that there are 2 options in the dropdown
    // add assertion that the first option is "QA"
    // add assertion that the second option is "DEV"
    //  when dev is selected, user is redirecetred to tfnr dev
    //  when qa is selected, user is redirected to tfnr qa

    await page.goto('/');
    await login.login();

    await Promise.all([
        page.waitForResponse(response => response.url().includes('/v1/users/importmaps/portal') && response.status() === 200),
        page.waitForResponse(response => response.url().includes('/v1/users/environments') && response.status() === 200),
        page.waitForResponse(response => response.url().includes('/v1/isallowed?resource') && response.status() === 201)
    ]);

    await expect(page).toHaveURL(/platform\/home/);
    await expect(home.environmentsDropdown).toBeVisible();

    await home.environmentsDropdown.click();
    await home.qaDropdownOption.click();

    await Promise.all([
        page.waitForResponse(response => response.url().includes('/v1/users/importmaps/portal') && response.status() === 200),
        page.waitForResponse(response => response.url().includes('/v1/users/environments') && response.status() === 200),
        page.waitForResponse(response => response.url().includes('/v1/isallowed?resource') && response.status() === 201)
    ]);

    await expect(home.environmentsDropdown).toBeVisible();
    await page.getByText(/^TFN Registry/, { exact: false }).click()
    await expect(page).toHaveURL(/tfnr/);
});