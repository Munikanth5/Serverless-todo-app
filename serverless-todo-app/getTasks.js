const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async () => {
  const params = {
    TableName: 'tasks'
  };

  const result = await dynamoDB.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  };
};

