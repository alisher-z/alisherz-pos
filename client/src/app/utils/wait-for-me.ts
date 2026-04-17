
export function waitForMe(ms?: number): Promise<void> {
    return new Promise(res => setTimeout(res, ms ?? 0));
}