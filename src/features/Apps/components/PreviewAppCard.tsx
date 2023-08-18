import { Icon } from "@iconify/react";
import { Badge, Card, Flex, Grid, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useHover } from '@mantine/hooks';

type AppCardProps = {
    app: any
}

export default function PreviewAppCard({ app}: AppCardProps) {
    const { hovered, ref } = useHover();

    return (
        <Link href={`/apps/${app.pm_id}`} style={{ textDecoration: 'none' }}>
            <Card ref={ref} shadow={hovered ? "sm" : "xs"} padding={24} radius="md" sx={{ cursor: "pointer", transition: "box-shadow .250s ease" }}>
                <Card.Section py={24} px={24}>
                    <Group position="apart">
                        <Group align="center">
                            <Group spacing={16}>
                                <Flex bg={"dark.9"} w={32} h={32} align={"center"} justify={"center"} sx={{ borderRadius: 50 }}>
                                    <Icon icon="fluent:box-16-regular" color={"white"} fontSize={20} />
                                </Flex>
                                <Text color="black.9" weight={500} size={"lg"}>{app.name}</Text>
                            </Group>
                        </Group>
                        <Group>
                            <Badge size="md" radius={4} color={app.status === "online" ? "teal" : "red"}>{app.status}</Badge>
                        </Group>
                    </Group>
                </Card.Section>
                <Card.Section py={24} px={24}>
                    <Grid>
                        <Grid.Col span={12/3}>
                            <Group position="left">
                                <Stack spacing={8}>
                                    <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Uptime</Text>
                                    <Text color={"dark.9"} weight={500} fs="14px" lh="16px" transform="capitalize" truncate>{app?.uptime}</Text>
                                </Stack>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={12/3}>
                            <Group position="center">
                                <Stack spacing={8}>
                                    <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">CPU</Text>
                                    <Text color="orange" weight={500} fs="14px" lh="16px" truncate>{app?.cpu}%</Text>
                                </Stack>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={12/3}>
                            <Group position="right">
                                <Stack spacing={8}>
                                    <Text color={"gray.6"} weight={400} fs={"13px"} lh={"14px"} transform="capitalize">Memory</Text>
                                    <Text color={"orange"} weight={500} fs="14px" lh="16px" transform="capitalize" truncate>{app?.memory}</Text>
                                </Stack>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Card.Section>

            </Card>
        </Link>
    )
}
