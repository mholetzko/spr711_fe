import { Step, Table, BeforeSuite, AfterSuite } from "gauge-ts";
import { strictEqual } from "assert";
import {
  checkBox,
  click,
  closeBrowser,
  evaluate,
  goto,
  into,
  link,
  openBrowser,
  press,
  text,
  textBox,
  toLeftOf,
  write,
} from "taiko";
import assert = require("assert");

export default class StepImplementation {
  @BeforeSuite()
  public async beforeSuite() {
    await openBrowser({ headless: false });
  }

  @AfterSuite()
  public async afterSuite() {
    await closeBrowser();
  }

  @Step("Open srp application")
  public async openSrpPage() {
    await goto("localhost:3000");
  }

  @Step("check API connection")
  public async checkApiConnection() {
    assert.ok(await text("Could not fetch API").exists());
  }

  @Step("Global desctruction")
  public async clearAllTasks() {
    // @ts-ignore
    await evaluate(() => localStorage.clear());
  }
}
