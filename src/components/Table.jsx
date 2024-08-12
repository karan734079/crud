import { useEffect, useState } from "react";
import employeeData from "../utils/employeeData";

const Table = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState([]);
  const [age, setAge] = useState(null);
  const [profile, setProfile] = useState([]);
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    setData(employeeData);
  }, []);

  const handleEdit = (id) => {
    const editItem = data.filter(item => item.id === id);
    if (editItem !== undefined) {
      setUpdate(true);
      setId(id);
      setName(editItem[0].name);
      setAge(editItem[0].age);
      setProfile(editItem[0].profile);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("You want to Delete this item?")) {
        const deleteItem = data.filter((item) => {
          return item.id !== id;
        });
        setData(deleteItem);
      }
    }
  };

  const handleClear = () => {
    setId([]);
    setName("");
    setAge([]);
    setProfile("");
    setUpdate(false);
  };

  const handleUpdate = () => {
    const indx = data.map((item) => {
      return item.id
    }).indexOf(id);

    const dt = [...data];

    dt[indx].name = name;
    dt[indx].age = age;
    dt[indx].profile = profile;

    setData(dt);
    handleClear();
  };

  const handleSave = (e) => {
    e.preventDefault();

    const dt = [...data];

    const newObject = {
      id: employeeData.length + 1,
      name: name,
      age: age,
      profile: profile,
    }

    dt.push(newObject);

    setData(dt);
  };

  return (
    <div className="w-full px-4 py-8 mx-auto">
      <h1 className="text-4xl text-gray-700 font-bold mb-4 text-center">
        Basic CRUD Operations
      </h1>
      <div className="flex flex-col space-y-4 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Enter Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Enter Profile"
            onChange={(e) => setProfile(e.target.value)}
            value={profile}
            className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => handleClear()}
          >
            Clear
          </button>
          {!isUpdate ? (
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={(e) => handleSave(e)}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">SR No.</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800" key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.age}</td>
                  <td className="px-4 py-2">{item.profile}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
