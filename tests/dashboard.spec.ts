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

test.describe("Dashboard", () => {
  test("should create, edit and delete task", async ({ page }) => {
    // Check if the page has the create task button
    await page.getByRole("button", { name: "New Task" }).click();

    // Fill the form fields and submit
    await page.fill("input[placeholder='Task name']", "Test Task");
    await page.fill(
      "input[placeholder='Task description']",
      "This is a test task"
    );

    await page.click("text=Create Task");

    // Check if the task is created
    await page.getByText("Test created!").isVisible();

    // goto dashboard?category=myTasks&search=uncompleted to see the created task
    await page.goto("/dashboard?category=myTasks&search=uncompleted");

    // click on the task to edit

    await page.getByRole("button", { name: "Edit task" }).click();

    // edit the task
    await page.fill("input[placeholder='name']", "Test Task Edited");
    await page.fill(
      "input[placeholder='description']",
      "This is a test task edited"
    );

    await page.getByRole("button", { name: "Edit" }).click();

    // wait 3 seconds for the task to be edited
    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: "Close" }).click();

    // find the edited task by new name
    const editedTask = await page.$("text=Test Task Edited");
    expect(editedTask).toBeTruthy();

    // delete the task

    // click on the task to delete

    await page.getByLabel("Delete task").click();

    // click on the delete button

    await page.getByRole("button", { name: "Delete" }).click();

    // should see the task deleted toast
    await page.getByText("Task deleted!").isVisible();
  });
});
