import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  return <h2>Dashboard Under Maintenance</h2>;
  //   const [brandData, setBrandData] = useState({});

  //   useEffect(() => {
  //     // Fetch data from db.json or your API
  //     axios.get("http://localhost:3001/data").then((response) => {
  //
  //       const cartItems = response.data.cart;

  //
  //       const uniqueBrands = [
  //         ...new Set(cartItems.map((item) => item.brandName)),
  //       ];

  //
  //       const brandCounts = uniqueBrands.map((brand) => {
  //         return cartItems.filter((item) => item.brandName === brand).length;
  //       });

  //
  //       const data = {
  //         labels: uniqueBrands,
  //         datasets: [
  //           {
  //             label: "Brand Counts",
  //             data: brandCounts,
  //             backgroundColor: "rgba(75,192,192,0.6)",
  //           },
  //         ],
  //       };

  //       setBrandData(data);
  //     });
  //   }, []);

  //   return (
  //     <div>
  //       <h2>Brand Count Bar Chart</h2>
  //       <div style={{ width: "80%", margin: "0 auto" }}>
  //         <Bar
  //           data={brandData}
  //           options={{
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //                 title: {
  //                   display: true,
  //                   text: "Count",
  //                 },
  //               },
  //             },
  //           }}
  //         />
  //       </div>
  //     </div>
  //   );
};

export default Dashboard;
