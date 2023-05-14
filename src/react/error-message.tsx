import { getDeriver } from "@achamaro/typia-utils";
import { useMemo } from "react";
import { IValidation } from "typia";

export type ErrorMessageProps = {
  error: IValidation.IError;
  locale?: string;
};
export function ErrorMessage({ error, locale }: ErrorMessageProps) {
  const deriveMessage = useMemo(() => {
    return getDeriver(locale);
  }, [locale]);

  return <>{deriveMessage(error)}</>;
}
