const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Gemini (Generative Language) API endpoint
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';
  const apiKey   = process.env.MY_STORY_API_KEY;

  // Prompt for a mundane Longfellow neighborhood story
  const promptText = 
    'Write a mundane, detailed story (~200 words) about an everyday event ' +
    'in the Longfellow neighborhood of Minneapolis. Start with a one-line title.';

  let story;
  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: { text: promptText },
        temperature: 0.7,
        candidate_count: 1
      })
    });
    const json = await resp.json();
    story = json.candidates?.[0]?.output;
  } catch (err) {
    console.error('Gemini API error', err);
    story = 'Fallback Title\n\nCould not reach Gemini API; here’s a fallback boring story.';
  }

  // Split off the title
  const lines = story.split('\n').filter(l => l.trim());
  const title = lines.shift() || 'Longfellow Update';
  const content = lines.join('\n\n');
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  const image_url = `https://source.unsplash.com/720x400/?Longfellow,Minneapolis,neighborhood&${Date.now()}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ title, date, content, image_url })
  };
};
