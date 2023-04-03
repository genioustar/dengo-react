import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import useMutation from "../libs/useMutation";

const MyModal = ({ isOpen, onSubmit, onCancel, count }: any) => {
  const [activated, setActivated] = useState(false); //작업 활성화 비활성화
  const { register, handleSubmit } = useForm(); //useForm에서 활용하는 타입은 EnterForm 타입
  const onValid = (form: any) => {
    console.log(form);
    updateJob(form);
    handleClickCancel();
  };
  const [updateJob, { loading, data, error }] = useMutation(
    "https://dengomarket.com/api/v1/schedules/"
    // "http://127.0.0.1:8000/api/v1/schedules/"
  );
  const handleClickCancel = () => {
    onCancel();
  };
  // console.dir(`count : ${count}`);
  // console.log(data);
  return (
    <ReactModal
      className="text-gray-900 dark:bg-gray-900 dark:text-white"
      isOpen={isOpen}
      ariaHideApp={false}
    >
      <div className="border-b-[1px] border-b-white p-4 text-2xl font-extrabold">
        <span>작업 생성</span>
      </div>
      <form onSubmit={handleSubmit(onValid)} className="p-4">
        <div className="mb-6">
          <label
            id="jobId"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            작업 ID
          </label>
          <input
            type="text"
            id="jobId"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="작업명"
            disabled={true}
            // value={count + 1}
            // {...register("jobId", { value: count + 1 })}
            required
          />
        </div>
        <div className="mb-6">
          <label
            id="state"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            상태
          </label>
          <input
            type="text"
            id="state"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="현재 작업 상태"
            disabled={true}
            value="false"
            required
          />
        </div>
        <div className="mb-6">
          <label
            id="jobName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            작업명
          </label>
          <input
            type="text"
            id="jobName"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="작업명"
            {...register("jobName")}
            required
          />
        </div>
        <div className="mb-6 flex flex-col">
          <span>
            {activated
              ? "활성화"
              : "비활성화 (useForm을 통해서 값 api로 전달!)"}
          </span>
          <label id="enable" className="relative my-2 inline-flex items-center">
            <input
              type="checkbox"
              id="enable"
              className="peer sr-only"
              defaultChecked={false}
              {...(register("enable"), { value: activated })}
              value={activated.toString()}
              onChange={(active) => {
                setActivated(!active.target.checked);
              }}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
          </label>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <span>작업 주기</span>
          </div>
          <div className="border-2 border-white p-2">
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value="1"
                {...register("interval")}
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                id="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                한 번
              </label>
            </div>
            <div className="flex items-center">
              <input
                defaultChecked={true}
                id="default-radio-2"
                type="radio"
                value="2"
                {...register("interval")}
                name="default-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                id="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                매일
              </label>
            </div>
            <div className="flex items-center">
              <input
                defaultChecked={true}
                id="default-radio-3"
                type="radio"
                value="3"
                {...register("interval")}
                name="default-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                id="default-radio-3"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                매주
              </label>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-6">
            <label
              id="startDt"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              작업 일시
            </label>
            <input
              type="datetime-local"
              id="startDt"
              {...register("startDt")}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Select A datetime"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={handleClickCancel}
            type="button"
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              취소
            </span>
          </button>
          <button
            // onClick={handleClickSubmit}
            type="submit"
            className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            생성
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
export default MyModal;
