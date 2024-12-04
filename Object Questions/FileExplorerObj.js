const fileFolderStructure = [
    {
        id: "1",
        type: "folder",
        name: "src",
        children: [
            { id: "2", type: "file", name: "index.js" },
            {
                id: "3",
                type: "folder",
                name: "components",
                children: [
                    { id: "4", type: "file", name: "Header.js" },
                    { id: "5", type: "file", name: "Footer.js" },
                ],
            },
        ],
    },
    { id: "6", type: "file", name: "main.js" },
    { id: "7", type: "file", name: "README.md" },
    {
        id: "8",
        type: "folder",
        name: "public",
        children: [
            { id: "9", type: "file", name: "index.html" },
            { id: "10", type: "file", name: "favicon.ico" },
        ]
    },
]

// ------------------------------------------------------------------

//! Delete a file or folder

// First way
function deleteNode(fileFolderStructure, nodeId) {
    return fileFolderStructure
        .filter((node) => node.id !== nodeId)
        .map((node) => {
            if (node.children) {
                return { ...node, children: deleteNode(node.children, nodeId) }
            }
            return node;
        });
}

console.log(deleteNode(fileFolderStructure, "9"));

// second way - we know every id is unique in that case we can optimize our code 
function deleteNodeById(structure, idToDelete) {
    for (let i = 0; i < structure.length; i++) {
        const node = structure[i];
        if (node.id === idToDelete) {
            // Remove the node directly
            structure.splice(i, 1);
            return true; // Return true to indicate the node was found and deleted
        }
        if (node.type === "folder" && node.children) {
            // Recursively check the children
            const isDeleted = deleteNodeById(node.children, idToDelete);
            if (isDeleted) return true; // Stop searching once the node is deleted
        }
    }
    return false; // Return false if the node is not found
}

console.log(deleteNodeById(fileFolderStructure, "9")); // true

console.log(fileFolderStructure);

// -------------------------------------------------------------------------------------------

//! update node by id
function updateNodeById(structure, idToUpdate, updatedData) {
    for (const node of structure) {
        if (node.id === idToUpdate) {
            Object.assign(node, updatedData); // Update the node with new data
            return true; // Return true after updating
        }
        if (node.type === "folder" && node.children) {
            const isUpdated = updateNodeById(node.children, idToUpdate, updatedData);
            if (isUpdated) return true; // Stop searching once the node is updated
        }
    }
    return false; // Return false if the node is not found
}

// Example: Update node with id "9"
updateNodeById(fileFolderStructure, "9", { name: "home.html" });

console.log(JSON.stringify(fileFolderStructure, null, 2));

// -----------------------------------------------------------------------------------------------

//! create a newNode in the fileFolderStructure
function createNode(structure, parentId, newNode) {
    for (const node of structure) {
        if (node.id === parentId && node.type === "folder") {
            node.children = node.children || []; // Ensure children array exists
            node.children.push(newNode); // Add the new node to the children
            return true; // Return true after adding
        }
        if (node.type === "folder" && node.children) {
            const isCreated = createNode(node.children, parentId, newNode);
            if (isCreated) return true; // Stop searching once the node is added
        }
    }
    return false; // Return false if the parent folder is not found
}

// Example: Add a new file to folder with id "3"
createNode(fileFolderStructure, "3", { id: "11", type: "file", name: "Sidebar.js" });

console.log(JSON.stringify(fileFolderStructure, null, 2));


// ------------------------------------------------------------------------------------------

//! Read a node with a specific id from the structure

function readNodeById(structure, idToFind) {
    for (const node of structure) {
        if (node.id === idToFind) {
            return node; // Return the node if the ID matches
        }
        if (node.type === "folder" && node.children) {
            const foundNode = readNodeById(node.children, idToFind);
            if (foundNode) return foundNode; // Return the node if found in children
        }
    }
    return null; // Return null if the node is not found
}

// Example: Read node with id "9"
const readResult = readNodeById(fileFolderStructure, "9");
console.log(readResult); // { id: "9", type: "file", name: "index.html" }

