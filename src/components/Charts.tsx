'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface SalesData {
  name: string;
  sales: number;
}

export function SalesChart({ data }: { data: SalesData[] }) {
  const chartData = data.length > 0 ? data : [
    { name: 'Jan', sales: 12000 },
    { name: 'Feb', sales: 15000 },
    { name: 'Mar', sales: 18000 },
    { name: 'Apr', sales: 14000 },
    { name: 'May', sales: 22000 },
    { name: 'Jun', sales: 25000 },
    { name: 'Jul', sales: 28000 },
    { name: 'Aug', sales: 32000 },
    { name: 'Sep', sales: 30000 },
    { name: 'Oct', sales: 35000 },
    { name: 'Nov', sales: 38000 },
    { name: 'Dec', sales: 42000 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#64748B', fontSize: 12}} 
          dy={10} 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#64748B', fontSize: 12}} 
          tickFormatter={(value) => `R${value/1000}k`}
        />
        <Tooltip 
          cursor={{fill: 'transparent'}} 
          contentStyle={{
            borderRadius: '8px', 
            border: 'none', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            background: '#fff'
          }} 
          formatter={(value: any) => [`R ${value.toLocaleString()}`, 'Revenue']}
        />
        <Bar dataKey="sales" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ServiceDistributionChart() {
  const data = [
    { name: 'Web Dev', value: 35 },
    { name: 'Mobile Apps', value: 25 },
    { name: 'Cloud Services', value: 20 },
    { name: 'Consulting', value: 12 },
    { name: 'Design', value: 8 },
  ];
  
  const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="circle"
          formatter={(value, entry: any) => `${value} (${entry.payload.value}%)`}
        />
        <Tooltip formatter={(value: any) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
}
