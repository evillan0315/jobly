import React from "react";

type Props = {
  text?: string;
};

function FooterComponent({ text }: Props) {
  console.log(text);
  return <div>FooterComponent</div>;
}

export default FooterComponent;
