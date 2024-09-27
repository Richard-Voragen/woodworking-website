  "use client"

  import { LoginSignup } from "@/components/LoginSignup";
  import { Nav, NavLink } from "@/components/nav";
  import { startTransition, useState } from "react";
  import { LoginState } from "@/lib/loginState";

  export const dynamic = "force-dynamic"

  export default function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {

  const loginState = LoginState.getInstance()
  const [userId, setUserId] = useState("")

  loginState.logout(userId)

    return <>
      <Nav> 
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          {loginState.isLoggedIn()? 
          ( <>
          <NavLink href="/products">My Products</NavLink>
          <NavLink href="/orders">My Orders</NavLink>
          <NavLink href="/about">About</NavLink>
          <button
            onClick={() => (
              startTransition(() => {
                setUserId("logout")
                window.location.reload()
              })
            )}>
              <NavLink href="">
                Logout
              </NavLink>
          </button>
          </>) : ( <>
            {/* <NavLink href="/about">About</NavLink> */}
            <LoginSignup /> 
          </>)
        }
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  }