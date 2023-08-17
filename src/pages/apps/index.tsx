import useApps from "@/features/Apps/hooks/useApps";
import { loadApps } from "@/features/Apps/ssr/loadApps";
import DashboardLayout from "@/layouts/DashboardLayout";
import withCSR from "@/utils/withCSR";
import { Button, Grid, Group, Loader, Title } from "@mantine/core";
import { Icon } from "@iconify/react";
import AppCard from "@/features/Apps/components/PreviewAppCard";

export const getServerSideProps = withCSR(loadApps);

export default function AppsPage() {
    const { data, refetch, isLoading } = useApps();

    return (
        <DashboardLayout>
            <Group position="apart" spacing={16} mb={32} mt={16} w={"100%"}>
                <Title order={3} weight={500}>
                    All Instances
                </Title>
                <Button
                    onClick={() => refetch()}
                    radius={20}
                    variant="outline"
                    color={"blue"}
                    fw={500}
                    uppercase
                    leftIcon={
                        <Icon
                            icon="fluent:arrow-sync-circle-24-regular"
                            fontSize={20}
                        />
                    }
                >
                    Refresh
                </Button>
            </Group>
            <Group spacing={16} w={"100%"} position="center">
                {isLoading && <Loader color="dark.9" />}

                {!isLoading && (
                    <Grid w={"100%"}>
                        {data?.map((app: any) => (
                            <AppCard app={app} key={app.pm_id} />
                        ))}
                    </Grid>
                )}
            </Group>
        </DashboardLayout>
    );
}
