import { useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Item } from "./api";
import reactTableContext from "../stores/react-table-context";

const fetchData = async (page, pageSize, articles) => {
  const offset = page * pageSize;
  const response = await Item(5051);

  return response.data;
};

export const useData = (
  queryPageIndex,
  queryPageSize,
  queryPageCount
) => {
  const [data, setData] = useState([]);

  const reactTableCtx = useContext(reactTableContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    // We want to make sure the current page is less than the total page left
    if (queryPageIndex < queryPageSize) {
      // By using prefetchingQuery we want to fetch whatever the next page is
      const nextPage = queryPageIndex + 1;

      // important to make sure the prefetchQuery query-keys needs to be identical with the useQuery.
      // The only exception is that we are passing on the "next page" as the index position #1 of the query-key array
      queryClient.prefetchQuery(
        ["article-data", nextPage, queryPageCount],
        () => fetchData(nextPage, queryPageSize)
      );
    }
  }, [queryPageIndex, queryPageSize, queryPageCount, queryClient]);

  const { data: articleData, isFetched, ...rest } = useQuery(
    ["article-data", queryPageIndex, queryPageCount],
    () => fetchData(queryPageIndex, queryPageSize),
    {
      keepPreviousData: true,
      staleTime: Infinity
    }
  );

  useEffect(() => {
    setData([]);
    if (isFetched && articleData) {
      // Set the state for retrieving total items of the data that exist from the end-point
      reactTableCtx.setTotalCount({
        totalCountChangedValue: articleData.count
      });
      setData(articleData.results);
    }
  }, [isFetched, articleData]);

  return { data, ...rest };
};
