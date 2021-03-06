const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches(pageSize: Int after: String): LaunchConnection!
    # "pageSize: Int" The number of results to show. Must be >= 1. Default = 20
    # "after: String" If you add a cursor here, it will only return results _after_ this cursor
    launch(id: ID!): Launch
    me: User
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    # 'cursor' indicates the current position in the data set
    cursor: String!
    # 'hasMore' boolean that indicates whether the data set 
    # contains any more items beyond those included in launches
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchIds: ID!): TripUpdateResponse!
    login(email: String): String # login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize) : String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

`;

module.exports = typeDefs;