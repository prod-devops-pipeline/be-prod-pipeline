import mongoose from "mongoose";

const connetDataBase = async () => {
    console.log('connecting......');

    mongoose.connection.on("connected", () => console.log(" MongoDB Connected"));
    mongoose.connection.on("error", (err) => console.log(" MongoDB Error:", err));



    try {
        const mongourl = `${process.env.DB_URL}/${process.env.DATABASE_NAME}`;
        await mongoose.connect(`${mongourl}`)
    } catch (error) {

        throw Error('MongoDB Connection issue');

    }
}

export default connetDataBase;