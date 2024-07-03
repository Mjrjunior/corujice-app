import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import axios from 'axios'

type Product = {
  id: number
  name: string
  price: number
}


export function OrderCreate() {
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [inputValues, setInputValues] = useState<number[]>([])
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [clientName, setClientName] = useState(''); // Adicione o estado para o nome do cliente  (1/2)
  const [phone, setPhone] = useState(''); // Adicione o estado para o telefone do cliente  (1/2)                         

  const handleProductChange = (event: { target: { value: unknown } }) => {
    const productId = Number(event.target.value)
    const product = products.find((product) => product.id === productId)
    if (product) {
      setSelectedProduct(product)
      setInputValues([...inputValues, 1])
    }
  }

  useEffect(() => {
    const newTotal = selectedProducts.reduce((acc, product, index) => {
      if (product) {
        return acc + product.price * inputValues[index]
      } else {
        return acc
      }
    }, 0)
    setTotal(newTotal)
  }, [inputValues, selectedProducts])

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((response) => {
      setProducts(response.data)
    })
  }, [])

  const handleAddProduct = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (selectedProduct) {
      setSelectedProducts([...selectedProducts, selectedProduct])
    }
  }

  const orderData = {
    clientName: clientName,
    phone: phone,
    itens: selectedProducts.map((product, index) => ({
      productId: product.id,
      quantity: inputValues[index] || 1, 
    })),
    priceTotal: total,
  };
  
  const postOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3000/orders', orderData);
      console.log('Ordem criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar a ordem:', error); 
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postOrder(); 
    window.location.reload();
  };
  



  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Pedido</DialogTitle>
        <DialogDescription>Criar um novo pedido</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Label htmlFor="cliente">Cliente</Label>
        <Input onChange={(e) => setClientName(e.target.value)} type="text" id="cliente" placeholder="Cliente" />
        <Label htmlFor="phone">Telefone</Label>
        <Input onChange={(e) => setPhone(e.target.value)} type="tel" id="phone" placeholder="Telefone" />
        <div className="w-180 flex h-8 gap-3">
          <select
            value={selectedProduct ? selectedProduct?.id : ''}
            onChange={handleProductChange}
            className="h-8 w-[220px] rounded-md border border-input bg-secondary text-center text-sm font-semibold"
          >
            <option disabled value="">
              Selecione um produto
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id} className="text-left">
                {product.name}
              </option>
            ))}
          </select>
          <Button
            className="h-8"
            variant="secondary"
            onClick={handleAddProduct}
          >
            Adicionar
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Qtd.</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product?.name}</TableCell>
                <TableCell>R$ {product?.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Input
                    value={inputValues[index]}
                    onChange={(e) => {
                      const newInputValues = [...inputValues]
                      newInputValues[index] = Number(e.target.value)
                      setInputValues(newInputValues)
                    }}
                    min="1"
                    type="number"
                    className="w-14 text-center no-spin"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-semibold">
                R$ {total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Button variant="secondary" type="submit">
          Criar Pedido
        </Button>
      </form>
    </DialogContent>
  )
}
