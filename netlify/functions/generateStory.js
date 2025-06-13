const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 1) Build the Gemini endpoint URL with your key
  const apiKey   = process.env.MY_STORY_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

  // 2) Prepare your prompt
  const payload = {
    prompt: { text:
      'Write a mundane, detailed story (~200 words) about an everyday event ' +
      'in the Longfellow neighborhood of Minneapolis. Start with a one-line title.'
    },
    temperature: 0.7
  };

  // 3) Fetch from Gemini
  let gemini;
  try {
    const res   = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json  = await res.json();
    gemini      = json.candidates?.[0]?.output?.trim() || '';
  } catch (err) {
    console.error('Gemini API error', err);
    gemini = 'Fallback: Could not reach Gemini API.';
  }

  // 4) Split title / content
  const lines   = gemini.split(/\r?\n/).filter(l => l.trim());
  const title   = lines.shift() || 'Untitled';
  const content = lines.join('\n\n') || 'No content available.';

  // 5) Return JSON
  return {
    statusCode: 200,
    body: JSON.stringify({ title, date: new Date().toLocaleDateString('en-US'), content })
  };
};
