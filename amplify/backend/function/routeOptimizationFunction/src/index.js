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
const axios = require('axios');

const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {

  const dynamoDbquery = {
    TableName: process.env.API_BPR2_ROUTETABLE_NAME,
    Key: {
      id: "46644678-8ff7-4a83-a9dd-3dbf2139a8f5",
    },
  };
  const getRoute = async () => {
    try {
      let route = null;
      const data = await dynamodb.get(dynamoDbquery).promise();
      //const userAttributes = event.request.userAttributes;
      //const requestOwner = userAttributes.sub+"::"+userAttributes.userName;
      const requestOwner = '513aec5b-625f-4ad5-97a2-e9d1e16df141::hadi';
      if (data.Item && data.Item.owner === requestOwner) {
        route = data.Item;
        return route;
      } else {
        throw new Error('Route not found');
      }
    } catch (err) {
      console.error('Error getting route:', err);
      return null;
    }
  }

  try {
    const route = await getRoute();

    const deliveryPoints = route.deliveries.map((delivery) => [delivery.point.longitude, delivery.point.latitude]);
    const startPoint = [
      [route.start_address.longitude, route.start_address.latitude]
    ];
    const endPoint = [
      [route.end_address.longitude, route.end_address.latitude]
    ];
    // Prepare the request payload
    const payload = {
      locations: [startPoint[0], ...deliveryPoints, endPoint[0]],

    };
    const convertedData = payload.locations.map(point => point.join(',')).join(';');
    const url = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + convertedData;
    const response = await axios.get(
      url, {
        params: {
          access_token: 'pk.eyJ1IjoiaGFkaWNwaCIsImEiOiJjbGh0NnB5MjkwOGh5M3JvM3BuNnh5YjFkIn0.afZy31Oq8ASstVVCTOrpQg',
          source: 'first',
          destination: 'last',
        },
      }
    );
    // Extract the optimized route from the API response
    const optimizedWaypoints = response.data.waypoints;
    if (!optimizedWaypoints) {
      throw new Error('Failed to optimize route');
    }
    // Remove the start and end waypoints from the optimized route
    optimizedWaypoints.shift();
    optimizedWaypoints.pop();
    const waypointOrder = optimizedWaypoints.map((waypoint) => waypoint.waypoint_index);
    // Reorder the deliveries based on the waypoint order - offset index by 1 to account for start waypoint
    const orderedDeliveries = waypointOrder.map((index) => {
      const delivery = route.deliveries[index - 1];
      if(delivery){
      delivery.optimized = true;
      return delivery;
      }
      return null;
    });
    route.deliveries = orderedDeliveries;
    route.optimized = true;
    //Write new route changes to database
    const params = {
      TableName: process.env.API_BPR2_ROUTETABLE_NAME,
      Key: {
        id: "46644678-8ff7-4a83-a9dd-3dbf2139a8f5",
      },
      UpdateExpression: 'SET deliveries = :deliveries, optimized = :optimized',
      ExpressionAttributeValues: {
        ':deliveries': orderedDeliveries,
        ':optimized': true,
      },
      ReturnValues: 'ALL_NEW'
    }
    const result = await dynamodb.update(params).promise();
     const body = {
        optimized:{
            __typename: 'Route',
        id: result.Attributes.id,
        route_name: result.Attributes.route_name,
        deliveries: result.Attributes.deliveries,
        start_address: result.Attributes.start_address,
        end_address: result.Attributes.end_address,
        status: result.Attributes.status,
        date: result.Attributes.date,
        optimized: result.Attributes.optimized,
        hasStarted: result.Attributes.hasStarted,
        estimated_time: result.Attributes.estimated_time,
        estimated_distance: result.Attributes.estimated_distance,
        owner: result.Attributes.owner,
        type: result.Attributes.type,
        createdAt: result.Attributes.createdAt,
        updatedAt: result.Attributes.updatedAt,
          }};
      console.log(body);
    // Return the optimized route
    return {
      statusCode: 200,
        optimized:{
            __typename: 'Route',
        id: result.Attributes.id,
        route_name: result.Attributes.route_name,
        deliveries: result.Attributes.deliveries,
        start_address: result.Attributes.start_address,
        end_address: result.Attributes.end_address,
        status: result.Attributes.status,
        date: result.Attributes.date,
        optimized: result.Attributes.optimized,
        hasStarted: result.Attributes.hasStarted,
        estimated_time: result.Attributes.estimated_time,
        estimated_distance: result.Attributes.estimated_distance,
        owner: result.Attributes.owner,
        type: result.Attributes.type,
        createdAt: result.Attributes.createdAt,
        updatedAt: result.Attributes.updatedAt,
          },
    };
  } catch (error) {
    console.error('Error optimizing routes:', error);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Failed to optimize routes'}),
    };
  }
};
