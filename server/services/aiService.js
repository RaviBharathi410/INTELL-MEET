import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processTranscription = async (audioUrl) => {
  try {
    // In actual use, fetch the audio file and send it
    const transcription = await openai.audio.transcriptions.create({
      file: await fetch(audioUrl), 
      model: 'whisper-1',
    });
    return transcription.text;
  } catch (error) {
    console.error('Transcription Error:', error);
    return null;
  }
};

export const generateMeetingInsights = async (transcript) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Process this meeting transcript to return an overview summary, extracted action items with assignees, and overall sentiment.',
        },
        { role: 'user', content: transcript },
      ],
      response_format: { type: 'json_object' },
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Insight Generation Error:', error);
    return null;
  }
};
