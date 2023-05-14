import typia from "typia";

type FormValues = {
  /** @format uuid */
  id: string;
  /** @maxLength   11 */
  name: string;
  /** @maxLength 5 */
  /** @format email */
  email: string;

  emails: {
    /** @format email */
    email: string;
  }[];
};

const validate = typia.createValidate<FormValues>();

export default function Home() {
  async function action(data: FormData) {
    "use server";

    const values = Object.fromEntries([
      ...data.entries(),
      ["emails", [{ email: "hogehoge" }]],
    ]) as FormValues;

    console.log(validate(values));
  }

  return (
    <main>
      <form action={action}>
        <div>
          <label htmlFor="id">ID</label>
          <input id="id" type="text" name="id" />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" />
        </div>
        <button>Submit</button>
      </form>
    </main>
  );
}
