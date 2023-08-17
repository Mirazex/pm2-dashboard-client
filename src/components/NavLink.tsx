import Link from "next/link";
import { useRouter } from "next/router";

type TNavLinkProps = {
    href: string;
    exact?: boolean;
    children: React.ReactNode;
    className?: string;
};

export default function NavLink({
    href,
    exact = false,
    children,
    ...props
}: TNavLinkProps) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += " active";
    }

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}
