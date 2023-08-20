import { Button, Grid, Group, Loader, Stack } from "@mantine/core";
import { Icon } from "@iconify/react";
import Tab from "@/components/Tab";
import withCSR from "@/utils/withCSR";
import useApps from "@/features/Apps/hooks/useApps";
import { loadApps } from "@/features/Apps/ssr/loadApps";
import DashboardLayout from "@/layouts/DashboardLayout";
import AppCard from "@/features/Apps/components/PreviewAppCard";

export const getServerSideProps = withCSR(loadApps);

export default function AppsPage() {
    const { data, refetch, isLoading, isFetching } = useApps();

    return (
        <DashboardLayout rewriteSpacing={true}>
            <Group bg={"white"} px={48} w={"100%"} sx={{ boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)" }} position="apart" spacing={0}>
                <Tab label="Apps" />

                <Button onClick={() => refetch()} loading={isLoading || isFetching} color="dark" variant="filled" radius={6} fw={500} compact h={38} px={12} leftIcon={
                    <Icon icon={"fluent:arrow-sync-circle-24-regular"} fontSize={20} />
                }>Refresh</Button>
            </Group>

            <Stack py={24} px={48} spacing={24} w={"100%"}>
                {isLoading && <Loader color="dark.9" />}

                {!isLoading && (
                    <Grid>
                        {data?.map((app) => (
                            <Grid.Col key={app.id} sm={6} md={4} lg={4} xl={3} span={12}>
                                <AppCard app={app} />
                            </Grid.Col>
                        ))}
                    </Grid>
                )}
            </Stack>

        </DashboardLayout>
    );
}
