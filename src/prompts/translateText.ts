// src/prompts/translateText.ts
import { z } from "zod";
import { logMessage } from "../utils/logger.js";

// Schema for translate_text prompt parameters
export const translateTextSchema = {
  text: z.string().describe("The text to translate"),
  target_language: z.string().describe("The target language to translate the text to")
};

// Implementation of translate_text prompt
export const translateText = async (
  { 
    text, 
    target_language 
  }: { 
    text: string, 
    target_language: string 
  },
  extra: any
) => {
  logMessage(`HCM-aware translation request to ${target_language} with auto-detection`);
  
  return {
    messages: [
      {
        role: "user",
        content: { 
          type: "text", 
          text: `You are a professional translator with expertise in Human Capital Management (HCM) terminology.

Language Translation Task for HCM Context

First, identify the source language of the provided text. Then translate the text to ${target_language}, with special attention to Human Capital Management context and terminology.

Translation Requirements:

1. Maintain the original meaning while properly handling HCM-specific terminology
2. Preserve all formatting including bullets, tables, and paragraph structure
3. Keep proper nouns, system field names, and UI elements untranslated unless specifically required
4. Pay special attention to contextual meanings of terms with multiple interpretations in HCM

HCM Context-Specific Term Guide:
- "Check": May refer to payment method (payroll context) or verification action (approval context)
- "Period": May refer to payroll timeframe or medical leave context
- "Benefits": May refer to employee insurance/perks or general advantages
- "Development": May refer to employee skill growth or software/system creation
- "Position": May refer to job role/title or physical location
- "Cycle": May refer to recurring process or biological cycle
- "Performance": May refer to employee evaluation or system functionality
- "Record": May refer to employee data entry or achievement notation
- "Time": May refer to work hours or chronological measurement
- "Report": May refer to formal documentation or verbal communication

Text to translate:
"${text}"

Provide ONLY the translated text without explanations, notes, or your thought process. Don't include quotation marks around the translated text unless they were in the original.`
        }
      }
    ]
  };
};