// Sarkar-MD
import express from "express";
import ytSearch from "yt-search";
import TikTokScraper from "tiktok-scraper";
import quote from "random-quotes";
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Route to handle YouTube search
app.get("/api/yts", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Please provide a search query" });
    }

    // Perform YouTube search using yt-search
    const result = await ytSearch(query);

    // Extract video details
    const videos = result.videos.slice(0, 5).map((video) => ({
      title: video.title,
      url: video.url,
      duration: video.timestamp,
      views: video.views,
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
// Route to get a random quote
app.get("/api/quote", (req, res) => {
  try {
    const quote = randomQuote(); // Get a random quote
    res.json({
      quote: quote.body,
      author: quote.author,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// TikTok Video Download API
app.get("/api/tiktok", async (req, res) => {
  try {
    const videoUrl = req.query.url;

    if (!videoUrl) {
      return res.status(400).json({ error: "Please provide a TikTok video URL" });
    }

    // Fetch TikTok video details using tiktok-scraper
    const videoMeta = await TikTokScraper.getVideoMeta(videoUrl);

    // Extract download link and video details
    const videoDetails = {
      title: videoMeta.collector[0].text,
      downloadUrl: videoMeta.collector[0].videoUrl,
      author: videoMeta.collector[0].authorMeta.name,
      duration: videoMeta.collector[0].videoMeta.duration,
    };

    res.json(videoDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video details. Ensure the URL is correct." });
  }
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// POWERED BY BANDAHEALI
