import { useModal } from "@/stores/useModal";
import { Button, Group, Stack, TextInput } from "@mantine/core";

export default function EnvModal() {
    const { payload, setClose } = useModal();

    const values = Object.keys(payload ?? {});

    return (
        <Stack spacing={0}>
            <Stack spacing={24}>
                {values.map((key) => (
                    <Group key={key} spacing={4} w={"100%"} noWrap>
                        <TextInput
                            label="Key"
                            variant="filled"
                            value={key}
                            readOnly
                        />
                        <TextInput
                            label="Value"
                            value={payload[key]}
                            variant="filled"
                            readOnly
                            sx={{ flex: 1 }}
                        />
                    </Group>
                ))}
            </Stack>
            <Group position={"right"} mt={24}>
                <Button
                    variant="filled"
                    color="dark.9"
                    onClick={setClose}
                    fw={500}
                    uppercase
                >
                    Ok
                </Button>
            </Group>
        </Stack>
    );
}
