import { Search} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { OrderDetails } from './order-datails'
import axios from 'axios'
import { useEffect, useState } from 'react'

type Order = {
  id: number
  clientName: string
  phone: string
  priceTotal: number

}

export function OrderTableRow() {
 const [orders, setOrders] = useState<Order[]>([])

 useEffect(() => {
    axios.get('http://localhost:3000/orders').then((response) => {
      setOrders(response.data)
    })
  }
  , [])
  return (
    <>
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>

            <OrderDetails />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.id}
        </TableCell>
        <TableCell className="font-medium">{order.phone}</TableCell>
        <TableCell className="font-medium">
          {order.clientName}
        </TableCell>
        <TableCell className="font-medium">R$ {(order.priceTotal).toFixed(2)}</TableCell>
        </TableRow>
      ))}
    </>
  )
}
