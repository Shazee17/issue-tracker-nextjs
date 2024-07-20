'use client'

import { Card } from '@radix-ui/themes';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface Props {
    open: number;
    inProgress: number;
    closed: number
}

const IssueChart = ({ open, inProgress, closed } : Props) => {
    const data = [
        {label: 'Open', value: open},
        {label: 'In-Progress', value: inProgress},
        {label: 'Closed', value: closed}
    ]


  return (
    <Card className="bg-gray-200">
        <ResponsiveContainer
            width="100%"
            height={370}
        >
            <BarChart data={data}>
                <XAxis dataKey="label" className='font-bold'/>
                <YAxis  className='font-bold'/>
                <Bar dataKey="value" barSize={60} style={{ fill: 'var(--accent-10)'}} />
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart