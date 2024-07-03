import { TableCell, TableRow } from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"

type Product = {
    id: number
    reference: string
    name: string
    stock: number
    price: number
}


export function ProductTableRow() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        axios.get('http://localhost:3000/products').then((response) => {
            setProducts(response.data);
        });
    }, []);
    
    return (
        <>
            {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell className="font-mono text-xs font-medium">
                        {product.id}
                    </TableCell>
                    <TableCell className="font-medium">{product.reference}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-medium">{product.stock}</TableCell>
                    <TableCell className="font-medium">R$ {(product.price).toFixed(2)}</TableCell>
                </TableRow>
            ))}
        </>
    )
}