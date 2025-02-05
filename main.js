// Sarkar-MD
import express from "express";
import pkg from "@mrnima/tiktok-downloader";
const { downloadTiktok } = pkg;

const app = express();

app.use(express.json());

// TikTok Video Downloader API
app.get("/api/tiktok", async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl) {
      return res.status(400).json({ error: "Please provide a TikTok video URL" });
    }

    // Fetch TikTok video details using the package
    const videoData = await downloadTiktok(videoUrl);
    
    // Log the response to inspect its structure
    console.log(videoData);

    // Ensure that 'videoData' has the correct properties
    if (!videoData || !videoData.video || !videoData.video.noWatermark) {
      return res.status(500).json({ error: "Video data is missing or not in expected format" });
    }

    const videoDetails = {
      title: videoData.title,
      downloadUrl: videoData.video.noWatermark,
      author: videoData.author,
      duration: videoData.duration,
    };

    res.json(videoDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch video details. Ensure the URL is correct." });
  }
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// POWERED BY BANDAHEALI
