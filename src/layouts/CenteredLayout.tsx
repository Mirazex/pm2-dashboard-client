import { Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function CenteredLayout({ children }: PropsWithChildren) {
    return (
        <Stack spacing={0} bg={"white"} mih={"100vh"}>
            <Stack p={20} align="center" my={"auto"}>
                {children}
            </Stack>
        </Stack>
    )
}
