const monthNamesInSchema = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAI",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export async function fetchFood(props: any): Promise<any> {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth();
  const currentMonth: String = monthNamesInSchema[month];
  console.log(currentMonth);
  const foodQuery = `
      query getFood {
        food_by_month(month:["${currentMonth}"],harvest:${props.harvest}) {
          name
          type
        }
      }
    `;

  console.log(" FOOD query: " + foodQuery);
  const gqlApi: string = String(process.env.REACT_APP_FOODAPI_URI);
  const res = await fetch(gqlApi, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: foodQuery,
    }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
