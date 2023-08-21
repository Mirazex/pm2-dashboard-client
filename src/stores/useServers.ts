import { createPersistStore } from "@/utils/store";
import Cookies from "universal-cookie";

type TState = {
    endpoints: string[];
}

type TActions = {
    add: (endpoint: string) => void;
    remove: (idx: number) => void;
    update: (idx: number, endpoint: string) => void;
}

const State: TState = {
    endpoints: []
};

export const useServers = createPersistStore("servers", (set: any, get: () => TState) => ({
    ...State,
    add: (endpoint) => {
        const endpoints = [...get().endpoints, endpoint];
        set({ endpoints }, false, "servers/add");
    },
    remove: (idx) => {
        const endpoints = get().endpoints.filter((_, i) => i !== idx);
        set({ endpoints }, false, "servers/remove");
    },
    update: (idx, endpoint) => {
        const endpoints = get().endpoints.map((e, i) => i === idx ? endpoint : e);
        set({ endpoints }, false, "servers/update");
    },
} as TActions & TState));
