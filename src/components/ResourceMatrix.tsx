import React from 'react';

interface ResourceCell {
  user: number; // 人月など
  vendor: number;
}

export interface ResourcePlan {
  project: string;
  phaseResources: Record<string, ResourceCell>; // key = phaseName
}

type Props = {
  plans: ResourcePlan[];
};

const phasesOrder = ['システム企画','要件定義','設計','開発・単体テスト','結合テスト','総合テスト','UAT','リリース～初期流動'];

const ResourceMatrix: React.FC<Props> = ({ plans }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border-r border-gray-300 text-left">プロジェクト</th>
            {phasesOrder.map(p => (
              <th key={p} className="px-3 py-1 border-r border-gray-300 whitespace-nowrap">{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <React.Fragment key={plan.project}>
              {/* ユーザー行 */}
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-2 py-1 border-r border-gray-300 font-medium whitespace-nowrap" rowSpan={2}>{plan.project}</td>
                {phasesOrder.map(phase => (
                  <td key={phase} className="px-3 py-1 border-r border-gray-300 text-center text-emerald-700">
                    {plan.phaseResources[phase]?.user ?? '-'}
                  </td>
                ))}
              </tr>
              {/* ベンダー行 */}
              <tr className="bg-white hover:bg-gray-50">
                {phasesOrder.map(phase => (
                  <td key={phase} className="px-3 py-1 border-r border-gray-300 text-center text-indigo-700">
                    {plan.phaseResources[phase]?.vendor ?? '-'}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <p className="text-xs mt-2"><span className="text-emerald-700 font-bold">緑</span> = ユーザー要員（人月） / <span className="text-indigo-700 font-bold">青</span> = ベンダー要員（人月）</p>
    </div>
  );
};

export default ResourceMatrix;
