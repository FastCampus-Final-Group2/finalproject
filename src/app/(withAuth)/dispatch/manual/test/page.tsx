// "use client";

// import { useEffect, useState } from "react";
// import { DragDropContext, Draggable } from "react-beautiful-dnd";
// import { StrictModeDroppable } from "@/components/DragDrop/StrictModeDroppable";

// // 리스트를 재정렬하는 함수
// const reorder = (list: any[], startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

// // 리스트 간 데이터 이동 함수
// const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);
//   destClone.splice(droppableDestination.index, 0, removed);

//   return {
//     source: sourceClone,
//     destination: destClone,
//   };
// };

// const App = () => {
//   const initialListOne = [
//     { title: "타이틀 1", index: 1, date: "240607", time: "0205" },
//     { title: "타이틀 2", index: 2, date: "240707", time: "0807" },
//     { title: "타이틀 3", index: 3, date: "240907", time: "1010" },
//   ];

//   const initialListTwo: any[] = [];

//   const [listOne, setListOne] = useState(initialListOne);
//   const [listTwo, setListTwo] = useState(initialListTwo);

//   useEffect(() => {
//     setListOne(initialListOne);
//     setListTwo(initialListTwo);
//   }, []);

//   const onDragEnd = (result: any) => {
//     const { source, destination } = result;

//     if (!destination) return;

//     if (source.droppableId === destination.droppableId) {
//       // 같은 리스트 내에서의 이동
//       if (source.droppableId === "droppableOne") {
//         setListOne((prevList) => reorder(prevList, source.index, destination.index));
//       } else {
//         setListTwo((prevList) => reorder(prevList, source.index, destination.index));
//       }
//     } else {
//       // 리스트 간의 이동
//       if (source.droppableId === "droppableOne" && destination.droppableId === "droppableTwo") {
//         const result = move(listOne, listTwo, source, destination);
//         setListOne(result.source);
//         setListTwo(result.destination);
//       } else if (source.droppableId === "droppableTwo" && destination.droppableId === "droppableOne") {
//         const result = move(listTwo, listOne, source, destination);
//         setListTwo(result.source);
//         setListOne(result.destination);
//       }
//     }
//   };

//   return (
//     <>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex gap-5">
//           {/* 첫 번째 리스트 */}
//           <StrictModeDroppable droppableId="droppableOne">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[300px] w-52 bg-gray-100 p-5">
//                 <h3 className="font-semibold mb-4">리스트 1 (타이틀과 날짜)</h3>
//                 {listOne.map((item, index) => (
//                   <Draggable key={item.title} draggableId={item.title} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="user-select-none mb-2 rounded bg-white p-4 shadow"
//                       >
//                         <div>{item.title}</div>
//                         <div>{item.date}</div> {/* 리스트 1에서는 날짜를 렌더링 */}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </StrictModeDroppable>

//           {/* 두 번째 리스트 */}
//           <StrictModeDroppable droppableId="droppableTwo">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[300px] w-52 bg-gray-100 p-5">
//                 <h3 className="font-semibold mb-4">리스트 2 (타이틀과 시간)</h3>
//                 {listTwo.map((item, index) => (
//                   <Draggable key={item.title} draggableId={item.title} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="user-select-none mb-2 rounded bg-white p-4 shadow"
//                       >
//                         <div>{item.title}</div>
//                         <div>{item.time}</div> {/* 리스트 2에서는 시간을 렌더링 */}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </StrictModeDroppable>
//         </div>
//       </DragDropContext>
//     </>
//   );
// };

// export default App;
