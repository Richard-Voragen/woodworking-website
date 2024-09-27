"use client"

import { ProductForm } from "@/app/(customerFacing)/_components/ProductForm";
import { PageHeader } from "@/components/PageHeader";
import db from "@/db/db";

export default async function EditProductPage({ params: { id }}: { params: {id: string}}) {
    const product = await db.product.findUnique(
        { where: {id} }
    )
    return <>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product} />
    </>
}