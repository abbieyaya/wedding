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
  
	if (event.message.text === 'test1') {
		return client.replyMessage(event.replyToken, [
			{
				type: 'template',
				altText: 'Buttons alt text',
				template: {
					type: 'buttons',
					thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
					title: '測試功能',
					text: '請點選想測試的:',
					actions: [
						{ label: '測試1', type: 'postback', data: '測試1', text: '測試1' },
						{ label: '測試2', type: 'postback', data: '測試2', text: '測試2' },
						{ label: '測試3', type: 'postback', data: '測試3', text: '測試3' },
						{ label: '測試4', type: 'postback', data: '測試4', text: '測試4' },
					],
				},
			}
		]);
	}
	if (event.message.text === 'test2') {
		return client.replyMessage(event.replyToken, [
			{
				type: 'template',
				altText: 'Buttons alt text',
				template: {
					type: 'buttons',
					thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
					title: '測試功能',
					text: '請點選想測試的:',
					actions: [
						{ label: '測試5', type: 'postback', data: '測試5', text: '測試5' },
						{ label: '測試6', type: 'postback', data: '測試6', text: '測試6' },
						{ label: '測試7', type: 'postback', data: '測試7', text: '測試7' },
						{ label: '測試8', type: 'postback', data: '測試8', text: '測試8' },
					],
				},
			}
		]);
	}
		if (event.message.text === 'test3') {
		return client.replyMessage(event.replyToken, [
			{
				type: 'template',
				altText: 'Buttons alt text',
				template: {
					type: 'buttons',
					thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
					title: '測試功能',
					text: '請點選想測試的:',
					actions: [
						{ label: '測試9', type: 'postback', data: '測試9', text: '測試9' },
						{ label: '測試10', type: 'postback', data: '測試10', text: '測試10' },
					],
				},
			}
		]);
	}
	if (event.message.text == '測試1') {
		return client.replyMessage(event.replyToken, [
			{
				type: 'sticker',
				packageId: '1',
				stickerId: '1'
			}
		]);
	 }
  
	if (event.message.text === '測試2') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'image',
                originalContentUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/preview.jpg',
                previewImageUrl: 'https://raw.githubusercontent.com/line/line-bot-sdk-nodejs/master/examples/kitchensink/static/buttons/1040.jpg'
            }
        ]);
    }
	if (event.message.text === '測試3') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'video',
                originalContentUrl: 'https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
                previewImageUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
            }
        ]);
    }
	if (event.message.text === '測試4') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'audio',
                originalContentUrl: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
                duration: '27000'
            }
        ]);
    }
	if (event.message.text === '測試5') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'location',
                title: 'my location',
                address: "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                latitude: 35.65910807942215,
                longitude: 139.70372892916203
            }
        ]);
    }
    if (event.message.text === '測試6') {
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
            }
        ]);
    }
	if (event.message.text === '測試7') {
        return client.replyMessage(event.replyToken, [
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
            }
        ]);
    }
	if (event.message.text === '測試8') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'template',
                altText: '最佳主持人票選',
			    template: {
					type: 'carousel',
					imageAspectRatio: 'square',
					columns: [
					  {
						thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
						title: '朵瑞斯',
						text: '來自熱情洋溢的海島',
						actions: [
							{ label: 'Say message', type: 'message', text: '朵瑞斯 讚' },
						    { label: '查看更多', type: 'uri', uri: 'https://line.me' },
						],
					  },
					  {
						thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/preview.jpg',
						title: '凱恩',
						text: '就是愛音樂！',
						actions: [
							{ label: 'Say message', type: 'message', text: '凱恩 讚' },
						    { label: '查看更多', type: 'uri', uri: 'https://line.me' },
						],
					  },
					],
				},
            }
        ]);
    }

	if (event.message.text === '測試9') {
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
						action: { label: '查看更多', type: 'uri', uri: 'https://line.me' }
					  }
					]
				},
            }
        ]);
    }
	if (event.message.text === '測試10') {
        return client.replyMessage(event.replyToken, [
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


	// use reply API
	return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
