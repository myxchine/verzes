import { GenerationConfig, SchemaType } from "@google/generative-ai";
export const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8000,
  responseMimeType: "application/json",
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING,
      },
      description: {
        type: SchemaType.STRING,
      },
      focusAreas: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
    },
    required: ["name", "description", "focusAreas"],
  },
};
