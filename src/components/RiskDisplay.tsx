import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface RiskDisplayProps {
  title: string;
  risk: number;
  description: string;
}

export default function RiskDisplay({ title, risk, description }: RiskDisplayProps) {
  const interpretRisk = (risk: number) => {
    if (risk < 1/1000) return {
      level: 'Riesgo Bajo',
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      colorClass: 'bg-green-100 text-green-800 border-green-200',
      recommendation: 'Continuar con controles prenatales de rutina.'
    };
    if (risk < 1/50) return {
      level: 'Riesgo Moderado',
      icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
      colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      recommendation: 'Considerar pruebas diagnósticas adicionales como NIPT.'
    };
    return {
      level: 'Riesgo Alto',
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      colorClass: 'bg-red-100 text-red-800 border-red-200',
      recommendation: 'Se recomienda evaluación por especialista y considerar amniocentesis.'
    };
  };

  const riskInterpretation = interpretRisk(risk);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">{title}</h2>
        {riskInterpretation.icon}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-gray-600 mb-2">Riesgo Calculado:</p>
          <p className="text-3xl font-bold text-blue-900">1:{Math.round(1/risk)}</p>
        </div>

        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${riskInterpretation.colorClass}`}>
            {riskInterpretation.level}
          </span>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-2">{description}</p>
          <p className="text-sm font-medium text-blue-900">{riskInterpretation.recommendation}</p>
        </div>

        <div className="text-center text-sm text-blue-600">
          <p>Esta evaluación es una estimación y no sustituye el consejo médico profesional.</p>
        </div>
      </div>
    </div>
  );
}