const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { taskName } = JSON.parse(event.body);

  const params = {
    TableName: 'tasks',
    Key: {
      id: id
    },
    UpdateExpression: 'SET taskName = :taskName',
    ExpressionAttributeValues: {
      ':taskName': taskName
    },
    ReturnValues: 'ALL_NEW'
  };

  const result = await dynamoDB.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Attributes)
  };
};

