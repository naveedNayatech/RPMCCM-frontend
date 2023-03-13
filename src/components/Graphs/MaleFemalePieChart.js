import React from 'react';
import { PieChart, Pie, Cell} from 'recharts';
  
  
const MaleFemalePieChart = ({malePts, femalePts}) => {
  
// Sample data
const data = [
  {name: 'Geeksforgeeks', patients: malePts},
  {name: 'Technical scripter', patients: femalePts},
];

const COLORS = ['#8FBB2C', '#E0115F'];

const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

    return (
            <PieChart width={270} height={200}>
                <Pie data={data} 
                  dataKey="patients" 
                  outerRadius={100} 
                  fill="#8FBB2C"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                    />
                ))}
                </Pie>
            </PieChart>
    );
    }
  
export default MaleFemalePieChart;