exports.handler = async function(event, context) {
  const streetNames = ['Minnehaha Avenue', 'Lake Street', '22nd Avenue', 'Hiawatha Boulevard', '28th Avenue'];
  const events = [
    'a new painted rock hiding spot was discovered',
    'a squirrel was spotted carrying three nuts at once',
    'the community garden hosted a tomato tasting event',
    'someone set up a free bookshelf outside',
    'a neighbor cleaned their gutters'
  ];
  const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];
  const title = `${randomElement(streetNames)} Update: ${randomElement(events)}`;
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const content = `In the Longfellow neighborhood, ${randomElement(events)} on ${randomElement(streetNames)}. Neighbors are saying it was the most mundane yet notable occurrence yet. Stay tuned for more riveting updates.`;
  return {
    statusCode: 200,
    body: JSON.stringify({ title, date, content })
  };
};
