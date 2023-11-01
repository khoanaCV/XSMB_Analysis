import mongoose, { Schema, ObjectId } from 'mongoose';

const Sparse = mongoose.model(
    'Sparse',
    new Schema({
        id: { type: ObjectId },
        draw_date: { type: Date, unique: true },
        num00: { type: String, required: true, default: '0' },
        num01: { type: String, required: true, default: '0' },
        num02: { type: String, required: true, default: '0' },
        num03: { type: String, required: true, default: '0' },
        num04: { type: String, required: true, default: '0' },
        num05: { type: String, required: true, default: '0' },
        num06: { type: String, required: true, default: '0' },
        num07: { type: String, required: true, default: '0' },
        num08: { type: String, required: true, default: '0' },
        num09: { type: String, required: true, default: '0' },
        num10: { type: String, required: true, default: '0' },
        num11: { type: String, required: true, default: '0' },
        num12: { type: String, required: true, default: '0' },
        num13: { type: String, required: true, default: '0' },
        num14: { type: String, required: true, default: '0' },
        num15: { type: String, required: true, default: '0' },
        num16: { type: String, required: true, default: '0' },
        num17: { type: String, required: true, default: '0' },
        num18: { type: String, required: true, default: '0' },
        num19: { type: String, required: true, default: '0' },
        num20: { type: String, required: true, default: '0' },
        num21: { type: String, required: true, default: '0' },
        num22: { type: String, required: true, default: '0' },
        num23: { type: String, required: true, default: '0' },
        num24: { type: String, required: true, default: '0' },
        num25: { type: String, required: true, default: '0' },
        num26: { type: String, required: true, default: '0' },
        num27: { type: String, required: true, default: '0' },
        num28: { type: String, required: true, default: '0' },
        num29: { type: String, required: true, default: '0' },
        num30: { type: String, required: true, default: '0' },
        num31: { type: String, required: true, default: '0' },
        num32: { type: String, required: true, default: '0' },
        num33: { type: String, required: true, default: '0' },
        num34: { type: String, required: true, default: '0' },
        num35: { type: String, required: true, default: '0' },
        num36: { type: String, required: true, default: '0' },
        num37: { type: String, required: true, default: '0' },
        num38: { type: String, required: true, default: '0' },
        num39: { type: String, required: true, default: '0' },
        num40: { type: String, required: true, default: '0' },
        num41: { type: String, required: true, default: '0' },
        num42: { type: String, required: true, default: '0' },
        num43: { type: String, required: true, default: '0' },
        num44: { type: String, required: true, default: '0' },
        num45: { type: String, required: true, default: '0' },
        num46: { type: String, required: true, default: '0' },
        num47: { type: String, required: true, default: '0' },
        num48: { type: String, required: true, default: '0' },
        num49: { type: String, required: true, default: '0' },
        num50: { type: String, required: true, default: '0' },
        num51: { type: String, required: true, default: '0' },
        num52: { type: String, required: true, default: '0' },
        num53: { type: String, required: true, default: '0' },
        num54: { type: String, required: true, default: '0' },
        num55: { type: String, required: true, default: '0' },
        num56: { type: String, required: true, default: '0' },
        num57: { type: String, required: true, default: '0' },
        num58: { type: String, required: true, default: '0' },
        num59: { type: String, required: true, default: '0' },
        num60: { type: String, required: true, default: '0' },
        num61: { type: String, required: true, default: '0' },
        num62: { type: String, required: true, default: '0' },
        num63: { type: String, required: true, default: '0' },
        num64: { type: String, required: true, default: '0' },
        num65: { type: String, required: true, default: '0' },
        num66: { type: String, required: true, default: '0' },
        num67: { type: String, required: true, default: '0' },
        num68: { type: String, required: true, default: '0' },
        num69: { type: String, required: true, default: '0' },
        num70: { type: String, required: true, default: '0' },
        num71: { type: String, required: true, default: '0' },
        num72: { type: String, required: true, default: '0' },
        num73: { type: String, required: true, default: '0' },
        num74: { type: String, required: true, default: '0' },
        num75: { type: String, required: true, default: '0' },
        num76: { type: String, required: true, default: '0' },
        num77: { type: String, required: true, default: '0' },
        num78: { type: String, required: true, default: '0' },
        num79: { type: String, required: true, default: '0' },
        num80: { type: String, required: true, default: '0' },
        num81: { type: String, required: true, default: '0' },
        num82: { type: String, required: true, default: '0' },
        num83: { type: String, required: true, default: '0' },
        num84: { type: String, required: true, default: '0' },
        num85: { type: String, required: true, default: '0' },
        num86: { type: String, required: true, default: '0' },
        num87: { type: String, required: true, default: '0' },
        num88: { type: String, required: true, default: '0' },
        num89: { type: String, required: true, default: '0' },
        num90: { type: String, required: true, default: '0' },
        num91: { type: String, required: true, default: '0' },
        num92: { type: String, required: true, default: '0' },
        num93: { type: String, required: true, default: '0' },
        num94: { type: String, required: true, default: '0' },
        num95: { type: String, required: true, default: '0' },
        num96: { type: String, required: true, default: '0' },
        num97: { type: String, required: true, default: '0' },
        num98: { type: String, required: true, default: '0' },
        num99: { type: String, required: true, default: '0' },
    })
);

export default Sparse;
