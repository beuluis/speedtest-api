[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

> :warning: speedtest-net does not support newer node versions. Please use node 12

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <img src="https://www.flaticon.com/svg/static/icons/svg/248/248053.svg" alt="Logo" height="60">

  <h3 align="center">speedtester-api</h3>

  <p align="center">
    Collects Speedtest values and makes them available via REST
    <br />
    <br />
    ·
    <a href="https://github.com/beuluis/speedtest-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/beuluis/speedtest-api/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

Small docker setup for collecting Speedtest values and makes them available via REST. Utilizes [speedtest-net](https://www.npmjs.com/package/speedtest-net) and [restify](https://www.npmjs.com/package/restify).

<!-- GETTING STARTED -->
## Getting Started Develop

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/beuluis/speedtest-api.git --branch develop
```
2. Start docker-compose
```sh
docker-compose up --build
```
3. Call the api with `localhost:{your port}` as base url

### Customization

1. Create a `.env` file
```sh
touch .env
```
2. Overwrite variables as you like (format: `{variable name}={variable value}`)

| Variable | Description | Default value | Required |
| --- | --- | --- | --- |
| `INSPECT_PORT` | Node inspect port | 9229 | false |
| `PORT` | Which port is mapped to your host machine | 3300 | false |
| `PG_DB` | Postgres DB name | speedtestApiDev | false |
| `PG_USER` | Postgres user | speedtestApiDev | false |
| `PG_PASSWORD` | Postgres password | sahjbbd74bds74 | false |

## Getting Started Staging

To get a copy up and running follow these simple steps.

### Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/beuluis/speedtest-api.git --branch master
```
2. Create a `.env.stg` file
```sh
touch .env.stg
```
3. Overwrite all variables marked under Customization as required
4. Overwrite config variables. See Customize application
5. Start docker-compose
```sh
docker-compose --env-file ./.env.stg -f docker-compose.yml -f docker-compose.staging.yml up -d
```

### Customization

1. Create a `.env.stg` file
```sh
touch .env.stg
```
2. Overwrite variables as you like (format: `{variable name}={variable value}`)

| Variable | Description | Default value | Required |
| --- | --- | --- | --- |
| `PG_DB` | Postgres DB name | speedtestApiStg | false |
| `PG_USER` | Postgres user | speedtestApiStg | false |
| `PG_PASSWORD` | Postgres password | none | true |

## Getting Started Production

To get a copy up and running follow these simple steps.

### Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/beuluis/speedtest-api.git --branch master
```
2. Create a `.env.prod` file
```sh
touch .env.prod
```
3. Overwrite all variables marked under Customization as required
4. Overwrite config variables. See Customize application
5. Start docker-compose
```sh
docker-compose --env-file ./.env.prod -f docker-compose.yml -f docker-compose.production.yml up -d
```

### Customization

1. Create a `.env.prod` file
```sh
touch .env.prod
```
2. Overwrite variables as you like (format: `{variable name}={variable value}`)

| Variable | Description | Default value | Required |
| --- | --- | --- | --- |
| `PG_DB` | Postgres DB name | speedtestApiProd | false |
| `PG_USER` | Postgres user | speedtestApiProd | false |
| `PG_PASSWORD` | Postgres password | none | true |

## Endpoint dokumentation

The endpoints are documented in swagger. You can navigate to swagger on your local instance, like `localhost:{your port}/swagger` or got to [swagger dokumentation](https://beuluis.github.io/speedtest-api/).

### Customize application

I use [config](https://www.npmjs.com/package/config). Pleas look at their dokumentation

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Luis Beu - me@luisbeu.de


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/beuluis/speedtest-api.svg?style=flat-square
[contributors-url]: https://github.com/beuluis/speedtest-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/beuluis/speedtest-api.svg?style=flat-square
[forks-url]: https://github.com/beuluis/speedtest-api/network/members
[stars-shield]: https://img.shields.io/github/stars/beuluis/speedtest-api.svg?style=flat-square
[stars-url]: https://github.com/beuluis/speedtest-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/beuluis/speedtest-api.svg?style=flat-square
[issues-url]: https://github.com/beuluis/speedtest-api/issues
[license-shield]: https://img.shields.io/github/license/beuluis/speedtest-api.svg?style=flat-square