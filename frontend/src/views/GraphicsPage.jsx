import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const API_URL = "http://localhost:5001";

const GraphicsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const data = response.data;

      // Process services data
      const services = {};
      data.forEach((user) => {
        user.services.split(",").forEach((service) => {
          if (services[service]) {
            services[service]++;
          } else {
            services[service] = 1;
          }
        });
      });
      setBarData({
        labels: Object.keys(services),
        datasets: [
          {
            label: "Services",
            data: Object.values(services),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      // Process locations data
      const locations = {};
      data.forEach((user) => {
        if (locations[user.location]) {
          locations[user.location]++;
        } else {
          locations[user.location] = 1;
        }
      });
      setPieData({
        labels: Object.keys(locations),
        datasets: [
          {
            label: "Locations",
            data: Object.values(locations),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error loading chart data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Graphics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto flex items-center justify-around">
      <div className="w-2/4">
        <h2 className="text-xl font-bold mb-2 text-orange-400">
          Services Chart
        </h2>{" "}
        <div className="mb-8">
          <Bar data={barData} />
        </div>
      </div>
      <div className="w-1/3">
        <h2 className="text-xl font-bold mb-2 text-orange-400">
          Locations Chart
        </h2>
        <div className="mb-8">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default GraphicsPage;
