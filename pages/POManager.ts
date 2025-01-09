import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderDetailsPage } from './OrderDetailsPage';
import { HeaderPage } from './HeaderPage';
import { OrdersPage } from './OrdersPage';
import { OrderSummaryPage } from './OrderSummaryPage';

export class POManger {
  page: Page;
  LoginPage: LoginPage;
  DashboardPage: DashboardPage;
  CartPage: CartPage;
  CheckoutPage: CheckoutPage;
  OrderDetailsPage: OrderDetailsPage;
  HeaderPage: HeaderPage;
  OrdersPage: OrdersPage;
  OrderSummaryPage: OrderSummaryPage;

  constructor(page: Page) {
    this.page = page;
    this.HeaderPage = new HeaderPage(page);
    this.LoginPage = new LoginPage(page);
    this.DashboardPage = new DashboardPage(page);
    this.CartPage = new CartPage(page);
    this.CheckoutPage = new CheckoutPage(page);
    this.OrderDetailsPage = new OrderDetailsPage(page);
    this.OrdersPage = new OrdersPage(page);
    this.OrderSummaryPage = new OrderSummaryPage(page);
  }

  getHeaderPageInstance() {
    return this.HeaderPage;
  }

  getLoginPageInstance() {
    return this.LoginPage;
  }

  getDashboardPageInstance() {
    return this.DashboardPage;
  }

  getCartPageInstance() {
    return this.CartPage;
  }

  getCheckoutPageInstance() {
    return this.CheckoutPage;
  }

  getOrderDetailsPageInstance() {
    return this.OrderDetailsPage;
  }

  getOrdersPageInstance() {
    return this.OrdersPage;
  }

  getOrderSummaryPageInstance() {
    return this.OrderSummaryPage;
  }
}
