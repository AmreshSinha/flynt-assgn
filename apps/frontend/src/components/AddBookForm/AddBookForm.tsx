import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import validator from 'validator';
import { addBook } from "@/lib/api";

export function AddBookForm() {
    const [title, setTitle] = useState("Project Hail Mary");
    const [author, setAuthor] = useState("Andy Weir");
    const [isbn, setIsbn] = useState("9780593395561");
    const [isIsbnValid, setIsIsbnValid] = useState(true);
    const [price, setPrice] = useState(366);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validator.isISBN(e.target.value) ? setIsIsbnValid(true) : setIsIsbnValid(false);
        if (validator.isISBN(e.target.value)) {
            setIsbn(e.target.value.replace(/-/g, ''));
        }
    }

    const onSubmit = async () => {
        const book = {
            title,
            author,
            isbn,
            price
        }
        const res = await addBook(book);
        if (res.id as string) {
            window.location.reload();
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto shrink-0" size="sm" variant="outline">
                    Add Book
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Book</DialogTitle>
                    <DialogDescription>
                        Add book to your collection. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            defaultValue="Project Hail Mary"
                            className="col-span-3"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">
                            Author
                        </Label>
                        <Input
                            id="author"
                            defaultValue="Andy Weir"
                            className="col-span-3"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isbn" className="text-right">
                            ISBN
                        </Label>
                        <Input
                            id="isbn"
                            defaultValue="978-0-593-39556-1"
                            className="col-span-3"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input
                            id="price"
                            defaultValue="366"
                            className="col-span-3"
                            type="number"
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" disabled={!isIsbnValid} onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

