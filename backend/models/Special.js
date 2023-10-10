import mongoose, {Schema, ObjectId} from 'mongoose';

const Special = mongoose.model("Special", new Schema({
    id:{type: ObjectId},
    date:{ type: Date},
    num0: {type: Number},
    num1: {type: Number},
    num2: {type: Number},
    num3: {type: Number},
    num4: {type: Number},
    num5: {type: Number},
    num6: {type: Number},
    num7: {type: Number},
    num8: {type: Number},
    num9: {type: Number},
    num10: {type: Number},
    num11: {type: Number},
    num12: {type: Number},
    num13: {type: Number},
    num14: {type: Number},
    num15: {type: Number},
    num16: {type: Number},
    num17: {type: Number},
    num18: {type: Number},
    num19: {type: Number},
}))

export default Special