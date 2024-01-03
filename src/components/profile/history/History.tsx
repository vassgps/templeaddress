import Http from "@/config/Http";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const History = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: datas } = await Http.get("user/wallet/");
      console.log(datas.data.results);

      setData(datas.data.results);
    })();
  }, []);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  return (
    <>
      {data && data.length > 0 && (
        <div className="w-full mt-5 bg-white h-full">
          <div className="flex justify-between p-5">
            <h1 className="font-Poppins text-xl text-primary ml-5  font-semibold   tracking-normal text-left">
              History
            </h1>
              <div className="flex">
                <h1>Debit </h1>
                <label className="switch ml-2">
                  <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                  <span className="slider round"></span>
                </label>
              </div>
            <div
              onClick={() => setOpen(!open)}
              className={`${open && "rotate-180"} cursor-pointer`}
            >
              {React.createElement(IoIosArrowDown, { size: "40" })}
            </div>
          </div>

          {open && (
            <div className="flex w-full overflow-auto p-5">
              <table className="table-auto font-Poppins  ml-5     tracking-normal w-full ">
                <thead>
                  <tr>
                    <th className="py-3 bg-slate-100">No</th>
                    <th className="py-3 bg-slate-100">Type</th>

                    <th className="py-3 bg-slate-100">Payment Method</th>
                    <th className="py-3 bg-slate-100">
                      Upi Code / Account Number
                    </th>
                    <th className="py-3 bg-slate-100">Ifsc Code</th>
                    <th className="py-3 bg-slate-100">Amount</th>
                    <th className="py-3 bg-slate-100">Tranaction Id</th>
                    <th className="py-3 bg-slate-100">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data.map((item, index) => (
                      <>
                        {((isChecked&&item.txn_type === "DR")||(!isChecked&& item.txn_type=== "CR")) && (
                          <tr key={item.id}>
                            <td className="text-center py-2">{index + 1}</td>
                            <td className="text-center py-2">{item.txn_type}</td>

                            <td className="text-center py-2">
                              {item.txn_data?.payment_method}
                            </td>
                            <td className="text-center py-2">
                              {item?.txn_data?.upi_code ||
                                item?.txn_data?.account_number}
                            </td>
                            <td className="text-center py-2">
                              {item?.txn_data?.ifsc_code}
                            </td>
                            <td className="text-center py-2">{item?.points}</td>
                            <td className="text-center py-2">{item?.txn_id}</td>
                            <td className="text-center py-2">{item?.status}</td>
                          </tr>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default History;
