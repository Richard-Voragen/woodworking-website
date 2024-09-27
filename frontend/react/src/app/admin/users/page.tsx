import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import db from "@/db/db"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { MoreVertical } from "lucide-react"
  import { DeleteDropDownItem } from "./_components/UserActions"
  import { PageHeader } from "@/components/PageHeader"
  
  function getUsers() {
    return db.user.findMany({
      orderBy: { createdAt: "desc" },
    })
  }
  
  export default function UsersPage() {
    return (
      <>
        <PageHeader>Customers</PageHeader>
        <UsersTable />
      </>
    )
  }
  
  async function UsersTable() {
    const users = await getUsers()
  
    if (users.length === 0) return <p>No customers found</p>
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={user.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }