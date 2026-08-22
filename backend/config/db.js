import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "FoodHub"
        })

        console.log("DB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("DB CONNECTION ERROR:", error.message)
    }
}

export default connectDb