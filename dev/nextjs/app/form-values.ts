import typia from "typia";

export type FormValues = {
  /** @maxLength 10 */
  name: string;
  /** @format email */
  email: string;
};

export const validate = typia.createValidate<FormValues>();
