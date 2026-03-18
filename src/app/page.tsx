// src/app/page.tsx
import Link from 'next/link';
import { getAllExperimentMetas } from '@/lib/experiments';

export default function HomePage() {
  const experiments = getAllExperimentMetas();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-blue-900 border-b border-blue-700 px-8 py-6">
        <h1 className="text-3xl font-bold">DESim</h1>
        <p className="text-blue-300 mt-1">Digital Electronics Lab Simulator — HSST-SRHU</p>
      </div>

      {/* Experiments Grid */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h2 className="text-xl font-bold text-gray-300 mb-6 uppercase tracking-wider">
          List of Practicals
        </h2>
        <div className="grid gap-4">
          {experiments.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiment/${exp.id}`}
              className="flex items-center gap-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-lg px-6 py-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-900 border border-blue-600 flex items-center justify-center font-bold text-blue-300 group-hover:bg-blue-700 transition-all">
                {exp.number}
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                  Experiment {exp.number}: {exp.title}
                </h3>
                <p className="text-gray-400 text-sm mt-0.5">{exp.description}</p>
                <div className="flex gap-2 mt-2">
                  {exp.icsRequired.map((ic) => (
                    <span key={ic} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                      IC {ic}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-auto text-blue-400 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </Link>
          ))}

          {/* Placeholder experiments */}
          {[1,2,3,5,6,7,8,9,10,11].map((n) => (
            <div key={n}
              className="flex items-center gap-6 bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 opacity-40 cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center font-bold text-gray-500">
                {n}
              </div>
              <div>
                <h3 className="font-bold text-gray-500">Experiment {n}</h3>
                <p className="text-gray-600 text-sm">Coming soon...</p>
              </div>
              <div className="ml-auto text-gray-600">🔒</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
