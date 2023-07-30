import React, { useState } from "react";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-star-fill"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
}

export default function StarRating(props: {
  bookstoreID: number;
  rating: number;
}) {
  let [rating, setRating] = useState(props.rating);
  let [hover, setHover] = useState(0);

  function handleUpdateBookstoreRating(bookstoreID: string, newRating: number) {
    const url = `http://localhost:4000/stores/${bookstoreID}`;

    const data = {
      data: {
        id: bookstoreID,
        type: "stores",
        attributes: {
          rating: newRating,
        },
      },
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        // refering to https://jsonapi.org/format/#crud-updating-resource-attributes
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify(data), // Convert the data object to JSON string
    };

    // Make the POST request using fetch
    fetch(url, requestOptions)
      .then((response) => {
        console.log(
          `Update rating for bookstore ${bookstoreID} response: `,
          response
        );
      })
      .catch((error) => {
        console.error(
          `Error updating rating for bookstore ${bookstoreID}:`,
          error
        );
      });
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
              setRating(index); // optimistically update UI first
              handleUpdateBookstoreRating(props.bookstoreID.toString(), index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <StarIcon />
          </button>
        );
      })}
    </div>
  );
}
