# Maven with JDK 21
FROM maven:3.9.9-eclipse-temurin-21

# Set working directory
WORKDIR /app

# Copy pom.xml first (for dependency cache)
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Expose Spring Boot port
EXPOSE 8080

# Run Spring Boot using Maven
CMD ["mvn", "clean", "install", "spring-boot:run"]
