import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const BloodPressureChart = ({ diagnosisHistory }) => {

    const sortedHistory = [...diagnosisHistory].reverse();

    // Extract data for systolic and diastolic
    const months = sortedHistory.map((entry) => `${entry.month} ${entry.year}`);
    const systolicData = sortedHistory.map((entry) => entry.blood_pressure.systolic.value);
    const diastolicData = sortedHistory.map((entry) => entry.blood_pressure.diastolic.value);

    // Chart.js data
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Systolic',
                data: systolicData,
                borderColor: '#D94FF5',
                backgroundColor: '#D94FF5',
                pointStyle: 'circle',
                pointRadius: 5,
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Diastolic',
                data: diastolicData,
                borderColor: '#5A86E9',
                backgroundColor: '#5A86E9',
                pointStyle: 'circle',
                pointRadius: 5,
                fill: false,
                tension: 0.4,
            },
        ],
    };

    // Chart.js options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#707070',
                    font: {
                        family: 'Manrope, sans-serif',
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Timeline',
                    color: '#707070',
                    font: {
                        family: 'Manrope, sans-serif',
                        size: 14,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#707070',
                    font: {
                        family: 'Manrope, sans-serif',
                        size: 12,
                    },
                },
                grid: {
                    color: '#EDEDED',
                },
                title: {
                    display: true,
                    text: 'Blood Pressure (mmHg)',
                    color: '#707070',
                    font: {
                        family: 'Manrope, sans-serif',
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="BPcard">
            <h2 style={{ marginBottom: '10px' }}>Blood Pressure</h2>
            <div className="chart-container">
                <div className="chart">
                    <Line data={data} options={options} />
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: '#D94FF5' }}
                        ></span>
                        <div className="sisto">
                            <span className="legend-label">Systolic</span>
                            <div className="legend-value">160</div>
                            <div className="legend-description">
                                Higher than Average
                            </div>
                        </div>
                    </div>
                    <div className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: '#5A86E9' }}
                        ></span>
                        <div className="diasto">
                            <span className="legend-label">Diastolic</span>
                            <div className="legend-value">78</div>
                            <div className="legend-description">
                                Lower than Average
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodPressureChart;
