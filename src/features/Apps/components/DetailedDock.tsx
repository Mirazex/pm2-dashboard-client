import { Icon } from "@iconify/react";
import { Box, Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import useAppControl from "@/features/Apps/hooks/useAppControl";
import useAppDetails from "@/features/Apps/hooks/useAppDetails";

export default function DetailedAppDock() {
    const { data, refetch, isFetching } = useAppDetails();

    const theme = useMantineTheme()

    const reload = useAppControl({ queryKey: ["APP", { appId: String(data?.pm_id) }] })
    const restart = useAppControl({ queryKey: ["APP", { appId: String(data?.pm_id) }] })
    const stop = useAppControl({ queryKey: ["APP", { appId: String(data?.pm_id) }] })

    return (
        <Group bg={"white"} py={48} px={48} w={"100%"} sx={{ boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)" }} position="apart" spacing={0}>
            <Group h={"100%"} spacing={48} align="flex-start" sx={{ flex: 1 }}>
                <Stack spacing={48}>
                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Instance Id</Text>
                        <Text color="dark.9" weight={500} fs="14px" lh="16px">{data?.pm_id}</Text>
                    </Stack>

                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Environment</Text>
                        <Text color="dark.9" weight={500} fs="14px" lh="16px" transform="capitalize">{data?.env_file?.NODE_ENV ?? "Production"}</Text>
                    </Stack>

                </Stack>
                <Stack spacing={48}>
                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">App Name</Text>
                        <Text color="dark.9" weight={500} fs="14px" lh="16px">{data?.name}</Text>
                    </Stack>

                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Uptime</Text>
                        <Text color={"dark.9"} weight={500} fs="14px" lh="16px" transform="capitalize">{data?.uptime}</Text>
                    </Stack>
                </Stack>
                <Stack spacing={48}>
                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Status</Text>
                        <Group spacing={8}>
                            <Box bg={data?.status === "online" ? "teal" : "red"} h={10} w={10} sx={{ borderRadius: 20 }} />
                            <Text color={"dark.9"} weight={500} fs="14px" lh="16px" transform="capitalize">{data?.status}</Text>
                        </Group>
                    </Stack>
                </Stack>
            </Group>
            <Group h={"100%"} spacing={48} align="flex-start">
                <Stack spacing={48}>
                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">CPU</Text>
                        <Text color="orange" weight={500} fs="14px" lh="16px">{data?.cpu}%</Text>
                    </Stack>

                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Git Branch</Text>
                        <Group spacing={8}>
                            <Icon icon="fluent:branch-24-regular" fontSize={20} color={theme.colors.dark[4]} />
                            <Text color="dark.9" weight={500} fs="14px" lh="16px">{data?.git_branch}</Text>
                        </Group>
                    </Stack>
                </Stack>
                <Stack spacing={48}>
                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Memory</Text>
                        <Text color={"orange"} weight={500} fs="14px" lh="16px" transform="capitalize">{data?.memory}</Text>
                    </Stack>

                    <Stack spacing={8}>
                        <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Git Commit</Text>
                        <Group spacing={8}>
                            <Icon icon="carbon:commit" fontSize={20} color={theme.colors.dark[4]} />
                            <Text color="dark.9" weight={500} fs="14px" lh="16px">{data?.git_commit}</Text>
                        </Group>
                    </Stack>
                </Stack>

            </Group>
            <Group h={"100%"} spacing={8} align="flex-start" position="right" sx={{ flex: 1 }}>
                <Button color="dark.9" variant="outline" uppercase fw={500} radius={6} onClick={() => refetch()} loading={isFetching}>Refresh</Button>
                <Button color="dark.9" variant="filled" uppercase fw={500} radius={6} onClick={() => reload.mutate({ appId: data?.pm_id, type: "reload" })} loading={reload.isLoading}>Reload</Button>
                <Button color="indigo" variant="filled" uppercase fw={500} radius={6} onClick={() => restart.mutate({ appId: data?.pm_id, type: "restart" })} loading={restart.isLoading}>Restart</Button>
                <Button color="red" variant="filled" uppercase fw={500} radius={6} onClick={() => stop.mutate({ appId: data?.pm_id, type: "stop" })} loading={stop.isLoading}>Stop</Button>
            </Group>
        </Group>
    )
}
