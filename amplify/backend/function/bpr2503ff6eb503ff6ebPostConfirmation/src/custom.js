/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();
//This method will automatically run when a user confirms their account
//This method will run once per user and will create a user preference record in DynamoDB
exports.handler = async (event, context) => {
  try {
    // Extract user information from the event
    const userAttributes = event.request.userAttributes;

    // Create a user preference record with a uuid and default values for the user
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
      // The owner of the user preference is the user that just confirmed their account
      owner: userAttributes.sub,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      theme: 'light',
    };

    const params = {
      TableName: 'UserPreference-hpi5bhpsu5gobkntneedlwykp4-dev',
      Item: userPreference,
    };
    // Save the user preference record to DynamoDB
    await dynamodb.put(params).promise();

    // Return a response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User preference created successfully' }),
    };
    // Catch any errors and log them to the console
  } catch (err) {
    console.log('Error creating user preference:', err);
    throw err;
  }
};
