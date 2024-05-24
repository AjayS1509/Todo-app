"use client";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import Overlay from "../overlay/Overlay";
import useDebounce from "../useDebounce";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cross from "../icons/Cross";
import useDeviceType from "../useDeviceType";

export default function TodoCard() {
  const [data, setData] = useState([]);
  //const isMobile = useDeviceType();
  const state = {
    loading: true,
    overlayCall: false,
    userId: "",
    title: "",
    checked: false,
    searchValue: "",
  };
  const [visability, setVisability] = useState(state);
  const debounceSearchValue = useDebounce(visability.searchValue, 1000);
  const orignalData = useRef(null);

  useEffect(() => {
    const callAPI = async () => {
      const call = await fetch("https://jsonplaceholder.typicode.com/todos");
      const res = await call.json();
      if (res && res.length != 0) {
        setData(res),
          (orignalData.current = res),
          setVisability((prev) => ({ ...prev, loading: false }));
      }
    };
    callAPI();
  }, []);

  useEffect(() => {
    if (
      (debounceSearchValue && debounceSearchValue.length != 0,
      orignalData.current != null)
    ) {
      const filtered = orignalData.current.filter((todo) =>
        todo.title.toLowerCase().includes(debounceSearchValue.toLowerCase())
      );
      setData([...filtered]);
    }
    // if (
    //   orignalData.current != null &&
    //   debounceSearchValue == 0 &&
    //   data.length != orignalData.current.length
    // ) {
    //   console.log("caa");
    //   setData(orignalData.current);
    // }
  }, [debounceSearchValue]);

  const handleDelete = (item) => {
    const filterData = data.filter((f) => f.id != item.id);
    setData([...filterData]);
  };

  const handleCheckboxChange = (event) => {
    setVisability((prev) => ({ ...prev, checked: event.target.checked }));
  };

  function handleAddData(e) {
    e.preventDefault();
    if (visability.userId.length != 0 && visability.title.length != 0) {
      const last_data = data[data.length - 1];
      let obj = {
        userId: visability.userId,
        id: Number(last_data.id + 1),
        title: visability.title,
        completed: visability.checked,
      };
      setData((d) => [...d, obj]);
      setVisability((prev) => ({
        ...prev,
        overlayCall: false,
        userId: "",
        title: "",
        checked: false,
      }));
    }
  }

  if (visability.loading)
    return (
      <>
        <div className="text-center max-w-fit mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Skeleton height={30} width={150} />
            <Skeleton height={30} width={150} />
          </div>
          <br />
          <Skeleton height={35} width={400} className="mb-3" />
          <Skeleton height={30} width={400} count={10} className="mb-1" />
        </div>
      </>
    );

  return (
    <>
      {visability.overlayCall && (
        <Overlay>
          <div className=" w-fit inset-auto z-0 bg-white shadow-slate-300 overflow-x-hidden overflow-y-auto p-4 rounded-xl">
            <span
              className="flex justify-end cursor-pointer"
              onClick={() =>
                setVisability((prev) => ({
                  ...prev,
                  overlayCall: false,
                  userId: "",
                  title: "",
                  checked: false,
                }))
              }
            >
              <Cross />
            </span>
            <h4 className=" text-center text-lg font-semibold">Add Data</h4>
            <form action="" onSubmit={handleAddData}>
              <input
                type="number"
                placeholder="userId"
                value={visability.userId}
                onChange={(e) =>
                  setVisability((prev) => ({ ...prev, userId: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="title"
                value={visability.title}
                onChange={(e) =>
                  setVisability((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <label className=" text-sm flex gap-1 mb-2">
                completed:
                <input
                  type="checkbox"
                  checked={visability.checked}
                  onChange={handleCheckboxChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        </Overlay>
      )}

      <div className="mb-4 flex justify-center h-11 items-center">
        <div>
          <input
            type="text"
            placeholder="Search"
            value={visability.searchValue}
            onChange={(e) =>
              setVisability((prev) => ({
                ...prev,
                searchValue: e.target.value,
              }))
            }
            className=" w-10"
          />
        </div>
        &nbsp;
        <button
          className="w-32"
          onClick={() =>
            setVisability((prev) => ({ ...prev, overlayCall: true }))
          }
        >
          Add Data
        </button>
      </div>

      <div className="mx-2 my-auto max-w-fit border rounded-lg text-sm h-[80vh] overflow-auto lg:m-auto lg:h-[73vh]">
        <table className="m-auto">
          <thead>
            <tr className=" border-b-[1px] rounded-lg overflow-hidden">
              <th className="px-3 py-2 lg:px-4">Id</th>
              <th className="px-3 py-2 lg:px-4">userId</th>
              <th className="px-3 py-2 lg:px-4">title</th>
              <th className="px-3 py-2 lg:px-4">completed</th>
              <th className="px-3 py-2 lg:px-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.length == 0 ? (
              <tr>
                <td></td>
                <td></td>
                <td className=" text-red-400 pt-6">No data found !!</td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={i} className=" border-b-[1px]">
                  <td className="px-3 py-2 text-center lg:px-4">{item.id}</td>
                  <td className="px-3 py-2 lg:px-4">{item.userId}</td>
                  <td className="px-3 py-2 lg:px-4">{item.title}</td>
                  <td className="px-3 py-2 text-center lg:px-4">
                    {String(item.completed)}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleDelete(item)}
                  >
                    <DeleteIcon />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
