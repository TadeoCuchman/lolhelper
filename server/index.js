const express = require('express');
const cors = require('cors')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();




const app = express()
app.use(cors())
app.use(express.json())

const PORT = 8000;
const OPENAI_KEY = process.env.OPENAI_KEY;




app.post('/completion', async (req, res) => {
    try{
        
        const configuration = new Configuration({
          apiKey:OPENAI_KEY,
        });
        const openai = new OpenAIApi(configuration);
        
        // const response = await openai.createCompletion({
        //   model: "gpt-3.5-turbo",
        //   prompt: 'Create a League of Legends quote help to build ' + req.body.message,
        //   temperature: 0,
        //   max_tokens: 100,
        //   top_p: 1,
        //   frequency_penalty: 0.2,
        //   presence_penalty: 0,
        // });

        // res.send(response.data.choices[0])


        // hacer prompt para high elo u otros y para las diferentes lineas
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: 'To win on a League of Legends game, provide a smart strategy explained in a few focused and very resumed steps , with ' + req.body.message + '. The response sould be in a numeric format separating each step with a * at the end of each step:',
          max_tokens: 256,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
        console.log(completion)


    }catch(err){
        console.log('error', err)
        res.status(500).send('server error')
    }
})

app.listen(PORT, () => console.log('listening on port ' + PORT))



