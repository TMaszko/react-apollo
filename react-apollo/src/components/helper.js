
export const flatArray = array => array.reduce((acc, curr) => acc.concat(curr),[])
export const noDuplicate = array => array.filter((item, pos) =>  array.indexOf(item) === pos);
export const toCamelCaseRemoveColonAndSpaces =  (str) => str
        .replace(/\s(.)/g, $1 => $1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, $1 => $1.toLowerCase())
        .replace(/:/g,'');