import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000"
})

// GET /books
export const retrieveBooks = async () => {
    const response = await client.get(
        "/books",
    );
    return response.data;
};

// POST /books
interface BookProps {
    title: string;
    author: string;
    isbn: string;
    price: number;
}
export const addBook = async (book: BookProps) => {
    const response = await client.post(
        "/books",
        book
    );
    return response.data;
};

// PUT /books/:id
export const updateBook = async (id: string, book: BookProps) => {
    const response = await client.put(
        `/books/${id}`,
        book
    );
    return response.data;
};

// DELETE /books/:id
export const deleteBook = async (id: string) => {
    const response = await client.delete(
        `/books/${id}`
    );
    return response.data;
}