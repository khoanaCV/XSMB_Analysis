import "@fontsource/josefin-sans";
import { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import authService from "../../../services/auth.service";
import './Banner.css';



const Banner = () => {

    const [isUser, setIsUser] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setIsUser(user.roles.includes("ROLE_USER"));
            setCurrentUser(user)
        }
    }, []);

    return (
        <section className="single-hero-slide text-white d-flex justify-content-center align-items-center">
            <Container>
                <Row className="align-items-center">
                    <Col md={12} sm={12} lg={6}>
                        <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start">
                            <h2>This is our Northern Vietnam Lottery Statistics And Analysis Website</h2>
                            <h1>Join with us!</h1>
                            <p className="mb-xs-5"></p>
                            <div className="banner-btn m-sm-auto">
                                {!isUser && (
                                    <Link to="/login"><button className="theme-btn btn-fill">Join Now</button></Link>
                                )}
                                <button className='theme-btn bth-blank'>Learn More</button>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} sm={12} lg={6}>
                        <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start">
                            <h2>Kết Quả Xổ Số Miền Bắc</h2>
                            <div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <h5>Ngày trong tuần:&nbsp;</h5>
                                    </div>
                                    <select class="custom-select" id="inputGroupSelect01">
                                        <option selected>Tất cả</option>
                                        <option value="2">Thứ 2</option>
                                        <option value="3">Thứ 3</option>
                                        <option value="4">Thứ 4</option>
                                        <option value="5">Thứ 5</option>
                                        <option value="6">Thứ 6</option>
                                        <option value="7">Thứ 7</option>
                                        <option value="8">Chủ Nhật</option>
                                    </select>
                                    <h5>Số ngày:&nbsp;</h5><input type="text"></input>
                                    <h5>Đến ngày&nbsp;</h5> <input type="date"></input>&nbsp;
                                    <input type="checkbox"></input> <h5>&nbsp;Bảng đầu đuôi</h5> &nbsp;
                                    <input type="checkbox"></input> <h5>&nbsp;Chỉ hiện giải ĐB</h5>
                                <button type="button" class="btn btn-success">Xem kết quả</button>

                                </div> 
                            </div>
                            <td valign="top">
                                <table className= "table table-bordered text-white text-center" cellSpacing="1" cellPadding="9">
                                    <thead>
                                        <tr>
                                            <th colSpan="13" className="kqcell kq_ngay">Thứ Ba - 24/10/2023</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="leftcol">ĐB</td>
                                            <td colSpan="12" className="kqcell kq_0 text-danger">91388</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">Nhất</td>
                                            <td colSpan="12" className="kqcell kq_1">78862</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">Nhì</td>
                                            <td colSpan="6" className="kqcell kq_2">77232</td>
                                            <td colSpan="6" className="kqcell kq_3">16765</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="2" className="leftcol">Ba</td>
                                            <td colSpan="4" className="kqcell kq_4">83198</td>
                                            <td colSpan="4" className="kqcell kq_5">94073</td>
                                            <td colSpan="4" className="kqcell kq_6">76943</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="kqcell kq_7">75283</td>
                                            <td colSpan="4" className="kqcell kq_8">42518</td>
                                            <td colSpan="4" className="kqcell kq_9">84151</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">Tư</td>
                                            <td colSpan="3" className="kqcell kq_10">2559</td>
                                            <td colSpan="3" className="kqcell kq_11">0557</td>
                                            <td colSpan="3" className="kqcell kq_12">2718</td>
                                            <td colSpan="3" className="kqcell kq_13">5845</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="2" className="leftcol">Năm</td>
                                            <td colSpan="4" className="kqcell kq_14">9655</td>
                                            <td colSpan="4" className="kqcell kq_15">5887</td>
                                            <td colSpan="4" className="kqcell kq_16">7722</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="kqcell kq_17">2876</td>
                                            <td colSpan="4" className="kqcell kq_18">6540</td>
                                            <td colSpan="4" className="kqcell kq_19">3629</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">Sáu</td>
                                            <td colSpan="4" className="kqcell kq_20">908</td>
                                            <td colSpan="4" className="kqcell kq_21">426</td>
                                            <td colSpan="4" className="kqcell kq_22">722</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">Bảy</td>
                                            <td colSpan="3" className="kqcell kq_23">09</td>
                                            <td colSpan="3" className="kqcell kq_24">29</td>
                                            <td colSpan="3" className="kqcell kq_25">59</td>
                                            <td colSpan="3" className="kqcell kq_26">16</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>

                            <td valign="top">
                                <table className="table table-bordered text-white text-center" cellSpacing="1" cellPadding="9">
                                    <tbody>
                                        <tr>
                                            <th>Đầu</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">0</td>
                                            <td className="dau_0">08, 09</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">1</td>
                                            <td className="dau_1">16, 18, 18</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">2</td>
                                            <td className="dau_2">22, 22, 26, 29, 29</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">3</td>
                                            <td className="dau_3">32</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">4</td>
                                            <td className="dau_4">40, 43, 45</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">5</td>
                                            <td className="dau_5">51, 55, 57, 59, 59</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">6</td>
                                            <td className="dau_6">62, 65</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">7</td>
                                            <td className="dau_7">73, 76</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">8</td>
                                            <td className="dau_8">83, 87, 88</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">9</td>
                                            <td className="dau_9">98</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td valign="top">
                                <table className="table table-bordered text-white text-center" cellSpacing="1" cellPadding="9">
                                    <tbody>
                                        <tr>
                                            <th>Đuôi</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">0</td>
                                            <td className="dit_0">40</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">1</td>
                                            <td className="dit_1">51</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">2</td>
                                            <td className="dit_2">22, 22, 32, 62</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">3</td>
                                            <td className="dit_3">43, 73, 83</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">4</td>
                                            <td className="dit_4">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">5</td>
                                            <td className="dit_5">45, 55, 65</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">6</td>
                                            <td className="dit_6">16, 26, 76</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">7</td>
                                            <td className="dit_7">57, 87</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">8</td>
                                            <td className="dit_8">08, 18, 18, 88, 98</td>
                                        </tr>
                                        <tr>
                                            <td className="leftcol">9</td>
                                            <td className="dit_9">09, 29, 29, 59, 59</td>
                                        </tr>
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

// import React, { useEffect, useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import authService from '../../../services/auth.service';
// import './Banner.css';

// const XoSoMienBac = () => {
//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
//         integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//         crossOrigin="anonymous"
//       />

//       <div className="col-xs-12">
//         <div className="block" id="kqngay_05102023" style={{ display: 'none' }}></div>
//         <div className="block" id="kqngay_04102023">
//           <div className="block-main-heading">
//             <h1>XSMB - Kết quả xổ số miền Bắc - SXMB</h1>
//           </div>
//           <div className="list-link">
//             <h2 className="class-title-list-link">
//               <a href="/xsmb-xo-so-mien-bac.html" title="XSMB" className="u-line">
//                 XSMB
//               </a>
//               <span>»</span>
//               <a href="/xsmb-thu-4.html" title="XSMB Thứ 4" className="u-line">
//                 XSMB Thứ 4
//               </a>
//               <span>»</span>
//               <a href="/xsmb-04-10-2023.html" title="XSMB  04/10/2023" className="u-line">
//                 XSMB 04/10/2023
//               </a>
//             </h2>
//           </div>
//           <div className="block-main-content">
//             <table className="table table-bordered table-striped table-xsmb">
//               <tbody>
//                 <tr>
//                   <td style={{ width: '15%' }}>Mã ĐB</td>
//                   <td className="text-center">
//                     <div className="madb">
//                       <span className="madb8 special-code div-horizontal">10ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 11ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 16ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 17ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 2ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 3ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 4ZH </span>
//                       <span className="madb8 special-code div-horizontal"> 8ZH</span>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>G.ĐB</td>
//                   <td className="text-center">
//                     <span className="special-prize-lg div-horizontal">53139</span>
//                   </td>
//                 </tr>
//                 {/* Các dòng tiếp theo */}
//               </tbody>
//             </table>
//           </div>
//           <hr className="line-adv" />
//           <div className="adv-side-bar">
//             <div className="adv-main-title">
//               <span className="link-pad-left textadv">Advertisements</span>
//             </div>
//             <div className="adv-main-content">
//               <div style={{ height: '10px' }}></div>
//               <script async="" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
//               <div id="gpt-passback">
//                 <script>
//                   {`
//                   window.googletag = window.googletag || { cmd: [] };
//                   googletag.cmd.push(function () {
//                     googletag
//                       .defineSlot('/154031234/Direct_Deal_336x280', [336, 280], 'gpt-passback')
//                       .addService(googletag.pubads());
//                     googletag.enableServices();
//                     googletag.display('gpt-passback');
//                   });
//                   `}
//                 </script>
//               </div>
//               <script src="https://api-sg.flygame.io/sdk/widget/xosodaiphat.com.3609.js" async=""></script>
//             </div>
//           </div>
//           <hr className="line-header" />
//           <div className="block-main-content">
//             <span className="link-pad-left padding10">Loto miền Bắc</span>
//             <table className="table table-bordered table-loto" style={{ marginBottom: '0' }}>
//               <tbody>
//                 <tr>
//                   <th className="col-md-2" style={{ width: '10%' }}>
//                     Đầu
//                   </th>
//                   <th className="col-md-4">Loto</th>
//                 </tr>
//                 <tr>
//                   <td className="text-center">0</td>
//                   <td>07, 00</td>
//                 </tr>
//                 {/* Các dòng tiếp theo */}
//               </tbody>
//             </table>
//           </div>
//           <div className="link-statistic">
//             <ul>
//               <li>
//                 Xem thống kê{' '}
//                 <a href="/cau-mien-bac/cau-bach-thu.html" title="Thống kê 2 điểm duy nhất">
//                   2 điểm duy nhất miền Bắc
//                 </a>
//               </li>
//               <li>
//                 Xem thống kê{' '}
//                 <a href="/thong-ke-lo-xien.html" title="Cặp loto cùng về miền Bắc">
//                   Cặp loto cùng về miền Bắc
//                 </a>
//               </li>
//               <li>
//                 Tham khảo{' '}
//                 <a href="/thong-ke-xsmb-c2579-article.html" title="Thống kê XSMB">
//                   Thống kê XSMB
//                 </a>
//               </li>
//               <li>
//                 <a href="/">KQXS</a> miền Bắc hôm nay siêu tốc - chính xác, trực tiếp{' '}
//                 <a href="/xsmb-xo-so-mien-bac.html">XSMB</a> lúc 18h15 mỗi ngày
//               </li>
//             </ul>
//           </div>
//         </div>
//         <hr className="line-adv" />
//         <div className="adv-side-bar">
//           <div className="adv-main-title">
//             <span className="link-pad-left textadv">Advertisements</span>
//           </div>
//           <div className="adv-main-content">
//             <div id="M802834ScriptRootC1423705"></div>
//             <script src="https://jsc.adskeeper.com/x/o/xosothienphu.com.1423705.js" async=""></script>
//             <div id="M662053ScriptRootC1425077"></div>
//             <script src="https://jsc.adskeeper.co.uk/x/o/xosodaiphat.com.1425077.js" async=""></script>
//             <script src="https://api.flygame.io/sdk/widget/xosodaiphat.com.3418.js" async=""></script>
//           </div>
//         </div>
//         <hr className="line-header" />
//         <style>
//           {`
//           @media(min-width:270px) and (max-width:640px) {
//             .hidenmobile {
//               display: none;
//             }
//             .post .post-container .post-content .post-title a {
//               font-size: 15px !important;
//             }
//           }
//           `}
//         </style>
//         <div className="bg-viewmore">
//           <img
//             className="loadmoreimg"
//             src="https://cdn.xosodaiphat.com/assets/images/Loading_icon.gif"
//             alt="xem thêm kết quả xổ số miền bắc"
//           />
//           <p className="btn-viewmore">
//             <span>
//               <a rel="nofollow" style={{ color: '#000', textDecoration: 'none' }} href="javascript:xsdp.Xsmb.loteryloadmore()" title="Xem thêm 7 kết quả XSMB">
//                 Xem Thêm
//               </a>
//             </span>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// const Banner = () => {
//   const [isUser, setIsUser] = useState(false);
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const user = authService.getCurrentUser();
//     if (user) {
//       setIsUser(user.roles.includes('ROLE_USER'));
//       setCurrentUser(user);
//     }
//   }, []);

//   return (
//     <section className="single-hero-slide text-white d-flex justify-content-center align-items-center">
//       <Container>
//         <Row className="align-items-center">
//           <Col md={12} sm={12} lg={6}>
//             <div className="hero-slide-left justify-content-end align-items-center text-center text-lg-start">
//               <h2>This is our Northern Vietnam Lottery Statistics And Analysis Website</h2>
//               <h1>Join with us!</h1>
//               <p className="mb-xs-5"></p>
//               <div className="banner-btn m-sm-auto">
//                 {!isUser && (
//                   <Link to="/login">
//                     <button className="theme-btn btn-fill">Join Now</button>
//                   </Link>
//                 )}
//                 <button className="theme-btn bth-blank">Learn More</button>
//               </div>
//             </div>
//           </Col>
//           <Col md={12} sm={12} lg={6} className="mt-sm-5">
//             <div className="hero-slide-right text-center text-lg-start mt-sm-5">
//               <div className="animate-img"></div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export { XoSoMienBac, Banner };
