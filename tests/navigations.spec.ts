import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto("/login");
  expect(page).toHaveURL(/\/login/);

  // Expect email and password inputs to be present
  const emailInput = await page.$("input[placeholder='Email']");
  expect(emailInput).toBeTruthy();
  const passwordInput = await page.$("input[placeholder='Password']");
  expect(passwordInput).toBeTruthy();

  // Expect Sign In button to be present
  const signInButtonElement = await page.$("text=Sign In");
  expect(signInButtonElement).toBeTruthy();

  // Login with email and password
  if (emailInput && passwordInput && signInButtonElement) {
    await emailInput.fill("huseyingulcuu+123@gmail.com");
    await passwordInput.fill("123456");

    // Click Sign In button
    await signInButtonElement.click();
    // check if the page is redirected to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  }
});

test.describe("Navigations", () => {
  test("should logout and redirect to login page", async ({ page }) => {
    // Click on the menu bar
    page.getByTestId("menu-bar").click();

    // Click on the logout button
    await page.click("text=Logout");

    // Check if the page is redirected to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("should navigate to friends page", async ({ page }) => {
    // Click on the menu bar
    page.getByTestId("menu-bar").click();

    // Click on the friends button
    await page.click("text=Friends");

    // Check if the page is redirected to friends page
    await expect(page).toHaveURL(/\/friends/);

    // Check if the page has the title "Friendship"
    await expect(
      page.getByRole("heading", { name: "Friendship" })
    ).toBeVisible();
  });
});
