import AppLayout from "@/layouts/AppLayout";
import { loadAppDetails } from "@/features/Apps/ssr/loadAppDetails";
import { Button, Group, Loader, Text } from "@mantine/core";
import LogTab from "@/components/LogTab";
import useLogs from "@/features/Logs/hooks/useLogs";
import { Roboto_Mono } from "next/font/google";
import dayjs from "dayjs";

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const getServerSideProps = loadAppDetails;

export default function AppDetails() {
    const { isLoading, items, isFetchingNextPage, hasNextPage, fetchNextPage } = useLogs({
        limit: 30
    })

    return (
        <AppLayout>
            <Group px={0} py={12}>
                <Group maw={1200} w={"100%"} position="apart" m={"auto"}>
                    <Group spacing={16} px={24} h={36}>
                        <LogTab label="All logs" queryValue="logs" />
                        <LogTab label="Errors" queryValue="errors" />
                    </Group>
                    {hasNextPage && (
                        <Group px={24}>
                            <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage} variant="filled" color="dark.9">
                                Expand more
                            </Button>
                        </Group>
                    )}
                </Group>
            </Group>

            {(isLoading || isFetchingNextPage) && (
                <Group px={0} py={12} maw={1200} mx={"auto"}>
                    <Loader color="dark" />
                </Group>
            )}

            <table style={{ maxWidth: "1200px", marginInline: "auto" }}>
                <tbody>
                {items.map((line: any, idx: number) => (
                    <tr key={idx}>
                        <td style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 2, paddingBottom: 2 }}>
                            <Text span size={14} color={"dark.9"} ff={robotoMono.style.fontFamily} truncate>
                                {/* format date to humanize */}
                                {dayjs(line.timestamp).format("YYYY/MM/DD HH:mm:ss")}
                            </Text>
                        </td>
                        <td style={{ paddingRight: 24, paddingTop: 2, paddingBottom: 2, width: "100%" }}>
                            <Text span size={14} color={"dark.9"} ff={robotoMono.style.fontFamily}>{line.message}</Text>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </AppLayout>
    )
}
