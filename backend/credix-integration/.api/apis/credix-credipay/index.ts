import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'credix-credipay/1.0 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Tries to create a new order. Will work if the buyer has enough credit limit and payment
   * terms for the given order. Once successfully created, the total amount of the order will
   * be subtracted from the buyer's available credit limit.
   *
   * @summary Create an order
   */
  postCreateOrder(body: types.PostCreateOrderBodyParam): Promise<FetchResponse<201, types.PostCreateOrderResponse201>> {
    return this.core.fetch('/v1/orders', 'post', body);
  }

  /**
   * Lists all orders associated with the seller's CNPJs.
   *
   * @summary List orders
   */
  listOrders(): Promise<FetchResponse<200, types.ListOrdersResponse200>> {
    return this.core.fetch('/v1/orders', 'get');
  }

  /**
   * Gets an order by Credipay's internal order ID. UUID v4 format.
   *
   * @summary Get an order
   */
  getOrder(metadata: types.GetOrderMetadataParam): Promise<FetchResponse<200, types.GetOrderResponse200>> {
    return this.core.fetch('/v1/orders/{orderId}', 'get', metadata);
  }

  /**
   * Moves an accepted order to finalized state. Status for indicating the order is ready to
   * be processed by the seller, following the delivery of the goods or services.
   *
   * @summary Finalize an order
   */
  postFinalizeOrder(metadata: types.PostFinalizeOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/orders/{orderId}/finalize', 'post', metadata);
  }

  /**
   * Moves an order to cancelled state and increases the buyer's available credit limit by
   * that order's total amount. Cannot be done if an order already has an invoice linked to
   * it.
   *
   * @summary Cancel an order
   */
  postCancelOrder(metadata: types.PostCancelOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/orders/{orderId}/cancel', 'post', metadata);
  }

  /**
   * Lists all assets linked to an application.
   *
   * @summary List assets
   */
  listAssets(metadata?: types.ListAssetsMetadataParam): Promise<FetchResponse<200, types.ListAssetsResponse200>> {
    return this.core.fetch('/v1/assets', 'get', metadata);
  }

  /**
   * Get buyers information.
   *
   * @summary Get buyers
   */
  getBuyers(metadata?: types.GetBuyersMetadataParam): Promise<FetchResponse<200, types.GetBuyersResponse200>> {
    return this.core.fetch('/v1/buyers', 'get', metadata);
  }

  /**
   * Get buyer information.
   *
   * @summary Get buyer
   */
  getBuyer(metadata: types.GetBuyerMetadataParam): Promise<FetchResponse<200, types.GetBuyerResponse200>> {
    return this.core.fetch('/v1/buyers/{taxId}', 'get', metadata);
  }

  /**
   * Returns the maximum payment term days between seller company and buyer company.
   *
   * @summary Get payment terms
   */
  getPaymentTerms(metadata: types.GetPaymentTermsMetadataParam): Promise<FetchResponse<200, types.GetPaymentTermsResponse200>> {
    return this.core.fetch('/v1/payment-terms', 'get', metadata);
  }

  /**
   * Returns the payment terms between seller company and buyer company together with
   * information of how much fees an order would include depending on the payment terms.
   *
   * @summary Query payment terms
   */
  getOrderPaymentTerms(body: types.GetOrderPaymentTermsBodyParam): Promise<FetchResponse<200, types.GetOrderPaymentTermsResponse200>> {
    return this.core.fetch('/v1/payment-terms', 'post', body);
  }

  /**
   * Gets the configuration of a buyer for a seller
   *
   * @summary Get buyer configuration
   */
  getBuyerConfiguration(metadata: types.GetBuyerConfigurationMetadataParam): Promise<FetchResponse<200, types.GetBuyerConfigurationResponse200>> {
    return this.core.fetch('/v1/me/buyers/{buyerTaxId}/configurations', 'get', metadata);
  }

  /**
   * Allows you to submit a Nota Fiscal XML file and link it to an order. The XML must match
   * the order data and the same XML cannot be linked to more than one non-canceled order at
   * the same time.
   *
   * @summary Submit Invoice XML
   */
  postSubmitInvoiceXml(body: types.PostSubmitInvoiceXmlBodyParam, metadata?: types.PostSubmitInvoiceXmlMetadataParam): Promise<FetchResponse<200, types.PostSubmitInvoiceXmlResponse200>> {
    return this.core.fetch('/v1/invoices', 'post', body, metadata);
  }

  /**
   * Get information of an specific invoice.
   *
   * @summary Get Invoice
   */
  getInvoice(metadata: types.GetInvoiceMetadataParam): Promise<FetchResponse<200, types.GetInvoiceResponse200>> {
    return this.core.fetch('/v1/invoices/{invoiceId}', 'get', metadata);
  }

  /**
   * Returns the credit limit of a company.
   *
   * @summary Get credit limit
   */
  getCreditLimit(metadata: types.GetCreditLimitMetadataParam): Promise<FetchResponse<200, types.GetCreditLimitResponse200>> {
    return this.core.fetch('/v1/credit-limits/{taxId}', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetBuyerConfigurationMetadataParam, GetBuyerConfigurationResponse200, GetBuyerMetadataParam, GetBuyerResponse200, GetBuyersMetadataParam, GetBuyersResponse200, GetCreditLimitMetadataParam, GetCreditLimitResponse200, GetInvoiceMetadataParam, GetInvoiceResponse200, GetOrderMetadataParam, GetOrderPaymentTermsBodyParam, GetOrderPaymentTermsResponse200, GetOrderResponse200, GetPaymentTermsMetadataParam, GetPaymentTermsResponse200, ListAssetsMetadataParam, ListAssetsResponse200, ListOrdersResponse200, PostCancelOrderMetadataParam, PostCreateOrderBodyParam, PostCreateOrderResponse201, PostFinalizeOrderMetadataParam, PostSubmitInvoiceXmlBodyParam, PostSubmitInvoiceXmlMetadataParam, PostSubmitInvoiceXmlResponse200 } from './types';
