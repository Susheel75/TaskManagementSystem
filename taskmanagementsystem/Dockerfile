# Stage 1: Build the Spring Boot app
FROM maven:3.9.0-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build jar (skip tests for faster build, remove -DskipTests if you want tests)
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the jar built in previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (default Spring Boot port)
EXPOSE 8086

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
