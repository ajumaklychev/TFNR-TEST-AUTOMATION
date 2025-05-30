import { AppNavigator } from '../pom/common/appNavigator';
import { ConfirmationActions } from '../pom/common/confirmationModal.actions';
import { NUSActions } from '../pom/customerRecordAdministration/nus/nus.actions';
import { CADActions } from '../pom/numberAdministration/cad/cad.actions';
import { Authenticator } from '../pom/common/authenticate';
import { UserSessionHelper } from '../pom/common/userSession';
import { test as base, expect } from '@playwright/test';
import { LoginActions } from '../pom/upp/login/login.actions';
import { HomeActions } from '../pom/upp/platformHome/home.actions';

type Fixtures = {
  userSession: UserSessionHelper;
  authHelper: Authenticator;
  NUS: NUSActions;
  CAD: CADActions;
  confirmationModal: ConfirmationActions;
  appNavigator: AppNavigator;
  login: LoginActions;
  home: HomeActions;
};

export const test = base.extend<Fixtures>({

  userSession: async ({ page }, use) => {
    const helper = new UserSessionHelper(page);
    await use(helper);
  },

  authHelper: async ({ page }, use) => {
    const helper = new Authenticator(page);
    await use(helper);
  },

  NUS: async ({ page }, use) => {
    const nus = new NUSActions(page);
    await use(nus);
  },

  CAD: async ({ page }, use) => {
    const cad = new CADActions(page);
    await use(cad);
  },

  confirmationModal: async ({ page }, use) => {
    const confirmation = new ConfirmationActions(page);
    await use(confirmation);
  },

  appNavigator: async ({ page }, use) => {
    const navigator = new AppNavigator(page);
    await use(navigator);
  },

  login: async ({ page }, use) => {
    const login = new LoginActions(page);
    await use(login);
  },

  home: async ({ page }, use) => {
    const home = new HomeActions(page);
    await use(home);
  }
});

export { expect } from '@playwright/test';