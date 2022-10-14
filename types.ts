export interface GetThreshold {
  dates: Date[];
  delay?: number;
  customFilter?: (date: Date[]) => Date;
}
