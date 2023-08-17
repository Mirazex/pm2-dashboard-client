import { servers } from "@/constants/servers"
import { useEndpoint } from "@/stores/useEndpoint"
import { Select } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EndpointSelector() {
    const { endpoint, setValue } = useEndpoint()
    const queryClient = useQueryClient();
    const router = useRouter()

    const onChangeEndpoint = async (endpoint: string) => {
        router.replace("/apps")
        queryClient.clear();
        setValue(endpoint)
    }
    return (
        <Select
            placeholder="Pick one server"
            variant="filled"
            radius="md"
            size="md"
            withAsterisk
            data={servers.map((v) => ({ value: v, label: v }))}
            value={endpoint}
            onChange={onChangeEndpoint}
            w={420}
        />
    )
}
