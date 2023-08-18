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
import { useRouter } from "next/router";
import { Fragment } from "react";


// {
//     cpu: 0,
//     memory: '0 bytes',
//     pm_out_log_path: 'C:\Users\ruben\.pm2\logs\app-out.log',
//     pm_err_log_path: 'C:\Users\ruben\.pm2\logs\app-error.log',
//     pm2_env_cwd: 'C:\Users\ruben\Desktop\Development\Self\WorkTracker\work-tracker-backend',
//     env_file: {
//         NODE_ENV: 'development',
//         PORT: '3000',
//         WS_PORT: '3001',
//         USER_JWT_SECRET: 'secret_here',
//         USER_JWT_EXPIRE: '31536000',
//         DATABASE_URL: 'postgresql://postgres:5521@localhost:5432/template'
//     }
// }

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

                {data?.env_file && (
                    <Fragment>
                        <Button onClick={() => modal.setOpen({ type: "view", payload: data?.env_file , name: "Environment Variables" })} color="gray.7" variant="light" radius={50} fw={500} compact h={38} px={12} leftIcon={
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
