"use client"

import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"
import { Resend } from "resend"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string)

export async function POST(req: NextRequest) {
    console.log("PAYMENT ACCEPTED")
    const event = await stripe.webhooks.constructEvent(
        await req.text(), 
        req.headers.get("stripe-signature") as string,
        process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productId = charge.metadata.productId
        const email = charge.billing_details.email
        //const priceInCents = charge.amount

        const product = await db.product.findUnique({
            where: { id: productId }
        })
        if (product == null || email == null) return new NextResponse("Bad Request", { status: 400 })

        /* const userFields = {
            email,
            orders: { create: { productId, priceInCents }}
        }
        const {
            orders: [order]
        } = await db.user.upsert({ 
            where: { email },
            create: userFields, 
            update: userFields,
            select: { orders: { orderBy: { createdAt: "desc"}, take: 1 } }
        }) */

        await db.downloadVerification.create({
            data: {
                productId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }
        })

        await resend.emails.send({
            from: `Support <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
            to: email,
            subject: "Order Confirmation",
            react: (
                <h1>Hi</h1>
            ),
        })
    }

    return new NextResponse()
}