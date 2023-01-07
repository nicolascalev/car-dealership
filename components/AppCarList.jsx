import React from "react";
import useSWR from "swr";
import AppCarItem from "./AppCarItem";
import AppMessage from "./AppMessage";
import AppLoader from "./AppLoader";
import { useStoreState } from "easy-peasy";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function AppCarList() {
  const searchLabel = useStoreState((state) => state.searchLabel);

  let apiUrl = process.env.GATSBY_API_URL + "/api/cars?populate=photo";
  apiUrl = searchLabel
    ? `${apiUrl}&filters[label][$containsi]=${searchLabel}`
    : apiUrl;

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

function getPhotoUrl(car) {
  if (car.attributes.photo?.data?.attributes?.url) {
    return (
      process.env.GATSBY_API_URL + car.attributes.photo.data.attributes.url
    );
  }
  return "";
}
