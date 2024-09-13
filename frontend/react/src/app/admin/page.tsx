import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { act } from "react";

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { priceInCents: true },
        _count: true
    }) //does a sum and a count from the sql database

    return {
        amount: (data._sum.priceInCents || 1) / 100,
        numberOfSales: data._count
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([ //this calls await for all of the functions
        db.user.count(),
        db.order.aggregate({
            _sum: { priceInCents: true }
        })
    ]);

    return { 
        userCount,
        averageValuePerUser: userCount === 0 ? 
            0 : (orderData._sum.priceInCents || 0) / userCount / 100,
    }
}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([ //this calls await for all of the functions
        db.product.count({ where: { isAvailableForPurchase: true }}),
        db.product.count({ where: { isAvailableForPurchase: false }})
    ]);

    return { activeCount, inactiveCount };
}

export default async function AdminDashboard() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(), 
        getUserData(),
        getProductData()
    ]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ls:grid-cols-3 gap-4">
            <DashboardCard 
                title="Sales" 
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)} 
            />
            <DashboardCard 
                title="Customer" 
                subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Per User`}
                body={`${formatNumber(userData.averageValuePerUser)} Customers`}
            />
            <DashboardCard 
                title="Products" 
                subtitle={`${formatNumber(productData.inactiveCount)} Inactive Products`}
                body={`${formatNumber(productData.activeCount)} Active Products`}
            />
        </div>
    )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard({title, subtitle, body}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}