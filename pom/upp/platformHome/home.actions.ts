import { Page } from "@playwright/test";
import { step } from "../../../utils/miscellaneous";
import { Home } from "./home.po";

export class HomeActions extends Home {
    constructor(page: Page) {
        super(page);
    }
}