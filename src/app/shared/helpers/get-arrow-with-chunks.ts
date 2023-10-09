export function getArrowWithChunks<T>(arrow: T[], chunkSize: number): T[][] {
    const result = [];

    for (let i = 0; i < arrow.length; i += chunkSize) {
        const chunk = arrow.slice(i, i + chunkSize);

        result.push(chunk);
    }

    return result;
}
