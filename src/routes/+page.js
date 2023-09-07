// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

// import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
// export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

import Papa from 'papaparse'

export async function load({ params }) {
  let data = []
  const result = await fetch("https://docs.google.com/spreadsheets/d/12BGuZL3XpY1SJeH6uxenoBI0t8sDAs1OMoNaJ2obxek/export?exportFormat=csv" , {
    headers: { "content-type": "text/csv;charset=UTF-8" },
  });
  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }
  const fileContent = await result.text();
  console.log(fileContent)
  Papa.parse(fileContent, {
    header: true,
    complete: function(results) {
      data = results.data
    }
  })
  console.log(data[0])
    return {
        data: data
    };
}
