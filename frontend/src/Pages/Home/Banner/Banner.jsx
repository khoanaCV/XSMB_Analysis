import "@fontsource/josefin-sans";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import authService from "../../../services/auth";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import "./Banner.css";

const Banner = () => {
  const [isUser, setIsUser] = useState(false);
  const [lotteryResults, setLotteryResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [displayResults, setDisplayResults] = useState([]);
  const [headsTable, setHeadsTable] = useState({});
  const [tailsTable, setTailsTable] = useState({});

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsUser(user.role === "user");
    }
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const extractPrizes = (result) => {
    // Tạo một mảng mới chỉ chứa các giá trị của các giải thưởng
    return [
      result.special_prize,
      result.prize1,
      result.prize2_1,
      result.prize2_2,
      result.prize3_1,
      result.prize3_2,
      result.prize3_3,
      result.prize3_4,
      result.prize3_5,
      result.prize3_6,
      result.prize4_1,
      result.prize4_2,
      result.prize4_3,
      result.prize4_4,
      result.prize5_1,
      result.prize5_2,
      result.prize5_3,
      result.prize5_4,
      result.prize5_5,
      result.prize5_6,
      result.prize6_1,
      result.prize6_2,
      result.prize6_3,
      result.prize7_1,
      result.prize7_2,
      result.prize7_3,
      result.prize7_4,
      
    ]
      .flat()
      .map((number) => number.toString().padStart(2, "0")); // Sử dụng .flat() để làm phẳng mảng trong trường hợp các giải có nhiều hơn một số
  };

  const extractLastTwoDigits = (prizes) => {
    const heads = {};
    const tails = {};

    // Khởi tạo các mảng cho từng chữ số từ 0 đến 9
    for (let i = 0; i <= 9; i++) {
      heads[i] = new Set();
      tails[i] = new Set();
    }

    prizes.forEach((number) => {
      if (typeof number === "string" && number.length >= 2) {
        const lastTwoDigits = number.slice(-2); // Lấy hai chữ số cuối cùng
        const head = lastTwoDigits[0]; // Chữ số đầu tiên của hai chữ số cuối
        const tail = lastTwoDigits[1]; // Chữ số thứ hai của hai chữ số cuối

        // Thêm vào "Bảng đầu" và "Bảng đuôi" nếu chưa có
        if (head) heads[head].add(number);
        if (tail) tails[tail].add(number);
      }
    });

    // Chuyển các Set thành mảng và sắp xếp các số trong mỗi mảng
    for (let i = 0; i <= 9; i++) {
      heads[i] = [...heads[i]].sort();
      tails[i] = [...tails[i]].sort();
    }

    return { heads, tails };
  };

  const handleSearch = () => {
    if (Array.isArray(lotteryResults)) {
      const filteredResults = lotteryResults.filter((result) => {
        const resultDate = utcToZonedTime(
          parseISO(result.draw_date),
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );
        return format(resultDate, "yyyy-MM-dd") === selectedDate;
      });

      if (filteredResults.length > 0) {
        // Chúng ta chỉ lấy kết quả cuối cùng trong ngày đó
        const lastResult = filteredResults[filteredResults.length - 1];

        // Lấy ra mảng các giải thưởng từ kết quả cuối cùng
        const prizes = extractPrizes(lastResult);

        // Trích xuất hai chữ số cuối và tạo "Bảng đầu" và "Bảng đuôi"
        const { heads, tails } = extractLastTwoDigits(prizes);

        setDisplayResults([lastResult]);
        setHeadsTable(heads);
        setTailsTable(tails);
      }
    } else {
      console.error("Expected lotteryResults to be an array.", lotteryResults);
    }
  };

  useEffect(() => {
    fetch("http://localhost:9999/results")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && Array.isArray(responseData.data)) {
          setLotteryResults(responseData.data);
          
          // Tìm kết quả mới nhất
          const latestResult = responseData.data.reduce((prev, current) => {
            return (prev.draw_date > current.draw_date) ? prev : current;
          });
  
          // Cài đặt ngày mới nhất
          const latestDate = format(
            utcToZonedTime(
              parseISO(latestResult.draw_date),
              Intl.DateTimeFormat().resolvedOptions().timeZone
            ),
            "yyyy-MM-dd"
          );
          setSelectedDate(latestDate);
  
          // Hiển thị kết quả dựa trên ngày mới nhất
          setDisplayResults([latestResult]);
          const prizes = extractPrizes(latestResult);
          const { heads, tails } = extractLastTwoDigits(prizes);
          setHeadsTable(heads);
          setTailsTable(tails);
        } else {
          console.error("Unexpected format of fetched data", responseData);
        }
      })
      .catch((error) => {
        console.error("Failed to load lottery results:", error);
      });
  }, []);
  

  return (
    <section className=" text-black d-flex justify-content-center align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col md={12} sm={12} lg={6}>
            <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start">
              <h2>
                This is our Northern Vietnam Lottery Statistics And Analysis
                Website
              </h2>
              <h1>Join with us!</h1>
              <p className="mb-xs-5"></p>
              <div className="banner-btn m-sm-auto">
                {!isUser && (
                  <Link to="/login">
                    <button className="theme-btn btn-fill">Join Now</button>
                  </Link>
                )}
                <button className="theme-btn bth-blank">Learn More</button>
              </div>
            </div>
          </Col>
          <Col md={12} sm={12} lg={6}>
            <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start">
              {" "}
              <br></br> <br></br>
              <h2>Kết Quả Xổ Số Miền Bắc</h2>
              <div>
                <div class="input-group mb-3">
                  {/* <div class="input-group-prepend">
                    <h5>Ngày trong tuần:&nbsp;</h5>
                  </div> */}
                  {/* <select class="custom-select" id="inputGroupSelect01">
                    <option selected>Tất cả</option>
                    <option value="2">Thứ 2</option>
                    <option value="3">Thứ 3</option>
                    <option value="4">Thứ 4</option>
                    <option value="5">Thứ 5</option>
                    <option value="6">Thứ 6</option>
                    <option value="7">Thứ 7</option>
                    <option value="8">Chủ Nhật</option>
                  </select> */}
                  {/* <h5>&nbsp;Số ngày:&nbsp;</h5>
                  <input type="text"></input> */}
                  <h5>Chọn ngày&nbsp;</h5>{" "}
                  <input type="date" onChange={handleDateChange} />
                  &nbsp;
                  {/* <input type="checkbox"></input> <h5>&nbsp;Bảng đầu đuôi</h5>{" "}
                  &nbsp; */}
                  {/* <input type="checkbox"></input>{" "}
                  <h5>&nbsp;Chỉ hiện giải ĐB</h5> */}
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleSearch}
                  >
                    Xem kết quả
                  </button>
                </div>
              </div>
              <td valign="top">
                {displayResults.map((result, index) => (
                  <table
                    key={index}
                    className="table table-bordered text-black text-center"
                    cellSpacing="1"
                    cellPadding="9"
                  >
                    <thead>
                      <tr>
                        <th colSpan="13" className="kqcell kq_ngay">
                          {format(
                            parseISO(result.draw_date),
                            "EEEE - dd/MM/yyyy",
                            { locale: vi }
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="leftcol">ĐB</td>
                        <td colSpan="12" className="kqcell kq_0 text-danger">
                          {result.special_prize}
                        </td>
                      </tr>
                      <tr>
                        <td className="leftcol">Nhất</td>
                        <td colSpan="12" className="kqcell kq_1">
                          {result.prize1}
                        </td>
                      </tr>
                      <tr>
                        <td className="leftcol">Nhì</td>
                        <td colSpan="6" className="kqcell kq_2">
                          {result.prize2_1}
                        </td>
                        <td colSpan="6" className="kqcell kq_3">
                          {result.prize2_2}
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="2" className="leftcol">
                          Ba
                        </td>
                        <td colSpan="4" className="kqcell kq_4">
                          {result.prize3_1}
                        </td>
                        <td colSpan="4" className="kqcell kq_5">
                          {result.prize3_2}
                        </td>
                        <td colSpan="4" className="kqcell kq_6">
                          {result.prize3_3}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="kqcell kq_7">
                          {result.prize3_4}
                        </td>
                        <td colSpan="4" className="kqcell kq_8">
                          {result.prize3_5}
                        </td>
                        <td colSpan="4" className="kqcell kq_9">
                          {result.prize3_6}
                        </td>
                      </tr>
                      <tr>
                        <td className="leftcol">Tư</td>
                        <td colSpan="3" className="kqcell kq_10">
                          {result.prize4_1}
                        </td>
                        <td colSpan="3" className="kqcell kq_11">
                          {result.prize4_2}
                        </td>
                        <td colSpan="3" className="kqcell kq_12">
                          {result.prize4_3}
                        </td>
                        <td colSpan="3" className="kqcell kq_13">
                          {result.prize4_4}
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="2" className="leftcol">
                          Năm
                        </td>
                        <td colSpan="4" className="kqcell kq_14">
                          {result.prize5_1}
                        </td>
                        <td colSpan="4" className="kqcell kq_15">
                          {result.prize5_2}
                        </td>
                        <td colSpan="4" className="kqcell kq_16">
                          {result.prize5_3}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="kqcell kq_17">
                          {result.prize5_4}
                        </td>
                        <td colSpan="4" className="kqcell kq_18">
                          {result.prize5_5}
                        </td>
                        <td colSpan="4" className="kqcell kq_19">
                          {result.prize5_6}
                        </td>
                      </tr>
                      <tr>
                        <td className="leftcol">Sáu</td>
                        <td colSpan="4" className="kqcell kq_20">
                          {result.prize6_1}
                        </td>
                        <td colSpan="4" className="kqcell kq_21">
                          {result.prize6_2}
                        </td>
                        <td colSpan="4" className="kqcell kq_22">
                          {result.prize6_3}
                        </td>
                      </tr>
                      <tr>
                        <td className="leftcol">Bảy</td>
                        <td colSpan="3" className="kqcell kq_23">
                          {result.prize7_1}
                        </td>
                        <td colSpan="3" className="kqcell kq_24">
                          {result.prize7_2}
                        </td>
                        <td colSpan="3" className="kqcell kq_25">
                          {result.prize7_3}
                        </td>
                        <td colSpan="3" className="kqcell kq_26">
                          {result.prize7_4}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </td>
              <td valign="top">
                <table
                  className="table table-bordered text-black text-center"
                  cellSpacing="1"
                  cellPadding="9"
                >
                  <tbody>
                    <tr>
                      <th>Đầu</th>
                      <th>&nbsp;</th>
                    </tr>
                    {Object.keys(headsTable).map((head) => (
                      <tr key={head}>
                        <td className="leftcol">{head}</td>
                        <td>
                          {headsTable[head]
                            .map((number) => number.slice(-1))
                            .join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td valign="top">
                <table
                  className="table table-bordered text-black text-center"
                  cellSpacing="1"
                  cellPadding="9"
                >
                  <tbody>
                    <tr>
                      <th>Đuôi</th>
                      <th>&nbsp;</th>
                    </tr>
                    {Object.keys(tailsTable).map((tail) => (
                      <tr key={tail}>
                        <td className="leftcol">{tail}</td>
                        <td>
                          {tailsTable[tail]
                            .map((number) =>
                              number.length > 1 ? number.slice(-2, -1) : "0"
                            )
                            .join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
