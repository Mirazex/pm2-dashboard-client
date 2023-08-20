import Header from "@/components/Header";
import { DefaultMantineColor, Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children, bg, rewriteSpacing  }: PropsWithChildren<{ bg?: DefaultMantineColor, rewriteSpacing?: boolean }>) {

    return (
        <Stack spacing={0} h={"100vh"} bg={bg ?? "gray.0"}>
            <Header />
            <Stack spacing={0} px={rewriteSpacing ? 0 : 16} pb={rewriteSpacing ? 0 : 64} pt={rewriteSpacing ? 0 : 16} align="flex-start">
                {children}
            </Stack>
        </Stack>
    );
}
