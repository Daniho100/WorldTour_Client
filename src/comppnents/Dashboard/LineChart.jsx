import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    LineController,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js/auto';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineController,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ chartData }) => {
    // Ensure the chart receives updated data from the parent
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        animation: true, 
        interaction: {
            mode: 'none', 
        },
        plugins: {
            tooltip: {
                enabled: false, 
            },
            legend: {
                display: true, 
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return (
        <div className='h-full'>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default LineChart;
