"use client";
import React, { useEffect, useState } from "react";
import { Author, Book, Bookstore, Country } from "./types";
import BookstoreCard from "./BookstoreCard";

export default function BookstoresList() {
  let [bookstores, setBookstores] = useState<Bookstore[]>([]);

  function fetchBookstoresList() {
    // tweaked default back-end API port from 3000 to 4000 to avoid conflict with front-end
    const url = "http://localhost:4000/stores";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching book stores list");
        }
        return response.json();
      })
      .then((data) => {
        let respCountries = data.included
          .filter((item: any) => {
            return item.type === "countries";
          })
          .map((country: any) => {
            return {
              id: parseInt(country.id),
              code: country.attributes.code,
            };
          });
        let respAuthors = data.included
          .filter((item: any) => {
            return item.type === "authors";
          })
          .map((author: any) => {
            return {
              id: parseInt(author.id),
              fullName: author.attributes.fullName,
            };
          });
        let respBooks = data.included
          .filter((item: any) => {
            return item.type === "books";
          })
          .map((book: any) => {
            return {
              id: parseInt(book.id),
              name: book.attributes.name,
              author: respAuthors.find(
                (author: Author) =>
                  author.id == book.relationships.author.data.id
              ),
              copiesSold: book.attributes.copiesSold,
            };
          });
        let respBookstores = data.data.map((bookstore: any) => {
          return {
            id: parseInt(bookstore.id),
            name: bookstore.attributes.name,
            establishmentDate: bookstore.attributes.establishmentDate,
            rating: bookstore.attributes.rating,
            storeImage: bookstore.attributes.storeImage,
            website: bookstore.attributes.website,
            // it is possible that bookstores can run out of books
            books: bookstore.relationships.books
              ? bookstore.relationships.books.data.map((storeBook: any) => {
                  return respBooks.find(
                    (book: Book) => book.id == storeBook.id
                  );
                })
              : [],
            // each bookstore belongs to one and only one country
            country: respCountries.find(
              (country: Country) =>
                country.id == bookstore.relationships.countries.data.id
            ),
          };
        });
        setBookstores(respBookstores);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  useEffect(() => {
    fetchBookstoresList();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      {bookstores.map((bookstore: Bookstore) => {
        return (
          <BookstoreCard
            key={bookstore.id}
            id={bookstore.id}
            name={bookstore.name}
            establishmentDate={bookstore.establishmentDate}
            website={bookstore.website}
            countryCode={bookstore.country.code}
            storeImage={bookstore.storeImage}
            rating={bookstore.rating}
            topBooks={bookstore.books
              .sort(
                (bookA: Book, bookB: Book) =>
                  bookB.copiesSold - bookA.copiesSold
              )
              .slice(0, 2)}
          />
        );
      })}
    </main>
  );
}
