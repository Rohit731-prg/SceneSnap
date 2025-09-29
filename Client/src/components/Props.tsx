// import { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import usePropsStore from "../store/propsStore";
// import type { propStr } from "../store/propsStore";
// import { IoIosCloseCircle } from "react-icons/io";

function Props() {
  // const [model, setModel] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const props = usePropsStore((state) => state.props);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await usePropsStore.getState().getAllProps();
  //   }
  //   fetchData();
  // }, []);

  // const [prop, setProp] = useState({
  //   name: "",
  //   description: "",
  //   image: '',
  // });

  // const handelChange = async (id: string, type: string, data: propStr) => {
  //   if (type === 'delete') {
  //     await usePropsStore.getState().deleteProp(id);
  //   } else {
  //     setProp({
  //       name: data.name,
  //       description: data.description,
  //       image: data.image,
  //     })
  //     setEdit(true);
  //   }
  // };

  // const convertImageToBase64 = async (e: any) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     if (typeof reader.result === 'string') {
  //       setProp({ ...prop, image: reader.result });
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // };

  // const handelSubmit = async (e: any) => {
  //   e.preventDefault();

  //   await usePropsStore.getState().createProps(prop);
  // }

  // const handelEdit = async (e: any) => {
  //   e.preventDefault();
  // }

  return (
    <main className="min-h-screen bg-slate-800 w-full py-10 px-8 border-l border-slate-500 overflow-auto">
      
    </main>
  );
}

export default Props;
