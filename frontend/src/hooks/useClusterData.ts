import { useState, useEffect } from 'react';
import { getClusters } from '../api/clusterApi';
import type { Cluster } from '../types/cluster';

export const useClusterData = (interval: number = 5000) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);

  // 차트용 상태 추가
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const loadData = () => {
    getClusters()
      .then((res) => {
        setClusters(res.data);

        // 실시간 데이터 생성 (데모용 랜덤값)
        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        const mockCpuUsage = Math.floor(Math.random() * 100);

        setChartData((prev) => [...prev.slice(-9), mockCpuUsage]); // 최신 10개 유지
        setLabels((prev) => [...prev.slice(-9), timeStr]);
      })
      .catch((err) => console.error('데이터 로드 실패:', err));
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { clusters, chartData, labels, refresh: loadData };
};
