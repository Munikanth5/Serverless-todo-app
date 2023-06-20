const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'tasks',
    Key: {
      id: id
    }
  };

  const result = await dynamoDB.get(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item)
  };
};

