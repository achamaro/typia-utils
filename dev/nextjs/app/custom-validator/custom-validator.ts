import typia from "typia";
import { Customizable } from "typia/lib/typings/Customizable";

export type Validator = <T>(value: T, tag?: string) => boolean;

/**
 * カスタムバリデータを登録する
 */
export function extendsValidator() {
  insertCustomValidator("required", ["string", "number"], validator.required);
}

/**
 * カスタムバリデータを登録する
 * @param name - タグ名
 * @param types - 関数を登録する型
 * @param validator - 検証関数
 */
export function insertCustomValidator(
  name: string,
  types: (keyof Customizable)[],
  validator: Validator
) {
  // required
  ((insert) => {
    types.forEach(<T extends keyof Customizable>(type: T) => {
      insert(type)(
        (tag: string) => (value: Customizable[T]) => validator(value, tag)
      );
    });
  })(typia.customValidators.insert(name));
}

export namespace validator {
  export function required<T>(value: T) {
    if (value == null) {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== "";
  }
}
