'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface SalesData {
  name: string;
  sales: number;
}

export function SalesChart({ data }: { data: SalesData[] }) {
  // Mock data if empty
  const chartData = data.length > 0 ? data : [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
    { name: 'Aug', sales: 4200 },
    { name: 'Sep', sales: 5100 },
    { name: 'Oct', sales: 6000 },
    { name: 'Nov', sales: 5400 },
    { name: 'Dec', sales: 7200 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E4" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#808191', fontSize: 12}} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#808191', fontSize: 12}} />
        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
        <Bar dataKey="sales" fill="#6C5DD3" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function OrderStatusChart() {
  const data = [
    { name: 'Completed', value: 400 },
    { name: 'Pending', value: 300 },
    { name: 'Cancelled', value: 100 },
  ];
  
  const COLORS = ['#6C5DD3', '#FFCE73', '#FF754C'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} iconType="circle" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
