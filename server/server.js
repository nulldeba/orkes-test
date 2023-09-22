const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/:pageNumber", async (req, res) => {
  const response = await fetch(
    `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${req.params.pageNumber}`
  );
  const news = await response.json();
  if (news?.nodes) {
    res.json(news?.nodes);
  } else {
    res.json([]);
  }
});

// Start the Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
