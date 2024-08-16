function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                flattenObject(obj[key], newKey, result);
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}



const response = {
    name: "sam",
    age: 25,
    characteristics: {
        height: "6 feet",
        complexion: "dark",
        hair: "black",
    },
    techStack: {
        language: "Javascript",
        framework: {
            name: "React",
            version: "18"
        }
    }
}

console.log(flattenObject(response));

// output -
// {
//     name: 'sam',
//     age: 25,
//     characteristics.height: '6 feet',
//     characteristics.complexion: 'dark',
//     characteristics.hair: 'black',
//     techStack.language: 'javascript',
//     techStack.framework.name: 'React',
//     techStack.framework.version: 'React',
// }