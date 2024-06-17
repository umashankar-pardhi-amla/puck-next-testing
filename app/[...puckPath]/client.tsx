"use client";

import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import conf from "../../config";
// import config from "../../puck.config";

export function Client({ data }: { data: Data }) {
  return <Render config={conf} data={data} />;
}
