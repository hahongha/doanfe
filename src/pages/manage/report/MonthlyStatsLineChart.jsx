import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

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

const MonthlyStatsLineChart = () => {
  // Chuẩn bị dữ liệu cho biểu đồ
  const data = {
    labels: monthlyStats.map((row) => row.month), // Các tháng
    datasets: [
      {
        label: "Thu Nhập",
        data: monthlyStats.map((row) => row.income),
        borderColor: "rgba(0, 123, 255, 1)", // Màu đường cho Thu Nhập
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Màu nền cho Thu Nhập
        fill: true, // Để có hiệu ứng fill dưới đường
        tension: 0.4, // Làm cho đường trở nên mượt mà
        pointRadius: 5, // Kích thước điểm
        pointBackgroundColor: "rgba(0, 123, 255, 1)" // Màu của các điểm
      },
      {
        label: "Chi Phí",
        data: monthlyStats.map((row) => row.expenses),
        borderColor: "rgba(220, 53, 69, 1)", // Màu đường cho Chi Phí
        backgroundColor: "rgba(220, 53, 69, 0.2)", // Màu nền cho Chi Phí
        fill: true, // Để có hiệu ứng fill dưới đường
        tension: 0.4, // Làm cho đường trở nên mượt mà
        pointRadius: 5, // Kích thước điểm
        pointBackgroundColor: "rgba(220, 53, 69, 1)" // Màu của các điểm
      },
      {
        label: "Lợi Nhuận",
        data: monthlyStats.map((row) => row.profit),
        borderColor: "rgba(40, 167, 69, 1)", // Màu đường cho Lợi Nhuận
        backgroundColor: "rgba(40, 167, 69, 0.2)", // Màu nền cho Lợi Nhuận
        fill: true, // Để có hiệu ứng fill dưới đường
        tension: 0.4, // Làm cho đường trở nên mượt mà
        pointRadius: 5, // Kích thước điểm
        pointBackgroundColor: "rgba(40, 167, 69, 1)" // Màu của các điểm
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Biểu Đồ Thu Chi Hàng Tháng"
      },
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyStatsLineChart;
