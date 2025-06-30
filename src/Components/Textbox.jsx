import React, { useState } from "react";

const Textbox = ({ onSubmit }) => {
    const [input, setInput] = useState("");
    // const [model, setModel] = useState("mistral");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
        setInput("");
    };

    return (
      <main >
        <form
          onSubmit={handleSubmit}
          className="w-[90%] flex justify-between items-center mt-[20px] flex-col gap-1 sm:w-md md:w-xl lg:w-2xl mx-auto"
        >
          <div className="flex glass w-auto rounded-[10px] px-5 py-1 items-center justify-around sm:w-[60%] md:w-[65%] lg:w-[75%]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" p-2 rounded-[30px] text-[16px] ml-[2%] focus:outline-none max-h-23 overflow-y-scroll hide-scrollbar sm:w-[60%] md:w-[65%] lg:w-[75%]"
              placeholder="Ask about fat-burning workouts, diet plans..."
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="w-30 h-9 rounded-full bg-amber-500 text-white font-bold text-[16px] mt-[5px] items-center justify-center hover:scale-110 cursor-pointer focus:outline-none"
          >
            Send
          </button>
        </form>
      </main>
    );
};

export default Textbox;

{/* <select
value={model}
onChange={(e) => setModel(e.target.value)}
className="cursor-pointer"
>
<option value="mistral">Mistral</option>
<option value="phi3">Phi 3</option>
</select> */}