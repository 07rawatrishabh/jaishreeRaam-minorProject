import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import DeleteIcon from '@mui/icons-material/Delete';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { purple } from "@mui/material/colors";

function Cards({ classes, deleteClass, setClasses ,color}) {
  const handleDelete = (class_id, creatorUid) => {
    deleteClass(class_id, creatorUid, classes, setClasses);
  };
  console.log(color);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {classes.map((classData) => (
        <div key={classData.id} className={"border border-gray-300 rounded-md p-4 rounded-lg  " + color}>
          {/* Render the content of each card here */}
          <h2 className="text-lg font-semibold bg-slate-700 rounded-lg flex justify-center text-white">{classData.name}</h2>
          <table class="table-auto">
    <tr>
        <td class="px-4 py-2">Subject</td>
        <td class="px-4 py-2">: {classData.subjectName}</td>
    </tr>
    <tr>
        <td class="px-4 py-2">Year</td>
        <td class="px-4 py-2">: {classData.year}</td>
    </tr>
    <tr>
        <td class="px-4 py-2">Semester</td>
        <td class="px-4 py-2">: {classData.semester}</td>
    </tr>
    <tr>
        <td class="px-4 py-2">Section</td>
        <td class="px-4 py-2">: {classData.section}</td>
    </tr>
</table>

          
          <div className="flex  justify-between">
            <Link to={`/Home/ClassRoom/${classData.id}`}>
              <button className="text-white m-1 bg-slate-700 border rounded-full border-slate-700 p-1">
                <CoPresentIcon />
              </button>
            </Link>
            <button className="text-white m-1 bg-slate-700 border rounded-full border-slate-700 p-1" onClick={() => handleDelete(classData.id, classData.creatorUid)}>
              <DeleteIcon />
            </button>
          </div>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
}

export default Cards;
