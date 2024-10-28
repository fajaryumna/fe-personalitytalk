import Image from "next/image";

export default function AktivitasCard({name, status, date, time, }) {
  return (
    <div className="w-full h-[124px] p-4 bg-primarylight rounded-lg border border-primary justify-between items-center inline-flex">
      <div className="justify-start items-center gap-3 flex">
        <div className="h-20 rounded-lg justify-start items-center gap-2.5 flex">
          <img
            className="grow shrink basis-0 h-20 rounded-lg"
            src="https://via.placeholder.com/80x80"
          />
        </div>
        <div className="self-stretch flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-textcolor text-base font-semibold">
            {name}
          </div>
          <div className="h-5 px-4 py-2 bg-primary rounded-lg justify-center items-center gap-2.5 inline-flex">
            <div className="text-neutral-50 text-xs font-semibold  ">
              {status}
            </div>
          </div>
        </div>
      </div>
      <div className="h-11 justify-end items-center gap-4 flex">
        <div className="flex-col justify-center items-start gap-2 inline-flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-4 relative" />
            <Image src="/icons/chat-primary.svg" width={15} height={15} />
            <div className=" text-textcolor text-xs font-semibold  ">
              {date}
            </div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-[14.30px] relative" />
            <Image src="/icons/coins-primary.svg" width={15} height={15} />
            <div className=" text-textcolor text-xs font-semibold  ">
              {time}
            </div>
          </div>
        </div>
        <div>
          <Image src="/icons/arrow-activity.svg" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}