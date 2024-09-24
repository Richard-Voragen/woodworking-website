import exp from "constants";
import { PageHeader } from "../../../components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, CreateAlertDialogContent } from "../_components/ProductActions";
import { AlertDialogTrigger, AlertDialog } from "@/components/ui/alert-dialog";
import { getEmailFromId } from "@/lib/checkEmail";

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductsTable />
        </>
    )
}

async function ProductsTable() {
    const products = await db.product.findMany({ 
        select: { 
            id: true,
            name: true,
            ownerId: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true }}
        },
        orderBy: { name: "asc" }
    })

    if (products.length === 0) return <p>No products found</p>

    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className="sr-only">Available For Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map(product => (
                <TableRow key={product.id}>
                    <TableCell>
                        {product.isAvailableForPurchase ? (
                        <>
                            <span className="sr-only">Available</span>
                            <CheckCircle2 color="green" />
                        </>
                        ) : (
                        <>
                            <span className="sr-only">Unavailable</span>
                            <XCircle className="stroke-destructive" />
                        </>
                        )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{getEmailFromId(product.ownerId)}</TableCell>
                    <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                    <TableCell>{formatNumber(product._count.orders)}</TableCell>
                    <TableCell>
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                            Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator />
                                    <AlertDialogTrigger>
                                        <DropdownMenuItem variant="destructive">
                                            Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <CreateAlertDialogContent id={product.id} disabled={false} />
                        </AlertDialog>

                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}