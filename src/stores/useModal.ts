import { createStore } from "@/utils/store";

type TState = {
    open: boolean;
    type: "create" | "edit" | "delete";
    name: string;
    payload: any;
}

type TActions = {
    setOpen: ({ type, payload, name }: { type: TState['type']; payload: TState['payload']; name: TState['name'] }) => void;
    setClose: () => void;
    clear: () => void;
}

const State: TState = {
    open: false,
    type: "create",
    name: "",
    payload: null
};

export const useModal = createStore("modal", (set: any) => ({
    ...State,
    setOpen: ({ type, payload, name }) => {
        set({ open: true, type, payload, name }, false, "modal/setOpen")
    },
    setClose: () => set({ open: false }, false, "modal/setClose"),
    clear: () => set(State, false, "modal/clear")
} as TActions & TState));
