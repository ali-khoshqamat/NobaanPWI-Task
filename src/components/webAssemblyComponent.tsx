import ContactsList from "./ContactListWebAssembly";
import HelloWebAssembly from "./HelloWebAssembly";
import NumWebAssembly from "./NumWebAssembly";

const WebAssemblyComponent = () => {
  return (
    <section className="w-11/12 bg-white p-2.5 border border-solid border-gray-300 rounded-md mb-5">
      <h2 className="text-center font-medium mb-3">WebAssembly</h2>
      <div className="flex justify-between items-center mb-3"> 
        <NumWebAssembly />
        <HelloWebAssembly />
      </div>
      <ContactsList />
    </section>
  );
};

export default WebAssemblyComponent;
