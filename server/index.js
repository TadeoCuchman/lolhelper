import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from "openai";


const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json())


const API_KEY = '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'




app.post('/completion', async (req, res) => {
    try{

        const configuration = new Configuration({
          apiKey:API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        
        const response = await openai.createCompletion({
          model: "code-davinci-002",
          prompt: 'Create a League of Legends quote help to ' + req.body.message,
          temperature: 0,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0.2,
          presence_penalty: 0,
        });

        res.send(response.data.choices[0])


    }catch(err){
        console.log('error', err)
        res.status(500).send('server error')
    }
})

app.listen(PORT, () => console.log('listening on port ' + PORT))



