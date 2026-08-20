import { type Locator } from '@playwright/test';

export class DatePicker {
  readonly input: Locator;
  readonly calendar: Locator;
  readonly monthDropdown: Locator;

  constructor(input: Locator, calendar: Locator) {
    this.input = input;
    this.calendar = calendar;
    this.monthDropdown = calendar.locator('.month-select');
  }

  dayButton(day: string): Locator {
    return this.calendar.getByRole('button', { name: day, exact: true });
  }

  async selectDate(date: string) {
    await this.input.fill(date);
  }

  async selectDateFromCalendar(month: string, day: string) {
    await this.input.click();
    await this.monthDropdown.selectOption(month);
    await this.dayButton(day).click();
  }
}
