import React from 'react';
import { Check, X, Minus, HelpCircle } from 'lucide-react';

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xl bg-white">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="p-6 w-1/4 text-lg font-bold">Feature</th>
            <th className="p-6 w-1/4 text-center bg-teal-600 border-b-4 border-teal-400 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-teal-600 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold">StudyBuddy</span>
                <span className="text-xs text-teal-100 font-medium">Best Value</span>
              </div>
            </th>
            <th className="p-6 w-1/4 text-center font-bold text-slate-300">ATI Official</th>
            <th className="p-6 w-1/4 text-center font-bold text-slate-300">NurseHub</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm md:text-base">
          {/* Price */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 font-bold text-slate-900">Monthly Price</td>
            <td className="p-6 text-center bg-teal-50 font-extrabold text-teal-700 text-lg">$24.99</td>
            <td className="p-6 text-center text-slate-600">$80 - $249+</td>
            <td className="p-6 text-center text-slate-600">$49.99</td>
          </tr>

          {/* AI Tutor - The Differentiator */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 font-bold text-slate-900">Unlimited AI Tutor</td>
            <td className="p-6 text-center bg-teal-50">
              <div className="inline-flex items-center gap-1 font-bold text-teal-700">
                <Check className="w-5 h-5" /> Included
              </div>
            </td>
            <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
            <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
          </tr>

          {/* Pass Rate */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 font-bold text-slate-900">Pass Rate</td>
            <td className="p-6 text-center bg-teal-50 font-bold text-slate-900">92%</td>
            <td className="p-6 text-center text-slate-500 italic">Not Published</td>
            <td className="p-6 text-center text-slate-900">~90%</td>
          </tr>

          {/* Guarantee */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 font-bold text-slate-900">Money-Back Guarantee</td>
            <td className="p-6 text-center bg-teal-50">
              <div className="inline-flex items-center gap-1 font-bold text-teal-700">
                <Check className="w-5 h-5" /> 100% Refund
              </div>
            </td>
            <td className="p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto opacity-30" /></td>
            <td className="p-6 text-center text-slate-900">Yes</td>
          </tr>

          {/* Question Bank */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 font-bold text-slate-900">Practice Questions</td>
            <td className="p-6 text-center bg-teal-50 font-bold text-slate-900">4,000+</td>
            <td className="p-6 text-center text-slate-600">~800</td>
            <td className="p-6 text-center text-slate-600">3,000+</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}