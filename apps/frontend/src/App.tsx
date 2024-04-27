import { BookCard } from "@/components/BookCard/BookCard"
import { AddBookForm } from "@/components/AddBookForm/AddBookForm";
import { useEffect, useState } from "react";
import { retrieveBooks } from "./lib/api";
// import {
//   useQuery
// } from "@tanstack/react-query"

function App() {
  interface BookProps {
    id: string;
    title: string;
    author: string;
    isbn: string;
    price: number;
  }
  const [books, setBooks] = useState<BookProps[]>([])
  useEffect(() => {
    retrieveBooks().then((data) => {
      setBooks(data)
    }
    )
  }, [])
  return (
    <>
      <header className="flex items-center justify-center h-12 w-full px-4 border-b border-gray-200 dark:border-gray-800">
        Acme Inc
      </header>

      <section className="w-full py-12">
        <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Book Collection</h1>
              <p className="text-gray-500 dark:text-gray-400">Explore our curated selection of books.</p>
            </div>
            <AddBookForm />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => {
              return <BookCard key={book.id} {...book} />
            }
            )}
          </div>
        </div>
      </section>
      
    </>
  )
}

export default App
