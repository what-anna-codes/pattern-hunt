/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation createResult($data: ResultCreateInput!) {\n  createResult(data: $data) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}": typeof types.CreateResultDocument,
    "query GetResult($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}": typeof types.GetResultDocument,
    "query GetResults {\n  resultsConnection(orderBy: seconds_ASC, first: 30) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      pageSize\n      startCursor\n    }\n    edges {\n      node {\n        id\n        username\n        createdAt\n        seconds\n      }\n      cursor\n    }\n  }\n}": typeof types.GetResultsDocument,
    "query Result($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}": typeof types.ResultDocument,
    "query Results {\n  results(first: 30, orderBy: seconds_ASC) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}": typeof types.ResultsDocument,
};
const documents: Documents = {
    "mutation createResult($data: ResultCreateInput!) {\n  createResult(data: $data) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}": types.CreateResultDocument,
    "query GetResult($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}": types.GetResultDocument,
    "query GetResults {\n  resultsConnection(orderBy: seconds_ASC, first: 30) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      pageSize\n      startCursor\n    }\n    edges {\n      node {\n        id\n        username\n        createdAt\n        seconds\n      }\n      cursor\n    }\n  }\n}": types.GetResultsDocument,
    "query Result($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}": types.ResultDocument,
    "query Results {\n  results(first: 30, orderBy: seconds_ASC) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}": types.ResultsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createResult($data: ResultCreateInput!) {\n  createResult(data: $data) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}"): (typeof documents)["mutation createResult($data: ResultCreateInput!) {\n  createResult(data: $data) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetResult($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}"): (typeof documents)["query GetResult($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetResults {\n  resultsConnection(orderBy: seconds_ASC, first: 30) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      pageSize\n      startCursor\n    }\n    edges {\n      node {\n        id\n        username\n        createdAt\n        seconds\n      }\n      cursor\n    }\n  }\n}"): (typeof documents)["query GetResults {\n  resultsConnection(orderBy: seconds_ASC, first: 30) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      pageSize\n      startCursor\n    }\n    edges {\n      node {\n        id\n        username\n        createdAt\n        seconds\n      }\n      cursor\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Result($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}"): (typeof documents)["query Result($id: ID!) {\n  result(where: {id: $id}) {\n    id\n    username\n    createdAt\n    seconds\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Results {\n  results(first: 30, orderBy: seconds_ASC) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}"): (typeof documents)["query Results {\n  results(first: 30, orderBy: seconds_ASC) {\n    id\n    username\n    seconds\n    createdAt\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;