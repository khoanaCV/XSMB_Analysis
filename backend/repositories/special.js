import Special from "../models/Special.js";

const getAllSpecial = async () => {
    try{
        const specials = await Special.find()
        return specials
    }catch(error){
        console.log(error)
        throw error
    }
}


const createNewSpecialRecord = async (
    date,
    num0,
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9,
    num10,
    num11,
    num12,
    num13,
    num14,
    num15,
    num16,
    num17,
    num18,
    num19,
  ) => {
    try {
      const existingSpecialRecord = await Special.findOne({ date });
  
      if (existingSpecialRecord) {
        return "Special record be existed in system.";
      }
      const aware = await Special.create({
        date,
        num0,
        num1,
        num2,
        num3,
        num4,
        num5,
        num6,
        num7,
        num8,
        num9,
        num10,
        num11,
        num12,
        num13,
        num14,
        num15,
        num16,
        num17,
        num18,
        num19,
      });
      return Special;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

export default {getAllSpecial
,createNewSpecialRecord
}