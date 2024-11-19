// It will use in Display book detail in table format

// import React from "react";

// const Table = () => {
//   return (
//     <>
//       {/* Book List Table */}
//       <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-md rounded-lg">
//         <table className="min-w-full table-auto text-left">
//           <thead className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-sm font-medium">Title</th>
//               <th className="px-6 py-3 text-sm font-medium">Author</th>
//               <th className="px-6 py-3 text-sm font-medium">ISBN</th>
//               <th className="px-6 py-3 text-sm font-medium">Genre</th>
//               <th className="px-6 py-3 text-sm font-medium">Cover</th>
//               <th className="px-6 py-3 text-sm font-medium">Average Rating</th>
//               <th className="px-6 py-3 text-sm font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 ">
//             {DUMMY_BOOKS.map((book) => (
//               <tr key={book.id}>
//                 <td className="px-6 py-4 text-sm">{book.title}</td>
//                 <td className="px-6 py-4 text-sm">{book.author}</td>
//                 <td className="px-6 py-4 text-sm">{book.isbn}</td>
//                 <td className="px-6 py-4 text-sm">{book.genre}</td>
//                 <td className="px-6 py-4">
//                   <img src={book.cover} alt="Cover" className="w-16 h-16 object-cover rounded" />
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <div className="flex items-center gap-2">
//                     <span className="text-yellow-500">
//                       {Array.from({ length: Math.floor(book.rating) }).map((_, index) => (
//                         <span key={index}>&#9733;</span> // Filled star
//                       ))}
//                       {Array.from({ length: 5 - Math.floor(book.rating) }).map((_, index) => (
//                         <span key={index + 5} className="text-gray-400">
//                           &#9734;
//                         </span> // Empty star
//                       ))}
//                     </span>
//                     <span className="text-sm text-gray-700 dark:text-gray-300">{book.rating.toFixed(1)}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 space-x-3 ">
//                   <div className="actions flex flex-row items-center gap-4">
//                     {/* Edit Button */}
//                     <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600">Edit</button>
//                     {/* View Book Button */}
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600" onClick={() => navigateToBookDetail(book.id)}>
//                       View Book
//                     </button>
//                     {/* Delete Button */}
//                     <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600" onClick={() => openDeleteModal(book.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Table;
