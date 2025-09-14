// Types for poll form errors and state
// Each field in PollFormErrors can hold an array of error messages for that part of the form
export type PollFormErrors = {
  question?: string[];
  options?: string[];
  _form?: string[];
};

// PollFormState holds the errors object for the form
export type PollFormState = {
  errors: PollFormErrors;
};