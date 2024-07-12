/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import getClassNameFactory from "../../../lib/get-class-name-factory";
import { ComponentConfig } from "@measured/puck";


export type ProductListProps = {

};

const ProductListComponent = ({ products }) => {
  return (
    <section className={styles.sectionProducts}>
      <div className={styles.container}>
        <div className={`${styles.row} ${styles.justifyContentCenter} ${styles.textCenter}`}>
          <div className={`${styles.colMd8} ${styles.colLg6}`}>
            <div className={styles.header}>
              <h3>Featured Product</h3>
              <h2>Popular Products</h2>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          {products.map((product, index) => (
            <div key={product.id} className={`${styles.colMd6} ${styles.colLg4} ${styles.colXl3}`}>
              <div className={styles.singleProduct} id={`product-${index + 1}`}>
                <div className={styles.part1}>
                  {product.image && <img src={product.image} alt={product.title} />}
                  <ul>
                    <li><a href="#"><i className="fas fa-shopping-cart"></i></a></li>
                    <li><a href="#"><i className="fas fa-heart"></i></a></li>
                    <li><a href="#"><i className="fas fa-plus"></i></a></li>
                    <li><a href="#"><i className="fas fa-expand"></i></a></li>
                  </ul>
                </div>
                <div className={styles.part2}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  {product.oldPrice && <h4 className={styles.productOldPrice}>${product.oldPrice}</h4>}
                  <h4 className={styles.productPrice}>${product.price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProductList: ComponentConfig<ProductListProps> =  {
  fields: {

    data: {
      type: "external",
      fetchList: async () => {
        const latestData = await fetch(`https://fakestoreapi.com/products`).then(
              (res) => res.json()
            );

        return [
          {
            widgetId:123,
            widgetType:"ProductList",
            cmsId:123
          },
        ];
      },
    },
  },
  
  resolveData: async ({ props }:any, { changed }:any) => {
    if (!props.data) return { props };

    // Don't query unless `data` has changed since resolveData was last run
    if (!changed.data) return { props };

    // Re-query the API for a particular item
    const latestData = await fetch(`https://fakestoreapi.com/products`).then(
      (res) => res.json()
    );
    // { title: "Hello, world", description: "Lorem ipsum 1", id: 0 }

    return {
      props: {
        // Update the value for `data`
        data: latestData
      },
    };
  },
  render: ({ data }:any) => {
   

    if (!data) {
      return "No data selected";
    }

    return (
      <>

        <div style={{display:"flex" , gap:"10"}}>
         <ProductListComponent products={data as any}></ProductListComponent>
        </div>
      </>
    );
  },
}

