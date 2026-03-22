import { useMemo } from "react";

function useSortedData<T>(data: T[], sortBy: string) {
  localStorage.setItem("sort-seedlings", sortBy);
  const [sortKey, order] = sortBy.split(" ") as [keyof T, "asc" | "desc"];

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortKey, order]);

  return sortedData;
}

export default useSortedData;
