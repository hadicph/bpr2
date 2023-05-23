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
  //Creating DynamoDB query to get route - using the id from the event arguments
  const dynamoDbquery = {
    TableName: process.env.API_BPR2_ROUTETABLE_NAME,
    Key: {
      id: event.arguments.id,
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
    //Map through the route deliveries and create an array of coordinates of the deliveries
    const deliveryPoints = route.deliveries.map((delivery) => [delivery.point.longitude, delivery.point.latitude]);
    //Create start and end coordinates for the route
    const startPoint = [
      [route.start_address.longitude, route.start_address.latitude]
    ];
    const endPoint = [
      [route.end_address.longitude, route.end_address.latitude]
    ];
    // Prepare the request payload joining start and end coordinates with the delivery coordinates
    //Start and end coordinates are added to the beginning and end of the array (REQUIRED!!)
    const payload = {
      locations: [startPoint[0], ...deliveryPoints, endPoint[0]],
    };
    //Convert the data to be accepted by the Mapbox API
    const convertedData = payload.locations.map(point => point.join(',')).join(';');
    //Prepare the url with the converted data
    const url = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + convertedData;
    // Make the request to the Mapbox Optimization API
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
    // Check if the response is valid
    if (!optimizedWaypoints) {
      throw new Error('Failed to optimize route');
    }
    // Remove the start and end waypoints from the optimized route
    optimizedWaypoints.shift();
    optimizedWaypoints.pop();
    // Get the waypoint order from the optimized route - this is the order of the deliveries after optimization
    const waypointOrder = optimizedWaypoints.map((waypoint) => waypoint.waypoint_index);
    // Reorder the deliveries based on the waypoint order - offset index by 1 to account for start waypoint
    const orderedDeliveries = waypointOrder.map((index) => {
      const delivery = route.deliveries[index - 1];
      //Check if delivery exists
      if(delivery){
      //Set optimized to true
      delivery.optimized = true;
      return delivery;
      }
      //If delivery does not exist return null
      return null;
    });
    //Set route deliveries to the ordered deliveries
    route.deliveries = orderedDeliveries;
    //Set route optimized to true
    route.optimized = true;
    //Write new route changes to database
    const params = {
      TableName: process.env.API_BPR2_ROUTETABLE_NAME,
      Key: {
        // Get the route id from the event arguments
        id: event.arguments.id,
      },
      UpdateExpression: 'SET deliveries = :deliveries, optimized = :optimized',
      ExpressionAttributeValues: {
        ':deliveries': orderedDeliveries,
        ':optimized': true,
      },
      ReturnValues: 'ALL_NEW'
    }
    // Update the route in the database
    const result = await dynamodb.update(params).promise();
    console.log(result);
    // Return the optimized route
    return {
      //Prepare the response to abide by the AppSync GraphQL schema
      //Schema is expecting a Route type
      statusCode: 200,
         __typename: 'Route',
        id: route.id,
        route_name: route.route_name,
        deliveries: route.deliveries,
        start_address: route.start_address,
        end_address: route.end_address,
        status: route.status,
        date: route.date,
        optimized: route.optimized,
        hasStarted: route.hasStarted,
        estimated_time: route.estimated_time,
        estimated_distance: route.estimated_distance,
        owner: route.owner,
        type: route.type,
        createdAt: route.createdAt,
        updatedAt: route.updatedAt,
      
    };
    // Catch any errors and log them to the console
  } catch (error) {
    console.error('Error optimizing routes:', error);

    // Return an error response with status code 500
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Failed to optimize routes'}),
    };
  }
};
