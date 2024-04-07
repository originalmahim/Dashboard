import  { Fragment, useEffect, useState } from "react";
import moment from "moment";
import {
  Menu,
  Transition,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addMonths } from "date-fns";
import toast from "react-hot-toast";

const filtersOptions = [
  { name: "All Orders", href: "#" },
  { name: "Shipped", href: "#" },
  { name: "Pending", href: "#" },
  { name: "Cancelled", href: "#" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Newlayout = () => {
  const [date] = useState(moment().format().split("T")[0]);
  const [allData, setAllData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  // const [allOrders, setAllOrders] = useState();
  const [filterOption, setFilterOption] = useState("All Orders");
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  const [selected, setSelected] = useState(today);
  const formattedDate = moment(selected).format("YYYY-MM-DD");

  const [selectCalender, setSelectCelender] = useState(false);

  const [WebData,setWebData] = useState([]);


  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await fetch(
          `https://andalib-server-mauve.vercel.app/orders/${formattedDate}`
        );
        const result1 = await response1.json();

        setSelectCelender(false);
        setAllData(result1);
        setFilterData(result1);
        setDataUpdated(false);
      } catch (error) {
        console.error("Error fetching data1:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response2 = await fetch(
          `https://andalib-server-mauve.vercel.app/orders`
        );
        const result2 = await response2.json();
        setWebData(result2)
        
      } catch (error) {
        console.error("Error fetching data2:", error);
      }
    };
    // Call both fetchData functions
    fetchData1();
    fetchData2();
  }, [selected, dataUpdated, formattedDate]);

  const orderDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://andalib-server-mauve.vercel.app/deleteorder/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        setDataUpdated(true);
        toast.error("অর্ডারটি ডিলিট করা হয়েছে!");
      } else {
        console.error("Failed to Delete Order:", await response.text());
      }
    } catch (error) {
      console.error("Error on Deleting order:", error);
    }
  };
  const handleStatusCancelled = async (_id) => {
    try {
      const response = await fetch(
        `https://andalib-server-mauve.vercel.app/cancelled/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setDataUpdated(true);
        toast.error("অর্ডারটি ক্যান্সেল করা হয়েছে!");
      } else {
        console.error("Failed to updade status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFilter = (item) => {
    setFilterOption(item);
    if (item === "All Orders") {
      setFilterData(allData);
    } else {
      setFilterData(allData.filter((d) => d.status === item));
    }
  };
  


  return (
    <div className=" bg-white dark:bg-black">
      
        <div className="pt-20">
          <h3 className="text-xl font-bold text-slate-600 dark:text-white">Daily Summary</h3>
          <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-5">
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-pink-200 ring-1 bg-pink-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-pink-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shopping-cart stroke-pink-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Orders
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {filterData.length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-green-200 ring-1 bg-green-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-green-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle-check stroke-green-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Completed
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {filterData.filter((d) => d.status === "Shipped").length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-amber-200 ring-1 bg-amber-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-amber-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-alert-triangle stroke-amber-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 9v4" />
                  <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Pending
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {filterData.filter((d) => d.status === "Pending").length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-slate-200 ring-1 bg-slate-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-slate-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-playstation-x stroke-slate-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                  <path d="M8.5 8.5l7 7" />
                  <path d="M8.5 15.5l7 -7" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Cancelled
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {filterData.filter((d) => d.status === "Cancelled").length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-indigo-200 ring-1 bg-indigo-50/50 dark:bg-transparent ">
              <div className="absolute rounded-md bg-indigo-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-currency-dollar stroke-indigo-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                  <path d="M12 3v3m0 12v3" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Sales
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {`${filterData
                    .filter((d) => d.status !== "Cancelled")
                    .reduce((acc, item) => acc + item.totalPrice, 0)
                    .toFixed(2)} tk`}
                </p>
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-8 py-8 flex items-center justify-between gap-4 w-full">
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setSelectCelender(!selectCalender)}
                className={`text-slate-600 dark:text-white ring-green-600/20 inline-flex items-center rounded-lg py-2 px-3 border-0 border-slate-300  text-left text-sm font-medium  ring-1 ring-inset ring-slate-300 dark:ring-blue-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 gap-2`}
              >
                {formattedDate === date ? "Today" : formattedDate}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-calendar text-blue-500"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M4 11h16" />
                  <path d="M11 15h1" />
                  <path d="M12 15v3" />
                </svg>
              </button>
              <div
                className={`absolute left-0 z-50 mt-2 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-slate-200 focus:outline-none transform opacity-100 scale-100 ${
                  selectCalender ? "block" : "hidden"
                }`}
              >
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  className="text-slate-400"
                  month={month}
                  onMonthChange={setMonth}
                  captionLayout="dropdown-buttons"
                  fromYear={2023}
                  toYear={2034}
                />
              </div>
            </div>
            <Link
              to={"/createOrder"}
              className={`py-2 px-3 rounded-lg bg-slate-500 hover:bg-slate-600 active:bg-slate-700 ease-in duration-75 text-sm font-semibold text-white hover:text-white flex items-center gap-2`}
            >
              Create
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon text-green-400 icon-tabler icon-tabler-circle-plus"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </Link>
          </div>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex justify-center w-full rounded-lg py-2 px-3 border-0 border-slate-300 text-left text-sm font-medium text-slate-600 dark:text-white ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 gap-2">
                {filterOption}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-filter-cog text-red-500 dark:text-yellow-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 20l-3 1v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v1.5" />
                  <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M19.001 15.5v1.5" />
                  <path d="M19.001 21v1.5" />
                  <path d="M22.032 17.25l-1.299 .75" />
                  <path d="M17.27 20l-1.3 .75" />
                  <path d="M15.97 17.25l1.3 .75" />
                  <path d="M20.733 20l1.3 .75" />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-left rounded-md text bg-white shadow-2xl ring-1 ring-slate-200 focus:outline-none">
                <div className="py-1">
                  {filtersOptions.map((option) => (
                    <Menu.Item key={option}>
                      {({ active }) => (
                        <button
                          onClick={() => handleFilter(option.name)}
                          className={classNames(
                            active
                              ? "bg-slate-100 w-full text-start  text-slate-600"
                              : "font-medium",
                            "block px-4 py-2 text-sm text-slate-400 font-normal"
                          )}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white sm:pl-3"
                    >
                      SL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white"
                    >
                      Invoice
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white"
                    >
                      Mobile
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-white"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-black">
                  {filterData.map((person, personIdx) => (
                    <tr
                      key={person._id}
                      className={
                        personIdx % 2 === 0 ? undefined : "bg-slate-50 dark:bg-black"
                      }
                    >
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-slate-400  sm:pl-3">
                        {personIdx + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm font-medium text-slate-400">
                        <Link
                          to={`/dashboard/invoice/${person._id}`}
          
                          className="hover:text-green-500 active:text-green-600 ease-in duration-75"
                        >
                          {person?.invoice || person._id}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-500">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset  ${
                            person.status === "Pending"
                              ? "text-amber-500 bg-amber-50 dark:bg-black ring-amber-600/20"
                              : person.status === "Shipped"
                              ? "text-green-500 dark:bg-black bg-green-50 ring-green-600/20"
                              : "text-slate-500 dark:bg-black bg-slate-50 ring-slate-600/20"
                          }`}
                        >
                          {person.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-400">
                        <Link
                          to={`/dashboard/invoice/${person._id}`}
          
                          className="hover:text-green-500 active:text-green-600 ease-in duration-75"
                        >
                          {person.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-400">
                        {person.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-400">
                        {person.date};
                        <span>{person?.time && " " + person?.time}</span>
                      </td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 h-10">
                        <div className="flex gap-2">
                          <Link
                            to={`/dashboard/invoice/${person._id}`}
            
                            className="py-1.5 px-1.5 rounded-md bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600 ease-in duration-75 font-semibold text-white hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-eye"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                            </svg>
                          </Link>

                          <Link
                            to={`/editOrder/${person._id}`}
            
                            className="py-1.5 px-1.5 rounded-md bg-blue-400 hover:bg-blue-500 active:bg-blue-600 ease-in duration-75 font-semibold text-white hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-edit"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                              <path d="M16 5l3 3" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleStatusCancelled(person._id)}
                            className="py-1.5 px-1.5 rounded-md bg-slate-400 hover:bg-slate-500 active:bg-slate-600 ease-in duration-75 font-semibold text-white hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-playstation-x"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                              <path d="M8.5 8.5l7 7" />
                              <path d="M8.5 15.5l7 -7" />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              document.getElementById(person._id).showModal()
                            }
                            className="py-1.5 px-1.5 rounded-md bg-red-400 hover:bg-red-500 active:bg-red-600 ease-in duration-75 font-semibold text-white hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-trash"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 7l16 0" />
                              <path d="M10 11l0 6" />
                              <path d="M14 11l0 6" />
                              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                          </button>

                          <dialog id={person._id} className="modal bg-white dark:bg-black dark:text-white text-black">
                            <div className="modal-box text-left max-w-md overflow-hidden m-6">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-x"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                  </svg>
                                </button>
                              </form>
                              <div className="font-bold text-lg text-left flex items-center gap-2 text-slate-600">
                                {" "}
                                <span className="bg-red-100  rounded-full p-1.5 text-red-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-alert-triangle "
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M12 9v4" />
                                    <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                                    <path d="M12 16h.01" />
                                  </svg>
                                </span>{" "}
                                Delete Order?{" "}
                              </div>
                              <p className="py-4 hidden md:block text-slate-400 font-normal max-w-sm  text-sm">
                                Are you sure you want to delete this order ? All
                                 data for this <br /> order will be permanently removed.
                              </p>
                              <p className="py-4 block md:hidden text-slate-400 font-normal max-w-sm  text-sm">
                                Are you sure you want to delete this order? All
                                of your <br /> data of this order will be
                                permanently removed. <br /> This action cannot
                                be undone.
                              </p>
                              <button
                                onClick={() => orderDelete(person?._id)}
                                className={`gap-2 py-2 px-3 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 ease-in duration-75 font-semibold inline-flex text-white hover:text-white align-right $`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-circle-check"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                  <path d="M9 12l2 2l4 -4" />
                                </svg>
                                Yes I Understand
                              </button>
                            </div>
                          </dialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filterData.length === 0 && (
                <div className="font-light text-slate-400 text-sm italic text-center w-full mx-auto">
                  <div className="px-3 py-4 border-t  border-slate-200 dark:text-yellow-400">
                    No orders found for this date!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20">
          <h3 className="text-xl font-bold text-slate-600 dark:text-white">Website Summary</h3>
          <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-5">
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-pink-200 ring-1 bg-pink-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-pink-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shopping-cart stroke-pink-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Orders
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {WebData.length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-green-200 ring-1 bg-green-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-green-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle-check stroke-green-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Completed
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {WebData.filter((d) => d.status === "Shipped").length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-amber-200 ring-1 bg-amber-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-amber-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-alert-triangle stroke-amber-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 9v4" />
                  <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Pending
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {WebData.filter((d) => d.status === "Pending").length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-slate-200 ring-1 bg-slate-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-slate-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-playstation-x stroke-slate-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                  <path d="M8.5 8.5l7 7" />
                  <path d="M8.5 15.5l7 -7" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Cancelled
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {WebData.filter((d) => d.status === "Cancelled").length}
                </p>
              </dd>
            </div>
            <div className="overflow-hidden p-3 rounded-lg ring-inset ring-indigo-200 ring-1 bg-indigo-50/50 dark:bg-transparent">
              <div className="absolute rounded-md bg-indigo-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-currency-dollar stroke-indigo-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                  <path d="M12 3v3m0 12v3" />
                </svg>
              </div>
              <dt className="ml-14 truncate text-sm font-medium text-slate-400 dark:text-white">
                Sales
              </dt>
              <dd className="ml-14 flex items-baseline -mt-1">
                <p className="text-2xl truncate font-semibold text-slate-600 dark:text-white">
                  {`${WebData
                    .filter((d) => d.status !== "Cancelled")
                    .reduce((acc, item) => acc + item.totalPrice, 0)
                    .toFixed(2)} tk`}
                </p>
              </dd>
            </div>
          </dl>
        </div>
    </div>
  );
};

export default Newlayout;