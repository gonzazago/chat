import mongoose from "mongoose"

const connect = async () => {

    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/hiring")
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (e) {
        console.error(`error try connect to db error: ${e}`);

    }
}

export default connect