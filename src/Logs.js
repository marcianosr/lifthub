import React from "react";
import { Route, Link } from "react-router-dom";
import { useLocalStorage } from "react-use";

import Block from "./layout/Block";
import ListItem from "./layout/ListItem";
import { mockData } from "./mockData";

const calculateVolume = mockData => {
  return mockData.map(data => {
    return {
      [data.name]: data.program.reduce((acc, item) => {
        return {
          ...acc,
          [item.excersise]: item.sets.reduce((acc, it) => {
            return acc + it.weight * it.reps;
          }, 0),
        };
      }, {}),
    };
  });
};

const getLogs = () => {
  const [value] = useLocalStorage(`training-17-7-2019`);

  return value;
};

const Logs = () => {
  const data = getLogs();
  console.log(data);
  return (
    <Block title={data.name}>
      <Link to={`edit/${data.date}`}>Edit log</Link>

      <time>{data.date}</time>
      {data.program.map((list, idx) => (
        <ListItem key={idx} title={list.excersise} />
      ))}
    </Block>
  );
};
// mockData.map((data, i) => (
//   <Block key={i} title={data.name} styles="">
//     <>
//       <time>{data.date}</time>
//       {data.program.map((list, i) => (
//         <ListItem key={i} title={list.excersise} styles="">
//           <ul>
//             {list.sets.map((item, i) => (
//               <li key={i}>
//                 <span>set #{i + 1}: </span> - {item.weight}kg - {item.reps}{" "}
//                 reps - volume: ?? -<span>PR!</span>
//               </li>
//             ))}
//             <span>
//               <strong>
//                 Volume:
//                 {calculateVolume(mockData).map(item => {
//                   if (item[data.name]) {
//                     return item[data.name][list.excersise];
//                   }
//                 })}
//               </strong>
//             </span>
//           </ul>
//         </ListItem>
//       ))}
//     </>
//   </Block>
// ));

export default Logs;
