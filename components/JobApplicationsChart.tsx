import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// ✅ Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobApplicationsChart = () => {
  const data = {
    labels: ['Job 1', 'Job 2', 'Job 3', 'Job 4'],
    datasets: [
      {
        label: 'Applications',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold">Job Applications Overview</h3>
      <Bar data={data} options={{ responsive: true }} />
    </section>
  );
};

export default JobApplicationsChart;
