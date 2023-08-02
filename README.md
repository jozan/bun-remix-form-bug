# bun + remix form data bug

## environment
```sh
$ bun --version
0.7.1
$ sw_vers
ProductName:		macOS
ProductVersion:		13.5
BuildVersion:		22G74
```

## setup

```sh
bun install
bun run dev
```

then go to [http://localhost:3000](http://localhost:3000)

## the bug

i have two forms in index route. the first one is `useFetcher` form and the other just plain old form.

when submitting either of the form their body is dropped when it reaches `action` handler. `await request.formData()` returns `{}`.

when i copy the post request from dev tools as cURL command and run it the `request.formData()` gets populated correctly.

`app/routes/_index.tsx`

```ts
import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionArgs) {
  console.log(request);
  console.log(request.method);
  console.log(await request.formData());

  return json({ hello: "world" });
}

export default function Index() {
  const fetcher = useFetcher();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <fetcher.Form method="POST" action="/?index">
        <button type="submit" name="form-type" value="fetcher form">
          fetcher form
        </button>
      </fetcher.Form>
      <form method="POST" action="/?index">
        <button type="submit" name="form-type" value="form form">
          form form
        </button>
      </form>
    </div>
  );
}
```

