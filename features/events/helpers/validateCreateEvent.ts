
export const validateCreateEvent = (data: Omit<IEvent, "_id">, changeError: (field: string, message: string) => void) => {
    let isValid = true;
    if (!data.name) {
      changeError("name", "Event name is required");
      isValid = false;
    }
    if (!data.date) {
      changeError("date", "Event date is required");
      isValid = false;
    }
    if (!data.location) {
      changeError("location", "Event location is required");
      isValid = false;
    }
    if (!data.description) {
      changeError("description", "Event description is required");
      isValid = false;
    }
    return isValid;
  }