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
  
  if (event.message.text === '測試1') {
		// create a echoing text message
		const echo = { type: 'text', text: event.message.text };

		// use reply API
		return client.replyMessage(event.replyToken, echo);
        return client.replyMessage(event.replyToken, [
            {
                type: 'sticker',
                packageId: '1',
                stickerId: '1'
            },
            {
                type: 'image',
                originalContentUrl: 'https://developers.line.biz/media/messaging-api/messages/image-full-04fbba55.png',
                previewImageUrl: 'https://developers.line.biz/media/messaging-api/messages/image-167efb33.png'
            },
            {
                type: 'video',
                originalContentUrl: 'https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
                previewImageUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
            },
            {
                type: 'audio',
                originalContentUrl: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
                duration: '27000'
            },
            {
                type: 'location',
                title: 'my location',
                address: "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                latitude: 35.65910807942215,
                longitude: 139.70372892916203
            }
        ]);
    }
	
    if (event.message.text === '測試2') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'imagemap',
                baseUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/rich',
                altText: 'Imagemap alt text',
                baseSize: { width: 1040, height: 1040 },
                actions: [
                    { area: { x: 0, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/manga/en' },
                    { area: { x: 520, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/music/en' },
                    { area: { x: 0, y: 520, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/play/en' },
                    { area: { x: 520, y: 520, width: 520, height: 520 }, type: 'message', text: 'URANAI!' },
                ],
                video: {
                    originalContentUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/video.mp4',
                    previewImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/preview.jpg',
                    area: {
                        x: 280,
                        y: 385,
                        width: 480,
                        height: 270,
                    },
                    externalLink: {
                        linkUri: 'https://line.me',
                        label: 'LINE'
                    }
                },
            },
            {
                type: 'template',
                altText: 'Buttons alt text',
                template: {
                    type: 'buttons',
                    thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
                    title: 'My button sample',
                    text: 'Hello, my button',
                    actions: [
                        { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
                        { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                        { label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは' },
                        { label: 'Say message', type: 'message', text: 'Rice=米' },
                    ],
                },
            },
            {
                type: 'flex',
                altText: 'this is a flex message',
                contents: {
                    type: 'bubble',
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'text',
                                text: 'hello'
                            },
                            {
                                type: 'text',
                                text: 'world'
                            }
                        ]
                    }
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
