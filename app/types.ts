export type Country = {
  id: number;
  code: string;
};

export type Author = {
  id: number;
  fullName: string;
};

export type Book = {
  id: number;
  name: string;
  author: Author;
  copiesSold: number;
};

export type Bookstore = {
  id: number;
  name: string;
  establishmentDate: string;
  rating: number;
  storeImage: string;
  website: string;
  books: Book[];
  country: Country;
};
