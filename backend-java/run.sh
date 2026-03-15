#!/bin/bash

# 1. 기존에 실행 중인 자바 프로세스 종료 (포트 8080 기준)
echo "Stopping existing backend..."
lsof -ti:8080 | xargs kill -9 2>/dev/null

# 2. 빌드 시작 
echo "🏗️ Building new JAR..."
./gradlew clean build -x test

# 3. 빌드 성공 시에만 기동
if [ $? -eq 0 ]; then
    echo "Starting Backend Application..."
    java -Xmx512m -jar build/libs/backend-java-0.0.1-SNAPSHOT.jar \
    --spring.datasource.url=jdbc:postgresql://localhost:5432/paas_db \
    --spring.datasource.username=postgres \
    --spring.datasource.password=1234
else
    echo "Build Failed! Please check your code."
fi