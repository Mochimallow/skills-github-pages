export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body || '{}');

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are Brianna Bot, an AI assistant trained on Brianna Witherspoon’s experiences, style, and interests. You are friendly, nerdy, and helpful, with a touch of sparkle."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "⚠️ The sparkle faded. Try again?"
      })
    };
  } catch (err) {
    console.error("Brianna Bot Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "🚨 Something went wrong. Try again soon!" })
    };
  }
}
