import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthlyStats = [
  { month: "Tháng 1", income: 8000000, expenses: 5000000, profit: 3000000 },
  { month: "Tháng 2", income: 12000000, expenses: 7000000, profit: 5000000 },
  { month: "Tháng 3", income: 15000000, expenses: 10000000, profit: 5000000 },
  { month: "Tháng 4", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 5", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 6", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 7", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 8", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 9", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 10", income: 20000000, expenses: 15000000, profit: 5000000 },
  { month: "Tháng 11", income: 20000000, expenses: 15000000, profit: 5000000 }
];

const MonthlyStatsChart = () => {
  // Chuẩn bị dữ liệu cho biểu đồ
  const data = {
    labels: monthlyStats.map((row) => row.month), // Các tháng
    datasets: [
      {
        label: "Thu Nhập",
        data: monthlyStats.map((row) => row.income),
        backgroundColor: "rgba(0, 123, 255, 0.5)", // Màu nền cho cột Thu Nhập
      },
      {
        label: "Chi Phí",
        data: monthlyStats.map((row) => row.expenses),
        backgroundColor: "rgba(220, 53, 69, 0.5)", // Màu nền cho cột Chi Phí
      },
      {
        label: "Lợi Nhuận",
        data: monthlyStats.map((row) => row.profit),
        backgroundColor: "rgba(40, 167, 69, 0.5)", // Màu nền cho cột Lợi Nhuận
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Thống Kê Thu Chi Hàng Tháng"
      },
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyStatsChart;
