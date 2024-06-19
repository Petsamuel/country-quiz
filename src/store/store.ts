import { create } from "zustand";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useStore = create((set) => ({
  levelCount: 0,
  QuestionCount: 0,
  failed: false,
  countryData: null,

  setHeadingText: (text: any) => set({ headingText: text }),
  setQuestionCount: (text:number) =>
    set((state: { QuestionCount: number; }) => ({ QuestionCount: text ? text : state.QuestionCount + 1  })),
  setLevelCount: () => set((state: { levelCount: number; }) => ({ levelCount: state.levelCount + 1 })),
  setFailed: () => set((state: { failed: boolean; }) => ({ failed: !state.failed })),
  setData: (data: any) => set({ countryData: data }),
}));
