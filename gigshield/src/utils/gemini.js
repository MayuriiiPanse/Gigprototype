// export async function callGemini(prompt) {
//   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

//   if (!apiKey) {
//     return "Please add your Gemini API key in .env file";
//   }

//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }]
//         })
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Gemini error:", data);
//       return `Error: ${data?.error?.message || "Unknown error"}`;
//     }

//     return data.candidates[0].content.parts[0].text;

//   } catch (e) {
//     console.error(e);
//     return "Network error. Check your internet connection.";
//   }
// }

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
async function callOpenRouter(prompt) {
  try {
    const res = await fetch("/api/openrouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.reply || "No response";

  } catch (err) {
    return "Fallback failed";
  }
}

