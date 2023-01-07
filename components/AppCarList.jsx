import React from "react";
import useSWR from "swr";
import AppCarItem from "./AppCarItem";
import AppMessage from "./AppMessage";
import AppLoader from "./AppLoader";
import { useStoreState } from "easy-peasy";
import qs from "qs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function AppCarList() {
  const { query } = useQuery();
  let apiUrl = `${process.env.GATSBY_API_URL}/api/cars?${query}`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  if (error)
    return (
      <AppMessage
        title="Oops"
        description="Please try to search later"
      ></AppMessage>
    );

  if (isLoading) return <AppLoader></AppLoader>;

  if (!error && !isLoading && data.meta.pagination.total === 0)
    return (
      <AppMessage
        title="No results"
        description="Try searching for something else"
      ></AppMessage>
    );

  return (
    <>
      {data.data.map((car) => (
        <AppCarItem
          key={car.id}
          id={car.id}
          label={car.attributes.label}
          description={car.attributes.description}
          brand={car.attributes.brand}
          photo={getPhotoUrl(car)}
          price={car.attributes.price}
          year={car.attributes.year}
          owners={car.attributes.owners}
        ></AppCarItem>
      ))}
      {data.meta.pagination.page === data.meta.pagination.pageCount && (
        <AppMessage
          title="End of list"
          description="You reached the end of the results"
        ></AppMessage>
      )}
    </>
  );
}

export default AppCarList;

function useQuery() {
  const searchLabel = useStoreState((state) => state.searchLabel);
  const newestYearFilter = useStoreState((state) => state.newestYearFilter);
  const maxPriceFilter = useStoreState((state) => state.maxPriceFilter);
  const maxOwnersFilter = useStoreState((state) => state.maxOwnersFilter);

  let queryObject = {
    populate: 'photo',
    filters: {
      $and: [],
    },
  };

  if (searchLabel) {
    queryObject.filters.$and.push({
      label: { $containsi: searchLabel },
    });
  }

  if (newestYearFilter) {
    queryObject.filters.$and.push({
      year: { $lte: newestYearFilter },
    });
  }

  if (maxPriceFilter) {
    queryObject.filters.$and.push({
      price: { $lte: maxPriceFilter },
    });
  }

  if (maxOwnersFilter) {
    queryObject.filters.$and.push({
      owners: { $lte: maxOwnersFilter },
    });
  }

  const query = qs.stringify(queryObject, {
    encodeValuesOnly: true,
  });

  return { query };
}

function getPhotoUrl(car) {
  if (car.attributes.photo?.data?.attributes?.url) {
    return (
      process.env.GATSBY_API_URL + car.attributes.photo.data.attributes.url
    );
  }
  return "";
}
