import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filter'
import { Pagination } from '@/components/native/pagination'
// import { Pagination } from '@/components/pagination'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Telefone</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <OrderTableRow />
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} perPage={10} totalCount={105} />
        </div>
      </div>
    </>
  )
}
