// import { useEffect, useState } from "react";
import { useState } from "react";
import { BsFillTelephonePlusFill } from "react-icons/bs";
// import { auth } from "./firebase"; // or your own authentication service
// import { OTPCredentialTransport } from "webauthn";

// interface OTPCredentialRequestOptions extends CredentialRequestOptions {
//   otp: {
//     transport: string[];
//     mediation: "required" | "optional" | "silent";
//   };
// }

const PhoneNumberAuthForm = () => {
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerficationId] = useState("");

  const phoneNumberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const verifactionCodeChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const sendVerificationCodeHandler = async () => {
    try {
      //   const result = await auth.signInWithPhoneNumber(phoneNumber);
      //   setVerficationId(result.verificationId);
      setVerficationId("true");

      const OTPHandler = async () => {
        if ("OTPCredential" in window) {
          console.log("OTPCredential in window");
          try {
            const ac = new AbortController();
            console.log("ac", ac);

            const options = {
              otp: { transport: ["sms"], mediation: "optional" },
              signal: ac.signal,
            };
            console.log(options);
            console.log("before");
            console.log("credentials" in navigator);
            //!
            const credential = await navigator.credentials.get(options);
            //?
            console.log("after");
            // window.alert(`stingifyCredential: ${JSON.stringify(credential)}`);
            // window.alert(`credential: ${credential}`);
            // window.alert(`credential: ${credential?.id}`);
            // window.alert(`credential: ${credential?.type}`);
            if (credential) {
              console.log("credential", credential);
              console.log("credentialId", credential.id);
              //   window.alert(`credential: ${credential}`);
            }

            if (credential && credential.type === "otp") {
              setOtp(credential.id);
              //   window.alert(`credential: ${credential.id}`);
              console.log("credential", credential.id);
            }
            // ac.abort();
          } catch (err) {
            console.log("err", err);
          }
        } else {
          console.log("OTPCredential not in window");
        }
      };
      await OTPHandler();
    } catch (error) {
      window.alert(`error: ${error}`);
      console.log(error);
    }
  };

  const verifyCodeHandler = async () => {
    try {
      //   const credential = await auth.PhoneAuthProvider.credential(
      //     verificationId,
      //     verificationCode
      //   );
      //   await auth.signInWithCredential(credential);
      console.log("Successfully authenticated!");
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     const OTPHandler = async () => {
  //       console.log("OTPHandler");
  //       if ("OTPCredential" in window) {
  //         console.log("OTPCredential in window");

  //         try {
  //           const ac = new AbortController();
  //           console.log("ac", ac);
  //           const options = {
  //             otp: { transport: ["sms"], mediation: "optional" },
  //             signal: ac.signal,
  //           };
  //           console.log("after");
  //           console.log(options);
  //           console.log("credentials" in navigator);
  //           //!
  //           const credential = await navigator.credentials.get(options);
  //           //?
  //           console.log("before");
  //           //   window.alert(`stingifyCredential: ${JSON.stringify(credential)}`);
  //           //   window.alert(`credential: ${credential}`);
  //           //   window.alert(`credential: ${credential?.id}`);
  //           //   window.alert(`credential: ${credential?.type}`);
  //           setOtp("");
  //           if (credential) {
  //             console.log("credential", credential.id);
  //           } else {
  //             console.log("no");
  //           }

  //           // if (credential && credential.type === "otp") {
  //           //   setOtp(credential.id);
  //           //   window.alert(`credential: ${credential.id}`);
  //           //   console.log("credential", credential.id);
  //           // }
  //           // ac.abort();
  //         } catch (err) {
  //           //   window.alert(`error: ${err}`);
  //           console.log("error", err);
  //         }
  //       }
  //     };

  //     OTPHandler();
  //   }, []);

  //   interface OTPCredentialCreationOptions {
  //     publicKey: PublicKeyCredentialCreationOptions & {
  //       rp: PublicKeyCredentialRpEntity;
  //       user: PublicKeyCredentialUserEntity & {
  //         displayName: string;
  //         id: Uint8Array;
  //       };
  //       challenge: Uint8Array;
  //       pubKeyCredParams: PublicKeyCredentialParameters[];
  //       authenticatorSelection: AuthenticatorSelectionCriteria;
  //       timeout?: number;
  //       excludeCredentials?: PublicKeyCredentialDescriptor[];
  //       extensions?: AuthenticationExtensionsClientInputs;
  //       otp: {
  //         transport: OTPCredentialTransport[];
  //       };
  //     };
  //   }

  //   enum OTPCredentialTransport {
  //     sms = "sms",
  //     voice = "voice",
  //     email = "email",
  //   }

  //   interface OTPCredentialCreationOptions extends CredentialCreationOptions {
  //     password: {
  //       id: string;
  //       password: string;
  //     };
  //     otp: {
  //       transport: OTPCredentialTransport[];
  //       challenge: ArrayBuffer;
  //       user: {
  //         name?: string;
  //         displayName?: string;
  //       };
  //       signal?: AbortSignal;
  //     };
  //   }

  //   function createOTP() {
  //     const options: OTPCredentialCreationOptions = {
  //       password: {
  //         id: "example@example.com",
  //         password: "password",
  //       },
  //       otp: {
  //         transport: [OTPCredentialTransport.sms],
  //         challenge: new Uint8Array([0, 1, 2, 3, 4]).buffer,
  //         user: {
  //           name: "user123",
  //           displayName: "User 123",
  //         },
  //       },
  //     };

  //     navigator.credentials
  //       .create(options)
  //       .then((credential) => {
  //         console.log("Credential created:", credential);
  //       })
  //       .catch((error) => {
  //         console.error("Error creating credential:", error);
  //       });
  //   }

  //   const publicKey = {
  //     // define the PublicKeyCredentialCreationOptions properties
  //     rp: {
  //       name: "Example RP",
  //     },
  //     user: {
  //       name: "johndoe@example.com",
  //       displayName: "John Doe",
  //       id: new Uint8Array(16),
  //     },
  //     challenge: new Uint8Array([
  //       /* challenge */
  //     ]),
  //     pubKeyCredParams: [
  //       {
  //         type: "public-key",
  //         alg: -7,
  //       },
  //     ],
  //     authenticatorSelection: {
  //       authenticatorAttachment: "cross-platform",
  //       userVerification: "required",
  //     },
  //     timeout: 60000,
  //     excludeCredentials: [],
  //     extensions: {},
  //     otp: {
  //       transport: ["sms"],
  //     },
  //   };

  //   const options: OTPCredentialCreationOptions = { publicKey };

  //   navigator.credentials
  //     .create(options)
  //     .then((credential) => {
  //       console.log("OTP credential created:", credential);
  //     })
  //     .catch((error) => {
  //       console.error("Error creating OTP credential:", error);
  //     });

  // const options = {
  //     otp: {
  //       transport: ['sms'],
  //       mediation: 'optional',
  //       message: 'Enter code {{otpCode}} to sign in',
  //       timeout: 120000,
  //     },
  //     signal: new AbortController().signal,
  //   };

  //   navigator.credentials.get(options)
  //     .then((credential) => {
  //       console.log("Credential retrieved:", credential);
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving credential:", error);
  //     });

  //   interface OTPCredentialRequestOptions extends CredentialRequestOptions {
  //     otp: {
  //       transport: OTPCredentialTransport[];
  //       timeout?: number;
  //       mediation?: "required" | "preferred" | "none";
  //       signal?: AbortSignal;
  //     };
  //   } = {
  //     otp: {
  //       transport: ['sms'],
  //       mediation: 'optional',
  //       message: 'Enter code {{otpCode}} to sign in',
  //       timeout: 120000,
  //     },
  //     signal: new AbortController().signal,
  //   };

  //   navigator.credentials.get(options)
  //     .then((credential) => {
  //       console.log("Credential retrieved:", credential);
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving credential:", error);
  //     });
  //   const options: OTPCredentialRequestOptions = {
  //     otp: {
  //       transport: ["sms"],
  //       timeout: 30000,
  //     },
  //   };
  //   navigator.credentials
  //     .get(options)
  //     .then((credential) => {
  //       console.log("Credential retrieved:", credential);
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving credential:", error);
  //     });

  //   interface MyCustomCredential extends Credential {
  //     myCustomProp: string;
  //   }

  //   const options: CredentialRequestOptions = {
  //     password: true,
  //     federated: {
  //       providers: [
  //         "https://accounts.google.com",
  //         "https://login.microsoftonline.com",
  //       ],
  //     },
  //     mediation: "required",
  //   };

  //   navigator.credentials.get(options).then((credential: MyCustomCredential) => {
  //     console.log("Got credential:", credential);
  //     console.log("Custom property:", credential.myCustomProp);
  //   });

  //   const otpCreationOptions: OTPCredentialCreationOptions = {
  //     // the OTP authenticator's friendly name
  //     name: "My Authenticator",
  //     // a list of transports that can be used to deliver the OTP
  //     transport: ["sms"],
  //     // whether the user must authenticate themselves in order to generate the OTP
  //     requireUserVerification: false,
  //     // the hash function to use for the OTP generation
  //     // the possible values are "SHA-1", "SHA-256", and "SHA-512"
  //     // the default value is "SHA-1"
  //     hash: "SHA-256",
  //     // the number of digits in the OTP
  //     // the possible values are 4, 6, and 8
  //     // the default value is 6
  //     digits: 6,
  //     // the time period for which the OTP will remain valid (in seconds)
  //     // the possible values are 10, 30, and 60
  //     // the default value is 30
  //     period: 30,
  //   };

  //   const createOtpCredential = async () => {
  //     const options: OTPCredentialCreationOptions = {
  //       otp: {
  //         transport: ["sms"],
  //         message: "Your verification code is {{code}}.",
  //         algorithm: "SHA-256",
  //         digits: 6,
  //         period: 30,
  //       },
  //       signal: ac.signal,
  //     };
  //     try {
  //       const credential = await navigator.credentials.create({ otp: options });
  //       console.log("OTP credential created:", credential);
  //     } catch (err) {
  //       console.log("Error creating OTP credential:", err);
  //     }
  //   };

  return (
    <section className="flex flex-col w-11/12 bg-white p-2.5 border border-solid border-gray-300 rounded-md mb-5">
      {/* <h2 className="font-bold mb-4">Phone Number Authentication</h2> */}
      {/* <button
        className="inline w-full mt-2 py-1.5 px-3.5 outline-none bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold"
        onClick={createOTP}
      >
        Create OTP Credential
      </button> */}

      <div className="mb-4">
        <label htmlFor="phone-number" className="block font-medium mb-1">
          Phone Number
        </label>
        <div className="relative">
          <input
            id="phone-number"
            type="tel"
            autoComplete="tel"
            value={phoneNumber}
            onChange={phoneNumberChangeHandler}
            placeholder="Enter your phone number"
            className="outline-none pl-14 block w-full py-2 px-4 border border-solid border-gray-300 rounded-md focus:border-green-700"
          />
          <div className="absolute inset-y-0 flex items-center">
            <span className="text-gray-400 border-r px-2">+98</span>
          </div>
          <div className="absolute inset-y-0 right-2.5 flex items-center">
            <BsFillTelephonePlusFill
              className="h-5 w-5 text-gray-400"
              aria-hidden="ture"
            />
            <span className="sr-only">Phone number</span>
          </div>
        </div>
      </div>
      {verificationId ? (
        <div className="mb-4">
          <label htmlFor="verifaction-code" className="block font-medium mb-1">
            Verification Code
          </label>

          <input
            id="verifaction-code"
            type="text"
            //   autoComplete="off"
            autoComplete="one-time-code"
            required
            value={verificationCode}
            onChange={verifactionCodeChangeHandler}
            placeholder="Enter your verification code"
            className="outline-none block w-full py-2 px-4 border border-solid border-gray-300 rounded-md focus:border-green-700"
          />
          <div className="block font-medium my-1">your otp code is: {otp}</div>
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        {verificationId ? (
          <button
            type="button"
            className="inline w-full py-1.5 px-3.5 outline-none bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold"
            onClick={verifyCodeHandler}
          >
            Verify Code
          </button>
        ) : (
          <button
            type="button"
            className="inline w-full py-1.5 px-3.5 outline-none bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold"
            onClick={sendVerificationCodeHandler}
          >
            Send Verification Code
          </button>
        )}
      </div>
    </section>
  );
};

export default PhoneNumberAuthForm;
