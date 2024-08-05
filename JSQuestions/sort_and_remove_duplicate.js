// sort an array of object and remove duplicates from the array

let list = [
    { name: "abc", id: 2 },
    { name: "abc", id: 2 },
    { name: "bhk", id: 3 },
    { name: "hjk", id: 1 }
];

const uniqueList = list.filter((item, index, self) =>
    index === self.findIndex((t) => (
        t.id === item.id && t.name === item.name
    ))
);

console.log(uniqueList);
// output -
// [
//     { name: "abc", id: 2 },
//     { name: "bhk", id: 3 },
//     { name: "hjk", id: 1 },
// ]

// ---------------------------------------------------------------------------

// Time complexity - O(n) + nlogN

let list1 = [
    { name: "abc", id: 2 },
    { name: "abc", id: 2 },
    { name: "bhk", id: 3 },
    { name: "hjk", id: 1 }
];

// Step 1: Sort the array by `id` and `name`
list1.sort((a, b) => {
    if (a.id !== b.id) return a.id - b.id;
    return a.name.localeCompare(b.name);
});

// Step 2: Use two pointers to remove duplicates
function removeDuplicates(sortedList) {
    if (sortedList.length === 0) return [];

    let i = 0;
    for (let j = 1; j < sortedList.length; j++) {
        if (sortedList[j].id !== sortedList[i].id || sortedList[j].name !== sortedList[i].name) {
            i++;
            sortedList[i] = sortedList[j];
        }
    }

    console.log(i); // 2 // i + 1 shows the length of unique elements 

    return sortedList.slice(0, i + 1); // it will show us elements from 0 to 2, it won't pick third index element
}

const uniqueList1 = removeDuplicates(list);
console.log(uniqueList1);
// output -
// [
//     { name: "hjk", id: 1 },
//     { name: "abc", id: 2 },
//     { name: "bhk", id: 3 },
// ]
