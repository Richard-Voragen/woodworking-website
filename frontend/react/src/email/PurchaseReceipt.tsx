import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";


type PurchaseRecieptEmailProps = {
    product: {
        name: string
    }
}

PurchaseRecieptEmail.PreviewProps = {
    product: { name: "Product name" }, // this function adds the name to the website
} satisfies PurchaseRecieptEmailProps

export default function PurchaseRecieptEmail({ product }: PurchaseRecieptEmailProps) {
    return (
        <Html>
            <Preview>Download {product.name} and view reciept</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}