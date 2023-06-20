const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'tasks',
    Key: {
      id: id
    },
    ConditionExpression: 'attribute_exists(id)',
    ReturnValues: 'ALL_OLD'
  };

  try {
    const result = await dynamoDB.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task deleted successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

