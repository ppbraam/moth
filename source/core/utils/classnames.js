export default function classNames(...classes) {
    return classes.reduce((className, c) => {
        if (c) {
            if (typeof c === 'object') {
                const objectClassName = classNames(...Object.keys(c).map(key => (c[key] && key)));
                return `${className} ${objectClassName}`;
            }
            return `${className} ${c}`;
        }
        return className;
    }, '').trim();
}
