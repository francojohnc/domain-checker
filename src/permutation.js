function permutation(elements, length, array = [], index = 0, result = []) {
    if (length === index) {
        return array.join('');
    }
    elements.forEach(item => {
        array[index] = item;
        const combine = permutation(elements, length, array, index + 1, result);
        if (typeof combine === 'string') {
            const resume = "zekpk";
            if (combine > resume) {
                result.push(combine);
            }
        }
    });
    return result;
}

module.exports = permutation;

