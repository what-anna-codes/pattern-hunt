// @ts-nocheck

/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client/react';
const defaultOptions = {} as const;
export type GameCreateInput = {
  createdAt?: unknown;
  key?: string | null | undefined;
  moves?: MoveCreateManyInlineInput | null | undefined;
  result?: ResultCreateOneInlineInput | null | undefined;
  updatedAt?: unknown;
};

export type GameCreateOneInlineInput = {
  /** Connect one existing Game document */
  connect?: GameWhereUniqueInput | null | undefined;
  /** Create and connect one Game document */
  create?: GameCreateInput | null | undefined;
};

/** References Game record uniquely */
export type GameWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type MoveCreateInput = {
  boardSize?: number | null | undefined;
  cardsSelected?: TripletCreateOneInlineInput | null | undefined;
  createdAt?: unknown;
  game?: GameCreateOneInlineInput | null | undefined;
  isValid?: boolean | null | undefined;
  ordinal?: number | null | undefined;
  setsVisible?: TripletCreateManyInlineInput | null | undefined;
  timestamp?: string | null | undefined;
  updatedAt?: unknown;
};

export type MoveCreateManyInlineInput = {
  /** Connect multiple existing Move documents */
  connect?: Array<MoveWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing Move documents */
  create?: Array<MoveCreateInput> | null | undefined;
};

/** References Move record uniquely */
export type MoveWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type ResultCreateInput = {
  createdAt?: unknown;
  game?: GameCreateOneInlineInput | null | undefined;
  hintCount?: number | null | undefined;
  seconds?: number | null | undefined;
  updatedAt?: unknown;
  username?: string | null | undefined;
};

export type ResultCreateOneInlineInput = {
  /** Connect one existing Result document */
  connect?: ResultWhereUniqueInput | null | undefined;
  /** Create and connect one Result document */
  create?: ResultCreateInput | null | undefined;
};

/** References Result record uniquely */
export type ResultWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type TripletCreateInput = {
  cardId?: Array<string> | null | undefined;
  updatedAt?: unknown;
};

export type TripletCreateManyInlineInput = {
  /** Create and connect multiple existing Triplet documents */
  create?: Array<TripletCreateInput> | null | undefined;
};

export type TripletCreateOneInlineInput = {
  /** Create and connect one Triplet document */
  create?: TripletCreateInput | null | undefined;
};

export type CreateGameMutationVariables = Exact<{
  data: GameCreateInput;
}>;


export type CreateGameMutation = { createGame: { __typename: 'Game', id: string } | null };

export type CreateMoveMutationVariables = Exact<{
  data: MoveCreateInput;
}>;


export type CreateMoveMutation = { createMove: { __typename: 'Move', id: string } | null };

export type CreateResultMutationVariables = Exact<{
  data: ResultCreateInput;
}>;


export type CreateResultMutation = { createResult: { __typename: 'Result', id: string, hintCount: number | null, seconds: number | null, username: string | null, game: { __typename: 'Game', key: string | null } | null } | null };

export type GetBetterResultsQueryVariables = Exact<{
  newResultSeconds: number;
}>;


export type GetBetterResultsQuery = { resultsConnection: { __typename: 'ResultConnection', aggregate: { __typename: 'Aggregate', betterResultsCount: number }, edges: Array<{ __typename: 'ResultEdge', node: { __typename: 'Result', username: string | null, seconds: number | null, hintCount: number | null, id: string } }> } };

export type GetResultQueryVariables = Exact<{
  id: string | number;
}>;


export type GetResultQuery = { result: { __typename: 'Result', id: string, hintCount: number | null, seconds: number | null, username: string | null, game: { __typename: 'Game', key: string | null } | null } | null };

export type GetTopHundredResultsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopHundredResultsQuery = { results: Array<{ __typename: 'Result', id: string, seconds: number | null }> };

export type GetTopPageResultsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopPageResultsQuery = { results: Array<{ __typename: 'Result', id: string, hintCount: number | null, seconds: number | null, username: string | null, game: { __typename: 'Game', key: string | null } | null }> };


export const CreateGameDocument = gql`
    mutation CreateGame($data: GameCreateInput!) {
  createGame(data: $data) {
    id
  }
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreateMoveDocument = gql`
    mutation CreateMove($data: MoveCreateInput!) {
  createMove(data: $data) {
    id
  }
}
    `;
export type CreateMoveMutationFn = Apollo.MutationFunction<CreateMoveMutation, CreateMoveMutationVariables>;

/**
 * __useCreateMoveMutation__
 *
 * To run a mutation, you first call `useCreateMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveMutation, { data, loading, error }] = useCreateMoveMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMoveMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveMutation, CreateMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveMutation, CreateMoveMutationVariables>(CreateMoveDocument, options);
      }
export type CreateMoveMutationHookResult = ReturnType<typeof useCreateMoveMutation>;
export type CreateMoveMutationResult = Apollo.MutationResult<CreateMoveMutation>;
export type CreateMoveMutationOptions = Apollo.BaseMutationOptions<CreateMoveMutation, CreateMoveMutationVariables>;
export const CreateResultDocument = gql`
    mutation createResult($data: ResultCreateInput!) {
  createResult(data: $data) {
    id
    hintCount
    seconds
    username
    game {
      key
    }
  }
}
    `;
export type CreateResultMutationFn = Apollo.MutationFunction<CreateResultMutation, CreateResultMutationVariables>;

/**
 * __useCreateResultMutation__
 *
 * To run a mutation, you first call `useCreateResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResultMutation, { data, loading, error }] = useCreateResultMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateResultMutation(baseOptions?: Apollo.MutationHookOptions<CreateResultMutation, CreateResultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResultMutation, CreateResultMutationVariables>(CreateResultDocument, options);
      }
export type CreateResultMutationHookResult = ReturnType<typeof useCreateResultMutation>;
export type CreateResultMutationResult = Apollo.MutationResult<CreateResultMutation>;
export type CreateResultMutationOptions = Apollo.BaseMutationOptions<CreateResultMutation, CreateResultMutationVariables>;
export const GetBetterResultsDocument = gql`
    query GetBetterResults($newResultSeconds: Int!) {
  resultsConnection(where: {seconds_lte: $newResultSeconds}, orderBy: seconds_ASC) {
    aggregate {
      betterResultsCount: count
    }
    edges {
      node {
        username
        seconds
        hintCount
        id
      }
    }
  }
}
    `;

/**
 * __useGetBetterResultsQuery__
 *
 * To run a query within a React component, call `useGetBetterResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBetterResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBetterResultsQuery({
 *   variables: {
 *      newResultSeconds: // value for 'newResultSeconds'
 *   },
 * });
 */
export function useGetBetterResultsQuery(baseOptions: Apollo.QueryHookOptions<GetBetterResultsQuery, GetBetterResultsQueryVariables> & ({ variables: GetBetterResultsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBetterResultsQuery, GetBetterResultsQueryVariables>(GetBetterResultsDocument, options);
      }
export function useGetBetterResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBetterResultsQuery, GetBetterResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBetterResultsQuery, GetBetterResultsQueryVariables>(GetBetterResultsDocument, options);
        }
// @ts-ignore
export function useGetBetterResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBetterResultsQuery, GetBetterResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetBetterResultsQuery, GetBetterResultsQueryVariables>;
export function useGetBetterResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBetterResultsQuery, GetBetterResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetBetterResultsQuery | undefined, GetBetterResultsQueryVariables>;
export function useGetBetterResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBetterResultsQuery, GetBetterResultsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBetterResultsQuery, GetBetterResultsQueryVariables>(GetBetterResultsDocument, options);
        }
export type GetBetterResultsQueryHookResult = ReturnType<typeof useGetBetterResultsQuery>;
export type GetBetterResultsLazyQueryHookResult = ReturnType<typeof useGetBetterResultsLazyQuery>;
export type GetBetterResultsSuspenseQueryHookResult = ReturnType<typeof useGetBetterResultsSuspenseQuery>;
export type GetBetterResultsQueryResult = Apollo.QueryResult<GetBetterResultsQuery, GetBetterResultsQueryVariables>;
export const GetResultDocument = gql`
    query GetResult($id: ID!) {
  result(where: {id: $id}) {
    id
    hintCount
    seconds
    username
    game {
      key
    }
  }
}
    `;

/**
 * __useGetResultQuery__
 *
 * To run a query within a React component, call `useGetResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResultQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResultQuery(baseOptions: Apollo.QueryHookOptions<GetResultQuery, GetResultQueryVariables> & ({ variables: GetResultQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResultQuery, GetResultQueryVariables>(GetResultDocument, options);
      }
export function useGetResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResultQuery, GetResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResultQuery, GetResultQueryVariables>(GetResultDocument, options);
        }
// @ts-ignore
export function useGetResultSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetResultQuery, GetResultQueryVariables>): Apollo.UseSuspenseQueryResult<GetResultQuery, GetResultQueryVariables>;
export function useGetResultSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetResultQuery, GetResultQueryVariables>): Apollo.UseSuspenseQueryResult<GetResultQuery | undefined, GetResultQueryVariables>;
export function useGetResultSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetResultQuery, GetResultQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetResultQuery, GetResultQueryVariables>(GetResultDocument, options);
        }
export type GetResultQueryHookResult = ReturnType<typeof useGetResultQuery>;
export type GetResultLazyQueryHookResult = ReturnType<typeof useGetResultLazyQuery>;
export type GetResultSuspenseQueryHookResult = ReturnType<typeof useGetResultSuspenseQuery>;
export type GetResultQueryResult = Apollo.QueryResult<GetResultQuery, GetResultQueryVariables>;
export const GetTopHundredResultsDocument = gql`
    query GetTopHundredResults {
  results(orderBy: seconds_ASC, first: 100) {
    id
    seconds
  }
}
    `;

/**
 * __useGetTopHundredResultsQuery__
 *
 * To run a query within a React component, call `useGetTopHundredResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopHundredResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopHundredResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopHundredResultsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>(GetTopHundredResultsDocument, options);
      }
export function useGetTopHundredResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>(GetTopHundredResultsDocument, options);
        }
// @ts-ignore
export function useGetTopHundredResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>;
export function useGetTopHundredResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTopHundredResultsQuery | undefined, GetTopHundredResultsQueryVariables>;
export function useGetTopHundredResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>(GetTopHundredResultsDocument, options);
        }
export type GetTopHundredResultsQueryHookResult = ReturnType<typeof useGetTopHundredResultsQuery>;
export type GetTopHundredResultsLazyQueryHookResult = ReturnType<typeof useGetTopHundredResultsLazyQuery>;
export type GetTopHundredResultsSuspenseQueryHookResult = ReturnType<typeof useGetTopHundredResultsSuspenseQuery>;
export type GetTopHundredResultsQueryResult = Apollo.QueryResult<GetTopHundredResultsQuery, GetTopHundredResultsQueryVariables>;
export const GetTopPageResultsDocument = gql`
    query GetTopPageResults {
  results(orderBy: seconds_ASC, first: 11) {
    id
    hintCount
    seconds
    username
    game {
      key
    }
  }
}
    `;

/**
 * __useGetTopPageResultsQuery__
 *
 * To run a query within a React component, call `useGetTopPageResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPageResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPageResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopPageResultsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>(GetTopPageResultsDocument, options);
      }
export function useGetTopPageResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>(GetTopPageResultsDocument, options);
        }
// @ts-ignore
export function useGetTopPageResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>;
export function useGetTopPageResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTopPageResultsQuery | undefined, GetTopPageResultsQueryVariables>;
export function useGetTopPageResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>(GetTopPageResultsDocument, options);
        }
export type GetTopPageResultsQueryHookResult = ReturnType<typeof useGetTopPageResultsQuery>;
export type GetTopPageResultsLazyQueryHookResult = ReturnType<typeof useGetTopPageResultsLazyQuery>;
export type GetTopPageResultsSuspenseQueryHookResult = ReturnType<typeof useGetTopPageResultsSuspenseQuery>;
export type GetTopPageResultsQueryResult = Apollo.QueryResult<GetTopPageResultsQuery, GetTopPageResultsQueryVariables>;