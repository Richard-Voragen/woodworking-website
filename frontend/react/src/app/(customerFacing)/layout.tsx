import { LoginSignup } from "@/components/LoginSignup";
import { Nav, NavLink } from "@/components/nav";
import { useCookies } from "react-cookie";
import { confirmUserId } from "../actions/loginUser";

export const dynamic = "force-dynamic"

export default async function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
  
  return <>
    <Nav> 
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <LoginSignup />
    </Nav>
    <div className="container my-6">{children}</div>
  </>
}