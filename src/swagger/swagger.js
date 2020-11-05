module.exports = {
    swagger: '2.0',
    info: {
        title: 'Speedtester API',
        description:
            'Collects Speedtest values and makes them available via REST',
        version: '1.0.0',
        contact: {
            name: 'Luis Beu <me@luisbeu.de>',
        },
        license: {
            name: 'MIT',
        },
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        '/downtime/{id}': {
            get: {
                tags: [
                    'downtime',
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        format: 'uuid',
                        example: 'bcb15d60-f2e5-43e7-bcb4-e4e9ea14310c',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/downtime',
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/downtimes': {
            get: {
                tags: [
                    'downtime',
                ],
                parameters: [
                    {
                        $ref: '#/parameters/page',
                    },
                    {
                        $ref: '#/parameters/size',
                    },
                    {
                        $ref: '#/parameters/start',
                    },
                    {
                        $ref: '#/parameters/end',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            required: ['docs', 'pages', 'total'],
                            properties: {
                                docs: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/downtime',
                                    },
                                },
                                pages: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                                total: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/downtime/average': {
            get: {
                tags: [
                    'downtime',
                ],
                parameters: [
                    {
                        name: 'start',
                        in: 'query',
                        type: 'string',
                        format: 'date',
                        example: '2020-01-01',
                    },
                    {
                        name: 'end',
                        in: 'query',
                        type: 'string',
                        format: 'date',
                        example: '2020-12-01',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        type: 'object',
                        schema: {
                            $ref: '#/definitions/downtimeAverage',
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/speedtest/{id}': {
            get: {
                tags: [
                    'speedtest',
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        format: 'uuid',
                        example: '12ddf883-9c92-44c5-807b-146c3daa4a35',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/speedtest',
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/speedtests': {
            get: {
                tags: [
                    'speedtest',
                ],
                parameters: [
                    {
                        $ref: '#/parameters/page',
                    },
                    {
                        $ref: '#/parameters/size',
                    },
                    {
                        $ref: '#/parameters/start',
                    },
                    {
                        $ref: '#/parameters/end',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            required: ['docs', 'pages', 'total'],
                            properties: {
                                docs: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/speedtest',
                                    },
                                },
                                pages: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                                total: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/speedtest': {
            post: {
                tags: [
                    'speedtest',
                ],
                responses: {
                    201: {
                        description: 'Created',
                        type: 'object',
                        required: ['server', 'interface'],
                        allOf: [
                            {
                                $ref: '#/definitions/speedtest',
                            },
                            {
                                type: 'object',
                                properties: {
                                    server: {
                                        $ref: '#/definitions/server',
                                    },
                                    interface: {
                                        $ref: '#/definitions/interface',
                                    },
                                },
                            },
                        ],
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/speedtest/average': {
            get: {
                tags: [
                    'speedtest',
                ],
                parameters: [
                    {
                        name: 'start',
                        in: 'query',
                        type: 'string',
                        format: 'date',
                        example: '2020-01-01',
                    },
                    {
                        name: 'end',
                        in: 'query',
                        type: 'string',
                        format: 'date',
                        example: '2020-12-01',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        type: 'object',
                        schema: {
                            $ref: '#/definitions/speedtestAverage',
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/server/{id}': {
            get: {
                tags: [
                    'server',
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        format: 'uuid',
                        example: '2f28fc11-24ae-42b2-b3ec-47a8082ed678',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/server',
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/servers': {
            get: {
                tags: [
                    'server',
                ],
                parameters: [
                    {
                        $ref: '#/parameters/page',
                    },
                    {
                        $ref: '#/parameters/size',
                    },
                    {
                        $ref: '#/parameters/start',
                    },
                    {
                        $ref: '#/parameters/end',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            required: ['docs', 'pages', 'total'],
                            properties: {
                                docs: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/server',
                                    },
                                },
                                pages: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                                total: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/interface/{id}': {
            get: {
                tags: [
                    'interface',
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        type: 'string',
                        format: 'uuid',
                        example: '2246947e-6a77-47d7-ad05-461e471885e5',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/interface',
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
        '/interfaces': {
            get: {
                tags: [
                    'interface',
                ],
                parameters: [
                    {
                        $ref: '#/parameters/page',
                    },
                    {
                        $ref: '#/parameters/size',
                    },
                    {
                        $ref: '#/parameters/start',
                    },
                    {
                        $ref: '#/parameters/end',
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        schema: {
                            type: 'object',
                            required: ['docs', 'pages', 'total'],
                            properties: {
                                docs: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/interface',
                                    },
                                },
                                pages: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                                total: {
                                    type: 'number',
                                    format: 'int32',
                                    example: 1,
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                    400: {
                        description: 'Validation Failed',
                        schema: {
                            $ref: '#/definitions/ErrorModel',
                        },
                    },
                },
            },
        },
    },
    parameters: {
        page: {
            name: 'page',
            in: 'query',
            type: 'number',
            format: 'int32',
            example: 1,
            minimum: 1,
        },
        size: {
            name: 'size',
            in: 'query',
            type: 'number',
            format: 'int32',
            example: 25,
            minimum: 1,
        },
        start: {
            name: 'start',
            in: 'query',
            type: 'string',
            format: 'date',
            example: '2020-01-01',
        },
        end: {
            name: 'end',
            in: 'query',
            type: 'string',
            format: 'date',
            example: '2020-12-01',
        },
    },
    definitions: {
        downtime: {
            type: 'object',
            required: [
                'downtimeId',
                'startDate',
                'endDate',
                'time',
                'createdAt',
                'updatedAt',
            ],
            properties: {
                downtimeId: {
                    type: 'string',
                    format: 'uuid',
                    example: 'bcb15d60-f2e5-43e7-bcb4-e4e9ea14310c',
                },
                startDate: {
                    type: 'string',
                    format: 'date-time',
                },
                endDate: {
                    type: 'string',
                    format: 'date-time',
                },
                time: {
                    type: 'number',
                    example: 168,
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                },
            },
        },
        downtimeAverage: {
            type: 'object',
            required: [
                'counter',
                'time',
            ],
            properties: {
                counter: {
                    type: 'number',
                    example: 20,
                },
                time: {
                    type: 'number',
                    format: 'float',
                    example: 168.0000000000000000,
                },
            },
        },
        speedtest: {
            type: 'object',
            required: [
                'speedtestId',
                'timestamp',
                'jitter',
                'latency',
                'downloadBandwidth',
                'downloadBytes',
                'downloadElapsed',
                'uploadBandwidth',
                'uploadBytes',
                'uploadElapsed',
                'packetLoss',
                'isp',
                'resultId',
                'createdAt',
                'updatedAt',
                'serverId',
                'interfaceId',
            ],
            properties: {
                speedtestId: {
                    type: 'string',
                    format: 'uuid',
                    example: '12ddf883-9c92-44c5-807b-146c3daa4a35',
                },
                timestamp: {
                    type: 'string',
                    format: 'date-time',
                },
                jitter: {
                    type: 'number',
                    format: 'float',
                    example: 11.946,
                },
                latency: {
                    type: 'number',
                    format: 'float',
                    example: 28.543,
                },
                downloadBandwidth: {
                    type: 'integer',
                    format: 'int32',
                    example: 5546869,
                },
                downloadBytes: {
                    type: 'integer',
                    format: 'int32',
                    example: 56891964,
                },
                downloadElapsed: {
                    type: 'integer',
                    format: 'int32',
                    example: 10716,
                },
                uploadBandwidth: {
                    type: 'integer',
                    format: 'int32',
                    example: 808333,
                },
                uploadBytes: {
                    type: 'integer',
                    format: 'int32',
                    example: 7141352,
                },
                uploadElapsed: {
                    type: 'integer',
                    format: 'int32',
                    example: 8715,
                },
                packetLoss: {
                    type: 'number',
                    format: 'float',
                    example: 0.9389671361502347,
                },
                isp: {
                    type: 'string',
                    example: 'Versatel Deutschland',
                },
                resultId: {
                    type: 'string',
                    format: 'uuid',
                    example: '22f8bbc6-4b43-44a1-b401-32ad9b6cd9e8',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                },
                serverId: {
                    type: 'string',
                    format: 'uuid',
                    example: '2f28fc11-24ae-42b2-b3ec-47a8082ed678',
                },
                interfaceId: {
                    type: 'string',
                    format: 'uuid',
                    example: '2246947e-6a77-47d7-ad05-461e471885e5',
                },
            },
        },
        server: {
            type: 'object',
            required: [
                'serverId',
                'speedtestServerId',
                'name',
                'location',
                'country',
                'host',
                'port',
                'ip',
                'createdAt',
                'updatedAt',
            ],
            properties: {
                serverId: {
                    type: 'string',
                    format: 'uuid',
                    example: '2f28fc11-24ae-42b2-b3ec-47a8082ed678',
                },
                speedtestServerId: {
                    type: 'number',
                    format: 'int32',
                    example: 8908,
                },
                name: {
                    type: 'string',
                    example: 'Net-D-Sign GmbH',
                },
                location: {
                    type: 'string',
                    example: 'Garching',
                },
                country: {
                    type: 'string',
                    example: 'Germany',
                },
                host: {
                    type: 'string',
                    example: 'speedtest.net-d-sign.de',
                },
                port: {
                    type: 'number',
                    format: 'int32',
                    example: 8080,
                },
                ip: {
                    type: 'string',
                    format: 'ipv4',
                    example: '185.152.232.40',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                },
            },
        },
        interface: {
            type: 'object',
            required: [
                'interfaceId',
                'internalIp',
                'name',
                'macAddress',
                'isVpn',
                'externalIp',
                'createdAt',
                'updatedAt',
            ],
            properties: {
                interfaceId: {
                    type: 'string',
                    format: 'uuid',
                    example: '2246947e-6a77-47d7-ad05-461e471885e5',
                },
                internalIp: {
                    type: 'number',
                    format: 'ipv4',
                    example: '192.168.1.2',
                },
                name: {
                    type: 'string',
                    example: 'eth0',
                },
                macAddress: {
                    type: 'string',
                    example: '02:F0:C0:C1:70:12',
                },
                isVpn: {
                    type: 'boolean',
                    example: false,
                },
                externalIp: {
                    type: 'string',
                    format: 'ipv4',
                    example: '0.0.0.0',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                },
            },
        },
        speedtestAverage: {
            type: 'object',
            required: [
                'counter',
                'jitter',
                'latency',
                'downloadBandwidth',
                'downloadBytes',
                'downloadElapsed',
                'uploadBandwidth',
                'uploadBytes',
                'uploadElapsed',
                'packetLoss',
            ],
            properties: {
                counter: {
                    type: 'number',
                    example: 20,
                },
                jitter: {
                    type: 'number',
                    format: 'float',
                    example: 5.76903047091413,
                },
                latency: {
                    type: 'number',
                    format: 'float',
                    example: 26.337121883656508,
                },
                downloadBandwidth: {
                    type: 'number',
                    format: 'float',
                    example: 5465384.426592798,
                },
                downloadBytes: {
                    type: 'number',
                    format: 'float',
                    example: 57597066.67867036,
                },
                downloadElapsed: {
                    type: 'number',
                    format: 'float',
                    example: 11142.725761772854,
                },
                uploadBandwidth: {
                    type: 'number',
                    format: 'float',
                    example: 1189731.8559556787,
                },
                uploadBytes: {
                    type: 'number',
                    format: 'float',
                    example: 11195379.90027701,
                },
                uploadElapsed: {
                    type: 'number',
                    format: 'float',
                    example: 9797.224376731301,
                },
                packetLoss: {
                    type: 'number',
                    format: 'float',
                    example: 0.4539507391981683,
                },
            },
        },
        ErrorModel: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
                code: {
                    type: 'integer',
                    format: 'int32',
                },
                message: {
                    type: 'string',
                },
            },
        },
    },
};
