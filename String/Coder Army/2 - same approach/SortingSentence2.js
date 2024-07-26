// sorting sentence 
// Time and Space complexity => O(n)

function sortingSentence(str) {
    let words = str.split(" ");

    // sort the words based on the trailing digit
    words.sort((a, b) => {
        let numA = a[a.length - 1];
        let numB = b[b.length - 1];

        return numA - numB;
    });

    // remove the digit from each word
    let sortedWords = words.map(word => word.slice(0, -1));

    // join the sorted words into a sentence
    let sortedSentence = sortedWords.join(" ");

    return sortedSentence;
}

let str = "is2 sentence4 This1 a3";
console.log(sortingSentence(str)); // This is a sentence
