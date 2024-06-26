import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type GetBuyerConfigurationMetadataParam = FromSchema<typeof schemas.GetBuyerConfiguration.metadata>;
export type GetBuyerConfigurationResponse200 = FromSchema<typeof schemas.GetBuyerConfiguration.response['200']>;
export type GetBuyerMetadataParam = FromSchema<typeof schemas.GetBuyer.metadata>;
export type GetBuyerResponse200 = FromSchema<typeof schemas.GetBuyer.response['200']>;
export type GetBuyersMetadataParam = FromSchema<typeof schemas.GetBuyers.metadata>;
export type GetBuyersResponse200 = FromSchema<typeof schemas.GetBuyers.response['200']>;
export type GetCreditLimitMetadataParam = FromSchema<typeof schemas.GetCreditLimit.metadata>;
export type GetCreditLimitResponse200 = FromSchema<typeof schemas.GetCreditLimit.response['200']>;
export type GetInvoiceMetadataParam = FromSchema<typeof schemas.GetInvoice.metadata>;
export type GetInvoiceResponse200 = FromSchema<typeof schemas.GetInvoice.response['200']>;
export type GetOrderMetadataParam = FromSchema<typeof schemas.GetOrder.metadata>;
export type GetOrderPaymentTermsBodyParam = FromSchema<typeof schemas.GetOrderPaymentTerms.body>;
export type GetOrderPaymentTermsResponse200 = FromSchema<typeof schemas.GetOrderPaymentTerms.response['200']>;
export type GetOrderResponse200 = FromSchema<typeof schemas.GetOrder.response['200']>;
export type GetPaymentTermsMetadataParam = FromSchema<typeof schemas.GetPaymentTerms.metadata>;
export type GetPaymentTermsResponse200 = FromSchema<typeof schemas.GetPaymentTerms.response['200']>;
export type ListAssetsMetadataParam = FromSchema<typeof schemas.ListAssets.metadata>;
export type ListAssetsResponse200 = FromSchema<typeof schemas.ListAssets.response['200']>;
export type ListOrdersResponse200 = FromSchema<typeof schemas.ListOrders.response['200']>;
export type PostCancelOrderMetadataParam = FromSchema<typeof schemas.PostCancelOrder.metadata>;
export type PostCreateOrderBodyParam = FromSchema<typeof schemas.PostCreateOrder.body>;
export type PostCreateOrderResponse201 = FromSchema<typeof schemas.PostCreateOrder.response['201']>;
export type PostFinalizeOrderMetadataParam = FromSchema<typeof schemas.PostFinalizeOrder.metadata>;
export type PostSubmitInvoiceXmlBodyParam = FromSchema<typeof schemas.PostSubmitInvoiceXml.body>;
export type PostSubmitInvoiceXmlMetadataParam = FromSchema<typeof schemas.PostSubmitInvoiceXml.metadata>;
export type PostSubmitInvoiceXmlResponse200 = FromSchema<typeof schemas.PostSubmitInvoiceXml.response['200']>;
