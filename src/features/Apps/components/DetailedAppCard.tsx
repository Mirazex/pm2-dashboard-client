import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button, Card, Grid, Group, Text, useMantineTheme } from "@mantine/core";;
import useAppControl from "../hooks/useAppControl";

export default function DetailedAppCard({ app }: { app: any }) {
    const theme = useMantineTheme();

    const reload = useAppControl()
    const restart = useAppControl()
    const stop = useAppControl()

    return (
        <Card shadow="sm" padding="lg" radius="md">
            <Card.Section py="md" px={"md"}>
                <Group position="apart">
                    <Group align="center">
                        <Group spacing={8}>
                            <Icon icon="fluent:box-16-regular" color={theme.colors.blue['9']} fontSize={20} />
                            <Text color="black.9" weight={500} size={"lg"}>{app.name}</Text>
                        </Group>
                    </Group>
                    <Group>
                        <Badge radius={4} color={app.status === "online" ? "teal" : "red"}>{app.status}</Badge>
                    </Group>
                </Group>
            </Card.Section>
            <Card.Section withBorder py="xl" px={"md"}>
                <Grid>
                    <Grid.Col span={6}>
                        <Group spacing={6}>
                            <Text color={"gray"} weight={500}>ID:</Text>
                            <Text color={"orange"}>{app.pm_id}</Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Group spacing={6}>
                            <Text color={"gray"} weight={500}>Uptime:</Text>
                            <Text color={"orange"}>{app.uptime}</Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Group spacing={6}>
                            <Text color={"gray"} weight={500}>CPU:</Text>
                            <Text color={"orange"}>{app.cpu}%</Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Group spacing={6}>
                            <Text color={"gray"} weight={500}>Memory:</Text>
                            <Text color={"orange"}>{app.memory}</Text>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Card.Section py="md" px={"md"}>
                <Grid>
                    <Grid.Col span={12/3}>
                        <Button onClick={() => reload.mutateAsync({ appId: app.pm_id, type: "reload" })} loading={reload.isLoading} radius={6} variant="light" color={"green"} fullWidth fw={500} uppercase leftIcon={
                            <Icon icon="fluent:arrow-sync-circle-24-regular" fontSize={20} />
                        }><Text>Reload</Text></Button>
                    </Grid.Col>
                    <Grid.Col span={12/3}>
                        <Button onClick={() => restart.mutateAsync({ appId: app.pm_id, type: "restart" })} loading={restart.isLoading} radius={6} variant="light" color={"blue"} fullWidth fw={500} uppercase leftIcon={
                            <Icon icon="fluent:arrow-clockwise-24-filled" fontSize={20} />
                        }>Restart</Button>
                    </Grid.Col>
                    <Grid.Col span={12/3}>
                        <Button onClick={() => stop.mutateAsync({ appId: app.pm_id, type: "stop" })} loading={stop.isLoading} radius={6} variant="light" color={"red"} fullWidth fw={500} uppercase leftIcon={
                            <Icon icon="fluent:record-stop-24-filled" fontSize={20} />
                        }>Stop</Button>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    )
}
