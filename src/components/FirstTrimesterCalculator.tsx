import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import { calculateFirstTrimesterRisk } from '../utils/riskCalculators';
import RiskDisplay from './RiskDisplay';

interface FirstTrimesterMarkers {
  maternalAge: string;
  previousT21: boolean;
  crl: string;
  heartRate: string;
  nuchalTranslucency: string;
  nasalBone: string;
  tricuspidRegurgitation: string;
  ductusVenosus: string;
}

export default function FirstTrimesterCalculator() {
  const [markers, setMarkers] = useState<FirstTrimesterMarkers>({
    maternalAge: '',
    previousT21: false,
    crl: '',
    heartRate: '',
    nuchalTranslucency: '',
    nasalBone: 'normal',
    tricuspidRegurgitation: 'normal',
    ductusVenosus: 'normal'
  });
  const [risk, setRisk] = useState<number | null>(null);
  const [crlError, setCrlError] = useState<string>('');

  const handleCrlChange = (value: string) => {
    const crl = parseFloat(value);
    if (value === '') {
      setCrlError('');
    } else if (crl < 45 || crl > 84) {
      setCrlError('El CRL debe estar entre 45 y 84 mm para un cálculo preciso');
    } else {
      setCrlError('');
    }
    setMarkers({ ...markers, crl: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (crlError) return;
    
    const calculatedRisk = calculateFirstTrimesterRisk({
      maternalAge: parseInt(markers.maternalAge),
      previousT21: markers.previousT21,
      crl: parseFloat(markers.crl),
      heartRate: parseInt(markers.heartRate),
      nuchalTranslucency: parseFloat(markers.nuchalTranslucency),
      nasalBone: markers.nasalBone as 'normal' | 'absent' | 'hypoplastic',
      tricuspidRegurgitation: markers.tricuspidRegurgitation as 'normal' | 'abnormal',
      ductusVenosus: markers.ductusVenosus as 'normal' | 'abnormal'
    });
    setRisk(calculatedRisk);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Baby className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-900">Marcadores Primer Trimestre</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Edad Materna (años)
              </label>
              <input
                type="number"
                required
                min="15"
                max="50"
                value={markers.maternalAge}
                onChange={(e) => setMarkers({ ...markers, maternalAge: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Ingrese edad materna"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Longitud Cráneo-Caudal (mm)
              </label>
              <input
                type="number"
                required
                min="45"
                max="84"
                step="0.1"
                value={markers.crl}
                onChange={(e) => handleCrlChange(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  crlError ? 'border-red-300 focus:border-red-500' : 'border-blue-200 focus:border-blue-500'
                } focus:ring-2 focus:ring-blue-200 outline-none transition`}
                placeholder="CRL entre 45-84 mm"
              />
              {crlError && (
                <p className="mt-1 text-sm text-red-600">{crlError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Frecuencia Cardíaca (lpm)
              </label>
              <input
                type="number"
                min="100"
                max="200"
                value={markers.heartRate}
                onChange={(e) => setMarkers({ ...markers, heartRate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Latidos por minuto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Translucencia Nucal (mm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={markers.nuchalTranslucency}
                onChange={(e) => setMarkers({ ...markers, nuchalTranslucency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Medida en mm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Hueso Nasal
              </label>
              <select
                value={markers.nasalBone}
                onChange={(e) => setMarkers({ ...markers, nasalBone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="absent">Ausente</option>
                <option value="hypoplastic">Hipoplásico</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Insuficiencia Tricuspídea
              </label>
              <select
                value={markers.tricuspidRegurgitation}
                onChange={(e) => setMarkers({ ...markers, tricuspidRegurgitation: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="abnormal">Anormal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Ductus Venoso
              </label>
              <select
                value={markers.ductusVenosus}
                onChange={(e) => setMarkers({ ...markers, ductusVenosus: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="abnormal">Anormal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-blue-800">
              <input
                type="checkbox"
                checked={markers.previousT21}
                onChange={(e) => setMarkers({ ...markers, previousT21: e.target.checked })}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              Antecedente de hijo con Trisomía 21
            </label>
          </div>

          <button
            type="submit"
            disabled={!!crlError}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg ${
              crlError ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Calcular Riesgo
          </button>
        </form>
      </div>

      {risk !== null && (
        <RiskDisplay 
          title="Riesgo Primer Trimestre"
          risk={risk}
          description="Este cálculo considera los marcadores ecográficos del primer trimestre para ajustar el riesgo de trisomía 21."
        />
      )}
    </div>
  );
}