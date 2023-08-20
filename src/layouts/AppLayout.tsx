import DetailedAppDock from "@/features/Apps/components/DetailedDock";
import useAppDetails from "@/features/Apps/hooks/useAppDetails";
import DashboardLayout from "@/layouts/DashboardLayout";

import { Accordion, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    const router = useRouter()
    useAppDetails();

    return (
        <DashboardLayout rewriteSpacing={true}>
            <DetailedAppDock />
            <Stack w={"100%"}>
                <Accordion defaultValue={"logs"} variant="filled">
                    <Accordion.Item value="logs">
                        <Accordion.Control
                            sx={{
                                background: "white",
                                color: "black",

                                "&:hover": {
                                    background: "black",
                                    color: "white",
                                },
                                "&[data-active]": {
                                    backgroundColor: "black",
                                    color: "white",
                                },
                            }}
                            onClick={() => router.replace(`/apps/${router.query.appId}?type=logs`)}
                        >
                            Logs
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack
                                mih={"calc(100vh - 146px)"}
                                w={"100%"}
                                spacing={5}
                            >
                                {children}
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Stack>
        </DashboardLayout>
    );
}
