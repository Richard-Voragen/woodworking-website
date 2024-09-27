"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition, startTransition } from "react";
import { deleteProduct, toggleProductAvailablility } from "../../(customerFacing)/_actions/products";
import { useRouter } from "next/navigation";
import { AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";


export function ActiveToggleDropdownItem({ id, isAvailableForPurchase } : {id: string, isAvailableForPurchase: boolean}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem 
            disabled={isPending}
            onClick={() => (
                startTransition(async () => {
                    await toggleProductAvailablility(id, !isAvailableForPurchase)
                    router.refresh()
                })
            )}
        >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    )
}

export function CreateAlertDialogContent({ id, disabled }: { id: string, disabled: boolean }) {
    const router = useRouter()

    if (disabled) return (
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Delete Unavailable</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be done likely due to sales of the product existing.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    )

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this product
                and remove its data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                variant="destructive"
                onClick={() => (
                    startTransition(async () => {
                        await deleteProduct(id)
                        router.refresh()
                    })
                )}
            >
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
  )
}

