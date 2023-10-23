import { sparseRepository } from "../repositories/index.js";
import * as dotenv from 'dotenv';
const getAllSparses = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAllSparses();
        res.status(200).json({
            message: "Success",
            data: sparses
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

// Dem so ngay lo chua ra va ngay cuoi cung no ra
const countAllSparses = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAllSparses();
        const array = Object.values(sparses)
        var countSparseArray = []
        for (var i = 0; i < 100; i++) {
            var sparse = { id: 0, count: 0, lastDate: new Date("2023-01-01T00:00:00.000Z") }
            countSparseArray.push(sparse)
        }
        // Dem so ngay lo chua ra
        const countLastSparse = (number, count) => {
            if (number == 0) {
                count += 1
            }
            else {
                count = 0
            }
            return count
        }

        // Dem ngay cuoi cung lo ra
        const countLastDate = (number, lastDate, count, date) => {
            if (number == 0) {
                count += 1
            }
            else {
                count = 0
            }
            if (count != 0) {
                lastDate = date
            }
            return lastDate
        }
        const superCount = (index, number, date) => {
            countSparseArray[index].id = index
            countSparseArray[index].count = countLastSparse(number, countSparseArray[index].count)
            countSparseArray[index].lastDate = countLastDate(number, date, countSparseArray[index].count, countSparseArray[index].lastDate)
        }
        // Lap tat ca cac ban ghi trong database        
        for (var i = 0; i < array.length; i++) {
            superCount(0, array[i].num00, array[i].draw_date)
            superCount(1, array[i].num01, array[i].draw_date)
            superCount(2, array[i].num02, array[i].draw_date)
            superCount(3, array[i].num03, array[i].draw_date)
            superCount(4, array[i].num04, array[i].draw_date)
            superCount(5, array[i].num05, array[i].draw_date)
            superCount(6, array[i].num06, array[i].draw_date)
            superCount(7, array[i].num07, array[i].draw_date)
            superCount(8, array[i].num08, array[i].draw_date)
            superCount(9, array[i].num09, array[i].draw_date)
            superCount(10, array[i].num10, array[i].draw_date)

            superCount(11, array[i].num11, array[i].draw_date)
            superCount(12, array[i].num12, array[i].draw_date)
            superCount(13, array[i].num13, array[i].draw_date)
            superCount(14, array[i].num14, array[i].draw_date)
            superCount(15, array[i].num15, array[i].draw_date)
            superCount(16, array[i].num16, array[i].draw_date)
            superCount(17, array[i].num17, array[i].draw_date)
            superCount(18, array[i].num18, array[i].draw_date)
            superCount(19, array[i].num19, array[i].draw_date)

            superCount(20, array[i].num20, array[i].draw_date)
            superCount(21, array[i].num21, array[i].draw_date)
            superCount(22, array[i].num22, array[i].draw_date)
            superCount(23, array[i].num23, array[i].draw_date)
            superCount(24, array[i].num24, array[i].draw_date)
            superCount(25, array[i].num25, array[i].draw_date)
            superCount(26, array[i].num26, array[i].draw_date)
            superCount(27, array[i].num27, array[i].draw_date)
            superCount(28, array[i].num28, array[i].draw_date)
            superCount(29, array[i].num29, array[i].draw_date)

            superCount(30, array[i].num30, array[i].draw_date)
            superCount(31, array[i].num31, array[i].draw_date)
            superCount(32, array[i].num32, array[i].draw_date)
            superCount(33, array[i].num33, array[i].draw_date)
            superCount(34, array[i].num34, array[i].draw_date)
            superCount(35, array[i].num35, array[i].draw_date)
            superCount(36, array[i].num36, array[i].draw_date)
            superCount(37, array[i].num37, array[i].draw_date)
            superCount(38, array[i].num38, array[i].draw_date)
            superCount(39, array[i].num39, array[i].draw_date)

            superCount(40, array[i].num40, array[i].draw_date)
            superCount(41, array[i].num41, array[i].draw_date)
            superCount(42, array[i].num42, array[i].draw_date)
            superCount(43, array[i].num43, array[i].draw_date)
            superCount(44, array[i].num44, array[i].draw_date)
            superCount(45, array[i].num45, array[i].draw_date)
            superCount(46, array[i].num46, array[i].draw_date)
            superCount(47, array[i].num47, array[i].draw_date)
            superCount(48, array[i].num48, array[i].draw_date)
            superCount(49, array[i].num49, array[i].draw_date)

            superCount(50, array[i].num50, array[i].draw_date)
            superCount(51, array[i].num51, array[i].draw_date)
            superCount(52, array[i].num52, array[i].draw_date)
            superCount(53, array[i].num53, array[i].draw_date)
            superCount(54, array[i].num54, array[i].draw_date)
            superCount(55, array[i].num55, array[i].draw_date)
            superCount(56, array[i].num56, array[i].draw_date)
            superCount(57, array[i].num57, array[i].draw_date)
            superCount(58, array[i].num58, array[i].draw_date)
            superCount(59, array[i].num59, array[i].draw_date)

            superCount(60, array[i].num60, array[i].draw_date)
            superCount(61, array[i].num61, array[i].draw_date)
            superCount(62, array[i].num62, array[i].draw_date)
            superCount(63, array[i].num63, array[i].draw_date)
            superCount(64, array[i].num64, array[i].draw_date)
            superCount(65, array[i].num65, array[i].draw_date)
            superCount(66, array[i].num66, array[i].draw_date)
            superCount(67, array[i].num67, array[i].draw_date)
            superCount(68, array[i].num68, array[i].draw_date)
            superCount(69, array[i].num69, array[i].draw_date)

            superCount(70, array[i].num70, array[i].draw_date)
            superCount(71, array[i].num71, array[i].draw_date)
            superCount(72, array[i].num72, array[i].draw_date)
            superCount(73, array[i].num73, array[i].draw_date)
            superCount(74, array[i].num74, array[i].draw_date)
            superCount(75, array[i].num75, array[i].draw_date)
            superCount(76, array[i].num76, array[i].draw_date)
            superCount(77, array[i].num77, array[i].draw_date)
            superCount(78, array[i].num78, array[i].draw_date)
            superCount(79, array[i].num79, array[i].draw_date)

            superCount(80, array[i].num80, array[i].draw_date)
            superCount(81, array[i].num81, array[i].draw_date)
            superCount(82, array[i].num82, array[i].draw_date)
            superCount(83, array[i].num83, array[i].draw_date)
            superCount(84, array[i].num84, array[i].draw_date)
            superCount(85, array[i].num85, array[i].draw_date)
            superCount(86, array[i].num86, array[i].draw_date)
            superCount(87, array[i].num87, array[i].draw_date)
            superCount(88, array[i].num88, array[i].draw_date)
            superCount(89, array[i].num89, array[i].draw_date)

            superCount(90, array[i].num90, array[i].draw_date)
            superCount(91, array[i].num91, array[i].draw_date)
            superCount(92, array[i].num92, array[i].draw_date)
            superCount(93, array[i].num93, array[i].draw_date)
            superCount(94, array[i].num94, array[i].draw_date)
            superCount(95, array[i].num95, array[i].draw_date)
            superCount(96, array[i].num96, array[i].draw_date)
            superCount(97, array[i].num97, array[i].draw_date)
            superCount(98, array[i].num98, array[i].draw_date)
            superCount(99, array[i].num99, array[i].draw_date)
        }
        res.status(200).json({
            message: "Success",
            data: countSparseArray
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}




// Dem so lan lo ra trong thang
const countMonthlySparse = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAllSparses();
        const array = Object.values(sparses)
        var countSparseArray = []
        for (var i = 0; i < 100; i++) {
            var sparse = { id: 0, count: 0 }
            countSparseArray.push(sparse)
        }
        // Dem so lan lo to ra
        const countSparseTime = (number, count) => {
            count = count + number
            return count
        }
        const superCount = (index, number) => {
            countSparseArray[index].id = index
            countSparseArray[index].count = countSparseArray[index].count + Number(number)
        }

        var thisMonth = new Date(process.env.THIS_MONTH)
        // Lap tat ca cac ban ghi trong database        
        for (var i = 0; i < array.length; i++) {
            var date = new Date(array[i].draw_date)
            // var thisMonth = new Date("2023-10-01T00:00:00.000Z")
            if (date >= thisMonth) {
                superCount(0, array[i].num00)
                superCount(1, array[i].num01)
                superCount(2, array[i].num02)
                superCount(3, array[i].num03)
                superCount(4, array[i].num04)
                superCount(5, array[i].num05)
                superCount(6, array[i].num06)
                superCount(7, array[i].num07)
                superCount(8, array[i].num08)
                superCount(9, array[i].num09)

                superCount(10, array[i].num10)
                superCount(11, array[i].num11)
                superCount(12, array[i].num12)
                superCount(13, array[i].num13)
                superCount(14, array[i].num14)
                superCount(15, array[i].num15)
                superCount(16, array[i].num16)
                superCount(17, array[i].num17)
                superCount(18, array[i].num18)
                superCount(19, array[i].num19)

                superCount(20, array[i].num20)
                superCount(21, array[i].num21)
                superCount(22, array[i].num22)
                superCount(23, array[i].num23)
                superCount(24, array[i].num24)
                superCount(25, array[i].num25)
                superCount(26, array[i].num26)
                superCount(27, array[i].num27)
                superCount(28, array[i].num28)
                superCount(29, array[i].num29)

                superCount(30, array[i].num30)
                superCount(31, array[i].num31)
                superCount(32, array[i].num32)
                superCount(33, array[i].num33)
                superCount(34, array[i].num34)
                superCount(35, array[i].num35)
                superCount(36, array[i].num36)
                superCount(37, array[i].num37)
                superCount(38, array[i].num38)
                superCount(39, array[i].num39)

                superCount(40, array[i].num40)
                superCount(41, array[i].num41)
                superCount(42, array[i].num42)
                superCount(43, array[i].num43)
                superCount(44, array[i].num44)
                superCount(45, array[i].num45)
                superCount(46, array[i].num46)
                superCount(47, array[i].num47)
                superCount(48, array[i].num48)
                superCount(49, array[i].num49)

                superCount(50, array[i].num50)
                superCount(51, array[i].num51)
                superCount(52, array[i].num52)
                superCount(53, array[i].num53)
                superCount(54, array[i].num54)
                superCount(55, array[i].num55)
                superCount(56, array[i].num56)
                superCount(57, array[i].num57)
                superCount(58, array[i].num58)
                superCount(59, array[i].num59)

                superCount(60, array[i].num60)
                superCount(61, array[i].num61)
                superCount(62, array[i].num62)
                superCount(63, array[i].num63)
                superCount(64, array[i].num64)
                superCount(65, array[i].num65)
                superCount(66, array[i].num66)
                superCount(67, array[i].num67)
                superCount(68, array[i].num68)
                superCount(69, array[i].num69)

                superCount(70, array[i].num70)
                superCount(71, array[i].num71)
                superCount(72, array[i].num72)
                superCount(73, array[i].num73)
                superCount(74, array[i].num74)
                superCount(75, array[i].num75)
                superCount(76, array[i].num76)
                superCount(77, array[i].num77)
                superCount(78, array[i].num78)
                superCount(79, array[i].num79)

                superCount(80, array[i].num80)
                superCount(81, array[i].num81)
                superCount(82, array[i].num82)
                superCount(83, array[i].num83)
                superCount(84, array[i].num84)
                superCount(85, array[i].num85)
                superCount(86, array[i].num86)
                superCount(87, array[i].num87)
                superCount(88, array[i].num88)
                superCount(89, array[i].num89)

                superCount(90, array[i].num90)
                superCount(91, array[i].num91)
                superCount(92, array[i].num92)
                superCount(93, array[i].num93)
                superCount(94, array[i].num94)
                superCount(95, array[i].num95)
                superCount(96, array[i].num96)
                superCount(97, array[i].num97)
                superCount(98, array[i].num98)
                superCount(99, array[i].num99)
            }

        }
        res.status(200).json({
            message: "Success",
            data: countSparseArray
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}




// Dem so ngay gan cua tat ca ca so
const countAllSparsesGan = async (req, res) => {
    try {
        const sparses = await sparseRepository.getAllSparses();
        const array = Object.values(sparses);
        var fullGanArray = []

        for (var i = 0; i < 100; i++) {
            var ganArray = []
            fullGanArray.push(ganArray)
        }
        // Lap tat ca cac ban ghi trong database      
        const gan = (number, numId, date)=>{
            if(number !=0){
                const gan = { numId, lastDate: new Date("2023-01-01T00:00:00.000Z"), newDate: date}
                if(fullGanArray[numId].length >0){
                    gan.lastDate = fullGanArray[numId][fullGanArray[numId].length-1].newDate
                }
                fullGanArray[numId].push(gan)

            }
        }  
        let sortedArray = array.sort(
            (p1, p2) => (p1.draw_date > p2.draw_date) ? 1 : (p1.draw_date < p2.draw_date) ? -1 : 0)
        // var thisYear = new Date("2023-01-01T00:00:00.000Z")
        var thisYear = new Date(process.env.THIS_YEAR)
        for (var i = 0; i < sortedArray.length; i++) {
            if (sortedArray[i].draw_date >= thisYear) {
            gan(sortedArray[i].num00, 0, sortedArray[i].draw_date)
            gan(array[i].num01, 1, array[i].draw_date)
            gan(array[i].num02, 2, array[i].draw_date)
            gan(array[i].num03, 3, array[i].draw_date)
            gan(array[i].num04, 4, array[i].draw_date)
            gan(array[i].num05, 5, array[i].draw_date)
            gan(array[i].num06, 6, array[i].draw_date)
            gan(array[i].num07, 7, array[i].draw_date)
            gan(array[i].num08, 8, array[i].draw_date)
            gan(array[i].num09, 9, array[i].draw_date)

            gan(array[i].num10, 10, array[i].draw_date)
            gan(array[i].num11, 11, array[i].draw_date)
            gan(array[i].num12, 12, array[i].draw_date)
            gan(array[i].num13, 13, array[i].draw_date)
            gan(array[i].num14, 14, array[i].draw_date)
            gan(array[i].num15, 15, array[i].draw_date)
            gan(array[i].num16, 16, array[i].draw_date)
            gan(array[i].num17, 17, array[i].draw_date)
            gan(array[i].num18, 18, array[i].draw_date)
            gan(array[i].num19, 19, array[i].draw_date)

            gan(array[i].num20, 20, array[i].draw_date)
            gan(array[i].num21, 21, array[i].draw_date)
            gan(array[i].num22, 22, array[i].draw_date)
            gan(array[i].num23, 23, array[i].draw_date)
            gan(array[i].num24, 24, array[i].draw_date)
            gan(array[i].num25, 25, array[i].draw_date)
            gan(array[i].num26, 26, array[i].draw_date)
            gan(array[i].num27, 27, array[i].draw_date)
            gan(array[i].num28, 28, array[i].draw_date)
            gan(array[i].num29, 29, array[i].draw_date)

            gan(array[i].num30, 30, array[i].draw_date)
            gan(array[i].num31, 31, array[i].draw_date)
            gan(array[i].num32, 32, array[i].draw_date)
            gan(array[i].num33, 33, array[i].draw_date)
            gan(array[i].num34, 34, array[i].draw_date)
            gan(array[i].num35, 35, array[i].draw_date)
            gan(array[i].num36, 36, array[i].draw_date)
            gan(array[i].num37, 37, array[i].draw_date)
            gan(array[i].num38, 38, array[i].draw_date)
            gan(array[i].num39, 39, array[i].draw_date)

            gan(array[i].num40, 40, array[i].draw_date)
            gan(array[i].num41, 41, array[i].draw_date)
            gan(array[i].num42, 42, array[i].draw_date)
            gan(array[i].num43, 43, array[i].draw_date)
            gan(array[i].num44, 44, array[i].draw_date)
            gan(array[i].num45, 45, array[i].draw_date)
            gan(array[i].num46, 46, array[i].draw_date)
            gan(array[i].num47, 47, array[i].draw_date)
            gan(array[i].num48, 48, array[i].draw_date)
            gan(array[i].num49, 49, array[i].draw_date)

            gan(array[i].num50, 50, array[i].draw_date)
            gan(array[i].num51, 51, array[i].draw_date)
            gan(array[i].num52, 52, array[i].draw_date)
            gan(array[i].num53, 53, array[i].draw_date)
            gan(array[i].num54, 54, array[i].draw_date)
            gan(array[i].num55, 55, array[i].draw_date)
            gan(array[i].num56, 56, array[i].draw_date)
            gan(array[i].num57, 57, array[i].draw_date)
            gan(array[i].num58, 58, array[i].draw_date)
            gan(array[i].num59, 59, array[i].draw_date)

            gan(array[i].num60, 60, array[i].draw_date)
            gan(array[i].num61, 61, array[i].draw_date)
            gan(array[i].num62, 62, array[i].draw_date)
            gan(array[i].num63, 63, array[i].draw_date)
            gan(array[i].num64, 64, array[i].draw_date)
            gan(array[i].num65, 65, array[i].draw_date)
            gan(array[i].num66, 66, array[i].draw_date)
            gan(array[i].num67, 67, array[i].draw_date)
            gan(array[i].num68, 68, array[i].draw_date)
            gan(array[i].num69, 69, array[i].draw_date)

            gan(array[i].num70, 70, array[i].draw_date)
            gan(array[i].num71, 71, array[i].draw_date)
            gan(array[i].num72, 72, array[i].draw_date)
            gan(array[i].num73, 73, array[i].draw_date)
            gan(array[i].num74, 74, array[i].draw_date)
            gan(array[i].num75, 75, array[i].draw_date)
            gan(array[i].num76, 76, array[i].draw_date)
            gan(array[i].num77, 77, array[i].draw_date)
            gan(array[i].num78, 78, array[i].draw_date)
            gan(array[i].num79, 79, array[i].draw_date)

            gan(array[i].num80, 80, array[i].draw_date)
            gan(array[i].num81, 81, array[i].draw_date)
            gan(array[i].num82, 82, array[i].draw_date)
            gan(array[i].num83, 83, array[i].draw_date)
            gan(array[i].num84, 84, array[i].draw_date)
            gan(array[i].num85, 85, array[i].draw_date)
            gan(array[i].num86, 86, array[i].draw_date)
            gan(array[i].num87, 87, array[i].draw_date)
            gan(array[i].num88, 88, array[i].draw_date)
            gan(array[i].num89, 89, array[i].draw_date)

            gan(array[i].num90, 90, array[i].draw_date)
            gan(array[i].num91, 91, array[i].draw_date)
            gan(array[i].num92, 92, array[i].draw_date)
            gan(array[i].num93, 93, array[i].draw_date)
            gan(array[i].num94, 94, array[i].draw_date)
            gan(array[i].num95, 95, array[i].draw_date)
            gan(array[i].num96, 96, array[i].draw_date)
            gan(array[i].num97, 97, array[i].draw_date)
            gan(array[i].num98, 98, array[i].draw_date)
            gan(array[i].num99, 99, array[i].draw_date)
        }
    }
        res.status(200).json({
            message: "Success",
            data: fullGanArray
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}


export default {
    getAllSparses,
    countAllSparses,
    countMonthlySparse,
    countAllSparsesGan
}