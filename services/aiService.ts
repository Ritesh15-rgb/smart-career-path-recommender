import { Career, User } from "@/types";
import { CAREERS, PERSONALITY_TYPES } from "@/constants/mockData";

type RecommendationRequest = {
  academicScores: User["academicScores"];
  interests: string[];
  skills: string[];
  personalityType: string;
};

export const getCareerRecommendations = async (userData: RecommendationRequest): Promise<Career[]> => {
  try {
    // Prepare the prompt for the AI
    const prompt = `
      Based on the following user profile, recommend the top 5 most suitable careers:
      
      Academic Scores:
      - Math: ${userData.academicScores.math}/10
      - Science: ${userData.academicScores.science}/10
      - English: ${userData.academicScores.english}/10
      - Social Studies: ${userData.academicScores.socialStudies}/10
      - Arts: ${userData.academicScores.arts}/10
      
      Interests: ${userData.interests.join(", ")}
      
      Skills: ${userData.skills.join(", ")}
      
      Personality Type: ${userData.personalityType}
      
      Please provide the top 5 career recommendations with confidence scores (0-100) and a brief explanation for each.
      Format your response as JSON with this structure:
      {
        "recommendations": [
          {
            "careerTitle": "Career Title",
            "confidenceScore": 85,
            "explanation": "Brief explanation of why this career is recommended"
          }
        ]
      }
    `;

    // Make the API call to the AI service
    const response = await fetch("https://toolkit.rork.com/text/llm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a career counselor AI that helps students find suitable career paths based on their academic performance, interests, skills, and personality type." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI recommendations");
    }

    const data = await response.json();
    const aiResponse = data.completion;
    
    // Extract the JSON from the AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    
    // Map the AI recommendations to our Career objects
    const recommendedCareers = parsedResponse.recommendations.map((rec: any) => {
      // Find the matching career from our database
      const matchingCareer = CAREERS.find(
        (career) => career.title.toLowerCase() === rec.careerTitle.toLowerCase()
      );
      
      if (matchingCareer) {
        return {
          ...matchingCareer,
          confidenceScore: rec.confidenceScore,
          aiExplanation: rec.explanation,
        };
      }
      
      // If no matching career is found, create a new one
      return {
        id: `ai-${Math.random().toString(36).substr(2, 9)}`,
        title: rec.careerTitle,
        description: rec.explanation,
        requiredSkills: [],
        matchingTags: [],
        educationRequired: "Varies",
        averageSalary: "Varies",
        growthOutlook: "Varies",
        confidenceScore: rec.confidenceScore,
        aiExplanation: rec.explanation,
      };
    });
    
    return recommendedCareers;
  } catch (error) {
    console.error("AI recommendation error:", error);
    
    // Fallback: Use rule-based recommendations if AI fails
    return getFallbackRecommendations(userData);
  }
};

// Fallback function that uses rule-based matching if the AI service fails
const getFallbackRecommendations = (userData: RecommendationRequest): Career[] => {
  const { academicScores, interests, skills, personalityType } = userData;
  
  // Calculate scores for each career based on matching criteria
  const scoredCareers = CAREERS.map(career => {
    let score = 0;
    
    // Score based on academic strengths
    if (academicScores.math > 7 && career.matchingTags.includes("Mathematics")) score += 20;
    if (academicScores.science > 7 && career.matchingTags.includes("Science")) score += 20;
    if (academicScores.english > 7 && (career.matchingTags.includes("Communication") || career.matchingTags.includes("Writing"))) score += 20;
    if (academicScores.arts > 7 && career.matchingTags.includes("Art")) score += 20;
    
    // Score based on interests
    interests.forEach(interest => {
      if (career.matchingTags.includes(interest)) score += 15;
    });
    
    // Score based on skills
    skills.forEach(skill => {
      if (career.requiredSkills.includes(skill)) score += 15;
    });
    
    // Score based on personality type
    if (personalityType) {
      const personalityMatch = PERSONALITY_TYPES.find(type => type.code === personalityType);
      if (personalityMatch && personalityMatch.careers.includes(career.title)) {
        score += 25;
      }
    }
    
    return {
      ...career,
      confidenceScore: Math.min(Math.round(score), 100),
    };
  });
  
  // Sort by confidence score and return top 5
  return scoredCareers
    .sort((a, b) => (b.confidenceScore || 0) - (a.confidenceScore || 0))
    .slice(0, 5);
};