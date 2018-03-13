function doubleDigits(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

function createTimestamp() {
    const currentDate = new Date();
    const minutes = doubleDigits(currentDate.getMinutes());
    const seconds = doubleDigits(currentDate.getSeconds());

    return `${minutes}:${seconds}`;
}

module.exports = createTimestamp;
