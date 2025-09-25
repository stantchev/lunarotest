import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AITrendAnalysis = () => {
  const [activeChart, setActiveChart] = useState('adoption');

  const adoptionData = [
    { month: 'Ян', bulgaria: 12, global: 25, enterprise: 8 },
    { month: 'Фев', bulgaria: 18, global: 32, enterprise: 15 },
    { month: 'Мар', bulgaria: 25, global: 38, enterprise: 22 },
    { month: 'Апр', bulgaria: 32, global: 45, enterprise: 28 },
    { month: 'Май', bulgaria: 41, global: 52, enterprise: 35 },
    { month: 'Юни', bulgaria: 48, global: 58, enterprise: 42 },
    { month: 'Юли', bulgaria: 55, global: 64, enterprise: 48 },
    { month: 'Авг', bulgaria: 62, global: 69, enterprise: 55 },
    { month: 'Сеп', bulgaria: 68, global: 74, enterprise: 61 }
  ];

  const investmentData = [
    { category: 'Machine Learning', amount: 2.4, growth: 15.2 },
    { category: 'NLP', amount: 1.8, growth: 22.1 },
    { category: 'Computer Vision', amount: 1.5, growth: 18.7 },
    { category: 'Robotics', amount: 1.2, growth: 12.3 },
    { category: 'AI Ethics', amount: 0.8, growth: 35.6 },
    { category: 'Generative AI', amount: 3.2, growth: 45.8 }
  ];

  const sectorData = [
    { name: 'Финанси', value: 28, color: '#1E40AF' },
    { name: 'Здравеопазване', value: 22, color: '#059669' },
    { name: 'Производство', value: 18, color: '#DC2626' },
    { name: 'Търговия', value: 15, color: '#D97706' },
    { name: 'Образование', value: 10, color: '#7C3AED' },
    { name: 'Други', value: 7, color: '#6B7280' }
  ];

  const predictionData = [
    { year: '2024', conservative: 45, optimistic: 65, realistic: 55 },
    { year: '2025', conservative: 58, optimistic: 78, realistic: 68 },
    { year: '2026', conservative: 72, optimistic: 88, realistic: 80 },
    { year: '2027', conservative: 85, optimistic: 95, realistic: 90 },
    { year: '2028', conservative: 92, optimistic: 98, realistic: 95 }
  ];

  const chartOptions = [
    { id: 'adoption', label: 'AI Внедряване', icon: 'TrendingUp' },
    { id: 'investment', label: 'Инвестиции', icon: 'DollarSign' },
    { id: 'sectors', label: 'Сектори', icon: 'PieChart' },
    { id: 'predictions', label: 'Прогнози', icon: 'Crystal' }
  ];

  const keyInsights = [
    {
      title: "68% ръст в AI внедряването в България",
      description: "Българските компании показват забележителен ръст в приемането на AI технологии през 2024 г.",
      trend: "up",
      value: "+68%",
      color: "text-green-600"
    },
    {
      title: "Генеративният AI води инвестициите",
      description: "45.8% ръст в инвестициите в генеративни AI решения за последните 12 месеца.",
      trend: "up",
      value: "+45.8%",
      color: "text-blue-600"
    },
    {
      title: "Финансовият сектор е лидер",
      description: "28% от всички AI внедрявания в България са в финансовия сектор.",
      trend: "stable",
      value: "28%",
      color: "text-purple-600"
    },
    {
      title: "AI етиката набира скорост",
      description: "35.6% ръст в инвестициите в AI етика и отговорно внедряване.",
      trend: "up",
      value: "+35.6%",
      color: "text-orange-600"
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'adoption':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={adoptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="bulgaria" 
                stackId="1" 
                stroke="#1E40AF" 
                fill="#1E40AF" 
                fillOpacity={0.6}
                name="България"
              />
              <Area 
                type="monotone" 
                dataKey="global" 
                stackId="2" 
                stroke="#059669" 
                fill="#059669" 
                fillOpacity={0.4}
                name="Глобално"
              />
              <Area 
                type="monotone" 
                dataKey="enterprise" 
                stackId="3" 
                stroke="#DC2626" 
                fill="#DC2626" 
                fillOpacity={0.3}
                name="Корпоративно"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'investment':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" stroke="#6B7280" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="amount" fill="#1E40AF" name="Инвестиции (млрд. лв)" />
              <Bar dataKey="growth" fill="#059669" name="Ръст (%)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'sectors':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {sectorData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'predictions':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="conservative" 
                stroke="#DC2626" 
                strokeWidth={2}
                name="Консервативна прогноза"
              />
              <Line 
                type="monotone" 
                dataKey="realistic" 
                stroke="#1E40AF" 
                strokeWidth={3}
                name="Реалистична прогноза"
              />
              <Line 
                type="monotone" 
                dataKey="optimistic" 
                stroke="#059669" 
                strokeWidth={2}
                name="Оптимистична прогноза"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="bg-gradient-to-br from-ai-blue/5 to-cyber-green/5 rounded-2xl p-8 mb-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="font-headline font-bold text-3xl text-foreground mb-4">
          AI Тенденции и Анализи
        </h2>
        <p className="font-body text-text-secondary max-w-3xl mx-auto">
          Актуални данни и прогнози за развитието на изкуствения интелект в България и света. 
          Следете най-важните тенденции и вземете информирани решения.
        </p>
      </div>
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyInsights?.map((insight, index) => (
          <div key={index} className="bg-background border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`font-headline font-bold text-2xl ${insight?.color}`}>
                {insight?.value}
              </div>
              <div className={`p-2 rounded-lg ${
                insight?.trend === 'up' ? 'bg-green-100' : 
                insight?.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <Icon 
                  name={insight?.trend === 'up' ? 'TrendingUp' : insight?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={16} 
                  className={
                    insight?.trend === 'up' ? 'text-green-600' : 
                    insight?.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }
                />
              </div>
            </div>
            <h3 className="font-cta font-semibold text-foreground mb-2">
              {insight?.title}
            </h3>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              {insight?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Chart Section */}
      <div className="bg-background border border-border rounded-xl p-6">
        {/* Chart Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {chartOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => setActiveChart(option?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all ${
                activeChart === option?.id
                  ? 'bg-ai-blue text-white shadow-md'
                  : 'bg-muted text-text-secondary hover:text-foreground hover:bg-ai-blue/10'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>

        {/* Chart Display */}
        <div className="mb-6">
          {renderChart()}
        </div>

        {/* Chart Description */}
        <div className="text-center">
          <p className="font-body text-text-secondary">
            {activeChart === 'adoption' && "Процент на внедряване на AI технологии по месеци за 2024 г."}
            {activeChart === 'investment' && "Инвестиции в AI технологии по категории (в млрд. лв) и годишен ръст."}
            {activeChart === 'sectors' && "Разпределение на AI внедряванията по сектори в България."}
            {activeChart === 'predictions' && "Прогнози за AI внедряване до 2028 г. според различни сценарии."}
          </p>
        </div>
      </div>
      {/* Research Sources */}
      <div className="mt-8 p-6 bg-muted rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="BookOpen" size={16} className="text-text-secondary" />
          <h3 className="font-cta font-semibold text-foreground">Източници на данните:</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-text-secondary">
          <div>• Българска асоциация по информационни технологии</div>
          <div>• McKinsey Global AI Survey 2024</div>
          <div>• Stanford AI Index Report</div>
          <div>• Европейска комисия - AI Watch</div>
          <div>• PwC AI and Workforce Evolution Report</div>
          <div>• Собствени изследвания на Linaro News</div>
        </div>
      </div>
    </section>
  );
};

export default AITrendAnalysis;