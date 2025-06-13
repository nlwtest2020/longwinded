const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Generate a random story
  const streetNames = ['Minnehaha Avenue', 'Lake Street', '22nd Avenue', 'Hiawatha Boulevard', '28th Avenue'];
  const events = [
    'a painted rock hiding spot was discovered',
    'a squirrel hoarded three acorns simultaneously',
    'the community garden hosted a tomato tasting event',
    'someone set up a free little library outside',
    'a neighbor cleaned their gutters'
  ];
  const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];
  const title = `${randomElement(streetNames)} Update: ${randomElement(events)}`;
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const content = `In the Longfellow neighborhood, ${randomElement(events)} on ${randomElement(streetNames)}. Neighbors are calling it the dullest highlight of their week.`;

  // Fetch a random image from Unsplash via source.unsplash.com
  const image_url = `https://source.unsplash.com/720x400/?Longfellow,Minneapolis,neighborhood&${Date.now()}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ title, date, content, image_url })
  };
};
