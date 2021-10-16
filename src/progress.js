function progress(percent) {
    const i = percent * 10;
    const dots = ".".repeat(i);
    const left = 10 - i;
    const empty = " ".repeat(left);
    return `[${dots}${empty}] ${(percent * 100).toFixed()}%`;
}

module.exports = progress;
