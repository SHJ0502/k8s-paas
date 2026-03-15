K8s PaaS Dashboard
Kubernetes 클러스터의 상태를 모니터링하고 관리하기 위한 PaaS 대시보드 프로젝트입니다. Spring Boot 기반의 백엔드와 React 기반의 프론트엔드로 구성되어 있습니다.

1. 프로젝트 구조
   backend-java/: Spring Boot 기반 REST API 서버

frontend/: React (Vite, TypeScript) 기반 웹 인터페이스

.gitattributes / .gitignore: 멀티 모듈 프로젝트 관리 설정

2. 기술 스택
   Backend
   Java 17 / Spring Boot 3.x

Spring Data JPA

Gradle

H2 Database (Runtime)

Frontend
React / TypeScript

Vite

pnpm (Package Manager)

Axios (API Communication)

3. 실행 방법
   Backend 실행
   Bash
   cd backend-java
   ./gradlew bootRun
   API Server: http://localhost:8080

Frontend 실행
Bash
cd frontend
pnpm install
pnpm dev
Web Interface: http://localhost:5173

4. 주요 기능
   Kubernetes 클러스터 리스트 조회 및 상태 확인

실시간 클러스터 데이터 연동 (API)

반응형 대시보드 UI

5. 환경 설정
   백엔드의 application.properties를 통해 DB 및 서버 포트 설정을 변경할 수 있습니다.

프론트엔드의 src/api/clusterApi.ts에서 API 엔드포인트 주소를 설정합니다.
