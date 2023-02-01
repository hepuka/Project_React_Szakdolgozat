/* import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card.component";
import styles from "./Chart.module.scss";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  // Create a new array of order status
  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    return array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3] = ["Megrendelés leadva", "Kiszállítva", "Fizetve"];

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const delivered = getOrderCount(array, q3);

  const data = {
    labels: ["Megrendelés leadva", "Kiszállítva", "Fizetve"],
    datasets: [
      {
        label: "Megrendelések száma",
        data: [placed, processing, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Megrendelések státusza</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
 */
