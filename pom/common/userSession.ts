import { Page, expect } from '@playwright/test';
import { step } from '../../utils/miscellaneous';

export class UserSessionHelper {
  constructor(private page: Page) { }

  private async confirmTFNRegistryIDAlreadyInUse(preferredUser: string) {
    const modal = this.page.getByRole('heading', {
      name: 'TFNRegistry ID Already in Use',
    });

    if (!await modal.isVisible({ timeout: 5_000 })) return;

    const yesButton = this.page.getByRole('button', { name: 'Yes' });

    await Promise.all([
      this.page.waitForResponse(response =>
        response.url().includes(`usr/ctrl/login/${preferredUser}`)
        && response.ok()
      ),
      yesButton.click(),
    ]);
  }

  @step()
  async switchUser(preferredUser: string) {
    await this.page.evaluate((preferredUser) => {
      localStorage.removeItem('view_info');
      localStorage.setItem('preferred_auth0_user', preferredUser);
    }, preferredUser);

    await Promise.all([
      this.page.waitForResponse(resp =>
        resp.request().method() === 'GET' &&
        resp.url().includes('usr/dashboard') &&
        resp.status() === 200
      ),
      this.page.reload(),
    ]);

    await this.page.waitForURL('**/tfnr/**');
  }

  @step()
  async verifyStorage(expected: Record<string, string>, keysToCheck: string[]) {
    for (const [key, expectedValue] of Object.entries(expected)) {
      const actualValue = await this.page.evaluate((k) => localStorage.getItem(k), key);
      expect(actualValue).toBe(expectedValue);
    }

    for (const key of keysToCheck) {
      const value = await this.page.evaluate((k) => localStorage.getItem(k), key);
      expect(value).not.toBeNull();
    }
  }

  @step()
  async verifyUserContextViaUI(setUser: string) {
    await this.page.locator('[data-testid="user-context-menu-dropdown-toggle-button"]').click();
    const userContextElement = this.page.locator('[data-testid="user-context-menu-user-id"]');
    await expect(userContextElement).toHaveText(setUser);
  }

}