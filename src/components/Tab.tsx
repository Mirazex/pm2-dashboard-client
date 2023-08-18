import { Stack, Text } from "@mantine/core";

export default function Tab({ label }: { label: string }) {
    return (
        <Stack px={12} py={16} sx={{ "&:before": { content: "''", position: "absolute", height: 2, background: "#000", zIndex: 1, width: "calc(100% - 18px)", bottom: 0, left: 10, right: 10 } }} pos={"relative"}>
            <Text color="dark.9" fs={"14px"} fw={400} transform="capitalize">{label}</Text>
        </Stack>
    )
}
