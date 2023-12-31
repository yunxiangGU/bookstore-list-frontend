import React, { Fragment } from "react";
import { formatISO8601Timestamp } from "./utils";
import StarRating from "./Rating";
import { Book } from "./types";

export default function BookstoreCard(props: any) {
  return (
    <div className="border border-black m-4 p-4 w-full rounded flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center pb-4">
        <img
          className="rounded-[40px] md:rounded-[80px] w-20 h-20 md:w-40 md:h-40 object-cover mr-4 shrink-0"
          src={props.storeImage}
        />
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center w-full">
            <span className="font-bold text-xl">{props.name}</span>
            <div className="hidden md:block flex-1" />
            <StarRating bookstoreID={props.id} rating={props.rating} />
          </div>
          <div className="grid grid-cols-2 w-full border">
            <div className="col-span-2 p-2 border font-bold">
              Best-selling books
            </div>
            {props.topBooks && props.topBooks.length > 0 ? (
              props.topBooks.map((book: Book) => {
                return (
                  <Fragment key={`${props.id}-${book.id}`}>
                    <div className="p-2 border text-ellipsis overflow-hidden">
                      {book.name}
                    </div>
                    <div className="p-2 border text-ellipsis overflow-hidden">
                      {book.author.fullName}
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <div className="col-span-2 p-2 border">No data available</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <div className="flex flex-col md:flex-row items-start md:items-center shrink">
          <span>{formatISO8601Timestamp(props.establishmentDate)}</span>
          <span className="hidden md:block px-1">-</span>
          <a
            className="whitespace-nowrap max-w-[200px] md:max-w-none overflow-hidden text-ellipsis"
            href={props.website}
          >
            {props.website}
          </a>
        </div>
        <div className="flex-1" />
        {/* using https://flagsapi.com/ as country flag API 
          as https://restcountries.eu/ was not working for me */}
        <img src={`https://flagsapi.com/${props.countryCode}/flat/64.png`} />
      </div>
    </div>
  );
}
