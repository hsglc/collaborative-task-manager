import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("/login");
    expect(page).toHaveURL(/\/login/);
  });

  test("should have form elements", async ({ page }) => {
    // Expect login and sign up buttons to be present
    const signInButton = await page.$("text=Sign In");
    expect(signInButton).toBeTruthy();
    const signUpButton = await page.$("text=Sign Up");
    expect(signUpButton).toBeTruthy();

    // Expect social login buttons to be present
    const googleButton = await page.$("text=Continue with Google");
    expect(googleButton).toBeTruthy();
    const githubButton = await page.$("text=Continue with Github");
    expect(githubButton).toBeTruthy();
  });
  test("login with email and password", async ({ page }) => {
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
    }
  });
});
