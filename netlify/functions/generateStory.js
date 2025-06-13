const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.MY_STORY_API_KEY;
  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

  // Prompt for a boring Longfellow story
  const promptText =
    'Write a mundane, detailed story (around 200 words) about an everyday event ' +
    'in the Longfellow neighborhood of Minneapolis. Start with a one-line title.';

  let raw;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: { text: promptText }, temperature: 0.7 })
    });
    raw = await res.json();
  } catch (err) {
    console.error('Gemini API error', err);
    raw = null;
  }

  // Parse output or fallback
  let text = 'Fallback: Could not reach Gemini API.';
  if (raw && Array.isArray(raw.candidates) && raw.candidates[0]?.output) {
    text = raw.candidates[0].output.trim();
  }

  // Split first line as title, rest as content
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const title   = lines.shift() || 'Untitled';
  const content = lines.join('\n\n') || 'No content available.';

  // Date + random neighborhood image
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  const image_url =
    `https://source.unsplash.com/720x400/?Longfellow,Minneapolis,neighborhood&${Date.now()}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ title, date, content, image_url })
  };
};
