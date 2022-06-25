import useSWR from 'swr'
import { InferFetchedType } from 'types/gmfren'
import { openApiSWRFetcher, searchCollections } from 'utils/fetcher'
import { paramsToQueryString } from 'utils/params'

type SearchCollectionsResponse = InferFetchedType<
  typeof searchCollections.execute
>
