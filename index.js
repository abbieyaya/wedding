'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

	
  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  //return client.replyMessage(event.replyToken, echo);
  if (event.message.text == '我很笨忘了地點') {
		  return client.replyMessage(event.replyToken, [
					  {
						type: 'location',
						title: '港南艾茉爾婚宴會館',
						address: "新竹市香山區海埔路588號",
						latitude: 24.822635434550303, 
						longitude: 120.9106672689193
					  }
			]);
  }
  
  if (event.message.text == '婚紗') {
		  return client.replyMessage(event.replyToken, [
					  {
						type: 'template',
						template: {
							type: "image_carousel",
							columns: [
							  {
								imageUrl: "https://example.com/bot/images/item1.jpg",
								action: {
								  type: "postback",
								  label: "Buy",
								  data: "action=buy&itemid=111"
								}
							  },
							  {
								imageUrl: "https://example.com/bot/images/item2.jpg",
								action: {
								  type: "message",
								  label: "Yes",
								  text: "yes"
								}
							  },
							  {
								imageUrl: "https://example.com/bot/images/item3.jpg",
								action: {
								  type: "uri",
								  label: "View detail",
								  uri: "http://example.com/page/222"
								}
							  }
							]
						  }
					  }
			]);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
