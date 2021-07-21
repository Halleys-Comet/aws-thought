const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Params object that will hold the schema and metadata of the table

const params = {
    TableName : "Thoughts",
    KeySchema: [
        {AttributeName : "username", KeyType: "HASH"},  //Partition key
        {AttributeName: "createAt", KeyType: "RANGE"} //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "usename", AttributeType: "S"},
        { AttributeName: "createAt", AttributeType: "N"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});