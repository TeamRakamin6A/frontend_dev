import { Box, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import convertPrice from "../lib/convertPrice";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ datas }) => {

    const totalRevenues = datas?.total_revenues
    const totalExpenses = datas?.total_expenses
    const profit = totalRevenues - totalExpenses

    const data = {
        labels: [
            'total expenses',
            'total profit',
            'total revenue'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [totalExpenses, profit, totalRevenues],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    return (
        <>
            <Doughnut data={data} />
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={'20px'}>
                <Text fontWeight={'bold'}>Profit: {convertPrice(profit)}</Text>
            </Box>
        </>
    )
}

export default Chart