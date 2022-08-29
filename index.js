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

  if (event.message.text == '地點') {
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
  
	if (event.message.text === '婚紗') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'template',
                altText: '最佳主持人票選',
			    template: {
					type: 'image_carousel',
					columns: [
					  {
						imageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
						action: { label: '查看更多', type: 'uri', uri: 'https://line.me' }
						
					  },
					  {
						imageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/preview.jpg',
						action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/photo.html' }
					  }
					]
				},
            }
        ]);
    }

	// use reply API
	return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

/*
const { join } = require("path");
const { readFileSync } = require("fs");

const richMenuObjectA = () => ({
  size: {
    width: 2500,
    height: 843
  },
  selected: true,
  name: "richmenu-a",
  chatBarText: "Tap to open",
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 833,
        height: 843
      },
      action: {
        type: "uri",
        uri: "https://www.surveycake.com/s/rAROd"
      }
    },
    {
      bounds: {
        x: 833,
        y: 0,
        width: 833,
        height: 843
      },
      action: {
        type: "message",
        label: "婚紗",
		text: "婚紗"
      }
    },
    {
      bounds: {
        x: 1666,
        y: 0,
        width: 833,
        height: 843
      },
      action: {
        type: "message",
        label: "地點",
		text: "地點"
      }
    }
  ]
})

const main = async (client) => {
  // Create rich menu A (richmenu-a)
  const richMenuAId = await client.createRichMenu(richMenuObjectA())

  // Upload image to rich menu A
  const filepathA = join(__dirname, './public/marble_2.jpg')
  const bufferA = readFileSync(filepathA)

  await client.setRichMenuImage(richMenuAId, bufferA)

  // Set rich menu A as the default rich menu
  await client.setDefaultRichMenu(richMenuAId)

  // Create rich menu alias A
  await client.createRichMenuAlias(richMenuAId, "richmenua")

  console.log('success')
}

main(client)
*/