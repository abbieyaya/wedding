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
						imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/1.jpg',
						action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
					  },
					  {
						imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/2.jpg',
						action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
						
					  },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/3.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/4.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/5.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/6.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/7.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/8.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/9.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
            },
            {
            imageUrl: 'https://github.com/abbieyaya/wedding/raw/main/photo/10.jpg',
            action: { label: '查看更多', type: 'uri', uri: 'https://wedding-photo.onrender.com/ori.html' }
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


const { join } = require("path");
const { readFileSync } = require("fs");

const richMenuObjectA = () => ({
  size: {
    width: 800,
    height: 540
  },
  selected: true,
  name: "richmenu-a",
  chatBarText: "Tap to open",
  areas: [
    {
      bounds: {
        x: 160,
        y: 205,
        width: 123,
        height: 215
      },
      action: {
        type: "uri",
        uri: "https://www.surveycake.com/s/rAROd"
      }
    },
    {
      bounds: {
        x: 330,
        y: 205,
        width: 123,
        height: 215
      },
      action: {
        type: "message",
        label: "婚紗",
		text: "婚紗"
      }
    },
    {
      bounds: {
        x: 515,
        y: 205,
        width: 123,
        height: 215
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
  const filepathA = join(__dirname, './public/xuan.png')
  const bufferA = readFileSync(filepathA)

  await client.setRichMenuImage(richMenuAId, bufferA)

  // Set rich menu A as the default rich menu
  await client.setDefaultRichMenu(richMenuAId)

  // Create rich menu alias A
  await client.createRichMenuAlias(richMenuAId, "richmenua")

  console.log('success')
}

main(client)
