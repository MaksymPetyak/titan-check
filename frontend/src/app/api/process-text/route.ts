import { mistral } from '@ai-sdk/mistral';
import { StreamingTextResponse } from 'ai';

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
    const { text } = await req.json();

    // Create a Mistral model instance
    const model = mistral('mistral-large-latest');

    // Generate the stream
    const response = await model.stream(text);

    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(response);
} 