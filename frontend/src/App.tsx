import React, { useState } from 'react';
import { useClusterData } from './hooks/useClusterData';
import { createCluster, deleteCluster, updateCluster } from './api/clusterApi';
import { LineChart } from '@mui/x-charts/LineChart';

function App() {
  // 1. 데이터 로직은 훅으로 '딸깍' 해결
  const { clusters, chartData, labels, refresh } = useClusterData(5000);

  // 2. 입력 및 수정 상태 (UI 전용 상태만 남김)
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEndpoint, setEditEndpoint] = useState('');

  // 핸들러 함수들
  const handleCreate = async () => {
    if (!name || !endpoint) return alert('입력창을 확인해주세요!');
    await createCluster({ name, endpoint, status: 'RUNNING' });
    setName('');
    setEndpoint('');
    refresh();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteCluster(id);
      refresh();
    }
  };

  const handleUpdate = async (id: number) => {
    await updateCluster(id, { name: editName, endpoint: editEndpoint });
    setEditingId(null);
    refresh();
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.2rem' }}>🚀 PaaS Management Dashboard</h1>

      {/* 차트 섹션 (MUI) */}
      <div
        style={{
          marginBottom: '40px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '15px',
        }}
      >
        <h3>실시간 리소스 모니터링</h3>
        <LineChart
          xAxis={[{ scaleType: 'point', data: labels }]}
          series={[{ data: chartData, area: true, color: '#2196f3' }]}
          width={900}
          height={300}
        />
      </div>

      {/* 추가 섹션 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="클러스터명" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          placeholder="엔드포인트"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
        <button onClick={handleCreate} style={{ backgroundColor: '#4caf50', color: 'white' }}>
          추가
        </button>
      </div>

      {/* 리스트 섹션 */}
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clusters.map((c) => (
            <tr key={c.id} style={{ textAlign: 'center' }}>
              <td>{c.id}</td>
              {editingId === c.id ? (
                <>
                  <td>
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </td>
                  <td>
                    <input value={editEndpoint} onChange={(e) => setEditEndpoint(e.target.value)} />
                  </td>
                  <td>{c.status}</td>
                  <td>
                    <button onClick={() => handleUpdate(c.id)}>저장</button>
                    <button onClick={() => setEditingId(null)}>취소</button>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td>
                    <code>{c.endpoint}</code>
                  </td>
                  <td style={{ color: '#2e7d32', fontWeight: 'bold' }}>{c.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditingId(c.id);
                        setEditName(c.name);
                        setEditEndpoint(c.endpoint);
                      }}
                    >
                      수정
                    </button>
                    <button onClick={() => handleDelete(c.id)} style={{ color: 'red' }}>
                      삭제
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
