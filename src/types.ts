export interface CalculateThreshold {
  dates: Date[];
  delay?: number;
  customFilter?: (date: Date[]) => Date;
}
