"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import conf from "../../../config";


export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <Puck
      config={conf}
      data={data}
      onPublish={async (data: Data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}
