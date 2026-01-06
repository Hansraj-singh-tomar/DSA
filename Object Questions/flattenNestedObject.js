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

// ------------------------Approach 2-------------------------

function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                flattenObject(obj[key], newKey, result);
            } else if(obj[key] == null || obj[key] == undefined){
                result[newKey] = obj[key]
            } else  {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}
const obj1 = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3,
    },
  },
};

console.log(flattenObject(obj1))

// Solution { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }

const ob2 = {
  a: { b: null, c: undefined },
};
console.log(flattenObject(ob2))
// Solution - { 'a.b': null, 'a.c': undefined }

const obj3 = { 
    a: { 
        b: [1, 2, 3], 
        c: ['foo'] 
    } 
};
console.log(flattenObject(obj3))
// Solution - { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }
// Solution { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }
