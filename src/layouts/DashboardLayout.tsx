import Header from "@/components/Header";
import { Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {

    return (
        <Stack spacing={0} h={"100vh"} bg={"gray.0"}>
            <Header />
            <Stack spacing={0} px={16} pb={64} pt={16} mt={68} align="flex-start">
                {children}
            </Stack>
        </Stack>
    );
}
