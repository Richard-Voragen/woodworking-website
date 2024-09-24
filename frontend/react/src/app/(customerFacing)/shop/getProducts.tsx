"use server"

import db from "@/db/db"
import { Suspense } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { cache } from "@/lib/cache";


const getProducts = cache(
    () => {
        return db.product.findMany({
            where: { isAvailableForPurchase: true },
            orderBy: { name: "asc" },
        })
    },
    ["/products", "getProducts"],
    {revalidate: 60 * 60 * 24}
)

export async function ProductSuspense() {
    const products = await getProducts()
    return products.map(product => 
        <ProductCard key={product.id} {...product} />
    )
}