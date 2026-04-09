const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const generateOutput = (productName, country, tone) => {
  if (!productName) productName = "Product";

  const config = {
    "India": {
      themes: {
        "Casual": "Friendly and relatable, appealing to family and friends. 🎉💖",
        "Professional": "Trustworthy and reliable, perfect for everyday utility. 🤝✨",
        "Luxury": "Opulent and grand, crafted for a royal lifestyle. ✨💎"
      },
      taglines: {
        "Casual": `Make ${productName} a part of your daily celebrations!`,
        "Professional": `${productName} - Delivering excellence every day.`,
        "Luxury": `Experience the grandeur of ${productName}.`
      },
      nativeTaglines: {
        "Casual": `உங்கள் கொண்டாட்டங்களுக்கு ${productName}! 🎊`,
        "Professional": `${productName} - சிறந்த தரம், என்றென்றும்!`,
        "Luxury": `${productName} மூலம் ராஜ வாழ்க்கையை அனுபவியுங்கள். ✨`
      },
      insight: "In India 🇮🇳, customers value rich traditions, emotional connection, and products that bring family together.",
      icon: "🪔",
      emojis: "🎉🛍️💖"
    },
    "USA": {
      themes: {
        "Casual": "Cool, quick, and easy to use. Get yours today! 😎⚡",
        "Professional": "High-performance and bold, designed to get the job done right. 💼🚀",
        "Luxury": "Sleek, powerful, and state-of-art. Unmatched quality. 🔥💎"
      },
      taglines: {
        "Casual": `Grab your ${productName} now!`,
        "Professional": `Empower your work with ${productName}.`,
        "Luxury": `Elevate your lifestyle with ${productName}.`
      },
      nativeTaglines: {
        "Casual": `Ready when you are! ⚡`,
        "Professional": `Unstoppable performance.`,
        "Luxury": `Simply the best.`
      },
      insight: "In the USA 🇺🇸, consumers look for bold branding, efficiency, and innovative features that stand out.",
      icon: "🗽",
      emojis: "💪⚡🔥"
    },
    "Japan": {
      themes: {
        "Casual": "Simple, neat, and refreshing for your daily life. 🍃✨",
        "Professional": "Efficient, reliable, and crafted with precision. 🏢⚙️",
        "Luxury": "Elegant and refined, designed for a sophisticated lifestyle. 🌸✨"
      },
      taglines: {
        "Casual": `Enjoy the simple moments with ${productName}.`,
        "Professional": `${productName} - Precision meets utility.`,
        "Luxury": `Timeless elegance, redefined by ${productName}.`
      },
      nativeTaglines: {
        "Casual": `毎日の生活にさわやかさを 🍃`,
        "Professional": `信頼と精度の証 ⚙️`,
        "Luxury": `時を超えた優雅さ ✨`
      },
      insight: "In Japan 🇯🇵, customers prefer minimal, high-quality, and aesthetically pleasing products with polite messaging.",
      icon: "🌸",
      emojis: "🌸🎎✨"
    }
  };

  const selectedConfig = config[country] || config["India"];
  const safeTone = selectedConfig.themes[tone] ? tone : "Casual";
  
  return {
    description: `${selectedConfig.themes[safeTone]} ${selectedConfig.emojis}`,
    tagline: selectedConfig.taglines[safeTone],
    nativeTagline: selectedConfig.nativeTaglines[safeTone],
    insight: selectedConfig.insight,
    icon: selectedConfig.icon
  };
};

app.post('/api/generate', (req, res) => {
  const { productName, country, tone } = req.body;
  const result = generateOutput(productName, country, tone);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
