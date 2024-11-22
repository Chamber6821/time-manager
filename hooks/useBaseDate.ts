import { create } from "zustand";

export type BaseDate = {
  baseDate: Date
  set: (data: Partial<BaseDate>) => void
}

export const useBaseDate = create<BaseDate>(set => ({
  baseDate: new Date(),
  set
}))
