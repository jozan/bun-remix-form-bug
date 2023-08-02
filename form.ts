export default {
    port: 3000,
    async fetch(request) {
        try {
            if (request.method === "POST") {
                console.log(request)
                const formData = await request.formData();
                console.log(formData);
            }
        } catch (e) { }

        return new Response(`
            <form method="POST">
                <button type="submit" name="tussi" value="tussivalue">Submit</button>
            </form>
        `, {
            headers: {
                "Content-Type": "text/html",
            },
        })
    }
}
