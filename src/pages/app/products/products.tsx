import { Helmet } from "react-helmet-async";
import { ProductCreate } from "./product-create";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/native/pagination";
import { ProductTableRow } from "./product-table-row";

export function Products() {

    return (
        <>
        <Helmet title="Produtos" />
        <div className="flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs" type="button">
                        Adicionar Produto
                        </Button>
                    </DialogTrigger>
                <ProductCreate />
                </Dialog>
            </div>
            <div className="space-y-2.5">
          <div className="rounded-md border mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Referência</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="w-[100px]">Estoque</TableHead>
                  <TableHead className="w-[120px]">Preço</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <ProductTableRow />
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} perPage={10} totalCount={105} />
        </div>
        </div>
        </>
    )
}