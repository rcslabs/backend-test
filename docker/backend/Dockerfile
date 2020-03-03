FROM hirokimatsumoto/alpine-openjdk-11

ADD . /var/app
WORKDIR /var/app

RUN ./mvnw clean install -T 1C -DskipTests

ENTRYPOINT ["java","-jar","./target/taxes_management.jar"]