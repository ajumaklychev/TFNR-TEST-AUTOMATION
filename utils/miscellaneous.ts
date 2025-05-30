import { test, expect, Page } from '@playwright/test';

export function step(stepName?: string) {
    return function (
        target: Function,
        context: ClassMethodDecoratorContext
    ) {
        return function replacementMethod(this: any, ...args: any[]) {
            const name = `${stepName || (context.name as string)} (${this.name})`;
            const self = this;
            return test.step(name, async () => {
                return await target.call(self, ...args);
            });
        };
    };
}

function getValueFromPath(obj: Record<string, any>, path: string): any {
    const parts = path.split('.');

    return parts.reduce((acc, part) => {
        if (!acc) return undefined;

        const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
        if (arrayMatch) {
            const [, arrayName, index] = arrayMatch;
            return acc[arrayName]?.[Number(index)];
        } else {
            return acc[part];
        }
    }, obj);
}

export async function clickAndWaitForResponse(
    page: Page,
    buttonSelector: string,
    expectedValue: string,
    options: {
        timeout?: number;
        interval?: number;
        endpointIncludes: string;
        responsePath: string;
    }
): Promise<void> {
    const timeout = options.timeout ?? 180_000;
    const interval = options.interval ?? 20_000;
    const endpointIncludes = options.endpointIncludes;
    const button = page.locator(buttonSelector);

    const startTime = Date.now();
    let found = false;

    while (Date.now() - startTime < timeout) {
        const [response] = await Promise.all([
            page.waitForResponse((resp) =>
                resp.url().includes(endpointIncludes) && resp.status() === 200),
            button.click(),
        ]);

        const responseBody = await response.json() as Record<string, any>;
        const actualValue = getValueFromPath(responseBody, options.responsePath);

        if (actualValue === expectedValue) {
            found = true;
            break;
        }

        await page.waitForTimeout(interval);
    }

    expect(found).toBeTruthy();
}

export function cleanNumber(input: string): string {
    return input.trim().replace(/-/g, '');
}