import { Icon } from "@iconify/react";
import { Badge, Card, Flex, Grid, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useHover } from '@mantine/hooks';
import { humanizeMemorySize, humanizeUptime } from "@/utils/formatter";

type AppCardProps = {
    app: Application;
}

const Statuses = {
    online: "Ready",
    stopping: "Stopping",
    stopped: "Stopped",
    launching: "Launching",
    errored: "Errored",
    "one-launch-status": "Launching"
} as any

export default function PreviewAppCard({ app }: AppCardProps) {
    const { hovered, ref } = useHover();

    return (
        <Link href={`/apps/${app.id}?type=logs`} style={{ textDecoration: 'none' }}>
            <Card ref={ref} shadow={hovered ? "sm" : "xs"} padding={24} radius="md" sx={{ cursor: "pointer", transition: "box-shadow .250s ease" }}>
                <Card.Section py={24} px={24}>
                    <Group position="apart" align="flex-start">
                        <Group spacing={16}>
                            <Icon icon="skill-icons:nodejs-dark" fontSize={48} />
                            <Stack spacing={4}>
                                <Text color="dark.9" weight={500} size={20} lh={"24px"}>{app.name}</Text>
                                <Text color="dimmed" weight={500} size={14} lh={"20px"}>ID: {app.id}</Text>
                            </Stack>
                        </Group>

                        <Stack>
                            <Badge size="md" radius={4} color={app.state.status === "online" ? "teal" : "red"}>{Statuses[app.state.status]}</Badge>
                        </Stack>
                    </Group>
                </Card.Section>
                <Card.Section py={12} px={24} withBorder>
                    <Group position="apart">
                        <Stack spacing={0} align="flex-start">
                            <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={4}>Uptime</Text>
                            <Text weight={500} size={14} lh="18px" color="dark.4">{humanizeUptime(app.state.uptime || 0)}</Text>
                        </Stack>

                        <Stack spacing={0} align="flex-start">
                            <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>CPU</Text>
                            <Text weight={500} size={14} lh="18px" color="orange.6" truncate>{app.monit.cpu}%</Text>
                        </Stack>

                        <Stack spacing={0} align="flex-end">
                            <Text color={"dimmed"} weight={400} size={13} lh={"18px"} transform="capitalize" mb={8}>Memory</Text>
                            <Text weight={500} size={14} lh="18px" color="orange.6" truncate>{humanizeMemorySize(app.monit.memory || 0)}</Text>
                        </Stack>
                    </Group>
                </Card.Section>

            </Card>
        </Link>
    )
}
