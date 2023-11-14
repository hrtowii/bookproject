import { Form } from "react-router-dom";

export default function TestComponent() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <>
    <div className="content">
        <h1>Hey</h1>
    </div>
    </>
  );
}