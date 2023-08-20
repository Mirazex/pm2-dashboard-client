import Modal from "@/components/Modal";
import Tab from "@/components/Tab";
import DetailedAppDock from "@/features/Apps/components/DetailedDock";
import EnvModal from "@/features/Apps/components/EnvModal";
import useAppDetails from "@/features/Apps/hooks/useAppDetails";
import { loadAppDetails } from "@/features/Apps/ssr/loadAppDetails";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useModal } from "@/stores/useModal";
import withCSR from "@/utils/withCSR";
import { Icon } from "@iconify/react";
import { Button, Group } from "@mantine/core";
import { Fragment } from "react";

export const getServerSideProps = withCSR(loadAppDetails);

export default function AppDetails() {
    const modal = useModal()
    const { data } = useAppDetails()

    return (
        <DashboardLayout rewriteSpacing={true}>
            <DetailedAppDock />
            <Group bg={"white"} px={48} w={"100%"} sx={{ boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)" }} position="apart" spacing={0}>
                <Group>
                    <Tab label="logs" />
                </Group>

                {data?.environment && (
                    <Fragment>
                        <Button onClick={() => modal.setOpen({ type: "view", payload: data?.environment , name: "Environment Variables" })} color="gray.7" variant="light" radius={50} fw={500} compact h={38} px={12} leftIcon={
                            <Icon icon={"fluent:document-lock-20-regular"} fontSize={20} />
                        }>Environment Variables</Button>
                        <Modal opened={modal.open && ["Environment Variables"].includes(modal.name)} onClose={modal.setClose} onTransitionEnd={modal.clear} title={modal.name} centered>
                            <EnvModal />
                        </Modal>
                    </Fragment>
                )}
            </Group>
        </DashboardLayout>
    )
}
