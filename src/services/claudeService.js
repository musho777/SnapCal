import Anthropic from '@anthropic-ai/sdk';
import ENV from '../config/env';

// API key is loaded from src/config/env.js
// Get your API key from: https://console.anthropic.com/
// The env.js file is gitignored for security

const anthropic = new Anthropic({
  apiKey: ENV.CLAUDE_API_KEY,
});

/**
 * Detects the actual image type from base64 data
 * @param {string} base64Image - Base64 encoded image string
 * @returns {string} - Detected media type
 */
const detectImageType = base64Image => {
  // Check first few characters of base64 to determine image type
  const signatures = {
    '/9j/': 'image/jpeg', // JPEG
    iVBORw0KGgo: 'image/png', // PNG
    R0lGOD: 'image/gif', // GIF
    UklGR: 'image/webp', // WEBP
  };

  for (const [signature, type] of Object.entries(signatures)) {
    if (base64Image.startsWith(signature)) {
      return type;
    }
  }

  // Default to JPEG if we can't detect
  return 'image/jpeg';
};

/**
 * Analyzes a food image using Claude's vision capabilities
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} mediaType - Image media type (e.g., 'image/jpeg', 'image/png')
 * @param {string} customQuestion - Optional custom question to ask about the food
 * @returns {Promise<Object>} - Parsed food analysis data
 */
export const analyzeFoodImage = async (
  base64Image,
  mediaType = null,
  customQuestion = null,
) => {
  try {
    // Always auto-detect image type from base64 data to avoid type mismatches
    const actualMediaType = detectImageType(base64Image);

    const defaultPrompt = `Analyze this food image and identify the MOST PROMINENT or MAIN dish visible. Return ONLY the single most significant food item. Return your response in the following JSON format:
{
  "foodItems": [
    {
      "name": "name of the most prominent single dish (e.g., 'Grilled Chicken Breast', 'Pepperoni Pizza', 'Caesar Salad')",
      "portion": "estimated portion size of this main dish (e.g., '200g', '2 slices', '1 bowl')",
      "calories": estimated calories for this dish only as number,
      "carbs_g": estimated carbs in grams for this dish only as number,
      "protein_g": estimated protein in grams for this dish only as number,
      "fat_g": estimated fat in grams for this dish only as number,
      "confidence": "high/medium/low"
    }
  ],
  "totalCalories": calories (same as above) as number,
  "totalCarbs": carbs in grams (same as above) as number,
  "totalProtein": protein in grams (same as above) as number,
  "totalFat": fat in grams (same as above) as number,
  "notes": "briefly mention other visible items if any, but focus on the main dish analyzed"
}

CRITICAL INSTRUCTIONS:
- Return ONLY ONE food item - the most prominent, largest, or main dish in the image
- If there are multiple items visible (rice, chicken, vegetables), choose the MAIN/PRIMARY one (usually the protein or largest component)
- Do NOT combine multiple items together
- Do NOT return multiple items in the foodItems array
- Focus on the most visually dominant or central food item
- Provide nutritional estimates for ONLY that single dish
- In notes, you can mention "also visible: rice, salad" but analyze only the main dish
- Be precise and choose the single most significant dish`;

    const prompt = customQuestion || defaultPrompt;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: actualMediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    // Extract text content from response
    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent) {
      throw new Error('No text response from Claude');
    }

    // Parse JSON from response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no JSON found, return structured error with the text
      return {
        error: true,
        message: 'Could not parse response',
        rawResponse: textContent.text,
      };
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    console.log(parsedData);
    return {
      success: true,
      data: parsedData,
      rawResponse: textContent.text,
    };
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(
      error.message || 'Failed to analyze food image. Please try again.',
    );
  }
};

/**
 * Ask a custom question about a food image
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} question - Question to ask about the food
 * @param {string} mediaType - Image media type
 * @returns {Promise<string>} - Claude's response
 */
export const askAboutFood = async (base64Image, question, mediaType = null) => {
  try {
    // Always auto-detect image type from base64 data to avoid type mismatches
    const actualMediaType = detectImageType(base64Image);
    console.log('Image type detection (question):', {
      provided: mediaType,
      detected: actualMediaType,
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: actualMediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: question,
            },
          ],
        },
      ],
    });

    const textContent = response.content.find(block => block.type === 'text');
    return textContent?.text || 'No response received';
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(
      error.message || 'Failed to get response from Claude. Please try again.',
    );
  }
};

export default {
  analyzeFoodImage,
  askAboutFood,
};
