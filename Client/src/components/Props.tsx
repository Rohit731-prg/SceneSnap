import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import usePropsStore from "../store/propsStore";
import type { propStr } from "../store/propsStore";
import { IoIosCloseCircle } from "react-icons/io";

function Props() {
  const [model, setModel] = useState(false);
  const [edit, setEdit] = useState(false);
  const props = usePropsStore((state) => state.props);

  useEffect(() => {
    const fetchData = async () => {
      await usePropsStore.getState().getAllProps();
    }
    fetchData();
  }, []);

  const [prop, setProp] = useState({
    name: "",
    description: "",
    image: '',
  });

  const handelChange = async (id: string, type: string, data: propStr) => {
    if (type === 'delete') {
      await usePropsStore.getState().deleteProp(id);
    } else {
      setProp({
        name: data.name,
        description: data.description,
        image: data.image,
      })
      setEdit(true);
    }
  };

  const convertImageToBase64 = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProp({ ...prop, image: reader.result });
      }
    };

    reader.readAsDataURL(file);
  };

  const handelSubmit = async (e: any) => {
    e.preventDefault();

    await usePropsStore.getState().createProps(prop);
  }

  const handelEdit = async (e: any) => {
    e.preventDefault();
  }

  return (
    <main className="min-h-screen bg-slate-800 w-full py-10 px-8 border-l border-slate-500 overflow-auto">
      {model && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg bg-slate-900 text-white p-6 rounded-xl shadow-2xl border border-slate-700">
            <button
              onClick={() => setModel(false)}
              className="absolute top-3 right-3 text-2xl text-red-400 hover:text-red-500"
            >
              <IoIosCloseCircle />
            </button>

            <form className="space-y-4 mt-6" onSubmit={handelSubmit}>
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  placeholder="Enter Name here..."
                  onChange={(e) => setProp({ ...prop, name: e.target.value })}
                  value={prop.name}
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  placeholder="Write description here..."
                  onChange={(e) => setProp({ ...prop, description: e.target.value })}
                  value={prop.description}
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-600 outline-none resize-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <label htmlFor="file" className="block cursor-pointer">
                {prop.image ? (
                  <img
                    src={prop.image}
                    alt=""
                    className="h-32 w-full object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 bg-slate-700 rounded-md border border-slate-600">
                    <p className="text-slate-400">Upload Image</p>
                  </div>
                )}
                <input
                  id="file"
                  onChange={convertImageToBase64}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                className="w-full py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {edit && (
        <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg bg-slate-900 text-white p-6 rounded-xl shadow-2xl border border-slate-700">
            <button
              onClick={() => setEdit(false)}
              className="absolute top-3 right-3 text-2xl text-red-400 hover:text-red-500"
            >
              <IoIosCloseCircle />
            </button>
          </div>

          <form className="space-y-4 mt-6" onSubmit={handelEdit}>
            <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  placeholder="Enter Name here..."
                  onChange={(e) => setProp({ ...prop, name: e.target.value })}
                  value={prop.name}
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-600 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  placeholder="Write description here..."
                  onChange={(e) => setProp({ ...prop, description: e.target.value })}
                  value={prop.description}
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-600 outline-none resize-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <label htmlFor="file" className="block cursor-pointer">
                {prop.image ? (
                  <img
                    src={prop.image}
                    alt=""
                    className="h-32 w-full object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 bg-slate-700 rounded-md border border-slate-600">
                    <p className="text-slate-400">Upload Image</p>
                  </div>
                )}
                <input
                  id="file"
                  onChange={convertImageToBase64}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                className="w-full py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold"
              >
                Save Edit
              </button>
          </form>
        </main>
      )}


      <div className="flex flex-row items-center justify-between text-white font-tertiary">
        <h1 className="text-4xl font-medium">Props Management</h1>
        <button
          onClick={() => setModel(true)}
          className="px-10 py-2 bg-slate-500 rounded-lg font-primary active:bg-slate-600 cursor-pointer"
        >
          Add New Prop
        </button>
      </div>

      <div className="flex flex-row px-5 items-center bg-slate-400 font-primary gap-5 rounded-lg mt-18">
        <FaSearch />
        <input
          placeholder="Search User by Name..."
          className="py-2 w-full border-none outline-none"
          type="text"
        />
      </div>

      <h1 className="text-xl font-semibold text-white mt-10">Props Management</h1>
      <p className="text-lg font-primary text-slate-400">
        Manage all film props like cameras, costumes, and more — add, update, or track availability easily.
      </p>

      <section className="mt-10 rounded-xl border border-slate-600 shadow-xl overflow-hidden max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {props && props.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="sticky top-0 bg-slate-900 text-slate-200 z-10">
              <tr>
                <th className="px-6 py-4 w-1/6">Image</th>
                <th className="px-6 py-4 w-1/6">Name</th>
                <th className="px-6 py-4 w-2/6">Description</th>
                <th className="px-6 py-4 w-1/6">Availability</th>
                <th className="px-6 py-4 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {props.map((prop: propStr) => (
                <tr key={prop._id} className="hover:bg-slate-700 transition-all duration-200">
                  <td className="px-6 py-4">
                    <img
                      src={prop.image}
                      alt={prop.name}
                      className="h-12 w-12 object-cover rounded-full border border-slate-500"
                    />
                  </td>
                  <td className="px-6 py-4">{prop.name}</td>
                  <td className="px-6 py-4">{prop.description.length > 100 ? prop.description.slice(0, 100) + "..." : prop.description}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${prop.isAvailable
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                        }`}
                    >
                      {prop.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-row gap-5">
                    <button className="px-5 py-2 bg-blue-400 rounded-full font-semibold cursor-pointer hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      onClick={() => handelChange(prop._id, 'delete', prop)}
                      className="px-5 py-2 bg-red-400 rounded-full font-semibold text-black cursor-pointer hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-10 text-center text-white text-lg">No props found</div>
        )}
      </section>

    </main>
  );
}

export default Props;
