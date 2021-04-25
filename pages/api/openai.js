// const OpenAI = require('openai-api');
// const openai = new OpenAI(process.env.OPENAI_API_KEY);

// export default async (req, res) => {
//     let jobTitle = req.body.job_title
//     let prompt = `Dear Software Company,\n\n
//     I am interested in the ${jobTitle} position that's available.`;

//     const gptResponse = await openai.complete({
//         engine: 'davinci',
//         prompt: prompt,
//         maxTokens: 400,
//         //higher temp == more risks
//         temperature: 0.5,
//         topP: 1,
//         presencePenalty: 0,
//         frequencyPenalty: 0.5,
//         bestOf: 1,
//         n: 1
//     });

//     const logres = JSON.stringify(gptResponse.data);
//     console.log('Data: ' + logres);

//     res.status(200).json({ text: `${gptResponse.data.choices[0].text}` })
// }





