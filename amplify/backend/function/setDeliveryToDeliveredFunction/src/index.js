/* Amplify Params - DO NOT EDIT
	API_BPR2_GRAPHQLAPIIDOUTPUT
	API_BPR2_ROUTETABLE_ARN
	API_BPR2_ROUTETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    //Creating DynamoDB query to get route - using the id from the event arguments
  const dynamoDbquery = {
    TableName: process.env.API_BPR2_ROUTETABLE_NAME,
    Key: {
      id: event.arguments.routeId,
    },
  };
  //Function to get route from DynamoDB
  const getRoute = async () => {
    try {
      // Get route from DynamoDB
      const data = await dynamodb.get(dynamoDbquery).promise();
      //Get User attributes from event
      const userAttributes = event.identity.claims;
      //Create owner string to compare with owner of route
      const requestOwner = userAttributes.sub+"::"+userAttributes.username;
      //Check if route exists and if the owner of the route matches the owner of the request
      if (data.Item && data.Item.owner === requestOwner) {
        //return route
        return data.Item;
      } else {
        throw new Error('Route not found');
      }
    } catch (err) {
      console.error('Error getting route:', err);
      return null;
    }
  }
  try {
    // Get route from DynamoDB - Using method above
    const route = await getRoute();
    //Map through deliveries and check for delivery with id from event arguments
    const updatedDeliveries = route.deliveries.map((delivery) => {
         //If delivery is found skip it
        if (delivery.id === event.arguments.id) {
            delivery.status = "DELIVERED";
            return delivery;
        }
        return delivery;
        }
    );
    //Create params for DynamoDB update
    const params = {
        TableName: process.env.API_BPR2_ROUTETABLE_NAME,
        Key: {
            id: event.arguments.routeId,
        },
        UpdateExpression: 'set deliveries = :deliveries',
        ExpressionAttributeValues: {
            ':deliveries': updatedDeliveries,
        },
        ReturnValues: 'ALL_NEW',
    };
    //Update route in DynamoDB
    const result = await dynamodb.update(params).promise();
    console.log(result);
    //Return true if successful to the client
    return true;
  } catch (error) {
    console.error('Error Updating Route',error);
    //Return false if unsuccessful to the client
    return false;
  }
};
