import create from "zustand";
import excercises from "../data/exercises.json";

export interface ExcerciseState {
  excercises: {
    description: string;
    referenceQuery: string;
    tablesOfInterest: string[];
    solutionQuery?: string;
  }[];
  selectedExcercise: number;
  setExcercise: (excercise: number) => void;
}

export const useExcerciseStore = create<ExcerciseState>((set) => ({
  excercises: excercises,
  selectedExcercise: 0,
  setExcercise: (excercise: number) =>
    set({ selectedExcercise: excercise - 1 }),
}));
