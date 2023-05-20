// import React, { useCallback, useState } from "react";
import React, { useCallback } from "react";

// interface Contact {
//   name: string;
//   phoneNumber: string;
//   emailAddress: string;
// }

const loadWebAssembly = async (fileName: string, importObject: any) => {
  const response = await fetch(fileName);
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module, importObject);
  return instance.exports;
};

const ContactsList: React.FC = () => {
  // const [contacts, setContacts] = useState<Contact[]>([]);
  // const [display, setDisplay] = useState("");

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     const module = await WebAssembly.instantiateStreaming(
  //       fetch("wasm/contact.wasm")
  //     );
  //     const getContacts = module.instance.exports
  //       .getContacts as () => Contact[];
  //     const displayContacts = module.instance.exports
  //       .displayContacts as () => string;

  //     const contacts = getContacts();
  //     setContacts(contacts);

  //     const display = displayContacts();
  //     setDisplay(display);
  //   };
  //   fetchContacts();
  // }, []);

  const loadContacts = useCallback(async () => {
    // const contactModule = await loadWebAssembly("./contact.wasm", {
    const contactModule = await loadWebAssembly("wasm/contact.wasm", {
      // Expose the `printMessage` function to be used inside WebAssembly
      // env: { printMessage: console.log },
    });

    // Extract the `getContacts` and `displayContacts` functions from WebAssembly
    // Check if the required functions exist in the module
    // if (!contactModule.getContacts || !contactModule.displayContacts) {
    if (!contactModule.getContacts) {
      console.error("Required functions not found in the WebAssembly module.");
      return;
    }

    // const { getContacts, displayContacts } = contactModule;
    // const getContacts = contactModule.getContacts as () => Contact[];
    const getContacts = contactModule.getContacts as () => String;
    // const displayContacts = contactModule.displayContacts as () => string;

    // Call the `getContacts` function from WebAssembly
    const contacts = getContacts();
    console.log("typeOfcontacts: ", typeof contacts);
    console.log("contacts: ", contacts);
    window.alert(`contacts: ${contacts}`);
    // setContacts(contacts);
    // const display = displayContacts();
    // console.log("display: ", display);
    // window.alert(`display: ${display}`);
    // setDisplay(display);
  }, []);

  return (
    <div className="bg-slate-100 rounded-md border border-gray-300">
      <button
        onClick={loadContacts}
        className="py-1 px-3.5 bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold"
      >
        Load Contacts
      </button>
      <h2 className="font-medium m-1">Contacts:</h2>
      {/* <pre>{display}</pre>
      <ul className="p-1.5 bg-red-100 rounded-md border-x border-gray-300">
        {contacts &&
          // contacts.map((contact) => (
          contacts.map((contact, index) => (
            //   <li
            //   key={contact.phoneNumber}
            //   className="bg-lime-100 rounded-md mb-0.5"
            // >
            <li key={index} className="bg-lime-100 rounded-md mb-0.5">
              <div>Name: {contact.name}</div>
              <div>Phone Number: {contact.phoneNumber}</div>
              <div>EmailAddress: {contact.emailAddress}</div>
            </li>
          ))}
      </ul> */}
    </div>
  );
};

export default ContactsList;
