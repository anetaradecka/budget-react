// import { useState } from "react";
// import "./Modal.css";

// const Modal = (props) => {
//   const toggleModal = () => {
//     document.getElementById("modal").classList.toggle("active");
//   };

//   const [enteredCategory, setEnteredCategory] = useState("");
//   const [enteredValue, setEnteredValue] = useState("");
//   const [enteredDate, setEnteredDate] = useState("");
//   const [enteredDescription, setEnteredDescription] = useState("");

//   const categoryChangeHandler = (event) => {
//     setEnteredCategory(event.target.value);
//   };

//   const valueChangeHandler = (event) => {
//     setEnteredValue(event.target.value);
//   };

//   const dateChangeHandler = (event) => {
//     setEnteredDate(event.target.value);
//   };

//   const descriptionChangeHandler = (event) => {
//     setEnteredDescription(event.target.value);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const transactionData = {
//       category: enteredCategory,
//       value: enteredValue,
//       date: new Date(enteredDate),
//       description: enteredDescription,
//     };
//     // console.log(transactionData);
//     props.onSaveTransactionData(transactionData);
//     setEnteredCategory("");
//     setEnteredValue("");
//     setEnteredDate("");
//     setEnteredDescription("");
//   };

//   return (
//     <div className="modal" id="modal">
//       <div className="overlay"></div>
//       <div className="content">
//         <div className="close-btn" onClick={toggleModal}>
//           &times;
//         </div>
//         <h2>New transaction</h2>

//         <form className="transaction-form" onSubmit={submitHandler}>
//           <div className="form-control">
//             <label htmlFor="category">category</label>
//             <select id="category" name="category">
//               <option value={enteredCategory} onChange={categoryChangeHandler}>
//                 category
//               </option>
//             </select>
//           </div>

//           <div className="form-control-group">
//             <div className="form-control">
//               <label htmlFor="value">value</label>
//               <input
//                 type="number"
//                 name="value"
//                 id="value"
//                 step="0.01"
//                 value={enteredValue}
//                 onChange={valueChangeHandler}
//               />
//             </div>

//             <div className="form-control">
//               <label htmlFor="date">date</label>
//               <input
//                 type="date"
//                 name="date"
//                 id="date"
//                 value={enteredDate}
//                 onChange={dateChangeHandler}
//               />
//             </div>
//           </div>

//           <div className="form-control">
//             <label htmlFor="description">*description (optional)</label>
//             <textarea
//               name="comment"
//               id="comment"
//               rows="5"
//               value={enteredDescription}
//               onChange={descriptionChangeHandler}
//             ></textarea>
//           </div>

//           <div className="modal-footer">
//             <button className="btn btn-decline" type="submit">
//               Decline
//             </button>
//             <button className="btn btn-save" type="submit">
//               Save
//             </button>
//           </div>

//           <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
//           <input type="hidden" name="type" value="<%= type %>" />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;
