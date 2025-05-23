// This file exists due to CORS blocking the request; due to making a request from my app to google which is a different origin. So instead of having my fetch requests for searchbar.tsx, it will be called here and then SearchBar will have the suggestions be fetched from here to Searchbar.tsx
// Other words, this is a server side helper that will assist in fetching the data necessary without fail

// This will run only on the server, which will avoid the CORS error
export async function GET(req: Request) {
  // req is of type Request from Web Fetch API which is standard in app router
  const { searchParams } = new URL(req.url); // req.url would be the full URL including what the user entered (i.e /api/youtube/suggestions?query=cat)
  const query = searchParams.get("query"); // new URL is taking that req.url and converting it into a URL object
  // searchParams.get will extract the word that comes out of "query=", so in this case if user wrote cat, it would be "query=cat"

  if (!query) {
    // If the user basically typed nothing inside the search bar, return an empty array with status 204, which will not make any changes to the app
    return new Response(JSON.stringify([]), { status: 204 });
  }

  try {
    const res = await fetch(
      `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const text = await res.text();

    // Strip JSONP wrapper, that is what is causing the dropbox to not show any suggestions when typing in searchBar
    const match = text.match(/window\.google\.ac\.h\((\[.*\])\)/);
    if (!match || !match[1]) {
      return new Response(JSON.stringify([]), { status: 204 });
    }

    const rawJson = match[1];

    return new Response(rawJson, {
      headers: { "Content-Type": "application/json" },
    });

    return new Response(text, {
      headers: { "Content-type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
      }
    );
  }
}
