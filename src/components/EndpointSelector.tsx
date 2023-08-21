import { useEndpoint } from "@/stores/useEndpoint";
import { useServers } from "@/stores/useServers";
import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EndpointSelector() {
    const { endpoint, setValue } = useEndpoint();
    const queryClient = useQueryClient();
    const router = useRouter();
    const servers = useServers();

    const onChangeEndpoint = async (endpoint: string) => {
        router.replace("/apps");
        queryClient.clear();
        setValue(endpoint);
    };

    return (
        <Select
            placeholder="Start typing for select or create endpoint"
            variant="filled"
            radius="md"
            size="sm"
            data={servers.endpoints}
            value={endpoint || servers.endpoints[0]}
            onChange={onChangeEndpoint}
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Add "${query}"`}
            onCreate={servers.add}
            w={420}
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
    );
}
