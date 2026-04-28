export async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    console.warn("Gemini API key missing, switching to fallback...");
    return await callOpenRouter(prompt, openRouterKey);
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

    // ❗ If Gemini fails (quota / error)
    if (!response.ok || data?.error) {
      console.warn("Gemini failed, switching to fallback...", data);
      return await callOpenRouter(prompt, openRouterKey);
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

  } catch (e) {
    console.error("Gemini crashed, using fallback:", e);
    return await callOpenRouter(prompt, openRouterKey);
  }
}


// 🔁 Fallback function (OpenRouter)
async function callOpenRouter(prompt, apiKey) {
  if (!apiKey) {
    return "Missing OpenRouter API key";
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // ✅ dynamic fix
        "X-Title": "GigShield"
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return data?.error?.message || "Fallback failed";
    }

    return data.choices?.[0]?.message?.content || "No response";

  } catch (err) {
    console.error("Fallback crashed:", err);
    return "AI is analyzing your GigScore...";
  }
}

