export default function removeArrayDuplicates(array, key = '_id') {
    const ids = [];
    return array.filter((item) => {
        if (ids.indexOf(item[key]) < 0) {
            ids.push(item[key]);
            return item;
        } else {
            console.warn(`Duplicate found in an array: `, item[key]);
            return false;
        }
    });
}
