import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Visionari - Transforma tu Visión Empresarial',
  description: 'Desarrolla una visión empresarial poderosa en 48 horas. Metodología probada con casos de Amazon, Tesla, Starbucks y más.',
  keywords: 'visión empresarial, estrategia de negocio, emprendimiento, casos de estudio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
