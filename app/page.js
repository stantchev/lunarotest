import Homepage from '../components/pages/Homepage';

export const metadata = {
  title: 'Начало',
  description: 'Водещата българска платформа за технологични новини. Експертни анализи в областта на киберсигурността, SEO оптимизация и изкуствен интелект.',
  openGraph: {
    title: 'Linaro News - Българска платформа за киберсигурност, SEO и AI новини',
    description: 'Експертни анализи и актуални новини от света на киберсигурността, SEO и изкуствения интелект.',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  return <Homepage />;
}