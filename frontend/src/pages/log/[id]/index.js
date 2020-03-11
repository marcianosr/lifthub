import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

// import useForm from "./hooks/useForm";

const calculateVolume = data => {
  return data.program.reduce((acc, item) => {
    return [
      ...acc,
      {
        excersise: item.excersise,
        volume: item.sets.reduce((acc, it) => {
          return acc + it.weight * it.reps;
        }, 0),
        sets: item.sets,
      },
    ];
  }, []);
};
// const Log = ({ match }) => {
//   const [data] = useForm(match.params.date);

//   return (
//     <>
//       <h2>{data.name}</h2>
//       <time>{data.date}</time>
//       <section>
//         {calculateVolume(data).map(item => (
//           <>
//             <h2>{item.excersise}</h2>
//             <ol>
//               {item.sets.map((set, idx) => (
//                 <li key={idx}>
//                   Weight: {set.weight} Reps: {set.reps}
//                 </li>
//               ))}
//             </ol>
//             <p>Total volume: {item.volume}</p>
//             <p>Total sets: {item.sets.length}</p>
//           </>
//         ))}
//       </section>
//     </>
//   );
// };

// export default Log;

// Optimize later: The extra graphql to rendered data passed down from a upper component to prevent an extra call.
const LOGS_BY_USER_QUERY = gql`
  query LOGS_BY_USER_QUERY($logId: ID!) {
    log(id: $logId) {
      id
      name
      excersises {
        name
        sets {
          id
          weight
          reps
        }
      }
    }
  }
`;

const Log = () => {
  const router = useRouter();

  const { data, loading } = useQuery(LOGS_BY_USER_QUERY, {
    variables: { logId: router.query.id },
  });

  const { log } = { ...data };

  return (
    <section>
      {log && (
        <article>
          <h1>{log.name}</h1>
          {log.excersises.map(excersise => (
            <div key={excersise.id}>
              <p>{excersise.name}</p>

              <ul>
                {excersise.sets.map(set => (
                  <li key={set.id}>
                    {set.weight} - {set.reps}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      )}
    </section>
  );
};

export default Log;
