import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}

export function ProductCard({ id, name, priceInCents, description, imagePath }: ProductCardProps) {
    return (
        <Card className="flex overflow-hidden flex-col">
            <div className="relative w-full h-auto aspect-video">
                <Image src={imagePath} fill alt={name} />
            </div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size="lg" className="w-full">
                    <Link href={`/products/${id}/edit`}>Edit</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}