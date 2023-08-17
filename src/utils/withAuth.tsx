import { ElementType } from "react"
import { useSession } from "next-auth/react";

export default function withAuth(Component: ElementType) {
    const { data } = useSession();
    if (!data) return null
    return <Component />
}
