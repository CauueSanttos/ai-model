import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BASE_URL = "https://api-inference.huggingface.co/models";

// Text generation endpoint
app.post("/generate", async (req, res) => {
  const model = req.query.model;
  const { prompt } = req.body;

  if (!model) {
    return res.status(400).json({
      error: 'Query param "model" is required (e.g. ?model=gpt2)',
    });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/${model}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Failed to generate text using Hugging Face API" });
  }
});

// Image generation endpoint
app.post("/generate-image", async (req, res) => {
  const model = req.query.model;
  const { prompt } = req.body;

  if (!model) {
    return res.status(400).json({
      error:
        'Query param "model" is required (e.g. ?model=stabilityai/stable-diffusion-2)',
    });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/${model}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          Accept: "image/png",
        },
        responseType: "arraybuffer",
      }
    );

    // Save image locally
    const timestamp = Date.now();
    fs.writeFileSync(`images/output-${timestamp}.png`, response.data);

    res.setHeader("Content-Type", "image/png");
    res.send(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Failed to generate image using Hugging Face API" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
