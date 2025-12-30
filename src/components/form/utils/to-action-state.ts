import { flattenError, ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  status?: "SUCCESS" | "ERROR";
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    // if validation error with Zod, return first error message
    return {
      message: "",
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
      status: "ERROR",
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    // if another error instance, return error message
    // e.g. database error
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
      status: "ERROR",
      timestamp: Date.now(),
    };
  } else {
    // if not an error instance but something else crashed
    // return generic error message
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
      status: "ERROR",
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData
): ActionState => {
  return {
    message,
    fieldErrors: {},
    status,
    payload: formData,
    timestamp: Date.now(),
  };
};
