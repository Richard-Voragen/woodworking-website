import db from "@/db/db";
import { cache } from "@/lib/cache";
import { LoginState } from "@/lib/loginState";
import { Suspense } from "react";
import { cookies } from 'next/headers'
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCardSkeleton } from "@/components/ProductCard";
import { ProductCard } from "../_components/ProductCard";

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

export default function UserProducts() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Your Products</PageHeader>
                <Button>
                    <Link href="/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductCards />
        </>
    )
}

export function ProductCards() {
    const cookieStore = cookies()
    const userId = cookieStore.get('user_id')

    if (userId?.value != null && userId?.value != "") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 ls:grid-cols-3 gap-4">
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductSuspense userId={userId!.value} />
                </Suspense>
            </div>
        )
    }

    return <p>You are not Logged in</p>
}

async function ProductSuspense({userId}: {userId: string}) {
    console.log(LoginState.getUserId)
    const products = await getProducts(userId)
    return products.map(product => 
        <ProductCard key={product.id} {...product} />
    )
}