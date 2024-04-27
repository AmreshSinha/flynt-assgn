import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { UpdateBookForm } from "@/components/UpdateBookForm/UpdateBookForm";
import { deleteBook } from "@/lib/api";

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    isbn: string;
    price: number;
}
export function BookCard({ id, title, author, isbn, price }: BookCardProps) {
    const onSubmit = async () => {
        const res = await deleteBook(id);
        if (res.id as string) {
            window.location.reload();
        }
    }
    return (
        <Card key={id}>
            <CardContent className="p-6 grid gap-4">
                <div className="grid gap-1">
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ISBN: {isbn.replace(/(\d{3})(\d{1})(\d{4})(\d{4})(\d{1})/, "$1-$2-$3-$4-$5")}</p>
                    <p className="font-semibold">Rs. {price}</p>
                </div>
                <div className="flex gap-2">
                <UpdateBookForm id={id} />
                    <Button className="text-red-500" size="sm" variant="outline" onClick={onSubmit}>
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}