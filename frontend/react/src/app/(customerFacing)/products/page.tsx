"use client"

import { Suspense } from "react";
import { cookies } from 'next/headers'
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCardSkeleton } from "@/components/ProductCard";
import { ProductSuspense } from "./_actions/ProductSuspense";

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

function ProductCards() {
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