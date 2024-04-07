import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import logo from './../DashImage/logo/andalib.png'
import  { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Helmet } from "react-helmet";


const Invoice = () => {
          const componentRef = useRef();
          const singleItem = useLoaderData()
  const handleStatusShipped = async (_id) => {
    try {
      const response = await fetch(
        // `https://andalib-server-mauve.vercel.app/update/${_id}`,
        `https://andalib-server-mauve.vercel.app/delivered/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("অর্ডারটি শিপ করা হয়েছে!");
      } else {
        console.error("Failed to updade status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleStatusPending = async (_id) => {
    try {
      const response = await fetch(
        // `https://andalib-server-mauve.vercel.app/update/${_id}`,
        `https://andalib-server-mauve.vercel.app/pending/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
          toast.success("অর্ডারটি পেন্ডিং মার্কড হয়েছে!");
      } else {
        console.error("Failed to updade status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePrint = useReactToPrint({
          content: () => componentRef.current,
        });
      

  const subTotalPrice = singleItem?.food?.reduce((sum, item) => {
    const productPrice = ((item.price /
    (item.weight === "১ কেজি" ? 1000 : 500)) *
    item?.weightInGram * item?.quantity);
    return sum + productPrice;
  }, 0);

  const discountAmount = singleItem?.discount ? singleItem?.discount : 0;
  const advanceAmount = singleItem?.advance ? singleItem?.advance : 0;
  const grandTotal =
    singleItem?.deliveryCharge + subTotalPrice - advanceAmount - discountAmount;

  return (
    <div className="w-full bg-white dark:bg-black">
        <>
          <Helmet>
            <title>
              Invoice # {`${singleItem?.invoice || singleItem?._id}`}
            </title>
          </Helmet>

          <div className="bg-white dark:bg-black mx-auto max-w-7xl my-4" >
          <div ref={componentRef}>
              <div className="py-8 ring-0 ring-black dark:ring-yellow-400 sm:ring-1 sm:ring-inset sm:mx-0 sm:rounded-lg sm:p-8 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:p-16">
                <nav
                  className={`mx-auto flex items-center justify-between gap-x-6 `}
                  aria-label="Global"
                >
                  <div className="flex">
                    <a
                      href="/orders"
                      className="-m-1.5 p-1.5 flex items-center gap-2 cursor-pointer"
                    >
                      <img
                        className="block h-8 w-auto"
                        src="/media/icon/ecoeats-icon.svg"
                        alt=""
                      />
                      <div >
                    <img className="w-40" src={logo}  />
                      </div>
                    </a>
                  </div>
                  
                </nav>
                <div className="flex justify-between">
                  <div className="mt-8 flex-1">
                    <dt className="inline text-base font-semibold text-slate-600 dark:text-blue-500">
                      Invoice #
                    </dt>{" "}
                    <dd className="inline text-sm font-semibold text-slate-400 dark:text-white">
                      <time dateTime="2023-31-01">
                        {singleItem?.invoice || singleItem?._id}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-8 flex-1 ml-8">
                    <dt className="inline text-base font-semibold text-slate-600 dark:text-blue-500">
                      Date:
                    </dt>{" "}
                    <dd className="inline text-sm font-semibold text-slate-400 dark:text-white">
                      <time dateTime="2023-31-01">
                        {singleItem?.date} {" "}
                        {singleItem?.time && " " + singleItem?.time}
                      </time>
                    </dd>
                  </div>
                </div>
                <dl className="grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                  <div className="mt-6 border-t border-slate-200 pt-6 sm:pr-4">
                    <dt className="font-semibold text-slate-400 dark:text-blue-500">From</dt>
                    <dd className="mt-2">
                      <span className="font-medium text-black dark:text-white">
                        Andalib
                      </span>
                      <br />
                      <span className="font-medium text-slate-600 dark:text-white">
                        Signboard, Jatrabari, Dhaka-1200
                      </span>
                      <br />
                      <span className="font-medium text-slate-600 dark:text-white">
                        01585753020
                      </span>
                    </dd>
                  </div>
                  <div className="mt-8 sm:mt-6 sm:border-t sm:border-slate-200 sm:pl-4 sm:pt-6">
                    <dt className="font-semibold text-slate-400 dark:text-blue-500 ">To</dt>
                    <dd className="mt-2">
                      <span className="font-medium text-slate-800 dark:text-white">
                        {singleItem?.name}
                      </span>
                      <br />
                      <span className="font-medium text-slate-800 dark:text-white">
                        {singleItem?.address}
                      </span>
                      <br />
                      <span className=" text-black font-medium dark:text-white">
                        {singleItem?.phone}
                      </span>
                    </dd>
                  </div>
                </dl>
                <table className="mt-10 w-full whitespace-nowrap text-left text-sm text-slate-600">
                  <colgroup>
                    <col />
                    <col className="w-full" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="text-slate-400 border-b border-slate-200 uppercase tracking-wide">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-0 pr-2 font-semibold text-xs dark:text-blue-500"
                      >
                        SL
                      </th>
                      <th
                        scope="col"
                        className="py-3 pl-0 pr-2 font-semibold text-xs dark:text-blue-500"
                      >
                        Ordered Items
                      </th>

                      <th
                        scope="col"
                        className="py-3 pl-8 pr-0 text-right font-semibold text-xs table-cell dark:text-blue-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3 pl-8 pr-0 text-right font-semibold text-xs table-cell dark:text-blue-500"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="py-3 pl-8 pr-0 text-right font-semibold text-xs dark:text-blue-500"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleItem &&
                      singleItem?.food.map((item, i) => (
                        <tr key={item.id} className="border-y border-slate-100">
                          <td className="max-w-0 pr-2 px-0 py-4 align-top dark:text-white">
                            {i + 1}
                          </td>
                          <td className="max-w-0 pr-2 px-0 py-4 align-top">
                            <div className="font-medium text-slate-600 dark:text-white">
                              {item.title}
                            </div>
                            <div className="text-slate-400 font-light flex items-center gap-1 dark:text-white">
                              {`${item?.weightInGram} g`}
                            </div>
                          </td>
                          <td className="py-4 pl-8 pr-0 text-right align-top tabular-nums text-slate-600 table-cell dark:text-white">
                            {item.price} tk
                          </td>
                          <td className="py-4 pl-8 pr-0 text-right align-top tabular-nums text-slate-600 table-cell dark:text-white">
                            {item.quantity}
                          </td>
                          <td className="py-4 pl-8 pr-0 text-right align-top tabular-nums text-slate-600 dark:text-white">
                          {((item.price /
                                (item.weight === "১ কেজি" ? 1000 : 500)) *
                                item?.weightInGram * item?.quantity).toFixed(0)}{" "}
                            tk
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot className="px-0">
                    <tr>
                      <th
                        scope="row"
                        colSpan={4}
                        className="px-0 pb-0 pt-4 text-slate-400 sm:hidden text-xs font-semibold dark:text-white uppercase"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        colSpan={4}
                        className="hidden px-0 pb-0 pt-4 text-right font-semibold text-slate-400 sm:table-cell text-xs uppercase dark:text-white"
                      >
                        Subtotal
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-slate-600 dark:text-white">
                        {subTotalPrice?.toFixed(0)} tk
                      </td>
                    </tr>
                    {singleItem?.advance && (
                      <tr>
                        <th
                          scope="row"
                          colSpan={4}
                          className="px-0 pb-0 pt-4 text-slate-400 sm:hidden text-xs font-semibold dark:text-white uppercase"
                        >
                          Advance
                        </th>
                        <th
                          scope="row"
                          colSpan={4}
                          className="hidden px-0 pb-0 pt-4 text-right font-semibold text-slate-400 sm:table-cell text-xs uppercase dark:text-white"
                        >
                          Advance
                        </th>
                        <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-slate-600 dark:text-white">
                          -{singleItem?.advance?.toFixed(0)} tk
                        </td>
                      </tr>
                    )}

                    {singleItem?.discount && (
                      <tr>
                        <th
                          scope="row"
                          colSpan={4}
                          className="px-0 pb-0 pt-4 text-slate-400 sm:hidden text-xs font-semibold uppercase"
                        >
                          Discount
                        </th>
                        <th
                          scope="row"
                          colSpan={4}
                          className="hidden px-0 pb-0 pt-4 text-right font-semibold text-slate-400 sm:table-cell text-xs uppercase dark:text-white"
                        >
                          Discount
                        </th>
                        <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-slate-600 dark:text-white">
                          -{singleItem?.discount?.toFixed(0)} tk
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th
                        scope="row"
                        colSpan={4}
                        className="pt-4 font-semibold text-slate-400 sm:hidden text-xs uppercase dark:text-white"
                      >
                        Delivery
                      </th>
                      <th
                        scope="row"
                        colSpan={4}
                        className="hidden pt-4 text-right font-semibold text-slate-400 sm:table-cell text-xs uppercase dark:text-white"
                      >
                        Delivery
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-slate-600 dark:text-white">
                        {singleItem?.deliveryCharge?.toFixed(0)} tk
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan={4}
                        className="px-0 py-4 text-slate-400 sm:hidden text-xs font-semibold uppercase dark:text-white"
                      >
                        COD Charge 1%
                      </th>
                      <th
                        scope="row"
                        colSpan={4}
                        className="hidden px-0 py-4 text-right font-semibold text-slate-400 sm:table-cell text-xs uppercase dark:text-white"
                      >
                        COD Charge 1%
                      </th>
                      <td className="pl-8 pr-0 py-4 text-right tabular-nums text-slate-600 dark:text-white">
                        {(grandTotal * 0.01).toFixed(0)} tk
                      </td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <th
                        scope="row"
                        colSpan={4}
                        className="pt-4 font-semibold text-slate-600 sm:hidden text-xs uppercase  "
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        colSpan={4}
                        className="hidden pt-4 text-right font-semibold text-slate-600 sm:table-cell text-xs uppercase dark:text-white"
                      >
                        Total
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-slate-600 dark:text-white">
                        {(grandTotal + grandTotal * 0.01)?.toFixed(0)} tk
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="font-bold text-slate-400 text-xs italic mt-4 md:mt-2 text-center dark:text-blue-500">
                  Thank you for shopping with us. Please contact our helpline or
                  chat with us for any issues. Have a nice day.
                </div>
              </div>
            </div>
            <div className="flex flex-1 lg:flex items-center justify-center gap-2 ">
                    <button
                      onClick={() => handleStatusShipped(singleItem?._id)}
                      className={`float-right py-2 px-2 rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 ease-in duration-75 text-sm font-semibold text-white hover:text-white flex items-center printButton gap-2 ${
                        singleItem?.status === "Pending" ? '' : 'hidden'
                      }`}
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
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l2 2l4 -4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleStatusPending(singleItem._id)}
                      className={`float-right py-2 px-2 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-700 ease-in duration-75 text-sm font-semibold text-white hover:text-white flex items-center printButton gap-2 ${
                              singleItem?.status === "Pending" ? 'hidden' : ''
                            }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-alert-triangle printButton"
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
                        <path d="M12 9v4" />
                        <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
                        <path d="M12 16h.01" />
                      </svg>
                    </button>
                    <Link
                      to={`/editOrder/${singleItem?._id}`}
                      className={`float-right py-2 px-2 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 ease-in duration-75 text-sm font-semibold text-white hover:text-white flex items-center printButton gap-2 ${
                        singleItem?.status === "Pending" ||
                        singleItem?.status === "Cancelled"
                          ? " "
                          : "hidden"
                      }`}
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
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </Link>
                    <button
                      onClick={handlePrint}
                      className={`float-right py-2 px-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 ease-in duration-75 text-sm font-semibold text-white hover:text-white flex items-center printButton gap-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-printer printButton"
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
                        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                        <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
                      </svg>
                    </button>
                    
          </div>
          </div>
          
        </>
        
    </div>
  );
};

export default Invoice;