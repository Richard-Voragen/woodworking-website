"use server"

import db from "@/db/db";
import { cache } from "@/lib/cache";
import { LoginState } from "@/lib/loginState";
import { ProductCard } from "../../_components/ProductCard";

const getProducts = cache(
    (userId: string) => {
        return db.product.findMany({
            where: { 
                isAvailableForPurchase: true,
                ownerId: userId,
             },
            orderBy: { name: "asc" },
        })
    },
    ["/products", "getProducts"],
    {revalidate: 60}
)

export async function ProductSuspense({userId}: {userId: string}) {
    console.log(LoginState.getUserId)
    const products = await getProducts(userId)
    return products.map(product => 
        <ProductCard key={product.id} {...product} />
    )
}