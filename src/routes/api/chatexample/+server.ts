import type { RequestHandler } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
	runtime: 'edge'
};

export const POST: RequestHandler = async ({ request, setHeaders }) => {
	setHeaders({
		'Cache-Control': 'no-cache',
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive'
	});

	const sleep = (minMs: number, maxMs: number) =>
		new Promise((resolve) => setTimeout(resolve, Math.random() * maxMs + minMs));

	async function sendData(controller: ReadableStreamDefaultController, data: string) {
		controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
	}

	let sentence = 'You, are, dumb, and, i, cant, help, you. ';

	const stream = new ReadableStream({
		async start(controller) {
			for (let i = 0; i < 3; i++) {
				let arr = sentence.split(',');
				for (let j = 0; j < arr.length; j++) {
					await sleep(70, 300);
					sendData(controller, arr[j]);
				}
			}
			sendData(controller, '[DONE]');
		}
	});

	return new Response(stream);
};
