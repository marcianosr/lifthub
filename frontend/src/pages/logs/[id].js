import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

// import useForm from "./hooks/useForm";

// const calculateVolume = data => {
//   return data.program.reduce((acc, item) => {
//     return [
//       ...acc,
//       {
//         excersise: item.excersise,
//         volume: item.sets.reduce((acc, it) => {
//           return acc + it.weight * it.reps;
//         }, 0),
//         sets: item.sets,
//       },
//     ];
//   }, []);
// };
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

const logsQuery = gql`
  {
    logs {
      id
      name
      date
    }
  }
`;

const Log = () => {
  const router = useRouter();
  const { data, loading } = useQuery(logsQuery);

  const currentLog = data && data.logs.find(log => log.id === router.query.id);

  console.log(currentLog);

  return <h1>Log: {currentLog && currentLog.name}</h1>;
};

export default Log;
