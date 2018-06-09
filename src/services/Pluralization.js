// Importing a larger pluralization lib would add unnecessary weight for the number of things we're pluralizing
// In a larger app it might be worth the cost
// Also it's fun to write and a good example of tests
export function thingCountLabel(count, thingType) {
    return `${count} ${autoPluralize(count, thingType)}`;
}

export function autoPluralize(count, thing) {
    return count === 1 ? thing : pluralize(thing);
}

export function pluralize(thing) {
    return (
        thing.endsWith('y') ? replaceEnd(thing, 1, 'ies') :
        thing.endsWith('ing') ? thing :
        `${thing}s`
    )
}

function replaceEnd(str, chars, withString) {
    return `${str.substring(0, str.length-chars)}${withString}`
}