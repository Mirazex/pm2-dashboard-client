import { Stack, Text, createStyles } from "@mantine/core";
import { useRouter } from "next/router";

type LogTabProps = {
    label: string;
    queryValue: string;
}

const useStyles = createStyles((theme) => ({
    tab: {
        borderRadius: 100,
        padding: "0 8px",
        cursor: "pointer",
        border: 0,
        transition: "background .1s ease,color .1s ease",
        display: "flex",
        gap: 4,
        alignItems: "center",
        background: theme.colors.gray[3],
        color: theme.colors.dark[9],

        "&:hover": {
            background: theme.colors.dark[9],
            color: theme.white,
        },

        "&[data-active=true]": {
            background: theme.colors.dark[9],
            color: theme.white,
        }
    },
    label: {
        fontSize: 12,
        fontWeight: 500,
    }
}))


export default function LogTab({ label, queryValue }: LogTabProps) {
    const { classes } = useStyles()
    const router = useRouter()

    const isActive = router.query.type === queryValue;

    return (
        <Stack data-active={isActive} onClick={() => router.replace(`/apps/${router.query.appId}?type=${queryValue}`, undefined, { scroll: false })} className={classes.tab} px={16} py={2}>
            <Text fs={"14px"} className={classes.label}>{label}</Text>
        </Stack>
    )
}
