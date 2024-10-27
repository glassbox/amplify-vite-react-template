import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
      content: a.string(),
      isDone: a.boolean()
    })
    .authorization(allow => [allow.publicApiKey()]),

  Transcript: a.model({
      id: a.string(),  // Primary key
      campaign: a.string(),
      campaignId: a.integer(),
      Outcome: a.string(),
      SuggestedOutcome: a.string(),
      duration: a.integer(),
      firstname: a.string(),
      lastname: a.string(),
      leadPostDate: a.string(),
      phone: a.string(),
      pipeline_stage: a.string(),
      posted: a.string(),
      profileId: a.integer(),
      recId: a.integer(),
      recname: a.string(),
      Status: a.string(),
      time: a.string(),
      tname: a.string(),
      touch: a.integer(),
      // Using a.json() for complex nested data
      TranscriptData: a.json(),
      TranscriptionJobName: a.string(),
      u_name: a.string(),
    })
    .authorization(allow => [allow.publicApiKey()]) // Removed `.table()` as it’s not supported
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// Defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});
