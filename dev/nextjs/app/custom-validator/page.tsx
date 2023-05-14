"use client";

import {
  createDeriver,
  extendsValidator,
  setDeriver,
} from "@achamaro/typia-utils";
import ja from "@achamaro/typia-utils/message/ja.json";
import { typiaResolver } from "@achamaro/typia-utils/react-hook-form";
import { SubmitHandler, useForm } from "react-hook-form";
import typia from "typia";

extendsValidator();

type FormValues = {
  /**
   * @required
   * @maxLength 10
   */
  name: string;
  /**
   * @required
   * @format email
   */
  email: string;
};

const validate = typia.createValidate<FormValues>();

setDeriver("ja", createDeriver(ja));

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: typiaResolver({
      validate,
    }),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input defaultValue="max length 10" {...register("name")} />

          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <input {...register("email")} />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
