import { Modal as ModalBase, Text } from "@mantine/core";
import { ModalRootProps } from "@mantine/core/lib/Modal/ModalRoot/ModalRoot";

type ModalProps = {
    children: React.ReactNode;
    title: string;
    opened: boolean;
    onClose: () => void;
    onTransitionEnd?: () => void;
} & ModalRootProps;

export default function Modal({ children, title, opened, onClose, onTransitionEnd, ...rest }: ModalProps) {
    return (
        <ModalBase.Root opened={opened} onClose={onClose} onTransitionEnd={() => !opened && onTransitionEnd && onTransitionEnd()} {...rest}>
            <ModalBase.Overlay blur={3} opacity={0.2} />
            <ModalBase.Content radius={"md"} miw={600}>
                <ModalBase.Header p={24}>
                    <ModalBase.Title>
                        <Text size={16} weight={600} transform={"uppercase"}>{title}</Text>
                    </ModalBase.Title>
                    <ModalBase.CloseButton size={24} />
                </ModalBase.Header>
                <ModalBase.Body p={24} >
                    {children}
                </ModalBase.Body>
            </ModalBase.Content>
        </ModalBase.Root>
    );
}
