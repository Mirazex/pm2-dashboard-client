import { createPersistStore } from "@/utils/store";

type TState = {
    endpoint: string;
}

type TActions = {
    setValue: (endpoint: string) => void;
}

const State: TState = {
    endpoint: ""
};

export const useEndpoint = createPersistStore("endpoint", (set: any) => ({
    ...State,
    setValue: (endpoint) => {
        set({ endpoint }, false, "endpoint/set")
    },
} as TActions & TState));
