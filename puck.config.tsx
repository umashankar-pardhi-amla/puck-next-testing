import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  Columns:any;
  Example:{ data: any };
  ServerData:any;
  
};

  // Slide Component
  const Slide = ({ heading, description, image, textColor, headingFontSize, linkText, url }) => (
    <div className="slide" style={{ backgroundImage: `url(${image})`, color: textColor }}>
      <h2 style={{ fontSize: headingFontSize }}>{heading}</h2>
      <p>{description}</p>
      <a href={url}>{linkText}</a>
    </div>
  );

  // Banner Component
  const Banner = ({ componentBlocks }) => (
    <div className="banner">
      {Object.keys(componentBlocks).map((key) => {
        const { settings } = componentBlocks[key];
        return <Slide key={key} {...settings} />;
      })}
    </div>
  );

  // Column Component
  const Column = ({ image, title, text, linkLabel, link }) => (
    <div className="column">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={link}>{linkLabel}</a>
    </div>
  );

  // MultiColumn Component
  const MultiColumn = ({ componentBlocks }) => (
    <div className="multi-column">
      {Object.keys(componentBlocks).map((key) => {
        const { settings } = componentBlocks[key];
        return <Column key={key} {...settings} />;
      })}
    </div>
  );

export const config: Config<Props> = {
  components: {
    Columns: {
      render: ({ puck: { renderDropZone } }) => (
        <div><h1>
          Umashankar 
          </h1>
          <hr />
          <hr />
          {renderDropZone({ zone: "my-content" })}
          <hr />
          
          <strong>Testing</strong>
          </div>
      ),
    },
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    Example: {
      fields: {
        data: {
          type: "external",
          fetchList: async () => {
            // Query an API for a list of items
            //const items = await fetch(`/api/items`).then((res) => res.json());
            // [
            //   { title: "Hello, world", description: "Lorem ipsum 1" },
            //   { title: "Goodbye, world", description: "Lorem ipsum 2" },
            // ];
 
            return [
              { title: "Hello, world", description: "Lorem ipsum 1" },
              { title: "Goodbye, world", description: "Lorem ipsum 2" },
            ];
          },
        },
      },
      render: ({ data }:any) => {
        if (!data) {
          return "No data selected" as any;
        }
 
        return (
          <>
            <b>{data.title}</b>
            <p>{data.description}</p>
          </>
        );
      },
    },
    ServerData: {
      fields: {
        title: {
          type: "text",
        },
      },
      resolveData: async ({ props }) => {
        const items = await fetch(`https://my-json-server.typicode.com/mayur-mate-amla/mock-data/dynamic-page`).then((res) => res.json());
        
        return {
          props: { resolvedTitle: items },
          readOnly: { resolvedTitle: true },
        };
      },
      render: ({ resolvedTitle }) => <h1>{JSON.stringify(resolvedTitle)}</h1>,
    },

  },
};

export default config;
