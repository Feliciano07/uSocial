let aws_keys = {
    s3: {
        region: 'us-east-2',
        accessKeyId: "AKIA6QI3S2X7JX6RU5NN",
        secretAccessKey: "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",
        apiVersion: '2006-03-01',
    },
    rekognition: {
        accessKeyId: "AKIA6QI3S2X7JX6RU5NN",
        region: 'us-east-2',
        secretAccessKey: "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" 
    },
    translate: {
        apiVersion: '2017-07-01',
        accessKeyId: "AKIA6QI3S2X7JX6RU5NN",
        secretAccessKey: "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",
        region: 'us-east-2',
    },
    cognito: {
        apiVersion: '2016-04-18',
        accessKeyId: "AKIA6QI3S2X7JX6RU5NN",
        secretAccessKey: "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",
        region: 'us-east-2',
    }
}

module.exports = aws_keys;