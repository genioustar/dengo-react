import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../components/Header";
import MyModal from "../components/MyModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ProductId {
  product: number[];
}
interface Target {
  siteId: number;
  productId: ProductId[];
}

interface ScheduleData {
  id: number;
  title: string;
  enable: boolean;
  target: Target[];
  period_type: number;
  period_value: number;
  start_dt: string;
  reg_dt: string;
}

interface SchedulesResponse {
  count: string;
  results: ScheduleData[];
}

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR<SchedulesResponse>(
    "https://dengomarket.com/api/v1/schedules/",
    fetcher
  );
  const [isOpen, setOpen] = useState(false);
  const a = 10;
  // jobs의 내용의 변경이 있으면 데이터를 계속 다시 불러와야해서!
  useEffect(() => {
    console.dir(data);
    mutate(); // 페이지
  }, [data, isOpen, mutate]);
  const handleClick = () => {
    setOpen(true);
  };
  if (error) return <div>"An error has occurred."</div>;
  if (isLoading) return <div>"Loading..."</div>;
  return (
    <div className="w-full space-y-5 bg-slate-200">
      <Header />
      <div className="flex items-center justify-start space-x-10 space-y-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white font-bold text-teal-500 shadow-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <div className="space-y-1 pb-5">
            <span className="text-lg font-bold text-slate-700">
              작업 스케줄
            </span>
            <p className="text-sm font-medium text-slate-500">
              크롤링 작업 등록 및 관리
            </p>
          </div>
        </div>
      </div>
      <div className="w-full border-b-2 border-gray-300" />
      <div className="flex justify-end pr-10">
        <button
          type="button"
          className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
          onClick={handleClick}
        >
          New Job Create
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                작업명
              </th>
              <th scope="col" className="px-6 py-3">
                상태
              </th>
              <th scope="col" className="px-6 py-3">
                내용
              </th>
              <th scope="col" className="px-6 py-3">
                주기
              </th>
              <th scope="col" className="px-6 py-3">
                마지막 완료일
              </th>
              <th scope="col" className="px-6 py-3">
                로그
              </th>
              <th scope="col" className="px-6 py-3">
                활성화
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.results.map((d) => (
              <tr
                key={d.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {d.id}
                </th>
                <td onClick={handleClick} className="cursor-pointer px-6 py-4 ">
                  {d.title}
                </td>
                <td className="px-6 py-4">
                  <button className="pointer-events-none rounded-md bg-fuchsia-400 p-2 text-sm font-bold text-white">
                    WAITING-뭔데이터 보고 판단하는가?
                  </button>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">{d.start_dt}</td>
                <td className="px-6 py-4">{d.reg_dt}</td>
                <td className="px-6 py-4">i</td>
                <td className="px-6 py-4">
                  <label className="pointer-events-none relative mb-5 inline-flex items-center">
                    <input
                      type="checkbox"
                      value=""
                      className="peer sr-only"
                      checked={d.enable}
                      onChange={() => {}}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                    <span>{d.enable.toString()}</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MyModal
        isOpen={isOpen}
        count={data?.count}
        onSubmit={() => setOpen(false)} // + api post요청으로 변경!
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
