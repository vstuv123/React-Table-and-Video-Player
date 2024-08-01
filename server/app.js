import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, statSync } from 'fs';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const app = express();

app.get('/', (req, res) => {
    res.send("HelloWORLd")
})

app.get("/video", (req, res) => {
    const filepath = path.join(__dirname, "public", "video.mp4");
    const stat = statSync(filepath);
    const fileSize = stat.size;

    const range = req.headers.range;

    if (!range) {
        return res.status(400).send("require range");
    }

    const chunkSize = 10**6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize);

    const contentLength = end - start + 1;

    const fileStream = createReadStream(filepath, {
        start,
        end,
    });
    fileStream.pipe(res);

    const header = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    res.writeHead(206, header);
})

app.listen(5000, () => console.log("Server running"));