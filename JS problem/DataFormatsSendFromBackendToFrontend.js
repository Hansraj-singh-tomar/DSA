// Data Formats Sent from Backend to Frontend
// Overview of Response Types


// ┌─────────────────────────────────────────────────────────────────┐
// │                  BACKEND RESPONSE TYPES                          │
// ├─────────────────────────────────────────────────────────────────┤
// │                                                                  │
// │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
// │   │    JSON     │  │    XML      │  │    HTML     │            │
// │   │ application │  │ application │  │  text/html  │            │
// │   │   /json     │  │    /xml     │  │             │            │
// │   └─────────────┘  └─────────────┘  └─────────────┘            │
// │                                                                  │
// │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
// │   │ Plain Text  │  │   Binary    │  │   Stream    │            │
// │   │ text/plain  │  │ image/png   │  │ video/mp4   │            │
// │   │             │  │ application │  │ chunked     │            │
// │   │             │  │ /pdf, /zip  │  │ transfer    │            │
// │   └─────────────┘  └─────────────┘  └─────────────┘            │
// │                                                                  │
// │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
// │   │  Form Data  │  │   GraphQL   │  │  Protobuf   │            │
// │   │ multipart/  │  │ application │  │ application │            │
// │   │ form-data   │  │   /json     │  │ /x-protobuf │            │
// │   └─────────────┘  └─────────────┘  └─────────────┘            │
// │                                                                  │
// └─────────────────────────────────────────────────────────────────┘

// 1. JSON (Most Common)
// Content-Type: application/json

// Backend (Express)
app.get('/api/users', (req, res) => {
    res.json({
      success: true,
      data: [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
      ],
      meta: { total: 2, page: 1 }
    });
  });
  
  // Actual HTTP Response:
  // HTTP/1.1 200 OK
  // Content-Type: application/json
  //
  // {"success":true,"data":[{"id":1,"name":"John"...}]}

  // Frontend
const response = await fetch('/api/users');
const data = await response.json();  // Parses JSON string to object
console.log(data.data[0].name);  // "John"

// --------------------------------------------------------------

// 2. HTML (Server-Side Rendering)
// Content-Type: text/html

// Backend (Express)
app.get('/page', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>My Page</title></head>
        <body>
          <h1>Hello World</h1>
          <p>Server-rendered HTML</p>
        </body>
      </html>
    `);
  });
  
  // Or with template engine (EJS, Pug)
  app.get('/users', async (req, res) => {
    const users = await db.getUsers();
    res.render('users', { users });  // Renders users.ejs template
  });

  // Frontend (rarely fetched via JS, usually direct browser navigation)
const response = await fetch('/page');
const html = await response.text();  // Get as string
document.body.innerHTML = html;

// When to use: SSR pages, email templates, legacy systems

// --------------------------------------------------------------

// 3. Plain Text (No Content-Type)
// Content-Type: text/plain

// Backend
app.get('/health', (req, res) => {
    res.type('text/plain').send('OK');
  });
  
  app.get('/logs', (req, res) => {
    res.type('text/plain').send(`
      [2024-01-15 10:30:22] INFO: Server started
      [2024-01-15 10:30:25] INFO: Connected to database
      [2024-01-15 10:31:00] WARN: High memory usage
    `);
  });

  // Frontend
const response = await fetch('/health');
const text = await response.text();  // "OK"
// When to use: Health checks, logs, simple status responses

// --------------------------------------------------------------

// 4. XML (Legacy but Still Used)
// Content-Type: application/xml or text/xml
// Backend
app.get('/api/users.xml', (req, res) => {
    res.type('application/xml').send(`
      <?xml version="1.0" encoding="UTF-8"?>
      <users>
        <user>
          <id>1</id>
          <name>John</name>
          <email>john@example.com</email>
        </user>
        <user>
          <id>2</id>
          <name>Jane</name>
          <email>jane@example.com</email>
        </user>
      </users>
    `);
  });

  // Frontend
const response = await fetch('/api/users.xml');
const xmlText = await response.text();
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
const names = xmlDoc.querySelectorAll('name');

// When to use: SOAP APIs, RSS feeds, legacy enterprise systems, sitemaps

// 5. Binary Data (Files, Images)
// Content-Types: image/png, image/jpeg, application/pdf, application/zip, etc.

// Backend - Serving an image
app.get('/avatar/:id', async (req, res) => {
    const imageBuffer = await getImageFromDB(req.params.id);
    res.type('image/png').send(imageBuffer);
  });
  
  // Backend - Serving a PDF
  app.get('/invoice/:id', async (req, res) => {
    const pdfBuffer = await generatePDF(req.params.id);
    res.type('application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
    res.send(pdfBuffer);
  });
  
  // Backend - Serving a file download
  app.get('/download/:filename', (req, res) => {
    res.download(`./files/${req.params.filename}`);
  });

  // Frontend - Display image
const response = await fetch('/avatar/123');
const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);
document.querySelector('img').src = imageUrl;

// Frontend - Download file
const response = await fetch('/invoice/456');
const blob = await response.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'invoice.pdf';
a.click();

// --------------------------------------------------------------

// 6. Streams (Large Files, Video)
// Content-Type: video/mp4, audio/mpeg, application/octet-stream
// Transfer-Encoding: chunked

// Backend - Video streaming
app.get('/video/:id', (req, res) => {
    const videoPath = `./videos/${req.params.id}.mp4`;
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      // Partial content (Range request)
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
  
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });
  
      fs.createReadStream(videoPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  });

// Frontend - HTML5 video player handles streaming automatically 
<video controls>
  <source src="/video/movie123" type="video/mp4">
</video>

// --------------------------------------------------------------

{/* 7. Server-Sent Events (SSE)
Content-Type: text/event-stream */}
// Backend - Real-time updates
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send event every second
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
  }, 1000);

  req.on('close', () => clearInterval(interval));
});

// Frontend
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Server time:', data.time);
};
{/* When to use: Live notifications, real-time dashboards, stock tickers */}

// --------------------------------------------------------------
{/* 
8. Form Data (File Uploads)
Content-Type: multipart/form-data */}

// Frontend - Sending form data with file
const formData = new FormData();
formData.append('name', 'John');
formData.append('avatar', fileInput.files[0]);

await fetch('/api/upload', {
  method: 'POST',
  body: formData,  // Don't set Content-Type, browser does it
});

// Backend (with multer)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('avatar'), (req, res) => {
  console.log(req.body.name);   // "John"
  console.log(req.file);        // File info
  res.json({ success: true });
});

// --------------------------------------------------------------

{/* 9. Base64 Encoded Data
Content-Type: application/json (with base64 string inside) */}

// Backend - Return image as base64
app.get('/avatar-base64/:id', async (req, res) => {
  const imageBuffer = await getImageFromDB(req.params.id);
  const base64 = imageBuffer.toString('base64');
  res.json({
    mimeType: 'image/png',
    data: base64
  });
});

// Frontend
const response = await fetch('/avatar-base64/123');
const { mimeType, data } = await response.json();
const img = document.querySelector('img');
img.src = `data:${mimeType};base64,${data}`;
{/* When to use: Small images in JSON, email attachments, embedded resources */}

// --------------------------------------------------------------

{/* 10. Protocol Buffers (gRPC)
Content-Type: application/x-protobuf or application/grpc */}

// user.proto
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

// Backend (gRPC)
// Binary serialized data, much smaller than JSON
// Used in microservices for performance
{/* When to use: Microservices communication, high-performance APIs, mobile apps */}

// --------------------------------------------------------------

{/* Response Methods Comparison
Format	Size	Speed	Human Readable	Use Case
JSON	Medium	Fast	✅ Yes	REST APIs, web apps
XML	Large	Slow	✅ Yes	SOAP, legacy systems
HTML	Varies	Fast	✅ Yes	SSR, web pages
Binary	Small	Fast	❌ No	Files, images
Protobuf	Smallest	Fastest	❌ No	Microservices
Base64	33% larger	Medium	✅ Yes	Embedded data */}


{/* HTTP Response Structure */}
{/* ┌─────────────────────────────────────────────────────────────────┐
│                    HTTP RESPONSE                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Status Line:    HTTP/1.1 200 OK                               │
│                                                                  │
│   Headers:        Content-Type: application/json                │
│                   Content-Length: 256                           │
│                   Cache-Control: max-age=3600                   │
│                   Set-Cookie: session=abc123                    │
│                                                                  │
│   Body:           {"users": [{"id": 1, "name": "John"}]}       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘ */}

{/* Content-Type Header is Key! */}
// The Content-Type tells the browser how to interpret the response

res.json(data);           // Sets Content-Type: application/json
res.send('<html>');       // Sets Content-Type: text/html
res.type('text/plain').send('OK');
res.type('image/png').send(buffer);
res.type('application/pdf').send(pdfBuffer);

{/* The frontend uses this header to know how to process the response: */}

const response = await fetch('/api/data');

// Check content type
const contentType = response.headers.get('Content-Type');

if (contentType.includes('application/json')) {
  const data = await response.json();
} else if (contentType.includes('text/html')) {
  const html = await response.text();
} else if (contentType.includes('image/')) {
  const blob = await response.blob();
}