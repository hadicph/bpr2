/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    // Extract user information from the event
    const userAttributes = event.request.userAttributes;

    // Create a user preference record
    const userPreference = {
      id: uuidv4(), 
      start_address: {
        longitude: 0.0, 
        latitude: 0.0,
        address: '', 
      },
      end_address: {
        longitude: 0.0,
        latitude: 0.0, 
        address: '', 
      },
      owner: userAttributes.sub,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      theme: 'light',
    };

    const params = {
      TableName: 'UserPreference-hpi5bhpsu5gobkntneedlwykp4-dev',
      Item: userPreference,
    };

    
    await dynamodb.put(params).promise();

    // Return a response if needed
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User preference created successfully' }),
    };
  } catch (err) {
    console.log('Error creating user preference:', err);
    throw err;
  }
};
