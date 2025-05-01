import { test, expect, Page } from "@playwright/test";

test.describe("[UI] Shopping cart", () => {
  const baseUrl = "https://anatoly-karpovich.github.io/demo-shopping-cart/";

  const badgeNumber = "#badge-number";
  const shoppingCartButton = "#shopping-cart-btn";
  const totalPriceBeforeCheckout = "#total-price";
  const cartItemTitle = "//li//h5";
  const promoCodeInput = ".form-control";
  const redeemButton = "#apply-promocode-button";
  const spinner = ".spinner-border";
  const discountAmount = "#rebates-list li small";
  const continueToCheckoutButton = "#continue-to-checkout-button";
  const totalPriceAfterCheckout = "#content li span";

  const promoCodes = [
    "10-PERCENT-FOR-REDEEM",
    "HOT-COURSE",
    "JAVA-FOR-BOOMERS",
    "5-PERCENT-FOR-UTILS",
    "NO-PYTHON",
    "15-PERCENT-FOR-CSS",
  ];

  let totalAmount = 0;
  let totalDiscountAmount = 0;
  let cartContent = [];

  function getAddToCartButton(productName: string, page: Page) {
    return page
      .locator("div.card-body")
      .filter({
        has: page.getByText(productName, { exact: true }),
      })
      .getByRole("button", { name: "Add to card" });
  }

  function getProductAmount(productName: string, page: Page) {
    return page
      .locator("//div[@class = 'card-body']")
      .filter({
        has: page.getByText(productName, { exact: true }),
      })
      .locator("//span")
      .textContent();
  }

  function calculateFinalAmount(
    totalAmount: number,
    totalDiscountAmount: number
  ) {
    return (
      Math.round(((totalAmount * (100 - totalDiscountAmount)) / 100) * 100) /
      100
    ).toFixed(2);
  }

  async function parseTextAmount(page: Page, locator: string) {
    const amount = await page.locator(locator).textContent();

    if (amount) {
      const parsedAmount = amount.match(/\d+\.?\d*/);
      return parsedAmount[0];
    }
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Should successfully checkout", async ({ page }) => {
    const productsToAdd = [
      "Product 2",
      "Product 4",
      "Product 6",
      "Product 8",
      "Product 10",
    ];

    for (const product of productsToAdd) {
      await getAddToCartButton(product, page).click();

      const productAmount = await getProductAmount(product, page);

      if (productAmount) {
        const parsedAmount = parseFloat(productAmount.replace("$", ""));
        totalAmount += parsedAmount;
      }
    }

    await expect(page.locator(badgeNumber)).toContainText(
      productsToAdd.length.toString()
    );

    await page.locator(shoppingCartButton).click();

    await expect(page.locator(totalPriceBeforeCheckout)).toContainText(
      `$${totalAmount}.00`
    );

    const cartItemTitles = await page.locator(cartItemTitle).all();

    for (const cartItemTitle of cartItemTitles) {
      cartContent.push(await cartItemTitle.textContent());
    }

    expect(productsToAdd).toEqual(cartContent);

    for (const promoCode of promoCodes) {
      await page.locator(promoCodeInput).fill(promoCode);
      await page.locator(redeemButton).click();
      await page.locator(spinner).waitFor({ state: "hidden" });
    }

    const discountAmounts = await page.locator(discountAmount).all();

    for (const discountAmount of discountAmounts) {
      const discountText = await discountAmount.textContent();

      if (discountText) {
        const parsedDiscountAmount = parseFloat(
          discountText.replace(/[-%]/, "")
        );
        totalDiscountAmount += parsedDiscountAmount;
      }
    }

    const calculatedFinalAmount = calculateFinalAmount(
      totalAmount,
      totalDiscountAmount
    );

    expect(await parseTextAmount(page, totalPriceBeforeCheckout)).toEqual(
      calculatedFinalAmount
    );

    await page.locator(continueToCheckoutButton).click();

    expect(await parseTextAmount(page, totalPriceAfterCheckout)).toEqual(
      calculatedFinalAmount
    );
  });
});

