
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Poornesh!'
  });
});


app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    // console.log('API Response:', response);

    if (response && response.choices && response.choices.length > 0) {
      res.status(200).send({
        bot: response.choices[0].text
      });
    } else {
      res.status(500).send('No valid choices in the API response');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});




app.listen(5050, () => console.log('AI server started on http://localhost:5050'));





