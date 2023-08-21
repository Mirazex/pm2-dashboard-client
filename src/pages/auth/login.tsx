import useLoginForm from "@/features/Auth/hooks/useLoginForm";
import CenteredLayout from "@/layouts/CenteredLayout";
import { useServers } from "@/stores/useServers";
import { Button, Divider, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";

export default function LoginPage() {
    const { form, login } = useLoginForm();
    const servers = useServers();

    return (
        <CenteredLayout>
            <Stack spacing={0} w={"100%"} maw={460} p={20}>
            <form>
                <Stack spacing={0} my={12}>
                    <Text align="center" size={32} weight={600} color={"dark.9"} inline>
                        Login to
                    </Text>
                    <Text align="center" size={32} weight={600} color={"green"}>
                        PM2 Dashboard
                    </Text>
                </Stack>

                <Stack spacing={24} my={24}>
                    <Controller name={"endpoint"} control={form.control} render={({ field, fieldState }) => (
                        <Select
                            placeholder="Start typing for select or create endpoint"
                            label="Endpoint"
                            variant="filled"
                            radius="md"
                            size="md"
                            withAsterisk
                            data={servers.endpoints}
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                            nothingFound="Nothing found"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onCreate={servers.add}
                            styles={(theme) => ({
                                item: {
                                    fontWeight: 500,
                                    // applies styles to selected item
                                    "&[data-selected]": {
                                        "&, &:hover": {
                                            backgroundColor: theme.colors.green,
                                        },
                                    },

                                    // applies styles to hovered item (with mouse or keyboard)
                                    "&[data-hovered]": {},
                                },
                            })}
                        />
                    )} />

                    <Divider my="0" color="gray.2" />

                    <Controller name={"username"} control={form.control} render={({ field, fieldState }) => (
                        <TextInput
                            placeholder="Enter devops username"
                            label="Username"
                            variant="filled"
                            radius="md"
                            size="md"
                            withAsterisk
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )} />

                    <Controller name={"password"} control={form.control} render={({ field, fieldState }) => (
                        <TextInput
                            placeholder="Enter your password"
                            label="Password"
                            variant="filled"
                            radius="md"
                            size="md"
                            withAsterisk
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )} />
                </Stack>

                <Divider my="0" color="gray.2" />


                    <Group my={24}>
                        <Button
                            size="md"
                            radius="md"
                            fullWidth
                            variant="filled"
                            color="dark.9"
                            fw={500}
                            loading={form.formState.isSubmitting}
                            onClick={login}
                            type="submit"
                            >
                            Login
                        </Button>
                    </Group>
                </form>
            </Stack>
        </CenteredLayout>
    );
}
