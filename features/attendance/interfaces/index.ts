export interface IEventDetails {
  _id: string,
  name: string,
  date: string,
  location: string,
  description: string,
  user_id: string,
  additionalInfoFields: string[],
}

export interface IAttendance {
  first_name: string,
  last_name: string,
  email: string,
  additionalInfoFields: {
    field: string;
    value: string;
  }[],
}