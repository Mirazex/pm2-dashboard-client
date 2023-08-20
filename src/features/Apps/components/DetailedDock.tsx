import { Icon } from "@iconify/react";
import { Box, Button, Group, Menu, Stack, Text, createStyles, useMantineTheme } from "@mantine/core";
import useAppControl from "@/features/Apps/hooks/useAppControl";
import useAppDetails from "@/features/Apps/hooks/useAppDetails";
import { humanizeMemorySize, humanizeUptime } from "@/utils/formatter";
import Link from "next/link";

const Statuses = {
    online: "Ready",
    stopping: "Stopping",
    stopped: "Stopped",
    launching: "Launching",
    errored: "Errored",
    "one-launch-status": "Launching"
} as any

const useStyles = createStyles(() => ({
    group: {
        flexGrow: 1
    }
}));

export default function DetailedAppDock() {
    const { data, refetch, isFetching } = useAppDetails();

    const theme = useMantineTheme()
    const { classes } = useStyles();

    const reload = useAppControl()
    const restart = useAppControl()
    const stop = useAppControl()

    return (
        <Group bg={"white"} py={48} px={48} w={"100%"} sx={{ boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)" }} align="flex-start" spacing={48}>
            <Stack spacing={24} justify="flex-start" align="flex-start" className={classes.group}>
                <Group spacing={16}>
                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>PM2 ID</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="dark.4">{data?.id}</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Name</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Icon icon="logos:nodejs-icon" fontSize={16} />
                                <Text weight={500} size={14} lh="18px" color="#539E43">{data?.name}</Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Group>

                <Group spacing={16}>
                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>CPU</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="orange.6">{data?.monit.cpu}%</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Memory</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="orange.6">{humanizeMemorySize(data?.monit.memory || 0)}</Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Group>
            </Stack>

            <Stack spacing={24} justify="flex-start">
                <Group spacing={16} position="apart">
                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Status</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Box bg={data?.state.status === "online" ? "teal" : "red"} h={10} w={10} sx={{ borderRadius: 20 }} />
                                <Text weight={500} size={14} lh="18px" color="dark.4">{Statuses[data?.state.status ?? "online"]}</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Uptime</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="dark.4">{humanizeUptime(data?.state.uptime || 0)}</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Total Restarts</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="dark.9">{String(data?.state.restart_count || 0)}</Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Group>

                <Stack spacing={24}>
                    <Stack spacing={0}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Repository</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Icon icon="fluent-mdl2:git-fork" fontSize={16} color={theme.colors.dark[4]} />
                                <Text maw={480} component={Link} href={data?.git.remote || ""} weight={400} size={14} lh="18px" sx={{ color: theme.colors.dark[4], ":hover": { textDecoration: "underline", color: theme.colors.dark[9] }}}>{data?.git.remote}</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack spacing={0}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Source</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Icon icon="fluent:branch-24-regular" fontSize={16} color={theme.colors.dark[4]} />
                                <Text component={Link} href={data?.git.branch.url || ""} weight={400} size={13.5} lh="18px" sx={{ color: theme.colors.dark[4], ":hover": { textDecoration: "underline", color: theme.colors.dark[9] }}}>{data?.git.branch.name}</Text>
                            </Group>
                            <Group spacing={8}>
                                <Icon icon="carbon:commit" fontSize={16} color={theme.colors.dark[4]} />
                                <Text maw={480} component={Link} href={data?.git.last_commit.url || ""} weight={400} size={14} lh="18px" truncate sx={{ color: theme.colors.dark[4], ":hover": { textDecoration: "underline", color: theme.colors.dark[9] }}}>
                                    <Text span truncate size={13.5} mr={8}>{data?.git.last_commit.hash}</Text>
                                    <Text span truncate inherit transform="capitalize" mr={8}>{data?.git.last_commit.message.title} {data?.git.last_commit.message.body}</Text>
                                    <Text span truncate inherit>by {data?.git.last_commit.author.name}</Text>
                                </Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack spacing={24} justify="flex-end" align="flex-end" className={classes.group}>
                <Group spacing={16} position="right" h={44}>

                    <Menu shadow="md" position="bottom-end" withArrow>
                        <Menu.Target>
                            <Button variant="outline" color="gray.3" fw={500} radius={6} px={0} py={0} w={40} h={40}>
                                <Icon icon="fluent:more-vertical-24-regular" fontSize={20} color={theme.colors.dark[9]} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => restart.mutate({ appId: String(data?.id), type: "restart" })}
                                icon={<Icon icon="solar:restart-square-outline" fontSize={18} />}
                            >
                                Restart
                            </Menu.Item>

                            <Menu.Item
                                onClick={() => reload.mutate({ appId: String(data?.id), type: "reload" })}
                                icon={<Icon icon="majesticons:reload-line" fontSize={18} />}
                            >
                                Reload
                            </Menu.Item>

                            <Menu.Item
                                onClick={() => stop.mutate({ appId: String(data?.id), type: "stop" })}
                                color="red"
                                icon={<Icon icon="bi:stop-circle" fontSize={18} />}
                            >
                                Stop
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <Button onClick={() => refetch()} loading={restart.isLoading || reload.isLoading || stop.isLoading || isFetching} w={200} color="dark.9" variant="filled" fw={500} radius={6} h={40}>
                        Refresh
                    </Button>
                </Group>

                <Group spacing={16}>
                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Environment</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="dark.4" transform="capitalize">{data?.environment?.NODE_ENV ?? "Production"}</Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Group>

                <Group spacing={16}>
                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Auto Restart</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color={data?.state.autorestart ? "teal" : "red"}>{String(data?.state.autorestart ? "Enabled" : "Disabled")}</Text>
                            </Group>
                        </Stack>
                    </Stack>

                    <Stack spacing={0} maw={140} w={140} sx={{ flex: "auto" }}>
                        <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Node Version</Text>
                        <Stack spacing={8}>
                            <Group spacing={8}>
                                <Text weight={500} size={14} lh="18px" color="dark.4">v{data?.state.node_version}</Text>
                            </Group>
                        </Stack>
                    </Stack>
                </Group>

            </Stack>
        </Group>
    )
}
