export const MEAL_PLAN = `**Goals:** Refer to survey results and conversation history
**Dietary Preferences:** Refer to survey results and conversation history
**Allergies/Restrictions:** Refer to survey results and conversation history

**Weeklong Meal Plan**

**Monday**
* Breakfast: breakfast suggestion
* Lunch: lunch suggestion 
* Dinner: dinner suggestion 

**Tuesday**
* Breakfast: breakfast suggestion
* Lunch: lunch suggestion 
* Dinner: dinner suggestion 

**Wednesday**
* Breakfast: breakfast suggestion
* Lunch: lunch suggestion 
* Dinner: dinner suggestion 

**Thursday**
* Breakfast: breakfast suggestion
* Lunch: lunch suggestion 
* Dinner: dinner suggestion 

**Friday - Sunday**
* Select variations of meals from throughout the week, emphasizing repetition and ingredient reuse

**Important Notes:**
* try to make few variations of meals to reduce prep time
* optional snack suggestion (Provide 1-2 repeatable snack options)
* Hydration: Encourage regular water intake throughout the day. 
* Prioritize simple meals with 5-7 core ingredients. 
* Suggest variations by swapping 1-2 ingredients from other meals.
* Be mindful of potential cross-contamination for severe allergies. 
`;

export const NUTRITIONIST = `You are a knowledgeable and helpful nutritionist. Aim to provide personalized recommendations and guidance based on the user's specific goals, dietary preferences, and health conditions. 

   **Conversation History**
   {chat_history}
   
   **User:** {input}
   **AI:**
   
   **Important Considerations:**
   
   * **Pay special attention to the Survey Results section when formulating your response.**
   * **Goals:** Did the user mention specific goals (weight loss, muscle gain, improved energy, etc.)? Respond with questions to gather these if missing.
   * **Dietary Preferences:**  Acknowledge and incorporate preferences (vegetarian, vegan, pescatarian, etc.).  
   * **Allergies/Intolerances:**  Crucial! Ask directly if not mentioned: "Do you have any food allergies, intolerances, or medical conditions I should be aware of?"
   * **Lifestyle:** Adjust advice based on activity levels, cooking habits, etc. Consider asking questions to get this context.
   * **Knowledge:**  Your responses should reflect sound nutritional knowledge. Avoid making claims that could be misconstrued as medical advice. If necessary, suggest the user consult a registered dietitian.
   * **Supportive Tone:**  Use encouraging language, offering realistic tips and strategies.`;

export const INITIAL_SURVEY = `Hi, We're committed to helping you reach your health goals! To personalize your nutrition program, please answer to this quick 10-question survey: 
   1. **What are your primary health and fitness goals?** (Weight loss, muscle gain, improved energy, etc.)
   2. **What is your current diet like?** (Balanced, vegetarian, vegan, high-protein, high-carb, etc.) Please be as detailed as possible about your typical meals and snacks.
   3. **Do you have any food allergies, intolerances, or medical conditions that might affect your diet?** Please specify the severity of these allergies or intolerances.
   4. **On a scale of 1-10, how ready are you to make significant dietary changes?**
   5. **How would you describe your physical activity levels?** (Sedentary, light, moderate, intense). If possible, please describe your typical exercise routine.
   6. **What are your cooking habits like?** (How often do you cook at home, how much time do you usually have for meal preparation, do you enjoy cooking?
   7. **Do you have any restrictions on your meals due to cultural, religious beliefs, or personal choices?**
   8. **How would you describe your eating patterns?** (Regular meals, skip meals, night eating, etc.)
   9. **Are there any specific foods or types of cuisine you particularly enjoy or dislike?**
   10. **Do you have any specific concerns or questions about nutrition or diet?**
   Your input is incredibly valuable. Thank you for your time! `;
