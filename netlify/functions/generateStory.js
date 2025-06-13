const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // External API call
  const apiUrl = process.env.MY_STORY_API_URL;
  const apiKey = process.env.MY_STORY_API_KEY;
  let storyData;

  try {
    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: 'Write me a boring Longfellow neighborhood story in 200 words.'
      })
    });
    storyData = await resp.json();
  } catch (err) {
    console.error('API error', err);
    storyData = {
      title: 'Fallback Title',
      date: new Date().toLocaleDateString('en-US'),
      content: 'Could not reach external API; here’s a fallback story.'
    };
  }

  // Unsplash image
  const image_url = `https://source.unsplash.com/720x400/?Longfellow,Minneapolis,neighborhood&${Date.now()}`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      title: storyData.title,
      date: storyData.date || new Date().toLocaleDateString('en-US'),
      content: storyData.content,
      image_url
    })
  };
};
