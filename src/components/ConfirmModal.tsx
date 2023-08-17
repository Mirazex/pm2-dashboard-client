import { useModal } from "@/stores/useModal";
import { Button, Group, Stack } from "@mantine/core";

type TConfirmModal = {
    onDelete: (payload: any) => void;
    loading: boolean;
    children: React.ReactNode;
}

export default function ConfirmModal({ onDelete, loading,  children }: TConfirmModal) {
    const { payload, setClose } = useModal();

    return (
        <Stack spacing={0}>
            <Stack spacing={24}>
                {children}
            </Stack>
            <Group position={"right"} mt={24}>
                <Button color={"dark.9"} variant="filled" onClick={() => onDelete(payload)} fw={500} loading={loading}>Submit</Button>
                <Button variant="default" onClick={setClose} fw={500} loading={loading}>Cancel</Button>
            </Group>
        </Stack>
    );
}
