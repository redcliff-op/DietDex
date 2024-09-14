import { create } from "zustand";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@/Keys";
import RNFS from 'react-native-fs';
import { GoogleSignin, isSuccessResponse, User } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

type State = {
  messageList: MessageItem[],
  contextHistory: Content[],
  geminiLoading: boolean,
  userData: User | null
}

type Actions = {
  signIn: () => Promise<void>,
  getGeminiResponse: (prompt: string, image?: string | null, json?: boolean) => Promise<string>,
}

type Zustand = Actions & State

export const useStore = create<Zustand>((set, get) => ({
  contextHistory: [],
  messageList: [],
  userData: null,
  geminiLoading: false,
  signIn: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if(isSuccessResponse(response)){
        set({userData: response.data})
        console.log(response.data)
        router.navigate(`/HomeScreen`)
      }
    } catch(error){
      console.log(error)
    }
  },
  getGeminiResponse: async (prompt: string, image: string | null = null, json?: boolean = false): Promise<string> => {
    set({ geminiLoading: true });
    try {
      const history = get().contextHistory;
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: (json) ? "application/json" : "text/plain" } });
      const chat = model.startChat({
        history: history,
      });
      let result;
      if (image) {
        const fsImage = await RNFS.readFile(image, 'base64');
        const img = {
          inlineData: {
            data: fsImage,
            mimeType: "image/png",
          },
        };
        if (json) {
          result = await chat.sendMessage([`Which food is this? Extract all relevant information from the food, including the product name, brand, quantity, weight (in grams or milliliters), serving size, nutritional details such as calories, fats (saturated and trans fats), sugars, sodium, protein, carbohydrates, fiber, vitamins, and minerals. Gather the full list of ingredients in order of quantity and identify any harmful or controversial ingredients like preservatives, artificial additives, or allergens. Capture any proprietary claims like 'sugar-free' or 'trans-fat-free' and verify if those claims match the nutritional information. Additionally, perform a health analysis by checking how processed the product is, identifying nutrient deficits, and determining whether it complies with diets like keto, vegan, or diabetic-friendly. Highlight any potential allergens or harmful substances. Finally, validate any claims made by the brand and provide an overall health analysis based on the extracted data.
          Please return the result in the following JSON format:
          {
            \"product_name\": \"\",
            \"brand\": \"\",
            \"quantity\": \"\",
            \"weight\": 0,
            \"serving_size\": null,
            \"nutrients\": {
              \"calories\": null,
              \"fats\": {
                \"total\": null,
                \"saturated_fats\": null,
                \"trans_fats\": null
              },
              \"sugars\": null,
              \"sodium\": null,
              \"protein\": null,
              \"carbohydrates\": null,
              \"fiber\": null
            },
            \"vitamins\": [],
            \"minerals\": [],
            \"ingredients\": [],
            \"preservatives\": [],
            \"artificial_additives\": [],
            \"allergens\": [],
            \"proprietary_claims\": [],
            \"processed_level\": \"\",
            \"nutrient_deficits\": [],
            \"keto_friendly\": false,
            \"vegan\": false,
            \"diabetic_friendly\": false,
            \"health_analysis\": \"\",
            \"brand_claims_validation\": \"\"
          }
          `, img])
        } else {
          result = await chat.sendMessage([prompt, img]);
        }
      } else {
        result = await chat.sendMessage(prompt);
      }
      const response = result.response;
      const text = response.text();
      if (!json) {
        set({ messageList: [...get().messageList, { message: text, user: false }] });
      }
      set({ contextHistory: history });
      return text;
    } catch (error) {
      console.log(error);
      return '';
    } finally {
      set({ geminiLoading: false });
    }
  },

}))