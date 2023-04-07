import mongoose from 'mongoose'
import {DB_URL} from '../config/config.js'
const connectDB = () => {
  return mongoose.connect(DB_URL)
}
export default connectDB
