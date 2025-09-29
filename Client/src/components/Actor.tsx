import { useState } from "react";
interface actorStr {
    name: string,
    role: string,
    image: File | null,
    availability: []
}

function Actor() {
    const [actorDetails, setActorDetails] = useState<actorStr>({
        name: "",
        role: "",
        image: null,
        availability: []
    });
    return (
        <main className="min-h-screen bg-slate-800 w-full py-10 px-8 border-l border-slate-500 overflow-auto">
            <header className="border-b-[2px] border-slate-500 pb-5">
                <h1 className="text-white text-2xl font font-primary">Actor Management</h1>
                <p className="text-sm font-primary text-gray-300 font-light">Manage Actors here in a better way</p>
            </header>

            <section className="flex flex-row gap-5 mt-3 text-white font-primary font-light">
                <section className="w-2/3"></section>
                <section className="w-1/3 bg-black px-3 py-2 rounded-sm">
                    <h2>Add New Actor</h2>

                    <form className="p-2">
                        <input
                            value={actorDetails.name}
                            onChange={(e) => setActorDetails({ ...actorDetails, name: e.target.value })}
                            placeholder="Actor Name"
                            className="w-full border-none outline-none px-3 py-1 bg-slate-500"
                            type="text" />

                        <input
                            value={actorDetails.role}
                            onChange={(e) => setActorDetails({ ...actorDetails, role: e.target.value })}
                            placeholder="Role"
                            className="w-full border-none outline-none px-3 py-1 bg-slate-500 mt-2"
                            type="text" />

                        <label
                            htmlFor="image"
                            className="mt-2 border border-dashed border-white p-4 w-full text-center cursor-pointer rounded-md h-40 flex flex-col items-center justify-center"
                        >
                            {actorDetails.image ? (
                                <div></div>
                            ) : (
                                <div className="">
                                    <p className="text-sm">Upload Image</p>
                                    <p className="text-[12px]">Drag and drop or click to upload</p>
                                </div>
                            )}
                        </label>
                        <input type="file" id="image" accept="image/*" className="hidden" />

                        <div>
                            <input type="text" />
                            <button></button>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    )
}

export default Actor;