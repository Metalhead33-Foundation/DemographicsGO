import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Int64: number;
  Date: any;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int64'];
  name: Scalars['String'];
};

export type CountryInput = {
  name: Scalars['String'];
};



export type Mutation = {
  __typename?: 'Mutation';
  createCountry: Country;
  deleteCountry?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['String']>;
  updateCountry: Country;
};


export type MutationCreateCountryArgs = {
  input: CountryInput;
};


export type MutationDeleteCountryArgs = {
  id: Scalars['Int64'];
};


export type MutationUpdateCountryArgs = {
  id: Scalars['Int64'];
  input: CountryInput;
};

export type Query = {
  __typename?: 'Query';
  countries: Array<Country>;
  country?: Maybe<Country>;
  version: Scalars['String'];
};


export type QueryCountryArgs = {
  id: Scalars['Int64'];
};

export type GetVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVersionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'version'>
);

export type CreateCountryMutationVariables = Exact<{
  input: CountryInput;
}>;


export type CreateCountryMutation = (
  { __typename?: 'Mutation' }
  & { country: (
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name'>
  ) }
);

export type UpdateCountryMutationVariables = Exact<{
  id: Scalars['Int64'];
  input: CountryInput;
}>;


export type UpdateCountryMutation = (
  { __typename?: 'Mutation' }
  & { country: (
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name'>
  ) }
);

export type DeleteCountryMutationVariables = Exact<{
  id: Scalars['Int64'];
}>;


export type DeleteCountryMutation = (
  { __typename?: 'Mutation' }
  & { deleted: Mutation['deleteCountry'] }
);

export type AllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name'>
  )> }
);

export type GetCountryQueryVariables = Exact<{
  id: Scalars['Int64'];
}>;


export type GetCountryQuery = (
  { __typename?: 'Query' }
  & { country?: Maybe<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name'>
  )> }
);


export const GetVersionDocument = gql`
    query GetVersion {
  version
}
    `;

/**
 * __useGetVersionQuery__
 *
 * To run a query within a React component, call `useGetVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVersionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVersionQuery, GetVersionQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVersionQuery, GetVersionQueryVariables>(GetVersionDocument, baseOptions);
      }
export function useGetVersionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVersionQuery, GetVersionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVersionQuery, GetVersionQueryVariables>(GetVersionDocument, baseOptions);
        }
export type GetVersionQueryHookResult = ReturnType<typeof useGetVersionQuery>;
export type GetVersionLazyQueryHookResult = ReturnType<typeof useGetVersionLazyQuery>;
export type GetVersionQueryResult = ApolloReactCommon.QueryResult<GetVersionQuery, GetVersionQueryVariables>;
export const CreateCountryDocument = gql`
    mutation CreateCountry($input: CountryInput!) {
  country: createCountry(input: $input) {
    id
    name
  }
}
    `;
export type CreateCountryMutationFn = ApolloReactCommon.MutationFunction<CreateCountryMutation, CreateCountryMutationVariables>;

/**
 * __useCreateCountryMutation__
 *
 * To run a mutation, you first call `useCreateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCountryMutation, { data, loading, error }] = useCreateCountryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCountryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCountryMutation, CreateCountryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCountryMutation, CreateCountryMutationVariables>(CreateCountryDocument, baseOptions);
      }
export type CreateCountryMutationHookResult = ReturnType<typeof useCreateCountryMutation>;
export type CreateCountryMutationResult = ApolloReactCommon.MutationResult<CreateCountryMutation>;
export type CreateCountryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCountryMutation, CreateCountryMutationVariables>;
export const UpdateCountryDocument = gql`
    mutation UpdateCountry($id: Int64!, $input: CountryInput!) {
  country: updateCountry(id: $id, input: $input) {
    id
    name
  }
}
    `;
export type UpdateCountryMutationFn = ApolloReactCommon.MutationFunction<UpdateCountryMutation, UpdateCountryMutationVariables>;

/**
 * __useUpdateCountryMutation__
 *
 * To run a mutation, you first call `useUpdateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCountryMutation, { data, loading, error }] = useUpdateCountryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCountryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCountryMutation, UpdateCountryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCountryMutation, UpdateCountryMutationVariables>(UpdateCountryDocument, baseOptions);
      }
export type UpdateCountryMutationHookResult = ReturnType<typeof useUpdateCountryMutation>;
export type UpdateCountryMutationResult = ApolloReactCommon.MutationResult<UpdateCountryMutation>;
export type UpdateCountryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCountryMutation, UpdateCountryMutationVariables>;
export const DeleteCountryDocument = gql`
    mutation DeleteCountry($id: Int64!) {
  deleted: deleteCountry(id: $id)
}
    `;
export type DeleteCountryMutationFn = ApolloReactCommon.MutationFunction<DeleteCountryMutation, DeleteCountryMutationVariables>;

/**
 * __useDeleteCountryMutation__
 *
 * To run a mutation, you first call `useDeleteCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCountryMutation, { data, loading, error }] = useDeleteCountryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCountryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCountryMutation, DeleteCountryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCountryMutation, DeleteCountryMutationVariables>(DeleteCountryDocument, baseOptions);
      }
export type DeleteCountryMutationHookResult = ReturnType<typeof useDeleteCountryMutation>;
export type DeleteCountryMutationResult = ApolloReactCommon.MutationResult<DeleteCountryMutation>;
export type DeleteCountryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCountryMutation, DeleteCountryMutationVariables>;
export const AllCountriesDocument = gql`
    query AllCountries {
  countries {
    id
    name
  }
}
    `;

/**
 * __useAllCountriesQuery__
 *
 * To run a query within a React component, call `useAllCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCountriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllCountriesQuery, AllCountriesQueryVariables>) {
        return ApolloReactHooks.useQuery<AllCountriesQuery, AllCountriesQueryVariables>(AllCountriesDocument, baseOptions);
      }
export function useAllCountriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllCountriesQuery, AllCountriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllCountriesQuery, AllCountriesQueryVariables>(AllCountriesDocument, baseOptions);
        }
export type AllCountriesQueryHookResult = ReturnType<typeof useAllCountriesQuery>;
export type AllCountriesLazyQueryHookResult = ReturnType<typeof useAllCountriesLazyQuery>;
export type AllCountriesQueryResult = ApolloReactCommon.QueryResult<AllCountriesQuery, AllCountriesQueryVariables>;
export const GetCountryDocument = gql`
    query GetCountry($id: Int64!) {
  country(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGetCountryQuery__
 *
 * To run a query within a React component, call `useGetCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCountryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, baseOptions);
      }
export function useGetCountryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, baseOptions);
        }
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>;
export type GetCountryLazyQueryHookResult = ReturnType<typeof useGetCountryLazyQuery>;
export type GetCountryQueryResult = ApolloReactCommon.QueryResult<GetCountryQuery, GetCountryQueryVariables>;