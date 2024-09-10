import { create } from "zustand";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@/Keys";

type State = {
  messageList: MessageItem[],
  contextHistory: Content[]
}

type Actions = {
  signIn: () => Promise<void>,
  getGeminiResponse: (prompt: string, image?: string | null) => Promise<string>,
}

type Zustand = Actions & State

export const useStore = create<Zustand>((set, get) => ({
  contextHistory: [],
  messageList: [],
  signIn: async () => { },
  getGeminiResponse: async (prompt: string, image: string | null = null): Promise<string> => {
    try {
      const history = get().contextHistory
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: history,
      })
      let result;
      if (image) {
        result = await chat.sendMessage(["Which food is this? Please Fetch nutritional info about this food even if its not accurate, is this a health food?", img])
      } else {
        result = await chat.sendMessage(prompt)
      }
      const response = result.response;
      const text = response.text();
      set({ messageList: [...get().messageList, { message: text, user: false }] });
      set({ contextHistory: history })
      return text;
    } catch (error) {
      console.log(error);
      return '';
    } finally {
      
    }
  },
}))