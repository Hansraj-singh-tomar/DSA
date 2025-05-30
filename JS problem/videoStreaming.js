// Step by step upload process

// 1. Client uploads video
const uploadVideo = async (file, metadata) => {
    // Client-side validation
    if (file.size > 5GB) throw new Error('File too large');
    if (!file.type.startsWith('video/')) throw new Error('Invalid file type');

    // Upload with progress tracking
    const formData = new FormData();
    formData.append('video', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData
    });

    return response.json();
};

// 2. Server receives and processes
app.post('/api/videos/upload', upload.single('video'), async (req, res) => {
    try {
        // Store original file
        const originalPath = req.file.path;

        // Create database entry
        const video = new Video({
            title: req.body.title,
            filepath: originalPath,
            processingStatus: 'processing'
        });
        await video.save();

        // Start async processing
        processVideoAsync(video);

        res.json({ videoId: video._id, status: 'processing' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --------------------------------------------------------------

// video processing flow'

// Video processing pipeline
const processVideoAsync = async (video) => {
    try {
        console.log(`Starting processing for video ${video._id}`);

        // Step 1: Extract metadata
        const metadata = await extractVideoMetadata(video.filepath);
        video.duration = metadata.duration;
        video.resolution = metadata.resolution;

        // Step 2: Generate thumbnails at different timestamps
        const thumbnails = await generateThumbnails(video.filepath, video._id);
        video.thumbnails = thumbnails;

        // Step 3: Transcode to multiple qualities
        const qualities = await transcodeVideo(video.filepath, video._id);
        video.qualities = qualities;

        // Step 4: Update status
        video.processingStatus = 'completed';
        await video.save();

        console.log(`Processing completed for video ${video._id}`);

        // Optional: Send notification to user
        notifyUser(video.uploadedBy, 'Video processing completed');

    } catch (error) {
        console.error('Processing failed:', error);
        video.processingStatus = 'failed';
        await video.save();
    }
};

// Transcoding function
const transcodeVideo = async (inputPath, videoId) => {
    const qualities = [
        { name: '360p', resolution: '640x360', bitrate: '800k' },
        { name: '480p', resolution: '854x480', bitrate: '1200k' },
        { name: '720p', resolution: '1280x720', bitrate: '2500k' },
        { name: '1080p', resolution: '1920x1080', bitrate: '4500k' }
    ];

    const processedQualities = [];

    for (const quality of qualities) {
        const outputPath = `uploads/processed/${videoId}_${quality.name}.mp4`;

        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .size(quality.resolution)
                .videoBitrate(quality.bitrate)
                .audioBitrate('128k')
                .outputOptions([
                    '-preset fast',
                    '-crf 23',
                    '-movflags +faststart' // Enable progressive download
                ])
                .output(outputPath)
                .on('end', resolve)
                .on('error', reject)
                .run();
        });

        processedQualities.push({
            quality: quality.name,
            filepath: outputPath,
            bitrate: quality.bitrate
        });
    }

    return processedQualities;
};

// ---------------------------------------------------------------------

// video streaming flow

// Server-side streaming with range support
app.get('/api/videos/stream/:videoId/:quality?', async (req, res) => {
    try {
        const { videoId, quality = '720p' } = req.params;

        // Get video info from database
        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ error: 'Video not found' });

        // Find requested quality
        const qualityVideo = video.qualities.find(q => q.quality === quality);
        if (!qualityVideo) return res.status(404).json({ error: 'Quality not available' });

        const videoPath = qualityVideo.filepath;
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            // Parse range header: "bytes=start-end"
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;

            // Create read stream for requested range
            const file = fs.createReadStream(videoPath, { start, end });

            // Set partial content headers
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
                'Cache-Control': 'public, max-age=3600'
            };

            res.writeHead(206, head); // 206 Partial Content
            file.pipe(res);
        } else {
            // No range requested, send entire file
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
                'Cache-Control': 'public, max-age=3600'
            };

            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }

        // Track analytics
        await trackVideoView(videoId, req.user?.id, req.ip);

    } catch (error) {
        console.error('Streaming error:', error);
        res.status(500).json({ error: 'Streaming failed' });
    }
});

// -------------------------------------------------------------------

// client side video flow

// Video player component with adaptive quality
const VideoPlayer = ({ videoId }) => {
    const videoRef = useRef(null);
    const [currentQuality, setCurrentQuality] = useState('720p');
    const [availableQualities, setAvailableQualities] = useState([]);
    const [buffering, setBuffering] = useState(false);
    const [networkSpeed, setNetworkSpeed] = useState(null);

    useEffect(() => {
        // Load video metadata and available qualities
        loadVideoInfo();

        // Monitor network speed for adaptive quality
        monitorNetworkSpeed();
    }, [videoId]);

    const loadVideoInfo = async () => {
        try {
            const response = await fetch(`/api/videos/${videoId}`);
            const video = await response.json();

            setAvailableQualities(video.qualities.map(q => q.quality));

            // Auto-select quality based on screen size and network
            const optimalQuality = selectOptimalQuality(video.qualities);
            setCurrentQuality(optimalQuality);

        } catch (error) {
            console.error('Failed to load video info:', error);
        }
    };

    const selectOptimalQuality = (qualities) => {
        const screenWidth = window.screen.width;
        const connection = navigator.connection;

        // Consider screen resolution
        if (screenWidth <= 640) return '360p';
        if (screenWidth <= 854) return '480p';
        if (screenWidth <= 1280) return '720p';

        // Consider network speed
        if (connection) {
            const effectiveType = connection.effectiveType;
            if (effectiveType === 'slow-2g' || effectiveType === '2g') return '360p';
            if (effectiveType === '3g') return '480p';
            if (effectiveType === '4g') return '720p';
        }

        return '720p'; // Default
    };

    const changeQuality = (newQuality) => {
        const video = videoRef.current;
        const currentTime = video.currentTime;
        const wasPlaying = !video.paused;

        setBuffering(true);
        setCurrentQuality(newQuality);

        // Change video source
        video.src = `/api/videos/stream/${videoId}/${newQuality}`;

        // Restore playback position
        video.addEventListener('loadedmetadata', () => {
            video.currentTime = currentTime;
            if (wasPlaying) video.play();
            setBuffering(false);
        }, { once: true });
    };

    const monitorNetworkSpeed = () => {
        let startTime = Date.now();
        let downloadSize = 0;

        const measureSpeed = () => {
            const video = videoRef.current;
            if (video && video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const currentTime = video.currentTime;
                const bufferHealth = bufferedEnd - currentTime;

                // Auto-adjust quality based on buffer health
                if (bufferHealth < 5 && currentQuality !== '360p') {
                    // Buffer running low, reduce quality
                    const qualityIndex = availableQualities.indexOf(currentQuality);
                    if (qualityIndex > 0) {
                        changeQuality(availableQualities[qualityIndex - 1]);
                    }
                } else if (bufferHealth > 30 && currentQuality !== '1080p') {
                    // Buffer healthy, try higher quality
                    const qualityIndex = availableQualities.indexOf(currentQuality);
                    if (qualityIndex < availableQualities.length - 1) {
                        changeQuality(availableQualities[qualityIndex + 1]);
                    }
                }
            }
        };

        setInterval(measureSpeed, 5000); // Check every 5 seconds
    };

    return (
        <div className="video-player">
            <video
                ref={videoRef}
                src={`/api/videos/stream/${videoId}/${currentQuality}`}
                controls
                onWaiting={() => setBuffering(true)}
                onCanPlay={() => setBuffering(false)}
                onLoadStart={() => setBuffering(true)}
                onLoadedData={() => setBuffering(false)}
            />

            {buffering && (
                <div className="buffering-indicator">
                    <div className="spinner">Loading...</div>
                </div>
            )}

            <div className="quality-selector">
                {availableQualities.map(quality => (
                    <button
                        key={quality}
                        onClick={() => changeQuality(quality)}
                        className={quality === currentQuality ? 'active' : ''}
                    >
                        {quality}
                    </button>
                ))}
            </div>
        </div>
    );
};

// -------------------------------------------------------------------------

// Advanced Streaming Features
// Adaptive Bitrate Streaming(HLS / DASH)

// Generate HLS playlist
const generateHLSPlaylist = async (videoId) => {
    const video = await Video.findById(videoId);
    const qualities = video.qualities;

    // Master playlist
    let masterPlaylist = '#EXTM3U\n#EXT-X-VERSION:3\n';

    qualities.forEach(quality => {
        const bandwidth = parseInt(quality.bitrate.replace('k', '')) * 1000;
        const resolution = getResolutionFromQuality(quality.quality);

        masterPlaylist += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n`;
        masterPlaylist += `${quality.quality}/playlist.m3u8\n`;
    });

    return masterPlaylist;
};

// Segment video for HLS
const segmentVideoForHLS = async (inputPath, outputDir, quality) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                '-c:v libx264',
                '-c:a aac',
                '-f hls',
                '-hls_time 10', // 10-second segments
                '-hls_list_size 0',
                '-hls_segment_filename', `${outputDir}/segment_%03d.ts`
            ])
            .output(`${outputDir}/playlist.m3u8`)
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
};

// -------------------------------------------------------------------

// CDN integration

// Upload to CDN after processing
const uploadToCDN = async (localPath, cdnPath) => {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();

    const fileStream = fs.createReadStream(localPath);

    const uploadParams = {
        Bucket: 'your-video-bucket',
        Key: cdnPath,
        Body: fileStream,
        ContentType: 'video/mp4',
        CacheControl: 'public, max-age=31536000' // 1 year cache
    };

    const result = await s3.upload(uploadParams).promise();
    return result.Location;
};

// Update streaming URLs to use CDN
const getStreamingURL = (videoId, quality) => {
    const cdnBase = 'https://cdn.yoursite.com/videos';
    return `${cdnBase}/${videoId}/${quality}.mp4`;
};

// ---------------------------------------------------------------------------

// Performance Optimizations
// Preloading and Buffering
// Intelligent preloading
const VideoPreloader = {
    preloadedVideos: new Map(),

    preloadVideo: async (videoId, quality = '720p') => {
        if (this.preloadedVideos.has(`${videoId}_${quality}`)) return;

        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = `/api/videos/stream/${videoId}/${quality}`;

        this.preloadedVideos.set(`${videoId}_${quality}`, video);

        // Preload first few seconds
        video.addEventListener('loadedmetadata', () => {
            video.currentTime = 0;
            video.play().then(() => {
                setTimeout(() => video.pause(), 3000); // Preload 3 seconds
            });
        });
    },

    getPreloadedVideo: (videoId, quality) => {
        return this.preloadedVideos.get(`${videoId}_${quality}`);
    }
};

// Use in video grid
const VideoGrid = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Preload videos that are likely to be watched
        videos.slice(0, 5).forEach(video => {
            VideoPreloader.preloadVideo(video._id);
        });
    }, [videos]);

    return (
        <div className="video-grid">
            {videos.map(video => (
                <VideoCard
                    key={video._id}
                    video={video}
                    onHover={() => VideoPreloader.preloadVideo(video._id)}
                />
            ))}
        </div>
    );
};

// ----------------------------------------------------------------------

// Analytics and Monitoring
// Track video analytics
const trackVideoEvent = async (eventType, videoId, data = {}) => {
    const analytics = {
        eventType, // 'play', 'pause', 'seek', 'quality_change', 'buffer'
        videoId,
        timestamp: Date.now(),
        userId: getCurrentUserId(),
        sessionId: getSessionId(),
        ...data
    };

    // Send to analytics service
    await fetch('/api/analytics/video-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analytics)
    });
};

// Monitor streaming performance
const StreamingMonitor = {
    startMonitoring: (videoElement, videoId) => {
        let bufferEvents = 0;
        let totalBufferTime = 0;
        let lastBufferStart = null;

        videoElement.addEventListener('waiting', () => {
            bufferEvents++;
            lastBufferStart = Date.now();
            trackVideoEvent('buffer_start', videoId);
        });

        videoElement.addEventListener('canplay', () => {
            if (lastBufferStart) {
                const bufferDuration = Date.now() - lastBufferStart;
                totalBufferTime += bufferDuration;

                trackVideoEvent('buffer_end', videoId, {
                    bufferDuration,
                    totalBufferTime,
                    bufferEvents
                });
            }
        });

        // Track quality changes
        videoElement.addEventListener('qualitychange', (e) => {
            trackVideoEvent('quality_change', videoId, {
                oldQuality: e.detail.oldQuality,
                newQuality: e.detail.newQuality,
                reason: e.detail.reason // 'user' or 'auto'
            });
        });
    }
};