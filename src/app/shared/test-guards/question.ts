export function question(text: string): boolean {
    // eslint-disable-next-line no-alert
    return prompt(text) === 'Y';
}
