

export function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//https://www.paulirish.com/2009/random-hex-color-code-snippets/
export function randColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}