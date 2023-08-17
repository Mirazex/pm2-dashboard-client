// import Header from "@/components/Header";
import { Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function CenteredLayout({ children }: PropsWithChildren) {
    return (
        <Stack spacing={0}>
            {/* <Header /> */}
            <Stack p={20} h={"100vh"} align="center" justify="center">
                {children}
            </Stack>
        </Stack>
    )
}
