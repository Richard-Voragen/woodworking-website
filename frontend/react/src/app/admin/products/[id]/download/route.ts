"use client"

//import { notFound } from "next/navigation"
import { NextRequest } from "next/server"
//import fs from "fs/promises"
//import db from "@/db/db"
import { downloadFile } from "./download"

export async function GET(
    req: NextRequest, 
    { params: {id}} : {params: { id: string }}
) { 
    return await downloadFile(req, id)
/*     const product = await db.product.findUnique({
        where: { id },
        select: { filePath: true, name: true },
    })

    if (product == null) return notFound()

    const { size } = await fs.stat(product.filePath)
    const file = await fs.readFile(product.filePath)
    const extension = product.filePath.split(".").pop()

    return new NextResponse(file, { 
        headers: {
            "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
            "Content-Length": size.toString(),
        }
    }) */
}