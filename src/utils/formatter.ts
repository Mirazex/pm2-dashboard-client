export function humanizeMemorySize(bytes: number) {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}


// get time since last restart
export function humanizeUptime(date: number) {
    const secondsElapsed = Math.floor((Date.now() - date) / 1000);

    const timeIntervals = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 }
    ];

    for (const interval of timeIntervals) {
        const count = Math.floor(secondsElapsed / interval.seconds);
        if (count >= 1) {
            return count + ' ' + interval.unit + (count > 1 ? 's' : '');
        }
    }

    return 'just now';
}

