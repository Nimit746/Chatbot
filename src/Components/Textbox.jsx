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
        <main>
            <form
                onSubmit={handleSubmit}
                className="w-full flex justify-between items-center mt-[20px] flex-col gap-3"
            >
                <div className="flex glass w-auto rounded-[10px] px-5 py-1 items-center justify-around">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-w-100 max-w-90 p-2 rounded-[30px] text-[16px] ml-[2%] focus:outline-none max-h-23 overflow-y-scroll hide-scrollbar"
                        placeholder="Ask about fat-burning workouts, diet plans..."
                        autoComplete="off"
                    />

                </div>

                <button
                    type="submit"
                    className="w-30 h-9 rounded-full bg-amber-500 text-white font-bold text-[16px] mt-[20px] items-center justify-center hover:scale-110 cursor-pointer focus:outline-none"
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