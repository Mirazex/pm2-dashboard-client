type Application = {
    id: number;
    name: string;
    monit: {
        memory: number;
        cpu: number;
    };
    cwd: string;
    logs: {
        output: string;
        error: string;
    };
    state: {
        status: string;
        autorestart: boolean;
        uptime: number;
        restart_count: number;
        node_version: string;
    };
};

type ApplicationDetails = {
    id: number;
    name: string;
    monit: {
        memory: number;
        cpu: number;
    };
    cwd: string;
    logs: {
        output: string;
        error: string;
    };
    state: {
        status: string;
        autorestart: boolean;
        uptime: number;
        restart_count: number;
        node_version: string;
    };
    git: {
        remote: string;
        branch: {
            name: string;
            url: string;
        };
        last_commit: {
            hash: string;
            url: string;
            message: {
                title: string;
                body: string;
            };
            author: {
                name: string;
                email: string;
            };
        };
    };
    environment: Record<string, string>;
};
