import { config } from 'dotenv';

//loads .env file to process.env
config();

const VALID_ENVIRONMENTS = ['qa', 'dev'] as const;
type Environment = typeof VALID_ENVIRONMENTS[number];

export class Env {
  static get baseUrl(): string {
    const v = process.env.BASE_URL;
    if (!v) throw new Error('Missing env var: BASE_URL');
    return v;
  }

  static get email(): string {
    const v = process.env.EMAIL;
    if (!v) throw new Error('Missing env var: EMAIL');
    return v;
  }

  static get password(): string {
    const v = process.env.PASSWORD;
    if (!v) throw new Error('Missing env var: PASSWORD');
    return v;
  }

  static get helpDeskAdmin(): string {
    const v = process.env.HELP_DESK_ADMIN;
    if (!v) throw new Error('Missing env var: HELP_DESK_ADMIN');
    return v;
  }

  static get rocUser(): string {
    const v = process.env.ROC_USER;
    if (!v) throw new Error('Missing env var: ROC_USER');
    return v;
  }

  static get respOrgUser(): string {
    const v = process.env.RESP_ORG_USER;
    if (!v) throw new Error('Missing env var: RESP_ORG_USER');
    return v;
  }

  static get environment(): Environment {
    const v = process.env.ENVIRONMENT;
    if (!v) {
      throw new Error('Missing env var: ENVIRONMENT');
    }
    if (!VALID_ENVIRONMENTS.includes(v as Environment)) {
      throw new Error(
        `Invalid ENVIRONMENT value: "${v}". ` +
        `Must be one of: ${VALID_ENVIRONMENTS.join(', ')}.`
      );
    }

    return v as Environment;
  }
}
