const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 1) Call your external story API directly
  const apiUrl = 'https://api.yoursite.com/v1/story';        // ← your endpoint
  const apiKey = 'YOUR_ACTUAL_API_KEY';                      // ← your key

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

  // 2) Still fetch an image
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
