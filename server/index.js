import expresss from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
const app = expresss();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.use('/', (req, res) => {
    res.send('hello to Memories API')
})



// const CONNECTION_URL = 'mongodb+srv://javascript:javascript123@cluster0.neplc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port :${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false)
