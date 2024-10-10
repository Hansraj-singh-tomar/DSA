import React, { useState } from 'react';

function FileUploader() {
    const [uploadProgress, setUploadProgress] = useState(0);

    // Function to handle file upload
    const uploadFile = async (file) => {
        const CHUNK_SIZE = 5 * 1024 * 1024;  // 5MB chunk size
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        let uploadedBytes = 0;

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);

            // Slice the file into a chunk
            const chunk = file.slice(start, end);

            // Create FormData for the chunk upload
            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('chunkIndex', chunkIndex);
            formData.append('totalChunks', totalChunks);
            formData.append('fileName', file.name);

            try {
                // Send the chunk using fetch
                const response = await fetch('https://your-server/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Chunk upload failed');
                }

                // Update progress
                uploadedBytes += chunk.size;
                setUploadProgress(Math.round((uploadedBytes / file.size) * 100));
            } catch (error) {
                console.error(`Error uploading chunk ${chunkIndex}:`, error);
                // Optionally retry the failed chunk or notify the user
                return;
            }
        }

        console.log('File upload complete');
    };

    // Handle file selection and upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadFile(file);
        }
    };

    return (
        <div>
            <h2>File Uploader</h2>
            <input type="file" onChange={handleFileChange} />
            {uploadProgress > 0 && (
                <p>Upload Progress: {uploadProgress}%</p>
            )}
        </div>
    );
}

export default FileUploader;


// ---------------------------------------------------------------------------------

// Using Streams upload 10GB file

< !--
    < h2 > File Uploader</ >
    <input type="file" id="fileInput">
        <p id="progress">Upload Progress: 0%</p>

        <script>
            const fileInput = document.getElementById('fileInput');
            const progressDisplay = document.getElementById('progress');

            // Function to upload file using streams
            async function uploadFileWithStreams(file) {
            const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
            let uploadedBytes = 0;

            // Create a readable stream from the file
            const stream = file.stream();

            const reader = stream.getReader();

            let chunkIndex = 0;
            let done = false;

            // Read each chunk from the stream
            while (!done) {
                const {done: isDone, value } = await reader.read();
            if (isDone) {
                done = true;
            break;
                }

            // Create FormData for each chunk upload
            const formData = new FormData();
            formData.append('chunk', new Blob([value])); // Create a blob for the chunk
            formData.append('chunkIndex', chunkIndex);
            formData.append('totalChunks', totalChunks);
            formData.append('fileName', file.name);

            try {
                    // Upload the chunk using fetch
                    const response = await fetch('https://your-server/upload', {
                method: 'POST',
            body: formData,
                    });

            if (!response.ok) {
                        throw new Error('Chunk upload failed');
                    }

            // Update progress
            uploadedBytes += value.length;
            const progress = Math.round((uploadedBytes / file.size) * 100);
            progressDisplay.textContent = `Upload Progress: ${progress}%`;

            chunkIndex++;
                } catch (error) {
                console.error(`Error uploading chunk ${chunkIndex}:`, error);
            return;
                }
            }

            console.log('File upload complete');
        }

        // Handle file input change
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                uploadFileWithStreams(file);
            }
        });
        </script>
-->