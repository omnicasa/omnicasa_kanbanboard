import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const DetailHeader = () => {
  return (
    <div className="flex justify-between items-center p-5 h-20 border-b">
      <h1 className="text-3xl font-bold text-primary">Lead Details</h1>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="flex h-9 p-2 px-4 justify-center items-center gap-2 text-primary rounded-md border bg-white shadow-sm"
        >
          <Image
            src="/images/appointment.svg"
            alt="appointment"
            width={20}
            height={20}
          />
          <label>Create appointment</label>
        </Button>
        <Button
          variant="outline"
          className="flex h-9 p-2 px-4 justify-center items-center gap-2 text-primary rounded-md border bg-white shadow-sm"
        >
          <Image
            src="/images/appointment.svg"
            alt="appointment"
            width={20}
            height={20}
          />
          <label>Next action</label>
        </Button>
        <Button
          variant="outline"
          className="flex h-9 p-2 px-4 justify-center items-center gap-2 text-primary rounded-md border bg-white shadow-sm"
        >
          <Image src="/images/edit.svg" alt="edit" width={20} height={20} />
          <label>Edit</label>
        </Button>
        <Button
          variant="outline"
          className="flex h-9 p-2 justify-center items-center gap-2 text-primary rounded-md border bg-white shadow-sm"
        >
          <Image src="/images/more.svg" alt="edit" width={20} height={20} />
        </Button>
      </div>
    </div>
  );
};

export default DetailHeader;
