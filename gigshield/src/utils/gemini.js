export async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return "Please add your Gemini API key in .env file";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return `Error: ${data?.error?.message || "Unknown error"}`;
    }

    return data.candidates[0].content.parts[0].text;

  } catch (e) {
    console.error(e);
    return "Network error. Check your internet connection.";
  }
}