import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
    const body = JSON.parse(req.body);
    const newTokensAmount = body.tokens;
    const reqEmail = body.email;
    console.log('Removed Tokens\n *Total: ' + newTokensAmount);
    const { db } = await connectToDatabase();
    const data = await db.collection('users').findOneAndUpdate(
        { 'email': reqEmail },
        { $set: { 'email': reqEmail, 'tokens': parseInt(newTokensAmount) } },
        { upsert: true },
    );
    const token_count = JSON.parse(JSON.stringify(data));
    res.json(token_count);
}