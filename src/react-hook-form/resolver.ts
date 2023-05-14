import { getDeriver } from "@achamaro/typia-utils";
import { toNestError, validateFieldsNatively } from "@hookform/resolvers";
import { FieldValues, ResolverOptions, ResolverResult } from "react-hook-form";
import { FieldErrors } from "react-hook-form";
import typia from "typia";

export type TypiaResolverOptions<T> = {
  validate: (input: unknown) => typia.IValidation<T>;
  locale?: string;
};

export type Resolver = <T>(
  options: TypiaResolverOptions<T>
) => <TFieldValues extends FieldValues, TContext>(
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>;

export const typiaResolver: Resolver = ({ validate, locale }) => {
  return async (values, _, options) => {
    const deriveMessage = getDeriver(locale);

    const result = validate(values);

    if (result.success) {
      options.shouldUseNativeValidation && validateFieldsNatively({}, options);

      return {
        errors: {} as FieldErrors,
        values,
      };
    }

    let errors = result.errors.map((v) => {
      return [
        v.path.replace(/^\$input\./, ""),
        {
          type: v.expected,
          message: deriveMessage(v),
          original: v,
        },
      ] as const;
    });

    if (options.shouldUseNativeValidation || options.criteriaMode !== "all") {
      errors = [...new Map(errors)];
    }

    return {
      values: {},
      errors: toNestError(Object.fromEntries(errors) as FieldErrors, options),
    };
  };
};
