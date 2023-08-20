import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button, Flex, Group, Text, createStyles } from "@mantine/core";
import dynamic from "next/dynamic";
import { Fragment } from "react";

const EndpointSelector = dynamic(() => import("@/components/EndpointSelector"), { ssr: false });

const useStyles = createStyles(() => ({
    wrapper: {
        position: "fixed",
        top: 0,
        zIndex: 101,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        transition: "box-shadow .1s ease 0s, background-color .1s ease 0s",
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            backdropFilter: "saturate(180%) blur(5px)",
            backfaceVisibility: "hidden",
            zIndex: -1,
            top: -1,
            transform: "translateZ(0)",
        },
    },
    logo: {
        height: "100%",
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function Header() {
    const { classes } = useStyles();
    const session = useSession();

    return (
        <Fragment>
        <Flex className={classes.wrapper} w={"100%"} mih={68} py={16} px={48}>
            <Group spacing={8} sx={{ flex: 1 }} position="left">
                <Link className={classes.logo} href={"/"} scroll={true}>
                    <Text color="green" weight={600} size={20} lh={"20px"}>
                        PM2{" "}
                        <Text color="dark.9" span>
                            Dashboard
                        </Text>
                    </Text>
                </Link>
            </Group>

            <Group>
            {session.data?.user.token && (
                <EndpointSelector />
            )}
            </Group>

            <Group sx={{ flex: 1}} position="right">
            {session.data?.user.token && (
                <Button
                    variant="default"
                    color="dark"
                    fw={500}
                    radius={"md"}
                    onClick={() => signOut()}
                >
                    Logout
                </Button>
            )}
            </Group>
        </Flex>
        <Flex mih={74} bg={"white"} />
        </Fragment>
    );
}
