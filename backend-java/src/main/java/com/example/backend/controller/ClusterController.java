package com.example.backend.controller;

import com.example.backend.entity.Cluster;
import com.example.backend.repository.ClusterRepository;

import lombok.NonNull;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clusters") // 공통 경로 설정
@CrossOrigin
public class ClusterController {

    private final ClusterRepository clusterRepository;

    public ClusterController(ClusterRepository clusterRepository) {
        this.clusterRepository = clusterRepository;
    }

    @GetMapping
    public List<Cluster> getClusters() {
        return clusterRepository.findAll();
    }

    @PostMapping
    @NonNull
    public Cluster createCluster(@RequestBody @NonNull Cluster cluster) {
        return clusterRepository.save(cluster);
    }

    // 1. 수정 (Update)
    @PutMapping("/{id}")
    public Cluster updateCluster(@PathVariable @NonNull  Long id, @RequestBody Cluster clusterDetails) {
        Cluster cluster = clusterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 클러스터가 없습니다."));
        
        // 이름과 엔드포인트 수정
        cluster.setName(clusterDetails.getName());
        cluster.setEndpoint(clusterDetails.getEndpoint());
        
        return clusterRepository.save(cluster);
    }

    // 2. 삭제 (Delete)
    @DeleteMapping("/{id}")
    public void deleteCluster(@PathVariable @NonNull Long id) {
        clusterRepository.deleteById(id);
    }

}