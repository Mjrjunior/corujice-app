import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";


export function ProductCreate() {
  const [name, setName] = useState('')
  const [ref, setRef] = useState('') 
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const postProduct = async () => {
    axios.post('http://localhost:3000/products', {
        name,
        reference: ref,
        price,
        stock
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    postProduct()
    window.location.reload()
  }
  return (
    <DialogContent>
        <DialogTitle>Criar produto</DialogTitle>
        <DialogDescription>
            Preencha os campos abaixo para criar um novo produto.
        </DialogDescription>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Nome do Produto" />
            <Label htmlFor="ref">Referência</Label>
            <Input onChange={(e) => setRef(e.target.value)} type="text" id="ref" placeholder="Referência" />
            <div className="flex gap-12">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="price">Preço</Label>
                    <Input onChange={(e) => setPrice(parseFloat(e.target.value))} type="number" id="price" step="0.01" placeholder="Preço" />
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor="stock">Estoque</Label>
                    <Input onChange={(e) => setStock(parseInt(e.target.value))} type="number" id="stock" min={0} placeholder="Estoque" />
                </div>
            </div>
            <Button variant="secondary" type="submit">
                Criar Produto
            </Button>
        </form>
    </DialogContent>
  )
}