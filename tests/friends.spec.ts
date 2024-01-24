import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/friends");

	// Expect a title "to contain" a substring.
	await expect(page.locator("h1")).toContainText("Friendship");
});