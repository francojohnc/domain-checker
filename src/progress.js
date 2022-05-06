function progress(percent) {
    const length = 10
    const fill = '.'
    const total = percent * length;
    const step = fill.repeat(total);
    const empty = "-".repeat(length - total);
    const bar = step + empty
    return `[${bar}] ${(percent * 100).toFixed()}%`;
}

module.exports = progress;
