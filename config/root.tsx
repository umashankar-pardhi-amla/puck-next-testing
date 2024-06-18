import { ReactNode } from "react";


import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { DefaultRootProps } from "@measured/puck";

export type RootProps = {
  children: ReactNode;
  title: string;
} & DefaultRootProps;

function Root({ children, puck }: RootProps) {
  return (
    <>
      <Header editMode={puck.isEditing} />
      {children}
      <Footer>
        <Footer.List title="Section">
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
        </Footer.List>
        <Footer.List title="Section">
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
        </Footer.List>
        <Footer.List title="Section">
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
        </Footer.List>
        <Footer.List title="Section">
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
          <Footer.Link href="">Label</Footer.Link>
        </Footer.List>
      </Footer>
    </>
  );
}

export default Root;
