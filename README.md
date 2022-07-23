# RRP DDD

Template Arquitectura Hexagonal basado en el ejemplo de CodelyTV. Este template esta echo con el fin de aprender mas y
incluir ESlint y algunas librerias actualizadas.

## Development

### Start MongoDB & RabbitMQ (Docker)

```sh
docker-compose up -d
```

or

```sh
docker compose up -d
```

### Dev Mooc Server

```sh
npm run dev:mooc
```

## Tests

### All Tests

```sh
npm run tests
```

### Features Tests Mooc Server

```sh
npm run test:mooc:features
```

### Tests Unit

```sh
npm run tests:unit
```

## Production Mooc Server

### Build

```sh
npm run build
```

### Start Mooc Server

```sh
npm run start:mooc
```