import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react"

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
                <button type="submit" name="form-type" value="fetcher form">fetcher form</button>
            </fetcher.Form>
            <form method="POST" action="/?index">
                <button type="submit" name="form-type" value="form form">form form</button>
            </form>
        </div>
    );
}
