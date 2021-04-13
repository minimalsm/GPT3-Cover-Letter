import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
    const body = JSON.parse(req.body);
    const reqEmail = body.email;
    const { db } = await connectToDatabase();
    const data = await db.collection('users').findOne({ email: reqEmail })
    const cereal = JSON.parse(JSON.stringify(data));
    res.json(cereal);
}