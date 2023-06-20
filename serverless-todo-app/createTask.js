const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { taskName } = JSON.parse(event.body);

  const params = {
    TableName: 'tasks',
    Item: {
      id: Date.now().toString(),
      taskName: taskName
    }
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  };
};

