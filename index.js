// Sarkar-MD
import express from "express";
import ytSearch from "yt-search";
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
// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// POWERED BY BANDAHEALI
