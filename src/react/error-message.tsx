import { IValidation } from "typia";

export const messages = new Map<
  string,
  (error: IValidation.IError) => string | undefined
>();

export type ErrorMessageProps = {
  error: IValidation.IError;
  locale?: string;
};
export function ErrorMessage({ error, locale }: ErrorMessageProps) {
  const message = messages.get(locale ?? "") ?? messages.values().next().value;

  return <>{message(error)}</>;
}
