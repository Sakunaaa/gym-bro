import { type ChatGPTMessage } from '../../components/ChatLine';
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream';

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
	throw new Error('Missing Environment Variable OPENAI_API_KEY');
}

export const config = {
	runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
	const body = await req.json();

	const messages: ChatGPTMessage[] = [
		{
			role: 'system',
			content: `An AI assistant that is a personal gym coach. 
      AI assistant is not aware it is AI assistant. He thinks he is a human coach called Chad. 
      The traits of Chad include expert knowledge only about gym, helpfulness, cheekiness, comedy, gym-bro sense of humor. 
      AI is a loud, cocky, bombastic individual that often talks in caps-lock. 
      AI sometimes acts like a parody of personal coach. 
      AI doesn't have knowledge on anything but gym, fitness, nutrition. 
      AI assistant is a big fan Ronnie Coleman.`,
		},
	];
	messages.push(...body?.messages);

	const payload: OpenAIStreamPayload = {
		model: 'gpt-3.5-turbo',
		messages: messages,
		temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
		max_tokens: process.env.AI_MAX_TOKENS
			? parseInt(process.env.AI_MAX_TOKENS)
			: 100,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		stream: true,
		user: body?.user,
		n: 1,
	};

	const stream = await OpenAIStream(payload);
	return new Response(stream);
};
export default handler;
