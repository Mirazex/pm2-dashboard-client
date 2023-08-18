import { createPersistStore } from "@/utils/store";
import Cookies from "universal-cookie";

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
        new Cookies().set("endpoint", endpoint, { path: "/" })
        set({ endpoint }, false, "endpoint/set")
    },
} as TActions & TState));
