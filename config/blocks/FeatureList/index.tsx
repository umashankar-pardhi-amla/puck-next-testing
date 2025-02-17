/* eslint-disable @next/next/no-img-element */
import React from "react";

import styles from "./styles.module.css";

import { Section } from "../../components/Section";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import getClassNameFactory from "../../../lib/get-class-name-factory";
import { ComponentConfig } from "@measured/puck";

const getClassName = getClassNameFactory("FeatureList", styles);

const icons = Object.keys(dynamicIconImports).reduce((acc, iconName) => {
  const El = dynamic(dynamicIconImports[iconName]);

  return {
    ...acc,
    [iconName]: <El />,
  };
}, {});

const iconOptions = Object.keys(dynamicIconImports).map((iconName) => ({
  label: iconName,
  value: iconName,
}));

export type FeatureListProps = {
  items: {
    title: string;
    description: string;
    icon?: "feather";
  }[];
  mode: "flat" | "card";
};

export const FeatureList: ComponentConfig<FeatureListProps> = {
  fields: {
    items: {
      type: "array",
      getItemSummary: (item, i) => item.title || `Feature #${i}`,
      defaultItemProps: {
        title: "Title",
        description: "Description",
        icon: "feather",
      },
      arrayFields: {
        title: { type: "text" },
        description: { type: "textarea" },
        icon: {
          type: "select",
          options: iconOptions,
        },
      },
    },
    mode: {
      type: "radio",
      options: [
        { label: "flat", value: "flat" },
        { label: "card", value: "card" },
      ],
    },
  },
  defaultProps: {
    items: [
      {
        title: "Feature",
        description: "Description",
        icon: "feather",
      },
    ],
    mode: "flat",
  },
  render: ({ items, mode }) => {
    return (
      <Section className={getClassName({ cardMode: mode === "card" })}>
        <div className={getClassName("items")}>
          {items.map((item, i) => (
            <div key={i} className={getClassName("item")}>
              <div className={getClassName("icon")}>{icons[item.icon]}</div>
              <div className={getClassName("title")}>{item.title}</div>
              <div className={getClassName("description")}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  },
};
