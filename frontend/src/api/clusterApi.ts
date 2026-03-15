import axios from 'axios';
import type { Cluster } from '../types/cluster';

const API_URL = 'http://localhost:8080/api/clusters';

// 1. 목록 조회
export const getClusters = () => axios.get<Cluster[]>(API_URL);

// 2. 생성
export const createCluster = (cluster: Omit<Cluster, 'id'>) => axios.post(API_URL, cluster);

// 3. 수정
export const updateCluster = (id: number, cluster: Partial<Cluster>) =>
  axios.put(`${API_URL}/${id}`, cluster);

// 4. 삭제
export const deleteCluster = (id: number) => axios.delete(`${API_URL}/${id}`);
